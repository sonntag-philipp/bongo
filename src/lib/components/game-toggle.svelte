<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle } from './ui/toggle';
	import * as Tooltip from './ui/tooltip';

	let { name, description } = $props();
	let collisionBoundary = $state<HTMLElement | null>(null);

	onMount(() => {
		collisionBoundary = document.querySelector('body');
	});
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Toggle
					class="h-full w-full bg-secondary p-4 wrap-break-word whitespace-normal text-secondary-foreground"
					{...props}
					size="lg"
				>
					<span class="text-xl">{name}</span>
				</Toggle>
			{/snippet}
		</Tooltip.Trigger>
		{#if collisionBoundary}
			<Tooltip.Content class="max-w-xs wrap-break-word whitespace-normal">
				{description}
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
</Tooltip.Provider>
