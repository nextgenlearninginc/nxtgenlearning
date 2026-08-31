import type { Metadata } from "next";
import { Mail, MessageSquare, MapPin, ShieldAlert } from "lucide-react";

import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/shared/section";
import { Reveal } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the NextGen Learning team. Questions about enrolling, volunteering, or partnering — we're here to help.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="We'd love to hear from you."
        description="Questions about enrolling, volunteering, or partnering with us? Send a message and we'll reply within one business day."
      />

      <Section className="pt-4">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left: info */}
          <Reveal className="space-y-6">
            <Card className="p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Mail className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">Email us</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                For general questions and enrollment help.
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                {siteConfig.email}
              </a>
            </Card>

            <Card className="p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <MessageSquare className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Volunteer & partnerships
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Want to tutor or bring NextGen to your community?
              </p>
              <a
                href={`mailto:${siteConfig.supportEmail}`}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                {siteConfig.supportEmail}
              </a>
            </Card>

            <Card className="p-6">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-lg font-semibold">
                Report a safety concern
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Something about a session or volunteer didn&apos;t feel right?
                Tell us — we treat these as a priority.
              </p>
              <a
                href={`mailto:${siteConfig.safetyEmail}`}
                className="mt-2 inline-block text-sm font-medium text-primary hover:underline"
              >
                {siteConfig.safetyEmail}
              </a>
            </Card>
          </Reveal>

          {/* Right: form */}
          <Reveal from="left">
            <Card className="p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold">Send a message</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Fill out the form and we'll be in touch shortly.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </Card>
          </Reveal>
        </div>
      </Section>

      {/* Map placeholder */}
      <Section className="pt-0">
        <div className="container">
          <Reveal className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl border border-border bg-muted/40">
            <div className="pointer-events-none absolute inset-0 bg-grid-slate [background-size:40px_40px] opacity-70" />
            <div className="relative flex flex-col items-center text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gradient text-white shadow-soft">
                <MapPin className="h-6 w-6" />
              </span>
              <p className="mt-3 font-display font-semibold">
                We're fully remote — and everywhere our students are.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Map integration placeholder (Google Maps / Mapbox)
              </p>
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
