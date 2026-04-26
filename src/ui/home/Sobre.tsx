import Link from "next/link";
import { SOBRE, SITE_META } from "@/ui/home/data";

/*
  Renders bold-marked text from data — the source uses **...** for emphasis on
  the credentials. Simple inline parser, not full markdown.
*/
function withEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-medium text-ink">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

export function Sobre() {
  return (
    <section id="sobre" aria-labelledby="sobre-heading" className="py-[var(--space-3xl)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        {/* Off-grid asymmetric divider — the brief calls for one carefully placed handmade gesture. */}
        <div className="mb-[var(--space-2xl)] deck-divider" aria-hidden>
          <span>sobre</span>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-xl)] lg:grid-cols-12 lg:gap-[var(--space-2xl)]">
          <figure
            className="portrait-placeholder mx-auto aspect-[4/5] w-full max-w-[380px] lg:col-span-4 lg:max-w-none"
            aria-label="Imagem ambiente do consultório (a substituir)"
          >
            <span className="portrait-placeholder__label">Imagem · a substituir</span>
          </figure>

          <div className="lg:col-span-8">
            <h2
              id="sobre-heading"
              className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.1] tracking-[-0.015em] text-ink"
            >
              <span className="handmade-underline">{SITE_META.name}</span>
            </h2>

            <p className="mt-[var(--space-md)] max-w-[60ch] font-display text-[length:var(--text-lg)] italic leading-relaxed text-ink-soft">
              {SOBRE.intro}
            </p>

            <div className="mt-[var(--space-lg)] space-y-[var(--space-md)] max-w-[64ch] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
              {SOBRE.paragraphs.map((p, i) => (
                <p key={i}>{withEmphasis(p)}</p>
              ))}
            </div>

            <p className="mt-[var(--space-lg)]">
              <Link
                href="/sobre"
                prefetch
                className="inline-flex items-center gap-2 text-sm text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                {SOBRE.cta}
                <span aria-hidden className="font-display italic">
                  →
                </span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
