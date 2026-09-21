export type AppLink = {
	label: string;
	href: string;
};

export const OYSTER_LINKS: AppLink[] = [
	{
		label: 'App Store',
		href: 'https://apps.apple.com/ng/app/oyster-skincare/id6753137409',
	},
	{
		label: 'Play Store',
		href: 'https://play.google.com/store/apps/details?id=com.oysterai.Oyster',
	},
];

export type WorkItem = {
	project: string;
	company: string;
	period: string;
	techStack: string[];
	description: string;
	role: string;
	impact: string;
	access: string;
	url: string;
	links?: AppLink[];
};

export const workExperience: WorkItem[] = [
	{
		project: 'GTCO Digital Banking Platform',
		company: 'Revent Technologies',
		period: 'Aug 2026 — Present',
		techStack: ['React', 'React Native', 'TypeScript', 'Fintech'],
		description:
			'Leading frontend development for Guaranty Trust Holding Company (GTCO) digital banking — target savings, flexible savings, cards, transfers, bill payments, loans and more.',
		role: 'Senior Frontend Engineer — Building and shipping web, mobile and backend features, contributing to app architecture, reusable components and production-quality releases.',
		impact:
			'Reliable, scalable banking experiences across GTCO ecosystem with product, design and backend teams.',
		access: 'Enterprise',
		url: 'https://www.linkedin.com/in/udoagwa-franklin',
	},
	{
		project: 'Ask Oyster — Agentic AI Skincare Assistant',
		company: 'Oyster Skin Technologies',
		period: 'Apr 2025 — Aug 2026',
		techStack: ['Vercel AI SDK', 'Tool Calling', 'RAG', 'TypeScript'],
		description:
			'Agentic AI skincare assistant on the Vercel AI SDK against a custom tool-calling backend — multi-turn LLM function calling (product search, RAG knowledge, routine generation, conversational memory) across multiple LLM providers, rendered as product cards, routines and citations via useChat tool UI states.',
		role: 'Product Engineer (Web + Mobile) — Owned frontend architecture and standards across mobile app, vendor web app, waitlist site and main website.',
		impact: 'Shipped AI-first commerce UX: chat, routines, citations and multi-provider orchestration.',
		access: 'Publicly available',
		url: 'https://play.google.com/store/apps/details?id=com.oysterai.Oyster',
		links: OYSTER_LINKS,
	},
	{
		project: 'Oyster Mobile + Vendor Apps + AI Voice & Scan',
		company: 'Oyster Skin Technologies',
		period: 'Apr 2025 — Aug 2026',
		techStack: ['React Native', 'WebSocket', 'Vision Models', 'AI SDK'],
		description:
			'Led end-to-end design and development of the mobile app, vendor web app, waitlist and main site. Built "Ask Your Model" natural-language BI chat for vendors (streaming metrics via AI SDK data-stream protocol with tool-call progress + follow-ups). Built real-time AI voice agent in the Oyster Widget (WebSocket + AudioWorklet PCM capture, VAD/gating — identify customer, create order, generate payment link). Shipped AI Skin Scan + Product Scan (multi-image face analysis, 3-tier product ID, fit scores, allergen warnings) across mobile, web and widget.',
		role: 'Product Engineer — Sole/lead engineer across surfaces, wiring scan and voice UIs to vision-model outputs and semantic product search.',
		impact: '1000+ downloads on launch. Established frontend architecture used company-wide.',
		access: 'Publicly available',
		url: 'https://play.google.com/store/apps/details?id=com.oysterai.Oyster',
		links: OYSTER_LINKS,
	},
	{
		project: 'Konga Search Service (KSS)',
		company: 'Konga Online Shopping Ltd.',
		period: 'Sept 2024 — Apr 2025',
		techStack: ['React', 'TypeScript', 'AI Search', 'Streaming'],
		description:
			'Search and indexing platform that replaced Algolia for 1M+ records at sub-500ms — RBAC, faceted search, real-time filtering, pagination. Built AI-powered search and discovery interfaces on top (agent/tool-call APIs + streaming for natural-language discovery, recommendations, contextual search).',
		role: 'Frontend Engineer — Led frontend in a lean 3-person team. Owned architecture, state management and component patterns.',
		impact: 'Saved $75,000 in search/indexing operational costs.',
		access: 'Internal platform',
		url: 'https://staging-kss.konga.com/',
	},
	{
		project: 'Hydra EMR Platform',
		company: 'Afrihealth',
		period: 'Sept 2022 — Oct 2024',
		techStack: ['React', 'React Native', 'TypeScript', 'Healthcare'],
		description:
			'EMR platform adopted by 100+ hospitals. Built scalable React + TypeScript clinical workflow UIs plus AI-assisted healthcare workflows (LLMs + tool calling for patient data retrieval and clinical tasks). Maintained the React Native app (REST APIs, auth, onboarding, push, analytics, crash reporting).',
		role: 'Software Engineer — Led frontend. Performance via memoization, lazy loading, virtualized lists, reusable abstractions, upgrades and RN optimizations.',
		impact: 'Lower onboarding friction for clinical staff across 100+ hospitals.',
		access: 'Publicly available',
		url: 'https://gethydra.io/',
	},
];

export type Project = {
	name: string;
	tags: string[];
	url: string;
	description: string;
	isGithub?: boolean;
	links?: AppLink[];
};

