<script lang="ts">
	import GameToggle from '$lib/components/game-toggle.svelte';
	import { checkBingo } from '$lib/components/game/bingo-checker.js';
	import type { BoardItem } from '$lib/components/game/types.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	let { data } = $props();
	let { boardPreset } = data;

	const localStorageKey = `board-${boardPreset.id}`;

	let boardItems = $state<Array<BoardItem> | undefined>(undefined);
	let isRefreshing = $state(false);

	onMount(async () => {
		const storedBoard = localStorage.getItem(localStorageKey);

		if (storedBoard) {
			boardItems = JSON.parse(storedBoard);
		} else {
			await refreshBoard();
		}
	});

	async function onRefreshButtonClicked() {
		if (isRefreshing) {
			return;
		}

		// Create snapshot of the old board so it can be reset using the
		// undo button of the toast
		const boardPresetItemsSnapshot = boardItems;

		try {
			isRefreshing = true;
			await refreshBoard();

			toast.success('New board has been generated', {
				duration: 6000,
				position: 'top-center',
				action: {
					label: 'Undo',
					onClick: () => {
						boardItems = boardPresetItemsSnapshot;
						localStorage.setItem(localStorageKey, JSON.stringify(boardItems));
					}
				}
			});
		} finally {
			isRefreshing = false;
		}
	}

	async function refreshBoard() {
		try {
			const response = await fetch(`/api/board-preset-items?preset_id=${boardPreset.id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error status: ${response.status}`);
			}

			const data = await response.json();

			// Update the boardPresetItems with the new shuffled data
			boardItems = data.map((item: any) => {
				return { ...item, pressed: false };
			});
			localStorage.setItem(localStorageKey, JSON.stringify(boardItems));
		} catch (error) {
			console.error('Error fetching board preset items:', error);
			throw error;
		}
	}

	async function saveBoard() {
		localStorage.setItem(localStorageKey, JSON.stringify(boardItems));
	}
</script>

<svelte:head>
	<title>{boardPreset.name} - Bongo</title>
</svelte:head>

<div class="flex flex-col justify-center">
	<div class="flex flex-col gap-1 py-4">
		<h1 class="text-3xl">{boardPreset.name}</h1>
		{#if boardPreset.description}
			<h2 class="text-sm">{boardPreset.description}</h2>
		{/if}
	</div>
	<div class="grid aspect-square grid-cols-5 grid-rows-5 gap-2">
		{#if boardItems}
			{#each boardItems as boardItem}
				<GameToggle
					bind:pressed={
						() => boardItem.pressed,
						(v) => {
							boardItem.pressed = v;
							// Must not be undefined as we only display this ui when boardItems is defined, so we expect the definition here
							console.log(checkBingo(boardItems!));
							saveBoard();
						}
					}
					description={boardItem.description}
					name={boardItem.name}
				/>
			{/each}
		{/if}
	</div>
	<div class="flex w-full py-8">
		<Button disabled={isRefreshing} onclick={onRefreshButtonClicked} variant="destructiveGhost">
			<RefreshCcwIcon class="h- min-h- w- min-w- {isRefreshing && 'animate-spin'}" />
			<span>Refresh board</span>
		</Button>
	</div>
</div>
