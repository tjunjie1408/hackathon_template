<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import { Toaster } from '$lib/components/ui/sonner';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import ThemePicker from '$lib/components/theme-picker.svelte';
	import { cn } from '$lib/utils';
	import SunIcon from '@lucide/svelte/icons/sun';
	import MoonIcon from '@lucide/svelte/icons/moon';
	import MenuIcon from '@lucide/svelte/icons/menu';

	let { data, children } = $props();

	const nav = [
		{ href: resolve('/'), label: 'Home' },
		{ href: resolve('/components'), label: 'Components' },
		{ href: resolve('/demo/better-auth'), label: 'Auth demo' }
	];

	const isActive = (href: string) =>
		href === resolve('/') ? page.url.pathname === href : page.url.pathname.startsWith(href);

	let mobileOpen = $state(false);
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ModeWatcher />
<Toaster richColors={false} position="bottom-right" />

<Tooltip.Provider delayDuration={200}>
	<div class="min-h-screen">
		<header class="sticky top-0 z-40 border-b border-border/70 glass">
			<div class="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-5">
				<a href={resolve('/')} class="group flex items-center gap-2 font-semibold tracking-tight">
					<span
						class="grid size-7 place-items-center rounded-lg bg-brand-gradient text-[13px] text-primary-foreground shadow-sm transition-transform duration-300 ease-spring group-hover:scale-110 group-hover:rotate-6"
					>
						◆
					</span>
					<span class="text-[15px]">starter</span>
				</a>

				<nav class="hidden items-center gap-1 rounded-full bg-muted/60 p-1 text-[13px] md:flex">
					{#each nav as item (item.href)}
						<a
							href={item.href}
							aria-current={isActive(item.href) ? 'page' : undefined}
							class={cn(
								'rounded-full px-3.5 py-1.5 font-medium text-muted-foreground transition-all duration-200 ease-smooth hover:text-foreground',
								isActive(item.href) && 'bg-card text-foreground shadow-sm'
							)}
						>
							{item.label}
						</a>
					{/each}
				</nav>

				<div class="flex items-center gap-1">
					<ThemePicker />
					<Button variant="ghost" size="icon-sm" onclick={toggleMode} aria-label="Toggle dark mode">
						<SunIcon
							class="scale-100 rotate-0 transition-transform duration-500 ease-spring dark:scale-0 dark:-rotate-90"
						/>
						<MoonIcon
							class="absolute scale-0 rotate-90 transition-transform duration-500 ease-spring dark:scale-100 dark:rotate-0"
						/>
					</Button>
					<div class="mx-1 hidden h-5 w-px bg-border sm:block"></div>
					{#if data.user}
						<span class="hidden max-w-40 truncate text-[13px] text-muted-foreground lg:inline">
							{data.user.email}
						</span>
						<Button
							href={resolve('/demo/better-auth')}
							variant="outline"
							size="sm"
							class="hidden sm:inline-flex"
						>
							Account
						</Button>
					{:else}
						<Button
							href={resolve('/demo/better-auth/login')}
							size="sm"
							class="hidden sm:inline-flex"
						>
							Sign in
						</Button>
					{/if}

					<Sheet.Root bind:open={mobileOpen}>
						<Sheet.Trigger
							class={cn(buttonVariants({ variant: 'ghost', size: 'icon-sm' }), 'md:hidden')}
							aria-label="Open menu"
						>
							<MenuIcon />
						</Sheet.Trigger>
						<Sheet.Content side="right" class="w-72">
							<Sheet.Header>
								<Sheet.Title>Menu</Sheet.Title>
							</Sheet.Header>
							<nav class="flex flex-col gap-1 px-4">
								{#each nav as item (item.href)}
									<a
										href={item.href}
										onclick={() => (mobileOpen = false)}
										class={cn(
											'rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground',
											isActive(item.href) && 'bg-primary-soft text-primary'
										)}
									>
										{item.label}
									</a>
								{/each}
							</nav>
							<Sheet.Footer>
								{#if data.user}
									<Button href={resolve('/demo/better-auth')} variant="outline">Account</Button>
								{:else}
									<Button href={resolve('/demo/better-auth/login')}>Sign in</Button>
								{/if}
							</Sheet.Footer>
						</Sheet.Content>
					</Sheet.Root>
				</div>
			</div>
		</header>

		<main class="mx-auto max-w-6xl px-5 py-10">
			{@render children()}
		</main>
	</div>
</Tooltip.Provider>
