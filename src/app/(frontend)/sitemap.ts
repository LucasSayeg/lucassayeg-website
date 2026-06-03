import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

export const revalidate = 3600;

const BASE_URL = getBaseUrl();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [];

  // Home page
  entries.push({
    url: `${BASE_URL}/`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 1.0,
  });

  return entries;
}
