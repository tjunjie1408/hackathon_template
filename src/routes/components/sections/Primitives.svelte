<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Switch } from '$lib/components/ui/switch';
	import { Progress } from '$lib/components/ui/progress';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Spinner } from '$lib/components/ui/spinner';
	import * as Card from '$lib/components/ui/card';
	import * as Field from '$lib/components/ui/field';
	import * as Select from '$lib/components/ui/select';
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Accordion from '$lib/components/ui/accordion';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Kbd from '$lib/components/ui/kbd';
	import SparklesIcon from '@lucide/svelte/icons/sparkles';
	import ArrowRightIcon from '@lucide/svelte/icons/arrow-right';
	import PlusIcon from '@lucide/svelte/icons/plus';
	import SearchIcon from '@lucide/svelte/icons/search';
	import Section from './Section.svelte';
	import Demo from './Demo.svelte';

	const variants = [
		'default',
		'secondary',
		'soft',
		'outline',
		'ghost',
		'destructive',
		'gradient',
		'link'
	] as const;
	const badgeVariants = [
		'default',
		'secondary',
		'soft',
		'secondary-soft',
		'success',
		'warning',
		'info',
		'destructive',
		'outline'
	] as const;
	const cardVariants = ['default', 'outline', 'elevated', 'glass', 'gradient'] as const;

	const frameworks = [
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'next', label: 'Next.js' },
		{ value: 'astro', label: 'Astro' }
	];
	let framework = $state('');
	const frameworkLabel = $derived(
		frameworks.find((f) => f.value === framework)?.label ?? 'Select a framework'
	);

	let loading = $state(false);
	let progress = $state(35);
	let notify = $state(true);

	function fakeSave() {
		loading = true;
		setTimeout(() => {
			loading = false;
			progress = Math.min(100, progress + 20);
			toast.success('Saved', { description: 'Your changes are live.' });
		}, 1200);
	}
</script>

<Section
	id="primitives"
	title="Primitives"
	description="shadcn-svelte components, re-themed and extended."
