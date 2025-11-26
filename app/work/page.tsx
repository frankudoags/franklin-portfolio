import Link from 'next/link';
import { baseUrl } from 'app/sitemap';
import { metadata } from 'utils/metadata';
import WorkPagination from '../../components/pagination/WorkPagination';

export function generateMetadata() {
	return metadata({
		title: 'Work',
		description: "Professional projects I've contributed to.",
		url: `${baseUrl}/work`,
	});
}

const workExperience = [
	{
		project: 'Oyster Mobile Application',
		company: 'Oyster Skin Technologies',
		techStack: ['React Native', 'TypeScript', 'Product Engineering'],
		description:
			'Sole engineer responsible for architecting and delivering the entire Oyster mobile application, including build systems, release processes, and successful deployments to App Store and Play Store.',
		role: 'Product Engineer - Led end-to-end design and development, worked closely with founders, product, design, and ML teams to drive rapid iteration and translate business needs into technical decisions.',
		impact:
			'Achieved 1000+ downloads on launch, established frontend architecture and standards used across the company.',
		access: 'Publicly available',
		url: 'https://play.google.com/store/apps/details?id=com.oysterskin.app',
	},
	{
		project: 'Konga Search Service (KSS)',
		company: 'Konga Online Shopping Ltd.',
		techStack: ['React', 'TypeScript', 'Next.js', 'Frontend Engineering'],
		description:
			'A search and indexing platform that replaced Algolia, designed to handle 1M+ records under 500ms latency with advanced features including RBAC, faceted search, and real-time filtering.',
		role: 'Frontend Engineer - Led frontend engineering in a 3-person team, architected overall frontend architecture, defined state management strategy and component design patterns.',
		impact:
			'Reduced search and indexing operational costs by 70%, established engineering best practices including unit/integration tests and performance optimization.',
		access: 'Internal platform',
		url: 'https://staging-kss.konga.com/',
	},
	{
		project: 'Hydra EMR Platform',
		company: 'Afrihealth',
		techStack: ['React', 'TypeScript', 'Frontend Development', 'Healthcare'],
		description:
			'An electronic medical record (EMR) platform adopted by 100+ hospitals, providing an intuitive interface for doctors, nurses, and administrators.',
		role: 'Software Engineer - Led frontend development, designed scalable UI flows for patient registration, online consultations, and hospital workflows.',
		impact:
			'Reduced onboarding friction for medical staff, improved SQL query latency by 50% through efficient data-fetching strategies.',
		access: 'Publicly available',
		url: 'https://gethydra.io/',
	},
	{
		project: 'GidiCredit Investment Platform',
		company: 'GidiCredit',
		techStack: ['React', 'NestJS', 'TypeScript', 'MySQL', 'Fullstack Development'],
		description:
			'An Investment and Lending platform providing financial services and investment opportunities.',
		role: 'Fullstack Developer - Built complete application from frontend to backend, designed database architecture and implemented business logic.',
		impact:
			'Created a fully functional investment platform with user authentication, transaction processing, and portfolio management.',
		access: 'Publicly available',
		url: 'https://app.gidicredit.com.ng',
	},
	{
		project: 'Reth Ethereum Client',
		company: 'Open Source Contribution',
		techStack: ['Rust', 'Ethereum', 'Blockchain'],
		description:
			'Rust Ethereum full node implementation - one of the most performant Ethereum clients in the ecosystem.',
		role: 'Open Source Contributor - Contributed to core Ethereum infrastructure, improving client performance and reliability.',
		impact:
			'Enhanced Ethereum ecosystem with robust client implementation, benefiting thousands of developers and users.',
		access: 'Open Source',
		url: 'https://github.com/paradigmxyz/reth',
	},
	{
		project: 'Alloy Ethereum SDK',
		company: 'Open Source Contribution',
		techStack: ['Rust', 'Ethereum', 'Developer Tools'],
		description:
			'High-performance Rust toolkit for Ethereum and EVM-based blockchains, providing essential utilities for Ethereum development.',
		role: 'Open Source Contributor - Enhanced SDK functionality and performance for Ethereum developers.',
		impact:
			'Improved developer experience for building Ethereum applications with Rust.',
		access: 'Open Source',
		url: 'https://github.com/alloy-rs/alloy',
	},
];

export default function Work() {
	return (
		<section>
			<div className='p-6'>
				<h1 className='mb-4 text-2xl font-semibold tracking-tighter text-black dark:text-white'>
					Work
				</h1>

				<div className='mb-8 prose dark:prose-invert'>
					<p className='text-black dark:text-white'>
						Below is a selection of professional projects I've worked on
						throughout my career. This portfolio includes both projects I've
						built from scratch and existing systems I've taken over to improve
						and maintain. Each project showcases different aspects of my
						technical skills and problem-solving approach.
					</p>
				</div>

				<WorkPagination workExperience={workExperience} itemsPerPage={3} />

				<div className='mt-8 mb-4'>
					<p className='text-black dark:text-white'>
						Additional work details available upon request.
					</p>
				</div>
			</div>
		</section>
	);
}