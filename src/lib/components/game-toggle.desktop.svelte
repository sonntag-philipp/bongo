<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle } from './ui/toggle';
	import * as Tooltip from './ui/tooltip';

	let { name, description } = $props();
	let collisionBoundary = $state<HTMLElement | null>(null);

	onMount(() => {
		collisionBoundary = document.querySelector('body');
	});

	// clamp() generator: https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjQwMHB4IiwibWF4V2lkdGgiOiI3MDBweCIsIm1pbkZvbnRTaXplIjoiOHB4IiwibWF4Rm9udFNpemUiOiIxNnB4In0%3D
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Toggle
					class={`block h-full w-full truncate overflow-hidden bg-secondary p-2 text-xl wrap-break-word text-ellipsis whitespace-normal text-secondary-foreground`}
					{...props}
					style="font-size: clamp(0.5rem, -0.1667rem + 2.6667vw, 1rem);"
					size="lg"
				>
					{name}
				</Toggle>
			{/snippet}
		</Tooltip.Trigger>
		{#if collisionBoundary}
			<Tooltip.Content class="hidden max-w-xs wrap-break-word whitespace-normal md:block">
				<span class="font-semibold">{name}:&nbsp;</span>{description}
			</Tooltip.Content>
		{/if}
	</Tooltip.Root>
</Tooltip.Provider>
