'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { type RefObject, useRef } from 'react';
import { mustGet } from 'lib/utils';

gsap.registerPlugin(SplitText, ScrollTrigger);

export function useCharacterAnimation({
	textRef,
	enabled = true,
	delay = 0,
}: {
	textRef: RefObject<HTMLElement | null>;
	enabled?: boolean;
	delay?: number;
}) {
	useGSAP(
		() => {
			if (!enabled) return;
			const textEl = textRef.current;
			if (!textEl) return;

			gsap.set(textEl, { opacity: 0 });

			const splitText = new SplitText(textEl, {
				type: 'words,lines',
				wordsClass: 'word-animate',
				linesClass: 'line-animate',
			});

			splitText.words.forEach((word) => {
				const wrapper = document.createElement('div');
				wrapper.style.overflow = 'hidden';
				wrapper.style.display = 'inline-block';
				if (word.parentNode) {
					word.parentNode.insertBefore(wrapper, word);
					wrapper.appendChild(word);
				}
			});

			gsap.set(textEl, { opacity: 1 });
			gsap.set(splitText.words, { y: '100%' });

			gsap.to(splitText.words, {
				y: 0,
				duration: 0.8,
				ease: 'back.out(1.7)',
				stagger: 0.06,
				delay,
			});

			return () => {
				splitText.revert();
			};
		},
		[enabled, delay]
	);
}

export function useScrollReveal<T extends HTMLElement>({
	selector = '[data-reveal]',
	y = 28,
	stagger = 0.08,
}: {
	selector?: string;
	y?: number;
	stagger?: number;
} = {}) {
	const scope = useRef<T>(null);

	useGSAP(
		() => {
			if (!scope.current) return;
			const els = scope.current.querySelectorAll(selector);
			if (!els.length) return;

			gsap.set(els, { y, opacity: 0 });
			ScrollTrigger.batch(els, {
				start: 'top 88%',
				onEnter: (batch) =>
					gsap.to(batch, {
						y: 0,
						opacity: 1,
						duration: 0.7,
						ease: 'power3.out',
						stagger,
						overwrite: true,
					}),
			});
		},
		{ scope: scope as RefObject<HTMLElement | null> }
	);

	return scope;
}

export function useFlipCard() {
	const cardRef = useRef<HTMLDivElement>(null);

	useGSAP(() => {
		const card = cardRef.current;
		if (!card) return;

		const inner = mustGet<HTMLDivElement>(card, '#inner');
		const front = mustGet<HTMLDivElement>(card, '#front');
		const back = mustGet<HTMLDivElement>(card, '#back');

		gsap.set(card, { perspective: 1200 });
		gsap.set(inner, {
			transformStyle: 'preserve-3d',
			willChange: 'transform',
			rotateY: 0,
		});
		gsap.set([front, back], { backfaceVisibility: 'hidden' });
		gsap.set(back, { rotateY: 180, opacity: 1 });

		const tl = gsap.timeline({ paused: true });
		tl.to(
			inner,
			{
				rotateY: 180,
				transformOrigin: 'center center',
				rotate: 2,
				duration: 0.6,
				ease: 'power3.out',
			},
			0
		);

		const enter = () => tl.timeScale(1).play();
		const leave = () => tl.timeScale(1.5).reverse();

		card.addEventListener('mouseenter', enter);
		card.addEventListener('mouseleave', leave);
		card.addEventListener('focusin', enter);
		card.addEventListener('focusout', leave);

		return () => {
			card.removeEventListener('mouseenter', enter);
			card.removeEventListener('mouseleave', leave);
			card.removeEventListener('focusin', enter);
			card.removeEventListener('focusout', leave);
			tl.kill();
		};
	});

	return { cardRef };
}
