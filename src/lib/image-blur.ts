import "server-only";
import sharp from "sharp";
import { unstable_cache } from "next/cache";
import { getBaseUrl } from "@/lib/base-url";

/** Resolve a possibly-relative media URL to an absolute one we can fetch. */
function toAbsolute(url: string): string {
  if (/^https?:\/\//i.test(url)) return url;
  return `${getBaseUrl()}${url.startsWith("/") ? "" : "/"}${url}`;
}

/**
 * Tiny base64 blur for next/image `placeholder`. Best-effort: any failure
 * returns null so the caller can fall back to a flat tint. Never throws.
 */
async function generateBlur(sourceUrl: string): Promise<string | null> {
  try {
    const res = await fetch(toAbsolute(sourceUrl));
    if (!res.ok) return null;
    const input = Buffer.from(await res.arrayBuffer());
    const out = await sharp(input)
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    return `data:image/webp;base64,${out.toString("base64")}`;
  } catch {
    return null;
  }
}

/**
 * Cached across ISR regenerations, keyed by a stable identity (media id +
 * updatedAt). Recomputes only when the underlying media changes.
 */
export function getBlurDataURL(sourceUrl: string, cacheKey: string): Promise<string | null> {
  return unstable_cache(() => generateBlur(sourceUrl), ["blur-data-url", cacheKey], {
    revalidate: false,
  })();
}
