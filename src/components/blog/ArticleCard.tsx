import Image from "next/image";
import Link from "next/link";
import { formatDisplayDate, isHttpsUrl } from "@/lib/utils";
import type { BlogPost } from "@/types/content";

export function ArticleCard({ post }: { post: BlogPost }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-[var(--shadow)]">
      <div className="relative aspect-[16/10] bg-background-secondary">
        {post.imageUrl && isHttpsUrl(post.imageUrl) ? (
          <Image src={post.imageUrl} alt={post.imageAlt ?? ""} fill unoptimized className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-action">{post.categories[0]?.name ?? "Article"}</p>
        <h3 className="mt-2 text-2xl">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-2 flex-1 text-muted">{post.excerpt}</p>
        <p className="mt-4 text-sm text-muted">
          <time dateTime={post.publishedAt}>{formatDisplayDate(post.publishedAt)}</time>
          {post.authorName ? ` · ${post.authorName}` : ""}
        </p>
        <Link href={`/blog/${post.slug}`} className="mt-3 font-semibold text-action">
          Read more
        </Link>
      </div>
    </article>
  );
}

export function BlogStatus({ error }: { error: "not_configured" | "unavailable" }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <h2 className="text-2xl">{error === "not_configured" ? "Articles will appear here" : "Articles are temporarily unavailable"}</h2>
      <p className="mt-3 max-w-2xl text-muted">
        {error === "not_configured"
          ? "Connect a WordPress site in the environment variables to publish eye-care articles from the CMS. The rest of the website continues to work."
          : "The article service did not respond. You can refresh this page in a moment. Appointments and clinic pages are unaffected."}
      </p>
      {error === "unavailable" ? (
        <Link href="/blog" className="mt-4 inline-flex font-semibold text-action">
          Try again
        </Link>
      ) : null}
    </div>
  );
}
