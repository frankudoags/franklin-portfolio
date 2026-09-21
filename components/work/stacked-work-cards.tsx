'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import type { WorkItem } from 'lib/data';

export default function StackedWorkCards({ items }: { items: WorkItem[] }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ['start start', 'end end'],
	});

	return (
		<div ref={containerRef} className='relative'>
			{items.map((w, i) => (
				<StackCard
					key={`${w.company}-${w.project}`}
					item={w}
					index={i}
					total={items.length}
					progress={scrollYProgress}
				/>
			))}
		</div>
	);
}

function StackCard({
	item: w,
	index,
	total,
	progress,
}: {
	item: WorkItem;
	index: number;
	total: number;
	progress: MotionValue<number>;
}) {
	// Earlier cards shrink a touch more as the stack piles up
	const targetScale = 1 - (total - 1 - index) * 0.035;
	const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
	// Cards dim slightly as the next one slides over — except the last,
	// which nothing ever covers
	const dim = useTransform(
		progress,
		[index / total, Math.min(1, (index + 1) / total)],
		[1, index === total - 1 ? 1 : 0.55]
	);

	return (
		<div
			className='sticky mb-8 last:mb-0'
			style={{ top: 96 + index * 20 }}
		>
			<motion.article
				style={{ scale, transformOrigin: 'center top' }}
				className='overflow-hidden rounded-[28px] border border-franklin-ink/10 bg-white'
			>
				<motion.div style={{ opacity: dim }} className='p-8 md:p-12'>
					<div className='flex flex-wrap items-center gap-3'>
						<span className='rounded-lg bg-franklin-ink px-3 py-1.5 font-display text-base font-bold text-white'>
							{String(index + 1).padStart(2, '0')}
						</span>
						<span className='rounded-full bg-franklin-ink/5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em]'>
							{w.period}
						</span>
						<span className='rounded-full bg-franklin-lime px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-franklin-ink'>
							{w.access}
						</span>
					</div>

					<p className='mt-8 text-xs font-bold uppercase tracking-[0.2em] opacity-50'>
						{w.company}
					</p>
					<h3 className='font-display mt-3 max-w-2xl text-3xl font-medium leading-[105%] tracking-tight md:text-5xl'>
						{w.project}
					</h3>

					<p className='mt-6 max-w-3xl leading-relaxed opacity-80 md:text-lg'>
						{w.description}
					</p>

					<div className='mt-8 rounded-2xl bg-franklin-mist p-6 md:p-7'>
						<p className='text-xs font-bold uppercase tracking-[0.18em] opacity-50'>
							Impact
						</p>
						<p className='mt-2 max-w-3xl font-medium leading-relaxed'>
							{w.impact}
						</p>
					</div>

					<div className='mt-8 flex flex-wrap items-center justify-between gap-4'>
						<div className='flex flex-wrap gap-2'>
							{w.techStack.map((t) => (
								<span
									key={t}
									className='rounded-full border border-franklin-ink/15 px-3.5 py-1.5 text-[13px] font-bold'
								>
									{t}
								</span>
							))}
						</div>
						<div className='flex flex-wrap gap-2'>
							{w.links?.map((l) => (
								<a
									key={l.label}
									href={l.href}
									target='_blank'
									rel='noopener'
									className='rounded-[10px] bg-franklin-lime px-5 py-3 text-[13px] font-bold text-franklin-ink transition-transform hover:scale-[98%]'
								>
									{l.label} ↗
								</a>
							))}
							<a
								href={w.url}
								target='_blank'
								rel='noopener'
								className='rounded-[10px] bg-franklin-ink px-6 py-3.5 text-sm font-semibold text-franklin-lime transition-transform hover:scale-[98%]'
							>
								Open →
							</a>
						</div>
					</div>
				</motion.div>
			</motion.article>
		</div>
	);
}
