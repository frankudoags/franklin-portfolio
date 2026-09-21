import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import { StaticCard } from 'components/common/flip-card';
import { Display } from 'components/ui/typography';
import { projects } from 'lib/data';

export function generateMetadata() {
	return metadata({
		title: 'Projects',
		description: 'Check out my projects.',
		url: `${baseUrl}/projects`,
	});
}

export default function Projects() {
	return (
		<div>
			<section className='bg-franklin-bone px-4 pb-8 pt-32 md:pt-40'>
				<div className='container mx-auto max-w-4xl text-center'>
					<Display>
						Projects <span className='opacity-50'>& open source</span>
					</Display>
					<p className='mx-auto mt-5 max-w-2xl opacity-70'>
						Products, hackathons and Ethereum infrastructure — things
						I&apos;ve built and contributed to.
					</p>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-20 lg:pb-28'>
				<div className='container mx-auto grid gap-5 sm:grid-cols-2 lg:grid-cols-3'>
					{projects.map((p, i) => (
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
					<a
						className='rounded-[10px] bg-franklin-ink px-8 py-4 text-sm font-semibold text-franklin-lime franklin-dark-shadow transition-transform hover:scale-[98%] dark:bg-franklin-lime dark:text-franklin-ink'
						href='https://github.com/frankudoags'
						target='_blank'
					>
						View all on GitHub →
					</a>
				</div>
			</section>
		</div>
	);
}
