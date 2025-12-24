<script lang="ts">
	import GameToggle from '$lib/components/game-toggle.svelte';
	import { checkBingo } from '$lib/components/game/bingo-checker.js';
	import type { BoardItem } from '$lib/components/game/types.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';
	import confetti from 'canvas-confetti';
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

	async function showWinAnimation() {
		var duration = 15 * 1000;
		var animationEnd = Date.now() + duration;
		var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

		function randomInRange(min: number, max: number) {
			return Math.random() * (max - min) + min;
		}

		var interval = setInterval(function () {
			var timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			var particleCount = 320 * (timeLeft / duration);
			// since particles fall down, start a bit higher than random
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				disableForReducedMotion: true
			});
			confetti({
				...defaults,
				particleCount,
				origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				disableForReducedMotion: true
			});
		}, 500);
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
							saveBoard();

							if (checkBingo(boardItems)) {
								showWinAnimation();
							}
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
			<RefreshCcwIcon class="h-5 w-5 {isRefreshing && 'animate-spin'}" />
			<span>Refresh board</span>
		</Button>
	</div>
</div>
