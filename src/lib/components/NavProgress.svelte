<script lang="ts">
	import { navigating } from '$app/state';
	import { fade } from 'svelte/transition';

	const isNavigating = $derived(navigating.to !== null);
</script>

{#if isNavigating}
	<div class="nav-progress" out:fade={{ duration: 200 }} aria-hidden="true"></div>
{/if}
