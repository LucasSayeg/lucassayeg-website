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
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-[var(--surface-deep)] py-[var(--space-2xl)] text-sm text-[var(--ink-on-dark-quiet)]">
      <PageContainer className="grid grid-cols-1 gap-[var(--space-xl)] md:grid-cols-12 md:gap-[var(--space-2xl)]">
        <div className="md:col-span-5">
          <p className="font-display text-[length:var(--text-xl)] leading-tight tracking-[-0.01em] text-[var(--ink-on-dark)]">
            {siteInfo.name}
          </p>
          <p className="mt-1 font-display text-sm text-[var(--ink-on-dark-quiet)]">
            {siteInfo.slogan}
          </p>
        </div>

        <div className="md:col-span-3">
          <Eyebrow size="sm" className="mb-[var(--space-2xs)] text-[var(--ink-on-dark-quiet)]">
            Atendimento
          </Eyebrow>
          <ul className="space-y-[var(--space-2xs)]">
            <li>Online · em todo o Brasil</li>
            <li>Presencial · {siteInfo.address}</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <Eyebrow size="sm" className="mb-[var(--space-2xs)] text-[var(--ink-on-dark-quiet)]">
            Contato
          </Eyebrow>
          {/* Real contact details → <address>. not-italic cancels the UA italic
              so the visual is unchanged. */}
          <address className="not-italic">
            <ul className="space-y-[var(--space-2xs)]">
              <li>
                <UnderlineLink
                  href={`mailto:${siteInfo.email}`}
                  className="hover:text-[var(--ink-on-dark)]"
                >
                  {siteInfo.email}
                </UnderlineLink>
              </li>
              <li>
                <UnderlineLink
                  href={whatsappHref}
                  external
                  className="hover:text-[var(--ink-on-dark)]"
                >
                  WhatsApp
                </UnderlineLink>
              </li>
              {/* Social slot — collapses cleanly when none exist */}
            </ul>
          </address>
        </div>
      </PageContainer>

      <PageContainer className="mt-[var(--space-2xl)]">
        <p className="border-t border-[color-mix(in_oklch,var(--ink-on-dark)_18%,transparent)] pt-[var(--space-md)] text-xs leading-relaxed text-[var(--ink-on-dark-quiet)]">
          {siteInfo.crisis}
        </p>
        <div className="mt-[var(--space-md)] flex flex-wrap items-center justify-between gap-3 text-xs text-[var(--ink-on-dark-quiet)]">
          <p>
            © <time dateTime={String(year)}>{year}</time> {siteInfo.name}. Todos os direitos
            reservados.
          </p>
          <p className="font-display">{siteInfo.crp}</p>
        </div>
      </PageContainer>
    </footer>
  );
}
