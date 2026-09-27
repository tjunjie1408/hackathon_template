<script lang="ts">
	import type { Snippet } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';
	import { toRgb } from '$lib/theme';

	type Easing = 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
	type Spark = { x: number; y: number; angle: number; startTime: number; color: string };

	type Props = {
		children?: Snippet;
		/** Any CSS color, including var(--…); re-read on every click so it follows the theme. */
		sparkColor?: string;
		sparkSize?: number;
		sparkRadius?: number;
		sparkCount?: number;
		duration?: number;
		easing?: Easing;
		extraScale?: number;
		class?: string;
	};

	let {
		children,
		sparkColor = 'var(--primary)',
		sparkSize = 10,
		sparkRadius = 15,
		sparkCount = 8,
		duration = 400,
		easing = 'ease-out',
		extraScale = 1.0,
		class: className = ''
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let wrapper: HTMLDivElement;
	const sparks: Spark[] = [];
	let raf = 0;

	function easeFunc(t: number): number {
		switch (easing) {
			case 'linear':
				return t;
			case 'ease-in':
				return t * t;
			case 'ease-in-out':
				return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
			default:
				return t * (2 - t);
		}
	}

	$effect(() => {
		if (!canvas || !wrapper) return;

		// Match the backing store to the device pixel ratio so sparks stay crisp.
		const resizeCanvas = () => {
			const { width, height } = wrapper.getBoundingClientRect();
			const dpr = window.devicePixelRatio || 1;
			canvas.width = Math.round(width * dpr);
			canvas.height = Math.round(height * dpr);
			canvas.style.width = `${width}px`;
			canvas.style.height = `${height}px`;
			canvas.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		const ro = new ResizeObserver(resizeCanvas);
		ro.observe(wrapper);
		resizeCanvas();

		return () => {
			ro.disconnect();
			cancelAnimationFrame(raf);
		};
	});

	// The loop only runs while sparks are alive — no idle rAF.
	function draw(timestamp: number) {
		const ctx = canvas?.getContext('2d');
		if (!ctx) return;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = sparks.length - 1; i >= 0; i--) {
			const spark = sparks[i];
			const elapsed = timestamp - spark.startTime;
			if (elapsed >= duration) {
				sparks.splice(i, 1);
				continue;
			}
			const progress = elapsed / duration;
			const eased = easeFunc(progress);
			const distance = eased * sparkRadius * extraScale;
			const lineLength = sparkSize * (1 - eased);
			const x1 = spark.x + distance * Math.cos(spark.angle);
			const y1 = spark.y + distance * Math.sin(spark.angle);
			const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
			const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);
			ctx.strokeStyle = spark.color;
			ctx.lineWidth = 2;
			ctx.lineCap = 'round';
			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x2, y2);
			ctx.stroke();
		}
		raf = sparks.length ? requestAnimationFrame(draw) : 0;
	}

	function handleClick(e: MouseEvent) {
		if (!canvas || prefersReducedMotion.current) return;
		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const now = performance.now();
		const { r, g, b, a } = toRgb(sparkColor, wrapper);
		const color = `rgb(${r} ${g} ${b} / ${a})`;
		for (let i = 0; i < sparkCount; i++) {
			sparks.push({ x, y, angle: (2 * Math.PI * i) / sparkCount, startTime: now, color });
		}
		if (!raf) raf = requestAnimationFrame(draw);
	}
</script>

<div
	bind:this={wrapper}
	onclick={handleClick}
	role="presentation"
	class="relative h-full w-full {className}"
>
	<canvas bind:this={canvas} class="pointer-events-none absolute inset-0 z-10"></canvas>
	{#if children}{@render children()}{/if}
</div>
