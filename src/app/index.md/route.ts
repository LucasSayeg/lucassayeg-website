import { getBaseUrl } from "@/lib/base-url";
import { getHomeContent, getSiteInfo } from "@/lib/home-content";
import { buildHomeMarkdown } from "@/lib/page-markdown";

export const revalidate = 3600;

export async function GET() {
  const [siteInfo, content] = await Promise.all([getSiteInfo(), getHomeContent()]);
  const body = buildHomeMarkdown({ siteInfo, content, baseUrl: getBaseUrl() });
  return new Response(body, {
    headers: {
      // text/markdown so agents don't have to sniff; charset is explicit
      // because the content is pt-BR and full of accented characters.
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
