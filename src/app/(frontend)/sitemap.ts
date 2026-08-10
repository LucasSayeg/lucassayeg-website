import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";
import { getContentTimestamps } from "@/lib/home-content";

export const revalidate = 3600;

const BASE_URL = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Real CMS timestamps; the key is omitted (not faked) when unavailable.
  const timestamps = await getContentTimestamps();

  return [
    {
      url: `${BASE_URL}/`,
      ...(timestamps.home ? { lastModified: timestamps.home } : {}),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sobre`,
      ...(timestamps.sobre ? { lastModified: timestamps.sobre } : {}),
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
