'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function IntroLoader() {
	const [show, setShow] = useState(false);
	const [leaving, setLeaving] = useState(false);

	useEffect(() => {
		if (sessionStorage.getItem('franklin-intro-seen')) return;
		setShow(true);
		document.body.style.overflow = 'hidden';

		const exitTimer = setTimeout(() => setLeaving(true), 1700);
		const doneTimer = setTimeout(() => {
			setShow(false);
			document.body.style.overflow = '';
			sessionStorage.setItem('franklin-intro-seen', '1');
		}, 2300);

		return () => {
			clearTimeout(exitTimer);
			clearTimeout(doneTimer);
			document.body.style.overflow = '';
		};
	}, []);

	return (
		<AnimatePresence>
			{show && (
				<motion.div
					className='fixed inset-0 z-[100] flex flex-col items-center justify-center bg-franklin-ink text-franklin-bone'
					initial={{ y: 0 }}
					animate={leaving ? { y: '-100%' } : { y: 0 }}
					exit={{ y: '-100%' }}
					transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
				>
					<motion.span
						initial={{ opacity: 0, y: 24 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, ease: 'easeOut' }}
						className='grid size-16 place-items-center rounded-2xl bg-franklin-lime font-display text-3xl font-bold text-franklin-ink'
					>
						F
					</motion.span>
					<motion.p
						initial={{ opacity: 0, y: 16 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
						className='font-display mt-5 text-2xl font-medium tracking-tight'
					>
						Franklin Udoagwa
					</motion.p>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 0.6 }}
						transition={{ duration: 0.5, delay: 0.3 }}
						className='mt-1 text-xs font-bold uppercase tracking-[0.2em]'
					>
						Portfolio
					</motion.p>
					<div className='mt-8 h-[3px] w-40 overflow-hidden rounded-full bg-white/15'>
						<motion.div
							className='h-full rounded-full bg-franklin-lime'
							initial={{ x: '-100%' }}
							animate={{ x: 0 }}
							transition={{ duration: 1.5, ease: 'easeInOut' }}
						/>
					</div>
				</motion.div>
			)}
		</AnimatePresence>
	);
}
