"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/ui/home/data";

/*
  Accordion — single-open. Opening one closes the previous.
  Uses grid-template-rows transition (no height animation).
*/
export function FAQ() {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-[var(--space-3xl)]">
      <div className="mx-auto max-w-[1240px] px-6 sm:px-8">
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-[var(--space-md)] md:grid-cols-12">
          <h2
            id="faq-heading"
            className="font-display text-[length:var(--text-3xl)] font-normal leading-[1.08] tracking-[-0.015em] text-ink md:col-span-7"
          >
            Perguntas frequentes.
          </h2>
          <p className="text-[length:var(--text-base)] leading-relaxed text-ink-quiet md:col-span-5 md:pt-3">
            O que costumam querer saber antes da primeira conversa.
          </p>
        </div>

        <ul className="mx-auto max-w-[920px] divide-y divide-paper-deep border-y border-paper-deep">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIdx === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={item.q}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="group flex w-full cursor-pointer items-baseline justify-between gap-[var(--space-lg)] py-[var(--space-md)] text-left transition-colors hover:bg-paper-soft/60"
                  >
                    <span className="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-md)]">
                      <span
                        aria-hidden
                        className="nums-old-style font-display text-[length:var(--text-base)] text-ink-faint"
                      >
                        {i + 1}.
                      </span>
                      <span className="font-display text-[length:var(--text-xl)] font-medium leading-[1.25] text-ink">
                        {item.q}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-paper-deep text-ink-quiet transition-transform duration-300 ease-[var(--ease-out-quart)]"
                      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </span>
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  data-open={open}
                  className="accordion-panel"
                >
                  <div className="accordion-panel-inner">
                    <div className="grid grid-cols-[auto_1fr] gap-[var(--space-md)] pb-[var(--space-md)] pl-[1.6rem]">
                      <span aria-hidden className="block w-px bg-paper-deep" />
                      <div className="max-w-[58ch] space-y-[var(--space-2xs)] text-[length:var(--text-base)] leading-[1.7] text-ink-soft">
                        {item.a.map((para, j) => (
                          <p key={j}>{para}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