>
	<div class="grid gap-4 lg:grid-cols-2">
		<Demo label="Button — variants" code="<Button variant='soft'>…</Button>" class="lg:col-span-2">
			{#each variants as v (v)}
				<Button variant={v}>{v}</Button>
			{/each}
		</Demo>

		<Demo
			label="Button — sizes, icons, loading"
			code={"size='xs|sm|default|lg|xl|icon'  ·  loading={true}"}
		>
			<Button size="xs">xs</Button>
			<Button size="sm">sm</Button>
			<Button>default</Button>
			<Button size="lg">lg <ArrowRightIcon data-icon="inline-end" /></Button>
			<Button size="xl" variant="gradient"><SparklesIcon data-icon="inline-start" />xl</Button>
			<Button size="icon" variant="outline" aria-label="Add"><PlusIcon /></Button>
			<Button {loading} onclick={fakeSave}>{loading ? 'Saving…' : 'Click to save'}</Button>
		</Demo>

		<Demo label="Badge" code="<Badge variant='success' dot pulse>Live</Badge>">
			{#each badgeVariants as v (v)}
				<Badge variant={v}>{v}</Badge>
			{/each}
			<Badge variant="success" dot pulse>Live</Badge>
			<Badge variant="warning" dot>Degraded</Badge>
		</Demo>

		<Demo
			label="Form fields"
			code="Field.Field · Field.Label · Input · Field.Description · Field.Error"
		>
			<Field.Group class="w-full">
				<Field.Field>
					<Field.Label for="demo-email">Email</Field.Label>
					<div class="relative">
						<SearchIcon
							class="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
						/>
						<Input id="demo-email" placeholder="you@example.com" class="pl-8" />
					</div>
					<Field.Description>We never share it.</Field.Description>
				</Field.Field>
				<Field.Field data-invalid="true">
					<Field.Label for="demo-name">Username</Field.Label>
					<Input id="demo-name" value="ab" aria-invalid="true" />
					<Field.Error errors={[{ message: 'At least 3 characters.' }]} />
				</Field.Field>
				<Field.Field>
					<Field.Label for="demo-bio">Bio</Field.Label>
					<Textarea id="demo-bio" placeholder="Tell us a little…" />
				</Field.Field>
			</Field.Group>
		</Demo>

		<Demo label="Choice controls" code="Select · Checkbox · Switch">
			<Field.Group class="w-full">
				<Field.Field>
					<Field.Label>Framework</Field.Label>
					<Select.Root type="single" bind:value={framework}>
						<Select.Trigger class="w-full">{frameworkLabel}</Select.Trigger>
						<Select.Content>
							{#each frameworks as f (f.value)}
								<Select.Item value={f.value} label={f.label}>{f.label}</Select.Item>
							{/each}
						</Select.Content>
					</Select.Root>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<Checkbox id="demo-terms" checked />
					<Field.Label for="demo-terms">Accept terms and conditions</Field.Label>
				</Field.Field>
				<Field.Field orientation="horizontal">
					<Switch id="demo-notify" bind:checked={notify} />
					<Field.Label for="demo-notify">
						Notifications <Badge variant={notify ? 'success' : 'outline'}
							>{notify ? 'on' : 'off'}</Badge
						>
					</Field.Label>
				</Field.Field>
			</Field.Group>
		</Demo>

		<Demo
			label="Card — variants"
			code="<Card.Root variant='glass' interactive>"
			class="lg:col-span-2"
		>
			<div class="grid w-full gap-3 sm:grid-cols-3 lg:grid-cols-5">
				{#each cardVariants as v (v)}
					<Card.Root variant={v} size="sm" interactive>
						<Card.Header>
							<Card.Title>{v}</Card.Title>
							<Card.Description>Hover me</Card.Description>
						</Card.Header>
					</Card.Root>
				{/each}
			</div>
		</Demo>

		<Demo label="Feedback" code="Progress · Skeleton (shimmer) · Spinner · Avatar · Kbd">
			<div class="flex w-full flex-col gap-4">
				<div class="flex items-center gap-3">
					<Progress value={progress} class="h-2" />
					<span class="w-10 text-right font-mono text-xs text-muted-foreground">{progress}%</span>
				</div>
				<div class="flex items-center gap-3">
					<Skeleton class="size-10 rounded-full" />
					<div class="flex flex-1 flex-col gap-2">
						<Skeleton class="h-3 w-3/4" />
						<Skeleton class="h-3 w-1/2" />
					</div>
				</div>
				<div class="flex flex-wrap items-center gap-4">
					<Spinner class="text-primary" />
					<Avatar.Group>
						{#each ['JT', 'AK', 'MR'] as name (name)}
							<Avatar.Root>
								<Avatar.Fallback class="bg-primary-soft text-xs text-primary"
									>{name}</Avatar.Fallback
								>
							</Avatar.Root>
						{/each}
						<Avatar.GroupCount>+4</Avatar.GroupCount>
					</Avatar.Group>
					<Kbd.Group><Kbd.Root>⌘</Kbd.Root><Kbd.Root>K</Kbd.Root></Kbd.Group>
				</div>
			</div>
		</Demo>

		<Demo label="Tabs & Accordion" code="Tabs.Root · Accordion.Root type='single'">
			<div class="flex w-full flex-col gap-4">
				<Tabs.Root value="overview">
					<Tabs.List>
						<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
						<Tabs.Trigger value="metrics">Metrics</Tabs.Trigger>
					</Tabs.List>
					<Tabs.Content
						value="overview"
						class="animate-fade-in pt-2 text-[13px] text-muted-foreground"
					>
						High-level summary lives here.
					</Tabs.Content>
					<Tabs.Content
						value="metrics"
						class="animate-fade-in pt-2 font-mono text-[13px] text-muted-foreground"
					>
						loss: 0.0421 · acc: 0.987
					</Tabs.Content>
				</Tabs.Root>
				<Accordion.Root type="single" class="w-full">
					<Accordion.Item value="a">
						<Accordion.Trigger>How do I rebrand?</Accordion.Trigger>
						<Accordion.Content>Edit --primary-h / --secondary-h in layout.css.</Accordion.Content>
					</Accordion.Item>
					<Accordion.Item value="b">
						<Accordion.Trigger>Does it support dark mode?</Accordion.Trigger>
						<Accordion.Content>Yes — every token has a .dark value.</Accordion.Content>
					</Accordion.Item>
				</Accordion.Root>
			</div>
		</Demo>
	</div>
</Section>
