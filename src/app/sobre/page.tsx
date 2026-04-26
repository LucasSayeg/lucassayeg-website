import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/ui/home/Footer";
import { Header } from "@/ui/home/Header";
import { SITE_META, SOBRE } from "@/ui/home/data";

export const metadata: Metadata = {
  title: { absolute: `Sobre — ${SITE_META.name}` },
  description: SOBRE.intro,
};

/*
  /sobre — minimal stub. Full scope (formação, percurso, abordagem, CRP details)
  is deferred to a dedicated impeccable pass. For now: bio paragraphs from data.ts
  so that the home-page "Saiba mais" link doesn't 404.
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

export default function SobrePage() {
  return (
    <>
      <Header />
      <main id="main">
        <article className="py-[var(--space-4xl)]">
          <div className="mx-auto max-w-[680px] px-6 sm:px-8">
            <p className="mb-[var(--space-md)] flex items-center gap-3 text-[0.78rem] uppercase tracking-[0.24em] text-ink-quiet">
              <span aria-hidden className="inline-block h-px w-8 bg-ink-faint" />
              Sobre
            </p>
            <h1 className="font-display text-[length:var(--text-4xl)] font-normal leading-[1.05] tracking-[-0.018em] text-ink">
              {SITE_META.name}
            </h1>
            <p className="mt-[var(--space-2xs)] font-display text-[length:var(--text-lg)] text-ink-soft">
              {SITE_META.slogan}
            </p>

            <p className="mt-[var(--space-xl)] max-w-[60ch] font-display text-[length:var(--text-xl)] leading-relaxed text-ink-soft">
              {SOBRE.intro}
            </p>

            <div className="mt-[var(--space-xl)] space-y-[var(--space-md)] max-w-[64ch] text-[length:var(--text-base)] leading-[1.75] text-ink-soft">
              {SOBRE.paragraphs.map((p, i) => (
                <p key={i}>{withEmphasis(p)}</p>
              ))}
            </div>

            <p className="mt-[var(--space-2xl)] border-t border-paper-deep pt-[var(--space-md)] font-display text-sm text-ink-quiet">
              {SITE_META.crp}
            </p>

            <p className="mt-[var(--space-2xl)]">
              <Link
                href="/#contato"
                className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.18em] text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[6px] transition-colors hover:text-accent hover:decoration-accent-soft"
              >
                Voltar para o início
                <span aria-hidden className="font-display normal-case">
                  ←
                </span>
              </Link>
            </p>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
