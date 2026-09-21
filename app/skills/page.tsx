import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import AnimatedHeading from 'components/common/animated-heading';
import { skillCategories } from 'lib/data';

export function generateMetadata() {
	return metadata({
		title: 'Skills',
		description: 'Check out my skills.',
		url: `${baseUrl}/skills`,
	});
}

export default function Skills() {
	return (
		<div>
			<section className='bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16'>
				<div className='container mx-auto flex max-w-3xl flex-col items-center justify-center text-center'>
					<AnimatedHeading className='mb-6'>
						Skills <span className='opacity-50'>& toolbox</span>
					</AnimatedHeading>
					<p className='max-w-xl text-sm opacity-80 md:text-base'>
						What I reach for — from product UI to AI features to
						infrastructure.
					</p>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto max-w-3xl'>
					<div className='overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white'>
						{skillCategories.map((category, i) => (
							<div
								key={category.title}
								className={`px-7 py-8 md:px-9 ${i !== 0 ? 'border-t border-franklin-ink/10' : ''}`}
							>
								<div className='flex items-baseline justify-between gap-4'>
									<h2 className='font-display text-xl font-medium tracking-tight md:text-2xl'>
										{category.title}
									</h2>
									<p className='shrink-0 text-xs font-bold uppercase tracking-[0.18em] opacity-40'>
										{category.skills.length}
									</p>
								</div>
								<div className='mt-5 flex flex-wrap gap-2'>
									{category.skills.map((skill) => (
										<span
											key={skill}
											className='rounded-full bg-franklin-mist px-3.5 py-1.5 text-[13px] font-semibold'
										>
											{skill}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
