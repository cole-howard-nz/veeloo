export type VehicleStatus = 'available' | 'on-hold' | 'sold';

export interface Vehicle {
	slug: string;
	chassisCode: string;
	model: string;
	year: number;
	engine: string;
	drivetrain: 'RWD' | 'AWD' | 'FWD';
	transmission: string;
	odometerKm: number;
	colour: string;
	status: VehicleStatus;
	justLanded?: boolean;
	priceNZD: number;
	priceDisplay: string;
	soldDate?: string;
	importStatus: string;
	conditionNotes: string;
	story: string;
	/** Paths under /static/vehicles/<slug>/. Empty until photography is in — falls back to a placeholder tile. */
	images: string[];
}
