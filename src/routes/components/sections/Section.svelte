<script lang="ts">
	import type { Snippet } from 'svelte';
	import { reveal } from '$lib/attachments/reveal';

	let {
		id,
		title,
		description,
		children
	}: { id: string; title: string; description?: string; children: Snippet } = $props();
</script>

<section {id} class="scroll-mt-24" {@attach reveal()}>
	<div class="mb-5">
		<h2 class="text-xl font-semibold tracking-tight">{title}</h2>
		{#if description}
			<p class="mt-1 text-sm text-muted-foreground">{description}</p>
		{/if}
	</div>
	{@render children()}
</section>
