import fs from 'fs';
import path from 'path';
import type { BlogFrontmatter, BlogPost } from './types';
import { AUTHORS } from './authors';
import { calculateReadTime, generateId } from './toc';

const PROJECT_ROOT = process.cwd();
const POSTS_DIR = path.join(PROJECT_ROOT, 'posts');

export function getAllBlogSlugs(): string[] {
	if (!fs.existsSync(POSTS_DIR)) return [];
	return fs
		.readdirSync(POSTS_DIR, { withFileTypes: true })
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name)
		.filter((name) => /^(\d{4}-\d{2}-\d{2})/.test(name))
		.sort((a, b) => b.localeCompare(a));
}

export function parseFrontmatter(content: string): BlogFrontmatter {
	const lines = content.split('\n');
	const frontmatter: BlogFrontmatter = {
		title: '',
		author: '',
		tags: '',
		description: '',
		series: '',
	};
	let inFrontmatter = false;
	let consecutiveEmptyLines = 0;

	for (let i = 0; i < Math.min(lines.length, 20); i++) {
		const line = lines[i].trim();
		if (line.startsWith('# ')) {
			frontmatter.title = line.substring(2).trim();
			inFrontmatter = true;
			consecutiveEmptyLines = 0;
			continue;
		}
		if (!inFrontmatter) continue;
		if (line === '') {
			consecutiveEmptyLines++;
			if (
				consecutiveEmptyLines >= 2 &&
				(frontmatter.author || frontmatter.tags || frontmatter.description)
			)
				break;
			continue;
		}
		consecutiveEmptyLines = 0;
		if (line.startsWith('Author:'))
			frontmatter.author = line.substring('Author:'.length).trim();
		else if (line.startsWith('Tags:'))
			frontmatter.tags = line.substring('Tags:'.length).trim();
		else if (line.startsWith('Description:'))
			frontmatter.description = line.substring('Description:'.length).trim();
		else if (line.startsWith('Series:'))
			frontmatter.series = line.substring('Series:'.length).trim();
		else if (line.startsWith('Part:'))
			frontmatter.part = line.substring('Part:'.length).trim();
	}
	return frontmatter;
}

export function extractAuthorInfo(authorLine: string): {
	name: string;
	url?: string;
} {
	const match = authorLine.match(/\[([^\]]+)\]\(([^)]+)\)/);
	if (match) return { name: match[1].trim(), url: match[2].trim() };
	return { name: authorLine.replace(/[\[\]]/g, '').trim() };
}

export function getAllTags(): string[] {
	const posts = getAllBlogPosts();
	const tags = new Set<string>();
	for (const post of posts) for (const tag of post.tags) tags.add(tag);
	return Array.from(tags).sort();
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
	const postDir = path.join(POSTS_DIR, slug);
	const readmePath = path.join(postDir, 'README.md');
	if (!fs.existsSync(readmePath)) return null;

	const content = fs.readFileSync(readmePath, 'utf-8');
	const frontmatter = parseFrontmatter(content);

	const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
	const date = dateMatch ? dateMatch[1] : '';
	const formattedDate = date
		? new Date(`${date}T00:00:00`).toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric',
		  })
		: '';

	const authorInfo = extractAuthorInfo(frontmatter.author);
	let authorKey = authorInfo.url
		? authorInfo.url.split('/').pop() || ''
		: authorInfo.name;
	if (!AUTHORS[authorKey] && AUTHORS[authorInfo.name])
		authorKey = authorInfo.name;
	const authorData = AUTHORS[authorKey] || {
		authorName: authorInfo.name,
		authorBio: '',
	};

	const tagsArray = frontmatter.tags
		? frontmatter.tags
				.split(',')
				.map((t) => t.trim())
				.filter(Boolean)
		: [];

	const contentLines = content.split('\n');
	let contentStart = 0;
	for (let i = 0; i < contentLines.length; i++) {
		const line = contentLines[i].trim();
		if (i === 0 && line.startsWith('# ')) continue;
		if (line.startsWith('Author:')) continue;
		if (line.startsWith('Tags:')) continue;
		if (line.startsWith('Description:')) continue;
		if (line.startsWith('Series:')) continue;
		if (line.startsWith('Part:')) continue;
		if (line === '') continue;
		contentStart = i;
		break;
	}
	const rawContent = contentLines.slice(contentStart).join('\n').trim();

	return {
		slug,
		title: frontmatter.title,
		description: frontmatter.description,
		author: {
			name: authorData.authorName,
			bio: authorData.authorBio,
			url: authorInfo.url,
			username: authorKey,
		},
		tags: tagsArray,
		date,
		formattedDate,
		readTime: calculateReadTime(rawContent),
		socialImage: `/blog/${slug}/social-media.png`,
		content: rawContent,
		series: frontmatter.series || undefined,
		part: frontmatter.part ? parseInt(frontmatter.part, 10) || undefined : undefined,
	};
}

