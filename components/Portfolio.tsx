"use client";

import { profile, projects } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

export function Portfolio() {
  return (
    <section id="portfolio" className="relative py-28 md:py-36">
      <div className="orb h-[400px] w-[400px] bg-ember/10 top-32 -left-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          index="03"
          label="Portfolio"
          title={
            <>
              Signature platforms.
              <br />
              <span className="text-gradient">Global impact.</span>
            </>
          }
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 0.12}>
              <div className="group relative glass glass-hover rounded-2xl p-8 h-full overflow-hidden flex flex-col">
                {/* scanline on hover */}
                <span className="pointer-events-none absolute left-0 right-0 h-px bg-neon/50 opacity-0 group-hover:opacity-100 group-hover:[animation:scan_2.4s_linear_infinite]" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] text-neon">
                    {p.tag}
                  </span>
                  <span className="font-mono text-[10px] tracking-widest text-white/25 border border-white/15 rounded-full px-3 py-1">
                    CASE STUDY SOON
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl font-bold text-white">
                  {p.title}
                </h3>
                <p className="mt-1 font-mono text-xs text-pulse">{p.client}</p>
                <p className="mt-3 text-sm text-white/50 leading-relaxed flex-1">
                  {p.body}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[10px] text-white/40 border border-white/10 rounded-full px-2.5 py-1 group-hover:border-neon/30 group-hover:text-white/60 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a
            href={profile.personalSite}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-mono text-sm text-white/60 hover:text-neon transition-colors"
          >
            <span className="neon-line w-12 group-hover:w-20 transition-all" />
            Detailed case studies coming soon — meanwhile, visit the personal site ↗
          </a>
        </Reveal>
      </div>
    </section>
  );
}
