<script lang="ts">
	import type { HTMLImgAttributes } from 'svelte/elements';

	let { class: className = '', ...rest }: HTMLImgAttributes = $props();

	let el: HTMLImageElement | undefined = $state();
	let loaded = $state(false);

	// Re-check on every src change - also catches images the browser already finished
	// loading before this effect ran (SSR markup, cached responses), where `load` never fires.
	$effect(() => {
		void rest.src;
		loaded = el?.complete ?? false;
	});
</script>

<img
	bind:this={el}
	{...rest}
	onload={() => (loaded = true)}
	class="{className} transition duration-700 ease-out {loaded
		? 'opacity-100 blur-none'
		: 'opacity-0 blur-sm'}"
/>
