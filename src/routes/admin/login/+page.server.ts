import { fail, redirect } from '@sveltejs/kit';
import { dev } from '$app/environment';
import {
	ADMIN_SESSION_COOKIE,
	SESSION_COOKIE_MAX_AGE,
	createSessionCookie,
	verifyPassword
} from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.isAdmin) {
		redirect(303, '/admin');
	}
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
		const password = String(data.get('password') ?? '');

		if (!verifyPassword(password)) {
			return fail(400, { error: 'Incorrect password.' });
		}

		cookies.set(ADMIN_SESSION_COOKIE, createSessionCookie(), {
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			path: '/',
			maxAge: SESSION_COOKIE_MAX_AGE
		});

		redirect(303, '/admin');
	}
};
