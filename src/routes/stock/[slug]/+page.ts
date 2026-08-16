import { error } from '@sveltejs/kit';
import { getVehicleBySlug } from '$lib/data/vehicles';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const vehicle = getVehicleBySlug(params.slug);
	if (!vehicle) {
		throw error(404, 'Vehicle not found');
	}
	return { vehicle };
};
