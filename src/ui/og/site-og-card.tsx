import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getBaseUrl } from "@/lib/base-url";
import { getSiteInfo } from "@/lib/home-content";

/*
  Link-preview card — the first impression when the site is shared on
  WhatsApp (the practice's primary channel). Portrait-led by design: a
  stranger deciding whether to tap needs Lucas's face and name, not a
  monogram. The wine band + double-rule echo the site masthead so the
  card and the page read as one piece.

  The CMS mark is deliberately absent here: it ships in arbitrary solid
  colors (the site recolors it via CSS mask, which satori can't do), so it
  can't be guaranteed legible on these grounds. The favicon carries it.

  The portrait is bundled in the repo, so the card stays portrait-led with
  Payload off and with an empty CMS; a CMS portrait overrides it. Only if the
  bundled file is unreadable too does the card degrade to the typographic
  nameplate — no broken image, no empty slot.

  This lives outside the route tree on purpose. Every page that declares its
  own `openGraph` block needs its own opengraph-image route (Next replaces a
  parent block wholesale rather than merging, so `images` does not cascade),
  and the routes must not import each other — a route file is a build entry
  point, not a module to reuse. They each wrap `renderSiteOgCard` instead.
*/

/* Site tokens resolved to sRGB — satori has no oklch() support. */
const C = {
  paper: "#f5f3ef", // --paper
  band: "#572729", // --masthead (rose ink plate)
  bandText: "#c7c3be", // --ink-on-dark-quiet
  rule: "#612629", // --accent
  ink: "#1e1510", // --ink
  inkSoft: "#413731", // --ink-soft
  plate: "#2c2821", // --surface-deep (the Sobre portrait-plate gesture)
};

/*
  The card's intrinsic dimensions. Each route also declares `size` as a static
  literal, because Next parses route config at compile time and cannot follow
  an import — keep the two in agreement.
*/
export const OG_SIZE = { width: 1200, height: 630 };

/*
  satori decodes only PNG and JPEG. Anything else reaching the <img> below
  throws inside the renderer, and because these routes are prerendered that
  failure exits the whole build ("TypeError: u2 is not iterable") rather than
  degrading the card. Two realistic sources of a non-image body that still
  answers 200: an upload stored as WebP/AVIF, and a blob URL that has gone
  away and now serves an HTML error page.

  So the content type is allow-listed rather than trusted, and every reject
  path returns null — which is the documented degradation to the typographic
  nameplate. A link-preview image must never be able to fail a deploy.
*/
const SATORI_DECODABLE = /^image\/(png|jpe?g)$/i;

async function loadPortraitDataUri(url: string | null | undefined): Promise<string | null> {
  if (!url) return null;
  try {
    const base = getBaseUrl();
    const abs = url.startsWith("http") ? url : `${base}${url}`;
    const res = await fetch(abs);
    if (!res.ok) return null;
    // No `?? "image/jpeg"` default: an absent content-type used to be assumed
    // decodable, which is precisely the assumption that broke the build.
    const type = res.headers.get("content-type")?.split(";")[0]?.trim() ?? "";
    if (!SATORI_DECODABLE.test(type)) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.byteLength === 0) return null;
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/*
  The portrait shipped in the repo — the same file the hero uses
  (src/ui/home/Hero.tsx), so the card and the page show one face.

  Read off disk rather than fetched, which is what makes it dependable: the
  CMS path above has to resolve a relative upload URL against this site's own
  domain and fetch it mid-build, and that is exactly what a preview
  deployment's SSO interstitial poisons. This path has no network in it, like
  the fonts. So the card is portrait-led by default and the CMS becomes an
  override rather than a requirement.
*/
async function loadBundledPortraitDataUri(): Promise<string | null> {
  try {
    const buf = await readFile(path.join(process.cwd(), "src/assets/lucas-portrait.jpg"));
    if (buf.byteLength === 0) return null;
    return `data:image/jpeg;base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

/** Renders the site-wide link-preview card. Shared by every opengraph-image route. */
export async function renderSiteOgCard(): Promise<ImageResponse> {
  const info = await getSiteInfo();
  // CMS portrait wins so the client can swap the face without a deploy; the
  // bundled one keeps the card portrait-led when the CMS has none (which is
  // the case in production today) or serves something undecodable.
  const portrait =
    (await loadPortraitDataUri(info.portrait?.url)) ?? (await loadBundledPortraitDataUri());
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
      ...OG_SIZE,
      fonts: [
        { name: "Petrona", data: petrona400, weight: 400 },
        { name: "Petrona", data: petrona600, weight: 600 },
      ],
    },
  );
}
