'use client';

import { useCharacterAnimation } from 'lib/animations';
import { cn } from 'lib/utils';
import { useRef } from 'react';

export default function AnimatedHeading({
	children,
	className,
	delay = 0,
}: {
	children: React.ReactNode;
	className?: string;
	delay?: number;
}) {
	const ref = useRef<HTMLHeadingElement>(null);
	useCharacterAnimation({ textRef: ref, delay });

	return (
		<h1
			ref={ref}
			className={cn(
				'font-display text-[40px] font-medium leading-[100%] tracking-[-0.04em] md:text-5xl lg:text-[56px]',
				className
			)}
		>
			{children}
		</h1>
	);
}
