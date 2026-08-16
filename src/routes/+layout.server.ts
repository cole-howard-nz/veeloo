import { getVehicles } from '$lib/server/vehicles';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	return { vehicles: await getVehicles() };
};
