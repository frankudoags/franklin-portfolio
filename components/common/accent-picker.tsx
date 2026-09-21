'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from 'lib/utils';

const DEFAULT_ACCENT = '#0ea5e9';
const STORAGE_KEY = 'franklin-accent';

const PRESETS = [
	{ name: 'Sky', value: '#0ea5e9' },
	{ name: 'Ember', value: '#ff4d00' },
	{ name: 'Lime', value: '#65a30d' },
	{ name: 'Violet', value: '#7c5cff' },
	{ name: 'Candy', value: '#ec4899' },
	{ name: 'Teal', value: '#0d9488' },
	{ name: 'Amber', value: '#d97706' },
	{ name: 'Crimson', value: '#e11d48' },
];

function applyAccent(color: string) {
	document.documentElement.style.setProperty('--franklin-lime', color);
}

export default function AccentPicker() {
	const [open, setOpen] = useState(false);
	const [accent, setAccent] = useState(DEFAULT_ACCENT);

	useEffect(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		if (saved) {
			setAccent(saved);
			applyAccent(saved);
		}
	}, []);

	const pick = (color: string) => {
		pickLive(color);
		setOpen(false);
	};

	const pickLive = (color: string) => {
		setAccent(color);
		localStorage.setItem(STORAGE_KEY, color);
		applyAccent(color);
	};

	const reset = () => {
		localStorage.removeItem(STORAGE_KEY);
		setAccent(DEFAULT_ACCENT);
		applyAccent(DEFAULT_ACCENT);
	};

	return (
		<div className='fixed bottom-5 right-5 z-[70] flex flex-col items-end gap-3'>
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, y: 12, scale: 0.95 }}
						animate={{ opacity: 1, y: 0, scale: 1 }}
						exit={{ opacity: 0, y: 12, scale: 0.95 }}
						transition={{ duration: 0.18 }}
						className='w-56 rounded-2xl border border-franklin-ink/10 bg-white p-4 shadow-2xl'
					>
						<p className='text-xs font-bold uppercase tracking-[0.18em] opacity-50'>
							Accent color
						</p>
						<div className='mt-3 grid grid-cols-4 gap-2.5'>
							{PRESETS.map((p) => (
								<button
									key={p.value}
									title={p.name}
									aria-label={`Use ${p.name} accent`}
									onClick={() => pick(p.value)}
									className={cn(
										'grid size-10 cursor-pointer place-items-center rounded-full transition-transform hover:scale-110',
										accent.toLowerCase() === p.value &&
											'ring-2 ring-franklin-ink ring-offset-2'
									)}
									style={{ backgroundColor: p.value }}
								>
									{accent.toLowerCase() === p.value && (
										<span className='text-sm font-bold text-white drop-shadow'>
											✓
										</span>
									)}
								</button>
							))}
						</div>
						<label className='mt-3 flex cursor-pointer items-center justify-between rounded-xl bg-franklin-ink/5 px-3 py-2.5 text-sm font-bold transition-colors hover:bg-franklin-ink/10'>
							Custom…
							<span
								className='size-7 rounded-full border border-franklin-ink/15'
								style={{ backgroundColor: accent }}
							/>
							<input
								type='color'
								value={accent}
								onChange={(e) => pickLive(e.target.value)}
								onBlur={() => setOpen(false)}
								className='sr-only'
							/>
						</label>
						<button
							onClick={reset}
							className='mt-2 w-full cursor-pointer rounded-xl px-3 py-2 text-xs font-bold uppercase tracking-[0.14em] opacity-50 transition-opacity hover:opacity-100'
						>
							Reset
						</button>
					</motion.div>
				)}
			</AnimatePresence>

			<motion.button
				onClick={() => setOpen((v) => !v)}
				aria-label='Change accent color'
				whileHover={{ scale: 1.08 }}
				whileTap={{ scale: 0.94 }}
				className='grid size-14 cursor-pointer place-items-center rounded-full border-4 border-white bg-white shadow-[0_12px_32px_-8px_rgba(19,21,21,0.4)]'
				style={{ background: `conic-gradient(${accent} 0 100%)` }}
			>
				<span className='grid size-9 place-items-center rounded-full bg-white'>
					<svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
						<path
							d='M12 2C6.9 2 3 5.5 3 10c0 2.4 1.1 4.3 2.7 5.7.4.4.6.9.6 1.4V19a1 1 0 0 0 1 1h9.4a1 1 0 0 0 1-1v-1.9c0-.5.2-1 .6-1.4C20 14.3 21 12.4 21 10c0-4.5-3.9-8-9-8Z'
							fill={accent}
						/>
						<circle cx='9' cy='10' r='1.4' fill='#fff' />
						<circle cx='13.5' cy='8.5' r='1.4' fill='#fff' />
						<circle cx='15' cy='12.5' r='1.4' fill='#fff' />
					</svg>
				</span>
			</motion.button>
		</div>
	);
}
