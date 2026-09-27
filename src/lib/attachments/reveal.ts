import type { Attachment } from 'svelte/attachments';
import { prefersReducedMotion } from 'svelte/motion';

export interface RevealOptions {
	/** Delay before the transition starts, in ms. */
	delay?: number;
	/** Starting vertical offset, in px (negative = from above). */
	y?: number;
	/** Starting scale, e.g. 0.95. */
	scale?: number;
	/** Starting blur, in px. */
	blur?: number;
	/**
	 * How far past the bottom edge the element must scroll before revealing, as
	 * a CSS margin. A margin (not a visibility ratio) so very tall sections
	 * still trigger.
	 */
	offset?: string;
	/** Hide again when scrolled out, so it replays. Default: reveal once. */
	repeat?: boolean;
}

/**
 * Scroll-triggered entrance, zero dependencies:
 *
 *   <section {@attach reveal()}>…</section>
 *   <div {@attach reveal({ delay: 120, y: 32, blur: 6 })}>…</div>
 *
 * Content already on screen when the page loads is left alone (no flash on
 * SSR hydration) — use the CSS `animate-fade-up` utilities for above-the-fold
 * entrances instead. Styles live in layout.css under [data-reveal].
 */
export function reveal(options: RevealOptions = {}): Attachment<HTMLElement> {
	return (node) => {
		if (prefersReducedMotion.current) return;
		const { delay = 0, y = 24, scale = 1, blur = 0, offset = '-10%', repeat = false } = options;

		const rect = node.getBoundingClientRect();
		if (rect.top < window.innerHeight && rect.bottom > 0 && !repeat) return;

		node.style.setProperty('--reveal-delay', `${delay}ms`);
		node.style.setProperty('--reveal-y', `${y}px`);
		node.style.setProperty('--reveal-scale', String(scale));
		node.style.setProperty('--reveal-blur', `${blur}px`);
		node.dataset.reveal = 'hidden';

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					node.dataset.reveal = 'shown';
					if (!repeat) observer.disconnect();
				} else if (repeat) {
					node.dataset.reveal = 'hidden';
				}
			},
			{ rootMargin: `0px 0px ${offset} 0px` }
		);
		observer.observe(node);

		return () => {
			observer.disconnect();
			delete node.dataset.reveal;
		};
	};
}
