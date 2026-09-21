'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { cn } from 'lib/utils';

const navItems = [
	{ name: 'Home', href: '/' },
	{ name: 'Work', href: '/work' },
	{ name: 'Projects', href: '/projects' },
	{ name: 'Skills', href: '/skills' },
	{ name: 'Blog', href: '/blog' },
	{ name: 'Contact', href: '/contact' },
];

function isActivePath(pathname: string, href: string) {
	return pathname === href || (href === '/blog' && pathname.startsWith('/blog'));
}

export function Navbar() {
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	}, []);

	return (
		<motion.header
			initial={{ y: '-100%' }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
			className='fixed left-0 top-0 z-[999] w-full px-4 py-3 lg:px-10'
		>
			<div className='mx-auto w-full max-w-[1500px]'>
				<div className='flex items-center justify-between'>
					<div className='flex items-start'>

						{/* Desktop nav: full pill ↔ mini tile on scroll */}
						<nav className='ml-4 hidden items-start lg:flex'>
							<AnimatePresence mode='wait' initial={false}>
								{scrolled ? (
									<motion.div
										key='mini'
										initial={{ opacity: 0, scale: 0.9 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.9 }}
										transition={{ duration: 0.2 }}
									>
										<MiniMenu />
									</motion.div>
								) : (
									<motion.div
										key='full'
										initial={{ opacity: 0, scale: 0.95 }}
										animate={{ opacity: 1, scale: 1 }}
										exit={{ opacity: 0, scale: 0.95 }}
										transition={{ duration: 0.2 }}
										className='hidden items-center gap-7 rounded-md border border-franklin-ink/10 bg-white px-6 py-[14px] lg:flex'
									>
										{navItems.map((link) => (
											<Link
												key={link.name}
												href={link.href}
												className={cn(
													'font-medium text-franklin-pine transition-opacity hover:opacity-60',
													isActivePath(pathname, link.href) &&
														'underline decoration-franklin-lime decoration-[3px] underline-offset-8'
												)}
											>
												{link.name}
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</nav>
					</div>

					{/* CTA */}
					<div className='hidden lg:block'>
						<a
							href='https://docs.google.com/document/d/1Nu_3lIwfVSbuj24vQn7sjXmoY0eO2rWrIy6XWCaqgq0/edit?tab=t.0#heading=h.gjdgxs'
							target='_blank'
							rel='noopener'
							className='inline-flex h-12 items-center rounded-[10px] bg-franklin-lime px-6 text-sm font-semibold text-white franklin-lime-shadow transition-transform hover:scale-[98%]'
						>
							Resume
						</a>
					</div>

					{/* Mobile menu */}
					<div className='w-fit lg:hidden'>
						<MiniMenu isMobile />
					</div>
				</div>
			</div>
		</motion.header>
	);
}

function MiniMenu({ isMobile = false }: { isMobile?: boolean }) {
	const [menuOpen, setMenuOpen] = useState(false);
	const pathname = usePathname();

	useEffect(() => {
		setMenuOpen(false);
	}, [pathname]);

	const allLinks = [{ name: 'Home', href: '/' }, ...navItems];

	return (
		<div className='relative z-[50]'>
			<div
				onClick={() => setMenuOpen((v) => !v)}
				className='relative size-[52px] cursor-pointer place-items-center rounded-lg border border-franklin-ink/10 bg-white grid'
			>
				{menuOpen ? (
					<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
						<path
							d='M5 5l10 10M15 5L5 15'
							stroke='#0A3D3C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				) : (
					<svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
						<path
							d='M3 6h14M3 10h14M3 14h14'
							stroke='#0A3D3C'
							strokeWidth='2'
							strokeLinecap='round'
						/>
					</svg>
				)}
			</div>
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: -8 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: -8 }}
						transition={{ duration: 0.18 }}
						className={cn(
							'absolute z-[9999] rounded-lg border border-black/5 bg-white px-3 py-2 shadow-xl',
							isMobile ? '-top-2 right-0 w-60' : 'left-0 top-0 w-64'
						)}
					>
						<div className='my-1 flex justify-end'>
							<button
								onClick={() => setMenuOpen(false)}
								aria-label='Close menu'
								className='cursor-pointer'
							>
								<svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
									<path
										d='M4 4l8 8M12 4l-8 8'
										stroke='#0A3D3C'
										strokeWidth='2'
										strokeLinecap='round'
									/>
								</svg>
							</button>
						</div>
						<hr className='my-3 border-franklin-ink/10' />
						<div className='space-y-1'>
							{allLinks.map((link) => (
								<Link
									key={link.name}
									href={link.href}
									className={cn(
										'block w-fit rounded-md px-2 py-1.5 text-base font-medium text-franklin-pine transition-opacity hover:opacity-60',
										isActivePath(pathname, link.href) &&
											'underline decoration-franklin-lime decoration-[3px] underline-offset-8'
									)}
								>
									{link.name}
								</Link>
							))}
						</div>
						<hr className='my-3 border-franklin-ink/10' />
						<a
							href='https://docs.google.com/document/d/1Nu_3lIwfVSbuj24vQn7sjXmoY0eO2rWrIy6XWCaqgq0/edit?tab=t.0#heading=h.gjdgxs'
							target='_blank'
							rel='noopener'
							className='block rounded-[10px] bg-franklin-lime px-4 py-3 text-center text-sm font-bold text-white'
						>
							Resume
						</a>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
