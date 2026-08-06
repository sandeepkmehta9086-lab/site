"use client";

import { motion } from "framer-motion";
import { roles } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

export function Journey() {
  return (
    <section id="journey" className="relative py-28 md:py-36">
      <div className="orb h-[400px] w-[400px] bg-pulse/10 top-40 -left-48" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="01"
          label="Career Journey"
          title={
            <>
              Fourteen years.
              <br />
              <span className="text-gradient">Seven chapters.</span>
            </>
          }
        />

        <div className="relative">
          {/* rail */}
          <div className="timeline-rail absolute left-[7px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5" />

          <div className="space-y-12 md:space-y-0">
            {roles.map((role, i) => {
              const left = i % 2 === 0;
              return (
                <div
                  key={role.company + role.period}
                  className={`relative md:flex md:items-start ${
                    left ? "md:justify-start" : "md:justify-end"
                  } md:py-6`}
                >
                  {/* node */}
                  <span
                    className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-2 md:top-10 h-4 w-4 rounded-full border-2 ${
                      role.current
                        ? "bg-neon border-neon pulse-dot"
                        : "bg-void border-white/30"
                    }`}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: left ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className={`glass glass-hover rounded-2xl p-6 md:p-8 ml-8 md:ml-0 md:w-[calc(50%-3rem)] ${
                      left ? "md:mr-auto" : "md:ml-auto"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-neon">
                        {role.period}
                      </span>
                      <span className="font-mono text-[11px] text-white/30">
                        {role.duration} · {role.location}
                      </span>
                      {role.current && (
                        <span className="rounded-full bg-neon/15 border border-neon/40 px-2.5 py-0.5 font-mono text-[10px] tracking-widest uppercase text-neon">
                          Now
                        </span>
                      )}
                    </div>

                    <h3 className="font-display text-2xl font-bold text-white">
                      {role.company}
                    </h3>
                    <p className="mt-1 font-display text-sm font-medium text-pulse">
                      {role.title}
                    </p>
                    <p className="mt-4 text-sm text-white/60 leading-relaxed">
                      {role.description}
                    </p>

                    {role.highlights.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {role.highlights.map((h) => (
                          <li
                            key={h}
                            className="flex gap-3 text-sm text-white/50 leading-relaxed"
                          >
                            <span className="text-neon mt-0.5 shrink-0">▹</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <Reveal className="mt-20">
          <div className="glass rounded-2xl p-8 md:p-10 grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon mb-4">
                {"//"} Education
              </p>
              <h3 className="font-display text-xl font-bold text-white">
                Symbiosis Institute of Business Management
              </h3>
              <p className="text-sm text-white/50 mt-1">
                Master of Business Administration (MBA) — 2023
              </p>
              <h3 className="font-display text-xl font-bold text-white mt-6">
                Jawaharlal Nehru National College of Engineering
              </h3>
              <p className="text-sm text-white/50 mt-1">
                B.E., Computer Science &amp; Engineering — 2011
              </p>
            </div>
            <div>
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-pulse mb-4">
                {"//"} Published Research
              </p>
              <h3 className="font-display text-xl font-bold text-white">
                Performance Testing on Heavily Used Financial Websites
              </h3>
              <p className="text-sm text-white/50 mt-2 leading-relaxed">
                Research on load and performance characteristics of high-traffic
                financial platforms — the same class of systems engineered
                throughout a career in global banking technology.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
