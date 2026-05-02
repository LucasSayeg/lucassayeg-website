/*
  Palette exploration — temporary scaffolding.
  Two query params, both cookie-backed so the chosen state survives
  navigations:
    ?palette=<id>          → persist the chosen palette
    ?palette-picker=1|0    → show / hide the floating dev panel
  Both branches share a single response so a URL with both params updates
  both cookies in one pass. Invalid palette ids and unknown picker values
  are no-ops — the existing cookie (or default) stands.
*/

import { NextResponse, type NextRequest } from "next/server";
import { COOKIE_NAME, PALETTE_IDS, PICKER_COOKIE_NAME } from "@/core/palettes";

const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30; // 30 days

export function middleware(req: NextRequest): NextResponse {
  const requestedPalette = req.nextUrl.searchParams.get("palette");
  const isValidPaletteSwitch =
    requestedPalette != null &&
    PALETTE_IDS.has(requestedPalette) &&
    req.cookies.get(COOKIE_NAME)?.value !== requestedPalette;

  const requestedPicker = req.nextUrl.searchParams.get("palette-picker");
  const currentPicker = req.cookies.get(PICKER_COOKIE_NAME)?.value;
  const wantsPickerOn = requestedPicker === "1" && currentPicker !== "1";
  const wantsPickerOff = requestedPicker === "0" && currentPicker === "1";

  if (!isValidPaletteSwitch && !wantsPickerOn && !wantsPickerOff) {
    return NextResponse.next();
  }

  // Mutate inbound cookies so the current render (RSC + layout) reads the
  // new state via cookies() — otherwise the user would only see the change
  // on the next navigation.
  if (isValidPaletteSwitch) {
    req.cookies.set(COOKIE_NAME, requestedPalette);
  }
  if (wantsPickerOn) {
    req.cookies.set(PICKER_COOKIE_NAME, "1");
  }
  if (wantsPickerOff) {
    req.cookies.delete(PICKER_COOKIE_NAME);
  }

  const response = NextResponse.next({ request: { headers: req.headers } });

  if (isValidPaletteSwitch) {
    response.cookies.set({
      name: COOKIE_NAME,
      value: requestedPalette,
      path: "/",
      maxAge: COOKIE_MAX_AGE_SECONDS,
      sameSite: "lax",
    });
  }
  if (wantsPickerOn) {
    response.cookies.set({
      name: PICKER_COOKIE_NAME,
      value: "1",
      path: "/",
      maxAge: COOKIE_MAX_AGE_SECONDS,
      sameSite: "lax",
    });
  }
  if (wantsPickerOff) {
    response.cookies.set({
      name: PICKER_COOKIE_NAME,
      value: "",
      path: "/",
      maxAge: 0,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|admin|.*\\..*).*)"],
};
