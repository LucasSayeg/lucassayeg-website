import { getBaseUrl } from "@/lib/base-url";
import { getSiteInfo, getSobrePageContent } from "@/lib/home-content";
import { buildSobreMarkdown } from "@/lib/page-markdown";

export const revalidate = 3600;

export async function GET() {
  const [siteInfo, sobre] = await Promise.all([getSiteInfo(), getSobrePageContent()]);
  const body = buildSobreMarkdown({ siteInfo, sobre, baseUrl: getBaseUrl() });
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
