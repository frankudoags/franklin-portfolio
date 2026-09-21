import Link from 'next/link';
import { notFound } from 'next/navigation';
import { baseUrl } from 'app/sitemap';
import AnimatedHeading from 'components/common/animated-heading';
import { getAllSeries, getSeriesBySlug } from 'lib/blog/utils';

export async function generateStaticParams() {
	return getAllSeries().map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const series = getSeriesBySlug(slug);
	if (!series) return { title: 'Series not found' };
	return {
		title: `${series.name} — a blog series | Franklin Udoagwa`,
		description: `All ${series.posts.length} parts of ${series.name}, in order.`,
		openGraph: {
			title: series.name,
			description: `All ${series.posts.length} parts, in order.`,
			url: `${baseUrl}/blog/series/${series.slug}`,
		},
	};
}

export default async function SeriesPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const series = getSeriesBySlug(slug);
	if (!series) notFound();

	return (
		<div>
			<section className='bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16'>
				<div className='container mx-auto flex max-w-3xl flex-col items-center justify-center text-center'>
					<Link
						href='/blog'
						className='mb-6 inline-flex items-center gap-1.5 rounded-full border border-franklin-ink/15 bg-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-franklin-ink hover:text-franklin-lime'
					>
						<span aria-hidden='true'>←</span> All posts
					</Link>
					<AnimatedHeading className='mb-6'>{series.name}</AnimatedHeading>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto max-w-3xl'>
					<div className='overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white'>
						{series.posts.map((post, i) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								data-reveal
								className={`group flex items-center gap-5 px-7 py-6 transition-colors hover:bg-franklin-mist md:px-9 ${i !== 0 ? 'border-t border-franklin-ink/10' : ''}`}
							>
								<span className='font-display grid size-12 shrink-0 place-items-center rounded-xl bg-franklin-ink text-lg font-bold text-white'>
									{i + 1}
								</span>
								<div className='min-w-0 flex-1'>
									<p className='font-display truncate text-xl font-medium tracking-tight md:text-2xl'>
										{post.title}
									</p>
									<p className='mt-1 text-sm font-medium opacity-60'>
										{post.formattedDate} • {post.readTime} min read
									</p>
								</div>
								<span className='grid size-11 shrink-0 place-items-center rounded-full border border-franklin-ink/15 text-lg transition-all duration-300 group-hover:border-franklin-ink group-hover:bg-franklin-ink group-hover:text-franklin-lime'>
									→
								</span>
							</Link>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
