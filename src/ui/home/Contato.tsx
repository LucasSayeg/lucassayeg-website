import { ContactForm } from "@/ui/contact/ContactForm";
import { CONTATO, WHATSAPP_HREF } from "@/ui/home/data";

/*
  Contato — the only section that interrupts the page rhythm.
  Slightly warmer surface, larger top/bottom padding. Form is primary;
  WhatsApp is secondary. Privacy note + crisis disclaimer flank the form.
*/
export function Contato() {
  return (
    <section
      id="contato"
      aria-labelledby="contato-heading"
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
            {CONTATO.heading}
          </h2>
          <p className="mx-auto mt-[var(--space-md)] max-w-[52ch] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
            {CONTATO.invite}
          </p>
        </div>

        <div className="mx-auto mt-[var(--space-2xl)] max-w-[560px]">
          <ContactForm />

          {/* Secondary WhatsApp link */}
          <div className="mt-[var(--space-md)] flex flex-wrap items-center justify-between gap-3 text-sm text-ink-quiet">
            <span>{CONTATO.whatsappPrompt}</span>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
            >
              {CONTATO.whatsappLabel}
              <span aria-hidden className="font-display">
                →
              </span>
            </a>
          </div>

          {/* Crisis disclaimer — placeholder until Lucas writes the final */}
          <p className="mt-[var(--space-xl)] border-t border-paper-deep pt-[var(--space-md)] text-xs leading-relaxed text-ink-quiet">
            {CONTATO.crisis}
          </p>
        </div>
      </div>
    </section>
  );
}
