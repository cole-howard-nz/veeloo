import { randomUUID } from 'node:crypto';
import { del, put } from '@vercel/blob';
import { env } from '$env/dynamic/private';
import { slugify } from '$lib/utils/slugify';
import type { Vehicle, VehicleStatus } from '$lib/types';

const VALID_DRIVETRAINS: Vehicle['drivetrain'][] = ['RWD', 'AWD', 'FWD'];
const VALID_STATUSES: VehicleStatus[] = ['available', 'on-hold', 'sold'];

export class VehicleFormError extends Error {}

/**
 * Parses a VehicleForm submission (see $lib/components/admin/VehicleForm.svelte) into a
 * Vehicle record, uploading any newly-added photos to Vercel Blob along the way. The final
 * `images` order is reconstructed by walking the `imageOrder` field: existing entries carry
 * their URL directly, new ones carry a `new:<id>` token pointing at a matching `newImage_<id>`
 * file field.
 */
export async function parseVehicleForm(
	formData: FormData,
	slugForUploads: string
): Promise<Vehicle> {
	const get = (name: string) => String(formData.get(name) ?? '').trim();

	const slug = slugify(get('slug'));
	const chassisCode = get('chassisCode');
	const model = get('model');
	const year = Number(get('year'));
	const engine = get('engine');
	const drivetrain = get('drivetrain');
	const transmission = get('transmission');
	const odometerKm = Number(get('odometerKm'));
	const colour = get('colour');
	const status = get('status');
	const justLanded = formData.get('justLanded') === 'on';
	const priceNZD = Number(get('priceNZD'));
	const soldDate = get('soldDate');
	const importStatus = get('importStatus') || 'Used import';
	const conditionNotes = get('conditionNotes');
	const story = get('story');

	if (!slug) throw new VehicleFormError('Slug is required.');
	if (!chassisCode) throw new VehicleFormError('Chassis code is required.');
	if (!model) throw new VehicleFormError('Model is required.');
	if (!Number.isFinite(year)) throw new VehicleFormError('Year must be a number.');
	if (!VALID_DRIVETRAINS.includes(drivetrain as Vehicle['drivetrain'])) {
		throw new VehicleFormError('Invalid drivetrain.');
	}
	if (!transmission) throw new VehicleFormError('Transmission is required.');
	if (!Number.isFinite(odometerKm)) throw new VehicleFormError('Odometer must be a number.');
	if (!colour) throw new VehicleFormError('Colour is required.');
	if (!VALID_STATUSES.includes(status as VehicleStatus)) {
		throw new VehicleFormError('Invalid status.');
	}
	if (!Number.isFinite(priceNZD)) throw new VehicleFormError('Price must be a number.');
	if (!conditionNotes) throw new VehicleFormError('Condition notes are required.');
	if (!story) throw new VehicleFormError('Story is required.');

	const images = await resolveImages(formData, slugForUploads);

	return {
		slug,
		chassisCode,
		model,
		year,
		engine,
		drivetrain: drivetrain as Vehicle['drivetrain'],
		transmission,
		odometerKm,
		colour,
		status: status as VehicleStatus,
		justLanded: justLanded || undefined,
		priceNZD,
		priceDisplay: `$${priceNZD.toLocaleString('en-NZ')}`,
		soldDate: status === 'sold' && soldDate ? soldDate : undefined,
		importStatus,
		conditionNotes,
		story,
		images
	};
}

async function resolveImages(formData: FormData, slug: string): Promise<string[]> {
	const order = formData.getAll('imageOrder').map(String);
	if (order.some((token) => token.startsWith('new:')) && !env.BLOB_READ_WRITE_TOKEN) {
		throw new VehicleFormError('BLOB_READ_WRITE_TOKEN not set - image uploads are unavailable.');
	}

	const images: string[] = [];
	for (const token of order) {
		if (token.startsWith('new:')) {
			const id = token.slice('new:'.length);
			const file = formData.get(`newImage_${id}`);
			if (!(file instanceof File) || file.size === 0) continue;
			const blob = await put(`vehicles/${slug}/${randomUUID()}-${file.name}`, file, {
				access: 'public',
				token: env.BLOB_READ_WRITE_TOKEN
			});
			images.push(blob.url);
		} else if (token) {
			images.push(token);
		}
	}
	return images;
}

/** Best-effort blob cleanup - an orphaned photo doesn't block a listing change. */
export async function deleteVehicleImages(urls: string[]): Promise<void> {
	if (!env.BLOB_READ_WRITE_TOKEN || urls.length === 0) return;
	try {
		await del(urls, { token: env.BLOB_READ_WRITE_TOKEN });
	} catch {
		// ignore
	}
}
