import { FALLBACK_SITE_INFO, type SiteInfoContent } from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";

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
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-[var(--space-xl)] px-6 sm:px-8 md:grid-cols-12 md:gap-[var(--space-2xl)]">
        <div className="md:col-span-5">
          <p className="font-display text-[length:var(--text-xl)] leading-tight tracking-[-0.01em] text-ink">
            {siteInfo.name}
          </p>
          <p className="mt-1 font-display text-sm text-ink-quiet">{siteInfo.slogan}</p>
        </div>

        <div className="md:col-span-3">
          <p className="mb-[var(--space-2xs)] text-[0.72rem] uppercase tracking-[0.22em] text-ink-quiet">
            Atendimento
          </p>
          <ul className="space-y-[var(--space-2xs)]">
            <li>Online · em todo o Brasil</li>
            <li>Presencial · {siteInfo.address}</li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mb-[var(--space-2xs)] text-[0.72rem] uppercase tracking-[0.22em] text-ink-quiet">
            Contato
          </p>
          <ul className="space-y-[var(--space-2xs)]">
            <li>
              <a
                href={`mailto:${siteInfo.email}`}
                className="underline decoration-ink-faint decoration-[1px] underline-offset-[6px] hover:text-ink hover:decoration-accent-soft"
              >
                {siteInfo.email}
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="underline decoration-ink-faint decoration-[1px] underline-offset-[6px] hover:text-ink hover:decoration-accent-soft"
              >
                WhatsApp
              </a>
            </li>
            {/* Social slot — collapses cleanly when none exist */}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-[var(--space-2xl)] flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 text-xs text-ink-quiet sm:px-8">
        <p>{rights}</p>
        <p className="font-display">{siteInfo.crp}</p>
      </div>
    </footer>
  );
}
