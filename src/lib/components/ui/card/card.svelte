<script lang="ts" module>
	import { tv, type VariantProps } from 'tailwind-variants';

	export const cardVariants = tv({
		base: 'bg-card text-card-foreground gap-(--card-spacing) overflow-hidden rounded-xl py-(--card-spacing) text-sm [--card-spacing:--spacing(5)] has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(3.5)] data-[size=sm]:has-data-[slot=card-footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl group/card flex flex-col',
		variants: {
			variant: {
				default: 'ring-1 ring-foreground/8 shadow-xs',
				outline: 'ring-1 ring-border bg-transparent',
				elevated: 'ring-1 ring-foreground/5 shadow-lg',
				glass: 'glass ring-1 ring-foreground/10',
				/** Brand-gradient hairline border */
				gradient:
					'border border-transparent [background:linear-gradient(var(--card),var(--card))_padding-box,linear-gradient(135deg,var(--primary),var(--secondary))_border-box]'
			},
			/** Lift + shadow on hover; use for clickable cards. */
			interactive: {
				true: 'hover-lift cursor-pointer hover:ring-primary/30',
				false: ''
			}
		},
		defaultVariants: { variant: 'default', interactive: false }
	});

	export type CardVariant = VariantProps<typeof cardVariants>['variant'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		class: className,
		children,
		size = 'default',
		variant = 'default',
		interactive = false,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> & {
		size?: 'default' | 'sm';
		variant?: CardVariant;
		interactive?: boolean;
	} = $props();
</script>

<div
	bind:this={ref}
	data-slot="card"
	data-size={size}
	class={cn(cardVariants({ variant, interactive }), className)}
	{...restProps}
>
	{@render children?.()}
</div>
