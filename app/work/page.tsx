import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import AnimatedHeading from 'components/common/animated-heading';
import StackedWorkCards from 'components/work/stacked-work-cards';
import { education, leadership, workExperience } from 'lib/data';

export function generateMetadata() {
	return metadata({
		title: 'Work',
		description: "Professional projects I've contributed to.",
		url: `${baseUrl}/work`,
	});
}

export default function Work() {
	return (
		<div>
			<section className='bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16'>
				<div className='container mx-auto flex max-w-3xl flex-col items-center justify-center text-center'>
					<AnimatedHeading className='mb-6'>
						Work <span className='opacity-50'>experience</span>
					</AnimatedHeading>
					<p className='max-w-xl text-sm opacity-80 md:text-base'>
						From fintech to AI to healthcare — projects I&apos;ve built from
						scratch and systems I&apos;ve taken over and improved.
					</p>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto max-w-4xl'>
					<StackedWorkCards items={workExperience} />
				</div>

			</section>
		</div>
	);
}
