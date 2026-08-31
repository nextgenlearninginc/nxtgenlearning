import type { Metadata } from "next";

import { PageHeader } from "@/components/shared/page-header";
import { Reveal } from "@/components/shared/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NextGen Learning collects, uses, and protects the information of students, guardians, and volunteers.",
};

const sections: { heading: string; body: string[] }[] = [
  {
    heading: "1. Introduction",
    body: [
      "NextGen Learning (\u201cwe\u201d, \u201cus\u201d, or \u201cour\u201d) is a nonprofit organization that provides free online Math and English tutoring. This Privacy Policy explains what information we collect, why we collect it, and the choices you have. Because we work with minors, we take privacy seriously and collect only what we need to run our programs.",
    ],
  },
  {
    heading: "2. Information We Collect",
    body: [
      "Student and guardian details you provide during registration, such as name, age, grade, contact email, country, region, timezone, and availability.",
      "Assessment responses and the resulting placement level, used to match students to the right program.",
      "Volunteer application details, including education background, subjects, experience, and availability.",
      "Basic technical information (such as device and browser type) that most websites collect automatically to keep the service secure and reliable.",
    ],
  },
  {
    heading: "3. How We Use Information",
    body: [
      "To place students at an appropriate learning level and organize small-group sessions.",
      "To communicate with guardians and volunteers about scheduling, sessions, and program updates.",
      "To review and onboard volunteer tutors.",
      "To understand our impact in aggregate and improve our programs.",
    ],
  },
  {
    heading: "4. Children\u2019s Privacy",
    body: [
      "Our programs serve elementary and middle school students, so a parent or guardian must complete registration on a student\u2019s behalf. We do not knowingly collect more information from a child than is necessary to deliver tutoring, and guardians may request that we review, correct, or delete their child\u2019s information at any time.",
    ],
  },
  {
    heading: "5. How We Share Information",
    body: [
      "We do not sell personal information. We share information only with volunteer tutors and coordinators who need it to deliver sessions, and with service providers that help us operate (for example, scheduling or email tools) under appropriate safeguards. We may disclose information if required by law.",
    ],
  },
  {
    heading: "6. Data Retention & Security",
    body: [
      "We keep information only as long as needed to provide our programs and meet legal or reporting obligations, then delete or anonymize it. We use reasonable administrative and technical measures to protect information, though no online service can guarantee absolute security.",
    ],
  },
  {
    heading: "7. Your Choices",
    body: [
      "You may request access to, correction of, or deletion of your information, and you may opt out of non-essential communications at any time. To make a request, contact us using the details below.",
    ],
  },
  {
    heading: "8. Changes to This Policy",
    body: [
      "We may update this policy from time to time. Material changes will be reflected by updating the date below, and where appropriate we will notify guardians and volunteers directly.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        description="Your trust matters to us. Here\u2019s a plain-language summary of how we handle information for students, guardians, and volunteers."
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
                <h2 className="font-display text-lg font-bold">Contact Us</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Questions about this policy or a privacy request? Email us at{" "}
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
