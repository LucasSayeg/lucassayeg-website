import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";
// Relative import — the Next config loader doesn't resolve the tsconfig `@/` alias.
import { isIndexingEnabled } from "./src/lib/seo";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
  },
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    // Pre-launch: block crawlers everywhere. Post-flip: only the admin stays
    // blocked. Security headers live in vercel.json; Vercel merges both sets.
    const robots = isIndexingEnabled()
      ? [{ source: "/admin/:path*", headers: noindex }]
      : [{ source: "/:path*", headers: noindex }];

    /*
      Points agents at the Markdown mirror of each page (src/app/index.md,
      src/app/sobre.md) so they can skip parsing HTML. Relative URIs on
      purpose — a Link header resolves against the request URL, which keeps
      this correct on previews and on either production hostname without
      hardcoding a domain here.
    */
    const markdownAlternate = (href: string) => [
      { key: "Link", value: `<${href}>; rel="alternate"; type="text/markdown"` },
    ];

    return [
      ...robots,
      { source: "/", headers: markdownAlternate("/index.md") },
      { source: "/sobre", headers: markdownAlternate("/sobre.md") },
    ];
  },
};

// @ts-ignore
export default withPayload(nextConfig);
