'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { generateId } from './toc';

interface MarkdownContentProps {
	content: string;
}

interface ComponentProps {
	children?: React.ReactNode;
}

/**
 * Franklin-styled markdown renderer (Oyster-inspired, own palette)
 */
export default function MarkdownContent({ content }: MarkdownContentProps) {
	return (
		<ReactMarkdown
			components={{
				h1: ({ children }: ComponentProps) => (
					<h1 className='font-display mb-8 text-4xl font-semibold tracking-tight text-franklin-ink md:text-[2.75rem] dark:text-franklin-bone'>
						{children}
					</h1>
				),
				h2: ({ children }: ComponentProps) => {
					const text = React.Children.toArray(children).join('');
					const id = generateId(text);
					return (
						<h2
							id={id}
							className='font-display mb-6 mt-14 scroll-mt-32 text-3xl font-semibold tracking-tight text-franklin-ink md:mt-20 md:text-4xl dark:text-franklin-bone'
						>
							{children}
						</h2>
					);
				},
				h3: ({ children }: ComponentProps) => {
					const text = React.Children.toArray(children).join('');
					const id = generateId(text);
					return (
						<h3
							id={id}
							className='font-display mb-4 mt-10 scroll-mt-32 text-2xl font-semibold text-franklin-ink md:mt-14 dark:text-franklin-bone'
						>
							{children}
						</h3>
					);
				},
				p: ({ children }: ComponentProps) => (
					<p className='mb-7 text-[1.05rem] leading-[1.85] opacity-85'>{children}</p>
				),
				ul: ({ children }: ComponentProps) => (
					<ul className='mb-8 list-disc space-y-2.5 pl-5 text-[1.05rem] leading-[1.8] opacity-85'>
						{children}
					</ul>
				),
				ol: ({ children }: ComponentProps) => (
					<ol className='mb-8 list-decimal space-y-2.5 pl-5 text-[1.05rem] leading-[1.8] opacity-85'>
						{children}
					</ol>
				),
				a: ({ children, href }: ComponentProps & { href?: string }) => (
					<a
						href={href}
						target={href?.startsWith('http') ? '_blank' : undefined}
						rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
						className='font-semibold text-franklin-pine underline decoration-franklin-lime decoration-2 underline-offset-4 hover:bg-franklin-lime hover:text-white dark:text-franklin-lime dark:hover:text-white'
					>
						{children}
					</a>
				),
				blockquote: ({ children }: ComponentProps) => (
					<blockquote className='my-8 rounded-r-2xl border-l-4 border-franklin-pine bg-franklin-pine/5 px-6 py-4 text-[1.05rem] italic leading-relaxed dark:border-franklin-lime dark:bg-white/5'>
						{children}
					</blockquote>
				),
				code: ({ children }: ComponentProps & { inline?: boolean; className?: string }) => (
					<code className='rounded-md bg-franklin-ink/8 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-franklin-pine dark:bg-white/10 dark:text-franklin-lime'>
						{children}
					</code>
				),
				pre: ({ children }: ComponentProps) => (
					<pre className='dot-grid-light dark:dot-grid-dark my-8 overflow-x-auto rounded-2xl border border-franklin-ink/10 p-5 text-sm leading-relaxed dark:border-white/10'>
						{children}
					</pre>
				),
				img: ({ src, alt }: { src?: string; alt?: string }) => (
					<figure className='my-10'>
						{/* eslint-disable-next-line @next/next/no-img-element */}
						<img src={src} alt={alt || ''} className='w-full rounded-2xl border border-franklin-ink/10 dark:border-white/10' />
						{alt && (
							<figcaption className='mt-3 text-center text-sm italic opacity-60'>
								{alt}
							</figcaption>
						)}
					</figure>
				),
				hr: () => (
					<hr className='my-10 border-t-2 border-dashed border-franklin-ink/15 dark:border-white/15' />
				),
			}}
		>
			{content}
		</ReactMarkdown>
	);
}
