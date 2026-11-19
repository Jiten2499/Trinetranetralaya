import { cacheLife, cacheTag } from "next/cache";
import { wordpressFetch, getWordpressConfig } from "@/lib/wordpress/client";
import { CATEGORIES_QUERY, POSTS_QUERY, POST_BY_SLUG_QUERY } from "@/lib/wordpress/queries";
import type { WpGraphQlPostNode, WpRestCategory, WpRestPost } from "@/lib/wordpress/queries";
import { sanitizeArticleHtml } from "@/lib/wordpress/sanitize";
import { decodeHtml, isHttpsUrl } from "@/lib/utils";
import type {
  BlogArticleResponse,
  BlogCategory,
  BlogCategoryResponse,
  BlogListResponse,
  BlogPost,
  BlogQuery,
} from "@/types/content";

function safeImage(url: string | undefined): string | null {
  if (!url || !isHttpsUrl(url)) return null;
  return url;
}

function mapRestPost(post: WpRestPost): BlogPost {
  const terms = post._embedded?.["wp:term"]?.flat() ?? [];
  const categories = terms
    .filter((term) => term.taxonomy === "category" && term.slug && term.name)
    .map((term) => ({
      id: String(term.id ?? term.slug),
      name: decodeHtml(term.name ?? ""),
      slug: term.slug ?? "",
    }));
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  const reviewer = post.meta?.medical_reviewer;

  return {
    id: String(post.id),
    slug: post.slug,
    title: decodeHtml(post.title.rendered),
    excerpt: decodeHtml(post.excerpt.rendered),
    contentHtml: sanitizeArticleHtml(post.content.rendered),
    publishedAt: post.date,
    updatedAt: post.modified,
    authorName: post._embedded?.author?.[0]?.name ?? null,
    medicalReviewer: typeof reviewer === "string" && reviewer.trim() ? reviewer.trim() : null,
    imageUrl: safeImage(media?.source_url),
    imageAlt: media?.alt_text?.trim() || decodeHtml(post.title.rendered),
    categories,
    seoTitle: post.yoast_head_json?.title ?? null,
    seoDescription: post.yoast_head_json?.description ?? null,
  };
}

function mapGraphPost(post: WpGraphQlPostNode): BlogPost {
  return {
    id: String(post.databaseId ?? post.slug),
    slug: post.slug,
    title: decodeHtml(post.title ?? ""),
    excerpt: decodeHtml(post.excerpt ?? ""),
    contentHtml: sanitizeArticleHtml(post.content ?? ""),
    publishedAt: post.date ?? "",
    updatedAt: post.modified ?? post.date ?? "",
    authorName: post.author?.node?.name ?? null,
    medicalReviewer: null,
    imageUrl: safeImage(post.featuredImage?.node?.sourceUrl),
    imageAlt: post.featuredImage?.node?.altText || decodeHtml(post.title ?? ""),
    categories: (post.categories?.nodes ?? [])
      .filter((category) => category.slug && category.name)
      .map((category) => ({
        id: String(category.databaseId ?? category.slug),
        name: category.name ?? "",
        slug: category.slug ?? "",
      })),
    seoTitle: null,
    seoDescription: null,
  };
}

