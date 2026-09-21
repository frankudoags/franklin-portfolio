'use client';

import { useEffect, useState } from 'react';
import type { Heading } from 'lib/blog/toc';
import { cn } from 'lib/utils';

export function BlogToc({ headings }: { headings: Heading[] }) {
	const [active, setActive] = useState<string>('');

	useEffect(() => {
		if (!headings.length) return;
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) setActive(entry.target.id);
				}
			},
			{ rootMargin: '-20% 0% -60% 0%' }
		);
		for (const h of headings) {
			const el = document.getElementById(h.id);
			if (el) observer.observe(el);
		}
		return () => observer.disconnect();
	}, [headings]);

	function scrollToId(id: string) {
		const el = document.getElementById(id);
		if (!el) return;
		// Prefer Lenis smooth scroll (with offset for the fixed nav),
		// fall back to native smooth scrolling.
		const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o?: object) => void } }).__lenis;
		if (lenis) lenis.scrollTo(el, { offset: -110, duration: 1.2 });
		else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}

	if (!headings.length) return null;

	return (
		<aside className='rounded-2xl border border-franklin-ink/10 bg-white p-6'>
			<p className='text-xs font-bold uppercase tracking-[0.18em] opacity-60'>
				On this page
			</p>
			<nav className='mt-4 flex max-h-[50vh] flex-col overflow-y-auto'>
				{headings.map((h) => {
					const isActive = active === h.id;
					return (
						<a
							key={h.id}
							href={`#${h.id}`}
							onClick={(e) => {
								e.preventDefault();
								scrollToId(h.id);
							}}
							className={cn(
								'group flex items-center gap-2.5 py-1.5 text-sm transition-colors',
								h.level === 3 && 'ml-5',
								isActive
									? 'font-bold text-franklin-ink'
									: 'font-medium text-franklin-ink/55 hover:text-franklin-ink'
							)}
						>
							<span
								aria-hidden
								className={cn(
									'h-[2px] shrink-0 rounded-full transition-all duration-300',
									isActive
										? 'w-5 bg-franklin-lime'
										: 'w-2.5 bg-franklin-ink/20 group-hover:bg-franklin-ink/40'
								)}
							/>
							{h.text}
						</a>
					);
				})}
			</nav>
		</aside>
	);
}

export function CopyLinkButton({ slug }: { slug: string }) {
	const [copied, setCopied] = useState(false);

	return (
		<button
			onClick={async () => {
				try {
					await navigator.clipboard.writeText(
						`${window.location.origin}/blog/${slug}`
					);
					setCopied(true);
					setTimeout(() => setCopied(false), 2000);
				} catch {}
			}}
			className='cursor-pointer inline-flex items-center gap-2 rounded-full border border-franklin-ink/15 px-4 py-2 text-sm font-bold transition-colors hover:bg-franklin-ink hover:text-franklin-lime dark:border-white/15 dark:hover:bg-franklin-lime dark:hover:text-white'
		>
			{copied ? (
				<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
					<path d='M20 6 9 17l-5-5' />
				</svg>
			) : (
				<svg width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
					<rect x='9' y='9' width='13' height='13' rx='2' />
					<path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
				</svg>
			)}
			{copied ? 'Copied' : 'Copy link'}
		</button>
	);
}
