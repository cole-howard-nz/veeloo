<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<div class="mx-auto max-w-6xl px-6 pt-10">
	<div class="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
		<div class="flex items-baseline gap-6">
			<span class="font-display text-2xl">Admin</span>
			<a
				href={resolve('/admin/(protected)')}
				class="link-underline font-mono text-xs tracking-wide uppercase {page.url.pathname ===
				'/admin'
					? 'text-ink'
					: 'text-ink-soft'}"
			>
				Vehicles
			</a>
			<a
				href={resolve('/admin/(protected)/new')}
				class="link-underline font-mono text-xs tracking-wide uppercase {page.url.pathname ===
				'/admin/new'
					? 'text-ink'
					: 'text-ink-soft'}"
			>
				+ New
			</a>
		</div>
		<form method="POST" action={resolve('/admin/logout')}>
			<button
				type="submit"
				class="link-underline font-mono text-xs tracking-wide text-ink-soft uppercase"
			>
				Log out
			</button>
		</form>
	</div>
</div>

<div class="mx-auto max-w-6xl px-6 pt-8 pb-20">
	{@render children()}
</div>
