import './global.css';

import { GoogleAnalytics } from '@next/third-parties/google';
import { Bricolage_Grotesque, Inter_Tight } from 'next/font/google';

import { Navbar } from '../components/layout/nav';
import Footer from '../components/layout/footer';
import SmoothScroll from '../components/common/smooth-scroll';
import RevealManager from '../components/common/reveal-manager';
import IntroLoader from '../components/common/intro-loader';
import AccentPicker from '../components/common/accent-picker';

const display = Bricolage_Grotesque({
	subsets: ['latin'],
	variable: '--font-display',
	display: 'swap',
});

const body = Inter_Tight({
	subsets: ['latin'],
	variable: '--font-body',
	display: 'swap',
});

const cx = (...classes: Array<string | false | undefined>) =>
	classes.filter(Boolean).join(' ');

export const metadata = {
	metadataBase: new URL('https://frankudoags.xyz'),
	title: {
		default: "Franklin Udoagwa — Senior Frontend Engineer",
		template: '%s | Franklin Udoagwa',
	},
	description:
		'Franklin Udoagwa — Senior Frontend Engineer (React, React Native, TypeScript) building AI-powered web, mobile, backend and fintech experiences.',
	icons: {
		icon: [
			{ url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
			{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
		],
		apple: '/apple-touch-icon.png',
		other: [{ rel: 'manifest', url: '/manifest.webmanifest' }],
	},
	openGraph: {
		title: 'Franklin Udoagwa — Senior Frontend Engineer',
		description:
			'AI-powered web, mobile, backend and fintech experiences. React, React Native, TypeScript. Writing what I learn.',
		url: 'https://frankudoags.xyz',
		siteName: 'Franklin Udoagwa',
		images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Franklin Udoagwa — Senior Frontend Engineer',
		description: 'AI-powered web, mobile, backend and fintech. Writing what I learn.',
		images: ['/images/og-image.png'],
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			className={cx(display.variable, body.variable)}
			suppressHydrationWarning
		>
			<body className='antialiased'>
				<SmoothScroll>
					<IntroLoader />
					<RevealManager />
					<AccentPicker />
					<main className='flex min-h-screen flex-col'>
						<Navbar />
						<div className='flex-1'>{children}</div>
						<Footer />
					</main>
				</SmoothScroll>
				<GoogleAnalytics gaId='' />
			</body>
		</html>
	);
}
