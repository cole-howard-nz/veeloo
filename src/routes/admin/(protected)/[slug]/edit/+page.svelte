<script lang="ts">
	import VehicleForm from '$lib/components/admin/VehicleForm.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<svelte:head>
	<title>Edit {data.vehicle.chassisCode} - Admin - Veeloo</title>
</svelte:head>

<h1 class="font-display text-3xl">Edit {data.vehicle.chassisCode}</h1>
<VehicleForm vehicle={data.vehicle} submitLabel="Save changes" error={form?.error} />
