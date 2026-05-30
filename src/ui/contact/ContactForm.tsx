"use client";

import { cn } from "@/lib/utils";
import type { useContactForm } from "@/ui/contact/hooks/useContactForm";
import { FALLBACK_CONTACT_FORM, type ContactFormContent } from "@/lib/home-content-types";
import { CONTACT_FORM, SITE_META, WHATSAPP_HREF } from "@/lib/home-data";
import { Loader2 } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { Eyebrow } from "@/ui/components/Eyebrow";
import { UnderlineLink, underlineLinkClass } from "@/ui/components/UnderlineLink";

const fieldClass = cn(
  // A faint, slightly-lighter-than-the-clay-surface tint + a firmer underline
  // (--field-line, ≥3:1) so the field reads as a writable inset before focus —
  // the resting paper-deep rule was ~1.17:1 and disappeared into the surface.
  "block w-full min-h-11 rounded-t-sm border-0 border-b border-[var(--field-line)] px-3 py-2",
  "bg-[color-mix(in_oklch,var(--paper)_55%,transparent)]",
  "font-sans text-(length:--text-base) leading-[1.5] text-ink",
  "placeholder:text-ink-quiet",
  "transition-[color,border-color,box-shadow,background-color] duration-200",
  // Focus reads as a clear navy accent underline (border + 1px shadow = a 2px
  // rule) — unambiguous "you're here" feedback at the most vulnerable element,
  // and a stronger signal than the previous border-only darkening.
  "focus:outline-none focus:border-accent focus:shadow-[0_1px_0_0_var(--color-accent)]",
  // Error stays warm, never alarming red — it shares the warning-ink the field
  // hints already use, and is distinct from the navy focus accent.
  "aria-[invalid=true]:border-[var(--warning-ink)] aria-[invalid=true]:shadow-[0_1px_0_0_var(--warning-ink)]",
  "aria-[invalid=true]:focus:border-accent aria-[invalid=true]:focus:shadow-[0_1px_0_0_var(--color-accent)]",
  "disabled:opacity-60",
);

type FieldStatus = "idle" | "valid" | "invalid";

type FieldHintProps = {
  id: string;
  status: FieldStatus;
  message?: string;
  validMessage?: string;
  /** Show the valid-state affirmation. Reserved for the name field — the
   * human-recognition moment — so email/message stay quiet and the
   * affirmation reads as intentional warmth rather than per-field applause. */
  affirm?: boolean;
  children?: ReactNode;
};

/**
 * Reserved-height slot below an input. Warnings carry the warning dot + soft
 * message; the name field's affirmation carries an editorial display-italic
 * margin note. Without `affirm`, the valid state is silent (treated as idle).
 */
function FieldHint({
  id,
  status,
  message,
  validMessage,
  affirm = false,
  children,
}: FieldHintProps) {
  const effectiveStatus = status === "valid" && !(affirm && validMessage) ? "idle" : status;
  const visible = effectiveStatus !== "idle";
  return (
    <div className="field-hint" data-status={effectiveStatus}>
      <p
        id={id}
        role={effectiveStatus === "invalid" ? "alert" : undefined}
        className="field-hint__text"
        aria-hidden={!visible}
      >
        {effectiveStatus === "invalid" && message ? (
          <>
            <span aria-hidden className="field-hint__mark">
              ·
            </span>
            {message}
          </>
        ) : effectiveStatus === "valid" ? (
          <span className="field-hint__valid">{validMessage}</span>
        ) : (
          (children ?? " ")
        )}
      </p>
    </div>
  );
}

type ContactFormProps = ReturnType<typeof useContactForm> & {
  copy?: ContactFormContent;
};

