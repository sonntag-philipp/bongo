<script>
	import { Toggle } from './ui/toggle';
	import * as Tooltip from './ui/tooltip';

	let { name, description } = $props();
</script>

<Tooltip.Provider>
	<Tooltip.Root>
		<Tooltip.Trigger>
			<Toggle size="lg">
				<div class="flex flex-col p-4">
					<span class="text-xl">{name}</span>
				</div>
			</Toggle>
		</Tooltip.Trigger>
		<Tooltip.Content>
			{description}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
