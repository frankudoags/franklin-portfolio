'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const columns = [
	{
		title: 'Sitemap',
		links: [
			{ name: 'Home', url: '/' },
			{ name: 'Projects', url: '/projects' },
			{ name: 'Work', url: '/work' },
			{ name: 'Skills', url: '/skills' },
			{ name: 'Blog', url: '/blog' },
			{ name: 'Contact', url: '/contact' },
		],
	},
	{
		title: 'Work',
		links: [
			{ name: 'GTCO Banking @ Revent', url: '/work' },
			{ name: 'Ask Oyster AI', url: '/work' },
			{ name: 'Konga Search', url: '/work' },
			{ name: 'Hydra EMR', url: '/work' },
		],
	},
	{
		title: 'Socials',
		links: [
			{ name: 'GitHub', url: 'https://github.com/frankudoags' },
			{ name: 'LinkedIn', url: 'https://www.linkedin.com/in/udoagwa-franklin' },
			{ name: 'X (Twitter)', url: 'https://x.com/frank_udoags' },
			{ name: 'Email', url: 'mailto:frankudoags@gmail.com' },
		],
	},
];

function useLagosTime() {
	const [time, setTime] = useState('');
	useEffect(() => {
		const tick = () => {
			setTime(
				new Intl.DateTimeFormat('en-US', {
					hour: '2-digit',
					minute: '2-digit',
					timeZone: 'Africa/Lagos',
				}).format(new Date())
			);
		};
		tick();
		const id = setInterval(tick, 30000);
		return () => clearInterval(id);
	}, []);
	return time;
}

export default function Footer() {
	const lagosTime = useLagosTime();
	const word = 'Franklin';

	const scrollTop = () => {
		if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.4 });
		else window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<footer className='w-full bg-franklin-ink text-franklin-bone'>
			<section className='mx-auto w-full max-w-7xl px-6 pt-20 lg:px-20 lg:pt-24'>
				{/* CTA */}
				<div className='flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-14 lg:flex-row lg:items-end lg:pb-16'>
					<div>
						<p className='flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.2em] text-franklin-lime'>
							<span className='size-2 rounded-full bg-franklin-lime' />
							Lagos, Nigeria{lagosTime ? ` — ${lagosTime} local` : ''}
						</p>
						<p className='font-display mt-5 max-w-xl text-4xl font-medium leading-[105%] tracking-tight md:text-6xl'>
							Have an idea?
							<br />
							<span className='opacity-50'>Let&apos;s talk.</span>
						</p>
					</div>
					<div className='flex flex-wrap gap-3'>
						<a
							href='mailto:frankudoags@gmail.com'
							className='rounded-[10px] bg-franklin-lime px-7 py-4 text-sm font-bold text-white transition-transform hover:scale-[98%]'
						>
							frankudoags@gmail.com
						</a>
						<Link
							href='/contact'
							className='rounded-[10px] border border-white/25 px-7 py-4 text-sm font-bold transition-colors hover:bg-white/10'
						>
							All channels
						</Link>
					</div>
				</div>

				{/* link columns */}
				<div className='grid grid-cols-2 gap-12 py-14 md:grid-cols-3 lg:gap-8 lg:py-16'>
					{columns.map((column) => (
						<div key={column.title}>
							<h4 className='text-sm font-bold uppercase tracking-[0.18em] opacity-40'>
								{column.title}
							</h4>
							<ul className='mt-5 grid gap-y-3'>
								{column.links.map((link) => (
									<li key={link.name} className='w-fit'>
										<Link
											href={link.url}
											target={link.url.startsWith('http') ? '_blank' : undefined}
											className='text-[15px] font-medium opacity-80 transition-opacity hover:opacity-100 hover:underline hover:underline-offset-4'
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* giant interactive wordmark */}
				<p
					aria-label='Franklin'
					className='flex select-none justify-center overflow-hidden font-display text-[19vw] font-medium leading-[0.9] tracking-[-0.04em] lg:text-[10rem] pb-10'
				>
					{word.split('').map((letter, i) => (
						<motion.span
							key={i}
							whileHover={{ y: -16, color: '#0ea5e9' }}
							transition={{ type: 'spring', stiffness: 400, damping: 15 }}
							className='inline-block cursor-default text-franklin-bone/25'
						>
							{letter}
						</motion.span>
					))}
				</p>

				
			</section>
		</footer>
	);
}
