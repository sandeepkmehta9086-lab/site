"use client";

import { profile } from "@/lib/data";
import { Reveal } from "./Reveal";

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  {
    label: "LinkedIn",
    value: "in/sandeepkumarmehta",
    href: profile.linkedin,
  },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-60" />
      <div className="orb h-[500px] w-[500px] bg-neon/12 -bottom-60 left-1/2 -translate-x-1/2" />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-10 text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-[0.35em] uppercase text-neon mb-6">
            {"//"} 05 — Contact
          </p>
          <h2 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white">
            Let&apos;s build the
            <br />
            <span className="text-gradient">next chapter.</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto text-white/50 leading-relaxed">
            Open to conversations on engineering leadership, digital banking,
            and ambitious products. Based in Pune — reachable everywhere.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-14 grid sm:grid-cols-3 gap-4 text-left">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="glass glass-hover rounded-2xl p-6 block"
              >
                <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon">
                  {c.label}
                </p>
                <p className="mt-3 font-display text-sm font-semibold text-white break-all">
                  {c.value}
                </p>
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <a
            href={`mailto:${profile.email}`}
            className="mt-12 inline-block rounded-full bg-gradient-to-r from-neon via-pulse to-ember p-px hover:shadow-[0_0_50px_rgba(167,139,250,0.35)] transition-shadow"
          >
            <span className="block rounded-full bg-void px-10 py-4 font-display font-semibold text-white">
              Start a conversation →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/8 py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-white/30 tracking-widest">
          © {new Date().getFullYear()} SANDEEP KUMAR — PUNE, IN
        </p>
        <p className="font-mono text-xs text-white/30 tracking-widest">
          BANKING &amp; PAYMENTS {"//"} AI/ML &amp; CLOUD {"//"} ENGINEERING LEADERSHIP
        </p>
      </div>
    </footer>
  );
}
