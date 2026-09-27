<script lang="ts">
	import { theme, setTheme } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { buttonVariants } from '$lib/components/ui/button';
	import { BRAND_PRESETS } from '$lib/theme';
	import PaletteIcon from '@lucide/svelte/icons/palette';
	import CheckIcon from '@lucide/svelte/icons/check';
</script>

<!-- Brand preset switcher: sets <html data-theme>, persisted by mode-watcher. -->
<DropdownMenu.Root>
	<DropdownMenu.Trigger
		class={buttonVariants({ variant: 'ghost', size: 'icon-sm' })}
		aria-label="Change brand color"
	>
		<PaletteIcon />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end" class="w-44">
		<DropdownMenu.Label>Brand</DropdownMenu.Label>
		<DropdownMenu.Separator />
		{#each BRAND_PRESETS as preset (preset.id)}
			<DropdownMenu.Item onSelect={() => setTheme(preset.id)}>
				<span class="flex -space-x-1">
					{#each preset.swatch as color, i (i)}
						<span class="size-3.5 rounded-full ring-2 ring-popover" style:background={color}></span>
					{/each}
				</span>
				{preset.label}
				{#if (theme.current ?? '') === preset.id}
					<CheckIcon class="ml-auto text-primary" />
				{/if}
			</DropdownMenu.Item>
		{/each}
	</DropdownMenu.Content>
</DropdownMenu.Root>
