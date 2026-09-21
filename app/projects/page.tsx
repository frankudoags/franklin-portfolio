import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import { StaticCard } from 'components/common/flip-card';
import AnimatedHeading from 'components/common/animated-heading';
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
			<section className='bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16'>
				<div className='container mx-auto flex max-w-3xl flex-col items-center justify-center text-center'>
					<AnimatedHeading className='mb-6'>
						Projects <span className='opacity-50'>& open source</span>
					</AnimatedHeading>
					<p className='max-w-xl text-sm opacity-80 md:text-base'>
						Products, hackathons and Ethereum infrastructure — things
						I&apos;ve built and contributed to.
					</p>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8'>
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

			</section>
		</div>
	);
}
