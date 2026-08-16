<script lang="ts">
	import { resolve } from '$app/paths';
	import { fade } from 'svelte/transition';
	import { reveal } from '$lib/actions/reveal';
	import type { PageData } from './$types';
	import StatusTag from '$lib/components/StatusTag.svelte';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import FadeImage from '$lib/components/FadeImage.svelte';
	import { vehicles } from '$lib/data/vehicles';

	let { data }: { data: PageData } = $props();
	const vehicle = $derived(data.vehicle);

	let activeImage = $state(0);
	$effect(() => {
		if (vehicle.slug) activeImage = 0;
	});

	const related = $derived(
		vehicles
			.filter(
				(v) => v.slug !== vehicle.slug && v.status !== 'sold' && v.drivetrain === vehicle.drivetrain
			)
			.slice(0, 3)
	);

	const specs = $derived([
		{ label: 'Engine', value: vehicle.engine },
		{ label: 'Drivetrain', value: vehicle.drivetrain },
		{ label: 'Transmission', value: vehicle.transmission },
		{ label: 'Odometer', value: `${vehicle.odometerKm.toLocaleString()} km` },
		{ label: 'Colour', value: vehicle.colour },
		{ label: 'Import status', value: vehicle.importStatus },
		...(vehicle.soldDate
			? [{ label: 'Sold', value: new Date(vehicle.soldDate).toLocaleDateString('en-NZ') }]
			: [])
	]);
</script>

<svelte:head>
	<title>{vehicle.chassisCode} {vehicle.model} - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-12 pb-20">
	<a
		href={resolve('/stock')}
		class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
	>
		← Back to stock
	</a>

	<div class="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
		<!-- Gallery -->
		<div>
			<div
				class="relative aspect-4/3 overflow-hidden bg-linear-to-br from-ink via-ink/70 to-ink/40"
			>
				{#if vehicle.images.length > 0}
					{#key vehicle.images[activeImage]}
						<div class="absolute inset-0" in:fade={{ duration: 350 }}>
							<FadeImage
								src={vehicle.images[activeImage]}
								alt="{vehicle.year} {vehicle.chassisCode} {vehicle.model}"
								class="h-full w-full object-cover"
							/>
						</div>
					{/key}
				{:else}
					<p class="absolute right-4 bottom-4 font-mono text-[0.6rem] text-white/60">
						[gallery - real inventory photography]
					</p>
				{/if}
				<div class="absolute inset-x-4 top-4">
					<StatusTag status={vehicle.status} justLanded={vehicle.justLanded} />
				</div>
			</div>
			{#if vehicle.images.length > 1}
				<div class="mt-3 grid grid-cols-4 gap-3">
					{#each vehicle.images as image, i (image)}
						<button
							type="button"
							onclick={() => (activeImage = i)}
							class="aspect-4/3 overflow-hidden border transition duration-300 {activeImage === i
								? 'border-ink'
								: 'border-transparent opacity-70 hover:opacity-100'}"
						>
							<FadeImage
								src={image}
								alt="{vehicle.chassisCode} thumbnail {i + 1}"
								class="h-full w-full object-cover"
							/>
						</button>
					{/each}
				</div>
			{/if}
		</div>

		<!-- Spec sheet -->
		<div use:reveal class="reveal">
			<span class="font-mono text-xs tracking-[0.2em] text-ink-soft uppercase">
				{vehicle.year}
			</span>
			<h1 class="mt-2 font-display text-4xl sm:text-5xl">{vehicle.chassisCode}</h1>
			<p class="mt-1 font-mono text-sm text-ink-soft uppercase">{vehicle.model}</p>

			<dl class="mt-8 divide-y divide-line border-y border-line font-mono text-sm">
				{#each specs as spec (spec.label)}
					<div class="flex justify-between py-3">
						<dt class="text-ink-soft">{spec.label}</dt>
						<dd>{spec.value}</dd>
					</div>
				{/each}
			</dl>

			<div class="mt-6 flex items-baseline justify-between">
				<span class="font-display text-3xl">{vehicle.priceDisplay}</span>
			</div>

			<div class="mt-6 flex flex-wrap gap-3">
				{#if vehicle.status === 'sold'}
					<a
						href="{resolve('/enquire')}?ref={vehicle.slug}"
						class="btn-pill rounded-full bg-ink px-6 py-3 text-center font-mono text-xs tracking-wider text-bg uppercase"
					>
						Ask about similar stock
					</a>
				{:else}
					<a
						href="{resolve('/enquire')}?ref={vehicle.slug}"
						class="btn-pill rounded-full bg-ink px-6 py-3 text-center font-mono text-xs tracking-wider text-bg uppercase"
					>
						Enquire about this car
					</a>
					<a
						href="https://www.instagram.com/veelooinvestments/"
						class="link-underline flex items-center font-mono text-xs tracking-wider text-ink uppercase"
					>
						DM on IG →
					</a>
				{/if}
			</div>
		</div>
	</div>

	<!-- Story -->
	<div class="mt-16 grid gap-10 border-t border-line pt-10 lg:grid-cols-2">
		<div use:reveal class="reveal">
			<h2 class="font-display text-xl">The story</h2>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{vehicle.story}</p>
		</div>
		<div use:reveal style="--reveal-delay: 90ms" class="reveal">
			<h2 class="font-display text-xl">Condition notes</h2>
			<p class="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{vehicle.conditionNotes}</p>
		</div>
	</div>

	<!-- Related -->
	{#if related.length > 0}
		<div class="mt-16 border-t border-line pt-10">
			<h2 class="font-display text-xl">Similar rolling stock</h2>
			<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
				{#each related as rel, i (rel.slug)}
					<VehicleCard vehicle={rel} index={i} />
				{/each}
			</div>
		</div>
	{/if}
</section>
