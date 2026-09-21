'use client';

import Link from 'next/link';
import { useFlipCard } from 'lib/animations';
import { Button } from 'components/ui/button';
import { cn } from 'lib/utils';

export type FlipCardData = {
	title: string;
	subtitle?: string;
	description?: string;
	tags: string[];
	image?: string;
	href: string;
	cta?: string;
	badge?: string;
	links?: Array<{ label: string; href: string }>;
};

const solidTones = [
	'bg-franklin-pine',
	'bg-franklin-ink',
	'bg-franklin-pine-deep',
	'bg-franklin-lilac',
];

export default function FlipCard({
	data,
	className,
	index = 0,
}: {
	data: FlipCardData;
	className?: string;
	index?: number;
}) {
	const { cardRef } = useFlipCard();
	const tone = solidTones[index % solidTones.length];

	return (
		<div
			ref={cardRef}
			tabIndex={0}
			className={cn(
				'relative h-[420px] w-full cursor-pointer select-none rounded-[24px] focus:outline-none',
				className
			)}
		>
			<div className='absolute h-full w-full rounded-[24px] bg-franklin-pine opacity-10' />
			<div id='inner' className='h-full w-full'>
				{/* FRONT */}
				<div
					id='front'
					className='absolute inset-0 flex items-end overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white dark:border-white/10 dark:bg-white/5'
				>
					{data.image ? (
						// eslint-disable-next-line @next/next/no-img-element
						<img
							src={data.image}
							alt={data.title}
							className='absolute inset-0 h-full w-full object-cover'
						/>
					) : (
						<div className={cn('absolute inset-0', tone)}>
							<span className='font-display absolute right-4 top-2 text-[120px] font-medium leading-none text-white/10'>
								{data.title.charAt(0)}
							</span>
						</div>
					)}
					<div className='absolute inset-0 rounded-[24px] bg-gradient-to-b from-transparent via-transparent to-black/55' />
					<div className='relative z-[1] w-full p-5'>
						{data.badge && (
							<span className='mb-2 inline-flex rounded-full bg-franklin-lime px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white'>
								{data.badge}
							</span>
						)}
						{data.subtitle && (
							<p className='text-[13px] font-bold uppercase tracking-[0.14em] text-white/80'>
								{data.subtitle}
							</p>
						)}
						<h3 className='font-display mt-1 text-2xl font-semibold leading-tight text-white'>
							{data.title}
						</h3>
						<div className='mt-3 flex flex-wrap gap-1.5'>
							{data.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className='rounded-full bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur'
								>
									{tag}
								</span>
							))}
						</div>
						<p className='mt-3 text-[13px] font-semibold text-white/70'>
							Hover to flip →
						</p>
					</div>
				</div>

				{/* BACK */}
				<div
					id='back'
					className='absolute top-0 z-50 flex w-full items-start gap-4 text-franklin-bone'
				>
					<div className='z-[50] flex w-full items-center justify-center'>
						<div className='flex h-[420px] w-full flex-col justify-between rounded-[16px] bg-franklin-pine p-6 text-franklin-bone'>
							<div>
								<p className='text-[11px] font-bold uppercase tracking-[0.18em] text-franklin-lime'>
									{data.subtitle || data.badge || 'Featured'}
								</p>
								<h3 className='font-display mt-2 text-xl font-semibold'>
									{data.title}
								</h3>
								{data.description && (
									<p className='mt-3 line-clamp-5 text-sm leading-relaxed text-white/85'>
										{data.description}
									</p>
								)}
								<div className='mt-4 flex flex-wrap gap-1.5'>
									{data.tags.map((tag) => (
										<span
											key={tag}
											className='rounded-full border border-white/20 px-2.5 py-1 text-[11px] font-semibold'
										>
											{tag}
										</span>
									))}
								</div>
							</div>
							<Button
								variant='lime'
								className='mt-5 w-full'
								onClick={() => window.open(data.href, '_blank')}
							>
								{data.cta || 'Open →'}
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export function StaticCard({
	data,
	index = 0,
}: {
	data: FlipCardData;
	index?: number;
}) {
	return (
		<Link
			href={data.href}
			target={data.href.startsWith('http') ? '_blank' : undefined}
			className='group flex h-full flex-col overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(25,28,32,0.35)] dark:border-white/10 dark:bg-white/5'
		>
			<div className={cn('relative h-36 overflow-hidden bg-franklin-mist')}>
				<span className='font-display absolute bottom-1 right-4 text-[80px] font-medium leading-none text-franklin-ink/10'>
					{data.title.charAt(0)}
				</span>
				<div className='absolute bottom-3 left-4 right-4 flex flex-wrap gap-1.5'>
					{data.tags.slice(0, 3).map((tag) => (
						<span
							key={tag}
							className='rounded-full border border-franklin-ink/15 bg-white px-2.5 py-1 text-[11px] font-bold text-franklin-ink'
						>
							{tag}
						</span>
					))}
				</div>
				{data.badge && (
					<span className='absolute left-4 top-3 rounded-full bg-franklin-lime px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white'>
						{data.badge}
					</span>
				)}
			</div>
			<div className='flex flex-1 flex-col p-5'>
				{data.subtitle && (
					<p className='text-[11px] font-bold uppercase tracking-[0.16em] opacity-60'>
						{data.subtitle}
					</p>
				)}
				<h3 className='font-display mt-1 text-xl font-semibold leading-tight transition-colors group-hover:text-franklin-pine dark:group-hover:text-franklin-lime'>
					{data.title}
				</h3>
				{data.description && (
					<p className='mt-2 line-clamp-3 text-sm leading-relaxed opacity-75'>
						{data.description}
					</p>
				)}
				<span className='mt-4 text-sm font-bold text-franklin-pine dark:text-franklin-lime'>
					{data.cta || 'Read more →'}
				</span>
				{data.links && data.links.length > 0 && (
					<div className='mt-3 flex flex-wrap gap-2 border-t border-franklin-ink/10 pt-3 dark:border-white/10'>
						{data.links.map((l) => (
							<span
								key={l.label}
								role='link'
								tabIndex={0}
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									window.open(l.href, '_blank', 'noopener');
								}}
								onKeyDown={(e) => {
									if (e.key === 'Enter') window.open(l.href, '_blank', 'noopener');
								}}
								className='cursor-pointer rounded-full bg-franklin-ink px-3 py-1.5 text-[11px] font-bold text-franklin-lime transition-transform hover:scale-95 dark:bg-franklin-lime dark:text-white'
							>
								{l.label} ↗
							</span>
						))}
					</div>
				)}
			</div>
		</Link>
	);
}
