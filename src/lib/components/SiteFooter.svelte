<script lang="ts">
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { navLinks } from '$lib/data/nav';
</script>

<footer class="mt-24 border-t border-line">
	<div class="mx-auto max-w-6xl px-6 py-16">
		<div use:reveal class="reveal">
			<a
				href={resolve('/enquire')}
				class="group font-display text-4xl leading-none transition-opacity duration-300 hover:opacity-80 sm:text-5xl"
			>
				Let's find<br />your
				<span
					class="inline-block font-accent text-accent transition-transform duration-300 group-hover:translate-x-1"
					>chassis.</span
				>
			</a>
		</div>

		<div
			class="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-[0.7rem] tracking-wide text-ink-soft"
		>
			<a href={resolve('/')} class="font-display text-white transition-opacity duration-300 hover:opacity-70 text-xl">
				Veeloo<span class="text-accent">Investments.</span>
			</a>
			<nav class="flex flex-wrap items-center gap-5 font-mono uppercase">
				{#each navLinks as link (link.href)}
					<a href={resolve(link.href)} class="link-underline hover:text-ink">{link.label}</a>
				{/each}
				<a
					href="https://www.instagram.com/veelooinvestments/"
					class="link-underline hover:text-ink"
				>
					Instagram
				</a>
				<a href="mailto:hello@veelooinvestments.nz" class="link-underline hover:text-ink">
					Email
				</a>
				<span class="text-ink-soft/70">© {new Date().getFullYear()}</span>
			</nav>
		</div>
	</div>
</footer>
