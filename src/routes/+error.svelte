<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { typeReveal } from '$lib/actions/typeReveal';

	const isNotFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? 'Chassis Not Found' : 'Something Went Wrong'} - Veeloo</title>
</svelte:head>

<section class="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-6 py-24">
	<div use:reveal class="reveal">
		{#if isNotFound}
			<h1
				use:typeReveal={{ stepMs: 30 }}
				class="type-reveal mt-4 font-display text-6xl leading-[0.95] sm:text-7xl"
			>
				Wrong <span class="font-accent text-accent">chassis</span> code.
			</h1>
			<p class="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
				That page doesn't exist. Try the current stock, or head back home.
			</p>
		{:else}
			<h1
				use:typeReveal={{ stepMs: 30 }}
				class="type-reveal mt-4 font-display text-6xl leading-[0.95] sm:text-7xl"
			>
				Something <span class="font-accent text-accent">stalled.</span>
			</h1>
			<p class="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">
				That didn't load right. Give it another go, or head back home.
			</p>
		{/if}

		<div class="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
			<a
				href={resolve('/')}
				class="btn-pill rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase"
			>
				Back home
			</a>
			<a href={resolve('/stock')} class="link-underline font-mono text-sm tracking-wide text-ink">
				Browse current stock →
			</a>
		</div>
	</div>
</section>
