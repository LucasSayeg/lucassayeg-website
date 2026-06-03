import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getSiteInfo } from "@/lib/home-content";

/*
  Link-preview card — the first impression when the site is shared on
  WhatsApp (the practice's primary channel). Portrait-led by design: a
  stranger deciding whether to tap needs Lucas's face and name, not a
  monogram. The clay band + navy double-rule echo the site masthead so the
  card and the page read as one piece.

  The CMS mark is deliberately absent here: it ships in arbitrary solid
  colors (the site recolors it via CSS mask, which satori can't do), so it
  can't be guaranteed legible on these grounds. The favicon carries it.

  Without a portrait (or with Payload off) the card degrades to the
  typographic nameplate — no broken image, no empty slot.
*/

export const revalidate = 3600;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Lucas Sayeg — Psicólogo clínico e orientador profissional";

/* Site tokens resolved to sRGB — satori has no oklch() support. */
const C = {
  paper: "#f5f3ef", // --paper
  band: "#152e4e", // --masthead (navy ink plate)
  bandText: "#c7c3be", // --ink-on-dark-quiet
  rule: "#193c67", // --accent
  ink: "#1e1510", // --ink
  inkSoft: "#413731", // --ink-soft
  plate: "#2c2821", // --surface-deep (the Sobre portrait-plate gesture)
};

async function loadPortraitDataUri(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    const base = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
    const abs = url.startsWith("http") ? url : `${base}${url}`;
    const res = await fetch(abs);
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    const buf = Buffer.from(await res.arrayBuffer());
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OpengraphImage() {
  const info = await getSiteInfo();
  const portrait = await loadPortraitDataUri(info.portrait?.url);
  const [petrona400, petrona600] = await Promise.all([
    readFile(path.join(process.cwd(), "src/assets/og/petrona-400.ttf")),
    readFile(path.join(process.cwd(), "src/assets/og/petrona-600.ttf")),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: C.paper,
        fontFamily: "Petrona",
      }}
    >
      {/* Masthead band */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: 84,
          backgroundColor: C.band,
          paddingLeft: 72,
          paddingRight: 72,
        }}
      >
        <div
          style={{
            fontSize: 23,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: C.bandText,
          }}
        >
          {info.region}
        </div>
      </div>

      {/* Press rule — the plate is the thick stroke; paper slit + thin echo */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ height: 6, backgroundColor: C.paper }} />
        <div style={{ height: 2, backgroundColor: C.rule }} />
      </div>

      {/* Nameplate + portrait */}
      <div style={{ display: "flex", flex: 1, alignItems: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            paddingLeft: 72,
            paddingRight: 48,
          }}
        >
          <div
            style={{
              fontSize: 86,
              fontWeight: 600,
              color: C.ink,
              lineHeight: 1.02,
              letterSpacing: -1,
            }}
          >
            {info.name}
          </div>
          <div
            style={{
              fontSize: 34,
              fontWeight: 400,
              color: C.inkSoft,
              marginTop: 26,
              lineHeight: 1.3,
              maxWidth: 560,
            }}
          >
            {info.slogan}
          </div>
        </div>

        {portrait ? (
          <div
            style={{
              display: "flex",
              position: "relative",
              width: 414,
              height: 470,
              marginRight: 72,
            }}
          >
            {/* Offset ink plate — the Sobre portrait gesture, carried over */}
            <div
              style={{
                position: "absolute",
                left: -14,
                top: 14,
                width: 414,
                height: 456,
                backgroundColor: C.plate,
              }}
            />
            <img
              src={portrait}
              width={414}
              height={456}
              style={{ objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        ) : null}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Petrona", data: petrona400, weight: 400 },
        { name: "Petrona", data: petrona600, weight: 600 },
      ],
    },
  );
}
