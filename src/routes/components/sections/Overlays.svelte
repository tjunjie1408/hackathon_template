<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Popover from '$lib/components/ui/popover';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Sheet from '$lib/components/ui/sheet';
	import * as Command from '$lib/components/ui/command';
	import * as Kbd from '$lib/components/ui/kbd';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import PencilIcon from '@lucide/svelte/icons/pencil';
	import CopyIcon from '@lucide/svelte/icons/copy';
	import TrashIcon from '@lucide/svelte/icons/trash-2';
	import CalendarIcon from '@lucide/svelte/icons/calendar';
	import SettingsIcon from '@lucide/svelte/icons/settings';
	import SearchIcon from '@lucide/svelte/icons/search';
	import Section from './Section.svelte';
	import Demo from './Demo.svelte';

	let commandOpen = $state(false);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
			e.preventDefault();
			commandOpen = !commandOpen;
		}
	}

	function promiseToast() {
		toast.promise(new Promise((r) => setTimeout(r, 1500)), {
			loading: 'Deploying…',
			success: 'Deployed to production',
			error: 'Deploy failed'
		});
	}
</script>

<svelte:window onkeydown={onKeydown} />

<Section
	id="overlays"
	title="Overlays & feedback"
	description="Focus-trapped, keyboard accessible, animated via tw-animate-css."
>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Demo label="Dialog" code="Dialog.Root · Dialog.Content">
			<Dialog.Root>
				<Dialog.Trigger class={buttonVariants()}>Edit profile</Dialog.Trigger>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Edit profile</Dialog.Title>
						<Dialog.Description>Make changes and save when you're done.</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-2">
						<Label for="dlg-name">Name</Label>
						<Input id="dlg-name" value="Ada Lovelace" />
					</div>
					<Dialog.Footer>
						<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
						<Dialog.Close class={buttonVariants()} onclick={() => toast.success('Profile saved')}>
							Save
						</Dialog.Close>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</Demo>

		<Demo label="Alert dialog" code="AlertDialog.Action variant='destructive'">
			<AlertDialog.Root>
				<AlertDialog.Trigger class={buttonVariants({ variant: 'destructive' })}
					>Delete project</AlertDialog.Trigger
				>
				<AlertDialog.Content>
					<AlertDialog.Header>
						<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
						<AlertDialog.Description>This action cannot be undone.</AlertDialog.Description>
					</AlertDialog.Header>
					<AlertDialog.Footer>
						<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
						<AlertDialog.Action
							variant="destructive"
							onclick={() => toast.error('Project deleted')}
						>
							Delete
						</AlertDialog.Action>
					</AlertDialog.Footer>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</Demo>

		<Demo label="Sheet (drawer)" code="Sheet.Content side='right|left|top|bottom'">
			{#each ['right', 'bottom'] as const as side (side)}
				<Sheet.Root>
					<Sheet.Trigger class={buttonVariants({ variant: 'outline' })}>{side}</Sheet.Trigger>
					<Sheet.Content {side}>
						<Sheet.Header>
							<Sheet.Title>Inspector</Sheet.Title>
							<Sheet.Description>A side drawer for detail / telemetry panes.</Sheet.Description>
						</Sheet.Header>
						<div class="px-4 text-[13px] text-muted-foreground">Drawer body content.</div>
					</Sheet.Content>
				</Sheet.Root>
			{/each}
		</Demo>

		<Demo label="Dropdown menu" code="DropdownMenu.Item variant='destructive'">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline' })}
					>Actions</DropdownMenu.Trigger
				>
				<DropdownMenu.Content class="w-48">
					<DropdownMenu.Label>Project</DropdownMenu.Label>
					<DropdownMenu.Separator />
					<DropdownMenu.Item onSelect={() => toast('Edit')}>
						<PencilIcon />Edit<DropdownMenu.Shortcut>⌘E</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Item onSelect={() => toast('Duplicated')}>
						<CopyIcon />Duplicate<DropdownMenu.Shortcut>⌘D</DropdownMenu.Shortcut>
					</DropdownMenu.Item>
					<DropdownMenu.Separator />
					<DropdownMenu.Item variant="destructive" onSelect={() => toast.error('Deleted')}>
						<TrashIcon />Delete
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Demo>

		<Demo label="Popover & tooltip" code="Popover.Content · Tooltip.Content">
			<Popover.Root>
				<Popover.Trigger class={buttonVariants({ variant: 'outline' })}>Popover</Popover.Trigger>
				<Popover.Content class="w-64">
					<Popover.Header>
						<Popover.Title>Dimensions</Popover.Title>
						<Popover.Description>Set the layer width.</Popover.Description>
					</Popover.Header>
					<Input value="320px" class="mt-2" />
				</Popover.Content>
			</Popover.Root>
			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'ghost' })}>Hover me</Tooltip.Trigger>
				<Tooltip.Content>Positioned, accessible tooltip</Tooltip.Content>
			</Tooltip.Root>
		</Demo>

		<Demo label="Toasts" code="toast.success · toast.error · toast.promise">
			<Button
				variant="soft"
				onclick={() => toast.success('Saved', { description: 'All changes synced.' })}
			>
				Success
			</Button>
			<Button variant="outline" onclick={() => toast.error('Something broke')}>Error</Button>
			<Button variant="outline" onclick={promiseToast}>Promise</Button>
		</Demo>

		<Demo
			label="Command palette"
			code="Command.Dialog bind:open — try Ctrl/⌘ + K"
			class="sm:col-span-2 lg:col-span-3"
		>
			<Button
				variant="outline"
				class="w-full justify-start text-muted-foreground sm:w-80"
				onclick={() => (commandOpen = true)}
			>
				<SearchIcon data-icon="inline-start" />Search commands…
				<Kbd.Group class="ml-auto"><Kbd.Root>Ctrl</Kbd.Root><Kbd.Root>K</Kbd.Root></Kbd.Group>
			</Button>
			<Command.Dialog bind:open={commandOpen}>
				<Command.Input placeholder="Type a command or search…" />
				<Command.List>
					<Command.Empty>No results found.</Command.Empty>
					<Command.Group heading="Suggestions">
						<Command.Item onSelect={() => ((commandOpen = false), toast('Calendar'))}>
							<CalendarIcon />Calendar
						</Command.Item>
						<Command.Item onSelect={() => ((commandOpen = false), toast('Settings'))}>
							<SettingsIcon />Settings
						</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Dialog>
		</Demo>
	</div>
</Section>
