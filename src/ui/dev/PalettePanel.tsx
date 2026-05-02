/*
  Palette exploration — temporary scaffolding.
  Floating dev-only panel. Each row is a plain <a> to ?palette=<id> —
  intentionally NOT a next/link, so navigation forces a full reload.
  The cookie write happens server-side in src/middleware.ts; the hard
  reload guarantees the new <html data-palette> attribute and all CSS
  variables apply cleanly, instead of relying on a soft RSC re-render
  that may skip the root element.
*/

import type { CSSProperties } from "react";
import { PALETTES, type PaletteId } from "@/core/palettes";

type Props = {
  current: PaletteId;
};

const cardStyle: CSSProperties = {
  position: "fixed",
  bottom: 16,
  right: 16,
  zIndex: 90,
  width: 220,
  padding: "10px 12px 8px",
  background: "var(--paper)",
  color: "var(--ink)",
  border: "1px solid var(--paper-deep)",
  borderRadius: 8,
  font: "12px/1.4 var(--font-mono)",
  boxShadow: "0 4px 16px oklch(0 0 0 / 0.08)",
};

const labelStyle: CSSProperties = {
  display: "block",
  fontSize: 10,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--ink-faint)",
  marginBottom: 6,
};

const rowBase: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "5px 4px",
  borderRadius: 4,
  textDecoration: "none",
  color: "inherit",
};

const rowActive: CSSProperties = {
  ...rowBase,
  background: "var(--paper-soft)",
};

const swatchTrioStyle: CSSProperties = {
  display: "inline-flex",
  gap: 2,
  alignItems: "center",
};

const swatchDot = (color: string): CSSProperties => ({
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: color,
  border: "1px solid var(--paper-deep)",
});

const radioBase: CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
  border: "1px solid var(--ink-quiet)",
  flexShrink: 0,
};

const radioActive: CSSProperties = {
  ...radioBase,
  background: "var(--ink)",
  borderColor: "var(--ink)",
};

const nameStyle: CSSProperties = {
  flex: 1,
  fontSize: 12,
  color: "var(--ink-soft)",
};

export function PalettePanel({ current }: Props) {
  return (
    <aside aria-label="Paleta — seletor de desenvolvimento" style={cardStyle}>
      <span style={labelStyle}>Paleta</span>
      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {PALETTES.map((palette) => {
          const active = palette.id === current;
          return (
            <li key={palette.id}>
              <a
                href={`?palette=${palette.id}&palette-picker=1`}
                style={active ? rowActive : rowBase}
                aria-current={active ? "true" : undefined}
              >
                <span style={active ? radioActive : radioBase} aria-hidden="true" />
                <span style={swatchTrioStyle} aria-hidden="true">
                  <span style={swatchDot(palette.swatches.paper)} />
                  <span style={swatchDot(palette.swatches.ink)} />
                  <span style={swatchDot(palette.swatches.accent)} />
                </span>
                <span style={nameStyle}>{palette.name}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
