'use client';

import { useEffect, useState } from 'react';
import { cn } from 'lib/utils';

export default function RotatingWords({
	words,
	className,
	interval = 2200,
}: {
	words: string[];
	className?: string;
	interval?: number;
}) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(() => {
			setIndex((i) => (i + 1) % words.length);
		}, interval);
		return () => clearInterval(id);
	}, [words.length, interval]);

	return (
		<span className={cn('relative inline-flex overflow-hidden align-bottom', className)}>
			{words.map((word, i) => (
				<span
					key={word}
					aria-hidden={i !== index}
					className={cn(
						'transition-all duration-500 ease-out',
						i === index
							? 'relative translate-y-0 opacity-100'
							: 'absolute translate-y-full opacity-0'
					)}
				>
					{word}
				</span>
			))}
			<span className='invisible'>{words[index]}</span>
		</span>
	);
}
