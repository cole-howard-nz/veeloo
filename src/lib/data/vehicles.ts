import type { Vehicle } from '$lib/types';

/**
 * Fallback/seed stock, used by $lib/server/vehicles when Edge Config isn't configured
 * (local dev) or unreachable. The admin CMS at /admin is the source of truth in production -
 * see $lib/server/vehicles.ts for the read/write layer that backs it.
 */
export const vehicles: Vehicle[] = [
	{
		slug: 'zn6-86-2012',
		chassisCode: 'ZN6',
		model: 'Toyota 86 GT86',
		year: 2012,
		engine: 'FA20 2.0L Boxer',
		drivetrain: 'RWD',
		transmission: '6-speed automatic',
		odometerKm: 100722,
		colour: 'Black',
		status: 'available',
		justLanded: true,
		priceNZD: 21995,
		priceDisplay: '$21,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'The everyday entry point into the whole genre - balanced, unmodified, and ready to drive away.',
		images: [
			'/vehicles/zn6-86-2012/1.jpg',
			'/vehicles/zn6-86-2012/2.jpg',
			'/vehicles/zn6-86-2012/3.jpg'
		]
	},
	{
		slug: 'ct9a-evo9-2006',
		chassisCode: 'CT9A',
		model: 'Mitsubishi Lancer Evolution IX MR',
		year: 2006,
		engine: '4G63T 2.0L Turbo',
		drivetrain: 'AWD',
		transmission: '6-speed manual',
		odometerKm: 118539,
		colour: 'Graphite Grey Pearl',
		status: 'available',
		priceNZD: 74880,
		priceDisplay: '$74,880',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'MR spec, the last and most sorted of the Evo IX run - this one is as close to unmolested as they come now.',
		images: [
			'/vehicles/ct9a-evo9-2006/1.jpg',
			'/vehicles/ct9a-evo9-2006/2.jpg',
			'/vehicles/ct9a-evo9-2006/3.jpg'
		]
	},
	{
		slug: 's180-crown-athlete-2004',
		chassisCode: 'S180',
		model: 'Toyota Crown Athlete G Package',
		year: 2004,
		engine: '3GR-FSE 3.0L V6',
		drivetrain: 'RWD',
		transmission: '6-speed automatic',
		odometerKm: 105000,
		colour: 'White',
		status: 'available',
		priceNZD: 13995,
		priceDisplay: '$13,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story: 'The quiet, comfortable end of the JDM sedan world - a proper daily with V6 manners.',
		images: [
			'/vehicles/s180-crown-athlete-2004/1.jpg',
			'/vehicles/s180-crown-athlete-2004/2.jpg',
			'/vehicles/s180-crown-athlete-2004/3.jpg'
		]
	},
	{
		slug: 'gdb-sti-2004',
		chassisCode: 'GDB',
		model: 'Subaru Impreza WRX STI Version 9',
		year: 2004,
		engine: 'EJ207 2.0L Turbo',
		drivetrain: 'AWD',
		transmission: '6-speed manual',
		odometerKm: 99846,
		colour: 'Blue',
		status: 'available',
		justLanded: true,
		priceNZD: 39995,
		priceDisplay: '$39,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'Version 9, in the colour everyone pictures when you say the name. Straight and honest under 100,000km.',
		images: [
			'/vehicles/gdb-sti-2004/1.jpg',
			'/vehicles/gdb-sti-2004/2.jpg',
			'/vehicles/gdb-sti-2004/3.jpg'
		]
	},
	{
		slug: 'ct9a-evo8-2003',
		chassisCode: 'CT9A',
		model: 'Mitsubishi Lancer Evolution VIII',
		year: 2003,
		engine: '4G63T 2.0L Turbo',
		drivetrain: 'AWD',
		transmission: '5-speed manual',
		odometerKm: 109682,
		colour: 'Medium Purple Mica',
		status: 'available',
		priceNZD: 67990,
		priceDisplay: '$67,990',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our excellent-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'A genuinely excellent-grade VIII in a colour you don’t see twice. The kind of find that doesn’t last.',
		images: [
			'/vehicles/ct9a-evo8-2003/1.jpg',
			'/vehicles/ct9a-evo8-2003/2.jpg',
			'/vehicles/ct9a-evo8-2003/3.jpg'
		]
	},
	{
		slug: 'gx100-markii-1999',
		chassisCode: 'GX100',
		model: 'Toyota Mark II Grande Regalia',
		year: 1999,
		engine: '1G-FE 2.0L',
		drivetrain: 'RWD',
		transmission: '4-speed automatic',
		odometerKm: 133059,
		colour: 'White',
		status: 'available',
		priceNZD: 14995,
		priceDisplay: '$14,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story: 'Same bones as the Chaser and Cresta, dressed for comfort instead of chaos.',
		images: [
			'/vehicles/gx100-markii-1999/1.jpg',
			'/vehicles/gx100-markii-1999/2.jpg',
			'/vehicles/gx100-markii-1999/3.jpg'
		]
	},
	{
		slug: 'bnr34-gtr-1999',
		chassisCode: 'BNR34',
		model: 'Nissan Skyline GT-R',
		year: 1999,
		engine: 'RB26DETT Twin Turbo',
		drivetrain: 'AWD',
		transmission: '6-speed manual',
		odometerKm: 125000,
		colour: 'Black',
		status: 'on-hold',
		justLanded: true,
		priceNZD: 210000,
		priceDisplay: '$210,000',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'The one everyone asks about first. Already got serious interest, so it’s on hold - enquire anyway.',
		images: [
			'/vehicles/bnr34-gtr-1999/1.jpg',
			'/vehicles/bnr34-gtr-1999/2.jpg',
			'/vehicles/bnr34-gtr-1999/3.jpg'
		]
	},
	{
		slug: 'sxe10-altezza-1998',
		chassisCode: 'SXE10',
		model: 'Toyota Altezza RS200',
		year: 1998,
		engine: '3S-GE 2.0L VVTi',
		drivetrain: 'RWD',
		transmission: '4-speed automatic',
		odometerKm: 140653,
		colour: 'Orange',
		status: 'available',
		justLanded: true,
		priceNZD: 14995,
		priceDisplay: '$14,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story: 'The car the IS300 was built from, in a colour that refuses to blend in.',
		images: [
			'/vehicles/sxe10-altezza-1998/1.jpg',
			'/vehicles/sxe10-altezza-1998/2.jpg',
			'/vehicles/sxe10-altezza-1998/3.jpg'
		]
	},
	{
		slug: 's14-silvia-1997',
		chassisCode: 'S14',
		model: 'Nissan Silvia (Facelift)',
		year: 1997,
		engine: 'SR20DET Turbo',
		drivetrain: 'RWD',
		transmission: '5-speed manual',
		odometerKm: 208000,
		colour: 'White',
		status: 'available',
		justLanded: true,
		priceNZD: 49995,
		priceDisplay: '$49,995',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story: 'High kilometres, honestly declared - priced and presented for exactly what it is.',
		images: [
			'/vehicles/s14-silvia-1997/1.jpg',
			'/vehicles/s14-silvia-1997/2.jpg',
			'/vehicles/s14-silvia-1997/3.jpg'
		]
	},
	{
		slug: 'rps13-180sx-1989',
		chassisCode: 'RPS13',
		model: 'Nissan 180SX',
		year: 1989,
		engine: 'RB26DETT Twin Turbo',
		drivetrain: 'RWD',
		transmission: 'Manual',
		odometerKm: 178000,
		colour: 'Grey',
		status: 'sold',
		soldDate: '2026-04-05',
		priceNZD: 40000,
		priceDisplay: '$40,000',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our very-good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'A genuine RB26DETT swap under a widebody 180SX shell - rebuilt bottom end, Power FC, and an S15 interior tying it together.',
		images: [
			'/vehicles/rps13-180sx-1989/1.jpg',
			'/vehicles/rps13-180sx-1989/2.jpg',
			'/vehicles/rps13-180sx-1989/3.jpg'
		]
	},
	{
		slug: 's15-spec-r-1999',
		chassisCode: 'S15',
		model: 'Nissan Silvia Spec R',
		year: 1999,
		engine: 'SR20DET 2.0L Turbo',
		drivetrain: 'RWD',
		transmission: '6-speed manual',
		odometerKm: 111000,
		colour: 'Pearl two-tone',
		status: 'sold',
		soldDate: '2026-07-22',
		priceNZD: 49990,
		priceDisplay: '$49,990',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our excellent-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			"A 326 Power-built showcar with a widebody kit and Itasha livery straight from Japan's Shakotan scene - one of one here.",
		images: [
			'/vehicles/s15-spec-r-1999/1.jpg',
			'/vehicles/s15-spec-r-1999/2.jpg',
			'/vehicles/s15-spec-r-1999/3.jpg'
		]
	},
	{
		slug: 'hcr32-skyline-1992',
		chassisCode: 'HCR32',
		model: 'Nissan Skyline GTS-t',
		year: 1992,
		engine: 'RB25DET 2.5L Turbo',
		drivetrain: 'RWD',
		transmission: 'Manual',
		odometerKm: 170000,
		colour: 'Red',
		status: 'sold',
		soldDate: '2026-06-30',
		priceNZD: 42990,
		priceDisplay: '$42,990',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our good-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'An RB25 swapped R32 running a GTX3076R and a full supporting cast - built to be driven hard, not just looked at.',
		images: [
			'/vehicles/hcr32-skyline-1992/1.jpg',
			'/vehicles/hcr32-skyline-1992/2.jpg',
			'/vehicles/hcr32-skyline-1992/3.jpg'
		]
	},
	{
		slug: 'jce10w-altezza-gita-2001',
		chassisCode: 'JCE10W',
		model: 'Toyota Altezza Gita',
		year: 2001,
		engine: '3UZ-FE 4.3L V8',
		drivetrain: 'RWD',
		transmission: 'R150/R154 hybrid 5-speed manual',
		odometerKm: 264000,
		colour: 'White',
		status: 'sold',
		soldDate: '2026-05-18',
		priceNZD: 29990,
		priceDisplay: '$29,990',
		importStatus: 'Used import',
		conditionNotes:
			'Passed our excellent-condition standard before listing - mechanical, cosmetic, and odometer checks all verified.',
		story:
			'A 3UZ V8-swapped Altezza Gita wagon - Porsche Brembos, a TRD diff, and a build sharp enough to make NZ Performance Car.',
		images: [
			'/vehicles/jce10w-altezza-gita-2001/1.jpg',
			'/vehicles/jce10w-altezza-gita-2001/2.jpg',
			'/vehicles/jce10w-altezza-gita-2001/3.jpg'
		]
	}
];

export function getVehicleBySlug(vehicles: Vehicle[], slug: string): Vehicle | undefined {
	return vehicles.find((v) => v.slug === slug);
}

export function getAvailableVehicles(vehicles: Vehicle[]): Vehicle[] {
	return vehicles.filter((v) => v.status !== 'sold');
}

export function getSoldVehicles(vehicles: Vehicle[]): Vehicle[] {
	return vehicles
		.filter((v) => v.status === 'sold')
		.sort((a, b) => (b.soldDate ?? '').localeCompare(a.soldDate ?? ''));
}

export function getJustLanded(vehicles: Vehicle[]): Vehicle[] {
	return vehicles.filter((v) => v.justLanded);
}
