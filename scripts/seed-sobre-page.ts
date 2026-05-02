import { getPayload } from "payload";
import config from "@payload-config";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { SOBRE, SOBRE_BOTTOM_CTA } from "@/lib/home-data";

const IS_BOLD = 1;

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

async function main() {
  const payload = await getPayload({ config });
  await payload.updateGlobal({
    slug: "sobre-page",
    data: {
      lede: SOBRE.intro,
      body: buildSobreLexical(SOBRE.paragraphs) as unknown as Record<string, unknown>,
      bottomCtaHeading: SOBRE_BOTTOM_CTA.heading,
      bottomCtaBody: SOBRE_BOTTOM_CTA.body,
      bottomCtaWhatsappLabel: SOBRE_BOTTOM_CTA.whatsappLabel,
      bottomCtaFormLabel: SOBRE_BOTTOM_CTA.formLabel,
    },
  });
  console.log("sobre-page seeded.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
