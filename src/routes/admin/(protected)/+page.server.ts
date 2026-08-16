import { fail } from '@sveltejs/kit';
import { getVehicles, mutateVehicles } from '$lib/server/vehicles';
import { deleteVehicleImages } from '$lib/server/vehicleForm';
import type { VehicleStatus } from '$lib/types';
import type { Actions, PageServerLoad } from './$types';

const VALID_STATUSES: VehicleStatus[] = ['available', 'on-hold', 'sold'];

export const load: PageServerLoad = async () => {
	const vehicles = await getVehicles();
	return { vehicles: [...vehicles].sort((a, b) => b.year - a.year) };
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();
		const slug = String(data.get('slug') ?? '');
		if (!slug) return fail(400, { error: 'Missing slug.' });

		const current = await getVehicles();
		const vehicle = current.find((v) => v.slug === slug);
		if (!vehicle) return fail(404, { error: 'Vehicle not found.' });

		await mutateVehicles((vehicles) => vehicles.filter((v) => v.slug !== slug));
		await deleteVehicleImages(vehicle.images);

		return { success: true };
	},

	updateStatus: async ({ request }) => {
		const data = await request.formData();
		const slug = String(data.get('slug') ?? '');
		const status = String(data.get('status') ?? '');

		if (!slug || !VALID_STATUSES.includes(status as VehicleStatus)) {
			return fail(400, { error: 'Invalid status update.' });
		}

		await mutateVehicles((vehicles) =>
			vehicles.map((v) =>
				v.slug === slug
					? {
							...v,
							status: status as VehicleStatus,
							soldDate:
								status === 'sold'
									? (v.soldDate ?? new Date().toISOString().slice(0, 10))
									: undefined
						}
					: v
			)
		);

		return { success: true };
	}
};
