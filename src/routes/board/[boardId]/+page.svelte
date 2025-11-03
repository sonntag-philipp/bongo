<script>
	import GameToggle from '$lib/components/game-toggle.svelte';

	let { data } = $props();
</script>

<div class="p-16">
	<GameToggle description={data.presetItems[0].description} name={data.presetItems[0].name} />
</div>