export const projects: Project[] = [
	{
		name: 'Ask Oyster — AI Skincare Assistant',
		tags: ['Vercel AI SDK', 'RAG', 'Tool Calling'],
		url: 'https://play.google.com/store/apps/details?id=com.oysterai.Oyster',
		description:
			'Agentic assistant with product search, RAG knowledge, routine generation and memory across LLM providers.',
		links: OYSTER_LINKS,
	},
	{
		name: 'Oyster Skincare Mobile App',
		tags: ['React Native', 'TypeScript', 'AI'],
		url: 'https://play.google.com/store/apps/details?id=com.oysterai.Oyster',
		description:
			'End-to-end mobile app — Skin Scan, Product Scan, voice agent, builds + store releases, 1000+ launch downloads.',
		links: OYSTER_LINKS,
	},
	{
		name: 'GTCO Digital Banking (Revent)',
		tags: ['React', 'React Native', 'Fintech'],
		url: 'https://www.linkedin.com/in/udoagwa-franklin',
		description:
			'Savings, cards, transfers, bills, loans — web + mobile banking experiences at GTCO scale.',
	},
	{
		name: 'Konga Search Service (KSS)',
		tags: ['React', 'TypeScript', 'AI Search'],
		url: 'https://staging-kss.konga.com/',
		description:
			'Algolia replacement: 1M+ records <500ms, faceted + AI natural-language discovery. Saved $75k.',
	},
	{
		name: 'Hydra EMR',
		tags: ['React', 'TypeScript', 'Healthcare'],
		url: 'https://gethydra.io/',
		description:
			'EMR in 100+ hospitals + AI-assisted clinical workflows via LLMs and tool calling.',
	},
	{
		name: 'GidiCredit',
		tags: ['React', 'NestJS', 'Fintech'],
		url: 'https://app.gidicredit.com.ng',
		description:
			'Fullstack investment + lending platform with portfolios and transactions.',
	},
	{
		name: 'Varsi Creative Website',
		tags: ['Next.js', 'TypeScript', 'Creative'],
		url: 'https://tryvarsi.com',
		description: 'Fancy marketing site with GSAP motion and custom design system.',
	},
	{
		name: 'Reth Ethereum Client',
		tags: ['Rust', 'Ethereum', 'OSS'],
		url: 'https://github.com/paradigmxyz/reth',
		description: 'Performant Rust Ethereum full node.',
		isGithub: true,
	},
	{
		name: 'Alloy Ethereum SDK',
		tags: ['Rust', 'Ethereum', 'OSS'],
		url: 'https://github.com/alloy-rs/alloy',
		description: 'Rust toolkit for Ethereum/EVM development.',
		isGithub: true,
	},
	{
		name: 'REVM — Rust EVM',
		tags: ['Rust', 'Ethereum', 'OSS'],
		url: 'https://github.com/bluealloy/revm',
		description: 'Rust Ethereum Virtual Machine contributions.',
		isGithub: true,
	},
	{
		name: 'Viem TypeScript Ethereum',
		tags: ['TypeScript', 'Ethereum', 'OSS'],
		url: 'https://github.com/wevm/viem',
		description: 'TypeScript Ethereum library contributions.',
		isGithub: true,
	},
];

export const skillCategories = [
	{
		title: 'Languages',
		skills: ['TypeScript', 'Rust', 'Python', 'SQL', 'C++', 'Swift', 'Kotlin'],
	},
	{
		title: 'Frontend / Mobile',
		skills: [
			'React',
			'React Native',
			'Expo',
			'Next.js',
			'Redux',
			'Zustand',
			'React Query',
			'React Navigation',
			'Reanimated',
			'Nitro Modules',
			'TailwindCSS',
			'MMKV',
			'Firebase',
			'Sentry',
			'RevenueCat',
			'OTA Updates',
			'Push Notifications',
			'Deep Linking',
			'EAS',
			'App Store Connect',
			'Google Play Console',
		],
	},
	{
		title: 'Backend',
		skills: [
			'Node.js',
			'Express',
			'NestJS',
			'FastAPI',
			'Axum',
			'PostgreSQL',
			'MySQL',
		],
	},
	{
		title: 'Cloud & DevOps',
		skills: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Railway', 'Hetzner', 'Linux', 'Git', 'CI/CD', 'Shell Scripting'],
	},
	{
		title: 'AI Engineering',
		skills: [
			'Vercel AI SDK',
			'Tool Calling',
			'RAG Pipelines',
			'MCP Servers',
			'Vector Search',
			'Embeddings',
			'Prompt Engineering',
			'Voice Agents',
			'Vision Models',
			'Streaming UIs',
			'Multi-LLM Orchestration',
		],
	},
	{
		title: 'Blockchain',
		skills: [
			'Ethereum',
			'Smart Contracts',
			'Security Research',
			'Viem',
			'Alloy',
			'Web3',
		],
	},
	{
		title: 'Agentic Coding',
		skills: [
			'Cursor',
			'Claude Code',
			'GitHub Copilot',
			'Windsurf',
			'v0',
			'Aider',
			'Spec-Driven Development',
		],
	},
];

export const marqueeSkills = [
	'TypeScript',
	'React',
	'React Native',
	'Expo',
	'Vercel AI SDK',
	'Tool Calling',
	'RAG',
	'Rust',
	'Node.js',
	'Ethereum',
	'PostgreSQL',
	'Tailwind CSS',
	'Reanimated',
	'Docker',
	'AWS',
];

export const education = {
	school: 'University of Lagos',
	degree: 'Bachelors of Engineering — Electrical & Electronics Engineering',
};

export const leadership = [
	'General Secretary, Society of Electrical and Electronics Engineering, UNILAG',
	'Volleyball Team Captain — Finalists, SEEE, UNILAG',
	'NNPC/TOTAL National Merit Undergraduate Scholarship (2019)',
	'Petroleum Technology Development Fund (PTDF) Scholarship (2019)',
];

export const contactInfo = {
	phone: '+234 9065233174',
	email: 'frankudoags@gmail.com',
	linkedin: 'https://www.linkedin.com/in/udoagwa-franklin',
	github: 'https://github.com/frankudoags',
};
