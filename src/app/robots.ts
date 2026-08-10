import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { isIndexingEnabled } from "@/lib/seo";

const BASE_URL = getBaseUrl();

/** Paths that stay closed to every crawler, search or AI. */
const PRIVATE_PATHS = ["/admin", "/api"];

/*
  AI crawlers and assistant fetchers, named explicitly.

  The `*` group below already permits all of these — this second group is a
  deliberate, standalone signal (and a guard): if the wildcard is ever
  narrowed, AI access shouldn't silently disappear with it. A misconfigured
  robots.txt is the most common way a site becomes invisible to assistants,
  and the failure is silent — no error, no analytics event.

  Two names here do more than restate the wildcard. `Google-Extended` is not
  a crawler: it's the opt-in toggle for using this site to ground Gemini
  answers, and it's separate from Search indexing. `Applebot-Extended` is the
  same idea for Apple Intelligence. Listing them with `Allow: /` opts in.

  Note on robots.txt semantics: a named group REPLACES the wildcard group for
  that agent rather than inheriting from it, so PRIVATE_PATHS has to be
  repeated here. Dropping it would expose /admin to exactly these clients.
*/
const AI_USER_AGENTS = [
  // OpenAI: training crawl, search index, and on-demand ChatGPT fetches.
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  // Anthropic: crawl, search, and on-demand Claude fetches.
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  // Perplexity: index and on-demand fetches.
  "PerplexityBot",
  "Perplexity-User",
  // Grounding/training opt-ins (not indexing controls).
  "Google-Extended",
  "Applebot-Extended",
  // Common Crawl — the dataset many smaller models are trained from.
  "CCBot",
  // Meta AI.
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  if (!isIndexingEnabled()) {
    return {
      rules: [{ userAgent: "*", disallow: "/" }],
      sitemap: `${BASE_URL}/sitemap.xml`,
    };
  }

  return {
    rules: [
      // /llms.txt, /index.md and /sobre.md stay crawlable on purpose — they
      // exist for AI agents.
      { userAgent: "*", allow: "/", disallow: PRIVATE_PATHS },
      { userAgent: AI_USER_AGENTS, allow: "/", disallow: PRIVATE_PATHS },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
