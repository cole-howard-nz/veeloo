<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import { getAvailableVehicles } from '$lib/data/vehicles';

	const allStock = getAvailableVehicles();

	type Era = 'all' | '80s' | '90s' | '00s';
	type Drivetrain = 'all' | 'RWD' | 'AWD' | 'FWD';
	type Status = 'all' | 'available' | 'on-hold';
	type Sort = 'newest' | 'price-asc' | 'price-desc';

	let era = $state<Era>('all');
	let drivetrain = $state<Drivetrain>('all');
	let status = $state<Status>('all');
	let sort = $state<Sort>('newest');
	let query = $state('');

	function eraOf(year: number): '80s' | '90s' | '00s' {
		if (year < 1990) return '80s';
		if (year < 2000) return '90s';
		return '00s';
	}

	const filtered = $derived(
		allStock
			.filter((v) => {
				if (era !== 'all' && eraOf(v.year) !== era) return false;
				if (drivetrain !== 'all' && v.drivetrain !== drivetrain) return false;
				if (status !== 'all' && v.status !== status) return false;
				if (query.trim()) {
					const q = query.trim().toLowerCase();
					if (!v.chassisCode.toLowerCase().includes(q) && !v.model.toLowerCase().includes(q)) {
						return false;
					}
				}
				return true;
			})
			.sort((a, b) => {
				if (sort === 'price-asc') return a.priceNZD - b.priceNZD;
				if (sort === 'price-desc') return b.priceNZD - a.priceNZD;
				return 0;
			})
	);

	const eraOptions: { value: Era; label: string }[] = [
		{ value: 'all', label: 'All eras' },
		{ value: '80s', label: "'80s" },
		{ value: '90s', label: "'90s" },
		{ value: '00s', label: "'00s" }
	];
	const drivetrainOptions: { value: Drivetrain; label: string }[] = [
		{ value: 'all', label: 'All drivetrains' },
		{ value: 'RWD', label: 'RWD' },
		{ value: 'AWD', label: 'AWD' },
		{ value: 'FWD', label: 'FWD' }
	];
	const statusOptions: { value: Status; label: string }[] = [
		{ value: 'all', label: 'All statuses' },
		{ value: 'available', label: 'Available' },
		{ value: 'on-hold', label: 'On hold' }
	];

	const selectClass =
		'border-0 border-b border-line bg-transparent px-0 py-1.5 font-mono text-sm outline-none transition-colors duration-300 focus:border-ink appearance-none';
</script>

<svelte:head>
	<title>Current Stock - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-10">
	<div use:reveal class="reveal">
		<h1 class="mt-4 font-display text-5xl sm:text-6xl">Current stock</h1>
		<p class="mt-3 max-w-xl text-[0.95rem] text-ink-soft">
			Search by chassis code, not make and model.
		</p>
	</div>

	<!-- Filter bar -->
	<div class="mt-10 flex flex-wrap items-end gap-x-8 gap-y-5 border-y border-line py-6">
		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase"
				>Search chassis / model</span
			>
			<input
				type="text"
				placeholder="e.g. AE86, Chaser..."
				bind:value={query}
				class="border-0 border-b border-line bg-transparent px-0 py-1.5 font-mono text-sm transition-colors duration-300 outline-none focus:border-ink"
			/>
		</label>

		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Era</span>
			<select bind:value={era} class={selectClass}>
				{#each eraOptions as opt (opt.value)}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Drivetrain</span
			>
			<select bind:value={drivetrain} class={selectClass}>
				{#each drivetrainOptions as opt (opt.value)}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Status</span>
			<select bind:value={status} class={selectClass}>
				{#each statusOptions as opt (opt.value)}
					<option value={opt.value}>{opt.label}</option>
				{/each}
			</select>
		</label>

		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Sort</span>
			<select bind:value={sort} class={selectClass}>
				<option value="newest">Newest</option>
				<option value="price-asc">Price: low → high</option>
				<option value="price-desc">Price: high → low</option>
			</select>
		</label>

		<span class="ml-auto font-mono text-xs text-ink-soft"
			>{filtered.length} of {allStock.length} in stock</span
		>
	</div>

	<!-- Results -->
	<div class="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
		{#each filtered as vehicle, i (vehicle.slug)}
			<VehicleCard {vehicle} index={i} />
		{/each}

		<a
			href={resolve('/enquire')}
			class="flex aspect-4/3 flex-col items-start justify-center gap-1.5 border border-dashed border-line-strong p-4"
		>
			<span class="font-display text-base">Don't see it?</span>
			<span class="font-mono text-xs text-ink-soft">Tell us the chassis, we'll go find it →</span>
		</a>
	</div>

	{#if filtered.length === 0}
		<p transition:fade={{ duration: 250 }} class="mt-10 font-mono text-sm text-ink-soft">
			Nothing matches those filters - try widening the search.
		</p>
	{/if}
</section>
