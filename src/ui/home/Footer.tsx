import { FALLBACK_SITE_INFO, type SiteInfoContent } from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { PageContainer } from "@/ui/components/PageContainer";
import { UnderlineLink } from "@/ui/components/UnderlineLink";

/*
  Footer — quiet, informational. Carries CRP registration (regulatory),
  crisis line (ethical baseline), and contact details. No newsletter.
*/

type FooterProps = {
  siteInfo?: SiteInfoContent;
  whatsappHref?: string;
};

export function Footer({
  siteInfo = FALLBACK_SITE_INFO,
  whatsappHref = WHATSAPP_HREF,
}: FooterProps = {}) {
  const rights = `© ${new Date().getFullYear()} ${siteInfo.name}. Todos os direitos reservados.`;
  return (
    <footer className="border-t border-paper-deep bg-paper py-[var(--space-2xl)] text-sm text-ink-quiet">
      <PageContainer className="grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-12 md:gap-[var(--space-2xl)]">
        <div className="md:col-span-5">
          <p className="font-display text-[length:var(--text-xl)] leading-tight tracking-[-0.01em] text-ink">
            {siteInfo.name}
          </p>
          <p className="mt-1 font-display text-sm text-ink-quiet">{siteInfo.slogan}</p>
        </div>

        <div className="md:col-span-3">
          <Eyebrow size="sm" className="mb-[var(--space-2xs)]">
            Atendimento
          </Eyebrow>
          <ul className="space-y-[var(--space-2xs)]">
            <li>Online · em todo o Brasil</li>
            <li>Presencial · {siteInfo.address}</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <Eyebrow size="sm" className="mb-[var(--space-2xs)]">
            Contato
          </Eyebrow>
          <ul className="space-y-[var(--space-2xs)]">
            <li>
              <UnderlineLink href={`mailto:${siteInfo.email}`} className="hover:text-ink">
                {siteInfo.email}
              </UnderlineLink>
            </li>
            <li>
              <UnderlineLink href={whatsappHref} external className="hover:text-ink">
                WhatsApp
              </UnderlineLink>
            </li>
            {/* Social slot — collapses cleanly when none exist */}
          </ul>
        </div>
      </PageContainer>

      <PageContainer className="mt-[var(--space-2xl)]">
        <p className="border-t border-paper-deep pt-[var(--space-md)] text-xs leading-relaxed text-ink-quiet">
          {siteInfo.crisis}
        </p>
        <div className="mt-[var(--space-md)] flex flex-wrap items-center justify-between gap-3 text-xs text-ink-quiet">
          <p>{rights}</p>
          <p className="font-display">{siteInfo.crp}</p>
        </div>
      </PageContainer>
    </footer>
  );
}
