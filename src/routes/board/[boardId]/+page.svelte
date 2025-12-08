<script>
	import GameToggle from '$lib/components/game-toggle.svelte';

	let { data } = $props();

	// Calculate the number of columns and rows
	let gridSize = Math.ceil(Math.sqrt(data.presetItems.length));
</script>

<div class="flex h-full w-full items-center justify-center">
	<div class="w-2xl">
		<div class="flex items-center justify-center">
			<div class="relative w-full">
				<div class="flex flex-col gap-1 py-4">
					<h1 class="text-3xl">{data.preset[0].name}</h1>
					{#if data.preset[0].description}
						<h2 class="text-sm">{data.preset[0].description}</h2>
					{/if}
				</div>
				<div
					class="grid aspect-square gap-2"
					style={`grid-template-columns: repeat(${gridSize}, 1fr); grid-template-rows: repeat(${gridSize}, 1fr);`}
				>
					{#each data.presetItems as presetItem}
						<GameToggle description={presetItem.description} name={presetItem.name} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
