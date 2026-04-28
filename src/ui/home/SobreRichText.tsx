import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { RichText } from "@payloadcms/richtext-lexical/react";

/*
  Renders the Sobre body Lexical document. The styling matches the
  fallback path in Sobre.tsx — paragraphs flow inside a `space-y` parent,
  so we just disable the default container wrapper and let the parent
  handle vertical rhythm.
*/

type Props = {
  data: SerializedEditorState;
};

export function SobreRichText({ data }: Props) {
  return <RichText data={data} disableContainer />;
}
