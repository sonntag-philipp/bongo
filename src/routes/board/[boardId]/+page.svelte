<script>
	let { data } = $props();
</script>

<div class="container mx-auto p-4">
	<ul class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
		{#each data.presetItems as items}
			<li
				class="flex h-48 flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-100 p-4 text-center"
			>
				<span class="text-xl font-bold">{items.name}</span>
				<span class="text-sm text-gray-600">{items.description}</span>
			</li>
		{/each}
	</ul>
</div>

<style>
</style>
