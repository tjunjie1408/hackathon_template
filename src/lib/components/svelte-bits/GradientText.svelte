<script lang="ts">
	import type { Snippet } from 'svelte';
	import { prefersReducedMotion } from 'svelte/motion';

	type Props = {
		children: Snippet;
		class?: string;
		colors?: string[];
		animationSpeed?: number;
		showBorder?: boolean;
		direction?: 'horizontal' | 'vertical' | 'diagonal';
		pauseOnHover?: boolean;
		yoyo?: boolean;
	};

	let {
		children,
		class: className = '',
		// Theme-aware by default: follows the brand preset and dark mode.
		colors = ['var(--primary)', 'var(--secondary)', 'var(--primary)'],
		animationSpeed = 8,
		showBorder = false,
		direction = 'horizontal',
		pauseOnHover = false,
		yoyo = true
	}: Props = $props();

	let progress = $state(0);
	let isPaused = $state(false);

	$effect(() => {
		// reset on speed/yoyo change
		void animationSpeed;
		void yoyo;
		progress = 0;
	});

	$effect(() => {
		if (prefersReducedMotion.current) return;
		const animationDuration = animationSpeed * 1000;
		let elapsed = 0;
		let last: number | null = null;
		let raf = 0;

		const tick = (time: number) => {
			if (isPaused) {
				last = null;
				raf = requestAnimationFrame(tick);
				return;
			}
			if (last === null) {
				last = time;
				raf = requestAnimationFrame(tick);
				return;
			}
			const dt = time - last;
			last = time;
			elapsed += dt;

			if (yoyo) {
				const fullCycle = animationDuration * 2;
				const cycleTime = elapsed % fullCycle;
				if (cycleTime < animationDuration) {
					progress = (cycleTime / animationDuration) * 100;
				} else {
					progress = 100 - ((cycleTime - animationDuration) / animationDuration) * 100;
				}
			} else {
				progress = (elapsed / animationDuration) * 100;
			}
			raf = requestAnimationFrame(tick);
		};

		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	const gradientAngle = $derived(
		direction === 'horizontal'
			? 'to right'
			: direction === 'vertical'
				? 'to bottom'
				: 'to bottom right'
	);
	const gradientColors = $derived([...colors, colors[0]].join(', '));
	const backgroundImage = $derived(`linear-gradient(${gradientAngle}, ${gradientColors})`);
	const backgroundSize = $derived(
		direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%'
	);
	const backgroundPosition = $derived(
		direction === 'vertical' ? `50% ${progress}%` : `${progress}% 50%`
	);
</script>

<span
	class="relative inline-flex max-w-fit items-center overflow-hidden rounded-[1.25rem] {showBorder
		? 'px-3 py-1'
		: ''} {className}"
	onmouseenter={() => pauseOnHover && (isPaused = true)}
	onmouseleave={() => pauseOnHover && (isPaused = false)}
	role="presentation"
>
	{#if showBorder}
		<span
			class="pointer-events-none absolute inset-0 z-0 rounded-[1.25rem]"
			style:background-image={backgroundImage}
			style:background-size={backgroundSize}
			style:background-repeat="repeat"
			style:background-position={backgroundPosition}
		>
			<span
				class="absolute z-[-1] rounded-[1.25rem] bg-background"
				style="width:calc(100% - 2px);height:calc(100% - 2px);left:50%;top:50%;transform:translate(-50%,-50%);"
			></span>
		</span>
	{/if}
	<span
		class="relative z-2 inline-block bg-clip-text text-transparent"
		style:background-image={backgroundImage}
		style:background-size={backgroundSize}
		style:background-repeat="repeat"
		style:background-position={backgroundPosition}
		style:-webkit-background-clip="text"
	>
		{@render children()}
	</span>
</span>
