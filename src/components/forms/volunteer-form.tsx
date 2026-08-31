"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Send,
  Upload,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { submitVolunteer } from "@/lib/services";
import { cn } from "@/lib/utils";
import type { VolunteerPayload } from "@/types";

const SUBJECTS = ["Math", "English"];

const empty: VolunteerPayload = {
  fullName: "",
  age: "",
  school: "",
  university: "",
  grade: "",
  subjects: [],
  experience: "",
  availability: "",
  motivation: "",
  resumeFileName: "",
};

const emailish = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function VolunteerForm() {
  const reduce = useReducedMotion();
  const [form, setForm] = React.useState<VolunteerPayload>(empty);
  const [email, setEmail] = React.useState("");
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [status, setStatus] = React.useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const set = <K extends keyof VolunteerPayload>(
    key: K,
    value: VolunteerPayload[K]
  ) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e[key as string]) return e;
      const n = { ...e };
      delete n[key as string];
      return n;
    });
  };

  function toggleSubject(s: string) {
    set(
      "subjects",
      form.subjects.includes(s)
        ? form.subjects.filter((x) => x !== s)
        : [...form.subjects, s]
    );
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.fullName.trim()) e.fullName = "Required";
    if (!email.trim()) e.email = "Required";
    else if (!emailish.test(email)) e.email = "Enter a valid email";
    if (!form.age.trim()) e.age = "Required";
    if (!form.university.trim() && !form.school.trim())
      e.school = "Tell us your school or university";
    if (form.subjects.length === 0) e.subjects = "Pick at least one subject";
    if (!form.motivation.trim()) e.motivation = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    const res = await submitVolunteer({ ...form, email });
    if (res.ok) {
      setStatus("success");
      if (typeof window !== "undefined")
        window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } else {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
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
          <h2 className="mt-5 font-display text-3xl font-bold">
            Application received!
          </h2>
          <p className="mt-2 text-white/85">Thank you, {form.fullName}.</p>
        </div>
        <div className="p-8 text-center sm:p-10">
          <p className="leading-relaxed text-muted-foreground">
            Our volunteer team will review your application and reach out at{" "}
            <span className="font-medium text-foreground">{email}</span> with
            next steps, including a short onboarding call.
          </p>
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
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <VField
            label="Full name"
            id="fullName"
            value={form.fullName}
            onChange={(v) => set("fullName", v)}
            error={errors.fullName}
            autoComplete="name"
          />
        </div>
        <VField
          label="Email"
          id="v-email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
          autoComplete="email"
          placeholder="you@example.com"
        />
        <VField
          label="Age"
          id="v-age"
          type="number"
          value={form.age}
          onChange={(v) => set("age", v)}
          error={errors.age}
          placeholder="e.g. 17"
        />
        <VField
          label="High school"
          id="v-school"
          value={form.school}
          onChange={(v) => set("school", v)}
          error={errors.school}
        />
        <VField
          label="University (if applicable)"
          id="v-university"
          value={form.university}
          onChange={(v) => set("university", v)}
        />
        <VField
          label="Current grade / year"
          id="v-grade"
          value={form.grade}
          onChange={(v) => set("grade", v)}
          placeholder="e.g. Grade 12 or 1st year"
        />

        <div className="space-y-2 sm:col-span-2">
          <Label>Subjects you can tutor</Label>
          <div className="flex flex-wrap gap-3">
            {SUBJECTS.map((s) => {
              const on = form.subjects.includes(s);
              return (
                <label
                  key={s}
                  className={cn(
                    "flex cursor-pointer items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors",
                    on
                      ? "border-primary bg-primary/5"
                      : "border-border hover:bg-muted/50"
                  )}
                >
                  <Checkbox
                    checked={on}
                    onCheckedChange={() => toggleSubject(s)}
                  />
                  {s}
                </label>
              );
            })}
          </div>
          {errors.subjects ? (
            <p className="text-xs text-destructive">{errors.subjects}</p>
          ) : null}
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="v-experience">Relevant experience (optional)</Label>
          <Textarea
            id="v-experience"
            value={form.experience}
            onChange={(e) => set("experience", e.target.value)}
            placeholder="Tutoring, mentoring, clubs, teaching younger students\u2026"
            rows={3}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="v-availability">Availability (optional)</Label>
          <Input
            id="v-availability"
            value={form.availability}
            onChange={(e) => set("availability", e.target.value)}
            placeholder="e.g. Weekday evenings, weekend mornings"
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="v-motivation">Why do you want to volunteer?</Label>
          <Textarea
            id="v-motivation"
            value={form.motivation}
            onChange={(e) => set("motivation", e.target.value)}
            placeholder="Tell us what draws you to tutoring with NextGen Learning."
            rows={4}
            aria-invalid={Boolean(errors.motivation)}
          />
          {errors.motivation ? (
            <p className="text-xs text-destructive">{errors.motivation}</p>
          ) : null}
        </div>

        {/* Resume upload placeholder */}
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="v-resume">Resume (optional)</Label>
          <label
            htmlFor="v-resume"
            className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-muted/30 p-4 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:bg-muted/50"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Upload className="h-5 w-5" />
            </span>
            <span>
              {form.resumeFileName ? (
                <span className="font-medium text-foreground">
                  {form.resumeFileName}
                </span>
              ) : (
                <>
                  <span className="font-medium text-foreground">
                    Click to upload
                  </span>{" "}
                  or drag a PDF (max 5MB)
                </>
              )}
            </span>
            <input
              id="v-resume"
              type="file"
              accept=".pdf,.doc,.docx"
              className="sr-only"
              onChange={(e) =>
                set("resumeFileName", e.target.files?.[0]?.name ?? "")
              }
            />
          </label>
          <p className="text-xs text-muted-foreground">
            Upload is a placeholder in this build \u2014 wire it to storage
            (e.g. Supabase Storage) when the backend is added.
          </p>
        </div>
      </div>

      <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
        If you are under 18, please make sure a parent or guardian is aware
        that you are applying to volunteer with us. We use the information
        above only to review your application and, if you are accepted, to
        coordinate tutoring sessions — see our{" "}
        <Link href="/privacy" className="underline underline-offset-2">
          Privacy Policy
        </Link>
        .
      </p>

      {status === "error" ? (
        <p className="mt-4 text-sm text-destructive">
          Something went wrong. Please try again in a moment.
        </p>
      ) : null}

      <Button
        type="submit"
        variant="gradient"
        size="lg"
        className="mt-8 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Submit application
          </>
        )}
      </Button>
    </form>
  );
}

function VField({
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
