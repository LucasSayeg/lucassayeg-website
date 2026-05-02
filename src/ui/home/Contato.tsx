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
import { WhatsappIcon } from "@/ui/components/WhatsappIcon";

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
    <section
      id="contato"
      aria-labelledby="contato-heading"
      data-contact-state={isSuccess ? "success" : "form"}
      className="border-t border-paper-deep bg-paper-clay/40 py-[var(--space-4xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Header — heading and invite stacked together, left-anchored. */}
        <div className="max-w-[640px]">
          <h2
            id="contato-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.04] tracking-[-0.02em] text-ink"
          >
            {content.heading}
          </h2>
          <div className="contact-collapse mt-[var(--space-md)]">
            <p className="max-w-[52ch] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
              {content.invite}
            </p>
          </div>
        </div>

        {/* Body row — form left (cols 1–7), quiet rail right (cols 9–12). */}
        <div className="mt-[var(--space-xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-2xl)] md:grid-cols-12">
          <div className="md:col-span-7 md:col-start-1">
            <div className="max-w-[560px]">
              <ContactForm {...formState} copy={formCopy} />
            </div>
          </div>

          <aside
            aria-label="Outras informações de contato"
            className="contact-collapse md:col-span-4 md:col-start-9"
          >
            <div className="space-y-[var(--space-lg)]">
              <div>
                <p className="text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet">
                  {content.responseTimeLabel}
                </p>
                <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-ink-soft">
                  {content.responseTimeBody}
                </p>
              </div>

              <div>
                <p className="text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet">
                  {content.whatsappBlockLabel}
                </p>
                <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-ink-soft">
                  {content.whatsappPrompt}
                </p>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-[var(--space-2xs)] inline-flex items-center gap-2 text-[length:var(--text-base)] text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
                >
                  <WhatsappIcon size={14} className="text-[#25D366]" />
                  {content.whatsappLabel}
                  <span aria-hidden className="font-display">
                    →
                  </span>
                </a>
              </div>

              <div>
                <p className="text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet">
                  {content.sigiloLabel}
                </p>
                <p className="mt-[var(--space-xs)] text-[length:var(--text-base)] leading-[1.6] text-ink-soft">
                  {content.sigiloBody}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
