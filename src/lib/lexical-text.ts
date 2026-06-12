/*
  Plain-text extraction from Lexical rich-text state, for non-HTML surfaces
  (llms.txt). Defensive on purpose: editor state arrives as loosely-typed
  JSON, so every access is guarded rather than trusting the serialized shape.
*/

import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

type LooseNode = {
  text?: unknown;
  children?: unknown;
};

function collectText(node: LooseNode): string {
  let out = typeof node.text === "string" ? node.text : "";
  if (Array.isArray(node.children)) {
    for (const child of node.children) {
      if (child && typeof child === "object") out += collectText(child as LooseNode);
    }
  }
  return out;
}

/** Each top-level block of the editor state as one trimmed plain-text paragraph. */
export function lexicalToParagraphs(state: SerializedEditorState | null | undefined): string[] {
  const children = (state as { root?: LooseNode } | null | undefined)?.root?.children;
  if (!Array.isArray(children)) return [];
  return children
    .filter((node): node is LooseNode => !!node && typeof node === "object")
    .map((node) => collectText(node).trim())
    .filter((text) => text.length > 0);
}

/** Removes the `**emphasis**` markers used by the hardcoded fallback paragraphs. */
export function stripEmphasisMarkers(text: string): string {
  return text.replace(/\*\*([^*]+)\*\*/g, "$1");
}
