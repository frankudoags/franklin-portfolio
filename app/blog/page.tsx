import { baseUrl } from "app/sitemap";
import { metadata } from "utils/metadata";
import AnimatedHeading from "components/common/animated-heading";
import ShuffleDeck, { DeckCard } from "components/common/shuffle-deck";
import { BlogListClient } from "components/blog/blog-ui";
import { getAllBlogPosts, getAllTags } from "lib/blog/utils";

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
