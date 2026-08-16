import { error, json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import { getCurrentAccessToken } from '$lib/server/instagram';
import type { RequestHandler } from './$types';

/**
 * Hit daily by the Vercel Cron defined in vercel.json. Instagram long-lived tokens are
 * valid 60 days and refreshable any time they're 24h+ old, so a daily no-op-if-too-soon
 * call keeps this permanently ahead of expiry without any manual renewal.
 *
 * Vercel automatically sends `Authorization: Bearer $CRON_SECRET` on cron invocations
 * when CRON_SECRET is set on the project - that's what's checked below.
 */
export const GET: RequestHandler = async ({ request }) => {
	if (env.CRON_SECRET) {
		const auth = request.headers.get('authorization');
		if (auth !== `Bearer ${env.CRON_SECRET}`) {
			error(401, 'Unauthorized');
		}
	}

	const currentToken = await getCurrentAccessToken();
	if (!currentToken) {
		error(500, 'No Instagram access token configured');
	}

	const refreshUrl = new URL('https://graph.instagram.com/refresh_access_token');
	refreshUrl.searchParams.set('grant_type', 'ig_refresh_token');
	refreshUrl.searchParams.set('access_token', currentToken);

	const refreshRes = await fetch(refreshUrl);
	if (!refreshRes.ok) {
		error(502, `Instagram token refresh failed: ${await refreshRes.text()}`);
	}
	const { access_token: newToken, expires_in: expiresInSeconds } = (await refreshRes.json()) as {
		access_token: string;
		expires_in: number;
	};

	if (!env.VERCEL_API_TOKEN || !env.EDGE_CONFIG_ID) {
		return json({
			refreshed: true,
			persisted: false,
			note: 'VERCEL_API_TOKEN / EDGE_CONFIG_ID not set - new token was not stored anywhere.',
			expiresInSeconds
		});
	}

	const writeRes = await fetch(
		`https://api.vercel.com/v1/edge-config/${env.EDGE_CONFIG_ID}/items`,
		{
			method: 'PATCH',
			headers: {
				Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: [
					{ operation: 'upsert', key: 'instagram_access_token', value: newToken },
					{
						operation: 'upsert',
						key: 'instagram_token_refreshed_at',
						value: new Date().toISOString()
					}
				]
			})
		}
	);

	if (!writeRes.ok) {
		error(502, `Failed to persist refreshed token: ${await writeRes.text()}`);
	}

	return json({ refreshed: true, persisted: true, expiresInSeconds });
};
