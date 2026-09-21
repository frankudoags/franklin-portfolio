import Link from "next/link";
import { baseUrl } from "app/sitemap";
import { metadata } from "utils/metadata";
import AnimatedHeading from "components/common/animated-heading";
import ShuffleDeck, { DeckCard } from "components/common/shuffle-deck";
import { BlogListClient } from "components/blog/blog-ui";
import { getAllBlogPosts, getAllSeries, getAllTags } from "lib/blog/utils";

export function generateMetadata() {
  return metadata({
    title: "Blog",
    description:
      "Engineering deep-dives, Ethereum notes and lessons from shipping real products.",
    url: `${baseUrl}/blog`,
  });
}

export default function Page() {
	const allPosts = getAllBlogPosts();
	const allTags = getAllTags();
	const allSeries = getAllSeries();
	const showDeck = allPosts.length >= 2;

  return (
    <div>
      {/* hero */}
      <section className="bg-franklin-bone px-4 pb-12 pt-36 md:pt-44 lg:pb-16">
        <div className="container mx-auto flex max-w-3xl flex-col items-center justify-center text-center">
          <AnimatedHeading className="mb-6">
            People, code, <span className="opacity-50">and</span> shipping
          </AnimatedHeading>
          <p className="max-w-xl text-sm opacity-80 md:text-base">
            Engineering deep-dives, Ethereum notes and lessons from shipping
            real products. New posts regularly.
          </p>
        </div>

        {showDeck && (
          <div className="mt-14 lg:mt-20" data-reveal>
            <ShuffleDeck>
              {allPosts.slice(0, 4).map((p, i) => (
                <DeckCard
                  key={p.slug}
                  index={i}
                  badge={p.tags[0] || "Blog"}
                  title={p.title}
                  description={p.description}
                  href={`/blog/${p.slug}`}
                />
              ))}
            </ShuffleDeck>
          </div>
        )}
      </section>

      {/* series */}
      {allSeries.length > 0 && (
        <section className="bg-franklin-bone px-4 pb-20 lg:pb-24">
          <div className="container mx-auto max-w-5xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl font-medium tracking-tight md:text-4xl">
                Read <span className="opacity-50">by series</span>
              </h2>
            </div>
            <div className="mt-8 grid gap-5 md:grid-cols-2">
              {allSeries.map((series) => (
                <Link
                  key={series.slug}
                  href={`/blog/series/${series.slug}`}
                  data-reveal
                  className="group rounded-[24px] bg-franklin-ink p-8 text-white transition-transform hover:-translate-y-1 md:p-10"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-franklin-lime">
                    Series • {series.posts.length} parts
                  </p>
                  <p className="font-display mt-3 text-2xl font-medium leading-tight tracking-tight md:text-3xl">
                    {series.name}
                  </p>
                  <p className="mt-3 line-clamp-2 text-sm opacity-70">
                    {series.posts[0]?.title} — through{" "}
                    {series.posts[series.posts.length - 1]?.title}
                  </p>
                  <span className="mt-5 inline-flex text-sm font-bold text-franklin-lime">
                    Start reading →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* filter + grid */}
      <section className="bg-franklin-bone px-4 py-20 lg:py-24">
        <div className="container mx-auto max-w-5xl">
          <BlogListClient
            allPosts={allPosts}
            allTags={allTags}
            hideBanner
            hideFeatured={showDeck}
          />
        </div>
      </section>
    </div>
  );
}