async function graphql<T>(query: string, variables: Record<string, unknown>): Promise<T> {
  const { graphqlUrl } = getWordpressConfig();
  const response = await wordpressFetch(graphqlUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const payload = (await response.json()) as { data?: T; errors?: unknown[] };
  if (!payload.data || payload.errors) {
    throw new Error("WordPress GraphQL returned an error.");
  }
  return payload.data;
}

async function categoryIdForSlug(restUrl: string, slug: string): Promise<number | null> {
  if (!slug) return null;
  const url = new URL(`${restUrl.replace(/\/$/, "")}/categories`);
  url.searchParams.set("slug", slug);
  const response = await wordpressFetch(url.toString());
  const categories = (await response.json()) as WpRestCategory[];
  return categories[0]?.id ?? null;
}

export async function getPublishedArticles(query: BlogQuery = {}): Promise<BlogListResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog");

  const config = getWordpressConfig();
  const page = Math.max(1, query.page ?? 1);
  const perPage = Math.min(12, Math.max(1, query.perPage ?? 9));
  const search = query.search?.trim() ?? "";
  const category = query.category?.trim() ?? "";

  if (config.mode === "none") return { ok: false, error: "not_configured" };

  try {
    if (config.mode === "graphql") {
      const categories = category
        ? await graphql<{ categories?: { nodes?: BlogCategory[] } }>(CATEGORIES_QUERY, {})
        : null;
      const categoryName = categories?.categories?.nodes?.find((item) => item.slug === category)?.name;
      const data = await graphql<{
        posts?: {
          pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
          nodes?: WpGraphQlPostNode[];
        };
      }>(POSTS_QUERY, {
        first: perPage,
        after: query.after || null,
        search: search || null,
        category: categoryName || null,
      });
      return {
        ok: true,
        posts: (data.posts?.nodes ?? []).map(mapGraphPost),
        page,
        perPage,
        total: null,
        totalPages: null,
        hasNextPage: Boolean(data.posts?.pageInfo?.hasNextPage),
        endCursor: data.posts?.pageInfo?.endCursor ?? null,
      };
    }

    const url = new URL(`${config.restUrl.replace(/\/$/, "")}/posts`);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("per_page", String(perPage));
    url.searchParams.set("page", String(page));
    url.searchParams.set("status", "publish");
    if (search) url.searchParams.set("search", search);
    if (category) {
      const id = await categoryIdForSlug(config.restUrl, category);
      if (!id) {
        return { ok: true, posts: [], page, perPage, total: 0, totalPages: 0, hasNextPage: false, endCursor: null };
      }
      url.searchParams.set("categories", String(id));
    }
    const response = await wordpressFetch(url.toString());
    const posts = (await response.json()) as WpRestPost[];
    const total = Number(response.headers.get("X-WP-Total") ?? posts.length);
    const totalPages = Number(response.headers.get("X-WP-TotalPages") ?? 1);
    return {
      ok: true,
      posts: posts.map(mapRestPost),
      page,
      perPage,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      endCursor: null,
    };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

export async function getArticleBySlug(slug: string): Promise<BlogArticleResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog", `blog-${slug}`);

  const config = getWordpressConfig();
  if (config.mode === "none") return { ok: false, error: "not_configured" };

  try {
    if (config.mode === "graphql") {
      const data = await graphql<{ post?: WpGraphQlPostNode | null }>(POST_BY_SLUG_QUERY, { slug });
      if (!data.post?.slug) return { ok: false, error: "not_found" };
      return { ok: true, post: mapGraphPost(data.post) };
    }

    const url = new URL(`${config.restUrl.replace(/\/$/, "")}/posts`);
    url.searchParams.set("_embed", "1");
    url.searchParams.set("slug", slug);
    url.searchParams.set("status", "publish");
    const response = await wordpressFetch(url.toString());
    const posts = (await response.json()) as WpRestPost[];
    const post = posts[0];
    if (!post) return { ok: false, error: "not_found" };
    return { ok: true, post: mapRestPost(post) };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}

export async function getArticleCategories(): Promise<BlogCategoryResponse> {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-categories");

  const config = getWordpressConfig();
  if (config.mode === "none") return { ok: false, error: "not_configured" };

  try {
    if (config.mode === "graphql") {
      const data = await graphql<{ categories?: { nodes?: BlogCategory[] } }>(CATEGORIES_QUERY, {});
      return {
        ok: true,
        categories: (data.categories?.nodes ?? []).map((category) => ({
          id: String(category.id ?? category.slug),
          name: category.name,
          slug: category.slug,
        })),
      };
    }

    const url = new URL(`${config.restUrl.replace(/\/$/, "")}/categories`);
    url.searchParams.set("per_page", "50");
    url.searchParams.set("hide_empty", "true");
    const response = await wordpressFetch(url.toString());
    const categories = (await response.json()) as WpRestCategory[];
    return {
      ok: true,
      categories: categories.map((category) => ({
        id: String(category.id),
        name: decodeHtml(category.name),
        slug: category.slug,
      })),
    };
  } catch {
    return { ok: false, error: "unavailable" };
  }
}
