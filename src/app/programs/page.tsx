import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Layers } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Section, SectionHeading } from "@/components/shared/section";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/shared/cta-band";
import { programs } from "@/lib/data/content";
import { mathLevels, englishLevels } from "@/lib/data/levels";

export const metadata: Metadata = {
  title: "Programs",
  description:
    "Explore NextGen Learning's free Math and English programs. Students are grouped by skill level, not age, across five progressive levels.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Programs"
        title="Two subjects. Five levels. One goal."
        description="Structured, level-based tutoring in Math and English — designed to meet every student exactly where they are and take them further."
      />

      <Section className="pt-4">
        <div className="container">
          <RevealGroup className="grid gap-6 lg:grid-cols-2">
            {programs.map((program) => (
              <RevealItem key={program.id}>
                <Card
                  id={program.id}
                  className="flex h-full scroll-mt-24 flex-col p-8"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                      <program.icon className="h-7 w-7" />
                    </span>
                    <Badge variant="secondary">{program.levelPrefix}1–{program.levelPrefix}5</Badge>
                  </div>
                  <h2 className="mt-6 font-display text-2xl font-bold">
                    {program.name}
                  </h2>
                  <p className="mt-1 text-sm font-medium text-primary">
                    {program.tagline}
                  </p>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {program.description}
                  </p>

                  <ul className="mt-6 grid grid-cols-2 gap-3">
                    {program.topics.map((topic) => (
                      <li key={topic} className="flex items-center gap-2 text-sm">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                          <Check className="h-3 w-3" strokeWidth={3} />
                        </span>
                        {topic}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex-1" />
                  <Button asChild variant="outline" className="mt-2 w-full">
                    <Link href={`/assessment/${program.id}`}>
                      Take the {program.name.split(" ")[0]} assessment
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Grouped by level, not age */}
      <Section className="bg-muted/30">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
            <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Layers className="h-6 w-6" />
            </span>
            <h2 className="mt-5 font-display text-2xl font-bold sm:text-3xl">
              Grouped by skill level, not age
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              A 4th grader who's ahead in reading and a 6th grader who needs a
              refresher can learn side by side — because we group students by
              what they're ready to learn next, not by their birthday. It keeps
              every group focused, supportive, and free of the pressure that
              comes with age-based classes.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Level breakdown */}
      <Section>
        <div className="container">
          <SectionHeading
            eyebrow="The five levels"
            title="A clear path from basics to advanced"
            description="Each subject has five progressive levels. Your placement assessment points you to the right starting rung."
          />

          <div className="mt-14 grid gap-10 lg:grid-cols-2">
            <LevelColumn title="Math levels" levels={mathLevels} />
            <LevelColumn title="English levels" levels={englishLevels} />
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}

function LevelColumn({
  title,
  levels,
}: {
  title: string;
  levels: typeof mathLevels;
}) {
  return (
    <div>
      <h3 className="mb-5 font-display text-lg font-semibold">{title}</h3>
      <RevealGroup className="space-y-3">
        {levels.map((level) => (
          <RevealItem key={level.code}>
            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft transition-colors hover:border-primary/30">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gradient font-display text-sm font-bold text-white">
                {level.code}
              </span>
              <div>
                <p className="font-display font-semibold">{level.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  {level.summary}
                </p>
              </div>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
