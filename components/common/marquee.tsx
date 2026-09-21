import { cn } from 'lib/utils';

export default function Marquee({
	items,
	className,
	slow = false,
}: {
	items: string[];
	className?: string;
	slow?: boolean;
}) {
	const row = [...items, ...items];
	return (
		<div className={cn('relative overflow-hidden', className)}>
			<div
				className={cn(
					'flex w-max gap-3 pr-3',
					slow ? 'animate-marquee-slow' : 'animate-marquee'
				)}
			>
				{row.map((item, i) => (
					<span
						key={i}
						className='inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-franklin-ink/15 bg-white/70 px-4 py-2 text-sm font-semibold dark:border-franklin-bone/20 dark:bg-white/5'
					>
						<span className='size-1.5 rounded-full bg-franklin-pine dark:bg-franklin-lime' />
						{item}
					</span>
				))}
			</div>
		</div>
	);
}