export function ContactForm({
  form,
  onSubmit,
  isSubmitting,
  submitResult,
  reset,
  copy = FALLBACK_CONTACT_FORM,
}: ContactFormProps) {
  const {
    register,
    formState: { errors, touchedFields },
  } = form;

  // Watched so the near-limit countdown updates live (one field, fine to subscribe).
  const messageLength = form.watch("message")?.length ?? 0;

  const isSuccess = !!submitResult?.success;
  const hasSubmitError = !!submitResult && !submitResult.success;

  const fieldStatus = (name: keyof typeof touchedFields, hasError: boolean): FieldStatus => {
    if (hasError) return "invalid";
    if (touchedFields[name]) return "valid";
    return "idle";
  };

  // Build the mailto on click so it captures whatever is in the inputs
  // at that moment — register() is uncontrolled, so we read with
  // getValues() instead of subscribing every keystroke.
  const handleMailtoFallback = (event: MouseEvent<HTMLAnchorElement>) => {
    const values = form.getValues();
    const name = values.name?.trim() || "Sem nome";
    const subject = `Contato pelo site — ${name}`;
    const body = [
      `Nome: ${values.name ?? ""}`,
      `E-mail: ${values.email ?? ""}`,
      "",
      values.message ?? "",
    ].join("\n");
    event.currentTarget.href = `mailto:${SITE_META.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="contact-swap" data-state={isSuccess ? "success" : "form"}>
      <div className="contact-swap__pane contact-swap__pane--form" inert={isSuccess}>
        <form
          onSubmit={onSubmit}
          className="space-y-(--space-md)"
          aria-label={CONTACT_FORM.ariaLabel}
          noValidate
        >
          <div className="space-y-2">
            <Eyebrow as="label" htmlFor="contact-name" className="block">
              {CONTACT_FORM.nameLabel}
            </Eyebrow>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              required
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-hint"
              placeholder={copy.namePlaceholder}
              disabled={isSubmitting}
              className={fieldClass}
            />
            <FieldHint
              id="contact-name-hint"
              status={fieldStatus("name", !!errors.name)}
              message={errors.name?.message}
              validMessage={copy.nameValidHint}
              affirm
            />
          </div>

          <div className="space-y-2">
            <Eyebrow as="label" htmlFor="contact-email" className="block">
              {CONTACT_FORM.emailLabel}
            </Eyebrow>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              required
              spellCheck={false}
              autoCapitalize="none"
              autoCorrect="off"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-hint"
              placeholder={copy.emailPlaceholder}
              disabled={isSubmitting}
              className={fieldClass}
            />
            <FieldHint
              id="contact-email-hint"
              status={fieldStatus("email", !!errors.email)}
              message={errors.email?.message}
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-baseline justify-between gap-3">
              <Eyebrow as="label" htmlFor="contact-message">
                {CONTACT_FORM.messageLabel}
              </Eyebrow>
              {/* Quiet countdown — only surfaces as the field nears the ceiling,
                  so a long message isn't rejected only after submit. */}
              {messageLength > 3500 ? (
                <span
                  aria-hidden
                  className={cn(
                    "nums-tabular text-xs",
                    messageLength > 4000 ? "text-[var(--warning-ink)]" : "text-ink-quiet",
                  )}
                >
                  {Math.max(0, 4000 - messageLength)} restantes
                </span>
              ) : null}
            </div>
            <textarea
              id="contact-message"
              rows={5}
              required
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby="contact-message-hint"
              placeholder={copy.messagePlaceholder}
              disabled={isSubmitting}
              className={cn(fieldClass, "resize-y min-h-32 max-h-80")}
            />
            <FieldHint
              id="contact-message-hint"
              status={fieldStatus("message", !!errors.message)}
              message={errors.message?.message}
            />
          </div>

          <div
            className="form-banner"
            data-visible={hasSubmitError}
            role={hasSubmitError ? "alert" : undefined}
            aria-hidden={!hasSubmitError}
          >
            <p className="form-banner__text">
              <span aria-hidden className="form-banner__mark">
                ·
              </span>
              Não consegui enviar sua mensagem agora. Você pode tentar de novo em um instante,{" "}
              <UnderlineLink
                href={`mailto:${SITE_META.email}`}
                onClick={handleMailtoFallback}
                variant="tight"
                className="text-ink"
              >
                enviar pelo seu app de e-mail
              </UnderlineLink>{" "}
              (com o que você escreveu já preenchido), ou falar com Lucas pelo{" "}
              <UnderlineLink href={WHATSAPP_HREF} external variant="tight" className="text-ink">
                WhatsApp
              </UnderlineLink>
              .
            </p>
          </div>

          <div className="space-y-3 pt-(--space-2xs)">
            <p className="text-xs leading-relaxed text-ink-quiet">{copy.disclaimer}</p>
            <div className="flex flex-wrap items-center justify-end gap-4">
              <p className="text-xs text-ink-quiet">{CONTACT_FORM.requiredHint}</p>
              <button type="submit" disabled={isSubmitting} className="btn-outline btn-outline--lg">
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                    <span>{CONTACT_FORM.submitLoadingLabel}</span>
                  </>
                ) : (
                  <>
                    <span>{CONTACT_FORM.submitLabel}</span>
                    <span aria-hidden className="font-display normal-case">
                      →
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div
        className="contact-swap__pane contact-swap__pane--success"
        role="status"
        aria-live="polite"
        inert={!isSuccess}
      >
        <div className="space-y-(--space-md)">
          <p className="text-(length:--text-lg) leading-snug text-ink">{copy.successHeading}</p>
          <p className="text-(length:--text-base) leading-relaxed text-ink-soft">
            {copy.successBody}
          </p>
          <p className="text-(length:--text-base) leading-relaxed text-ink-soft">
            {copy.successWhatsappPrompt}{" "}
            <UnderlineLink href={WHATSAPP_HREF} external variant="tight" className="text-ink">
              {CONTACT_FORM.successWhatsappLabel}
            </UnderlineLink>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className={underlineLinkClass({
              variant: "tight",
              className: "text-sm text-ink-quiet hover:text-ink",
            })}
          >
            {CONTACT_FORM.successResetLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
