<script lang="ts">
	import { onMount } from 'svelte';
	import { Toggle } from './ui/toggle';

	let { name, pressed = $bindable(false) } = $props();
	let collisionBoundary = $state<HTMLElement | null>(null);

	onMount(() => {
		collisionBoundary = document.querySelector('body');
	});

	// clamp() generator: https://clamp.font-size.app/?config=eyJyb290IjoiMTYiLCJtaW5XaWR0aCI6IjQwMHB4IiwibWF4V2lkdGgiOiI3MDBweCIsIm1pbkZvbnRTaXplIjoiOHB4IiwibWF4Rm9udFNpemUiOiIxNnB4In0%3D
</script>

<Toggle
	class={`block h-full w-full truncate overflow-hidden bg-secondary p-2 text-xl wrap-break-word text-ellipsis whitespace-normal text-secondary-foreground`}
	style="font-size: clamp(0.5rem, -0.1667rem + 2.6667vw, 1rem);"
	size="lg"
	bind:pressed
>
	{name}
</Toggle>
