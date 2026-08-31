"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  CheckCircle2,
  ClipboardList,
  RotateCcw,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { LevelLadder } from "@/components/shared/level-ladder";
import { useAssessmentLevel } from "@/hooks/use-assessment-level";
import { getLevelsForSubject, scoreToLevel } from "@/lib/data/levels";
import { cn } from "@/lib/utils";
import type { AssessmentQuestion, Subject } from "@/types";

type Phase = "intro" | "quiz" | "results";

const subjectMeta: Record<
  Subject,
  { label: string; accent: string; blurb: string }
> = {
  math: {
    label: "Math",
    accent: "from-primary to-sky-500",
    blurb:
      "15 questions that gently ramp from arithmetic to algebra. There\u2019s no time limit \u2014 just answer what you can.",
  },
  english: {
    label: "English",
    accent: "from-secondary to-emerald-400",
    blurb:
      "15 questions from reading basics to essay craft. There\u2019s no time limit \u2014 do your best and skip nothing.",
  },
};

export function AssessmentRunner({
  subject,
  questions,
}: {
  subject: Subject;
  questions: AssessmentQuestion[];
}) {
  const reduce = useReducedMotion();
  const { setLevel } = useAssessmentLevel();

  const [phase, setPhase] = React.useState<Phase>("intro");
  const [index, setIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<number, string>>({});

  const meta = subjectMeta[subject];
  const total = questions.length;
  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = phase === "results" ? 100 : (index / total) * 100;

  const score = React.useMemo(
    () =>
      questions.reduce(
        (acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0),
        0
      ),
    [answers, questions]
  );

  const result = React.useMemo(
    () => scoreToLevel(subject, score),
    [subject, score]
  );

  const levels = getLevelsForSubject(subject);
  const activeRung = levels.findIndex((l) => l.code === result.code) + 1;

  function choose(optionId: string) {
    setAnswers((a) => ({ ...a, [current.id]: optionId }));
  }

  function next() {
    if (index < total - 1) {
      setIndex((i) => i + 1);
    } else {
      finish();
    }
  }

  function finish() {
    setLevel(result.code);
    setPhase("results");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    }
  }

  function restart() {
    setAnswers({});
    setIndex(0);
    setPhase("intro");
  }

  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -14 },
        transition: { duration: 0.28, ease: "easeOut" as const },
      };

  /* ----------------------------- INTRO ----------------------------- */
  if (phase === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft sm:p-12">
          <span
            className={cn(
              "inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lift",
              meta.accent
            )}
          >
            <ClipboardList className="h-7 w-7" />
          </span>
          <h1 className="mt-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {meta.label} Placement Assessment
          </h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            {meta.blurb}
          </p>

          <ul className="mt-6 space-y-3 text-sm">
            {[
              `${total} multiple-choice questions, increasing in difficulty`,
              "About 10 minutes \u2014 no timer, no pressure",
              "You\u2019ll get a level and a clear next step at the end",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="gradient"
              size="lg"
              onClick={() => setPhase("quiz")}
            >
              Start assessment
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/assessment">Choose a different subject</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------------------- RESULTS ---------------------------- */
  if (phase === "results") {
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          {...(reduce
            ? {}
            : {
                initial: { opacity: 0, scale: 0.96 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.4, ease: "easeOut" },
              })}
          className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft"
        >
          <div className="relative bg-brand-gradient p-8 text-center text-white sm:p-10">
            <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
            <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <Award className="h-7 w-7" />
            </span>
            <p className="relative mt-4 text-sm font-medium uppercase tracking-wider text-white/80">
              Congratulations!
            </p>
            <h1 className="relative mt-1 font-display text-3xl font-bold sm:text-4xl">
              {meta.label} Level {result.code}
            </h1>
            <p className="relative mt-1 text-lg font-medium text-white/90">
              {result.title}
            </p>
            <p className="relative mt-4 text-sm text-white/80">
              You scored {score} out of {total}
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <LevelLadder
              className="mx-auto max-w-sm"
              active={activeRung}
              rungs={levels.map((l) => ({
                code: l.code,
                label: l.title.split(" ")[0],
              }))}
            />

            <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5">
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Sparkles className="h-5 w-5 text-secondary" />
                What this level means
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {result.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {result.focus.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gradient" size="lg">
                <Link href="/register">
                  Continue Registration
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" onClick={restart}>
                <RotateCcw className="h-4 w-4" />
                Retake assessment
              </Button>
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Your level has been saved and will be filled in automatically on
              the registration form.
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ----------------------------- QUIZ ------------------------------ */
  const selected = answers[current.id];

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
          <span>
            Question {index + 1} of {total}
          </span>
          <span>{answeredCount} answered</span>
        </div>
        <Progress value={progress} />
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div key={current.id} {...fade}>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Difficulty {current.difficulty}/5
              </span>
            </div>
            <h2 className="font-display text-xl font-bold leading-snug sm:text-2xl">
              {current.prompt}
            </h2>

            <div
              role="radiogroup"
              aria-label="Answer choices"
              className="mt-6 grid gap-3"
            >
              {current.options.map((opt) => {
                const isSelected = selected === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => choose(opt.id)}
                    className={cn(
                      "group flex items-center gap-3 rounded-2xl border p-4 text-left transition-all duration-200",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border bg-card hover:border-primary/40 hover:bg-muted/50"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground group-hover:border-primary/50"
                      )}
                    >
                      {opt.id.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium sm:text-base">
                      {opt.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={index === 0}
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button variant="gradient" onClick={next} disabled={!selected}>
            {index === total - 1 ? "See results" : "Next"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
