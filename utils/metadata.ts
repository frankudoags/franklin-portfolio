import { baseUrl } from 'app/sitemap';

export function metadata({
	title,
	description,
	publishedTime,
	url,
	image,
}: {
	title: string;
	description: string;
	publishedTime?: string;
	url: string;
	image?: string;
}) {
	let ogImage = image ? image : `${baseUrl}/images/og-image.png`;

	return {
		title,
		description,
		openGraph: {
			title,
			description,
			type: 'article',
			publishedTime,
			url,
			images: [
				{
					url: ogImage,
				},
			],
		},
		twitter: {
			card: 'summary_large_image',
			title,
			description,
			images: [ogImage],
		},
	};
}
