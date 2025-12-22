<script lang="ts">
	import GameToggleDesktop from '$lib/components/game-toggle.desktop.svelte';
	import GameToggleMobile from '$lib/components/game-toggle.mobile.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Database } from '$lib/database.types.js';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import { onMount } from 'svelte';

	type BoardItems =
		| Array<Database['public']['Tables']['board_preset_items']['Row'] & { pressed: boolean }>
		| undefined;

	let { data } = $props();
	let { boardPreset } = data;

	const localStorageKey = `board-${boardPreset.id}`;

	let boardPresetItems = $state<BoardItems>(undefined);
	let isWide = $state(false);
	let isRefreshing = $state(false);

	onMount(async () => {
		const media = window.matchMedia('(min-width: 701px)');

		const update = () => {
			isWide = media.matches;
		};

		update(); // initial setzen
		media.addEventListener('change', update);

		const storedBoard = localStorage.getItem(localStorageKey);
		if (storedBoard) {
			boardPresetItems = JSON.parse(storedBoard);
		} else {
			await refreshBoard();
		}

		return media.removeEventListener('change', update);
	});

	const onRefreshButtonClicked = async () => {
		if (isRefreshing) {
			return;
		}

		try {
			isRefreshing = true;
			await refreshBoard();
		} finally {
			isRefreshing = false;
		}
	};

	const refreshBoard = async () => {
		try {
			const response = await fetch(`/api/board-preset-items?preset_id=${boardPreset.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();

			// Update the boardPresetItems with the new shuffled data
			boardPresetItems = data.map((item: any) => {
				return { ...item, pressed: false };
			});
			localStorage.setItem(localStorageKey, JSON.stringify(boardPresetItems));
		} catch (error) {
			console.error('Error fetching board preset items:', error);
			throw error;
		}
	};

	const saveBoard = () => {
		localStorage.setItem(localStorageKey, JSON.stringify(boardPresetItems));
	};
</script>

<svelte:head>
	<title>{boardPreset.name} - Bongo</title>
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-2xl">
		<div class="flex flex-col justify-center">
			<div class="flex flex-col gap-1 py-4">
				<h1 class="text-3xl">{boardPreset.name}</h1>
				{#if boardPreset.description}
					<h2 class="text-sm">{boardPreset.description}</h2>
				{/if}
			</div>
			<div
				class="grid aspect-square gap-2"
				style={`grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr);`}
			>
				{#if isWide && boardPresetItems}
					{#each boardPresetItems as presetItem}
						<GameToggleDesktop
							bind:pressed={
								() => presetItem.pressed,
								(v) => {
									presetItem.pressed = v;
									saveBoard();
								}
							}
							description={presetItem.description}
							name={presetItem.name}
						/>
					{/each}
				{:else}
					{#each boardPresetItems as presetItem}
						<GameToggleMobile
							bind:pressed={
								() => presetItem.pressed,
								(v) => {
									presetItem.pressed = v;
									saveBoard();
								}
							}
							name={presetItem.name}
						/>
					{/each}
				{/if}
			</div>
			<div class="flex w-full py-8">
				<Button disabled={isRefreshing} onclick={onRefreshButtonClicked} variant="destructive">
					<RefreshCcwIcon class="h-5 min-h-5 w-5 min-w-5 {isRefreshing && 'animate-spin'}" />
					<span>Refresh board</span>
					<span class="sr-only">Refresh and reset current board</span>
				</Button>
			</div>
		</div>
	</div>
</div>
