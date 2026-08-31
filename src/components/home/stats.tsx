"use client";

import * as React from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

import { stats, type Stat } from "@/lib/data/content";
import { formatNumber } from "@/lib/utils";
import { Section } from "@/components/shared/section";

function Counter({ stat }: { stat: Stat }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(stat.value);
      return;
    }
    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, stat.value]);

  return (
    <span ref={ref} className="tabular-nums">
      {formatNumber(value)}
      {stat.suffix}
    </span>
  );
}

export function Stats() {
  return (
    <Section>
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-brand-gradient p-8 shadow-glow sm:p-12">
          <div className="pointer-events-none absolute inset-0 opacity-20 [mask-image:radial-gradient(60%_60%_at_50%_0%,black,transparent)] bg-grid-slate [background-size:40px_40px]" />
          <div className="relative">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
                What you can count on
              </h2>
              <p className="mt-2 text-white/80">
                Simple commitments, true from day one.
              </p>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-2xl bg-white/10 p-6 text-center backdrop-blur-sm"
                >
                  <dd className="font-display text-4xl font-bold text-white sm:text-5xl">
                    <Counter stat={stat} />
                  </dd>
                  <dt className="mt-2 text-sm font-medium text-white/85">
                    {stat.label}
                  </dt>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </Section>
  );
}
