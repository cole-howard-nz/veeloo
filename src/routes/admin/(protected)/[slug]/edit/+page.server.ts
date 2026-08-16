import { error, fail, redirect } from '@sveltejs/kit';
import { getVehicles, mutateVehicles } from '$lib/server/vehicles';
import { deleteVehicleImages, parseVehicleForm, VehicleFormError } from '$lib/server/vehicleForm';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const vehicles = await getVehicles();
	const vehicle = vehicles.find((v) => v.slug === params.slug);
	if (!vehicle) error(404, 'Vehicle not found');
	return { vehicle };
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const originalSlug = params.slug;
		const formData = await request.formData();

		const current = await getVehicles();
		if (!current.some((v) => v.slug === originalSlug)) {
			return fail(404, { error: 'Vehicle not found.' });
		}

		const slugForUploads =
			String(formData.get('slug') ?? '')
				.trim()
				.toLowerCase()
				.replace(/[^a-z0-9-]+/g, '-') || originalSlug;

		let vehicle;
		try {
			vehicle = await parseVehicleForm(formData, slugForUploads);
		} catch (err) {
			if (err instanceof VehicleFormError) return fail(400, { error: err.message });
			throw err;
		}

		if (vehicle.slug !== originalSlug && current.some((v) => v.slug === vehicle.slug)) {
			return fail(400, { error: `A vehicle with slug "${vehicle.slug}" already exists.` });
		}

		await mutateVehicles((vehicles) =>
			vehicles.map((v) => (v.slug === originalSlug ? vehicle : v))
		);

		const removedImages = formData.getAll('removedImages').map(String);
		await deleteVehicleImages(removedImages);

		redirect(303, '/admin');
	}
};
