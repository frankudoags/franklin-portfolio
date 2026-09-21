#!/usr/bin/env tsx

/**
 * Validates every post in posts/ follows the required format.
 * Run with: bun run validate-blogs
 *
 * Rules:
 * - Folder must be named YYYY-MM-DD-slug
 * - Must contain README.md
 * - README must start with `# Title`
 * - Must include Author:, Tags: and Description: lines near the top
 */

import * as fs from 'fs';
import * as path from 'path';

const POSTS_DIR = path.resolve(__dirname, '../../posts');

let errors = 0;

function fail(slug: string, msg: string) {
	errors++;
	console.error(`✗ ${slug}: ${msg}`);
}

function main() {
	if (!fs.existsSync(POSTS_DIR)) {
		console.error('posts/ directory not found');
		process.exit(1);
	}

	const folders = fs
		.readdirSync(POSTS_DIR, { withFileTypes: true })
		.filter((d) => d.isDirectory())
		.map((d) => d.name);

	if (folders.length === 0) console.log('No posts yet — nothing to validate.');

	for (const folder of folders) {
		if (!/^\d{4}-\d{2}-\d{2}-.+/.test(folder)) {
			fail(folder, 'folder must be named YYYY-MM-DD-slug');
			continue;
		}
		const readme = path.join(POSTS_DIR, folder, 'README.md');
		if (!fs.existsSync(readme)) {
			fail(folder, 'missing README.md');
			continue;
		}
		const content = fs.readFileSync(readme, 'utf-8');
		const head = content.split('\n').slice(0, 20).join('\n');

		if (!/^# .+/m.test(head)) fail(folder, 'missing `# Title` first line');
		if (!/^Author:/m.test(head)) fail(folder, 'missing `Author:` line');
		if (!/^Tags:/m.test(head)) fail(folder, 'missing `Tags:` line');
		if (!/^Description:/m.test(head))
			fail(folder, 'missing `Description:` line');

		const partMatch = head.match(/^Part:\s*(.+)$/m);
		if (partMatch && !/^\d+$/.test(partMatch[1].trim())) {
			fail(folder, '`Part:` must be a plain number');
		}

		const social = path.join(POSTS_DIR, '..', 'public', 'blog', folder, 'social-media.png');
		if (!fs.existsSync(social)) {
			console.warn(`! ${folder}: no social-media.png — run bun run generate-social-image`);
		}
	}

	if (errors > 0) {
		console.error(`\n${errors} blog error(s) found.`);
		process.exit(1);
	}
	console.log('All blog posts valid ✓');
}

main();
