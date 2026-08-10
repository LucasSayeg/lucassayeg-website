import { buildAgentPermissions } from "@/lib/agent-permissions";
import { getBaseUrl } from "@/lib/base-url";
import { getSiteInfo } from "@/lib/home-content";

export const revalidate = 3600;

export async function GET() {
  const siteInfo = await getSiteInfo();
  const body = buildAgentPermissions({
    baseUrl: getBaseUrl(),
    contactEmail: siteInfo.email,
  });
  return new Response(`${JSON.stringify(body, null, 2)}\n`, {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
}
