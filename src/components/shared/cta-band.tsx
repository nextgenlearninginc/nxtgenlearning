import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";
import { Section } from "@/components/shared/section";

export function CtaBand({
  title = "Ready to get started?",
  description = "Take the free placement assessment and find your student's level in about 10 minutes.",
  primaryLabel = "Take Assessment",
  primaryHref = "/assessment",
  secondaryLabel = "Become a Volunteer",
  secondaryHref = "/volunteer",
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <Section>
      <div className="container">
        <Reveal className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-14">
          <div className="pointer-events-none absolute inset-0 bg-soft-radial" />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-muted-foreground sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg">
                <Link href={primaryHref}>
                  {primaryLabel}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={secondaryHref}>{secondaryLabel}</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
