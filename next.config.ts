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
    return isIndexingEnabled()
      ? [{ source: "/admin/:path*", headers: noindex }]
      : [{ source: "/:path*", headers: noindex }];
  },
};

// @ts-ignore
export default withPayload(nextConfig);
