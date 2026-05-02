import type { Payload } from "payload";
import { SITE_META } from "@/lib/home-data";

export async function seedSiteInfo(payload: Payload, _opts: { force?: boolean }) {
  await payload.updateGlobal({
    slug: "site-info",
    data: {
      name: SITE_META.name,
      shortMark: SITE_META.shortMark,
      slogan: SITE_META.slogan,
      region: SITE_META.region,
      address: SITE_META.address,
      crp: SITE_META.crp || "CRP 00/00000",
      crisis: SITE_META.crisis,
      email: SITE_META.email || "contato@example.com",
      whatsappNumber: SITE_META.whatsappNumber || "5511000000000",
      whatsappPrefill: SITE_META.whatsappPrefill,
    },
  });
}
