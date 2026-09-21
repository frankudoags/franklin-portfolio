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

## Series (optional)

To link posts with prev/next navigation, add after `Description:`:

```md
Series: React & React Native Internals
Part: 3
```

- Posts sharing a `Series:` name get a "Part X of N" card with
  Previous/Next links on their detail pages.
- Order comes from `Part:` (ascending). Posts without one sort by
  publish date after the numbered parts. Labels are always contiguous.
- Dates stay purely informational — reordering a series is just
  renumbering `Part:`.

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
