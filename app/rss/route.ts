import { baseUrl } from 'app/sitemap';
import { getAllBlogPosts } from 'lib/blog/utils';

function escapeXml(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET() {
	const allBlogs = getAllBlogPosts();

	const itemsXml = allBlogs
		.map(
			(post) =>
				`<item>
          <title>${escapeXml(post.title)}</title>
          <link>${baseUrl}/blog/${post.slug}</link>
          <description>${escapeXml(post.description || '')}</description>
          <pubDate>${new Date(`${post.date}T00:00:00`).toUTCString()}</pubDate>
        </item>`
		)
		.join('\n');

	const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>Franklin Udoagwa — Blog</title>
        <link>${baseUrl}/blog</link>
        <description>Engineering notes and lessons from shipping real products.</description>
        ${itemsXml}
    </channel>
  </rss>`;

	return new Response(rssFeed, {
		headers: {
			'Content-Type': 'text/xml',
		},
	});
}
