'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { BlogPost } from 'lib/blog/types';
import { MicroText } from 'components/ui/typography';

const POSTS_PER_PAGE = 6;

export function BlogBanner() {
	return (
		<div className='overflow-hidden rounded-[28px] bg-franklin-ink px-6 py-14 text-center text-franklin-bone md:py-20'>
			<MicroText className='text-franklin-lime'>Notes • Builds • Learnings</MicroText>
			<h1 className='font-display mx-auto mt-4 max-w-2xl text-5xl font-semibold leading-[100%] tracking-tight md:text-7xl'>
				Franklin&apos;s <span className='italic text-franklin-lime'>blog</span>
			</h1>
			<p className='mx-auto mt-5 max-w-xl text-white/70'>
				Engineering deep-dives, Ethereum notes and lessons from shipping real
				products. New posts regularly.
			</p>
		</div>
	);
}

export function CategoryFilter({
	tags,
	active,
	onChange,
}: {
	tags: string[];
	active: string | null;
	onChange: (tag: string | null) => void;
}) {
	return (
		<div className='-mt-0 flex flex-wrap items-center justify-center gap-2 py-6'>
			<button
				onClick={() => onChange(null)}
				className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
					active === null
						? 'bg-franklin-ink text-franklin-lime dark:bg-franklin-lime dark:text-white'
						: 'border border-franklin-ink/15 bg-white hover:border-franklin-ink/40 dark:border-white/15 dark:bg-white/5'
				}`}
			>
				All
			</button>
			{tags.map((tag) => (
				<button
					key={tag}
					onClick={() => onChange(tag === active ? null : tag)}
					className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
						active === tag
							? 'bg-franklin-ink text-franklin-lime dark:bg-franklin-lime dark:text-white'
							: 'border border-franklin-ink/15 bg-white hover:border-franklin-ink/40 dark:border-white/15 dark:bg-white/5'
					}`}
				>
					{tag}
				</button>
			))}
		</div>
	);
}

export function FeaturedPost({ post }: { post: BlogPost }) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className='group block overflow-hidden rounded-[28px] border border-franklin-ink/10 bg-white transition-all hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(12,59,60,0.5)] dark:border-white/10 dark:bg-white/5'
		>
			<div className='grid md:grid-cols-2'>
				<div className='relative min-h-64 overflow-hidden bg-franklin-mist'>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={post.socialImage || '/images/og-image.png'}
						alt={post.title}
						className='absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
					/>
				</div>
				<div className='p-7 md:p-10'>
					<span className='inline-flex rounded-full bg-franklin-pine px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-franklin-lime'>
						Featured
					</span>
					<h2 className='font-display mt-4 text-3xl font-semibold leading-[105%] tracking-tight md:text-4xl'>
						{post.title}
					</h2>
					<p className='mt-3 line-clamp-2 opacity-70'>{post.description}</p>
					<div className='mt-4 flex flex-wrap gap-1.5'>
						{post.tags.map((t) => (
							<span
								key={t}
								className='rounded-full bg-franklin-ink/5 px-3 py-1 text-[11px] font-bold uppercase tracking-widest'
							>
								{t}
							</span>
						))}
					</div>
					<p className='mt-5 text-sm font-semibold opacity-60'>
						@{post.author.username} • {post.formattedDate} • {post.readTime} min read
					</p>
					<span className='mt-4 inline-flex text-sm font-bold text-franklin-pine dark:text-franklin-lime'>
						Read article →
					</span>
				</div>
			</div>
		</Link>
	);
}

export function BlogCard({ post }: { post: BlogPost }) {
	return (
		<Link
			href={`/blog/${post.slug}`}
			className='group flex h-full flex-col overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white transition-all hover:-translate-y-1 hover:border-franklin-ink/25 hover:shadow-xl dark:border-white/10 dark:bg-white/5'
		>
			<div className='relative aspect-[16/9] overflow-hidden bg-franklin-mist'>
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src={post.socialImage || '/images/og-image.png'}
					alt={post.title}
					className='h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105'
				/>
			</div>
			<div className='flex flex-1 flex-col p-5'>
				<div className='flex flex-wrap gap-1.5'>
					{post.tags.slice(0, 2).map((t) => (
						<span
							key={t}
							className='rounded-full bg-franklin-bone px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest dark:bg-white/10'
						>
							{t}
						</span>
					))}
				</div>
				<h3 className='font-display mt-3 line-clamp-2 text-xl font-semibold leading-snug'>
					{post.title}
				</h3>
				<p className='mt-2 line-clamp-2 text-sm opacity-70'>{post.description}</p>
				<div className='mt-4 flex items-center gap-2 border-t border-franklin-ink/10 pt-4 text-[13px] font-semibold opacity-70 dark:border-white/10'>
					<span className='grid size-7 place-items-center rounded-full bg-franklin-pine text-[11px] font-bold text-franklin-lime'>
						{post.author.name.charAt(0)}
					</span>
					<span className='truncate'>
						{post.author.name} • {post.formattedDate}
					</span>
				</div>
			</div>
		</Link>
	);
}

export function BlogListClient({
	allPosts,
	allTags,
	hideBanner = false,
	hideFeatured = false,
}: {
	allPosts: BlogPost[];
	allTags: string[];
	hideBanner?: boolean;
	hideFeatured?: boolean;
}) {
	const [activeTag, setActiveTag] = useState<string | null>(null);
	const [page, setPage] = useState(1);

	const filtered =
		activeTag === null
			? allPosts
			: allPosts.filter((p) => p.tags.includes(activeTag));

	const featured =
		!hideFeatured && activeTag === null && page === 1 ? filtered[0] : null;
	const rest = featured ? filtered.slice(1) : filtered;
	const totalPages = Math.max(1, Math.ceil(rest.length / POSTS_PER_PAGE));
	const safePage = Math.min(page, totalPages);
	const visible = rest.slice(
		(safePage - 1) * POSTS_PER_PAGE,
		safePage * POSTS_PER_PAGE
	);

	const pickTag = (t: string | null) => {
		setActiveTag(t);
		setPage(1);
	};

	return (
		<div>
			{!hideBanner && <BlogBanner />}
			<CategoryFilter tags={allTags} active={activeTag} onChange={pickTag} />

			{filtered.length === 0 && (
				<p className='rounded-2xl border border-dashed p-10 text-center opacity-60'>
					No posts for this tag yet.
				</p>
			)}

			{featured && (
				<div data-reveal>
					<FeaturedPost post={featured} />
				</div>
			)}

			{visible.length > 0 && (
				<>
					<h2 className='font-display mb-5 mt-10 text-2xl font-semibold md:text-3xl'>
						{featured ? 'Latest posts' : activeTag ? `Posts in “${activeTag}”` : 'All posts'}
					</h2>
					<div className='grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
						{visible.map((post) => (
							<div key={post.slug} data-reveal>
								<BlogCard post={post} />
							</div>
						))}
					</div>
				</>
			)}

			{totalPages > 1 && (
				<div className='mt-8 flex items-center justify-center gap-2'>
					<button
						disabled={safePage <= 1}
						onClick={() => setPage((p) => Math.max(1, p - 1))}
						className='rounded-full border px-4 py-2 text-sm font-bold disabled:opacity-40'
					>
						← Prev
					</button>
					<span className='text-sm font-bold opacity-70'>
						{safePage} / {totalPages}
					</span>
					<button
						disabled={safePage >= totalPages}
						onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
						className='rounded-full border px-4 py-2 text-sm font-bold disabled:opacity-40'
					>
						Next →
					</button>
				</div>
			)}
		</div>
	);
}
