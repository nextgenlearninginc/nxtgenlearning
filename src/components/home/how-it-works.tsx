import { Section, SectionHeading } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { howItWorks } from "@/lib/data/content";

export function HowItWorks() {
  return (
    <Section className="bg-muted/30">
      <div className="container">
        <SectionHeading
          eyebrow="How it works"
          title="Four steps to your first session"
          description="Getting started is simple. Most families go from assessment to their first class in a single week."
        />

        <RevealGroup className="relative mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line on large screens */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent lg:block"
          />
          {howItWorks.map((step, i) => (
            <RevealItem key={step.title} className="relative">
              <div className="flex flex-col items-start gap-4">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient font-display text-lg font-bold text-white shadow-soft">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-display text-lg font-semibold">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
