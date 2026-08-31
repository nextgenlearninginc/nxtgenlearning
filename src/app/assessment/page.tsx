import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Calculator } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { mathLevels, englishLevels } from "@/lib/data/levels";

export const metadata: Metadata = {
  title: "Take the Assessment",
  description:
    "Take a free 15-question placement assessment in Math or English and get matched to the right learning level in about 10 minutes.",
};

const choices = [
  {
    subject: "math" as const,
    title: "Math Assessment",
    description:
      "From arithmetic to algebra. Find the right starting point across our five math levels.",
    icon: Calculator,
    accent: "from-primary to-sky-500",
    levels: mathLevels,
  },
  {
    subject: "english" as const,
    title: "English Assessment",
    description:
      "From reading basics to essay writing. Discover your level across our five English tiers.",
    icon: BookOpen,
    accent: "from-secondary to-emerald-400",
    levels: englishLevels,
  },
];

export default function AssessmentPage() {
  return (
    <>
      <PageHeader
        eyebrow="Placement"
        title="Find your learning level"
        description="Pick a subject to begin. Each assessment is free, takes about 10 minutes, and ends with a personalized level and next step."
      />

      <section className="pb-24">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-2">
            {choices.map((choice) => {
              const Icon = choice.icon;
              return (
                <RevealItem key={choice.subject}>
                  <div className="group flex h-full flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-lift">
                    <span
                      className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${choice.accent} text-white shadow-lift`}
                    >
                      <Icon className="h-7 w-7" />
                    </span>
                    <h2 className="mt-6 font-display text-2xl font-bold tracking-tight">
                      {choice.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">
                      {choice.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {choice.levels.map((lvl) => (
                        <span
                          key={lvl.code}
                          className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {lvl.code} · {lvl.title}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 pt-2">
                      <Button asChild variant="gradient" size="lg" className="w-full">
                        <Link href={`/assessment/${choice.subject}`}>
                          Start {choice.subject === "math" ? "Math" : "English"} assessment
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>

          <Reveal className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-muted/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Taking both is a great idea if your student needs help in Math and
              English. You can complete one now and come back for the other any
              time \u2014 we\u2019ll remember your most recent level.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
