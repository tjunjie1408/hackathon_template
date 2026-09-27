<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		children?: Snippet;
		as?: string;
		class?: string;
		/** Class for the inner surface (padding, background, text). */
		innerClass?: string;
		color?: string;
		speed?: string;
		thickness?: number;
		[key: string]: unknown;
	};

	let {
		children,
		as = 'button',
		class: className = '',
		innerClass = '',
		color = 'var(--primary)',
		speed = '6s',
		thickness = 1,
		...rest
	}: Props = $props();

	const gradientBg = $derived(`radial-gradient(circle, ${color}, transparent 10%)`);
</script>

<svelte:element
	this={as}
	class="star-border relative inline-block press overflow-hidden rounded-xl {className}"
	style:padding="{thickness}px 0"
	{...rest}
>
	<div
		class="star-sweep-bottom absolute right-[-250%] bottom-[-11px] z-0 h-[50%] w-[300%] rounded-full opacity-70"
		style:background={gradientBg}
		style:animation-duration={speed}
	></div>
	<div
		class="star-sweep-top absolute top-[-10px] left-[-250%] z-0 h-[50%] w-[300%] rounded-full opacity-70"
		style:background={gradientBg}
		style:animation-duration={speed}
	></div>
	<div
		class="relative z-1 rounded-xl border border-border bg-linear-to-b from-card to-muted px-6 py-3 text-center text-sm font-medium text-card-foreground {innerClass}"
	>
		{@render children?.()}
	</div>
</svelte:element>

<style>
	.star-sweep-bottom {
		animation-name: star-movement-bottom;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
	.star-sweep-top {
		animation-name: star-movement-top;
		animation-timing-function: linear;
		animation-iteration-count: infinite;
		animation-direction: alternate;
	}
	@keyframes star-movement-bottom {
		0% {
			transform: translate(0%, 0%);
			opacity: 1;
		}
		100% {
			transform: translate(-100%, 0%);
			opacity: 0;
		}
	}
	@keyframes star-movement-top {
		0% {
			transform: translate(0%, 0%);
			opacity: 1;
		}
		100% {
			transform: translate(100%, 0%);
			opacity: 0;
		}
	}
</style>
