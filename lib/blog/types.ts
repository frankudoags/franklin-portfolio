export interface BlogAuthor {
	name: string;
	bio: string;
	url?: string;
	username: string;
}

export interface BlogPost {
	slug: string;
	title: string;
	description: string;
	author: BlogAuthor;
	tags: string[];
	date: string;
	formattedDate: string;
	readTime: number;
	socialImage?: string;
	content: string;
}

export interface BlogFrontmatter {
	title: string;
	author: string;
	tags: string;
	description: string;
}
