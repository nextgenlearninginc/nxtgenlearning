import * as React from "react";
import { Reveal } from "@/components/shared/reveal";
import { Eyebrow } from "@/components/shared/section";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 bg-soft-radial" />
      <div className="container relative py-16 sm:py-20">
        <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}
