<script lang="ts">
	import { Toggle } from './ui/toggle';
	import * as Tooltip from './ui/tooltip';

	// Component props with Svelte Runes
	let { name, description, pressed = $bindable(false) } = $props();

	const canUseHoverTooltips =
		window.matchMedia('(hover: hover)').matches && window.matchMedia('(pointer: fine)').matches;

	// clamp() generator: https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjQwMHB4IiwibWF4V2lkdGgiOiI3MDBweCIsIm1pbkZvbnRTaXplIjoiOHB4IiwibWF4Rm9udFNpemUiOiIxNnB4In0%3D
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<Toggle
					class={`block h-full w-full truncate overflow-hidden bg-secondary p-2 text-xl wrap-break-word text-ellipsis whitespace-normal text-secondary-foreground`}
					bind:pressed
					{...props}
					style="font-size: clamp(0.5rem, -0.1667rem + 2.6667vw, 1rem);"
					size="lg"
				>
					{name}
				</Toggle>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content class="hidden max-w-xs wrap-break-word whitespace-normal md:block">
			{#if !description}
				{name}
			{:else}
				<span class="font-semibold">{name}:&nbsp;</span>{description}
			{/if}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
