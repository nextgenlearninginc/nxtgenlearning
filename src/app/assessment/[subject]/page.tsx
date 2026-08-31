import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AssessmentRunner } from "@/components/assessment/assessment-runner";
import { mathQuestions } from "@/lib/data/math-questions";
import { englishQuestions } from "@/lib/data/english-questions";
import type { Subject } from "@/types";

const VALID: Subject[] = ["math", "english"];

export function generateStaticParams() {
  return VALID.map((subject) => ({ subject }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subject: string }>;
}): Promise<Metadata> {
  const { subject } = await params;
  const label = subject === "math" ? "Math" : "English";
  return {
    title: `${label} Assessment`,
    description: `Take the free 15-question ${label} placement assessment and find your learning level.`,
  };
}

export default async function AssessmentSubjectPage({
  params,
}: {
  params: Promise<{ subject: string }>;
}) {
  const { subject: raw } = await params;
  const subject = raw as Subject;
  if (!VALID.includes(subject)) notFound();

  const questions = subject === "math" ? mathQuestions : englishQuestions;

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-soft-radial" />
      <div className="container relative py-16 sm:py-20">
        <AssessmentRunner subject={subject} questions={questions} />
      </div>
    </section>
  );
}
