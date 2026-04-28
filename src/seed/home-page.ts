import type { Payload } from "payload";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { COMO_AJUDA, CONTATO, FAQ_ITEMS, HERO, SERVICOS, SOBRE } from "@/lib/home-data";

const IS_BOLD = 1;

/*
  Convert paragraphs containing `**bold**` markers into a minimal Lexical
  SerializedEditorState. Splits each paragraph on the bold delimiter and emits
  a text node per span (format: 1 for bold).
*/
function buildSobreLexical(paragraphs: ReadonlyArray<string>): SerializedEditorState {
  const paragraphNodes = paragraphs.map((p) => {
    const segments = p.split(/(\*\*[^*]+\*\*)/g).filter((s) => s.length > 0);
    const children = segments.map((seg) => {
      const isBold = seg.startsWith("**") && seg.endsWith("**");
      const text = isBold ? seg.slice(2, -2) : seg;
      return {
        type: "text",
        format: isBold ? IS_BOLD : 0,
        detail: 0,
        mode: "normal",
        style: "",
        text,
        version: 1,
      };
    });
    return {
      type: "paragraph",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      textFormat: 0,
      textStyle: "",
      children,
    };
  });

  return {
    root: {
      type: "root",
      format: "",
      indent: 0,
      version: 1,
      direction: "ltr",
      children: paragraphNodes,
    },
  } as unknown as SerializedEditorState;
}

export async function seedHomePage(payload: Payload, _opts: { force?: boolean }) {
  await payload.updateGlobal({
    slug: "home-layout",
    data: {
      sections: [
        { key: "hero", enabled: true, navLabel: "" },
        { key: "comoAjuda", enabled: true, navLabel: "Como ajuda" },
        { key: "sobre", enabled: true, navLabel: "Sobre" },
        { key: "servicos", enabled: true, navLabel: "Serviços" },
        { key: "faq", enabled: true, navLabel: "FAQ" },
        { key: "contato", enabled: true, navLabel: "Contato" },
      ],
    },
  });

  await payload.updateGlobal({
    slug: "home-hero",
    data: {
      heading: HERO.heading,
      sub: HERO.sub,
      modalityOnline: HERO.modality.online,
      modalityPresencial: HERO.modality.presencial,
      ctaWhatsapp: HERO.ctaWhatsapp,
      cta: HERO.cta,
    },
  });

  await payload.updateGlobal({
    slug: "home-como-ajuda",
    data: {
      intro: COMO_AJUDA.intro,
      closing: COMO_AJUDA.closing,
      groups: COMO_AJUDA.groups.map((g) => ({
        label: g.label,
        words: g.words.map((w) => ({ value: w })),
      })),
    },
  });

  await payload.updateGlobal({
    slug: "home-sobre",
    data: {
      intro: SOBRE.intro,
      body: buildSobreLexical(SOBRE.paragraphs) as unknown as Record<string, unknown>,
      ctaLabel: SOBRE.cta,
    },
  });

  await payload.updateGlobal({
    slug: "home-servicos",
    data: {
      items: SERVICOS.map((s) => ({
        id: s.id,
        label: s.label,
        sublabel: s.sublabel,
        framing: s.framing,
        areas: s.items.map((a) => ({ value: a })),
      })),
    },
  });

  await payload.updateGlobal({
    slug: "home-faq",
    data: {
      items: FAQ_ITEMS.map((it) => ({
        question: it.q,
        answer: it.a.map((p) => ({ body: p })),
      })),
    },
  });

  await payload.updateGlobal({
    slug: "home-contato",
    data: {
      heading: CONTATO.heading,
      invite: CONTATO.invite,
      whatsappPrompt: CONTATO.whatsappPrompt,
      whatsappLabel: CONTATO.whatsappLabel,
      crisis: CONTATO.crisis,
    },
  });
}
