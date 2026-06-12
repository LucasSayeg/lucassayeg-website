import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { isIndexingEnabled } from "@/lib/seo";

const BASE_URL = getBaseUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      isIndexingEnabled()
        ? // /llms.txt stays crawlable on purpose — it exists for AI agents.
          { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }
        : { userAgent: "*", disallow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
