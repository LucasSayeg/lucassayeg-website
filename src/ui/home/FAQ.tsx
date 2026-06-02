"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { FALLBACK_FAQ, type FaqContent } from "@/lib/home-content-types";
import { PageContainer } from "@/ui/components/PageContainer";
import { Section } from "@/ui/components/Section";
import { SectionHeading } from "@/ui/components/SectionHeading";

/*
  Accordion — single-open. Opening one closes the previous.
  Uses grid-template-rows transition (no height animation).
*/

type FAQProps = { content?: FaqContent };

export function FAQ({ content = FALLBACK_FAQ }: FAQProps = {}) {
  const [openIdx, setOpenIdx] = React.useState<number | null>(null);

  return (
    <Section id="faq" className="bg-paper-clay">
      <PageContainer>
        <div className="mb-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--space-lg)] gap-y-[var(--space-md)] md:grid-cols-12">
          <SectionHeading id="faq-heading" className="md:col-span-7">
            Perguntas frequentes.
          </SectionHeading>
          <p className="text-[length:var(--text-base)] leading-relaxed text-ink-quiet md:col-span-5 md:pt-3">
            {content.subtitle}
          </p>
        </div>

        <ul className="mx-auto max-w-[920px] divide-y divide-paper-deep border-y border-paper-deep">
          {content.items.map((item, i) => {
            const open = openIdx === i;
            const panelId = `faq-panel-${i}`;
            const buttonId = `faq-button-${i}`;
            return (
              <li key={item.question}>
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIdx(open ? null : i)}
                    className="group flex w-full cursor-pointer items-baseline justify-between gap-[var(--space-lg)] py-[var(--space-md)] text-left transition-colors hover:bg-paper-deep/40"
                  >
                    <span className="grid grid-cols-[auto_1fr] items-baseline gap-[var(--space-md)]">
                      <span
                        aria-hidden
                        className="nums-old-style font-display text-[length:var(--text-base)] text-ink-faint"
                      >
                        {i + 1}.
                      </span>
                      <span className="font-display text-[length:var(--text-xl)] font-medium leading-[1.25] text-ink">
                        {item.question}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={`mt-1 inline-flex h-7 w-6 shrink-0 items-center justify-center transition-[transform,color] duration-300 ease-[var(--ease-out-quart)] ${
                        open ? "text-accent" : "text-ink-quiet group-hover:text-ink-soft"
                      }`}
                      style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
                    >
                      <Plus className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.25} />
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
                        {item.answer.map((para, j) => (
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
      </PageContainer>
    </Section>
  );
}
