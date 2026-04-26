"use client";

import { useContactForm } from "@/ui/contact/hooks/useContactForm";
import { WHATSAPP_HREF } from "@/ui/home/data";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const fieldClass = cn(
  "block w-full bg-transparent border-0 border-b border-paper-deep px-0 py-2",
  "font-sans text-[length:var(--text-base)] leading-[1.5] text-ink",
  "placeholder:text-ink-quiet",
  "transition-colors duration-200",
  "focus:outline-none focus:border-ink",
  "aria-[invalid=true]:border-error-ink aria-[invalid=true]:focus:border-error-ink",
  "disabled:opacity-60",
);

const labelClass = "block text-[0.78rem] uppercase tracking-[0.22em] text-ink-quiet";
const requiredMark = (
  <span aria-hidden className="ml-1 text-ink-quiet">
    *
  </span>
);

export function ContactForm() {
  const { form, onSubmit, isSubmitting, submitResult, reset } = useContactForm();
  const {
    register,
    formState: { errors },
  } = form;

  if (submitResult?.success) {
    return (
      <div role="status" aria-live="polite" className="space-y-[var(--space-md)]">
        <p className="text-[length:var(--text-lg)] leading-snug text-ink">
          Obrigado pela sua mensagem.
        </p>
        <p className="text-[length:var(--text-base)] leading-relaxed text-ink-soft">
          Lucas responderá pessoalmente em até <em className="not-italic">um dia útil</em>. Se
          preferir uma conversa mais imediata, você pode me chamar pelo{" "}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[5px] hover:decoration-accent-soft"
          >
            WhatsApp
          </a>
          .
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-sm text-ink-quiet underline decoration-ink-faint decoration-[1px] underline-offset-[5px] hover:text-ink hover:decoration-accent-soft"
        >
          Enviar outra mensagem
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-[var(--space-lg)]"
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
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          placeholder="Como você gostaria de ser chamado(a)"
          disabled={isSubmitting}
          className={fieldClass}
        />
        {errors.name && (
          <p id="contact-name-error" role="alert" className="text-sm text-error-ink">
            {errors.name.message}
          </p>
        )}
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
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          placeholder="seuemail@exemplo.com"
          disabled={isSubmitting}
          className={fieldClass}
        />
        {errors.email && (
          <p id="contact-email-error" role="alert" className="text-sm text-error-ink">
            {errors.email.message}
          </p>
        )}
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
          aria-describedby={errors.message ? "contact-message-error" : undefined}
          placeholder="Conte um pouco sobre o que está te trazendo aqui — algumas linhas já bastam."
          disabled={isSubmitting}
          className={cn(fieldClass, "resize-y")}
        />
        {errors.message && (
          <p id="contact-message-error" role="alert" className="text-sm text-error-ink">
            {errors.message.message}
          </p>
        )}
      </div>

      {submitResult && !submitResult.success && (
        <p
          role="alert"
          className="border-l-0 border-t border-paper-deep pt-[var(--space-sm)] text-sm leading-relaxed text-ink-soft"
        >
          Algo deu errado ao enviar sua mensagem. Você pode tentar novamente em um instante, ou
          enviar diretamente pelo{" "}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noreferrer noopener"
            className="text-ink underline decoration-ink-faint decoration-[1px] underline-offset-[5px] hover:decoration-accent-soft"
          >
            WhatsApp
          </a>
          .
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 pt-[var(--space-2xs)]">
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
  );
}
