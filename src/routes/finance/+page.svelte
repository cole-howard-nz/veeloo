<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { typeReveal } from '$lib/actions/typeReveal';

	const paths = [
		{
			tag: 'Buying',
			title: 'Finance pre-approval',
			body: 'Get a sense of what you can borrow before you commit to a chassis.',
			cta: 'Ask about finance',
			type: 'finance'
		},
		{
			tag: 'Selling or upgrading',
			title: 'Trade-in valuation',
			body: "Tell us what you're driving now and we'll give you a straight number.",
			cta: 'Get a valuation',
			type: 'trade-in'
		}
	];
</script>

<svelte:head>
	<title>Finance & Trade-In - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-10">
	<h1
		use:typeReveal={{ stepMs: 18 }}
		class="type-reveal mt-4 max-w-2xl font-display text-5xl sm:text-6xl"
	>
		Finance and <span class="font-accent text-accent">trade-ins,</span> sorted the same way as everything
		else.
	</h1>
	<p
		use:reveal
		style="--reveal-delay: 120ms"
		class="reveal mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft"
	>
		No calculators or forms that go nowhere. Tell us what you need and we'll get back to you with
		real numbers.
	</p>
</section>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid gap-6 border-t border-line pt-10 sm:grid-cols-2">
		{#each paths as path, i (path.type)}
			<div
				use:reveal
				style="--reveal-delay: {i * 90}ms"
				class="reveal group flex flex-col justify-between border border-line-strong p-8 transition-colors duration-300 hover:border-ink"
			>
				<div>
					<span class="font-mono text-xs tracking-[0.2em] text-accent uppercase">{path.tag}</span>
					<h2 class="mt-3 font-display text-2xl">{path.title}</h2>
					<p class="mt-3 text-[0.9rem] leading-relaxed text-ink-soft">{path.body}</p>
				</div>
				<a
					href="{resolve('/enquire')}?type={path.type}"
					class="link-underline mt-8 inline-flex w-fit font-mono text-sm tracking-wide text-ink"
				>
					{path.cta} →
				</a>
			</div>
		{/each}
	</div>
</section>
