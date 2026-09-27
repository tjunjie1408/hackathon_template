<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		label,
		code,
		class: className,
		children
	}: { label: string; code?: string; class?: string; children: Snippet } = $props();
</script>

<!-- One showcase tile: label, the live demo, and the import/usage hint. -->
<div
	class={cn('flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/8', className)}
>
	<div class="flex items-center justify-between gap-2 border-b border-border px-4 py-2.5">
		<span class="text-[13px] font-medium">{label}</span>
	</div>
	<div class="flex flex-1 flex-wrap content-start items-center gap-3 p-5">
		{@render children()}
	</div>
	{#if code}
		<code
			class="block truncate border-t border-border bg-muted/40 px-4 py-2 font-mono text-[11px] text-muted-foreground"
		>
			{code}
		</code>
	{/if}
</div>
