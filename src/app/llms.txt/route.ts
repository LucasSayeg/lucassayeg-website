import { getBaseUrl } from "@/lib/base-url";
import { getHomeContent, getSiteInfo } from "@/lib/home-content";
import { buildLlmsTxt } from "@/lib/llms-txt";

export const revalidate = 3600;

export async function GET() {
  const [siteInfo, content] = await Promise.all([getSiteInfo(), getHomeContent()]);
  const body = buildLlmsTxt({ siteInfo, content, baseUrl: getBaseUrl() });
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
