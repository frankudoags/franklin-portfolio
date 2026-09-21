import { getAllBlogPosts } from 'lib/blog/utils';

export const baseUrl = 'https://frankudoags.xyz';

export default async function sitemap() {
	const blogs = getAllBlogPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.date,
	}));

	const routes = ['', '/blog', '/work', '/projects', '/skills', '/contact'].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date().toISOString().split('T')[0],
		})
	);

	return [...routes, ...blogs];
}
