import { env } from '$env/dynamic/private';

export interface InstagramPost {
	id: string;
	permalink: string;
	imageUrl: string;
	caption?: string;
}

interface GraphMediaItem {
	id: string;
	permalink: string;
	media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
	media_url: string;
	thumbnail_url?: string;
	caption?: string;
}

const EDGE_CONFIG_TOKEN_KEY = 'instagram_access_token';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour - keeps us well under Edge Config's free read quota.

let postsCache: { posts: InstagramPost[]; fetchedAt: number } | null = null;

/**
 * The refresh cron writes the renewed token to Edge Config (readable at request time,
 * no redeploy needed). INSTAGRAM_ACCESS_TOKEN is only the local-dev / bootstrap fallback,
 * used before Edge Config has been wired up or when running outside Vercel.
 */
export async function getCurrentAccessToken(): Promise<string | undefined> {
	if (env.EDGE_CONFIG) {
		try {
			const { get } = await import('@vercel/edge-config');
			const token = await get<string>(EDGE_CONFIG_TOKEN_KEY);
			if (token) return token;
		} catch {
			// Edge Config unreachable/misconfigured - fall through to the env fallback.
		}
	}
	return env.INSTAGRAM_ACCESS_TOKEN || undefined;
}

export async function getRecentInstagramPosts(limit = 6): Promise<InstagramPost[]> {
	if (postsCache && Date.now() - postsCache.fetchedAt < CACHE_TTL_MS) {
		return postsCache.posts;
	}

	const userId = env.INSTAGRAM_USER_ID;
	const token = await getCurrentAccessToken();
	if (!userId || !token) return postsCache?.posts ?? [];

	const url = new URL(`https://graph.instagram.com/v23.0/${userId}/media`);
	url.searchParams.set(
		'fields',
		'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp'
	);
	url.searchParams.set('limit', String(limit));
	url.searchParams.set('access_token', token);

	let res: Response;
	try {
		res = await fetch(url);
	} catch {
		return postsCache?.posts ?? [];
	}
	if (!res.ok) {
		return postsCache?.posts ?? [];
	}

	const { data } = (await res.json()) as { data: GraphMediaItem[] };
	const posts = data
		.filter((item) => item.media_type !== 'VIDEO' || item.thumbnail_url)
		.slice(0, limit)
		.map((item) => ({
			id: item.id,
			permalink: item.permalink,
			imageUrl: item.media_type === 'VIDEO' ? item.thumbnail_url! : item.media_url,
			caption: item.caption
		}));

	postsCache = { posts, fetchedAt: Date.now() };
	return posts;
}
