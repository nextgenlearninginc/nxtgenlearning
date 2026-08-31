import { Quote } from "lucide-react";

import { Section, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { testimonials } from "@/lib/data/content";

export function Testimonials() {
  // Renders nothing until real, consented testimonials exist. See the
  // comment in src/lib/data/content.ts before adding any entries.
  if (testimonials.length === 0) return null;

  return (
    <Section>
      <div className="container">
        <SectionHeading
          eyebrow="Testimonials"
          title="Loved by families and volunteers"
          description="Stories from the students, parents, and tutors who make NextGen Learning what it is."
        />

        <RevealGroup
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {testimonials.map((t) => (
            <RevealItem key={t.name}>
              <Card className="flex h-full flex-col p-6">
                <Quote className="h-7 w-7 text-primary/30" />
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/90">
                  {t.quote}
                </p>
                <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gradient text-sm font-semibold text-white">
                    {t.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
