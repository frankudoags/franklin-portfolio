#!/usr/bin/env tsx

/**
 * Social image generator for Franklin's blog.
 *
 * Generates 1280x720 PNGs matching the site's minimal theme:
 * white bg, ink title, orange accent bar.
 *
 * Run with:
 *   bun lib/scripts/generate-social-image.ts --all   # (re)generate all
 *   bun lib/scripts/generate-social-image.ts          # generate missing only
 *
 * Output: public/blog/<YYYY-MM-DD-slug>/social-media.png
 */

import {
	createCanvas,
	GlobalFonts,
	loadImage,
	type SKRSContext2D,
} from '@napi-rs/canvas';
import * as fs from 'fs';
import * as path from 'path';

const ROOT_DIR = path.resolve(__dirname, '../..');
const POSTS_DIR = path.join(ROOT_DIR, 'posts');
const PUBLIC_BLOG_DIR = path.join(ROOT_DIR, 'public', 'blog');
const FONTS_DIR = path.join(ROOT_DIR, 'public', 'fonts');

const INK = '#131515';
const ACCENT = '#0EA5E9';
const ACCENT_2 = '#2B44F0';
const GRAY = '#6b7280';
const LIGHT_LINE = '#E5E5E0';

const W = 1280;
const H = 720;

try {
	if (fs.existsSync(FONTS_DIR)) GlobalFonts.loadFontsFromDir(FONTS_DIR);
} catch {
	console.log('Using system fonts');
}

type PostInfo = {
	title: string;
	author: string;
	formattedDate: string;
	slug: string;
};

function extractPostInfo(readmePath: string, folderName: string): PostInfo {
	const content = fs.readFileSync(readmePath, 'utf-8');
	const lines = content.split('\n');

	let title = '';
	let author = '';

	for (const line of lines) {
		const t = line.trim();
		if (t.startsWith('# ') && !title) title = t.substring(2).trim();
		else if (t.startsWith('Author:')) {
			const raw = t.substring('Author:'.length).trim();
			const m = raw.match(/\[([^\]]+)\]\(([^)]+)\)/);
			author = m ? m[1].trim() : raw.replace(/[\[\]]/g, '').trim();
		}
	}

	let formattedDate = '';
	const dateMatch = folderName.match(/^(\d{4}-\d{2}-\d{2})/);
	if (dateMatch) {
		const [y, m, d] = dateMatch[1].split('-').map(Number);
		formattedDate = new Date(y, m - 1, d).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}

	return { title, author, formattedDate, slug: folderName };
}

function wrapText(
	ctx: SKRSContext2D,
	text: string,
	maxWidth: number,
	maxLines = 3
): string[] {
	const words = text.split(' ');
	const lines: string[] = [];
	let cur = '';
	for (const w of words) {
		const t = cur ? `${cur} ${w}` : w;
		if (ctx.measureText(t).width > maxWidth && cur) {
			lines.push(cur);
			cur = w;
		} else {
			cur = t;
		}
	}
	if (cur) lines.push(cur);
	return lines.slice(0, maxLines);
}

