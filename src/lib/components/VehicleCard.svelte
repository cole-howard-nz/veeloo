<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import type { Vehicle } from '$lib/types';
	import StatusTag from './StatusTag.svelte';
	import FadeImage from './FadeImage.svelte';

	let { vehicle, index = 0 }: { vehicle: Vehicle; index?: number } = $props();
</script>

<a
	href={resolve('/stock/[slug]', { slug: vehicle.slug })}
	draggable="false"
	use:reveal
	style="--reveal-delay: {(index % 4) * 70}ms"
	class="reveal group block hover:-translate-y-1"
>
	<div class="relative aspect-4/3 overflow-hidden bg-linear-to-br from-ink via-ink/70 to-ink/40">
		{#if vehicle.images.length > 0}
			<FadeImage
				src={vehicle.images[0]}
				alt="{vehicle.year} {vehicle.chassisCode} {vehicle.model}"
				loading="lazy"
				draggable="false"
				class="h-full w-full scale-100 object-cover group-hover:scale-110"
			/>
			<div class="absolute inset-0 bg-linear-to-b from-black/25 via-transparent to-black/40"></div>
		{:else}
			<div
				class="absolute inset-0 scale-100 bg-linear-to-br from-transparent via-black/10 to-black/40 transition duration-700 ease-out group-hover:scale-110"
			></div>
		{/if}
		<div class="absolute inset-x-3 top-3 flex items-start justify-between">
			<StatusTag status={vehicle.status} justLanded={vehicle.justLanded} />
			<span class="font-mono text-[0.65rem] tracking-wider text-white/70">
				'{String(vehicle.year).slice(2)}
			</span>
		</div>
	</div>
	<div class="mt-3 flex items-baseline justify-between gap-3 border-t border-line pt-3">
		<div>
			<div class="font-display text-lg transition-colors duration-300 group-hover:text-accent">
				{vehicle.chassisCode}
			</div>
			<div class="mt-0.5 font-mono text-[0.65rem] tracking-wide text-ink-soft uppercase">
				{vehicle.model} · {vehicle.drivetrain}
			</div>
		</div>
		<span class="font-mono text-xs text-ink-soft">{vehicle.priceDisplay}</span>
	</div>
</a>
