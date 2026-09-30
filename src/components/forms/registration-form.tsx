"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  Loader2,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitRegistration } from "@/lib/services";
import { cn } from "@/lib/utils";
import type { RegistrationPayload } from "@/types";

const GRADES = [
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
];

const empty: RegistrationPayload = {
  parentName: "",
  email: "",
  studentFirstName: "",
  studentGrade: "",
  agreed: false,
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function RegistrationForm() {
  const reduce = useReducedMotion();

  const [form, setForm] = React.useState<RegistrationPayload>(empty);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const set = <K extends keyof RegistrationPayload>(
    key: K,
    value: RegistrationPayload[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!form.parentName.trim()) e.parentName = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!emailOk(form.email)) e.email = "That email doesn't look right";
    if (!form.studentFirstName.trim())
      e.studentFirstName = "Please enter your student's first name";
    if (!form.studentGrade) e.studentGrade = "Please select a grade";
    if (!form.agreed) e.agreed = "Please confirm to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const res = await submitRegistration(form);
    if (res.ok) {
      setStatus("success");
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } else {
      setStatus("error");
    }
  }

  /* ---------------------------- CONFIRMATION ---------------------------- */
  if (status === "success") {
    return (
      <div className="mx-auto max-w-lg">
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
          <div className="bg-brand-gradient p-10 text-center text-white">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
              You&apos;re signed up!
            </h1>
            <p className="mt-2 text-white/85">
              Welcome to NextGen Learning, {form.parentName.split(" ")[0]}.
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <div className="rounded-2xl border border-border bg-muted/40 p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <CalendarCheck className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-lg font-bold">
                    Next: pick a time for your first lesson
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    We&apos;ll email{" "}
                    <span className="font-medium text-foreground">
                      {form.email}
                    </span>{" "}
                    within 1–2 days with a few scheduling options for{" "}
                    {form.studentFirstName}&apos;s first lesson. We&apos;ll
                    also ask a couple of quick questions then — like subject
                    focus and availability — so signup could stay short.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
              <Sparkles className="mx-auto mb-1.5 h-4 w-4 text-secondary" />
              Curious where {form.studentFirstName} stands right now?{" "}
              <Link
                href="/assessment"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Try our free practice check
              </Link>{" "}
              — totally optional, any time.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button asChild variant="gradient" size="lg">
                <Link href="/">Back to home</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/faq">Read the FAQ</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  /* ------------------------------- FORM ------------------------------- */
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-lg rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5">
        <Field
          label="Parent/guardian name"
          id="parentName"
          value={form.parentName}
          onChange={(v) => set("parentName", v)}
          error={errors.parentName}
          autoComplete="name"
          placeholder="Jane Smith"
        />
        <Field
          label="Email"
          id="email"
          type="email"
          value={form.email}
          onChange={(v) => set("email", v)}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <Field
          label="Student first name"
          id="studentFirstName"
          value={form.studentFirstName}
          onChange={(v) => set("studentFirstName", v)}
          error={errors.studentFirstName}
          autoComplete="given-name"
          placeholder="Alex"
        />

        <div className="space-y-2">
          <Label htmlFor="studentGrade">Student grade</Label>
          <Select
            value={form.studentGrade}
            onValueChange={(v) => set("studentGrade", v)}
          >
            <SelectTrigger id="studentGrade" className="h-14 text-base">
              <SelectValue placeholder="Select a grade" />
            </SelectTrigger>
            <SelectContent>
              {GRADES.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.studentGrade ? (
            <p className="text-xs text-destructive">{errors.studentGrade}</p>
          ) : null}
        </div>

        <label
          className={cn(
            "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
            form.agreed ? "border-secondary bg-secondary/5" : "border-border"
          )}
        >
          <Checkbox
            checked={form.agreed}
            onCheckedChange={(v) => set("agreed", Boolean(v))}
            className="mt-0.5 h-5 w-5"
          />
          <span className="text-sm text-muted-foreground">
            I&apos;m this student&apos;s parent or guardian and I agree to
            the{" "}
            <Link
              href="/terms"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </span>
        </label>
        {errors.agreed ? (
          <p className="-mt-3 text-xs text-destructive">{errors.agreed}</p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm text-destructive">
            Something went wrong submitting your signup. Please try again.
          </p>
        ) : null}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          className="h-14 w-full text-base"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Submitting…
            </>
          ) : (
            <>
              Get started
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Takes less than a minute. We&apos;ll follow up to schedule your
          first lesson.
        </p>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        inputMode={type === "email" ? "email" : undefined}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "h-14 text-base",
          error && "border-destructive focus-visible:ring-destructive"
        )}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
