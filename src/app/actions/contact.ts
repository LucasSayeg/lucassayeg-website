"use server";

import { Contact } from "@/core/contact";
import { Resend } from "resend";

export type ContactActionResult =
  | { success: true }
  | { success: false; errors?: Record<string, string[]>; error?: string };

const trim = (value: string | undefined) => {
  const v = value?.trim();
  return v && v.length > 0 ? v : undefined;
};

export async function sendContactEmail(values: Contact.FormValues): Promise<ContactActionResult> {
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
  const from = trim(process.env.CONTACT_EMAIL_FROM) ?? "onboarding@resend.dev";

  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not configured.");
    return { success: false, error: "Email service is not configured" };
  }
  if (!to) {
    console.error("[contact] CONTACT_EMAIL_TO is not configured.");
    return { success: false, error: "Email service is not configured" };
  }

  const { name, email, message } = result.data;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Portfolio Contact: ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      console.error("[contact] Resend API error:", error);
      return { success: false, error: "Failed to send message" };
    }

    return { success: true };
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return { success: false, error: "Failed to send message" };
  }
}
