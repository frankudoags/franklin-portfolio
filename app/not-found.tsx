import Link from 'next/link';
import { Display } from 'components/ui/typography';
import { Button } from 'components/ui/button';

export default function NotFound() {
	return (
		<section className='bg-franklin-bone px-4 pb-20 pt-32 md:pt-40'>
			<div className='container mx-auto max-w-2xl rounded-[28px] border border-franklin-ink/10 bg-white p-10 text-center md:p-14'>
				<p className='font-display text-7xl font-medium tracking-[-0.04em] text-franklin-pine'>
					404
				</p>
				<Display className='mt-4 text-4xl md:text-5xl'>
					Lost<span className='opacity-50'>?</span>
				</Display>
				<p className='mx-auto mt-4 max-w-md opacity-70'>
					The page you are looking for does not exist. Let&apos;s get you
					back on track.
				</p>
				<Link href='/' className='mt-8 inline-block'>
					<Button variant='lime' className='lg:px-12'>
						Back home
					</Button>
				</Link>
			</div>
		</section>
	);
}
