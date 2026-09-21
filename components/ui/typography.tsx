import { cn } from 'lib/utils';
import React from 'react';

type TextProps = {
	children: React.ReactNode;
	className?: string;
};

export function Display({ children, className }: TextProps) {
	return (
		<h1
			className={cn(
				'font-display font-medium tracking-[-0.04em] leading-[120%] text-[40px] md:text-5xl lg:text-[80px]',
				className
			)}
		>
			{children}
		</h1>
	);
}

export function Heading1({ children, className }: TextProps) {
	return (
		<h1
			className={cn(
				'font-display font-medium tracking-[-0.04em] leading-[100%] text-[40px] md:text-5xl lg:text-[56px]',
				className
			)}
		>
			{children}
		</h1>
	);
}

export function Heading2({ children, className }: TextProps) {
	return (
		<h2
			className={cn(
				'font-display font-medium tracking-[-0.04em] leading-[110%] text-[32px] md:text-[40px] lg:text-[48px]',
				className
			)}
		>
			{children}
		</h2>
	);
}

export function Heading3({ children, className }: TextProps) {
	return (
		<h3
			className={cn(
				'font-display font-medium tracking-[-0.04em] leading-[110%] text-2xl md:text-3xl lg:text-[34px]',
				className
			)}
		>
			{children}
		</h3>
	);
}

export function ParagraphBig({ children, className }: TextProps) {
	return (
		<p className={cn('text-lg md:text-xl leading-relaxed', className)}>
			{children}
		</p>
	);
}

export function ParagraphSmall({ children, className }: TextProps) {
	return (
		<p className={cn('text-[15px] md:text-base leading-relaxed', className)}>
			{children}
		</p>
	);
}

export function MicroText({ children, className }: TextProps) {
	return (
		<p
			className={cn(
				'text-xs font-semibold uppercase tracking-[0.18em]',
				className
			)}
		>
			{children}
		</p>
	);
}

export function Tag({ children, className }: TextProps) {
	return (
		<span
			className={cn(
				'inline-flex items-center rounded-full border border-franklin-ink/15 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] dark:border-franklin-bone/20 dark:bg-white/5',
				className
			)}
		>
			{children}
		</span>
	);
}
