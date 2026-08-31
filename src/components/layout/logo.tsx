import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/site";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-brand-gradient shadow-soft",
        className
      )}
      aria-hidden="true"
    >
      {/* Ascending bars = the skill-level ladder motif, in miniature. */}
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
        <rect x="3" y="14" width="4" height="7" rx="1.2" fill="white" fillOpacity="0.7" />
        <rect x="10" y="9" width="4" height="12" rx="1.2" fill="white" fillOpacity="0.85" />
        <rect x="17" y="4" width="4" height="17" rx="1.2" fill="white" />
      </svg>
    </span>
  );
}

export function Logo({
  className,
  withText = true,
}: {
  className?: string;
  withText?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <LogoMark className="transition-transform duration-300 group-hover:-rotate-6" />
      {withText ? (
        <span className="font-display text-lg font-bold tracking-tight">
          NextGen<span className="text-primary"> Learning</span>
        </span>
      ) : null}
    </Link>
  );
}
