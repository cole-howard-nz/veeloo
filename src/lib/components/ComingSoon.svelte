<script lang="ts">
	import { reveal } from '$lib/actions/reveal';

	let { title, description }: { title: string; description: string } = $props();
</script>

<section class="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-6 py-24">
	<div use:reveal class="reveal">
		<span class="font-mono text-xs tracking-[0.2em] text-accent uppercase">Coming soon</span>
		<h1 class="mt-4 font-display text-5xl sm:text-6xl">
			{title}
		</h1>
		<p class="mt-5 max-w-md text-[0.95rem] leading-relaxed text-ink-soft">{description}</p>
		<a
			href="mailto:hello@veeloo.co.nz"
			class="link-underline mt-8 inline-block font-mono text-sm tracking-wide text-ink"
		>
			Email us directly for now →
		</a>
	</div>
</section>
