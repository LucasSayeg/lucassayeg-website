import { z } from "zod";

export namespace Contact {
  export type FormValues = {
    name: string;
    email: string;
    message: string;
  };

  /*
    pt-BR validation messages, framed as suggestions (never as blame).
    Phrasing follows the form/error UX-writing pattern: state what's
    needed, give a small example or hint where it helps.
  */
  export const formSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Por favor, informe seu nome (pelo menos duas letras)." }),
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
      .max(4000, {
        message: "Sua mensagem ficou um pouco longa. Tente resumir em até 4000 caracteres.",
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
