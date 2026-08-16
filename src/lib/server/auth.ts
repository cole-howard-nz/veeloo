import { createHmac, timingSafeEqual } from 'node:crypto';
import { env } from '$env/dynamic/private';

export const ADMIN_SESSION_COOKIE = 'veeloo_admin_session';
const SESSION_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function safeEqual(a: string, b: string): boolean {
	const bufA = Buffer.from(a);
	const bufB = Buffer.from(b);
	if (bufA.length !== bufB.length) return false;
	return timingSafeEqual(bufA, bufB);
}

export function verifyPassword(candidate: string): boolean {
	if (!env.ADMIN_PASSWORD) return false;
	return safeEqual(candidate, env.ADMIN_PASSWORD);
}

function sign(payload: string): string {
	return createHmac('sha256', env.ADMIN_SESSION_SECRET ?? '')
		.update(payload)
		.digest('base64url');
}

export function createSessionCookie(): string {
	const payload = Buffer.from(JSON.stringify({ exp: Date.now() + SESSION_MAX_AGE_MS })).toString(
		'base64url'
	);
	return `${payload}.${sign(payload)}`;
}

export function verifySessionCookie(value: string | undefined): boolean {
	if (!value || !env.ADMIN_SESSION_SECRET) return false;
	const [payload, signature] = value.split('.');
	if (!payload || !signature) return false;
	if (!safeEqual(signature, sign(payload))) return false;

	try {
		const { exp } = JSON.parse(Buffer.from(payload, 'base64url').toString()) as { exp: number };
		return typeof exp === 'number' && exp > Date.now();
	} catch {
		return false;
	}
}

export const SESSION_COOKIE_MAX_AGE = SESSION_MAX_AGE_MS / 1000;
