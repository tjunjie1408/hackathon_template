<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Badge } from '$lib/components/ui/badge';
	import { reveal } from '$lib/attachments/reveal';
	import { spotlight } from '$lib/attachments/spotlight';
	import ShinyText from '$lib/components/svelte-bits/ShinyText.svelte';
	import GradientText from '$lib/components/svelte-bits/GradientText.svelte';
	import BlurText from '$lib/components/svelte-bits/BlurText.svelte';
	import CountUp from '$lib/components/svelte-bits/CountUp.svelte';
	import RotatingText from '$lib/components/svelte-bits/RotatingText.svelte';
	import DecryptedText from '$lib/components/svelte-bits/DecryptedText.svelte';
	import SpotlightCard from '$lib/components/svelte-bits/SpotlightCard.svelte';
	import StarBorder from '$lib/components/svelte-bits/StarBorder.svelte';
	import ClickSpark from '$lib/components/svelte-bits/ClickSpark.svelte';
	import Magnet from '$lib/components/svelte-bits/Magnet.svelte';
	import GlareHover from '$lib/components/svelte-bits/GlareHover.svelte';
	import TiltedCard from '$lib/components/svelte-bits/TiltedCard.svelte';
	import BorderGlow from '$lib/components/svelte-bits/BorderGlow.svelte';
	import Aurora from '$lib/components/svelte-bits/Aurora.svelte';
	import RotateCcwIcon from '@lucide/svelte/icons/rotate-ccw';
	import ZapIcon from '@lucide/svelte/icons/zap';
	import Section from './Section.svelte';
	import Demo from './Demo.svelte';

	let blurKey = $state(0);

	// Inline gradient image so the demo has no external asset.
	const tiltImage =
		'data:image/svg+xml;utf8,' +
		encodeURIComponent(
			`<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff7a59"/><stop offset="1" stop-color="#5b5bd6"/></linearGradient></defs><rect width="400" height="400" fill="url(#g)"/><circle cx="300" cy="100" r="70" fill="#fff" fill-opacity=".18"/><circle cx="90" cy="320" r="110" fill="#fff" fill-opacity=".1"/></svg>`
		);
</script>

<Section
	id="effects"
	title="Effects"
	description="Svelte Bits (sveltebits.xyz) components, re-themed to follow the brand tokens, plus two zero-dependency attachments."
