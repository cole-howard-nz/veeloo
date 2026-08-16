import type { RouteId } from '$app/types';

/**
 * Deliberately a fixed literal union, not `Exclude<RouteId, ...>` - this app now has several
 * dynamic (param-taking) routes (stock/[slug], the admin edit page), and mixing param-taking
 * and param-less route ids in one union breaks resolve()'s overload inference. Nav only ever
 * points at these four static routes anyway.
 */
type NavRouteId = Extract<RouteId, '/stock' | '/sold' | '/finance' | '/enquire'>;

/** Shared between SiteHeader and SiteFooter so the two navs never drift apart. */
export const navLinks: { href: NavRouteId; label: string }[] = [
	{ href: '/stock', label: 'Stock' },
	{ href: '/sold', label: 'Sold' },
	{ href: '/finance', label: 'Finance' },
	{ href: '/enquire', label: 'Enquire' }
];
