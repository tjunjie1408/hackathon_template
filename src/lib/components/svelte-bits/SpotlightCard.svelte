<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		spotlightColor?: string;
		/** Spotlight radius in px. */
		size?: number;
		children?: Snippet;
	};

	let {
		class: className = '',
		spotlightColor = 'color-mix(in oklch, var(--primary) 22%, transparent)',
		size = 360,
		children
	}: Props = $props();

	let divRef: HTMLDivElement;
	let isFocused = $state(false);
	let posX = $state(0);
	let posY = $state(0);
	let opacity = $state(0);

	function handleMouseMove(e: MouseEvent) {
		if (!divRef || isFocused) return;
		const rect = divRef.getBoundingClientRect();
		posX = e.clientX - rect.left;
		posY = e.clientY - rect.top;
	}
	function handleFocus() {
		isFocused = true;
		opacity = 0.6;
	}
	function handleBlur() {
		isFocused = false;
		opacity = 0;
	}
	function handleMouseEnter() {
		opacity = 1;
	}
	function handleMouseLeave() {
		opacity = 0;
	}
</script>

<div
	bind:this={divRef}
	role="presentation"
	onmousemove={handleMouseMove}
	onfocusin={handleFocus}
	onfocusout={handleBlur}
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
	class="relative overflow-hidden rounded-xl bg-card p-6 text-card-foreground shadow-xs ring-1 ring-foreground/8 {className}"
>
	<div
		class="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-smooth"
		style="opacity:{opacity};background:radial-gradient({size}px circle at {posX}px {posY}px, {spotlightColor}, transparent 70%);"
	></div>
	<div class="relative">
		{@render children?.()}
	</div>
</div>
