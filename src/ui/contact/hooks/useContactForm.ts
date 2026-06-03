"use client";

import { sendContactEmail, type ContactActionResult } from "@/app/actions/contact";
import { Contact } from "@/core/contact";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";

export function useContactForm() {
  const [submitResult, setSubmitResult] = useState<ContactActionResult | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<Contact.SubmissionValues>({
    // Zod v4.3 types not fully supported by @hookform/resolvers yet — runtime works correctly
    resolver: zodResolver(Contact.formSchema as any),
    // Lazy by default: silent while typing, validates on blur or submit.
    // Once a field is errored, re-validates on change so the success state
    // appears the instant the user fixes it; then goes quiet again.
    mode: "onBlur",
    reValidateMode: "onChange",
    // Errors render inline below each field (with role="alert"), so the
    // default scroll-to-first-error is just an unwanted jump for sighted users.
    shouldFocusError: false,
    defaultValues: {
      name: "",
      email: "",
      message: "",
      // Honeypot — left empty by humans, only bots fill it.
      company: "",
    },
  });

  // "Reward early, punish late": neutral/valid fields stay lazy (onBlur above),
  // but a field already in error re-validates on every keystroke so the moment
  // it's fixed the warning swaps to the valid hint — without waiting for blur.
  // RHF's reValidateMode only kicks in after the first submit attempt, so this
  // covers the pre-submit case.
  useEffect(() => {
    const subscription = form.watch((_values, { name, type }) => {
      if (type === "change" && name && form.getFieldState(name).error) {
        void form.trigger(name);
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = (values: Contact.SubmissionValues) => {
    setSubmitResult(null);
    startTransition(async () => {
      // zodResolver strips `company` from the parsed values (it's not a schema
      // key), so read the honeypot straight from form state for the server check.
      const company = form.getValues("company");
      const result = await sendContactEmail({ ...values, company });
      setSubmitResult(result);

      if (result.success) {
        form.reset();
      }
    });
  };

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: isPending,
    submitResult,
    reset: () => setSubmitResult(null),
  };
}
