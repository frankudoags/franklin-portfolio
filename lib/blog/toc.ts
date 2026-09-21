export function generateId(text: string): string {
	return text
		.toString()
		.toLowerCase()
		.trim()
		.replace(/\s+/g, '-')
		.replace(/&/g, '-and-')
		.replace(/[^\w\-]+/g, '')
		.replace(/\-\-+/g, '-');
}

export type Heading = {
	id: string;
	text: string;
	level: number;
};

export function extractHeadings(markdown: string): Heading[] {
	const regex = /^(#{2,3})\s+(.+)$/gm;
	const headings: Heading[] = [];
	let match: RegExpExecArray | null;
	while ((match = regex.exec(markdown)) !== null) {
		const level = match[1].length;
		const text = match[2].trim().replace(/[*_`#]/g, '');
		headings.push({ id: generateId(text), text, level });
	}
	return headings;
}

export function calculateReadTime(content: string, wpm = 200): number {
	const words = content.trim().split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.ceil(words / wpm));
}
