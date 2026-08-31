"use client";

import * as React from "react";
import { motion, type HTMLMotionProps, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  /** Stagger delay in seconds. */
  delay?: number;
  /** Direction the element travels from. */
  from?: "up" | "down" | "left" | "right" | "none";
};

const offsets: Record<NonNullable<RevealProps["from"]>, { x: number; y: number }> =
  {
    up: { x: 0, y: 28 },
    down: { x: 0, y: -28 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

/**
 * Reveals children as they scroll into view. Respects prefers-reduced-motion.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  ...props
}: RevealProps) {
  const reduce = useReducedMotion();
  const offset = offsets[from];

  return (
    <motion.div
      className={cn(className)}
      initial={reduce ? { opacity: 1 } : { opacity: 0, ...offset }}
      whileInView={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a list so children reveal in sequence. Use with RevealItem. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  ...props
}: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 1 } : { opacity: 0, y: 24 },
        show: reduce
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
