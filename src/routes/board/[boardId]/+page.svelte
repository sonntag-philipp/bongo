<script>
	import GameToggle from '$lib/components/game-toggle.svelte';

	let { data } = $props();
</script>

<div class="flex w-full items-center justify-center">
	<div class="w-xl">
		<div class="flex h-screen items-center justify-center">
			<div class="relative w-full">
				<h1 class="w-full py-4 text-center text-3xl">{data.preset[0].name}</h1>
				<div class="grid aspect-square grid-cols-4 grid-rows-4 gap-2">
					{#each data.presetItems as presetItem}
						<GameToggle description={presetItem.description} name={presetItem.name} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
