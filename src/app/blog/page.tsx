import { Suspense } from "react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { ArticleCard, BlogStatus } from "@/components/blog/ArticleCard";
import { getArticleCategories, getPublishedArticles } from "@/services/blog/blog-repository";
import { pageMetadata } from "@/lib/seo/metadata";
import { readSearchParam } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Eye Health Blog",
  description: "Educational eye-care articles published from the clinic’s WordPress site.",
  path: "/blog",
});

type BlogPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function BlogPage({ searchParams }: BlogPageProps) {
  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Eye health articles"
        description="Articles are written and published in WordPress. This page shows them when the CMS is connected."
        crumbs={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }]}
      />
      <Suspense fallback={<Container className="py-16 text-muted">Loading articles…</Container>}>
        <BlogListing searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function BlogListing({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = Number(readSearchParam(params.page) || "1");
  const search = readSearchParam(params.q);
  const category = readSearchParam(params.category);
  const after = readSearchParam(params.after);
  const [articles, categories] = await Promise.all([
    getPublishedArticles({ page: Number.isFinite(page) ? page : 1, perPage: 9, search, category, after }),
    getArticleCategories(),
  ]);

  return (
    <Container className="py-14">
      <form action="/blog" className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="blog-search">Search articles</label>
        <input id="blog-search" name="q" defaultValue={search} placeholder="Search articles" className="h-12 flex-1 rounded-xl border border-border bg-surface px-4" />
        {category ? <input type="hidden" name="category" value={category} /> : null}
        <button type="submit" className="h-12 rounded-xl bg-action px-5 font-semibold text-primary-foreground">Search</button>
      </form>
      {categories.ok && categories.categories.length > 0 ? (
        <ul className="mt-5 flex flex-wrap gap-2">
          <li><Link href="/blog" className={!category ? "inline-flex h-10 items-center rounded-xl bg-action px-3 text-sm font-semibold text-primary-foreground" : "inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold"}>All</Link></li>
          {categories.categories.map((item) => (
            <li key={item.id}>
              <Link href={`/blog?category=${item.slug}`} className={category === item.slug ? "inline-flex h-10 items-center rounded-xl bg-action px-3 text-sm font-semibold text-primary-foreground" : "inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-semibold"}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="mt-8">
        {!articles.ok ? <BlogStatus error={articles.error} /> : null}
        {articles.ok && articles.posts.length === 0 ? <p className="text-muted">No articles matched that search.</p> : null}
        {articles.ok && articles.posts.length > 0 ? (
          <>
            {page === 1 && !search && !category ? (
              <article className="mb-8 rounded-2xl border border-border bg-background-secondary p-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-action">Featured</p>
                <h2 className="mt-2 text-3xl"><Link href={`/blog/${articles.posts[0].slug}`}>{articles.posts[0].title}</Link></h2>
                <p className="mt-3 max-w-3xl text-muted">{articles.posts[0].excerpt}</p>
              </article>
            ) : null}
            <div className="grid gap-5 md:grid-cols-3">
              {articles.posts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
            <nav className="mt-8 flex gap-4" aria-label="Pagination">
              {articles.totalPages && page > 1 ? <Link href={pageHref(page - 1, search, category)} className="font-semibold text-action">Previous</Link> : null}
              {articles.totalPages && page < articles.totalPages ? <Link href={pageHref(page + 1, search, category)} className="font-semibold text-action">Next</Link> : null}
              {!articles.totalPages && articles.hasNextPage && articles.endCursor ? (
                <Link href={`/blog?after=${encodeURIComponent(articles.endCursor)}${search ? `&q=${encodeURIComponent(search)}` : ""}${category ? `&category=${encodeURIComponent(category)}` : ""}`} className="font-semibold text-action">
                  Load more
                </Link>
              ) : null}
            </nav>
          </>
        ) : null}
      </div>
    </Container>
  );
}

function pageHref(page: number, search: string, category: string) {
  const params = new URLSearchParams();
  if (page > 1) params.set("page", String(page));
  if (search) params.set("q", search);
  if (category) params.set("category", category);
  const query = params.toString();
  return query ? `/blog?${query}` : "/blog";
}
