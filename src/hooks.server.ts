import { redirect, type Handle } from '@sveltejs/kit';
import { ADMIN_SESSION_COOKIE, verifySessionCookie } from '$lib/server/auth';

const PUBLIC_ADMIN_PATHS = ['/admin/login', '/admin/logout'];

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.isAdmin = verifySessionCookie(event.cookies.get(ADMIN_SESSION_COOKIE));

	if (
		event.url.pathname.startsWith('/admin') &&
		!PUBLIC_ADMIN_PATHS.includes(event.url.pathname) &&
		!event.locals.isAdmin
	) {
		redirect(303, '/admin/login');
	}

	return resolve(event);
};
