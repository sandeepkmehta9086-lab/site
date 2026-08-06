"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  title,
}: {
  index: string;
  label: string;
  title: ReactNode;
}) {
  return (
    <Reveal>
      <div className="mb-14 md:mb-20">
        <p className="font-mono text-xs tracking-[0.35em] text-neon uppercase mb-4">
          {"//"} {index} — {label}
        </p>
        <h2 className="font-display text-4xl md:text-6xl font-bold tracking-tight text-white">
          {title}
        </h2>
        <div className="neon-line mt-8 w-full max-w-md" />
      </div>
    </Reveal>
  );
}
