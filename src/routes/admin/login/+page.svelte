<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();

	let submitting = $state(false);

	function autofocus(node: HTMLInputElement) {
		node.focus();
	}

	const inputClass =
		'border-0 border-b border-line bg-transparent px-0 py-2 text-sm outline-none transition-colors duration-300 focus:border-ink';
</script>

<svelte:head>
	<title>Admin Login - Veeloo</title>
</svelte:head>

<section class="mx-auto max-w-sm px-6 pt-20 pb-20">
	<h1 class="font-display text-4xl">Admin</h1>
	<p class="mt-2 font-mono text-xs text-ink-soft">Manage vehicle listings.</p>

	<form
		method="POST"
		class="mt-10 flex flex-col gap-6"
		use:enhance={() => {
			submitting = true;
			return async ({ update }) => {
				await update();
				submitting = false;
			};
		}}
	>
		<label class="flex flex-col gap-1.5">
			<span class="font-mono text-[0.62rem] tracking-wider text-ink-soft uppercase">Password</span>
			<input type="password" name="password" required use:autofocus class={inputClass} />
		</label>

		{#if form?.error}
			<p class="font-mono text-xs text-red-600">{form.error}</p>
		{/if}

		<button
			type="submit"
			disabled={submitting}
			class="btn-pill mt-2 self-start rounded-full bg-ink px-7 py-3.5 font-mono text-xs tracking-wider text-bg uppercase disabled:opacity-50"
		>
			{submitting ? 'Signing in…' : 'Sign in'}
		</button>
	</form>
</section>
