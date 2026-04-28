"use client";

import { ContactForm } from "@/ui/contact/ContactForm";
import { useContactForm } from "@/ui/contact/hooks/useContactForm";
import { FALLBACK_CONTATO, type ContatoContent } from "@/lib/home-content-types";
import { WHATSAPP_HREF } from "@/lib/home-data";

/*
  Contato — the only section that interrupts the page rhythm.
  Slightly warmer surface, larger top/bottom padding. Form is primary;
  WhatsApp is secondary. On submit success, the invite paragraph and
  the secondary WhatsApp prompt collapse so attention rests on the
  thank-you message — the page tightens around it instead of a half-
  used form scaffolding sitting beside the success state.
*/

type ContatoProps = {
  content?: ContatoContent;
  whatsappHref?: string;
};

export function Contato({
  content = FALLBACK_CONTATO,
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
        <div className="mx-auto max-w-[640px] text-center">
          <p className="mb-[var(--space-md)] flex items-center justify-center gap-3 text-[0.78rem] uppercase tracking-[0.24em] text-ink-quiet">
            <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
            Primeiro contato
            <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
          </p>
          <h2
            id="contato-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.08] tracking-[-0.015em] text-ink"
          >
            {content.heading}
          </h2>
          <div className="contact-collapse mt-[var(--space-md)]">
            <p className="mx-auto max-w-[52ch] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
              {content.invite}
            </p>
          </div>
        </div>

        <div className="mx-auto mt-[var(--space-2xl)] max-w-[560px]">
          <ContactForm {...formState} />

          {/* Secondary WhatsApp link — collapses on success. */}
          <div className="contact-collapse mt-[var(--space-md)]">
            <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-ink-quiet">
              <span>{content.whatsappPrompt}</span>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                {content.whatsappLabel}
                <span aria-hidden className="font-display">
                  →
                </span>
              </a>
            </div>
          </div>

          <p className="mt-[var(--space-xl)] border-t border-paper-deep pt-[var(--space-md)] text-xs leading-relaxed text-ink-quiet">
            {content.crisis}
          </p>
        </div>
      </div>
    </section>
  );
}
