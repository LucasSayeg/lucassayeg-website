import { z } from "zod";

export namespace Contact {
  export type FormValues = {
    name: string;
    email: string;
    message: string;
  };

  /** Wire shape sent to the server: the parsed form values plus the honeypot
   *  field. `company` is stripped by `formSchema` (it's not a schema key), so it
   *  never reaches the email — it exists only for the server-side bot check. */
  export type SubmissionValues = FormValues & { company?: string };

  /** Shared message ceiling — drives the Zod `.max()`, the native `maxLength`,
   *  and the live countdown so they can never drift apart. */
  export const MESSAGE_MAX = 4000;

  /*
    pt-BR validation messages, framed as suggestions (never as blame).
    Phrasing follows the form/error UX-writing pattern: state what's
    needed, give a small example or hint where it helps.
  */
  export const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Por favor, informe seu nome (pelo menos duas letras)." })
      // Defense-in-depth against email-header injection — the name is
      // interpolated into the message subject/body downstream.
      .regex(/^[^\r\n]+$/, { message: "O nome não pode conter quebras de linha." }),
    email: z
      .string()
      .trim()
      .min(1, { message: "Por favor, informe um e-mail para retorno." })
      .email({ message: "Esse e-mail não parece válido. Confira se há um @ e um domínio." }),
    message: z
      .string()
      .trim()
      .min(20, {
        message:
          "Algumas linhas a mais ajudam a preparar a primeira conversa — por volta de 20 caracteres.",
      })
      .max(MESSAGE_MAX, {
        message: `Sua mensagem ficou um pouco longa. Tente resumir em até ${MESSAGE_MAX} caracteres.`,
      }),
  });

  export namespace Errors {
    export class SubmissionError extends Error {
      constructor(message = "Falha ao enviar a mensagem") {
        super(message);
        this.name = "SubmissionError";
      }
    }
  }
}
