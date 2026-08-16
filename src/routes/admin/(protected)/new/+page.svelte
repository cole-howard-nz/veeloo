<script lang="ts">
	import VehicleForm from '$lib/components/admin/VehicleForm.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>New Vehicle - Admin - Veeloo</title>
</svelte:head>

<h1 class="font-display text-3xl">New vehicle</h1>
<VehicleForm submitLabel="Create vehicle" error={form?.error} />
