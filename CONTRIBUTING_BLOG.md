# Writing a blog post

Posts live in `posts/` — no CMS, no database. Each post is a folder:

```
posts/2026-03-14-my-post-slug/README.md
```

## Folder name

`YYYY-MM-DD-your-slug` — the date sets the publish date and sort order.

## README format

```md
# Your Post Title

Author: [Franklin Udoagwa](https://github.com/frankudoags)

Tags: Engineering, AI

Description: One or two sentences shown on cards and in SEO metadata.

## Your content starts here...

Regular markdown: headings, lists, links, quotes, images, code.
```

- `Tags:` is comma-separated. Tags become filter pills automatically.
- The first `# Title`, `Author:`, `Tags:` and `Description:` lines are the
  frontmatter — everything after is the article body.

## Social image

After writing, generate the OG/card image:

```bash
bun run generate-social-image
```

This creates `public/blog/<slug>/social-media.png` (1280×720), used for
blog cards, Open Graph and Twitter cards.

## Check

```bash
bun run validate-blogs
```

Validates folder names, required frontmatter lines, and missing images.
