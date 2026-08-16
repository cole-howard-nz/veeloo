import type { RouteId } from '$app/types';

/** Shared between SiteHeader and SiteFooter so the two navs never drift apart. */
export const navLinks: { href: Exclude<RouteId, '/stock/[slug]'>; label: string }[] = [
	{ href: '/stock', label: 'Stock' },
	{ href: '/sold', label: 'Sold' },
	{ href: '/finance', label: 'Finance' },
	{ href: '/enquire', label: 'Enquire' }
];
