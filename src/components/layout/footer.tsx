import * as React from "react";
import Link from "next/link";
import { Mail, ShieldAlert } from "lucide-react";

import { siteConfig, footerNav } from "@/lib/site";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {siteConfig.tagline} Free, volunteer-led online tutoring in Math
              and English for elementary and middle school students.
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Mail className="h-4 w-4" />
              {siteConfig.email}
            </a>
          </div>

          <FooterColumn title="Programs" links={footerNav.programs} />
          <FooterColumn title="Organization" links={footerNav.organization} />
          <FooterColumn title="Legal" links={footerNav.legal} />
        </div>

        <div className="mt-10 flex items-start gap-2 rounded-2xl border border-border bg-card p-4 text-xs text-muted-foreground">
          <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
          <span>
            If you ever have a safety concern about a session, a volunteer, or
            anything else, email{" "}
            <a
              href={`mailto:${siteConfig.safetyEmail}`}
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              {siteConfig.safetyEmail}
            </a>{" "}
            and we will respond as a priority.
          </span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© {year} {siteConfig.name}.</p>
          <p className="flex items-center gap-1.5">
            Built with care for every learner.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="font-display text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
