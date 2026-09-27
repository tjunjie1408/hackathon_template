<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let pending = $state(false);
</script>

<div class="relative grid min-h-[70vh] place-items-center">
	<div class="pointer-events-none absolute inset-0 -z-10 bg-dots mask-fade"></div>

	<Card.Root variant="elevated" class="w-full max-w-sm animate-scale-in">
		<Card.Header class="text-center">
			<Card.Title class="text-xl">Welcome back</Card.Title>
			<Card.Description>Sign in, or fill in a name to register.</Card.Description>
		</Card.Header>
		<Card.Content>
			<form
				method="post"
				action="?/signInEmail"
				use:enhance={() => {
					pending = true;
					return async ({ update }) => {
						await update();
						pending = false;
					};
				}}
			>
				<Field.Group>
					<Field.Field>
						<Field.Label for="email">Email</Field.Label>
						<Input id="email" type="email" name="email" autocomplete="email" required />
					</Field.Field>
					<Field.Field>
						<Field.Label for="password">Password</Field.Label>
						<Input
							id="password"
							type="password"
							name="password"
							autocomplete="current-password"
							required
						/>
					</Field.Field>
					<Field.Field>
						<Field.Label for="name"
							>Name <span class="text-muted-foreground">(register only)</span></Field.Label
						>
						<Input id="name" name="name" autocomplete="name" />
					</Field.Field>

					{#if form?.message}
						<p
							role="alert"
							class="animate-shake rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
						>
							{form.message}
						</p>
					{/if}

					<div class="grid grid-cols-2 gap-2">
						<Button type="submit" loading={pending}>Login</Button>
						<Button type="submit" variant="outline" formaction="?/signUpEmail" disabled={pending}>
							Register
						</Button>
					</div>
				</Field.Group>
			</form>
		</Card.Content>
	</Card.Root>
</div>
