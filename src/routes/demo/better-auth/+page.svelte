<script lang="ts">
	import { enhance } from '$app/forms';
	import * as Card from '$lib/components/ui/card';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import LogOutIcon from '@lucide/svelte/icons/log-out';
	import type { PageServerData } from './$types';

	let { data }: { data: PageServerData } = $props();

	const initials = $derived(
		data.user.name
			.split(' ')
			.map((p) => p[0])
			.join('')
			.slice(0, 2)
			.toUpperCase()
	);
</script>

<Card.Root class="mx-auto max-w-md animate-fade-up">
	<Card.Header class="flex items-center gap-4">
		<Avatar.Root class="size-12">
			<Avatar.Fallback class="bg-brand-gradient font-medium text-primary-foreground">
				{initials}
			</Avatar.Fallback>
		</Avatar.Root>
		<div>
			<Card.Title class="text-lg">Hi, {data.user.name}!</Card.Title>
			<Card.Description class="font-mono text-xs">{data.user.id}</Card.Description>
		</div>
	</Card.Header>
	<Card.Footer class="justify-end">
		<form method="post" action="?/signOut" use:enhance>
			<Button type="submit" variant="outline"
				><LogOutIcon data-icon="inline-start" />Sign out</Button
			>
		</form>
	</Card.Footer>
</Card.Root>