>
	<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
		<Demo
			label="Aurora (WebGL background)"
			code="<Aurora /> — ogl; pauses off-screen"
			class="sm:col-span-2 lg:col-span-3"
		>
			<div class="relative h-56 w-full overflow-hidden rounded-lg bg-foreground dark:bg-background">
				<Aurora class="absolute inset-0" blend={0.6} amplitude={1.1} />
				<div class="relative flex h-full flex-col items-center justify-center gap-2 text-center">
					<h3 class="text-3xl font-semibold tracking-tight text-background dark:text-foreground">
						Build something bright
					</h3>
					<p class="text-sm text-background/70 dark:text-foreground/70">
						Colors follow the active brand preset.
					</p>
				</div>
			</div>
		</Demo>

		<Demo label="GradientText" code="<GradientText>…</GradientText>">
			<span class="text-3xl font-semibold tracking-tight"
				><GradientText>Gradient</GradientText></span
			>
			<GradientText showBorder class="text-sm">with border</GradientText>
		</Demo>

		<Demo label="ShinyText" code={"<ShinyText text='…' speed={3} />"}>
			<ShinyText text="Shimmering headline" speed={3} class="text-2xl font-semibold" />
		</Demo>

		<Demo label="RotatingText" code={'<RotatingText texts={[…]} />'}>
			<div class="flex items-center gap-2 text-2xl font-semibold">
				Build
				<RotatingText
					texts={['faster', 'cleaner', 'together']}
					mainClassName="overflow-hidden rounded-lg bg-primary px-2.5 py-0.5 text-primary-foreground"
					staggerDuration={0.025}
					splitLevelClassName="overflow-hidden"
					rotationInterval={2200}
				/>
			</div>
		</Demo>

		<Demo label="BlurText" code="<BlurText text='…' animateBy='words' />">
			<div class="flex w-full items-center justify-between gap-2">
				{#key blurKey}
					<BlurText
						text="Words drift into focus"
						animateBy="words"
						delay={120}
						class="text-xl font-semibold"
					/>
				{/key}
				<Button variant="ghost" size="icon-sm" onclick={() => blurKey++} aria-label="Replay">
					<RotateCcwIcon />
				</Button>
			</div>
		</Demo>

		<Demo label="CountUp" code={"<CountUp to={12840} separator=',' />"}>
			<div class="flex gap-8">
				<div>
					<div class="text-3xl font-semibold"><CountUp to={12840} separator="," /></div>
					<div class="text-xs text-muted-foreground">users</div>
				</div>
				<div>
					<div class="text-3xl font-semibold"><CountUp to={99.9} duration={2.5} />%</div>
					<div class="text-xs text-muted-foreground">uptime</div>
				</div>
			</div>
		</Demo>

		<Demo label="DecryptedText" code="<DecryptedText text='…' animateOn='hover' />">
			<DecryptedText
				text="Hover to decrypt"
				animateOn="hover"
				speed={40}
				maxIterations={14}
				class="font-mono text-lg"
				encryptedClassName="font-mono text-lg text-primary"
			/>
		</Demo>

		<Demo label="SpotlightCard" code="<SpotlightCard>…</SpotlightCard>">
			<SpotlightCard class="w-full">
				<ZapIcon class="mb-3 size-5 text-primary" />
				<div class="font-medium">Cursor spotlight</div>
				<p class="mt-1 text-[13px] text-muted-foreground">Move the pointer over this card.</p>
			</SpotlightCard>
		</Demo>

		<Demo label="BorderGlow" code="<BorderGlow>…</BorderGlow>">
			<BorderGlow class="w-full">
				<div class="p-6">
					<div class="font-medium">Edge glow</div>
					<p class="mt-1 text-[13px] text-muted-foreground">Approach the border.</p>
				</div>
			</BorderGlow>
		</Demo>

		<Demo label="GlareHover" code="<GlareHover>…</GlareHover>">
			<GlareHover height="120px">
				<span class="font-medium">Hover for a glare sweep</span>
			</GlareHover>
		</Demo>

		<Demo label="StarBorder & Magnet" code={'<StarBorder> · <Magnet padding={60}>'}>
			<StarBorder speed="5s">Star border</StarBorder>
			<Magnet padding={60} magnetStrength={3}>
				<Button variant="gradient">Magnetic</Button>
			</Magnet>
		</Demo>

		<Demo label="ClickSpark" code="<ClickSpark>…</ClickSpark>">
			<ClickSpark sparkRadius={22} sparkCount={10} class="rounded-lg">
				<div
					class="grid h-28 w-full place-items-center rounded-lg bg-muted text-sm text-muted-foreground select-none"
				>
					Click anywhere here
				</div>
			</ClickSpark>
		</Demo>

		<Demo label="TiltedCard" code="<TiltedCard imageSrc='…' />">
			<TiltedCard
				imageSrc={tiltImage}
				altText="Gradient artwork"
				captionText="3D tilt with springy caption"
				containerHeight="200px"
				imageHeight="170px"
				imageWidth="170px"
				rotateAmplitude={12}
				scaleOnHover={1.08}
			/>
		</Demo>

		<Demo label={'{@attach spotlight}'} code="Exposes --mx / --my for any custom glow">
			<div
				{@attach spotlight}
				class="group relative w-full overflow-hidden rounded-lg bg-muted p-6 text-sm text-muted-foreground"
			>
				<div
					class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
					style="background: radial-gradient(220px circle at var(--mx) var(--my), var(--color-primary-soft), transparent 70%);"
				></div>
				<span class="relative">Attachment-based spotlight</span>
			</div>
		</Demo>

		<Demo
			label={'{@attach reveal()}'}
			code={'reveal({ delay, y, scale, blur, repeat })'}
			class="sm:col-span-2"
		>
			<div class="grid w-full grid-cols-3 gap-3">
				{#each [0, 120, 240] as delay (delay)}
					<div
						{@attach reveal({ delay, y: 32, blur: 6, repeat: true })}
						class="grid h-20 place-items-center rounded-lg bg-primary-soft text-sm text-primary"
					>
						<Badge variant="soft">+{delay}ms</Badge>
					</div>
				{/each}
			</div>
			<p class="text-[13px] text-muted-foreground">
				Scroll this out of view and back — `repeat: true` replays it.
			</p>
		</Demo>
	</div>
</Section>
