import './global.css';

import { GoogleAnalytics } from '@next/third-parties/google';

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

import { Navbar } from '../components/layout/nav';
import Footer from '../components/layout/footer';

const cx = (...classes) => classes.filter(Boolean).join(' ');

export const metadata = {
  metadataBase: new URL('https://frankudoags.xyz'),
  icons: {
    icon: [
      { url: '/favicon_io/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon_io/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: '/favicon_io/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/favicon_io/site.webmanifest' }
    ]
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
			className={cx(
				'text-black bg-white dark:text-white dark:bg-black',
				GeistSans.variable,
				GeistMono.variable
			)}
		>
			<body className='antialiased w-full max-w-2xl mx-auto px-4 mt-8'>
				<main className='flex-auto min-w-0 mt-6 flex flex-col'>
					<Navbar />
					{children}
					<Footer />
				</main>
			</body>

			<GoogleAnalytics gaId='' />
		</html>
	);
}
