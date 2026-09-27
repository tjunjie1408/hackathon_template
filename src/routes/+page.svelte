<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { enhance as formEnhance } from '$app/forms';
	import { toast } from 'svelte-sonner';
	import { fly } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { prefersReducedMotion } from 'svelte/motion';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import * as Empty from '$lib/components/ui/empty';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge, type BadgeVariant } from '$lib/components/ui/badge';
	import GradientText from '$lib/components/svelte-bits/GradientText.svelte';
	import ListTodoIcon from '@lucide/svelte/icons/list-todo';
	import Trash2Icon from '@lucide/svelte/icons/trash-2';
	import PlusIcon from '@lucide/svelte/icons/plus';

	let { data } = $props();

	// svelte-ignore state_referenced_locally
	const { form, errors, enhance, submitting } = superForm(data.form, {
		resetForm: true,
		onUpdated: ({ form }) => {
			if (form.valid && form.message) toast.success(String(form.message));
		}
	});

	function tone(p: number): BadgeVariant {
		if (p >= 4) return 'destructive';
		if (p >= 3) return 'warning';
		if (p >= 2) return 'info';
		return 'outline';
	}

	const motionY = $derived(prefersReducedMotion.current ? 0 : 12);
</script>

<div class="flex flex-col gap-10">
	<section class="flex flex-col gap-3 stagger">
		<Badge variant="soft" dot pulse class="animate-fade-up">SvelteKit full-stack template</Badge>
		<h1 class="animate-fade-up text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
			Ship the demo, <GradientText>not the boilerplate.</GradientText>
		</h1>
		<p class="max-w-2xl animate-fade-up text-[15px] text-pretty text-muted-foreground">
			App shell, themed shadcn-svelte components, Svelte Bits effects, and the Zod &rarr; service
			pattern wired end to end. Try the palette icon in the header to rebrand live.
		</p>
	</section>

	<div class="grid items-start gap-6 md:grid-cols-[340px_1fr]">
		<Card.Root class="animate-fade-up [--delay:200ms]">
			<Card.Header>
				<Card.Title>New task</Card.Title>
				<Card.Description>Validated by the same Zod schema on client and server.</Card.Description>
			</Card.Header>
			<Card.Content>
				<form method="post" action="?/create" use:enhance>
					<Field.Group>
						<Field.Field data-invalid={$errors.title ? true : undefined}>
							<Field.Label for="title">Title</Field.Label>
							<Input
								id="title"
								name="title"
								bind:value={$form.title}
								placeholder="Ship the demo"
								aria-invalid={$errors.title ? 'true' : undefined}
							/>
							<Field.Error errors={$errors.title?.map((message) => ({ message }))} />
						</Field.Field>
						<Field.Field data-invalid={$errors.priority ? true : undefined}>
							<Field.Label for="priority">Priority</Field.Label>
							<Input
								id="priority"
								name="priority"
								type="number"
								min="1"
								max="5"
								bind:value={$form.priority}
								aria-invalid={$errors.priority ? 'true' : undefined}
							/>
							<Field.Description>1 = someday, 5 = on fire.</Field.Description>
							<Field.Error errors={$errors.priority?.map((message) => ({ message }))} />
						</Field.Field>
						<Button type="submit" loading={$submitting} class="w-full">
							{#if !$submitting}<PlusIcon data-icon="inline-start" />{/if}
							Add task
						</Button>
					</Field.Group>
				</form>
			</Card.Content>
		</Card.Root>

		<Card.Root class="animate-fade-up [--delay:280ms]">
			<Card.Header>
				<Card.Title>Tasks</Card.Title>
				<Card.Action>
					<Badge variant="outline" class="font-mono">{data.tasks.length} total</Badge>
				</Card.Action>
			</Card.Header>
			<Card.Content>
				{#if data.tasks.length === 0}
					<Empty.Root class="border border-dashed">
						<Empty.Header>
							<Empty.Media variant="icon"><ListTodoIcon /></Empty.Media>
							<Empty.Title>No tasks yet</Empty.Title>
							<Empty.Description>Add your first task with the form.</Empty.Description>
						</Empty.Header>
					</Empty.Root>
				{:else}
					<ul class="flex flex-col divide-y divide-border">
						{#each data.tasks as task (task.id)}
							<li
								class="group flex items-center gap-3 py-2.5"
								animate:flip={{ duration: 250 }}
								in:fly={{ y: motionY, duration: 300 }}
							>
								<Badge variant={tone(task.priority)} class="w-9 font-mono">P{task.priority}</Badge>
								<span class="flex-1 truncate text-sm">{task.title}</span>
								<form
									id={`delete-${task.id}`}
									method="post"
									action="?/delete"
									use:formEnhance={() => {
										return async ({ update }) => {
											await update();
											toast.success('Task deleted.');
										};
									}}
								>
									<input type="hidden" name="id" value={task.id} />
								</form>
								<AlertDialog.Root>
									<AlertDialog.Trigger
										class={buttonVariants({
											variant: 'ghost',
											size: 'icon-sm',
											class:
												'text-muted-foreground opacity-0 group-hover:opacity-100 hover:text-destructive focus-visible:opacity-100'
										})}
										aria-label="Delete task"
									>
										<Trash2Icon />
									</AlertDialog.Trigger>
									<AlertDialog.Content>
										<AlertDialog.Header>
											<AlertDialog.Title>Delete this task?</AlertDialog.Title>
											<AlertDialog.Description>
												“{task.title}” will be permanently removed. This can't be undone.
											</AlertDialog.Description>
										</AlertDialog.Header>
										<AlertDialog.Footer>
											<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
											<AlertDialog.Action
												type="submit"
												form={`delete-${task.id}`}
												variant="destructive"
											>
												Delete
											</AlertDialog.Action>
										</AlertDialog.Footer>
									</AlertDialog.Content>
								</AlertDialog.Root>
							</li>
						{/each}
					</ul>
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
</div>
