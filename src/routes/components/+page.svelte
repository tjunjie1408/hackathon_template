<script lang="ts">
	import Foundations from './sections/Foundations.svelte';
	import Primitives from './sections/Primitives.svelte';
	import Overlays from './sections/Overlays.svelte';
	import Effects from './sections/Effects.svelte';

	const sections = [
		{ id: 'foundations', label: 'Foundations' },
		{ id: 'primitives', label: 'Primitives' },
		{ id: 'overlays', label: 'Overlays' },
		{ id: 'effects', label: 'Effects' }
	];
</script>

<svelte:head><title>Components · starter</title></svelte:head>

<div class="flex flex-col gap-14">
	<header class="flex flex-col gap-3 stagger">
		<h1 class="animate-fade-up text-4xl font-semibold tracking-tight">Components</h1>
		<p class="max-w-2xl animate-fade-up text-[15px] text-muted-foreground">
			Everything in this template, live. Toggle dark mode or switch the brand preset in the header —
			every tile follows. See <code class="font-mono text-[13px] text-foreground">DESIGN.md</code> for
			how to rebrand and extend.
		</p>
		<nav class="flex animate-fade-up flex-wrap gap-2 pt-1">
			{#each sections as s (s.id)}
				<a
					href="#{s.id}"
					class="press rounded-full border border-border bg-card px-3 py-1 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
				>
					{s.label}
				</a>
			{/each}
		</nav>
	</header>

	<Foundations />
	<Primitives />
	<Overlays />
	<Effects />
</div>
