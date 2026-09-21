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

const PORTRAIT_PATH = path.join(ROOT_DIR, 'public', 'images', 'me-square.png');
let portraitCache: import('@napi-rs/canvas').Image | null = null;

async function loadPortrait() {
	if (portraitCache) return portraitCache;
	if (!fs.existsSync(PORTRAIT_PATH)) return null;
	try {
		portraitCache = await loadImage(fs.readFileSync(PORTRAIT_PATH));
		return portraitCache;
	} catch {
		return null;
	}
}

function roundRectPath(
	ctx: SKRSContext2D,
	x: number,
	y: number,
	w: number,
	h: number,
	r: number
) {
	ctx.beginPath();
	ctx.moveTo(x + r, y);
	ctx.arcTo(x + w, y, x + w, y + h, r);
	ctx.arcTo(x + w, y + h, x, y + h, r);
	ctx.arcTo(x, y + h, x, y, r);
	ctx.arcTo(x, y, x + w, y, r);
	ctx.closePath();
}

/** Draws the portrait cover-cropped into a circle with an accent ring. */
function drawPortraitCircle(
	ctx: SKRSContext2D,
	img: import('@napi-rs/canvas').Image,
	cx: number,
	cy: number,
	r: number
) {
	// cover-crop: square source keeps the centered face intact
	const side = Math.min(img.width, img.height);
	const sx = (img.width - side) / 2;
	const sy = (img.height - side) / 2;

	const photoR = r - 4;
	ctx.save();
	ctx.beginPath();
	ctx.arc(cx, cy, photoR, 0, Math.PI * 2);
	ctx.clip();
	ctx.drawImage(img, sx, sy, side, side, cx - photoR, cy - photoR, photoR * 2, photoR * 2);
	ctx.restore();

	// single accent ring flush with the photo edge — soft transparent alpha
	ctx.strokeStyle = ACCENT;
	ctx.globalAlpha = 0.16;
	ctx.lineWidth = 14;
	ctx.beginPath();
	ctx.arc(cx, cy, r, 0, Math.PI * 2);
	ctx.stroke();
	ctx.globalAlpha = 1;
}

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
	const portrait = await loadPortrait();
	const canvas = createCanvas(W, H);
	const ctx = canvas.getContext('2d');

	// bg
	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, W, H);

	// accent top bar
	const hasPortrait = !!portrait;
	const textMaxW = hasPortrait ? 730 : W - 180;

	// eyebrow
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.font = '700 28px Inter, sans-serif';
	ctx.fillStyle = ACCENT;
	const eyebrow = `${info.formattedDate}${info.author ? `  •  ${info.author}` : ''}`;
	ctx.fillText(eyebrow, 90, 110);

	// title
	ctx.font = '700 72px Inter, sans-serif';
	ctx.fillStyle = INK;
	const lines = wrapText(ctx, info.title || info.slug, textMaxW);
	lines.forEach((line, i) => ctx.fillText(line, 90, 175 + i * 88));

	// portrait panel
	if (portrait) {
		drawPortraitCircle(ctx, portrait, 1040, 350, 200);
	}



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
	const portrait = await loadPortrait();
	const hasPortrait = !!portrait;
	const textMaxW = hasPortrait ? 730 : W - 180;

	ctx.fillStyle = '#FFFFFF';
	ctx.fillRect(0, 0, W, H);

	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.font = '700 30px Inter, sans-serif';
	ctx.fillStyle = ACCENT;
	ctx.fillText('SENIOR ENGINEER — WEB • MOBILE • BACKEND • AI', 90, 140);

	ctx.font = '700 104px Inter, sans-serif';
	ctx.fillStyle = INK;
	const nameLines = wrapText(ctx, 'Franklin Udoagwa.', textMaxW, 2);
	nameLines.forEach((line, i) => ctx.fillText(line, 90, 205 + i * 120));

	ctx.font = '400 32px Inter, sans-serif';
	ctx.fillStyle = GRAY;
	const tagline = 'Building useful software. Writing what I learn.';
	wrapText(ctx, tagline, textMaxW, 2).forEach((line, i) =>
		ctx.fillText(line, 90, 205 + nameLines.length * 120 + 12 + i * 44)
	);

	if (portrait) {
		drawPortraitCircle(ctx, portrait, 1040, 350, 200);
	}

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
