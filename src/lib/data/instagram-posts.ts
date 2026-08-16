export interface CuratedInstagramPost {
	id: string;
	/** Path under /static - drop the file in static/instagram/ and reference it here, e.g. '/instagram/ae86-drift-day.jpg'. */
	image: string;
	/** Link to the actual Instagram post if you have it, otherwise the profile. */
	permalink: string;
	alt: string;
}

/**
 * Manually maintained "From the feed" content - used until the client's Instagram
 * Business account is connected and the live Graph API integration
 * (src/lib/server/instagram.ts) can take over automatically. Add/remove entries here
 * whenever there's a new post worth featuring; the homepage falls back to placeholder
 * tiles automatically while this list is empty.
 */
export const curatedInstagramPosts: CuratedInstagramPost[] = [
	{
		id: 'ig-2026-08-12',
		image: '/instagram/ig-2026-08-12.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Fresh arrival, shared 12 August 2026'
	},
	{
		id: 'ig-2026-08-10',
		image: '/instagram/ig-2026-08-10.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Detail work by @topspec.details, shared 10 August 2026'
	},
	{
		id: 'ig-2026-08-05',
		image: '/instagram/ig-2026-08-05.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Shared 5 August 2026'
	},
	{
		id: 'ig-2026-08-04',
		image: '/instagram/ig-2026-08-04.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Shared 4 August 2026'
	},
	{
		id: 'ig-2026-08-03',
		image: '/instagram/ig-2026-08-03.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Shared 3 August 2026'
	},
	{
		id: 'ig-2026-07-29',
		image: '/instagram/ig-2026-07-29.jpg',
		permalink: 'https://www.instagram.com/veelooinvestments/',
		alt: 'Shared 29 July 2026'
	}
];
