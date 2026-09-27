<script lang="ts">
	import { theme, setTheme } from 'mode-watcher';
	import { BRAND_PRESETS } from '$lib/theme';
	import { Button } from '$lib/components/ui/button';
	import { cn } from '$lib/utils';
	import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
	import Section from './Section.svelte';
	import Demo from './Demo.svelte';

	const brand = [
		{ name: 'primary', label: '主色 Primary', bg: 'bg-primary', fg: 'text-primary-foreground' },
		{
			name: 'secondary',
			label: '副色 Secondary',
			bg: 'bg-secondary',
			fg: 'text-secondary-foreground'
		},
		{ name: 'primary-soft', label: 'Primary soft', bg: 'bg-primary-soft', fg: 'text-primary' },
		{
			name: 'secondary-soft',
			label: 'Secondary soft',
			bg: 'bg-secondary-soft',
			fg: 'text-secondary'
		}
	];
	const status = [
		{ name: 'success', bg: 'bg-success' },
		{ name: 'warning', bg: 'bg-warning' },
		{ name: 'info', bg: 'bg-info' },
		{ name: 'destructive', bg: 'bg-destructive' }
	];
	const neutrals = [
		{ name: 'background', bg: 'bg-background' },
		{ name: 'card', bg: 'bg-card' },
		{ name: 'muted', bg: 'bg-muted' },
		{ name: 'accent', bg: 'bg-accent' },
		{ name: 'border', bg: 'bg-border' },
		{ name: 'muted-fg', bg: 'bg-muted-foreground' },
		{ name: 'foreground', bg: 'bg-foreground' }
	];
	const radii = [
		'rounded-sm',
		'rounded-md',
		'rounded-lg',
		'rounded-xl',
		'rounded-2xl',
		'rounded-full'
	];
	const shadows = ['shadow-xs', 'shadow-sm', 'shadow-md', 'shadow-lg', 'shadow-xl', 'shadow-glow'];
	const animations = [
		'animate-fade-in',
		'animate-fade-up',
		'animate-fade-down',
		'animate-scale-in',
		'animate-blur-in',
		'animate-pop',
		'animate-shake',
		'animate-float'
	];

	let replay = $state(0);
</script>

<Section
	id="foundations"
	title="Foundations"
	description="Design tokens from src/routes/layout.css. Change two hue numbers there (or pick a preset) and everything below follows."
