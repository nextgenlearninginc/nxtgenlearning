"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on route change.
  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className="container flex h-16 items-center justify-between gap-4"
        aria-label="Primary"
      >
        <Logo />

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "relative rounded-full px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive(item.href) && "text-foreground"
                )}
              >
                {item.label}
                {isActive(item.href) ? (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-brand-gradient"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="gradient" size="lg" className="hidden sm:inline-flex">
            <Link href="/register">Join Now</Link>
          </Button>

          {/* Mobile toggle */}
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-lg lg:hidden"
          >
            <ul className="container flex flex-col gap-1 py-4">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-muted",
                      isActive(item.href)
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Button asChild variant="gradient" size="lg" className="w-full">
                  <Link href="/register">Join Now</Link>
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
