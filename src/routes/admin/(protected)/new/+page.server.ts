import { fail, redirect } from '@sveltejs/kit';
import { getVehicles, mutateVehicles } from '$lib/server/vehicles';
import { parseVehicleForm, VehicleFormError } from '$lib/server/vehicleForm';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const slugForUploads =
			String(formData.get('slug') ?? '')
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9-]+/g, '-') || 'vehicle';

		let vehicle;
		try {
			vehicle = await parseVehicleForm(formData, slugForUploads);
		} catch (err) {
			if (err instanceof VehicleFormError) return fail(400, { error: err.message });
			throw err;
		}

		const current = await getVehicles();
		if (current.some((v) => v.slug === vehicle.slug)) {
			return fail(400, { error: `A vehicle with slug "${vehicle.slug}" already exists.` });
		}

		await mutateVehicles((vehicles) => [...vehicles, vehicle]);
		redirect(303, '/admin');
	}
};
