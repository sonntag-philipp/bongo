<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<div class="flex h-lvh flex-col">
	<header class="p-4">
		<h1 class="text-2xl font-bold">Bongo</h1>
	</header>
	<main class="h-full">
		{@render children()}
	</main>
	<footer class="flex justify-evenly p-8">
		<span class="w-full"></span>
		<span class="flex w-full flex-col items-center justify-center text-xs">
			<span>
				Made by <a class="underline" href="https://flyp.si">flyp.si</a> using SvelteKit, Supabase and
				ShadCN
			</span>
		</span>

		<span class="flex w-full justify-end">
			<DarkModeToggle />
		</span>
	</footer>
</div>
