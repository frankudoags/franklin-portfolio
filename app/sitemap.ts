import { getAllBlogPosts, getAllSeries } from 'lib/blog/utils';

export const baseUrl = 'https://frankudoags.xyz';

export default async function sitemap() {
	const blogs = getAllBlogPosts().map((post) => ({
		url: `${baseUrl}/blog/${post.slug}`,
		lastModified: post.date,
	}));

	const series = getAllSeries().map((s) => ({
		url: `${baseUrl}/blog/series/${s.slug}`,
		lastModified: s.posts[0]?.date ?? new Date().toISOString().split('T')[0],
	}));

	const routes = ['', '/blog', '/work', '/projects', '/skills', '/contact'].map(
		(route) => ({
			url: `${baseUrl}${route}`,
			lastModified: new Date().toISOString().split('T')[0],
		})
	);

	return [...routes, ...blogs, ...series];
}
