<script lang="ts">
	import GameToggle from '$lib/components/game-toggle.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import type { Database } from '$lib/database.types.js';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';

	type BoardItems =
		| Array<Database['public']['Tables']['board_preset_items']['Row'] & { pressed: boolean }>
		| undefined;

	let { data } = $props();
	let { boardPreset } = data;

	const localStorageKey = `board-${boardPreset.id}`;

	let boardPresetItems = $state<BoardItems>(undefined);
	let isRefreshing = $state(false);

	onMount(async () => {
		const storedBoard = localStorage.getItem(localStorageKey);

		if (storedBoard) {
			boardPresetItems = JSON.parse(storedBoard);
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
		const boardPresetItemsSnapshot = boardPresetItems;

		try {
			isRefreshing = true;
			await refreshBoard();

			toast.success('Board has been refreshed', {
				duration: 6000,
				description: 'Click Undo to revert changes',
				position: 'top-center',
				action: {
					label: 'Undo',
					onClick: () => {
						boardPresetItems = boardPresetItemsSnapshot;
						localStorage.setItem(localStorageKey, JSON.stringify(boardPresetItems));
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
	}

	async function saveBoard() {
		localStorage.setItem(localStorageKey, JSON.stringify(boardPresetItems));
	}
</script>

<svelte:head>
	<title>{boardPreset.name} - Bongo</title>
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<div class="md:w-2xl">
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
				{#if boardPresetItems}
					{#each boardPresetItems as presetItem}
						<GameToggle
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
					<h1>Loading Items</h1>
				{/if}
			</div>
			<div class="flex w-full py-8">
				<Button disabled={isRefreshing} onclick={onRefreshButtonClicked} variant="destructiveGhost">
					<RefreshCcwIcon class="h- min-h- w- min-w- {isRefreshing && 'animate-spin'}" />
					<span>Refresh board</span>
				</Button>
			</div>
		</div>
	</div>
</div>
