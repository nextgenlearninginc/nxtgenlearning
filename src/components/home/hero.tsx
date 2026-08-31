"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LevelLadder } from "@/components/shared/level-ladder";

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-soft-radial" />
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)] bg-grid-slate [background-size:44px_44px] opacity-60" />

      <div className="container relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
        {/* Copy */}
        <div className="flex flex-col items-start gap-6">
          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              100% free · volunteer-led
            </Badge>
          </motion.div>

          <motion.h1
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Free Online{" "}
            <span className="text-gradient">Math &amp; English</span> Tutoring
            for Every Student.
          </motion.h1>

          <motion.p
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="max-w-xl text-lg leading-relaxed text-muted-foreground"
          >
            Helping students build confidence, improve grades, and reach their
            potential through volunteer-led online tutoring.
          </motion.p>

          <motion.div
            initial={reduce ? {} : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild variant="gradient" size="lg">
              <Link href="/assessment">
                Take Assessment
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/volunteer">Become a Volunteer</Link>
            </Button>
          </motion.div>

          <motion.p
            initial={reduce ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="text-sm text-muted-foreground"
          >
            <span className="font-semibold text-foreground">100% free</span>{" "}
            · Volunteer-taught · No cost, ever.
          </motion.p>
        </div>

        {/* Illustration card */}
        <motion.div
          initial={reduce ? {} : { opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Floating accent badges */}
          <motion.div
            aria-hidden
            className="absolute -left-4 top-8 z-10 hidden rounded-2xl border border-border bg-card px-4 py-3 shadow-lift sm:block"
            animate={reduce ? {} : { y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary/15 text-secondary">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="text-left">
                <p className="text-xs font-semibold">Level M3 unlocked</p>
                <p className="text-[11px] text-muted-foreground">Pre-Algebra</p>
              </div>
            </div>
          </motion.div>

          <div className="relative rounded-3xl border border-border bg-card p-6 shadow-glow sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Your learning path
                </p>
                <p className="font-display text-lg font-bold">
                  Grouped by level, not age
                </p>
              </div>
              <Badge>Live</Badge>
            </div>

            <div className="mt-8">
              <LevelLadder active={3} />
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { k: "Small groups", v: "3–5 peers" },
                { k: "Weekly", v: "45–60 min" },
                { k: "Cost", v: "$0" },
              ].map((item) => (
                <div
                  key={item.k}
                  className="rounded-xl border border-border bg-background/60 p-3 text-center"
                >
                  <p className="font-display text-base font-bold">{item.v}</p>
                  <p className="text-[11px] text-muted-foreground">{item.k}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
