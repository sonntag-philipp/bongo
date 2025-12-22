<script lang="ts">
	import GameToggleDesktop from '$lib/components/game-toggle.desktop.svelte';
	import GameToggleMobile from '$lib/components/game-toggle.mobile.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import RefreshCcwIcon from '@lucide/svelte/icons/refresh-ccw';

	let { data } = $props();
	let { boardPreset } = data;

	import { onMount } from 'svelte';

	let boardPresetItems = $state(
		data.boardPresetItems.map((item) => {
			return { ...item, pressed: false };
		})
	);

	let isWide = $state(false);
	let isRefreshing = $state(false);

	onMount(() => {
		const media = window.matchMedia('(min-width: 701px)');

		const update = () => {
			isWide = media.matches;
		};

		update(); // initial setzen
		media.addEventListener('change', update);

		return () => media.removeEventListener('change', update);
	});

	const onRefreshButtonClicked = async (event: Event) => {
		isRefreshing = true;

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
		} catch (error) {
			console.error('Error fetching board preset items:', error);
		} finally {
			isRefreshing = false;
		}
	};
</script>

<svelte:head>
	<title>{boardPreset.name} - Bongo</title>
</svelte:head>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-2xl">
		<div class="flex items-center justify-center">
			<div class="relative w-full">
				<div class="flex flex-col gap-1 py-4">
					<div class="flex items-center justify-between">
						<h1 class="text-3xl">{boardPreset.name}</h1>
						<Button
							aria-label="Refresh and reset current board"
							disabled={isRefreshing}
							onclick={onRefreshButtonClicked}
							variant="destructive"
							size="icon"
						>
							<RefreshCcwIcon
								class="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 {isRefreshing && 'animate-spin'}"
							/>
							<span class="sr-only">Toggle theme</span>
						</Button>
					</div>
					{#if boardPreset.description}
						<h2 class="text-sm">{boardPreset.description}</h2>
					{/if}
				</div>
				<div
					class="grid aspect-square gap-2"
					style={`grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr);`}
				>
					{#if isWide}
						{#each boardPresetItems as presetItem}
							<GameToggleDesktop
								bind:pressed={presetItem.pressed}
								description={presetItem.description}
								name={presetItem.name}
							/>
						{/each}
					{:else}
						{#each boardPresetItems as presetItem}
							<GameToggleMobile bind:pressed={presetItem.pressed} name={presetItem.name} />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
