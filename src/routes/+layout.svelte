<script lang="ts">
	import favicon from '$lib/assets/favicon.png';
	import DarkModeToggle from '$lib/components/dark-mode-toggle.svelte';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Sonner from '$lib/components/ui/sonner/sonner.svelte';
	import CatIcon from '@lucide/svelte/icons/cat';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div>
	<ModeWatcher />
	<Sonner />
</div>

<header class="flex items-center justify-between p-3">
	<a class="flex items-center gap-4" href="/">
		<CatIcon class="aspect-square h-10 w-10" />
		<h1 class="text-2xl font-bold">Bongo</h1>
	</a>

	<DarkModeToggle />
</header>

<main class="flex grow justify-center">
	<div class="px-3 md:w-2xl">
		{@render children()}
	</div>
</main>

<footer
	class="flex justify-center bg-linear-to-r from-slate-700 via-cyan-900 to-green-800 py-4 text-gray-200 dark:from-slate-700/50 dark:via-cyan-900/50 dark:to-green-800/50"
>
	<div class="flex w-full items-center justify-center gap-4 text-sm">
		<span>
			<a class="hover:underline" href="https://flyp.si">flyp.si</a>
		</span>
		<Separator orientation="vertical" />
		<span>
			<a class="hover:underline" href="https://flyp.si/legal">Legal</a>
		</span>
	</div>
</footer>