>
	<div class="grid gap-4 lg:grid-cols-2">
		<Demo
			label="Brand presets"
			code="setTheme('violet')  ·  <html data-theme='violet'>"
			class="lg:col-span-2"
		>
			{#each BRAND_PRESETS as preset (preset.id)}
				<button
					onclick={() => setTheme(preset.id)}
					class={cn(
						'flex press items-center gap-2 rounded-full border border-border px-3 py-1.5 text-[13px] transition-colors hover:bg-accent',
						(theme.current ?? '') === preset.id && 'border-primary bg-primary-soft text-primary'
					)}
				>
					<span class="flex -space-x-1">
						{#each preset.swatch as color, i (i)}
							<span class="size-4 rounded-full ring-2 ring-card" style:background={color}></span>
						{/each}
					</span>
					{preset.label}
				</button>
			{/each}
		</Demo>

		<Demo label="Brand colors" code="bg-primary · bg-secondary · bg-primary-soft · text-gradient">
			<div class="grid w-full grid-cols-2 gap-2 sm:grid-cols-4">
				{#each brand as c (c.name)}
					<div
						class={cn(
							'flex h-20 flex-col justify-end rounded-lg p-2.5 text-[11px] font-medium',
							c.bg,
							c.fg
						)}
					>
						{c.label}
					</div>
				{/each}
			</div>
			<div
				class="flex h-10 w-full items-center justify-center rounded-lg bg-brand-gradient text-[13px] font-medium text-primary-foreground"
			>
				bg-brand-gradient
			</div>
		</Demo>

		<Demo
			label="Status & neutrals"
			code="bg-success · bg-warning · bg-info · bg-destructive · bg-muted …"
		>
			<div class="grid w-full grid-cols-4 gap-2">
				{#each status as c (c.name)}
					<div class="flex flex-col gap-1.5">
						<div class={cn('h-10 rounded-lg', c.bg)}></div>
						<span class="font-mono text-[10px] text-muted-foreground">{c.name}</span>
					</div>
				{/each}
			</div>
			<div class="grid w-full grid-cols-7 gap-1.5">
				{#each neutrals as c (c.name)}
					<div class="flex flex-col gap-1.5">
						<div class={cn('h-10 rounded-lg ring-1 ring-foreground/10', c.bg)}></div>
						<span class="truncate font-mono text-[10px] text-muted-foreground">{c.name}</span>
					</div>
				{/each}
			</div>
		</Demo>

		<Demo label="Radius" code="--radius: 0.75rem → rounded-sm … rounded-4xl">
			{#each radii as r (r)}
				<div class="flex flex-col items-center gap-1.5">
					<div class={cn('size-12 border-2 border-primary bg-primary-soft', r)}></div>
					<span class="font-mono text-[10px] text-muted-foreground"
						>{r.replace('rounded-', '')}</span
					>
				</div>
			{/each}
		</Demo>

		<Demo label="Elevation" code="shadow-xs … shadow-xl · shadow-glow">
			{#each shadows as s (s)}
				<div class="flex flex-col items-center gap-2">
					<div class={cn('size-12 rounded-lg bg-card', s)}></div>
					<span class="font-mono text-[10px] text-muted-foreground">{s.replace('shadow-', '')}</span
					>
				</div>
			{/each}
		</Demo>

		<Demo
			label="Entrance animations"
			code="animate-fade-up · add `stagger` to the parent to cascade children"
			class="lg:col-span-2"
		>
			<div class="flex w-full items-center justify-between">
				<span class="text-[13px] text-muted-foreground">
					Pure CSS — SSR-safe, respects prefers-reduced-motion.
				</span>
				<Button variant="outline" size="sm" onclick={() => replay++}>
					<RotateCcwIcon data-icon="inline-start" />Replay
				</Button>
			</div>
			{#key replay}
				<div class="grid w-full grid-cols-2 gap-3 stagger sm:grid-cols-4">
					{#each animations as a (a)}
						<div
							class={cn(
								'grid h-16 place-items-center rounded-lg bg-muted font-mono text-[11px] text-muted-foreground',
								a
							)}
						>
							{a.replace('animate-', '')}
						</div>
					{/each}
				</div>
			{/key}
		</Demo>

		<Demo
			label="Interaction utilities"
			code="press · hover-lift · glass · shimmer"
			class="lg:col-span-2"
		>
			<button
				class="press rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
			>
				press (click me)
			</button>
			<div class="hover-lift rounded-lg bg-card px-4 py-2 text-sm ring-1 ring-foreground/10">
				hover-lift
			</div>
			<div class="relative overflow-hidden rounded-lg px-4 py-2 text-sm">
				<div class="absolute inset-0 bg-brand-gradient opacity-70"></div>
				<div class="relative rounded-md glass px-3 py-1">glass</div>
			</div>
			<div class="h-9 w-32 shimmer rounded-lg"></div>
			<div class="text-gradient text-lg font-semibold">text-gradient</div>
			<div class="relative h-16 w-40 overflow-hidden rounded-lg ring-1 ring-foreground/10">
				<div class="absolute inset-0 bg-grid mask-fade [--grid-size:16px]"></div>
				<span
					class="absolute inset-0 grid place-items-center font-mono text-[11px] text-muted-foreground"
				>
					bg-grid mask-fade
				</span>
			</div>
		</Demo>
	</div>
</Section>
