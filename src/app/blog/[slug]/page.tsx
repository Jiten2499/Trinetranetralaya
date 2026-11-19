import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/shared/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { CTASection } from "@/components/shared/CTASection";
import { ArticleCard, BlogStatus } from "@/components/blog/ArticleCard";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { getArticleBySlug, getPublishedArticles } from "@/services/blog/blog-repository";
import { prepareArticleContent } from "@/lib/wordpress/sanitize";
import { JsonLd } from "@/lib/seo/json-ld";
import { absoluteUrl, pageMetadata } from "@/lib/seo/metadata";
import { formatDisplayDate, isHttpsUrl } from "@/lib/utils";
import { siteConfig } from "@/config/site-config";

type ArticlePageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  if (!result.ok) {
    return pageMetadata({ title: "Article", description: "Eye care article.", path: `/blog/${slug}` });
  }
  return pageMetadata({
    title: result.post.seoTitle || result.post.title,
    description: result.post.seoDescription || result.post.excerpt,
    path: `/blog/${result.post.slug}`,
    image: result.post.imageUrl ?? undefined,
    type: "article",
  });
}

export default function ArticlePage({ params }: ArticlePageProps) {
  return (
    <Suspense fallback={<Container className="py-16 text-muted">Loading article…</Container>}>
      <ArticleBody params={params} />
    </Suspense>
  );
}

async function ArticleBody({ params }: ArticlePageProps) {
  const { slug } = await params;
  const result = await getArticleBySlug(slug);
  if (result.ok === false && result.error === "not_found") notFound();
  if (!result.ok) {
    return (
      <Container className="py-16">
        <BlogStatus error={result.error === "not_configured" ? "not_configured" : "unavailable"} />
      </Container>
    );
  }

  const prepared = prepareArticleContent(result.post.contentHtml);
  const related = await getPublishedArticles({ perPage: 4 });
  const more = related.ok ? related.posts.filter((post) => post.slug !== result.post.slug).slice(0, 3) : [];
  const url = absoluteUrl(`/blog/${result.post.slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: result.post.title,
          datePublished: result.post.publishedAt,
          dateModified: result.post.updatedAt,
          description: result.post.excerpt,
          image: result.post.imageUrl ?? undefined,
          url,
          author: result.post.authorName ? { "@type": "Person", name: result.post.authorName } : { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
        }}
      />
      <article>
        <Container className="py-12">
          <Breadcrumb items={[{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: result.post.title, path: `/blog/${result.post.slug}` }]} />
          <p className="mt-6 text-sm font-semibold uppercase tracking-wide text-action">{result.post.categories[0]?.name ?? "Article"}</p>
          <h1 className="mt-3 max-w-3xl text-4xl md:text-5xl">{result.post.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted">{result.post.excerpt}</p>
          <p className="mt-4 text-sm text-muted">
            {result.post.authorName ? <span>By {result.post.authorName}. </span> : null}
            {result.post.medicalReviewer ? <span>Reviewed by {result.post.medicalReviewer}. </span> : null}
            <time dateTime={result.post.publishedAt}>Published {formatDisplayDate(result.post.publishedAt)}</time>
            {result.post.updatedAt ? <span> · Updated {formatDisplayDate(result.post.updatedAt)}</span> : null}
          </p>
          {result.post.imageUrl && isHttpsUrl(result.post.imageUrl) ? (
            <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-[1.5rem]">
              <Image src={result.post.imageUrl} alt={result.post.imageAlt ?? ""} fill unoptimized className="object-cover" sizes="100vw" priority />
            </div>
          ) : null}
          <div className="mt-10 grid gap-10 lg:grid-cols-[16rem_minmax(0,1fr)]">
            {prepared.toc.length > 2 ? (
              <nav aria-label="On this article" className="h-fit lg:sticky lg:top-28">
                <p className="text-sm font-semibold">On this page</p>
                <ul className="mt-3 grid gap-2 text-sm">
                  {prepared.toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-3" : undefined}>
                      <a href={`#${item.id}`} className="text-action">{item.text}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : <div />}
            <div className="article-prose" dangerouslySetInnerHTML={{ __html: prepared.html }} />
          </div>
          <div className="mt-8">
            <ShareButtons title={result.post.title} />
          </div>
          <Link href="/blog" className="mt-6 inline-flex font-semibold text-action">Back to blog</Link>
        </Container>
      </article>
      {more.length > 0 ? (
        <section className="bg-background-secondary py-14">
          <Container>
            <h2 className="text-3xl">Related articles</h2>
            <div className="mt-6 grid gap-5 md:grid-cols-3">
              {more.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
      <CTASection />
    </>
  );
}