export function getAllBlogPosts(): BlogPost[] {
	const slugs = getAllBlogSlugs();
	const posts: BlogPost[] = [];
	for (const slug of slugs) {
		const post = getBlogPostBySlug(slug);
		if (post) posts.push(post);
	}
	return posts;
}

export type SeriesNav = {
	series: string;
	seriesSlug: string;
	part: number;
	total: number;
	prev: BlogPost | null; // older post in the series
	next: BlogPost | null; // newer post in the series
};

export function seriesSlug(name: string): string {
	return generateId(name);
}

/** All series with their posts ordered by Part (then date). */
export function getAllSeries(): Array<{
	name: string;
	slug: string;
	posts: BlogPost[];
}> {
	const byName = new Map<string, BlogPost[]>();
	for (const post of getAllBlogPosts()) {
		if (!post.series) continue;
		const list = byName.get(post.series) ?? [];
		list.push(post);
		byName.set(post.series, list);
	}
	const sortParts = (a: BlogPost, b: BlogPost) => {
		const ap = a.part ?? Number.POSITIVE_INFINITY;
		const bp = b.part ?? Number.POSITIVE_INFINITY;
		if (ap !== bp) return ap - bp;
		return a.date < b.date ? -1 : 1;
	};
	return Array.from(byName.entries()).map(([name, posts]) => ({
		name,
		slug: seriesSlug(name),
		posts: posts.sort(sortParts),
	}));
}

export function getSeriesBySlug(slug: string) {
	return getAllSeries().find((s) => s.slug === slug) ?? null;
}

/**
 * Prev/next navigation within a post's series.
 * Parts are ordered by explicit `Part:` frontmatter (ascending);
 * posts without one sort by publish date after numbered parts.
 * Labels are always contiguous (1..N) based on final position.
 */
export function getSeriesNav(slug: string): SeriesNav | null {
	const post = getBlogPostBySlug(slug);
	if (!post?.series) return null;

	const seriesPosts = getAllBlogPosts()
		.filter((p) => p.series === post.series)
		.sort((a, b) => {
			const ap = a.part ?? Number.POSITIVE_INFINITY;
			const bp = b.part ?? Number.POSITIVE_INFINITY;
			if (ap !== bp) return ap - bp;
			return a.date < b.date ? -1 : 1;
		});

	const index = seriesPosts.findIndex((p) => p.slug === slug);
	if (index === -1) return null;

	return {
		series: post.series,
		seriesSlug: seriesSlug(post.series),
		part: index + 1,
		total: seriesPosts.length,
		prev: index > 0 ? seriesPosts[index - 1] : null,
		next: index < seriesPosts.length - 1 ? seriesPosts[index + 1] : null,
	};
}

// Back-compat for old components (to be removed)
export function getBlogPosts() {
	return getAllBlogPosts().map((p) => ({
		slug: p.slug,
		metadata: {
			title: p.title,
			publishedAt: p.date,
			summary: p.description,
			image: p.socialImage,
		},
		content: p.content,
	}));
}

export function formatDate(date: string, includeRelative = false) {
	if (!date) return '';
	const targetDate = new Date(`${date}T00:00:00`);
	const fullDate = targetDate.toLocaleString('en-us', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	});
	if (!includeRelative) return fullDate;

	const currentDate = new Date();
	const diffDays = Math.floor(
		(currentDate.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	if (diffDays <= 0) return `${fullDate} (Today)`;
	if (diffDays < 30) return `${fullDate} (${diffDays}d ago)`;
	const months = Math.floor(diffDays / 30);
	if (months < 12) return `${fullDate} (${months}mo ago)`;
	return `${fullDate} (${Math.floor(months / 12)}y ago)`;
}
