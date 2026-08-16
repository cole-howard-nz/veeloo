<script lang="ts">
	import { page } from '$app/state';
	import { reveal } from '$lib/actions/reveal';
	import { typeReveal } from '$lib/actions/typeReveal';
	import { getVehicleBySlug } from '$lib/data/vehicles';

	type EnquiryType = 'vehicle' | 'wanted' | 'finance' | 'trade-in';

	const refSlug = page.url.searchParams.get('ref');
	const typeParam = page.url.searchParams.get('type');
	const refVehicle = refSlug ? getVehicleBySlug(refSlug) : undefined;

	const typeOptions: { value: EnquiryType; label: string }[] = [
		{ value: 'wanted', label: "Something specific I'm hunting" },
		{ value: 'vehicle', label: 'A car currently in stock' },
		{ value: 'finance', label: 'Finance pre-approval' },
		{ value: 'trade-in', label: 'Trade-in valuation' }
	];

	const initialType: EnquiryType = refVehicle
		? 'vehicle'
		: typeParam === 'finance' || typeParam === 'trade-in'
			? typeParam
			: 'wanted';

	let enquiryType = $state<EnquiryType>(initialType);
	let name = $state('');
	let email = $state('');
	let phone = $state('');
	let details = $state(
		refVehicle ? `Keen to hear more about the ${refVehicle.chassisCode} ${refVehicle.model}.` : ''
	);

	const detailsLabel = $derived(
		{
			wanted: 'What are you hunting? (chassis code, model, budget)',
			vehicle: 'Which car, and any questions',
			finance: 'Loan amount / term you have in mind',
			'trade-in': 'Vehicle details for trade-in'
		}[enquiryType]
	);

	const subject = $derived(
		{
			wanted: 'Wanted: chassis enquiry',
			vehicle: refVehicle
				? `Enquiry: ${refVehicle.chassisCode} ${refVehicle.model}`
				: 'Enquiry: a car in stock',
			finance: 'Finance pre-approval enquiry',
			'trade-in': 'Trade-in valuation enquiry'
		}[enquiryType]
	);

	const mailBody = $derived(
		[
			`Type: ${typeOptions.find((t) => t.value === enquiryType)?.label}`,
			name && `Name: ${name}`,
			email && `Email: ${email}`,
			phone && `Phone: ${phone}`,
			'',
			details
		]
			.filter((line): line is string => Boolean(line))
			.join('\n')
	);

	const mailtoHref = $derived(
		`mailto:hello@veelooinvestments.nz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`
	);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		window.location.href = mailtoHref;
	}

	const selectClass =
		'border-0 border-b border-line bg-transparent px-0 py-1.5 font-mono text-sm outline-none transition-colors duration-300 focus:border-ink appearance-none';
	const inputClass =
		'border-0 border-b border-line bg-transparent px-0 py-2 text-sm outline-none transition-colors duration-300 focus:border-ink';
</script>

<svelte:head>
	<title>Enquire - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-6xl px-6 pt-16 pb-10">
	<h1
		use:typeReveal={{ stepMs: 24 }}
		class="type-reveal mt-4 max-w-2xl font-display text-5xl sm:text-6xl"
	>
		Tell us what you're <span class="font-accent text-accent">hunting.</span>
	</h1>
	<p
		use:reveal
		style="--reveal-delay: 120ms"
		class="reveal mt-5 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft"
	>
		No checkout button, no chatbot. Every enquiry gets a straight reply from a person. Fastest is
		Instagram DM or use the email form below.
	</p>
</section>

<!-- Direct contact -->
<section class="mx-auto max-w-6xl px-6 pb-16">
	<div use:reveal class="reveal grid gap-3 sm:grid-cols-3">
		<a
			href="https://www.instagram.com/veelooinvestments/"
			class="group flex items-center justify-between border border-line-strong px-5 py-4 transition duration-300 hover:border-ink hover:bg-bg-alt"
		>
			<span class="font-display text-lg">DM on Instagram</span>
			<span
				class="font-mono text-xs text-ink-soft transition duration-300 group-hover:translate-x-1 group-hover:text-ink"
				>→</span
			>
		</a>
		<a
			href="mailto:hello@veelooinvestments.nz"
			class="group flex items-center justify-between border border-line-strong px-5 py-4 transition duration-300 hover:border-ink hover:bg-bg-alt"
		>
			<span class="font-display text-lg">Email</span>
			<span
				class="font-mono text-xs text-ink-soft transition duration-300 group-hover:translate-x-1 group-hover:text-ink"
				>→</span
			>
		</a>
	</div>
</section>

<!-- Wanted form -->
<section class="border-t border-line bg-bg-alt">
	<div class="mx-auto max-w-2xl px-6 py-20">
		<div use:reveal class="reveal">
			<h2 class="font-display text-2xl sm:text-3xl">Or send it straight to our inbox</h2>
			<p class="mt-2 font-mono text-xs text-ink-soft">
				Opens your email client with everything filled in, nothing is stored on our end.
			</p>

			<form onsubmit={handleSubmit} class="mt-10 flex flex-col gap-6">
				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase"
						>What's this about</span
					>
					<select bind:value={enquiryType} class={selectClass}>
						{#each typeOptions as opt (opt.value)}
							<option value={opt.value}>{opt.label}</option>
						{/each}
					</select>
				</label>

				<div class="grid gap-6 sm:grid-cols-2">
					<label class="flex flex-col gap-1.5">
						<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Name</span
						>
						<input type="text" required bind:value={name} class={inputClass} />
					</label>
					<label class="flex flex-col gap-1.5">
						<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase"
							>Phone (optional)</span
						>
						<input type="tel" bind:value={phone} class={inputClass} />
					</label>
				</div>

				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Email</span>
					<input type="email" required bind:value={email} class={inputClass} />
				</label>

				<label class="flex flex-col gap-1.5">
					<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase"
						>{detailsLabel}</span
					>
					<textarea required bind:value={details} rows="4" class="{inputClass} resize-none"
					></textarea>
				</label>

				<button
					type="submit"
					class="btn-pill mt-2 self-start rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase"
				>
					Send enquiry
				</button>
			</form>
		</div>
	</div>
</section>
