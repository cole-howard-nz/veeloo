<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { navLinks } from '$lib/data/nav';

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 8)} />

<header
	class="sticky top-0 z-40 border-b transition-all duration-500 {scrolled
		? 'border-line bg-bg/80 backdrop-blur-md'
		: 'border-transparent bg-transparent'}"
>
	<div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-5">
		<a
			href={resolve('/')}
			class="font-display text-xl transition-opacity duration-300 hover:opacity-70"
		>
			Veeloo<span class="text-accent">Investments.</span>
		</a>
		<nav class="flex flex-wrap items-center gap-x-6 gap-y-1 font-mono text-xs uppercase">
			{#each navLinks as link (link.href)}
				<a
					href={resolve(link.href)}
					class="relative py-1 tracking-wider transition-colors duration-300 {isActive(link.href)
						? 'text-ink'
						: 'link-underline text-ink-soft hover:text-ink'}"
				>
					{link.label}
					{#if isActive(link.href)}
						<span class="absolute -bottom-0.5 left-0 h-px w-full bg-accent"></span>
					{/if}
				</a>
			{/each}
		</nav>
	</div>
</header>
