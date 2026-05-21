import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Page section wrapper. Enforces the id + aria-labelledby pairing every
  section needs (so the screen-reader landmark always announces the
  visible heading) and locks the default vertical rhythm at
  py-[var(--space-3xl)]. Surface treatments (bg, border, padding overrides)
  stay as className — each section's visual register is a deliberate
  choice that doesn't belong in a prop matrix.

  Convention: `aria-labelledby` defaults to `${id}-heading`. The
  SectionHeading inside the section should carry that id. Override via
  the `aria-labelledby` prop when the convention doesn't fit.
*/

type SectionProps = Omit<HTMLAttributes<HTMLElement>, "id"> & {
  id: string;
  children: ReactNode;
};

export function Section({
  id,
  "aria-labelledby": ariaLabelledBy,
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy ?? `${id}-heading`}
      className={cn("py-[var(--space-3xl)]", className)}
      {...rest}
    >
      {children}
    </section>
  );
}
