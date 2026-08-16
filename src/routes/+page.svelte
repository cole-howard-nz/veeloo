<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { typeReveal } from '$lib/actions/typeReveal';
	import { dragScroll } from '$lib/actions/dragScroll';
	import VehicleCard from '$lib/components/VehicleCard.svelte';
	import FadeImage from '$lib/components/FadeImage.svelte';
	import {
		getAvailableVehicles,
		getJustLanded,
		getSoldVehicles,
		vehicles
	} from '$lib/data/vehicles';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const justLanded = getJustLanded();
	const teaserStock = getAvailableVehicles().slice(0, 8);
	const soldTeaser = getSoldVehicles().slice(0, 3);
	const carousel = justLanded.length > 0 ? justLanded : teaserStock.slice(0, 4);
	const feedTiles = Array.from({ length: 6 }, (_, i) => i);
</script>

<svelte:head>
	<title>Veeloo - JDM Street Spec</title>
</svelte:head>

<!-- Hero -->
<section class="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
	<h1
		use:typeReveal={{ stepMs: 26 }}
		class="type-reveal mt-6 max-w-3xl font-display text-6xl leading-[0.95] sm:text-7xl lg:text-8xl"
	>
		Iconic favourites<br />
		direct from <span class="font-accent text-accent">Japan.</span>
	</h1>
	<div
		use:reveal
		style="--reveal-delay: 120ms"
		class="reveal mt-10 flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between"
	>
		<p class="max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">
			Hand picked JDM vehicles, sourced direct and sold via a straight conversation.
		</p>
		<div class="flex items-center gap-10">
			<div class="font-mono text-xs text-ink-soft uppercase">
				<span class="block font-display text-3xl text-ink">{vehicles.length}+</span>
				Vehicles
			</div>
			<div class="font-mono text-xs text-ink-soft uppercase">
				<span class="block font-display text-3xl text-ink">100%</span>
				Via IG
			</div>
		</div>
	</div>
</section>

<!-- Chassis-code ticker -->
<!-- <div class="overflow-hidden border-y border-line py-4">
	<div class="marquee-track">
		{#each [0, 1] as pass (pass)}
			<div class="flex shrink-0 items-center gap-8 pr-8 font-mono text-sm text-ink-soft uppercase">
				{#each tickerCodes as code, i (pass + '-' + i)}
					<span class="flex items-center gap-8">
						{code}
						<span class="text-accent">·</span>
					</span>
				{/each}
			</div>
		{/each}
	</div>
</div> -->

<!-- Just landed -->
{#if carousel.length > 0}
	<section class="mx-auto max-w-6xl px-6 py-20">
		<div use:reveal class="reveal flex items-baseline justify-between border-b border-line pb-4">
			<div class="flex items-baseline gap-3">
				<h2 class="font-display text-2xl sm:text-3xl">Just landed</h2>
			</div>
			<a
				href={resolve('/stock')}
				class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
			>
				All stock →
			</a>
		</div>
		<p class="mt-3 font-mono text-xs text-ink-soft uppercase">Drag to browse</p>
		<div use:dragScroll class="drag-scroll no-scrollbar mt-6 flex gap-6 overflow-x-auto pb-2">
			{#each carousel as vehicle, i (vehicle.slug)}
				<div class="w-60 shrink-0 sm:w-75">
					<VehicleCard {vehicle} index={i} />
				</div>
			{/each}
		</div>
	</section>
{/if}

<!-- Current stock teaser -->
<section class="mx-auto max-w-6xl px-6 py-20">
	<div use:reveal class="reveal flex items-baseline justify-between border-b border-line pb-4">
		<div class="flex items-baseline gap-3">
			<h2 class="font-display text-2xl sm:text-3xl">Current stock</h2>
		</div>
		<a
			href={resolve('/stock')}
			class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
		>
			Browse all →
		</a>
	</div>
	<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
		{#each teaserStock as vehicle, i (vehicle.slug)}
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
</section>

<!-- Philosophy -->
<section class="border-t border-line bg-bg-alt">
	<div class="mx-auto max-w-6xl px-6 py-24">
		<div class="grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
			<p
				use:typeReveal={{ stepMs: 14 }}
				class="type-reveal max-w-2xl font-display text-3xl leading-tight sm:text-4xl"
			>
				We source one chassis from owners we've actually spoken to, then we hand it to you the same
				way. A
				<span class="font-accent text-accent">conversation,</span> not a checkout button.
			</p>
		</div>
	</div>
</section>

<!-- Instagram bridge -->
<section class="border-y border-line bg-bg-alt">
	<div class="mx-auto max-w-6xl px-6 py-20">
		<div use:reveal class="reveal flex items-baseline justify-between border-b border-line pb-4">
			<div class="flex items-baseline gap-3">
				<h2 class="font-display text-2xl sm:text-3xl">From the feed</h2>
			</div>
			<a
				href="https://www.instagram.com/veelooinvestments/"
				class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
			>
				@veelooinvestments
			</a>
		</div>
		{#if data.instagramPosts.length > 0}
			<div class="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-6">
				{#each data.instagramPosts as post, i (post.id)}
					<a
						href={post.permalink}
						rel="external"
						use:reveal
						style="--reveal-delay: {(i % 6) * 60}ms"
						class="reveal group aspect-square overflow-hidden bg-ink"
						aria-label={post.caption ?? 'View post on Instagram'}
					>
						<FadeImage
							src={post.imageUrl}
							alt={post.caption ?? 'Veeloo Instagram post'}
							loading="lazy"
							class="h-full w-full scale-100 object-cover group-hover:scale-105 group-hover:opacity-80"
						/>
					</a>
				{/each}
			</div>
		{:else}
			<a
				href="https://www.instagram.com/veelooinvestments/"
				class="mt-6 grid grid-cols-3 gap-1.5 sm:grid-cols-6"
			>
				{#each feedTiles as tile (tile)}
					<div
						use:reveal
						style="--reveal-delay: {(tile % 6) * 60}ms"
						class="reveal aspect-square bg-linear-to-br from-ink/70 via-ink/40 to-ink/20 transition hover:opacity-80"
					></div>
				{/each}
			</a>
		{/if}
	</div>
</section>

<!-- Recently sold -->
{#if soldTeaser.length > 0}
	<section class="mx-auto max-w-6xl px-6 py-20">
		<div use:reveal class="reveal flex items-baseline justify-between border-b border-line pb-4">
			<div class="flex items-baseline gap-3">
				<h2 class="font-display text-2xl sm:text-3xl">Recently sold</h2>
			</div>
			<a
				href={resolve('/sold')}
				class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
			>
				Full archive →
			</a>
		</div>
		<div class="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
			{#each soldTeaser as vehicle, i (vehicle.slug)}
				<VehicleCard {vehicle} index={i} />
			{/each}
		</div>
	</section>
{/if}

<!-- Closing CTA -->
<section class="border-t border-line">
	<div
		use:reveal
		class="reveal mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-20"
	>
		<h2
			use:typeReveal={{ stepMs: 22 }}
			class="type-reveal max-w-lg font-display text-3xl leading-tight sm:text-4xl"
		>
			Looking for something specific? Tell us what you're <span class="font-accent text-accent"
				>hunting.</span
			>
		</h2>
		<a
			href={resolve('/enquire')}
			class="btn-pill shrink-0 rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase"
		>
			Enquire
		</a>
	</div>
</section>
