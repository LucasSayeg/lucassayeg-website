"use client";

import { cn } from "@/lib/utils";
import type { useContactForm } from "@/ui/contact/hooks/useContactForm";
import { SITE_META, WHATSAPP_HREF } from "@/ui/home/data";
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

const labelClass = "block text-[0.78rem] uppercase tracking-[0.22em] text-ink-quiet";
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
 * Reserved-height slot below an input. Distinct vocabularies for distinct
 * signals: warnings carry the accent dot + soft message; affirmations
 * carry an editorial display-italic margin note ("Anotado."). The ink-soft
 * tone keeps things steady for an audience that doesn't need to feel scolded.
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

type ContactFormProps = ReturnType<typeof useContactForm>;

export function ContactForm({
  form,
  onSubmit,
  isSubmitting,
  submitResult,
  reset,
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
          aria-label="Formulário de contato"
          noValidate
        >
          <div className="space-y-2">
            <label htmlFor="contact-name" className={labelClass}>
              Nome{requiredMark}
            </label>
            <input
              id="contact-name"
              type="text"
              autoComplete="name"
              {...register("name")}
              aria-invalid={!!errors.name}
              aria-describedby="contact-name-hint"
              placeholder="Como você gostaria de ser chamado(a)"
              disabled={isSubmitting}
              className={fieldClass}
            />
            <FieldHint
              id="contact-name-hint"
              status={fieldStatus("name", !!errors.name)}
              message={errors.name?.message}
              validMessage="Bom te conhecer."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-email" className={labelClass}>
              E-mail{requiredMark}
            </label>
            <input
              id="contact-email"
              type="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={!!errors.email}
              aria-describedby="contact-email-hint"
              placeholder="seuemail@exemplo.com"
              disabled={isSubmitting}
              className={fieldClass}
            />
            <FieldHint
              id="contact-email-hint"
              status={fieldStatus("email", !!errors.email)}
              message={errors.email?.message}
              validMessage="Anotado."
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="contact-message" className={labelClass}>
              Mensagem{requiredMark}
            </label>
            <textarea
              id="contact-message"
              rows={5}
              {...register("message")}
              aria-invalid={!!errors.message}
              aria-describedby="contact-message-hint"
              placeholder="Conte um pouco sobre o que está te trazendo aqui — algumas linhas já bastam."
              disabled={isSubmitting}
              className={cn(fieldClass, "resize-y min-h-32 max-h-80")}
            />
            <FieldHint
              id="contact-message-hint"
              status={fieldStatus("message", !!errors.message)}
              message={errors.message?.message}
              validMessage="Grato pela mensagem."
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

          <div className="flex flex-wrap items-center justify-between gap-4 pt-(--space-2xs)">
            <p className="text-xs text-ink-quiet">
              <span aria-hidden>* </span>
              campos obrigatórios
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex items-center gap-3 whitespace-nowrap rounded-sm bg-ink px-6 py-3 text-sm uppercase tracking-[0.16em] text-paper",
                "transition-colors duration-200 hover:bg-accent-deep",
                "disabled:cursor-wait disabled:bg-ink-quiet",
              )}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden />
                  <span>Enviando…</span>
                </>
              ) : (
                <>
                  <span>Enviar mensagem</span>
                  <span aria-hidden className="font-display normal-case">
                    →
                  </span>
                </>
              )}
            </button>
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
          <p className="text-(length:--text-lg) leading-snug text-ink">
            Obrigado pela sua mensagem.
          </p>
          <p className="text-(length:--text-base) leading-relaxed text-ink-soft">
            Lucas responderá pessoalmente em até <em className="not-italic">um dia útil</em>. Se
            preferir uma conversa mais imediata, você pode me chamar pelo{" "}
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
          <button
            type="button"
            onClick={reset}
            className="text-sm text-ink-quiet underline decoration-ink-faint decoration-1 underline-offset-[5px] hover:text-ink hover:decoration-accent-soft"
          >
            Enviar outra mensagem
          </button>
        </div>
      </div>
    </div>
  );
}
