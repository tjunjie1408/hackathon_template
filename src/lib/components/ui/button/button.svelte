<script lang="ts" module>
	import { type VariantProps, tv } from 'tailwind-variants';
	import { cn, type WithElementRef } from '$lib/utils.js';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	export const buttonVariants = tv({
		base: "focus-visible:border-ring focus-visible:ring-ring/40 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-3 aria-invalid:ring-3 active:not-aria-[haspopup]:scale-[0.97] [&_svg:not([class*='size-'])]:size-4 group/button relative inline-flex shrink-0 items-center justify-center whitespace-nowrap transition-[color,background-color,background-position,border-color,box-shadow,transform] duration-200 ease-smooth outline-none select-none disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
		variants: {
			variant: {
				/** 主色 — the main call to action */
				default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary-hover',
				/** 副色 — secondary brand action */
				secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary-hover',
				/** Tinted primary — lower emphasis, still on-brand */
				soft: 'bg-primary-soft text-primary hover:bg-primary/20 aria-expanded:bg-primary/20',
				outline:
					'border-border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-accent',
				ghost:
					'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/60 aria-expanded:bg-accent',
				destructive:
					'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
				/** Primary → secondary gradient with a glow on hover — hero CTAs */
				gradient:
					'bg-[linear-gradient(120deg,var(--primary),var(--secondary),var(--primary))] bg-[length:200%_100%] bg-left text-primary-foreground shadow-sm hover:bg-right hover:shadow-glow',
				link: 'text-primary underline-offset-4 hover:underline'
			},
			size: {
				default:
					'h-9 gap-1.5 px-3.5 has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5',
				xs: "h-6 gap-1 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
				sm: "h-8 gap-1 rounded-md px-3 text-[0.8rem] has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2 [&_svg:not([class*='size-'])]:size-3.5",
				lg: 'h-10 gap-2 px-5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4',
				xl: "h-12 gap-2 rounded-xl px-7 text-base [&_svg:not([class*='size-'])]:size-5",
				icon: 'size-9',
				'icon-xs': "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
				'icon-sm': 'size-8 rounded-md',
				'icon-lg': 'size-10'
			}
		},
		defaultVariants: {
			variant: 'default',
			size: 'default'
		}
	});

	export type ButtonVariant = VariantProps<typeof buttonVariants>['variant'];
	export type ButtonSize = VariantProps<typeof buttonVariants>['size'];

	export type ButtonProps = WithElementRef<HTMLButtonAttributes> &
		WithElementRef<HTMLAnchorAttributes> & {
			variant?: ButtonVariant;
			size?: ButtonSize;
			/** Shows a spinner, disables the button and sets aria-busy. */
			loading?: boolean;
		};
</script>

<script lang="ts">
	import Spinner from '$lib/components/ui/spinner/spinner.svelte';

	let {
		class: className,
		variant = 'default',
		size = 'default',
		ref = $bindable(null),
		href = undefined,
		type = 'button',
		disabled,
		loading = false,
		children,
		...restProps
	}: ButtonProps = $props();

	const isDisabled = $derived(disabled || loading);
</script>

{#if href}
	<a
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		href={isDisabled ? undefined : href}
		aria-disabled={isDisabled}
		aria-busy={loading || undefined}
		role={isDisabled ? 'link' : undefined}
		tabindex={isDisabled ? -1 : undefined}
		{...restProps}
	>
		{#if loading}<Spinner data-icon="inline-start" />{/if}
		{@render children?.()}
	</a>
{:else}
	<button
		bind:this={ref}
		data-slot="button"
		class={cn(buttonVariants({ variant, size }), className)}
		{type}
		disabled={isDisabled}
		aria-busy={loading || undefined}
		{...restProps}
	>
		{#if loading}<Spinner data-icon="inline-start" />{/if}
		{@render children?.()}
	</button>
{/if}
