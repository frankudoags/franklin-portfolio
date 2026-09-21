import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const mustGet = <T extends Element>(
	container: Element | null | undefined,
	selector: string
): T => {
	const el = container?.querySelector<T>(selector);
	if (!el) throw new Error(`Missing element: ${selector}`);
	return el;
};

declare global {
	interface Window {
		__lenis?: Lenis;
	}
}

export function initLenisWithGSAP(): Lenis | undefined {
	if (typeof window === 'undefined') return;

	if (window.__lenis) return window.__lenis;

	gsap.registerPlugin(ScrollTrigger);

	const lenis = new Lenis({
		lerp: 0.1,
		gestureOrientation: 'vertical',
		smoothWheel: true,
		touchMultiplier: 1,
	});

	lenis.on('scroll', ScrollTrigger.update);

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);

	window.__lenis = lenis;
	return lenis;
}
