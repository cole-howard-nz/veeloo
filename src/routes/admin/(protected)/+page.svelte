<script lang="ts">
	import { enhance } from '$app/forms';
	import { resolve } from '$app/paths';
	import type { VehicleStatus } from '$lib/types';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();

	const statusOptions: { value: VehicleStatus; label: string }[] = [
		{ value: 'available', label: 'Available' },
		{ value: 'on-hold', label: 'On hold' },
		{ value: 'sold', label: 'Sold' }
	];

	let deletingSlug = $state<string | null>(null);
</script>

<svelte:head>
	<title>Vehicles - Admin - Veeloo</title>
</svelte:head>

<div class="flex items-baseline justify-between">
	<h1 class="font-display text-3xl">Vehicles</h1>
	<span class="font-mono text-xs text-ink-soft">{data.vehicles.length} listed</span>
</div>

{#if form?.error}
	<p class="mt-4 font-mono text-xs text-red-600">{form.error}</p>
{/if}

<div class="mt-8 overflow-x-auto">
	<table class="w-full min-w-[640px] border-collapse font-mono text-sm">
		<thead>
			<tr
				class="border-b border-line text-left text-[0.62rem] tracking-wider text-ink-soft uppercase"
			>
				<th class="py-2 pr-4 font-normal">Vehicle</th>
				<th class="py-2 pr-4 font-normal">Year</th>
				<th class="py-2 pr-4 font-normal">Price</th>
				<th class="py-2 pr-4 font-normal">Status</th>
				<th class="py-2 pr-4 font-normal"></th>
			</tr>
		</thead>
		<tbody>
			{#each data.vehicles as vehicle (vehicle.slug)}
				<tr class="border-b border-line">
					<td class="py-3 pr-4">
						<div class="flex items-center gap-3">
							{#if vehicle.images[0]}
								<img src={vehicle.images[0]} alt={vehicle.model} class="h-12 w-16 object-cover" />
							{:else}
								<div class="h-12 w-16 bg-linear-to-br from-ink via-ink/70 to-ink/40"></div>
							{/if}
							<div>
								<div class="text-ink">{vehicle.chassisCode}</div>
								<div class="text-xs text-ink-soft uppercase">{vehicle.model}</div>
							</div>
						</div>
					</td>
					<td class="py-3 pr-4">{vehicle.year}</td>
					<td class="py-3 pr-4">{vehicle.priceDisplay}</td>
					<td class="py-3 pr-4">
						<form method="POST" action="?/updateStatus" use:enhance class="inline-block">
							<input type="hidden" name="slug" value={vehicle.slug} />
							<select
								name="status"
								value={vehicle.status}
								onchange={(e) => e.currentTarget.form?.requestSubmit()}
								class="border-0 border-b border-line bg-transparent px-0 py-1 font-mono text-xs outline-none focus:border-ink"
							>
								{#each statusOptions as opt (opt.value)}
									<option value={opt.value}>{opt.label}</option>
								{/each}
							</select>
						</form>
					</td>
					<td class="py-3 pr-4 text-right">
						<div class="flex items-center justify-end gap-4">
							<a
								href={resolve('/admin/(protected)/[slug]/edit', { slug: vehicle.slug })}
								class="link-underline text-xs text-ink-soft uppercase hover:text-ink"
							>
								Edit
							</a>
							<form
								method="POST"
								action="?/delete"
								use:enhance={() => {
									deletingSlug = vehicle.slug;
									return async ({ update }) => {
										await update();
										deletingSlug = null;
									};
								}}
								onsubmit={(e) => {
									if (
										!confirm(
											`Delete ${vehicle.chassisCode} ${vehicle.model}? This can't be undone.`
										)
									) {
										e.preventDefault();
									}
								}}
							>
								<input type="hidden" name="slug" value={vehicle.slug} />
								<button
									type="submit"
									disabled={deletingSlug === vehicle.slug}
									class="text-xs text-ink-soft uppercase hover:text-red-600 disabled:opacity-50"
								>
									Delete
								</button>
							</form>
						</div>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>

	{#if data.vehicles.length === 0}
		<p class="mt-6 font-mono text-xs text-ink-soft">No vehicles yet.</p>
	{/if}
</div>
