<script lang="ts">
	import { untrack } from 'svelte';
	import type { Action } from 'svelte/action';
	import { enhance } from '$app/forms';
	import { slugify } from '$lib/utils/slugify';
	import type { Vehicle, VehicleStatus } from '$lib/types';

	let { vehicle, submitLabel, error }: { vehicle?: Vehicle; submitLabel: string; error?: string } =
		$props();

	// Prefill is a one-time seed from the `vehicle` prop at mount, not a live binding to it -
	// these fields become the user-editable form state from here on.
	const initial = untrack(() => vehicle);

	let slug = $state(initial?.slug ?? '');
	let chassisCode = $state(initial?.chassisCode ?? '');
	let model = $state(initial?.model ?? '');
	let year = $state(initial?.year ?? new Date().getFullYear());
	let engine = $state(initial?.engine ?? '');
	let drivetrain = $state<Vehicle['drivetrain']>(initial?.drivetrain ?? 'RWD');
	let transmission = $state(initial?.transmission ?? '');
	let odometerKm = $state(initial?.odometerKm ?? 0);
	let colour = $state(initial?.colour ?? '');
	let status = $state<VehicleStatus>(initial?.status ?? 'available');
	let justLanded = $state(initial?.justLanded ?? false);
	let priceNZD = $state(initial?.priceNZD ?? 0);
	let soldDate = $state(initial?.soldDate ?? '');
	let importStatus = $state(initial?.importStatus ?? 'Used import');
	let conditionNotes = $state(initial?.conditionNotes ?? '');
	let story = $state(initial?.story ?? '');

	const pricePreview = $derived(
		Number.isFinite(priceNZD) ? `$${priceNZD.toLocaleString('en-NZ')}` : ''
	);

	function suggestSlug() {
		slug = slugify(`${chassisCode} ${model} ${year}`);
	}

	type ImageEntry =
		| { kind: 'existing'; url: string; id: string }
		| { kind: 'new'; file: File; id: string; previewUrl: string };

	let images = $state<ImageEntry[]>(
		(initial?.images ?? []).map((url) => ({ kind: 'existing' as const, url, id: url }))
	);
	let removedExisting = $state<string[]>([]);

	function addFiles(fileList: FileList | null) {
		if (!fileList) return;
		for (const file of fileList) {
			images.push({
				kind: 'new',
				file,
				id: crypto.randomUUID(),
				previewUrl: URL.createObjectURL(file)
			});
		}
	}

	function removeImage(index: number) {
		const [removed] = images.splice(index, 1);
		if (removed.kind === 'existing') {
			removedExisting.push(removed.url);
		} else {
			URL.revokeObjectURL(removed.previewUrl);
		}
	}

	function moveImage(index: number, dir: -1 | 1) {
		const target = index + dir;
		if (target < 0 || target >= images.length) return;
		const [entry] = images.splice(index, 1);
		images.splice(target, 0, entry);
	}

	const assignFile: Action<HTMLInputElement, File> = (node, file) => {
		const dt = new DataTransfer();
		dt.items.add(file);
		node.files = dt.files;
	};

	let submitting = $state(false);

	const inputClass =
		'border-0 border-b border-line bg-transparent px-0 py-2 text-sm outline-none transition-colors duration-300 focus:border-ink';
	const selectClass =
		'border-0 border-b border-line bg-transparent px-0 py-1.5 font-mono text-sm outline-none transition-colors duration-300 focus:border-ink appearance-none';
	const labelClass = 'font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase';
</script>

