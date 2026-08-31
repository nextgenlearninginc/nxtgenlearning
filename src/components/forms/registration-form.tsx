"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAssessmentLevel } from "@/hooks/use-assessment-level";
import { findLevelByCode, mathLevels, englishLevels } from "@/lib/data/levels";
import { submitRegistration } from "@/lib/services";
import { cn } from "@/lib/utils";
import type { RegistrationPayload } from "@/types";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const steps = [
  { title: "Student", icon: UserRound },
  { title: "Guardian", icon: ShieldCheck },
  { title: "Program", icon: GraduationCap },
  { title: "Schedule", icon: CalendarDays },
] as const;

type Form = RegistrationPayload;

const empty: Form = {
  studentFirstName: "",
  studentLastName: "",
  age: "",
  grade: "",
  guardianName: "",
  guardianEmail: "",
  studentEmail: "",
  subject: "math",
  assessmentLevel: "",
  country: "",
  region: "",
  timezone: "",
  preferredDays: [],
  emergencyContact: "",
  notes: "",
  agreed: false,
};

const emailOk = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export function RegistrationForm() {
  const reduce = useReducedMotion();
  const { level, ready } = useAssessmentLevel();

  const [step, setStep] = React.useState(0);
  const [form, setForm] = React.useState<Form>(empty);
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [refId, setRefId] = React.useState<string>("");

  // Prefill assessment level once the hook has read localStorage.
  React.useEffect(() => {
    if (ready && level && !form.assessmentLevel) {
      setForm((f) => ({ ...f, assessmentLevel: level }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, level]);

  const set = <K extends keyof Form>(key: K, value: Form[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const next = { ...e };
      delete next[key as string];
      return next;
    });
  };

  const levelOptions = React.useMemo(() => {
    if (form.subject === "english") return englishLevels;
    if (form.subject === "math") return mathLevels;
    return [...mathLevels, ...englishLevels];
  }, [form.subject]);

  function validateStep(s: number): boolean {
    const e: Record<string, string> = {};
    if (s === 0) {
      if (!form.studentFirstName.trim()) e.studentFirstName = "Required";
      if (!form.studentLastName.trim()) e.studentLastName = "Required";
      if (!form.age.trim()) e.age = "Required";
      else if (Number(form.age) < 5 || Number(form.age) > 18)
        e.age = "Enter an age between 5 and 18";
      if (!form.grade.trim()) e.grade = "Required";
    }
    if (s === 1) {
      if (!form.guardianName.trim()) e.guardianName = "Required";
      if (!form.guardianEmail.trim()) e.guardianEmail = "Required";
      else if (!emailOk(form.guardianEmail))
        e.guardianEmail = "Enter a valid email";
      if (form.studentEmail && !emailOk(form.studentEmail))
        e.studentEmail = "Enter a valid email";
      if (!form.emergencyContact.trim()) e.emergencyContact = "Required";
    }
    if (s === 2) {
      if (!form.assessmentLevel) e.assessmentLevel = "Select a level";
      if (!form.country.trim()) e.country = "Required";
      if (!form.region.trim()) e.region = "Required";
      if (!form.timezone.trim()) e.timezone = "Required";
    }
    if (s === 3) {
      if (form.preferredDays.length === 0)
        e.preferredDays = "Pick at least one day";
      if (!form.agreed) e.agreed = "Please agree to continue";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validateStep(step)) return;
    if (step < steps.length - 1) setStep((s) => s + 1);
    else void submit();
  }

  function back() {
    setStep((s) => Math.max(0, s - 1));
  }

  async function submit() {
    setStatus("submitting");
    const res = await submitRegistration(form);
    if (res.ok) {
      setRefId(res.data.id);
      setStatus("success");
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } else {
      setStatus("error");
    }
  }

  function toggleDay(day: string) {
    set(
      "preferredDays",
      form.preferredDays.includes(day)
        ? form.preferredDays.filter((d) => d !== day)
        : [...form.preferredDays, day]
    );
  }

  const selectedLevel = findLevelByCode(form.assessmentLevel);

  /* ---------------------------- SUCCESS ---------------------------- */
  if (status === "success") {
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
          <div className="bg-brand-gradient p-10 text-center text-white">
            <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/15 backdrop-blur">
              <CheckCircle2 className="h-8 w-8" />
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold sm:text-4xl">
              You&apos;re registered!
            </h1>
            <p className="mt-2 text-white/85">
              Welcome to NextGen Learning, {form.studentFirstName}.
            </p>
          </div>
          <div className="p-8 sm:p-10">
            <p className="text-center leading-relaxed text-muted-foreground">
              We&apos;ve received your registration. A volunteer coordinator will
              email{" "}
              <span className="font-medium text-foreground">
                {form.guardianEmail}
              </span>{" "}
              within a few days to confirm session times and next steps.
            </p>
            <div className="mt-6 rounded-2xl border border-border bg-muted/40 p-5 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Reference</span>
                <span className="font-mono font-medium">{refId}</span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground">Level</span>
                <span className="font-medium">
                  {form.assessmentLevel || "To be assessed"}
                </span>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-muted-foreground">Subject</span>
                <span className="font-medium capitalize">{form.subject}</span>
              </div>
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

  const StepIcon = steps[step].icon;
  const fade = reduce
    ? {}
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
        transition: { duration: 0.28, ease: "easeOut" as const },
      };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Stepper */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const done = i < step;
            const active = i === step;
            return (
              <React.Fragment key={s.title}>
                <div className="flex flex-col items-center gap-2">
                  <span
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                      active &&
                        "border-transparent bg-brand-gradient text-white shadow-lift",
                      done &&
                        "border-secondary bg-secondary/10 text-secondary",
                      !active && !done && "border-border text-muted-foreground"
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-medium",
                      active ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {s.title}
                  </span>
                </div>
                {i < steps.length - 1 ? (
                  <div
                    className={cn(
                      "mx-1 h-0.5 flex-1 rounded-full transition-colors sm:mx-2",
                      i < step ? "bg-secondary" : "bg-border"
                    )}
                  />
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
        <Progress value={((step + 1) / steps.length) * 100} />
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <StepIcon className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-xl font-bold">
              {steps[step].title} details
            </h2>
            <p className="text-sm text-muted-foreground">
              Step {step + 1} of {steps.length}
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} {...fade}>
            {/* STEP 0 — STUDENT */}
            {step === 0 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="Student first name"
                  id="firstName"
                  value={form.studentFirstName}
                  onChange={(v) => set("studentFirstName", v)}
                  error={errors.studentFirstName}
                  autoComplete="given-name"
                />
                <Field
                  label="Student last name"
                  id="lastName"
                  value={form.studentLastName}
                  onChange={(v) => set("studentLastName", v)}
                  error={errors.studentLastName}
                  autoComplete="family-name"
                />
                <Field
                  label="Age"
                  id="age"
                  type="number"
                  value={form.age}
                  onChange={(v) => set("age", v)}
                  error={errors.age}
                  placeholder="e.g. 11"
                />
                <Field
                  label="Current grade"
                  id="grade"
                  value={form.grade}
                  onChange={(v) => set("grade", v)}
                  error={errors.grade}
                  placeholder="e.g. Grade 6"
                />
                <div className="sm:col-span-2">
                  <Field
                    label="Student email (optional)"
                    id="studentEmail"
                    type="email"
                    value={form.studentEmail}
                    onChange={(v) => set("studentEmail", v)}
                    error={errors.studentEmail}
                    placeholder="student@example.com"
                    autoComplete="email"
                  />
                </div>
              </div>
            ) : null}

            {/* STEP 1 — GUARDIAN */}
            {step === 1 ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Field
                    label="Parent/Guardian name"
                    id="guardianName"
                    value={form.guardianName}
                    onChange={(v) => set("guardianName", v)}
                    error={errors.guardianName}
                    autoComplete="name"
                  />
                </div>
                <Field
                  label="Parent email"
                  id="guardianEmail"
                  type="email"
                  value={form.guardianEmail}
                  onChange={(v) => set("guardianEmail", v)}
                  error={errors.guardianEmail}
                  placeholder="parent@example.com"
                  autoComplete="email"
                />
                <Field
                  label="Emergency contact"
                  id="emergencyContact"
                  value={form.emergencyContact}
                  onChange={(v) => set("emergencyContact", v)}
                  error={errors.emergencyContact}
                  placeholder="Name & phone"
                />
              </div>
            ) : null}

            {/* STEP 2 — PROGRAM */}
            {step === 2 ? (
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <RadioGroup
                    value={form.subject}
                    onValueChange={(v) =>
                      set("subject", v as Form["subject"])
                    }
                    className="grid grid-cols-3 gap-3"
                  >
                    {(["math", "english", "both"] as const).map((opt) => (
                      <label
                        key={opt}
                        className={cn(
                          "flex cursor-pointer items-center gap-2 rounded-xl border p-3 text-sm font-medium capitalize transition-colors",
                          form.subject === opt
                            ? "border-primary bg-primary/5"
                            : "border-border hover:bg-muted/50"
                        )}
                      >
                        <RadioGroupItem value={opt} id={`subject-${opt}`} />
                        {opt}
                      </label>
                    ))}
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="level">Assessment level</Label>
                  {form.assessmentLevel && level === form.assessmentLevel ? (
                    <p className="flex items-center gap-1.5 text-xs font-medium text-secondary">
                      <Sparkles className="h-3.5 w-3.5" />
                      Auto-filled from your assessment
                    </p>
                  ) : null}
                  <Select
                    value={form.assessmentLevel}
                    onValueChange={(v) => set("assessmentLevel", v)}
                  >
                    <SelectTrigger id="level">
                      <SelectValue placeholder="Select a level (or take the assessment)" />
                    </SelectTrigger>
                    <SelectContent>
                      {levelOptions.map((l) => (
                        <SelectItem key={l.code} value={l.code}>
                          {l.code} · {l.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.assessmentLevel ? (
                    <p className="text-xs text-destructive">
                      {errors.assessmentLevel}
                    </p>
                  ) : selectedLevel ? (
                    <p className="text-xs text-muted-foreground">
                      {selectedLevel.summary}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Haven&apos;t taken it yet?{" "}
                      <Link
                        href="/assessment"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        Take the free assessment
                      </Link>
                      .
                    </p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field
                    label="Country"
                    id="country"
                    value={form.country}
                    onChange={(v) => set("country", v)}
                    error={errors.country}
                    autoComplete="country-name"
                  />
                  <Field
                    label="Province/State"
                    id="region"
                    value={form.region}
                    onChange={(v) => set("region", v)}
                    error={errors.region}
                  />
                  <Field
                    label="Timezone"
                    id="timezone"
                    value={form.timezone}
                    onChange={(v) => set("timezone", v)}
                    error={errors.timezone}
                    placeholder="e.g. EST"
                  />
                </div>
              </div>
            ) : null}

            {/* STEP 3 — SCHEDULE */}
            {step === 3 ? (
              <div className="grid gap-5">
                <div className="space-y-2">
                  <Label>Preferred days</Label>
                  <div className="flex flex-wrap gap-2">
                    {DAYS.map((day) => {
                      const on = form.preferredDays.includes(day);
                      return (
                        <button
                          key={day}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleDay(day)}
                          className={cn(
                            "rounded-xl border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                            on
                              ? "border-primary bg-primary/5 text-primary"
                              : "border-border hover:bg-muted/50"
                          )}
                        >
                          {day}
                        </button>
                      );
                    })}
                  </div>
                  {errors.preferredDays ? (
                    <p className="text-xs text-destructive">
                      {errors.preferredDays}
                    </p>
                  ) : null}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={form.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="Anything we should know \u2014 learning goals, accommodations, scheduling constraints\u2026"
                    rows={4}
                  />
                </div>

                <label
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors",
                    form.agreed
                      ? "border-secondary bg-secondary/5"
                      : "border-border"
                  )}
                >
                  <Checkbox
                    checked={form.agreed}
                    onCheckedChange={(v) => set("agreed", Boolean(v))}
                    className="mt-0.5"
                  />
                  <span className="text-sm text-muted-foreground">
                    I agree to NextGen Learning&apos;s{" "}
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
                    , and confirm I am the student&apos;s parent or guardian.
                  </span>
                </label>
                {errors.agreed ? (
                  <p className="-mt-2 text-xs text-destructive">
                    {errors.agreed}
                  </p>
                ) : null}
              </div>
            ) : null}
          </motion.div>
        </AnimatePresence>

        {status === "error" ? (
          <p className="mt-6 text-sm text-destructive">
            Something went wrong submitting your registration. Please try again.
          </p>
        ) : null}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="ghost" onClick={back} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <Button
            variant="gradient"
            onClick={next}
            disabled={status === "submitting"}
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Submitting…
              </>
            ) : step === steps.length - 1 ? (
              <>
                Complete registration
                <CheckCircle2 className="h-4 w-4" />
              </>
            ) : (
              <>
                Continue
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
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
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(error && "border-destructive focus-visible:ring-destructive")}
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}
