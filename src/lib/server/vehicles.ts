import { env } from '$env/dynamic/private';
import { vehicles as staticVehicles } from '$lib/data/vehicles';
import type { Vehicle } from '$lib/types';

const EDGE_CONFIG_VEHICLES_KEY = 'vehicles';
const CACHE_TTL_MS = 30 * 1000; // short - the admin expects near-immediate feedback after saving

let vehiclesCache: { vehicles: Vehicle[]; fetchedAt: number } | null = null;

/**
 * Reads the live inventory from Edge Config (written by the admin CMS). Falls back to the
 * static seed data in $lib/data/vehicles when Edge Config isn't configured (local dev) or
 * unreachable - same fallback shape as getCurrentAccessToken() in $lib/server/instagram.
 */
export async function getVehicles(): Promise<Vehicle[]> {
	if (vehiclesCache && Date.now() - vehiclesCache.fetchedAt < CACHE_TTL_MS) {
		return vehiclesCache.vehicles;
	}

	if (env.EDGE_CONFIG) {
		try {
			const { get } = await import('@vercel/edge-config');
			const stored = await get<Vehicle[]>(EDGE_CONFIG_VEHICLES_KEY);
			if (stored) {
				vehiclesCache = { vehicles: stored, fetchedAt: Date.now() };
				return stored;
			}
		} catch {
			// Edge Config unreachable/misconfigured - fall through to the static fallback.
		}
	}

	return staticVehicles;
}

async function saveVehicles(vehicles: Vehicle[]): Promise<void> {
	if (!env.VERCEL_API_TOKEN || !env.EDGE_CONFIG_ID) {
		throw new Error(
			'VERCEL_API_TOKEN / EDGE_CONFIG_ID not set - nowhere to persist vehicle changes.'
		);
	}

	const res = await fetch(`https://api.vercel.com/v1/edge-config/${env.EDGE_CONFIG_ID}/items`, {
		method: 'PATCH',
		headers: {
			Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			items: [{ operation: 'upsert', key: EDGE_CONFIG_VEHICLES_KEY, value: vehicles }]
		})
	});

	if (!res.ok) {
		throw new Error(`Failed to persist vehicles: ${await res.text()}`);
	}

	vehiclesCache = { vehicles, fetchedAt: Date.now() };
}

/**
 * Read-modify-write helper used by every admin mutation. Forces a fresh read (bypassing the
 * cache) right before applying the change, shrinking - but not eliminating - the window for a
 * lost update if two admin edits race. Edge Config has no transactions/locking; for a
 * single-operator site that risk is accepted rather than engineered around.
 */
export async function mutateVehicles(fn: (vehicles: Vehicle[]) => Vehicle[]): Promise<Vehicle[]> {
	vehiclesCache = null;
	const current = await getVehicles();
	const next = fn(current);
	await saveVehicles(next);
	return next;
}
