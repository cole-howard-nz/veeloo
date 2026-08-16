import { redirect } from '@sveltejs/kit';
import { ADMIN_SESSION_COOKIE } from '$lib/server/auth';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete(ADMIN_SESSION_COOKIE, { path: '/' });
	redirect(303, '/admin/login');
};
