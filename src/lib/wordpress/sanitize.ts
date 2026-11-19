import sanitizeHtml from "sanitize-html";
import { decodeHtml, slugify } from "@/lib/utils";

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const allowedTags = sanitizeHtml.defaults.allowedTags.concat([
  "img",
  "h1",
  "h2",
  "h3",
  "figure",
  "figcaption",
  "iframe",
  "sup",
  "sub",
]);

export function sanitizeArticleHtml(html: string): string {
  return sanitizeHtml(html, {
    allowedTags,
    allowedAttributes: {
      a: ["href", "name", "target", "rel", "title"],
      img: ["src", "srcset", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "title", "allow", "allowfullscreen"],
      "*": ["id"],
    },
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    allowedSchemes: ["http", "https", "mailto", "tel"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }),
    },
  });
}

export function prepareArticleContent(html: string): { html: string; toc: ArticleHeading[] } {
  const clean = sanitizeArticleHtml(html);
  const toc: ArticleHeading[] = [];
  const used = new Set<string>();

  const withIds = clean.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level: string, attrs: string, inner: string) => {
    const text = decodeHtml(inner);
    if (!text) return match;
    const id = slugify(text) || "section";
    let unique = id;
    let count = 2;
    while (used.has(unique)) {
      unique = `${id}-${count}`;
      count += 1;
    }
    used.add(unique);
    const headingLevel = Number(level) === 3 ? 3 : 2;
    toc.push({ id: unique, text, level: headingLevel });
    const attrsWithoutId = attrs.replace(/\sid=(['"]).*?\1/i, "");
    return `<h${level} id="${unique}"${attrsWithoutId}>${inner}</h${level}>`;
  });

  return { html: withIds, toc };
}
