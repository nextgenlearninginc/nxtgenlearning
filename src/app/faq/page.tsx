import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/data/content";
import { CtaBand } from "@/components/shared/cta-band";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about NextGen Learning's free online tutoring — eligibility, sessions, grouping, and volunteering.",
};

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions, answered."
        description="Everything you need to know about how NextGen Learning works. Can't find your answer? Reach out any time."
      />

      <Section className="pt-4">
        <div className="container-tight">
          <Reveal>
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.question} value={`item-${i}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal className="mt-10 rounded-2xl border border-border bg-muted/40 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Still have a question?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary hover:underline"
              >
                Contact our team
              </Link>{" "}
              — we usually reply within one business day.
            </p>
          </Reveal>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
