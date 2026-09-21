'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useRef, type RefObject } from 'react';

/**
 * Auto-cycling fanned card deck (Varsi blog-hero style).
 * Cards start fanned out, collapse into a stack, then cycle
 * positions every 4s. Hover pauses the shuffle.
 * Renders a static fan when there are fewer than 4 cards.
 */
export default function ShuffleDeck({ children }: { children: React.ReactNode[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const pausedRef = useRef(false);
	const items = children.filter(Boolean);

	useGSAP(
		() => {
			const container = containerRef.current;
			if (!container || items.length < 2) return;
			const cards = container.querySelectorAll(':scope > .deck-card');
			if (cards.length < 2) return;

			// Build one slot per card: back = small/faint, front = big/solid
			const n = cards.length;
			const slots = Array.from({ length: n }, (_, i) => {
				const t = n === 1 ? 1 : i / (n - 1);
				return {
					scale: 0.8 + 0.25 * t,
					top: -64 + 128 * t,
					zIndex: 10 + Math.round(20 * t),
					opacity: 0.4 + 0.6 * t,
				};
			});

			gsap.set(cards, {
				position: 'absolute',
				left: '50%',
				xPercent: -50,
				top: 0,
				transformOrigin: 'center center',
			});

			const initialTl = gsap.timeline({ delay: 0.5 });
			cards.forEach((card, index) => {
				const pos = slots[index % slots.length];
				initialTl.to(
					card,
					{
						scale: pos.scale,
						top: pos.top,
						zIndex: pos.zIndex,
						opacity: pos.opacity,
						rotation: 0,
						duration: 1,
						ease: 'power2.inOut',
					},
					index * 0.1
				);
			});

			const liveSlots = [...slots];
			const shuffleCards = () => {
				if (pausedRef.current) return;
				// rotate slot order so every card advances one position
				const first = liveSlots.shift();
				if (first) liveSlots.push(first);
				const tl = gsap.timeline();
				cards.forEach((card, index) => {
					const nextPos = liveSlots[index % liveSlots.length];
					tl.to(
						card,
						{
							scale: nextPos.scale,
							top: nextPos.top,
							zIndex: nextPos.zIndex,
							opacity: nextPos.opacity,
							rotation: 0,
							duration: 0.8,
							ease: 'power2.inOut',
						},
						0
					);
				});
			};

			let shuffleInterval: ReturnType<typeof setInterval>;
			const startTimeout = setTimeout(() => {
				shuffleCards();
				shuffleInterval = setInterval(shuffleCards, 4000);
			}, 4000);

			return () => {
				clearTimeout(startTimeout);
				if (shuffleInterval) clearInterval(shuffleInterval);
				initialTl.kill();
			};
		},
		{ scope: containerRef as RefObject<HTMLElement | null> }
	);

	if (items.length === 0) return null;

	// Fan spread + static fallback when there is a single card
	const fanAngle = (i: number) => (i - (Math.min(items.length, 4) - 1) / 2) * 12;

	return (
		<div
			ref={containerRef}
			onMouseEnter={() => (pausedRef.current = true)}
			onMouseLeave={() => (pausedRef.current = false)}
			className='relative mx-auto flex h-[480px] w-full max-w-[480px] items-start justify-center md:h-[520px]'
		>
			{items.slice(0, 4).map((child, i) => (
				<div
					key={i}
					className='deck-card w-full max-w-[420px]'
					style={{
						position: 'absolute',
						top: 0,
						left: '50%',
						transform: `translateX(-50%) rotate(${fanAngle(i)}deg)`,
						opacity: 0.9,
						zIndex: 10 + i,
					}}
				>
					{child}
				</div>
			))}
		</div>
	);
}

export function DeckCard({
	badge,
	title,
	description,
	tags,
	href,
	index = 0,
}: {
	badge?: string;
	title: string;
	description?: string;
	tags?: string[];
	href: string;
	index?: number;
}) {
	const lightFace = 0;
	return (
		<a
			href={href}
			target={href.startsWith('http') ? '_blank' : undefined}
			className={`block h-[380px] overflow-hidden rounded-[24px] p-7 md:h-[430px] ${
				lightFace
					? 'border border-franklin-ink/10 bg-white text-franklin-ink'
					: 'bg-franklin-ink text-white'
			}`}
		>
			{badge && (
				<span className='inline-flex rounded-full bg-franklin-lime px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white'>
					{badge}
				</span>
			)}
			<h3 className='font-display mt-4 line-clamp-3 text-3xl font-medium leading-[105%] tracking-tight'>
				{title}
			</h3>
			{description && (
				<p className='mt-3 line-clamp-3 text-sm leading-relaxed opacity-80'>
					{description}
				</p>
			)}
			{tags && tags.length > 0 && (
				<div className='mt-4 flex flex-wrap gap-1.5'>
					{tags.slice(0, 3).map((t) => (
						<span
							key={t}
							className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${lightFace ? 'bg-franklin-ink/5' : 'bg-white/15'}`}
						>
							{t}
						</span>
					))}
				</div>
			)}
			<span
				className={`mt-5 inline-flex text-sm font-bold ${lightFace ? 'text-franklin-ink underline underline-offset-4' : 'text-franklin-lime'}`}
			>
				Open →
			</span>
		</a>
	);
}
