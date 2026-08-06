"use client";

import { motion } from "framer-motion";
import { certifications, skills } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

const pillars = [
  {
    icon: "⌘",
    title: "Engineering Leadership",
    body: "Delivery centers built from zero in Pune and Bangalore, global support coverage beyond SWIFT hours, vendor SOW negotiation, and stakeholder management across the US, UK and Switzerland.",
    accent: "text-neon",
  },
  {
    icon: "◈",
    title: "Payments & Financial Messaging",
    body: "SWIFT, ISO 20022, SECOM, Fedwire, TIPS, UPI/NEFT/RTGS — event-driven platforms on Kafka, from HSBC Kinetic and SBI ePay to Finastra's Financial Messaging suite.",
    accent: "text-pulse",
  },
  {
    icon: "◱",
    title: "AI/ML & Cloud Transformation",
    body: "Agentic AI workflows, LLMs and LangGraph pipelines for sanctions screening and anomaly detection — deployed cloud-native on GCP and AWS with Docker and Kubernetes.",
    accent: "text-ember",
  },
];

export function Expertise() {
  return (
    <section id="expertise" className="relative py-28 md:py-36 bg-panel/40">
      <div className="orb h-[360px] w-[360px] bg-neon/10 bottom-20 -right-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="02"
          label="Expertise"
          title={
            <>
              Enterprise-grade.
              <br />
              <span className="text-gradient">Edge sharpened.</span>
            </>
          }
        />

        <div className="grid md:grid-cols-3 gap-6">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div className="glass glass-hover rounded-2xl p-8 h-full">
                <span className={`font-display text-4xl ${p.accent}`}>{p.icon}</span>
                <h3 className="mt-6 font-display text-xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-3 text-sm text-white/55 leading-relaxed">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            {"//"} Stack &amp; disciplines
          </p>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03, duration: 0.4 }}
                className="rounded-full border border-white/12 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/70 hover:border-neon/50 hover:text-neon transition-colors cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-16">
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-white/40 mb-6">
            {"//"} Certifications
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((c) => (
              <div
                key={c.name}
                className="glass glass-hover rounded-xl p-5 flex items-start gap-4"
              >
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-neon to-pulse" />
                <div>
                  <p className="font-display text-sm font-semibold text-white leading-snug">
                    {c.name}
                  </p>
                  <p className="mt-1 font-mono text-[11px] text-white/40">{c.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
