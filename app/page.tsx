import Link from 'next/link';
import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import AnimatedHeading from 'components/common/animated-heading';
import { StaticCard } from 'components/common/flip-card';
import { Button } from 'components/ui/button';
import { Display, Heading2 } from 'components/ui/typography';
import { projects, workExperience } from 'lib/data';
import { getAllBlogPosts } from 'lib/blog/utils';

export function generateMetadata() {
	return metadata({
		title: "Franklin Udoagwa's Portfolio",
		description:
			'Senior Frontend Engineer (React, React Native, TypeScript) building AI-powered web, mobile and fintech experiences. Ex-Oyster, Konga, Afrihealth.',
		url: `${baseUrl}`,
	});
}

export default function Page() {
	const posts = getAllBlogPosts().slice(0, 3);

	return (
		<div>
			{/* ============ HERO (100vh, light) ============ */}
			<section className='dot-grid-light relative flex min-h-screen items-center overflow-hidden bg-franklin-bone'>
				<main className='container relative mx-auto max-w-6xl px-4 py-28 text-center'>
					
					<AnimatedHeading className='mx-auto mt-8 text-6xl leading-[95%] md:text-8xl'>
						Franklin <span className='text-franklin-lime'>Udoagwa.</span>
					</AnimatedHeading>
					<p className='mx-auto mt-8 max-w-xl text-lg opacity-70 md:text-xl'>
						I build web and mobile products people love to use — React,
						React Native, and AI features like chat, RAG and voice.
					</p>
					<div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
						<a href='/work'>
							<Button variant='lime' className='px-8 py-4 text-base'>
								View my work
							</Button>
						</a>
						<a href='/contact'>
							<Button variant='outline' className='px-8 py-4 text-base'>
								Get in touch
							</Button>
						</a>
					</div>
				</main>
				<a
					href='#work'
					aria-label='Scroll to work'
					className='absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs font-bold uppercase tracking-[0.2em] opacity-50 transition-opacity hover:opacity-100'
				>
					Scroll
					<span className='inline-block animate-bounce'>↓</span>
				</a>
			</section>

			{/* ============ TICKER ============ */}
			<div className='overflow-hidden bg-franklin-lime py-3.5 text-franklin-ink'>
				<div className='flex w-max animate-marquee gap-10 pr-10'>
					{[
						'React',
						'React Native',
						'TypeScript',
						'AI SDK',
						'RAG',
						'Voice Agents',
						'Fintech',
						'Open Source',
						'React',
						'React Native',
						'TypeScript',
						'AI SDK',
						'RAG',
						'Voice Agents',
						'Fintech',
						'Open Source',
					].map((w, i) => (
						<span
							key={i}
							className='flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium tracking-tight'
						>
							{w}
							<span aria-hidden>✦</span>
						</span>
					))}
				</div>
			</div>

			{/* ============ SELECTED WORK ============ */}
			<section className='bg-franklin-bone px-4 py-24 lg:py-32'>
				<div className='container mx-auto'>
					<Display className='text-center text-franklin-ink'>
						Selected <span className='opacity-50'>work</span>
					</Display>
					<p className='mx-auto mt-6 max-w-xl text-center opacity-70'>
						A few things I&apos;ve designed, built and shipped — from
						banking to AI to healthcare.
					</p>
					<div className='mx-auto mt-14 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8'>
						{workExperience.slice(0, 3).map((w, i) => (
							<div
								key={`${w.company}-${w.project}`}
								data-reveal
								className='flex min-h-[440px] flex-col gap-6 rounded-[20px] border border-franklin-ink/10 bg-white p-8 transition-transform duration-300 hover:-translate-y-1'
							>
								<div className='w-fit rounded-lg bg-franklin-lime p-2.5 font-display text-lg font-bold text-franklin-ink'>
									{String(i + 1).padStart(2, '0')}
								</div>
								<div className='space-y-4'>
									<p className='text-xs font-bold uppercase tracking-[0.16em] opacity-50'>
										{w.company}
									</p>
									<h3 className='font-display text-xl font-medium tracking-tight'>
										{w.project}
									</h3>
									<p className='line-clamp-4 text-sm font-light leading-relaxed opacity-80'>
										{w.description}
									</p>
								</div>
								<a
									href='/work'
									className='mt-auto inline-flex text-sm font-bold text-franklin-pine'
								>
									Read more →
								</a>
							</div>
						))}
					</div>
					<div className='mt-12 flex justify-center'>
						<a href='/work'>
							<Button variant='lime'>All work experience</Button>
						</a>
					</div>
				</div>
			</section>

			{/* ============ PROJECTS (shuffling deck) ============ */}
			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto'>
					<Heading2 className='text-center text-franklin-ink'>
						Projects <span className='opacity-50'>& open source</span>
					</Heading2>
					<p className='mx-auto mt-6 max-w-xl text-center opacity-70'>
						Things I&apos;ve built and contributed to.
					</p>
					<div className='mx-auto mt-14 grid max-w-6xl gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-8'>
						{projects.slice(0, 3).map((p, i) => (
							<div key={p.name} data-reveal>
								<StaticCard
									index={i}
									data={{
										title: p.name,
										description: p.description,
										tags: p.tags,
										href: p.url,
										badge: p.isGithub ? 'GitHub' : undefined,
										cta: 'Open →',
										links: p.links,
									}}
								/>
							</div>
						))}
					</div>
					<div className='mt-12 flex justify-center'>
						<a href='/projects'>
							<Button variant='lime'>All projects</Button>
						</a>
					</div>
				</div>
			</section>

			{/* ============ BLOG ============ */}
			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto'>
					<Heading2 className='text-center text-franklin-ink'>
						Latest <span className='opacity-50'>writing</span>
					</Heading2>
					<p className='mx-auto mt-6 max-w-xl text-center opacity-70'>
						Engineering notes and lessons from shipping real products.
					</p>
					<div className='mx-auto mt-14 grid max-w-6xl gap-6 md:grid-cols-3 lg:mt-16 lg:gap-8'>
						{posts.length === 0 && (
							<p className='opacity-60'>First deep-dive dropping soon.</p>
						)}
						{posts.map((post) => (
							<Link
								key={post.slug}
								href={`/blog/${post.slug}`}
								data-reveal
								className='group flex h-full flex-col overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white transition-all hover:-translate-y-1 hover:shadow-xl'
							>
								<div className='flex h-32 items-start justify-end bg-franklin-mist p-5'>
									<span className='rounded-full bg-franklin-ink px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-franklin-lime'>
										Blog
									</span>
								</div>
								<div className='flex flex-1 flex-col p-7'>
									<h3 className='font-display line-clamp-2 text-xl font-medium leading-snug'>
										{post.title}
									</h3>
									<p className='mt-3 text-sm font-medium opacity-60'>
										{post.formattedDate} • {post.readTime} min read
									</p>
									<span className='mt-5 text-sm font-bold text-franklin-pine'>
										Read →
									</span>
								</div>
							</Link>
						))}
					</div>
					<div className='mt-10 flex justify-center'>
						<a href='/blog'>
							<Button variant='lime'>All posts</Button>
						</a>
					</div>
				</div>
			</section>

			{/* ============ CTA (single, dark) ============ */}
			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto max-w-6xl rounded-[28px] bg-franklin-ink px-6 py-16 text-center text-franklin-bone md:py-20'>
					<Heading2>
						Let&apos;s build <span className='opacity-50'>something people use.</span>
					</Heading2>
					<p className='mx-auto mt-6 max-w-xl opacity-70'>
						Frontend, mobile, AI features or Ethereum infra — I like
						zero-to-one and making existing systems fast.
					</p>
					<div className='mt-10 flex flex-wrap items-center justify-center gap-3'>
						<a href='/contact'>
							<Button variant='lime'>Get in touch</Button>
						</a>
						<a
							href='https://github.com/frankudoags'
							target='_blank'
							rel='noopener'
						>
							<Button variant='ghost'>GitHub</Button>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
