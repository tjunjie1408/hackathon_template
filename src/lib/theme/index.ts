/**
 * Brand presets. Each id matches a `[data-theme='…']` block in
 * src/routes/layout.css; `coral` is the :root default. Switch with
 * `setTheme(id)` from mode-watcher — it persists and applies before paint.
 *
 * To add a preset: add a CSS block with --primary-h/-c and --secondary-h/-c,
 * then add an entry here (swatches are only used by the picker UI).
 */
export const BRAND_PRESETS = [
	{ id: '', label: 'Coral', swatch: ['oklch(0.62 0.19 35)', 'oklch(0.55 0.15 268)'] },
	{ id: 'violet', label: 'Violet', swatch: ['oklch(0.6 0.2 292)', 'oklch(0.58 0.13 200)'] },
	{ id: 'emerald', label: 'Emerald', swatch: ['oklch(0.6 0.15 158)', 'oklch(0.55 0.14 250)'] },
	{ id: 'ocean', label: 'Ocean', swatch: ['oklch(0.58 0.18 250)', 'oklch(0.6 0.12 190)'] },
	{ id: 'rose', label: 'Rose', swatch: ['oklch(0.6 0.2 5)', 'oklch(0.55 0.14 320)'] },
	{ id: 'amber', label: 'Amber', swatch: ['oklch(0.7 0.16 62)', 'oklch(0.58 0.16 25)'] },
	{ id: 'mono', label: 'Mono', swatch: ['oklch(0.45 0 0)', 'oklch(0.7 0.02 270)'] }
] as const;

export type BrandId = (typeof BRAND_PRESETS)[number]['id'];

let probeCtx: CanvasRenderingContext2D | null = null;

/**
 * Resolve any CSS color — including `var(--primary)` or `color-mix(...)` — to
 * sRGB bytes. Canvas/WebGL can't read CSS variables, so effects that draw
 * (ClickSpark, Aurora) call this. Browser-only.
 */
export function toRgb(color: string, scope: Element = document.documentElement) {
	let resolved = color;
	if (color.includes('var(')) {
		const probe = document.createElement('span');
		probe.style.color = color;
		probe.style.display = 'none';
		scope.appendChild(probe);
		resolved = getComputedStyle(probe).color;
		probe.remove();
	}
	probeCtx ??= document.createElement('canvas').getContext('2d', { willReadFrequently: true });
	if (!probeCtx) return { r: 0, g: 0, b: 0, a: 1 };
	probeCtx.clearRect(0, 0, 1, 1);
	probeCtx.fillStyle = '#000';
	probeCtx.fillStyle = resolved;
	probeCtx.fillRect(0, 0, 1, 1);
	const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;
	return { r, g, b, a: a / 255 };
}

export function toHex(color: string, scope?: Element) {
	const { r, g, b } = toRgb(color, scope);
	return '#' + [r, g, b].map((n) => n.toString(16).padStart(2, '0')).join('');
}

/**
 * Run `cb` whenever dark mode or the brand preset changes (i.e. when <html>'s
 * class or data-theme changes). Returns a cleanup function — call it from an
 * $effect so canvas effects can re-read their colors.
 */
export function onThemeChange(cb: () => void) {
	const observer = new MutationObserver(cb);
	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ['class', 'data-theme', 'style']
	});
	return () => observer.disconnect();
}
