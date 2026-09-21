import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from 'lib/blog/markdown';
import {
	getAllBlogPosts,
	getAllBlogSlugs,
	getBlogPostBySlug,
} from 'lib/blog/utils';
import { extractHeadings } from 'lib/blog/toc';
import {
	BlogToc,
	CopyLinkButton,
} from 'components/blog/blog-detail-ui';
import { baseUrl } from 'app/sitemap';
import { Button } from 'components/ui/button';

export async function generateStaticParams() {
	return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);
	if (!post) return { title: 'Post not found' };

	const imageUrl = post.socialImage ? `${baseUrl}${post.socialImage}` : undefined;

	return {
		title: `${post.title} | Franklin Udoagwa`,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			type: 'article',
			url: `${baseUrl}/blog/${post.slug}`,
			images: imageUrl
				? [{ url: imageUrl, width: 1280, height: 720, alt: post.title }]
				: [],
		},
		twitter: {
			card: 'summary_large_image',
			title: post.title,
			description: post.description,
			images: imageUrl ? [imageUrl] : [],
		},
	};
}

export default async function Blog({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = getBlogPostBySlug(slug);
	if (!post) notFound();

	const headings = extractHeadings(post.content);
	const readMore = getAllBlogPosts()
		.filter((p) => p.slug !== post.slug)
		.slice(0, 2);

	return (
		<div>
			<script
				type='application/ld+json'
				suppressHydrationWarning
				dangerouslySetInnerHTML={{
					__html: JSON.stringify({
						'@context': 'https://schema.org',
						'@type': 'BlogPosting',
						headline: post.title,
						datePublished: post.date,
						dateModified: post.date,
						description: post.description,
						image: post.socialImage
							? `${baseUrl}${post.socialImage}`
							: `${baseUrl}/images/og-image.png`,
						url: `${baseUrl}/blog/${post.slug}`,
						author: { '@type': 'Person', name: post.author.name },
					}),
				}}
			/>

			{/* header */}
			<section className='bg-franklin-ink px-4 pb-16 pt-32 text-center text-franklin-bone md:pt-40 lg:pb-20'>
				<div className='container mx-auto max-w-3xl'>
					<Link
						href='/blog'
						className='inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10'
					>
						<span aria-hidden='true'>←</span> All posts
					</Link>
					{post.tags.length > 0 && (
						<p className='mt-8 text-xs font-bold uppercase tracking-[0.22em] text-franklin-lime'>
							{post.tags.join('  •  ')}
						</p>
					)}
					<h1 className='font-display mx-auto mt-5 max-w-2xl text-4xl font-medium leading-[105%] tracking-[-0.04em] md:text-6xl'>
						{post.title}
					</h1>
					<div className='mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm font-semibold'>
						<span className='grid size-8 place-items-center rounded-full bg-franklin-lime text-sm font-bold text-white'>
							{post.author.name.charAt(0)}
						</span>
						<span className='opacity-90'>{post.author.name}</span>
						<span className='opacity-40'>•</span>
						<span className='opacity-70'>{post.formattedDate}</span>
						<span className='opacity-40'>•</span>
						<span className='rounded-full bg-franklin-lime px-3 py-1 text-xs font-bold text-white'>
							{post.readTime} min read
						</span>
					</div>
					<div className='mt-8 flex justify-center'>
						<CopyLinkButton slug={post.slug} />
					</div>
				</div>
			</section>

			{/* body + TOC */}
			<section className='bg-franklin-bone px-4 py-12 lg:py-16'>
				<div className='container mx-auto max-w-6xl'>

					<div className='gap-10 lg:grid lg:grid-cols-[1fr_300px]'>
						<article className='min-w-0 rounded-[28px] border border-franklin-ink/10 bg-white p-7 md:p-12'>
							{post.description && (
								<p className='mb-10 border-l-4 border-franklin-lime pl-5 text-lg italic leading-relaxed opacity-80 md:text-xl'>
									{post.description}
								</p>
							)}
							<MarkdownContent content={post.content} />
						</article>

						<div className='mt-8 lg:mt-0 lg:sticky lg:top-28 lg:self-start'>
							<BlogToc headings={headings} />
							{post.author.bio && (
								<div className='mt-6 rounded-2xl bg-franklin-ink p-6 text-white'>
									<p className='text-xs font-bold uppercase tracking-[0.18em] text-franklin-lime'>
										Written by
									</p>
									<p className='font-display mt-2 text-lg font-medium'>
										{post.author.name}
									</p>
									<p className='mt-2 text-sm leading-relaxed opacity-75'>
										{post.author.bio}
									</p>
								</div>
							)}
						</div>
					</div>
				</div>

				{/* read more */}
				{readMore.length > 0 && (
					<div className='container mx-auto mt-12 max-w-6xl'>
						<h2 className='font-display text-3xl font-medium tracking-tight'>
							Read <span className='opacity-50'>more</span>
						</h2>
						<div className='mt-6 grid gap-4 sm:grid-cols-2'>
							{readMore.map((p) => (
								<Link
									key={p.slug}
									href={`/blog/${p.slug}`}
									className='group rounded-[20px] border border-franklin-ink/10 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-lg md:p-8'
								>
									<h3 className='font-display line-clamp-2 text-xl font-medium'>
										{p.title}
									</h3>
									<p className='mt-2 line-clamp-2 text-sm opacity-70'>
										{p.description}
									</p>
									<p className='mt-3 text-sm font-medium opacity-60'>
										{p.formattedDate} • {p.readTime} min read
									</p>
									<span className='mt-3 inline-flex text-sm font-bold text-franklin-pine'>
										Read →
									</span>
								</Link>
							))}
						</div>
					</div>
				)}

				<div className='container mx-auto mt-10 max-w-6xl text-center'>
					<a href='/contact' className='inline-block'>
						<Button variant='lime'>Discuss this post →</Button>
					</a>
				</div>
			</section>
		</div>
	);
}
