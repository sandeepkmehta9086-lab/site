"use client";

import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { Counter } from "./Counter";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] as const },
  },
};

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0 bg-grid" />
      <div className="orb h-[480px] w-[480px] bg-neon/15 -top-40 -left-40" />
      <div className="orb h-[420px] w-[420px] bg-pulse/15 top-1/3 -right-32 animate-float" />
      <div className="orb h-[300px] w-[300px] bg-ember/10 bottom-0 left-1/3" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 flex-1 flex flex-col justify-center pt-32 pb-16 w-full">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="font-mono text-xs md:text-sm tracking-[0.4em] uppercase text-neon mb-6"
          >
            {profile.location} · Senior Development Manager @ Finastra
          </motion.p>

          <motion.h1
            variants={item}
            className="font-display font-bold tracking-tighter leading-[0.95] text-[13vw] md:text-[9vw] lg:text-[7.5rem]"
          >
            <span className="text-white">SANDEEP</span>
            <br />
            <span className="text-gradient">KUMAR</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-8 max-w-2xl text-lg md:text-xl text-white/60 leading-relaxed"
          >
            <span className="text-white">Strategic Technology Leader.</span>{" "}
            <span className="text-neon">Banking &amp; Payments.</span>{" "}
            <span className="text-pulse">AI/ML &amp; Cloud Transformation.</span>
            <br />
            {profile.summary}
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#journey"
              className="group rounded-full bg-white text-black font-display font-semibold px-8 py-3.5 text-sm tracking-wide hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-shadow"
            >
              Explore the Journey
              <span className="inline-block ml-2 transition-transform group-hover:translate-y-1">
                ↓
              </span>
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full glass glass-hover px-8 py-3.5 font-display text-sm font-semibold tracking-wide text-white"
            >
              LinkedIn ↗
            </a>
          </motion.div>
        </motion.div>

        {/* stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.9 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 border border-white/8 rounded-2xl overflow-hidden"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-void/90 px-6 py-6 md:py-8">
              <p className="font-display text-3xl md:text-4xl font-bold text-white">
                <Counter target={s.value} />
                <span className="text-neon">{s.suffix}</span>
              </p>
              <p className="mt-1 font-mono text-[10px] md:text-xs tracking-[0.2em] uppercase text-white/40">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative pb-8 flex justify-center"
      >
        <div className="h-10 w-6 rounded-full border border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.8 }}
            className="h-2 w-1 rounded-full bg-neon"
          />
        </div>
      </motion.div>
    </section>
  );
}
