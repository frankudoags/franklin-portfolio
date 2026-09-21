'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function RevealManager() {
	useGSAP(() => {
		const els = gsap.utils.toArray<HTMLElement>('[data-reveal]');
		if (!els.length) return;

		gsap.set(els, { y: 28, opacity: 0 });
		ScrollTrigger.batch(els, {
			start: 'top 90%',
			once: true,
			onEnter: (batch) =>
				gsap.to(batch, {
					y: 0,
					opacity: 1,
					duration: 0.7,
					ease: 'power3.out',
					stagger: 0.08,
					overwrite: true,
				}),
		});
	});

	return null;
}
