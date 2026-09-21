import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import AnimatedHeading from 'components/common/animated-heading';
import { Button } from 'components/ui/button';

export function generateMetadata() {
	return metadata({
		title: 'Contact',
		description: 'Contact me.',
		url: `${baseUrl}/contact`,
	});
}

const contactMethods = [
	{
		name: 'Email',
		handle: 'frankudoags@gmail.com',
		url: 'mailto:frankudoags@gmail.com',
	},
	{
		name: 'Phone',
		handle: '+234 9065233174',
		url: 'tel:+2349065233174',
	},
	{
		name: 'LinkedIn',
		handle: 'Udoagwa Franklin',
		url: 'https://www.linkedin.com/in/udoagwa-franklin',
	},
	{
		name: 'GitHub',
		handle: '@frankudoags',
		url: 'https://github.com/frankudoags',
	},
	{
		name: 'X (Twitter)',
		handle: '@frank_udoags',
		url: 'https://x.com/frank_udoags',
	},
];

export default function Contact() {
	return (
		<div>
			<section className='bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16'>
				<div className='container mx-auto flex max-w-3xl flex-col items-center justify-center text-center'>
					<AnimatedHeading className='mb-6'>
						Say <span className='opacity-50'>hello</span>
					</AnimatedHeading>
					<p className='max-w-xl text-sm opacity-80 md:text-base'>
						Have a great idea? Want to collaborate, talk shop, or just say
						hi? I usually reply within a day.
					</p>
				</div>
			</section>

			<section className='bg-franklin-bone px-4 pb-24 lg:pb-32'>
				<div className='container mx-auto max-w-3xl'>
					<div className='overflow-hidden rounded-[24px] border border-franklin-ink/10 bg-white'>
						{contactMethods.map((method, i) => (
							<a
								key={method.name}
								href={method.url}
								target={method.url.startsWith('http') ? '_blank' : undefined}
								className={`group flex items-center justify-between gap-4 px-7 py-6 transition-colors hover:bg-franklin-mist md:px-9 ${i !== 0 ? 'border-t border-franklin-ink/10' : ''}`}
							>
								<div className='min-w-0'>
									<p className='text-xs font-bold uppercase tracking-[0.18em] opacity-50'>
										{method.name}
									</p>
									<p className='font-display mt-1 truncate text-xl font-medium tracking-tight md:text-2xl'>
										{method.handle}
									</p>
								</div>
								<span className='grid size-11 shrink-0 place-items-center rounded-full border border-franklin-ink/15 text-lg transition-all duration-300 group-hover:border-franklin-ink group-hover:bg-franklin-ink group-hover:text-franklin-lime'>
									→
								</span>
							</a>
						))}
					</div>

					<div className='mt-12 rounded-[28px] bg-franklin-ink p-8 text-center text-white md:p-12'>
						<h2 className='font-display mx-auto max-w-xl text-3xl font-medium leading-[105%] md:text-4xl'>
							Prefer email? <span className='opacity-50'>My inbox is open.</span>
						</h2>
						<a href='mailto:frankudoags@gmail.com' className='mt-8 inline-block'>
							<Button variant='lime' className='lg:px-12'>
								frankudoags@gmail.com
							</Button>
						</a>
					</div>
				</div>
			</section>
		</div>
	);
}
