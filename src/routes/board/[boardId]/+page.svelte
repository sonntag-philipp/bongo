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
				<h1 class="w-full py-4 text-center text-3xl">{data.preset[0].name}</h1>
				<div
					class="grid aspect-square grid-cols-4 grid-rows-4 gap-2"
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
