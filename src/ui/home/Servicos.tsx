import { SERVICOS } from "@/ui/home/data";

/*
  Two columns: Psicoterapia (Clínica) + Orientação Profissional.
  Topic items rendered as inline punctuated text — not pill tags.
*/
export function Servicos() {
  return (
    <section
      id="servicos"
      aria-labelledby="servicos-heading"
      className="border-t border-paper-deep bg-paper-soft/40 py-[var(--space-3xl)]"
    >
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] flex flex-wrap items-end justify-between gap-x-[var(--space-lg)] gap-y-[var(--space-md)]">
          <h2
            id="servicos-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.08] tracking-[-0.015em] text-ink"
          >
            Serviços.
          </h2>
          <p className="max-w-[34ch] text-sm leading-relaxed text-ink-quiet">
            Dois trabalhos próximos, com escutas distintas. O primeiro contato ajuda a decidir qual
            deles faz mais sentido para você agora.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-[var(--space-2xl)] md:grid-cols-2">
          {SERVICOS.map((s, i) => (
            <article key={s.id} className="relative">
              <span
                aria-hidden
                className="nums-old-style absolute -top-2 right-0 font-display text-[length:var(--text-xl)] italic text-ink-faint"
              >
                {`№ ${String(i + 1).padStart(2, "0")}`}
              </span>

              <h3 className="font-display text-[length:var(--text-2xl)] font-normal leading-[1.05] tracking-[-0.012em] text-ink">
                {s.label}
                <span className="block font-display text-[length:var(--text-xl)] italic text-ink-quiet">
                  {s.sublabel}
                </span>
              </h3>

              <p className="mt-[var(--space-md)] max-w-[52ch] text-[length:var(--text-base)] leading-[1.65] text-ink-soft">
                {s.framing}
              </p>

              <p className="mt-[var(--space-md)] max-w-[52ch] text-[length:var(--text-base)] leading-[1.7] text-ink-quiet">
                {s.items.map((it, idx) => (
                  <span key={it}>
                    <span className="text-ink">{it}</span>
                    {idx < s.items.length - 1 && (
                      <span aria-hidden className="mx-2 text-ink-faint">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
