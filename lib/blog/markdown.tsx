'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { highlight } from 'sugar-high';
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
				code: ({ children, className }: ComponentProps & { inline?: boolean; className?: string }) => {
					const text = React.Children.toArray(children).join('');
					const isBlock = className?.includes('language-') || text.includes('\n');
					if (isBlock) {
						return (
							<code className='block font-mono text-[0.9em] leading-[1.7] text-franklin-ink dark:text-franklin-bone'>
								{text}
							</code>
						);
					}
					return (
						<code className='rounded-md bg-franklin-ink/8 px-1.5 py-0.5 font-mono text-[0.9em] font-semibold text-franklin-pine dark:bg-white/10 dark:text-franklin-lime'>
							{children}
						</code>
					);
				},
				pre: ({ children }: ComponentProps) => {
					// react-markdown nests a single <code> inside <pre> for fenced blocks.
					// Pull it apart so we can highlight + chrome the block ourselves.
					const child = React.Children.toArray(children).find((c) =>
						React.isValidElement(c)
					) as React.ReactElement<{
						className?: string;
						children?: React.ReactNode;
					}> | undefined;
					if (!child) return <pre>{children}</pre>;
					const className = child?.props?.className || '';
					const lang = /language-([\w+-]+)/.exec(className)?.[1] || 'code';
					const text = React.Children.toArray(child?.props?.children).join('');
					const html = highlight(text);
					return (
						<CodeBlock language={lang} code={text} html={html} />
					);
				},
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

function CodeBlock({
	language,
	code,
	html,
}: {
	language: string;
	code: string;
	html: string;
}) {
	const [copied, setCopied] = useState(false);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(code);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard unavailable */
		}
	};

	return (
		<div className='dot-grid-light dark:dot-grid-dark my-8 overflow-hidden rounded-2xl border border-franklin-ink/10 dark:border-white/10'>
			<div className='flex items-center justify-between border-b border-franklin-ink/10 px-4 py-2.5 dark:border-white/10'>
				<div className='flex items-center gap-1.5' aria-hidden>
					<span className='size-2.5 rounded-full bg-[#ff5f57]' />
					<span className='size-2.5 rounded-full bg-[#febc2e]' />
					<span className='size-2.5 rounded-full bg-[#28c840]' />
				</div>
				<div className='flex items-center gap-2'>
					<span className='rounded-md bg-franklin-ink/5 px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest opacity-70 dark:bg-white/10'>
						{language}
					</span>
					<button
						onClick={copy}
						className='cursor-pointer rounded-md px-2 py-0.5 font-mono text-[11px] font-bold uppercase tracking-widest opacity-60 transition-opacity hover:opacity-100'
					>
						{copied ? 'Copied ✓' : 'Copy'}
					</button>
				</div>
			</div>
			<pre className='overflow-x-auto p-5 text-sm leading-[1.7]'>
				<code
					className='font-mono'
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</pre>
		</div>
	);
}
