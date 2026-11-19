export interface WordpressConfig {
  graphqlUrl: string;
  restUrl: string;
  siteUrl: string;
  mode: "graphql" | "rest" | "none";
}

export function getWordpressConfig(): WordpressConfig {
  const graphqlUrl = process.env.WORDPRESS_GRAPHQL_URL?.trim() ?? "";
  const restUrl = process.env.WORDPRESS_REST_API_URL?.trim() ?? "";
  const siteUrl = process.env.WORDPRESS_SITE_URL?.trim() ?? "";
  const mode = graphqlUrl ? "graphql" : restUrl ? "rest" : "none";
  return { graphqlUrl, restUrl, siteUrl, mode };
}

export class WordpressError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "WordpressError";
  }
}

export async function wordpressFetch(url: string, init?: RequestInit): Promise<Response> {
  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new WordpressError(`WordPress responded with status ${response.status}.`);
  }

  return response;
}
