import { BadgeDollarSign, Users2, GraduationCap } from "lucide-react";

import { Section } from "@/components/shared/section";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

const features = [
  {
    title: "Free",
    description:
      "Every session, every subject, every level — completely free. No fees, no subscriptions, no catch.",
    icon: BadgeDollarSign,
    accent: "text-secondary bg-secondary/10",
  },
  {
    title: "Experienced Volunteers",
    description:
      "Our tutors are trained high school and university students who love their subjects and know how to teach them.",
    icon: GraduationCap,
    accent: "text-primary bg-primary/10",
  },
  {
    title: "Small Group Learning",
    description:
      "Groups of just 3–5 students mean every learner is seen, heard, and supported at their own pace.",
    icon: Users2,
    accent: "text-secondary bg-secondary/10",
  },
];

export function Features() {
  return (
    <Section className="pt-4 sm:pt-8">
      <div className="container">
        <RevealGroup className="grid gap-6 md:grid-cols-3">
          {features.map((f) => (
            <RevealItem key={f.title}>
              <Card className="group h-full p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                <span
                  className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl ${f.accent}`}
                >
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.description}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
