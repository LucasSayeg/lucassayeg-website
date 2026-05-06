"use client";

import { cn } from "@/lib/utils";
import type { useContactForm } from "@/ui/contact/hooks/useContactForm";
import { FALLBACK_CONTACT_FORM, type ContactFormContent } from "@/lib/home-content-types";
import { CONTACT_FORM, SITE_META, WHATSAPP_HREF } from "@/lib/home-data";
import { Loader2 } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";

const fieldClass = cn(
  "block w-full bg-transparent border-0 border-b border-paper-deep px-0 py-2",
  "font-sans text-(length:--text-base) leading-[1.5] text-ink",
  "placeholder:text-ink-quiet",
  "transition-[color,border-color,box-shadow] duration-200",
  "focus:outline-none focus:border-ink",
  // "needs attention" reads softer than red, but still clearly distinct from rest state.
  // box-shadow (not border-b-2) gives the 2px visual without reflowing the field.
  "aria-[invalid=true]:border-ink-soft aria-[invalid=true]:shadow-[0_1px_0_0_var(--color-ink-soft)]",
  "aria-[invalid=true]:focus:border-ink aria-[invalid=true]:focus:shadow-[0_1px_0_0_var(--color-ink)]",
  "disabled:opacity-60",
);

const labelClass =
  "block text-[0.78rem] font-normal uppercase leading-none tracking-[0.22em] text-ink-quiet";
const requiredMark = (
  <span aria-hidden className="ml-1 text-ink-quiet">
    *
  </span>
);

type FieldStatus = "idle" | "valid" | "invalid";

type FieldHintProps = {
  id: string;
  status: FieldStatus;
  message?: string;
  validMessage: string;
  children?: ReactNode;
};

/**
 * Reserved-height slot below an input. Warnings carry the accent dot + soft
 * message; affirmations carry an editorial display-italic margin note. The
 * acknowledgement varies by field so each completion lands as its own small
 * moment, kept ink-soft so it reads as a quiet aside rather than applause.
 */
function FieldHint({ id, status, message, validMessage, children }: FieldHintProps) {
  const visible = status !== "idle";
  return (
    <div className="field-hint" data-status={status}>
      <p
        id={id}
        role={status === "invalid" ? "alert" : undefined}
        className="field-hint__text"
        aria-hidden={!visible}
      >
        {status === "invalid" && message ? (
          <>
            <span aria-hidden className="field-hint__mark">
              ·
            </span>
            {message}
          </>
        ) : status === "valid" ? (
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
            <label htmlFor="contact-name" className={labelClass}>
              {CONTACT_FORM.nameLabel}
              {requiredMark}
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
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
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email" className={labelClass}>
              {CONTACT_FORM.emailLabel}
              {requiredMark}
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
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
              validMessage={copy.emailValidHint}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className={labelClass}>
              {CONTACT_FORM.messageLabel}
              {requiredMark}
            </label>
            <textarea
              id="contact-message"
              rows={5}
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
              validMessage={copy.messageValidHint}
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
              <a
                href={`mailto:${SITE_META.email}`}
                onClick={handleMailtoFallback}
                className="text-ink underline decoration-ink-faint decoration-1 underline-offset-[5px] hover:decoration-accent-soft"
              >
                enviar pelo seu app de e-mail
              </a>{" "}
              (com o que você escreveu já preenchido), ou falar com Lucas pelo{" "}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noreferrer noopener"
                className="text-ink underline decoration-ink-faint decoration-1 underline-offset-[5px] hover:decoration-accent-soft"
              >
                WhatsApp
              </a>
              .
            </p>
          </div>

          <div className="space-y-3 pt-(--space-2xs)">
            <p className="text-xs leading-relaxed text-ink-quiet">{copy.disclaimer}</p>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-ink-quiet">
                <span aria-hidden>* </span>
                {CONTACT_FORM.requiredHint}
              </p>
              <button type="submit" disabled={isSubmitting} className="btn-primary btn-primary--lg">
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
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer noopener"
              className="text-ink underline decoration-ink-faint decoration-1 underline-offset-[5px] hover:decoration-accent-soft"
            >
              {CONTACT_FORM.successWhatsappLabel}
            </a>
            .
          </p>
          <button
            type="button"
            onClick={reset}
            className="text-sm text-ink-quiet underline decoration-ink-faint decoration-1 underline-offset-[5px] hover:text-ink hover:decoration-accent-soft"
          >
            {CONTACT_FORM.successResetLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
