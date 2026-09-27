import type { Attachment } from 'svelte/attachments';

/**
 * Tracks the pointer over an element and exposes it as CSS vars
 * (--mx, --my in px) so any child can paint a cursor-following glow:
 *
 *   <div {@attach spotlight} class="group relative overflow-hidden">
 *     <div class="pointer-events-none absolute inset-0 opacity-0 transition-opacity
 *                 group-hover:opacity-100
 *                 bg-[radial-gradient(300px_circle_at_var(--mx)_var(--my),var(--color-primary-soft),transparent_70%)]"></div>
 *   </div>
 *
 * Lighter than <SpotlightCard> when you just need the vars on an existing element.
 */
export const spotlight: Attachment<HTMLElement> = (node) => {
	const onMove = (e: PointerEvent) => {
		const rect = node.getBoundingClientRect();
		node.style.setProperty('--mx', `${e.clientX - rect.left}px`);
		node.style.setProperty('--my', `${e.clientY - rect.top}px`);
	};
	node.addEventListener('pointermove', onMove);
	return () => node.removeEventListener('pointermove', onMove);
};
