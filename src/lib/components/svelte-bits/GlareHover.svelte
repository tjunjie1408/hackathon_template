<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		width?: string;
		height?: string;
		background?: string;
		borderRadius?: string;
		borderColor?: string;
		/** Any CSS color, including var(--…). */
		glareColor?: string;
		glareOpacity?: number;
		glareAngle?: number;
		glareSize?: number;
		transitionDuration?: number;
		playOnce?: boolean;
		class?: string;
		style?: string;
	};

	let {
		children,
		width = '100%',
		height = 'auto',
		background = 'var(--card)',
		borderRadius = 'var(--radius-xl)',
		borderColor = 'var(--border)',
		glareColor = 'oklch(1 0 0)',
		glareOpacity = 0.35,
		glareAngle = -45,
		glareSize = 250,
		transitionDuration = 650,
		playOnce = false,
		class: className = '',
		style = ''
	}: Props = $props();

	const glare = $derived(
		`color-mix(in oklch, ${glareColor} ${Math.round(glareOpacity * 100)}%, transparent)`
	);

	let overlay: HTMLDivElement;

	function animateIn() {
		if (!overlay) return;
		overlay.style.transition = 'none';
		overlay.style.backgroundPosition = '-100% -100%, 0 0';
		// force reflow
		void overlay.offsetWidth;
		overlay.style.transition = `${transitionDuration}ms ease`;
		overlay.style.backgroundPosition = '100% 100%, 0 0';
	}

	function animateOut() {
		if (!overlay) return;
		if (playOnce) {
			overlay.style.transition = 'none';
			overlay.style.backgroundPosition = '-100% -100%, 0 0';
		} else {
			overlay.style.transition = `${transitionDuration}ms ease`;
			overlay.style.backgroundPosition = '-100% -100%, 0 0';
		}
	}
</script>

<div
	class="relative grid place-items-center overflow-hidden border {className}"
	style="width:{width};height:{height};background:{background};border-radius:{borderRadius};border-color:{borderColor};{style}"
	onmouseenter={animateIn}
	onmouseleave={animateOut}
	role="presentation"
>
	<div
		bind:this={overlay}
		style="position:absolute;inset:0;background:linear-gradient({glareAngle}deg, transparent 60%, {glare} 70%, transparent 100%);background-size:{glareSize}% {glareSize}%, 100% 100%;background-repeat:no-repeat;background-position:-100% -100%, 0 0;pointer-events:none;"
	></div>
	{#if children}{@render children()}{/if}
</div>
