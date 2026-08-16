<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { vehicles, getSoldVehicles } from '$lib/data/vehicles';

	const soldCount = getSoldVehicles().length;

	const steps = [
		{
			n: '01',
			title: 'We find it',
			body: 'No auction-house bulk buys. We work a network of owners, dealers and yards in Japan and chase specific chassis codes people actually ask us for.'
		},
		{
			n: '02',
			title: 'We inspect it',
			body: "Photos, video, a proper look at the panels and the paperwork before anything is paid for. If it wouldn't pass our own check, it doesn't get listed."
		},
		{
			n: '03',
			title: 'We import it',
			body: 'Shipped, complied and put on NZ plates before it ever reaches the feed - what you see on Instagram is ready to go, not a promise.'
		},
		{
			n: '04',
			title: 'We hand it over',
			body: "A straight conversation about the car, not a checkout flow. You know exactly what you're buying and who from."
		}
	];
</script>

<svelte:head>
	<title>The Story - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-10">
	<div use:reveal class="reveal">
		<span class="font-mono text-xs tracking-[0.2em] text-ink-soft uppercase">Behind it</span>
		<h1 class="mt-4 max-w-2xl font-display text-5xl sm:text-6xl">
			Built by people who'd rather <span class="font-accent">talk cars</span> than sell them.
		</h1>
		<p class="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
			Veeloo started the same way most good JDM buys do - chasing a specific chassis code, not
			browsing a lot. We just kept doing it, for other people.
		</p>
	</div>
</section>

<!-- Credibility stats -->
<section class="border-y border-line bg-bg-alt">
	<div use:reveal class="reveal mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-14 sm:grid-cols-4">
		<div>
			<span class="block font-display text-4xl text-ink">{vehicles.length}+</span>
			<span class="font-mono text-xs text-ink-soft uppercase">Cars sourced</span>
		</div>
		<div>
			<span class="block font-display text-4xl text-ink">{soldCount}+</span>
			<span class="font-mono text-xs text-ink-soft uppercase">Sold to good homes</span>
		</div>
		<div>
			<span class="block font-display text-4xl text-ink">100%</span>
			<span class="font-mono text-xs text-ink-soft uppercase">Via IG, no dealer lot</span>
		</div>
		<div>
			<span class="block font-display text-4xl text-ink">0</span>
			<span class="font-mono text-xs text-ink-soft uppercase">Cars we haven't inspected</span>
		</div>
	</div>
</section>

<!-- How sourcing works -->
<section class="mx-auto max-w-6xl px-6 py-20">
	<div use:reveal class="reveal border-b border-line pb-4">
		<h2 class="font-display text-2xl sm:text-3xl">How sourcing works</h2>
	</div>
	<div class="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2">
		{#each steps as step, i (step.n)}
			<div use:reveal style="--reveal-delay: {(i % 2) * 90}ms" class="reveal flex gap-5">
				<span class="font-mono text-sm text-accent">{step.n}</span>
				<div>
					<h3 class="font-display text-lg">{step.title}</h3>
					<p class="mt-2 max-w-sm text-[0.9rem] leading-relaxed text-ink-soft">{step.body}</p>
				</div>
			</div>
		{/each}
	</div>
</section>

<!-- Who's behind it -->
<section class="border-t border-line bg-bg-alt">
	<div class="mx-auto max-w-6xl px-6 py-24">
		<div use:reveal class="reveal grid gap-8 lg:grid-cols-[auto_1fr] lg:items-start lg:gap-16">
			<span class="font-mono text-xs tracking-[0.2em] text-ink-soft uppercase">Who's behind it</span
			>
			<p class="max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
				Run by people who import their own cars too - <span class="font-accent">every listing</span>
				is one we'd be happy to have shown up in our own driveway.
			</p>
		</div>
	</div>
</section>

<!-- Closing CTA -->
<section class="border-t border-line">
	<div
		use:reveal
		class="reveal mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-20"
	>
		<h2 class="max-w-lg font-display text-3xl leading-tight sm:text-4xl">
			Got a chassis code in mind? <span class="font-accent">Ask us</span> before it lands.
		</h2>
		<a
			href={resolve('/enquire')}
			class="btn-pill shrink-0 rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase"
		>
			Enquire
		</a>
	</div>
</section>
