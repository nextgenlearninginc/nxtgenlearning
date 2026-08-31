import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern participation in NextGen Learning\u2019s free tutoring programs and volunteer opportunities.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Acceptance of Terms",
    body: [
      "By registering for a program, applying to volunteer, or otherwise using the NextGen Learning website, you agree to these Terms of Service. If you are registering a student, you confirm that you are their parent or legal guardian and agree on their behalf.",
    ],
  },
  {
    heading: "2. Our Programs",
    body: [
      "NextGen Learning provides free online tutoring in Math and English for elementary and middle school students, delivered by volunteer tutors. Placement assessments help us group students by skill level. Program availability, schedules, and session formats may change as our capacity changes.",
    ],
  },
  {
    heading: "3. Eligibility & Registration",
    body: [
      "A parent or guardian must complete registration for any student. You agree to provide accurate information and to keep it up to date. We may decline or discontinue participation to protect the safety and quality of our programs.",
    ],
  },
  {
    heading: "4. Code of Conduct",
    body: [
      "Everyone in our community \u2014 students, guardians, and volunteers \u2014 is expected to be respectful, honest, and safe. Harassment, discrimination, or disruptive behavior may result in removal from the program. Sessions are for educational purposes only.",
    ],
  },
  {
    heading: "5. Volunteers",
    body: [
      "Volunteer tutors donate their time and are not employees of NextGen Learning. Volunteers agree to follow our guidelines, respect student privacy, and complete any onboarding or verification steps we require before working with students.",
    ],
  },
  {
    heading: "6. No Guarantees",
    body: [
      "We are committed to high-quality tutoring, but we do not guarantee specific academic outcomes, grades, or test results. Our services are provided \u201cas is\u201d and \u201cas available.\u201d",
    ],
  },
  {
    heading: "7. Intellectual Property",
    body: [
      "Content on this website, including text, graphics, and learning materials, is owned by or licensed to NextGen Learning and may be used only for personal, non-commercial educational purposes within our programs.",
    ],
  },
  {
    heading: "8. Limitation of Liability",
    body: [
      "To the fullest extent permitted by law, NextGen Learning is not liable for any indirect or incidental damages arising from participation in our programs or use of this website.",
    ],
  },
  {
    heading: "9. Changes to These Terms",
    body: [
      "We may update these Terms from time to time. Continued use of our programs after changes take effect constitutes acceptance of the updated Terms.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Service"
        description="The basics of participating in our free tutoring programs and volunteer community."
      />

      <section className="pb-24">
        <div className="container">
          <Reveal className="mx-auto max-w-3xl">
            <p className="text-sm text-muted-foreground">
              Last updated: January 1, 2026
            </p>

            <div className="mt-10 space-y-10">
              {sections.map((section) => (
                <div key={section.heading}>
                  <h2 className="font-display text-xl font-bold tracking-tight">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
                    {section.body.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border border-border bg-muted/40 p-6">
                <h2 className="font-display text-lg font-bold">Questions?</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Reach us any time at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>

              <p className="text-xs leading-relaxed text-muted-foreground">
                This document is provided as a starting template for a nonprofit
                website and does not constitute legal advice. Please have counsel
                review it before launch.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
