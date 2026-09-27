<script lang="ts">
	import type { Snippet } from 'svelte';
	import { motionValue, animate } from 'motion';
	import { prefersReducedMotion } from 'svelte/motion';

	type Props = {
		imageSrc: string;
		altText?: string;
		captionText?: string;
		containerHeight?: string;
		containerWidth?: string;
		imageHeight?: string;
		imageWidth?: string;
		scaleOnHover?: number;
		rotateAmplitude?: number;
		showMobileWarning?: boolean;
		showTooltip?: boolean;
		overlayContent?: Snippet;
		displayOverlayContent?: boolean;
	};

	let {
		imageSrc,
		altText = 'Tilted card image',
		captionText = '',
		containerHeight = '300px',
		containerWidth = '100%',
		imageHeight = '300px',
		imageWidth = '300px',
		scaleOnHover = 1.1,
		rotateAmplitude = 14,
		showMobileWarning = false,
		showTooltip = true,
		overlayContent,
		displayOverlayContent = false
	}: Props = $props();

	let figureRef: HTMLElement;
	let lastY = 0;

	const SPRING = { type: 'spring', stiffness: 100, damping: 30, mass: 2 } as const;
	const TIP_SPRING = { type: 'spring', stiffness: 350, damping: 30, mass: 1 } as const;

	const mvX = motionValue(0);
	const mvY = motionValue(0);
	const mvRX = motionValue(0);
	const mvRY = motionValue(0);
	const mvScale = motionValue(1);
	const mvOpacity = motionValue(0);
	const mvRotCap = motionValue(0);

	let xv = $state(0),
		yv = $state(0),
		rxv = $state(0),
		ryv = $state(0);
	let scaleV = $state(1),
		opacityV = $state(0),
		rotCapV = $state(0);

	mvX.on('change', (v) => (xv = v));
	mvY.on('change', (v) => (yv = v));
	mvRX.on('change', (v) => (rxv = v));
	mvRY.on('change', (v) => (ryv = v));
	mvScale.on('change', (v) => (scaleV = v));
	mvOpacity.on('change', (v) => (opacityV = v));
	mvRotCap.on('change', (v) => (rotCapV = v));

	function handleMouse(e: MouseEvent) {
		if (!figureRef || prefersReducedMotion.current) return;
		const rect = figureRef.getBoundingClientRect();
		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;
		const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
		const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
		animate(mvRX, rotationX, SPRING);
		animate(mvRY, rotationY, SPRING);
		mvX.set(e.clientX - rect.left);
		mvY.set(e.clientY - rect.top);
		const velocityY = offsetY - lastY;
		animate(mvRotCap, -velocityY * 0.6, TIP_SPRING);
		lastY = offsetY;
	}
	function handleEnter() {
		if (prefersReducedMotion.current) return;
		animate(mvScale, scaleOnHover, SPRING);
		animate(mvOpacity, 1, SPRING);
	}
	function handleLeave() {
		animate(mvOpacity, 0, SPRING);
		animate(mvScale, 1, SPRING);
		animate(mvRX, 0, SPRING);
		animate(mvRY, 0, SPRING);
		animate(mvRotCap, 0, TIP_SPRING);
	}
</script>

<figure
	bind:this={figureRef}
	class="relative flex h-full w-full flex-col items-center justify-center [perspective:800px]"
	style="height:{containerHeight};width:{containerWidth};"
	onmousemove={handleMouse}
	onmouseenter={handleEnter}
	onmouseleave={handleLeave}
>
	{#if showMobileWarning}
		<div class="absolute top-4 block text-center text-sm text-muted-foreground sm:hidden">
			This effect is not optimized for mobile. Check on desktop.
		</div>
	{/if}
	<div
		class="relative [transform-style:preserve-3d]"
		style="width:{imageWidth};height:{imageHeight};transform:rotateX({rxv}deg) rotateY({ryv}deg) scale({scaleV});"
	>
		<img
			src={imageSrc}
			alt={altText}
			class="absolute top-0 left-0 [transform:translateZ(0)] rounded-xl object-cover shadow-lg will-change-transform"
			style="width:{imageWidth};height:{imageHeight};"
		/>
		{#if displayOverlayContent && overlayContent}
			<div class="absolute top-0 left-0 z-[2] [transform:translateZ(30px)] will-change-transform">
				{@render overlayContent()}
			</div>
		{/if}
	</div>
	{#if showTooltip}
		<figcaption
			class="pointer-events-none absolute top-0 left-0 z-[3] hidden rounded-md bg-popover px-2.5 py-1 text-[11px] text-popover-foreground shadow-md sm:block"
			style="transform:translate({xv}px,{yv}px) rotate({rotCapV}deg);opacity:{opacityV};"
		>
			{captionText}
		</figcaption>
	{/if}
</figure>
