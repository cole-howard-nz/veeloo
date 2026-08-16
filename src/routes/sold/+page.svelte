<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import { getSoldVehicles } from '$lib/data/vehicles';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const sold = $derived(getSoldVehicles(data.vehicles));
</script>

<svelte:head>
	<title>Sold Archive - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-20">
	<div use:reveal class="reveal">
		<h1 class="mt-4 font-display text-5xl sm:text-6xl">Sold archive</h1>
		<p class="mt-3 max-w-xl text-[0.95rem] text-ink-soft">
			Every car that's come through and gone to a good home.
		</p>
	</div>

	<div class="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
		{#each sold as vehicle, i (vehicle.slug)}
			<VehicleCard {vehicle} index={i} />
		{/each}
	</div>

	{#if sold.length === 0}
		<p class="mt-10 font-mono text-sm text-ink-soft">Nothing sold yet!</p>
	{/if}
</section>
