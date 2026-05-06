/*
  Palette exploration — temporary scaffolding.
  Single source of truth for the palette allowlist and panel display data.
  Imported by both src/middleware.ts and src/ui/dev/PalettePanel.tsx.
  Pure data, no React or framework imports.

  Order: lights first (bone, cold-press), then darks (ink-slate, foundry,
  pressed-navy). Each palette is an answer to a different design question
  about *within-palette* contrast — see palettes.css for the per-palette
  hypothesis.
*/

export type PaletteSwatches = {
  paper: string;
  ink: string;
  accent: string;
};

export type Palette = {
  id: string;
  name: string;
  swatches: PaletteSwatches;
};

export const PALETTES = [
  {
    id: "bone",
    name: "Bone",
    swatches: {
      paper: "oklch(0.985 0.006 82)",
      ink: "oklch(0.205 0.018 50)",
      accent: "oklch(0.355 0.085 28)",
    },
  },
  {
    id: "cold-press",
    name: "Cold Press",
    swatches: {
      paper: "oklch(0.985 0.003 85)",
      ink: "oklch(0.205 0.008 80)",
      accent: "oklch(0.45 0.13 28)",
    },
  },
  {
    id: "ink-slate",
    name: "Ink Slate",
    swatches: {
      paper: "oklch(0.22 0.012 60)",
      ink: "oklch(0.92 0.01 80)",
      accent: "oklch(0.62 0.085 32)",
    },
  },
  {
    id: "foundry",
    name: "Foundry",
    swatches: {
      paper: "oklch(0.16 0.012 55)",
      ink: "oklch(0.96 0.012 82)",
      accent: "oklch(0.7 0.115 32)",
    },
  },
  {
    id: "pressed-navy",
    name: "Pressed Navy",
    swatches: {
      paper: "oklch(0.2 0.045 260)",
      ink: "oklch(0.93 0.018 75)",
      accent: "oklch(0.65 0.12 32)",
    },
  },
] as const satisfies readonly Palette[];

export type PaletteId = (typeof PALETTES)[number]["id"];

export const PALETTE_IDS: ReadonlySet<string> = new Set(PALETTES.map((p) => p.id));

export const DEFAULT_PALETTE_ID: PaletteId = "bone";

export const COOKIE_NAME = "palette";
export const PICKER_COOKIE_NAME = "palette-picker";

export function isPaletteId(value: unknown): value is PaletteId {
  return typeof value === "string" && PALETTE_IDS.has(value);
}
