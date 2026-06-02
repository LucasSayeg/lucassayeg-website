"use client";

import { ContactForm } from "@/ui/contact/ContactForm";
import { useContactForm } from "@/ui/contact/hooks/useContactForm";
import {
  FALLBACK_CONTACT_FORM,
  FALLBACK_CONTATO,
  type ContactFormContent,
  type ContatoContent,
} from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { PageContainer } from "@/ui/components/PageContainer";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";
import { WhatsappCta } from "@/ui/components/WhatsappCta";

/*
  Contato — left-anchored editorial rhythm. Heading + invite stack
  together in the same narrow column (no horizontal split at the top —
  short headings against a far-right paragraph leave an awkward void).
  Below, a 12-col body: ContactForm on the left (cols 1–7), a quiet
  right rail (cols 9–12) carrying response-time, the WhatsApp prompt,
  and the sigilo note. Rail and invite fade on success so attention
  rests on the thank-you message — the form panel itself swaps via
  .contact-swap. The warmer paper-clay surface still marks this as the
  page's quiet pause.
*/

type ContatoProps = {
  content?: ContatoContent;
  formCopy?: ContactFormContent;
  whatsappHref?: string;
};

export function Contato({
  content = FALLBACK_CONTATO,
  formCopy = FALLBACK_CONTACT_FORM,
  whatsappHref = WHATSAPP_HREF,
}: ContatoProps = {}) {
  const formState = useContactForm();
  const isSuccess = !!formState.submitResult?.success;

  return (
    <Section
      id="contato"
      data-contact-state={isSuccess ? "success" : "form"}
      className="py-[var(--space-4xl)]"
    >
      <PageContainer>
        {/* Navy plate — the section ground stays gesso; this panel reads like a
            plate tipped into a book page. Everything inside rides .on-navy, so
            shared component classes (.btn-outline, .field-*, .form-banner) are
            recolored for the dark ground via scoped overrides in globals.css. */}
        <div className="on-navy relative rounded-[var(--radius)] bg-[var(--accent)] px-[var(--space-lg)] py-[var(--space-2xl)] shadow-[0_1px_2px_rgba(0,0,0,.06),0_8px_24px_-12px_rgba(0,0,0,.18)] ring-1 ring-[color-mix(in_oklch,var(--accent)_70%,black)] sm:px-[var(--space-2xl)]">
          {/* Header — heading and invite stacked together, left-anchored. */}
          <div className="max-w-[640px]">
            <SectionHeading id="contato-heading" className="text-[var(--on-navy)]">
              {content.heading}
            </SectionHeading>
            <div className="contact-collapse mt-[var(--space-md)]">
              <p className="max-w-[52ch] text-[length:var(--text-base)] leading-[1.7] text-[var(--on-navy-quiet)]">
                {content.invite}
              </p>
            </div>
          </div>

          {/* Body row — form left (cols 1–7), quiet rail right (cols 9–12). */}
          <div className="mt-[var(--space-xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-2xl)] md:grid-cols-12">
            <div className="contact-form-col md:col-span-7 md:col-start-1">
              <div className="contact-form-shell max-w-[560px]">
                <ContactForm {...formState} copy={formCopy} />
              </div>
            </div>

            <aside
              aria-label="Outras informações de contato"
              className="contact-collapse md:col-span-4 md:col-start-9"
            >
              {/* Full-height flex column: response-time + WhatsApp group at the
                  top, sigilo pushed to the bottom (mt-auto) so it sits opposite
                  the form's submit — filling the lower-right and landing the
                  reassurance right at the contact moment. On mobile the column
                  has no extra height, so mt-auto is inert and blocks stack. */}
              <div className="flex h-full flex-col gap-[var(--space-lg)]">
                <div>
                  <Eyebrow className="text-[var(--on-navy-quiet)]">
                    {content.responseTimeLabel}
                  </Eyebrow>
                  <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-[var(--on-navy-quiet)]">
                    {content.responseTimeBody}
                  </p>
                </div>

                <div>
                  <Eyebrow className="text-[var(--on-navy-quiet)]">
                    {content.whatsappBlockLabel}
                  </Eyebrow>
                  <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-[var(--on-navy-quiet)]">
                    {content.whatsappPrompt}
                  </p>
                  {/* WhatsApp stays the primary channel, but its fill is reserved
                      for the Hero — here it carries as the quiet on-navy outline so
                      the navy fill never reads as a system color (60-30-10). */}
                  <WhatsappCta
                    href={whatsappHref}
                    variant="outline"
                    className="mt-[var(--space-sm)]"
                  >
                    {content.whatsappLabel}
                  </WhatsappCta>
                </div>

                <div className="mt-auto">
                  <Eyebrow className="text-[var(--on-navy-quiet)]">{content.sigiloLabel}</Eyebrow>
                  <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-[var(--on-navy-quiet)]">
                    {content.sigiloBody}
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
