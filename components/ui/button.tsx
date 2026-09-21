import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from 'lib/utils';

const buttonVariants = cva(
	'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[12px] text-sm font-semibold cursor-pointer transition-all duration-300 hover:scale-[98%] active:scale-[97%] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-franklin-pine/40',
	{
		variants: {
			variant: {
				lime: 'bg-franklin-lime text-white franklin-lime-shadow hover:bg-franklin-lime/90 py-3.5 px-6 rounded-[10px]',
				ink: 'bg-franklin-ink text-franklin-bone franklin-dark-shadow hover:bg-black py-3.5 px-6 rounded-[10px] dark:bg-franklin-bone dark:text-franklin-ink',
				outline:
					'border-2 border-franklin-ink/15 bg-transparent text-franklin-ink hover:border-franklin-ink/40 hover:bg-franklin-ink/5 py-3.5 px-6 rounded-[10px] dark:border-franklin-bone/20 dark:text-franklin-bone dark:hover:bg-franklin-bone/10',
				ghost:
					'bg-transparent text-franklin-bone hover:bg-white/10 py-3.5 px-6 rounded-[10px] border border-white/20',
				peach:
					'bg-franklin-peach text-franklin-ink franklin-lime-shadow hover:brightness-95 py-3.5 px-6 rounded-[10px]',
				lilac:
					'bg-franklin-lilac text-white franklin-lime-shadow hover:brightness-110 py-3.5 px-6 rounded-[10px]',
				link: 'text-franklin-pine underline-offset-4 hover:underline dark:text-franklin-lime p-0 h-auto rounded-none',
			},
			size: {
				default: 'h-12 px-5 py-2',
				sm: 'h-9 rounded-lg px-3.5 text-[13px]',
				lg: 'h-13 px-7 py-4 text-base',
				icon: 'size-10',
			},
		},
		defaultVariants: {
			variant: 'lime',
			size: 'default',
		},
	}
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
}

function Button({ className, variant, size, ...props }: ButtonProps) {
	return (
		<button
			data-slot='button'
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
