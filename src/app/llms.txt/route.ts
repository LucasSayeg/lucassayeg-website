import { getBaseUrl } from "@/lib/base-url";
import { getHomeContent, getSiteInfo, getSobrePageContent } from "@/lib/home-content";
import { buildLlmsTxt } from "@/lib/llms-txt";

export const revalidate = 3600;

export async function GET() {
  const [siteInfo, content, sobre] = await Promise.all([
    getSiteInfo(),
    getHomeContent(),
    getSobrePageContent(),
  ]);
  const body = buildLlmsTxt({ siteInfo, content, sobre, baseUrl: getBaseUrl() });
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
