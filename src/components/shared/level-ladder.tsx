"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type Rung = { code: string; label: string };

const defaultRungs: Rung[] = [
  { code: "L1", label: "Basics" },
  { code: "L2", label: "Building" },
  { code: "L3", label: "Growing" },
  { code: "L4", label: "Fluent" },
  { code: "L5", label: "Advanced" },
];

/**
 * The signature motif of the whole site: skill levels as an ascending ladder.
 * Reinforces the core idea that students are grouped by level, not age.
 */
export function LevelLadder({
  rungs = defaultRungs,
  active = 3,
  className,
}: {
  rungs?: Rung[];
  active?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={cn("flex items-end gap-2 sm:gap-3", className)}>
      {rungs.map((rung, i) => {
        const isActive = i + 1 <= active;
        const height = 44 + i * 26; // ascending steps
        return (
          <motion.div
            key={rung.code}
            className="flex w-full flex-col items-center gap-2"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            whileInView={reduce ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden rounded-xl border transition-colors",
                isActive
                  ? "border-transparent bg-brand-gradient shadow-lift"
                  : "border-border bg-muted"
              )}
              style={{ height }}
            >
              {isActive ? (
                <motion.span
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.35) 50%, transparent 70%)",
                  }}
                  initial={{ x: "-120%" }}
                  animate={reduce ? {} : { x: "120%" }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    repeatDelay: 1.6,
                    ease: "easeInOut",
                  }}
                />
              ) : null}
              <span
                className={cn(
                  "absolute bottom-2 left-0 right-0 text-center font-display text-sm font-bold",
                  isActive ? "text-white" : "text-muted-foreground"
                )}
              >
                {rung.code}
              </span>
            </div>
            <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground sm:text-xs">
              {rung.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
