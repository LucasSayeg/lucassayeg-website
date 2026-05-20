import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/*
  Page container — the 1240px gutter every section sits inside. Pulled out
  because every section, the header, and the footer were copying the same
  three classes. Layout extensions (grid, mt, etc.) pass through `className`
  so each call site keeps its own internal rhythm.
*/

type PageContainerProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children: ReactNode;
};

export function PageContainer<T extends ElementType = "div">({
  as,
  className,
  children,
}: PageContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType;
  return <Tag className={cn("mx-auto max-w-[1240px] px-6 sm:px-8", className)}>{children}</Tag>;
}
