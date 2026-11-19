export interface WpRestPost {
  id: number;
  slug: string;
  date: string;
  modified: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  meta?: Record<string, unknown>;
  yoast_head_json?: { title?: string; description?: string };
  _embedded?: {
    author?: Array<{ name?: string }>;
    "wp:featuredmedia"?: Array<{ source_url?: string; alt_text?: string }>;
    "wp:term"?: Array<Array<{ id?: number; name?: string; slug?: string; taxonomy?: string }>>;
  };
}

export interface WpRestCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface WpGraphQlPostNode {
  databaseId?: number;
  slug: string;
  title?: string;
  excerpt?: string;
  date?: string;
  modified?: string;
  content?: string;
  featuredImage?: { node?: { sourceUrl?: string; altText?: string } | null } | null;
  author?: { node?: { name?: string } | null } | null;
  categories?: { nodes?: Array<{ databaseId?: number; name?: string; slug?: string }> | null } | null;
}

export const POSTS_QUERY = `
  query VisionCarePosts($first: Int!, $after: String, $search: String, $category: String) {
    posts(
      first: $first
      after: $after
      where: { status: PUBLISH, search: $search, categoryName: $category }
    ) {
      pageInfo { hasNextPage endCursor }
      nodes {
        databaseId
        slug
        title
        excerpt
        date
        modified
        content
        featuredImage { node { sourceUrl altText } }
        author { node { name } }
        categories { nodes { databaseId name slug } }
      }
    }
  }
`;

export const POST_BY_SLUG_QUERY = `
  query VisionCarePost($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      databaseId
      slug
      title
      excerpt
      date
      modified
      content
      featuredImage { node { sourceUrl altText } }
      author { node { name } }
      categories { nodes { databaseId name slug } }
    }
  }
`;

export const CATEGORIES_QUERY = `
  query VisionCareCategories {
    categories(first: 50, where: { hideEmpty: true }) {
      nodes { databaseId name slug }
    }
  }
`;
