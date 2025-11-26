import Link from 'next/link';
import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import ProjectsPagination from '../../components/pagination/ProjectsPagination';

export function generateMetadata() {
	return metadata({
		title: 'Projects',
		description: 'Check out my projects.',
		url: `${baseUrl}/projects`,
	});
}

type Project = {
	name: string;
	tags: string[];
	url: string;
	isGithub?: boolean;
};

const projects: Project[] = [
	{
		name: 'Oyster Skincare Mobile App',
		tags: ['React Native', 'TypeScript', 'Product Engineering'],
		url: 'https://play.google.com/store/apps/details?id=com.oysterskin.app',
	},
	{
		name: 'Hydra EMR',
		tags: ['React', 'TypeScript', 'Healthcare', 'Frontend'],
		url: 'https://gethydra.io/',
	},
	{
		name: 'Konga Search Service (KSS)',
		tags: ['React', 'TypeScript', 'Search Engine', 'Frontend'],
		url: 'https://staging-kss.konga.com/',
	},
	{
		name: 'GidiCredit',
		tags: ['React', 'NestJS', 'TypeScript', 'MySQL', 'Fintech'],
		url: 'https://app.gidicredit.com.ng',
	},
	{
		name: 'Harmony Blockchain Explorer',
		tags: ['React', 'TypeScript', 'Blockchain', 'Hackathon'],
		url: 'https://harmony-tawny.vercel.app/',
		isGithub: true,
	},
	{
		name: 'Daovation DAO',
		tags: ['React', 'TypeScript', 'Web3', 'Cross-chain'],
		url: 'https://daovation.vercel.app/',
		isGithub: true,
	},
	{
		name: 'Varsi Creative Website',
		tags: ['Next.js', 'TypeScript', 'Creative'],
		url: 'https://tryvarsi.com',
	},
	{
		name: 'Reth Ethereum Client',
		tags: ['Rust', 'Ethereum', 'Open Source'],
		url: 'https://github.com/paradigmxyz/reth',
		isGithub: true,
	},
	{
		name: 'Alloy Ethereum SDK',
		tags: ['Rust', 'Ethereum', 'Open Source'],
		url: 'https://github.com/alloy-rs/alloy',
		isGithub: true,
	},
	{
		name: 'Viem TypeScript Ethereum',
		tags: ['TypeScript', 'Ethereum', 'Open Source'],
		url: 'https://github.com/wevm/viem',
		isGithub: true,
	},
];

export default function Projects() {
	return (
		<section>
			<div className='p-6'>
				<h1 className='mb-4 text-2xl font-semibold tracking-tighter text-black dark:text-white'>
					Projects
				</h1>

				<p className='mb-5 text-black dark:text-white text-sm'>
					Here are some of my personal and open-source projects:
				</p>

				<ProjectsPagination projects={projects} itemsPerPage={5} />

				<Link
					className='inline-flex items-center text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 text-sm font-medium underline px-2 py-1 transition-colors'
					href='https://github.com/frankudoags'
					target='_blank'
				>
					View all projects on GitHub
					<svg
						className='ml-1.5 w-4 h-4'
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M14 5l7 7m0 0l-7 7m7-7H3'
						/>
					</svg>
				</Link>
			</div>
		</section>
	);
}
