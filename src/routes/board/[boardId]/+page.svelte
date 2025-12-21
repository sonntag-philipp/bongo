<script>
	import GameToggleDesktop from '$lib/components/game-toggle.desktop.svelte';
	import GameToggleMobile from '$lib/components/game-toggle.mobile.svelte';

	let { data } = $props();

	import { onMount } from 'svelte';

	let isWide = $state(false);

	onMount(() => {
		const media = window.matchMedia('(min-width: 701px)');

		const update = () => {
			isWide = media.matches;
		};

		update(); // initial setzen
		media.addEventListener('change', update);

		return () => media.removeEventListener('change', update);
	});
</script>

<svelte:head>
	<title>{data.preset[0].name} - Bongo</title>
</svelte:head>

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
					style={`grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(5, 1fr);`}
				>
					{#if isWide}
						{#each data.presetItems as presetItem}
							<GameToggleDesktop description={presetItem.description} name={presetItem.name} />
						{/each}
					{:else}
						{#each data.presetItems as presetItem}
							<GameToggleMobile name={presetItem.name} />
						{/each}
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>
