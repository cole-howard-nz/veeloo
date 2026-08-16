<script lang="ts">
	import type { VehicleStatus } from '$lib/types';

	let { status, justLanded = false }: { status: VehicleStatus; justLanded?: boolean } = $props();

	const labels: Record<VehicleStatus, string> = {
		available: 'Available',
		'on-hold': 'On hold',
		sold: 'Sold'
	};
</script>

<div
	class="flex flex-wrap items-start gap-1.5 font-mono text-[0.6rem] tracking-wider text-white uppercase sm:text-[0.65rem]"
>
	{#if justLanded && status !== 'sold'}
		<span
			class="shrink-0 rounded-full bg-black/65 px-2 py-1 whitespace-nowrap text-accent backdrop-blur-sm"
		>
			Just landed
		</span>
	{/if}
	<span
		class="shrink-0 rounded-full bg-black/65 px-2 py-1 whitespace-nowrap text-white/90 backdrop-blur-sm"
	>
		{labels[status]}
	</span>
</div>
