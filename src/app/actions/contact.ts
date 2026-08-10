"use server";

import { Contact } from "@/core/contact";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { Resend } from "resend";

export type ContactActionResult =
  | { success: true }
  | { success: false; errors?: Record<string, string[]>; error?: string };

const trim = (value: string | undefined) => {
  const v = value?.trim();
  return v && v.length > 0 ? v : undefined;
};

export async function sendContactEmail(
  values: Contact.SubmissionValues,
): Promise<ContactActionResult> {
  // Honeypot — a real visitor never sees the `company` field, so any value
  // means a bot. Drop silently and report success so it can't probe for the
  // real failure path. (safeParse below also strips `company` regardless.)
  if (values.company && values.company.trim() !== "") {
    return { success: true };
  }

  // Everything below runs inside the try: `headers()`, `rateLimit()` and
  // `safeParse()` can all throw, and an action that rejects surfaces as an
  // unhandled rejection in the caller's `startTransition` — which takes the
  // whole page down via the error boundary instead of showing the form's
  // failure banner. Never let this function reject; always return a result.
  try {
    // Best-effort rate limit (per serverless instance — see lib/rate-limit.ts).
    // The failure banner already offers the WhatsApp/e-mail fallback, so this
    // state needs no dedicated UI.
    const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
    if (!rateLimit(`contact:${ip}`)) {
      return { success: false, error: "rate_limited" };
    }

    const result = Contact.formSchema.safeParse(values);

    if (!result.success) {
      const fieldErrors: Record<string, string[]> = {};
      for (const issue of result.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = [];
        fieldErrors[key].push(issue.message);
      }
      return { success: false, errors: fieldErrors };
    }

    const apiKey = trim(process.env.RESEND_API_KEY);
    const to = trim(process.env.CONTACT_EMAIL_TO);
    // Resend requires the From address domain to be verified on the account,
    // or the shared `onboarding@resend.dev` sender (handy for local/dev).
    // Must be `email@host` or `Name <email@host>` — a bare `<email@host>` is
    // rejected with a 422 `validation_error`.
    const from = trim(process.env.CONTACT_EMAIL_FROM) ?? "Site Lucas Sayeg <onboarding@resend.dev>";

    if (!apiKey) {
      console.error("[contact] RESEND_API_KEY is not configured.");
      return { success: false, error: "Email service is not configured" };
    }
    if (!to) {
      console.error("[contact] CONTACT_EMAIL_TO is not configured.");
      return { success: false, error: "Email service is not configured" };
    }

    const { name, email, message } = result.data;

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo contato pelo site — ${name}`,
      replyTo: email,
      text: [`Nome: ${name}`, `E-mail: ${email}`, "", "Mensagem:", message].join("\n"),
    });

    if (error) {
      // Resend returns the reason in `name`/`message` (e.g. `validation_error`
      // for a bad `from`, or a 403 when the shared sender is used with a
      // recipient that isn't the account owner). The client only ever sees the
      // generic banner, so log the detail or it is unrecoverable from logs.
      console.error(
        `[contact] Resend rejected the send — name=${error.name} message=${error.message} from=${from} to=${to}`,
      );
      return { success: false, error: "Failed to send message" };
    }

    return { success: true };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { success: false, error: "Failed to send message" };
  }
}
