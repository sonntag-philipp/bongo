<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle } from './ui/toggle';
	import * as Tooltip from './ui/tooltip';

	let { name, description } = $props();
	let collisionBoundary = $state<HTMLElement | null>(null);

	function calculateFontSize(text: string): string {
		if (text.length >= 50) {
			return 'text-xs';
		}
		return 'text-xl';
	}

	onMount(() => {
		collisionBoundary = document.querySelector('body');
	});
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Toggle
					class={`block h-full w-full truncate overflow-hidden bg-secondary p-2 text-xl wrap-break-word text-ellipsis whitespace-normal text-secondary-foreground ${calculateFontSize(name)}`}
					{...props}
					size="lg"
				>
					{name}
				</Toggle>
			{/snippet}
		</Tooltip.Trigger>
		{#if collisionBoundary}
			<Tooltip.Content class="max-w-xs wrap-break-word whitespace-normal">
				<span class="font-semibold">{name}:&nbsp;</span>{description}
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
</Tooltip.Provider>
