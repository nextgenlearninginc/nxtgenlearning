import type { Metadata } from "next";
import { Target, Eye, Flag } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { CtaBand } from "@/components/shared/cta-band";
import { coreValues } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about NextGen Learning's mission to make high-quality Math and English tutoring free and accessible for every student.",
};

const missionVision = [
  {
    icon: Target,
    label: "Mission",
    body: "To provide completely free, high-quality online Math and English tutoring to elementary and middle school students — so that financial circumstances never limit a child's potential.",
  },
  {
    icon: Eye,
    label: "Vision",
    body: "A world where every child, everywhere, has access to a caring tutor and the confidence to love learning — no matter their background or budget.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="Education should belong to everyone."
        description="NextGen Learning is a nonprofit built on a simple belief: every child deserves access to high-quality education, regardless of financial circumstances."
      />

      <Section className="pt-4">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {missionVision.map((item) => (
              <RevealItem key={item.label}>
                <Card className="h-full p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold">
                    {item.label}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Our story */}
      <Section className="bg-muted/30">
        <div className="container grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="Our story"
              title="It started with one struggling student."
            />
          </Reveal>
          <Reveal from="left" className="space-y-5 text-muted-foreground">
            <p className="leading-relaxed">
              NextGen Learning began when a group of high school volunteers
              noticed a pattern: bright, curious kids falling behind in math and
              reading — not for lack of ability, but for lack of support that
              their families couldn't afford to buy.
            </p>
            <p className="leading-relaxed">
              What started as a handful of weekend sessions over video call grew
              into a structured, level-based program. We built placement
              assessments so every student starts exactly where they are, and we
              organized small groups so no one gets lost in the crowd.
            </p>
            <p className="leading-relaxed">
              Today, dozens of trained volunteer tutors give their time each
              week because they've seen what a little consistent attention can
              do for a child's confidence — and their future.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Why we started */}
      <Section>
        <div className="container">
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
              <Flag className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
              Why we started
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Private tutoring can cost more per hour than many families can
              spend in a week. That means the students who could benefit most
              from extra help are often the least likely to receive it. We
              started NextGen Learning to break that cycle — to prove that
              world-class tutoring can be organized by volunteers, delivered
              online, and offered to families at absolutely no cost.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Core values */}
      <Section className="bg-muted/30">
        <div className="container">
          <SectionHeading
            eyebrow="Core values"
            title="What we stand for"
            description="Five principles guide every session, every group, and every volunteer we welcome."
          />
          <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {coreValues.map((value) => (
              <RevealItem key={value.title}>
                <Card className="h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <value.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand
        title="Join the mission"
        description="Whether you learn with us or teach with us, there's a place for you at NextGen Learning."
        primaryLabel="Enroll a student"
        primaryHref="/register"
      />
    </>
  );
}
