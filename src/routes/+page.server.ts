import { getRecentInstagramPosts } from '$lib/server/instagram';
import { curatedInstagramPosts } from '$lib/data/instagram-posts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const livePosts = await getRecentInstagramPosts(6);
	const instagramPosts =
		livePosts.length > 0
			? livePosts
			: curatedInstagramPosts.map((post) => ({
					id: post.id,
					permalink: post.permalink,
					imageUrl: post.image,
					caption: post.alt
				}));
	return { instagramPosts };
};
