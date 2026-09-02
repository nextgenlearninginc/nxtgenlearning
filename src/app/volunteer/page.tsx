import type { Metadata } from "next";
import {
  Award,
  GraduationCap,
  HeartHandshake,
  Sparkles,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal, RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeading } from "@/components/shared/section";
import { VolunteerForm } from "@/components/forms/volunteer-form";

export const metadata: Metadata = {
  title: "Become a Volunteer Tutor",
  description:
    "Volunteer with NextGen Learning to tutor Math or English online. Gain leadership and teaching experience while making a real community impact.",
};

const benefits = [
  {
    icon: Award,
    title: "Leadership experience",
    description:
      "Plan lessons, guide small groups, and build the kind of real responsibility that stands out on applications.",
  },
  {
    icon: GraduationCap,
    title: "Real teaching practice",
    description:
      "Sharpen how you explain, coach, and adapt to a learner's pace — skills that carry into any future classroom or workplace.",
  },
  {
    icon: HeartHandshake,
    title: "Community impact",
    description:
      "Help a student gain confidence and close gaps. Your time directly changes how a child sees learning.",
  },
];

const perks = [
  "Flexible weekly schedule that fits around school",
  "Training and lesson resources provided",
  "Supportive coordinator and tutor community",
  "A reference letter after consistent service",
];

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        eyebrow="Join the team"
        title="Become a Volunteer Tutor"
        description="Share what you know and change a student's trajectory. Our volunteers are high schoolers and university students who tutor Math and English online — no teaching experience required."
      />

      {/* Benefits */}
      <section className="pb-8">
        <div className="container">
          <RevealGroup className="grid gap-6 md:grid-cols-3">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <RevealItem key={b.title}>
                  <div className="h-full rounded-3xl border border-border bg-card p-7 shadow-soft transition-shadow hover:shadow-lift">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-bold">
                      {b.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {b.description}
                    </p>
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Perks strip */}
      <section className="py-12">
        <div className="container">
          <Reveal className="rounded-3xl border border-border bg-muted/40 p-8 sm:p-10">
            <div className="flex items-center gap-2 text-secondary">
              <Sparkles className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                What you get
              </span>
            </div>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <Users className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <span className="text-sm text-muted-foreground">{perk}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Application form */}
      <section className="pb-24 pt-4">
        <div className="container">
          <SectionHeading
            eyebrow="Application"
            title="Apply to volunteer"
            description="Fill out the form below — it takes about five minutes. We'll follow up with next steps."
            className="mx-auto mb-10"
          />
          <div className="mx-auto max-w-2xl">
            <VolunteerForm />
          </div>
        </div>
      </section>
    </>
  );
}
