<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';

	export const badgeVariants = tv({
		base: 'h-5.5 gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-xs font-medium transition-colors has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&>svg]:size-3! group/badge inline-flex w-fit shrink-0 items-center justify-center overflow-hidden whitespace-nowrap focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none',
		variants: {
			variant: {
				default: 'bg-primary text-primary-foreground [a]:hover:bg-primary-hover',
				secondary: 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary-hover',
				soft: 'bg-primary-soft text-primary [a]:hover:bg-primary/20',
				'secondary-soft': 'bg-secondary-soft text-secondary [a]:hover:bg-secondary/20',
				success: 'bg-success/12 text-success',
				warning: 'bg-warning/15 text-warning',
				info: 'bg-info/12 text-info',
				destructive:
					'bg-destructive/10 [a]:hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 text-destructive dark:bg-destructive/20',
				outline: 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
				ghost: 'text-muted-foreground hover:bg-muted dark:hover:bg-muted/50',
				link: 'text-primary underline-offset-4 hover:underline'
			}
		},
		defaultVariants: {
			variant: 'default'
		}
	});

	export type BadgeVariant = VariantProps<typeof badgeVariants>['variant'];
</script>

<script lang="ts">
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes } from 'svelte/elements';

	let {
		ref = $bindable(null),
		href,
		class: className,
		variant = 'default',
		dot = false,
		pulse = false,
		children,
		...restProps
	}: WithElementRef<HTMLAnchorAttributes> & {
		variant?: BadgeVariant;
		/** Leading status dot in the current text color. */
		dot?: boolean;
		/** Animate the dot with a ping ("live" indicator). */
		pulse?: boolean;
	} = $props();
</script>

<svelte:element
	this={href ? 'a' : 'span'}
	bind:this={ref}
	data-slot="badge"
	{href}
	class={cn(badgeVariants({ variant }), className)}
	{...restProps}
>
	{#if dot}
		<span class="relative flex size-1.5">
			{#if pulse}
				<span class="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-60"
				></span>
			{/if}
			<span class="relative inline-flex size-1.5 rounded-full bg-current"></span>
		</span>
	{/if}
	{@render children?.()}
</svelte:element>
