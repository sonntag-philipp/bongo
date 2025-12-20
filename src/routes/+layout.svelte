<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
	import CatIcon from '@lucide/svelte/icons/cat';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<div class="flex h-lvh flex-col">
	<header>
		<a class="flex items-center gap-4 p-4" href="/">
			<CatIcon class="aspect-square h-10 w-10" />
			<h1 class="text-2xl font-bold">Bongo</h1>

			<span class="flex w-full justify-end">
				<DarkModeToggle />
			</span>
		</a>
	</header>
	<main class="h-full p-4">
		{@render children()}
	</main>
	<footer class="flex justify-center pt-6 pb-1">
		<span class="flex w-full flex-col items-center justify-center text-xs">
			<span>
				Made by <a class="underline" href="https://flyp.si">flyp.si</a> using SvelteKit, Supabase and
				ShadCN
			</span>
		</span>
	</footer>
</div>