async function generateForFolder(folderName: string): Promise<void> {
	const dir = path.join(POSTS_DIR, folderName);
	const readme = path.join(dir, 'README.md');
	if (!fs.existsSync(readme)) {
		console.log(`skip ${folderName}: no README.md`);
		return;
	}

	const outDir = path.join(PUBLIC_BLOG_DIR, folderName);
	const outPath = path.join(outDir, 'social-media.png');
	const regenAll = process.argv.includes('--all');
	if (fs.existsSync(outPath) && !regenAll) {
		console.log(`skip ${folderName}: already exists`);
		return;
	}

	const info = extractPostInfo(readme, folderName);
	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext('2d');

	// bg
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, W, H);

	// accent top bar
	ctx.fillStyle = ACCENT;
	ctx.fillRect(0, 0, W, 14);

	// faint corner mark
	ctx.fillStyle = ACCENT_2;
	ctx.globalAlpha = 0.12;
	ctx.font = '700 420px Inter, sans-serif';
	ctx.textAlign = 'right';
	ctx.textBaseline = 'bottom';
	ctx.fillText('F.', W - 40, H + 60);
	ctx.globalAlpha = 1;

	// eyebrow
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.font = '700 30px Inter, sans-serif';
	ctx.fillStyle = ACCENT;
	const eyebrow = `${info.formattedDate}${info.author ? `  •  ${info.author}` : ''}`.toUpperCase();
	ctx.fillText(eyebrow, 90, 120);

	// title
	ctx.font = '700 76px Inter, sans-serif';
	ctx.fillStyle = INK;
	const lines = wrapText(ctx, info.title || info.slug, W - 180);
	lines.forEach((line, i) => ctx.fillText(line, 90, 190 + i * 92));

	// bottom rule + brand
	const brandY = H - 110;
	ctx.fillStyle = LIGHT_LINE;
	ctx.fillRect(90, brandY - 34, W - 180, 2);
	ctx.font = '700 34px Inter, sans-serif';
	ctx.fillStyle = INK;
	ctx.fillText('Franklin Udoagwa', 90, brandY + 8);
	ctx.font = '400 30px Inter, sans-serif';
	ctx.fillStyle = GRAY;
	ctx.fillText('— blog', 90 + ctx.measureText('Franklin Udoagwa').width + 90, brandY + 8);

	// accent dot
	ctx.fillStyle = ACCENT;
	ctx.beginPath();
	ctx.arc(W - 110, brandY + 22, 16, 0, Math.PI * 2);
	ctx.fill();

	if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
	fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
	console.log(`generated ${path.relative(ROOT_DIR, outPath)}`);
}

/**
 * Site-wide fallback OG image: public/images/og-image.png
 */
async function generateSiteOgImage(): Promise<void> {
	const outPath = path.join(ROOT_DIR, 'public', 'images', 'og-image.png');
	if (fs.existsSync(outPath) && !process.argv.includes('--all')) {
		console.log('skip images/og-image.png: already exists');
		return;
	}

	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext('2d');

	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, W, H);

	ctx.fillStyle = ACCENT;
	ctx.fillRect(0, 0, W, 14);

	ctx.fillStyle = ACCENT_2;
	ctx.globalAlpha = 0.12;
	ctx.font = '700 420px Inter, sans-serif';
	ctx.textAlign = 'right';
	ctx.textBaseline = 'bottom';
	ctx.fillText('F.', W - 40, H + 60);
	ctx.globalAlpha = 1;

	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.font = '700 30px Inter, sans-serif';
	ctx.fillStyle = ACCENT;
	ctx.fillText('SENIOR ENGINEER — WEB • MOBILE • BACKEND • AI', 90, 150);

	ctx.font = '700 110px Inter, sans-serif';
	ctx.fillStyle = INK;
	ctx.fillText('Franklin', 90, 220);
	ctx.fillText('Udoagwa.', 90, 340);

	ctx.font = '400 32px Inter, sans-serif';
	ctx.fillStyle = GRAY;
	ctx.fillText('Building useful software. Writing what I learn.', 90, 500);

	ctx.fillStyle = ACCENT;
	ctx.beginPath();
	ctx.arc(W - 110, H - 88, 16, 0, Math.PI * 2);
	ctx.fill();

	const dir = path.dirname(outPath);
	if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
	fs.writeFileSync(outPath, canvas.toBuffer('image/png'));
	console.log(`generated ${path.relative(ROOT_DIR, outPath)}`);
}

async function main() {
	await generateSiteOgImage();

	if (!fs.existsSync(POSTS_DIR)) {
		console.error(`posts/ not found at ${POSTS_DIR}`);
		process.exit(1);
	}
	const folders = fs
		.readdirSync(POSTS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name)
		.filter((n) => /^\d{4}-\d{2}-\d{2}/.test(n))
		.sort()
		.reverse();

	for (const f of folders) {
		try {
			await generateForFolder(f);
		} catch (e) {
			console.error(`error ${f}:`, e);
		}
	}
	// silence unused import in some setups
	void loadImage;
}

main();