<div class="max-w-3xl">
	{#if error}
		<p class="mt-4 font-mono text-xs text-red-600">{error}</p>
	{/if}

	<form
		method="POST"
		enctype="multipart/form-data"
		class="mt-8 flex flex-col gap-8"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<div class="grid gap-6 sm:grid-cols-2">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Chassis code</span>
				<input
					type="text"
					name="chassisCode"
					required
					bind:value={chassisCode}
					class={inputClass}
				/>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Model</span>
				<input type="text" name="model" required bind:value={model} class={inputClass} />
			</label>
		</div>

		<div class="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Slug</span>
				<input type="text" name="slug" required bind:value={slug} class={inputClass} />
			</label>
			<button
				type="button"
				onclick={suggestSlug}
				class="link-underline pb-2 font-mono text-xs text-ink-soft uppercase hover:text-ink"
			>
				Suggest
			</button>
		</div>

		<div class="grid gap-6 sm:grid-cols-3">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Year</span>
				<input type="number" name="year" required bind:value={year} class={inputClass} />
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Drivetrain</span>
				<select name="drivetrain" bind:value={drivetrain} class={selectClass}>
					<option value="RWD">RWD</option>
					<option value="AWD">AWD</option>
					<option value="FWD">FWD</option>
				</select>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Colour</span>
				<input type="text" name="colour" required bind:value={colour} class={inputClass} />
			</label>
		</div>

		<div class="grid gap-6 sm:grid-cols-2">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Engine</span>
				<input type="text" name="engine" required bind:value={engine} class={inputClass} />
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Transmission</span>
				<input
					type="text"
					name="transmission"
					required
					bind:value={transmission}
					class={inputClass}
				/>
			</label>
		</div>

		<div class="grid gap-6 sm:grid-cols-3">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Odometer (km)</span>
				<input
					type="number"
					name="odometerKm"
					required
					bind:value={odometerKm}
					class={inputClass}
				/>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Price (NZD)</span>
				<input type="number" name="priceNZD" required bind:value={priceNZD} class={inputClass} />
				<span class="font-mono text-[0.62rem] text-ink-soft">{pricePreview}</span>
			</label>
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Import status</span>
				<input
					type="text"
					name="importStatus"
					required
					bind:value={importStatus}
					class={inputClass}
				/>
			</label>
		</div>

		<div class="grid gap-6 sm:grid-cols-3 sm:items-end">
			<label class="flex flex-col gap-1.5">
				<span class={labelClass}>Status</span>
				<select name="status" bind:value={status} class={selectClass}>
					<option value="available">Available</option>
					<option value="on-hold">On hold</option>
					<option value="sold">Sold</option>
				</select>
			</label>
			{#if status === 'sold'}
				<label class="flex flex-col gap-1.5">
					<span class={labelClass}>Sold date</span>
					<input type="date" name="soldDate" bind:value={soldDate} class={inputClass} />
				</label>
			{/if}
			<label class="flex items-center gap-2 pb-2">
				<input type="checkbox" name="justLanded" bind:checked={justLanded} />
				<span class={labelClass}>Just landed</span>
			</label>
		</div>

		<label class="flex flex-col gap-1.5">
			<span class={labelClass}>Condition notes</span>
			<textarea
				name="conditionNotes"
				required
				rows="3"
				bind:value={conditionNotes}
				class="{inputClass} resize-none"></textarea>
		</label>

		<label class="flex flex-col gap-1.5">
			<span class={labelClass}>Story</span>
			<textarea name="story" required rows="4" bind:value={story} class="{inputClass} resize-none"
			></textarea>
		</label>

		<div>
			<span class={labelClass}>Photos</span>
			<p class="mt-1 font-mono text-[0.62rem] text-ink-soft">
				First photo is the card thumbnail. Use the arrows to reorder.
			</p>

			{#if images.length > 0}
				<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
					{#each images as entry, i (entry.id)}
						<div class="relative border border-line p-2">
							<img
								src={entry.kind === 'existing' ? entry.url : entry.previewUrl}
								alt="Vehicle photo {i + 1}"
								class="aspect-4/3 w-full object-cover"
							/>
							<div
								class="mt-2 flex items-center justify-between font-mono text-[0.6rem] text-ink-soft uppercase"
							>
								<div class="flex gap-2">
									<button
										type="button"
										disabled={i === 0}
										onclick={() => moveImage(i, -1)}
										class="disabled:opacity-30">←</button
									>
									<button
										type="button"
										disabled={i === images.length - 1}
										onclick={() => moveImage(i, 1)}
										class="disabled:opacity-30">→</button
									>
								</div>
								<button type="button" onclick={() => removeImage(i)} class="hover:text-red-600">
									Remove
								</button>
							</div>
							<input
								type="hidden"
								name="imageOrder"
								value={entry.kind === 'existing' ? entry.url : `new:${entry.id}`}
							/>
							{#if entry.kind === 'new'}
								<input
									type="file"
									name="newImage_{entry.id}"
									class="hidden"
									use:assignFile={entry.file}
								/>
							{/if}
						</div>
					{/each}
				</div>
			{/if}

			{#each removedExisting as url (url)}
				<input type="hidden" name="removedImages" value={url} />
			{/each}

			<input
				type="file"
				multiple
				accept="image/*"
				onchange={(e) => {
					addFiles(e.currentTarget.files);
					e.currentTarget.value = '';
				}}
				class="mt-4 font-mono text-xs"
			/>
		</div>

		<button
			type="submit"
			disabled={submitting}
			class="btn-pill mt-2 self-start rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase disabled:opacity-50"
		>
			{submitting ? 'Saving…' : submitLabel}
		</button>
	</form>
</div>
