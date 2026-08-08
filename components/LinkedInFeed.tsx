"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { linkedinPosts, profile } from "@/lib/data";
import { Reveal, SectionHeading } from "./Reveal";

export function LinkedInFeed() {
  const railRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows]);

  const scrollByCard = (dir: 1 | -1) => {
    railRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <section id="feed" className="relative py-28 md:py-36 bg-panel/40">
      <div className="orb h-[360px] w-[360px] bg-pulse/10 top-24 -right-40" />
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            index="04"
            label="LinkedIn Feed"
            title={
              <>
                Feeds.
                <br />
                <span className="text-gradient">From the social.</span>
              </>
            }
          />

          {linkedinPosts.length > 0 && (
            <Reveal className="hidden md:block mb-20 shrink-0">
              <div className="flex gap-3">
                <button
                  onClick={() => scrollByCard(-1)}
                  disabled={!canLeft}
                  aria-label="Scroll posts left"
                  className="h-11 w-11 rounded-full glass glass-hover text-white/70 disabled:opacity-30 disabled:pointer-events-none font-display"
                >
                  ←
                </button>
                <button
                  onClick={() => scrollByCard(1)}
                  disabled={!canRight}
                  aria-label="Scroll posts right"
                  className="h-11 w-11 rounded-full glass glass-hover text-white/70 disabled:opacity-30 disabled:pointer-events-none font-display"
                >
                  →
                </button>
              </div>
            </Reveal>
          )}
        </div>

        {linkedinPosts.length > 0 ? (
          <Reveal>
            <div className="relative">
              <div
                ref={railRef}
                onScroll={updateArrows}
                className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 lg:-mx-10 lg:px-10"
              >
                {linkedinPosts.map((urn, i) => (
                  <div
                    key={urn}
                    className="glass glass-hover snap-start shrink-0 w-[320px] sm:w-[380px] rounded-2xl overflow-hidden p-2"
                  >
                    <iframe
                      src={`https://www.linkedin.com/embed/feed/update/${urn}`}
                      height={560}
                      className="w-full rounded-xl border-0 bg-white"
                      title={`LinkedIn post ${i + 1}`}
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                ))}

                {/* trailing follow card */}
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass glass-hover snap-start shrink-0 w-[320px] sm:w-[380px] rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-8"
                >
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 animate-ping" />
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-neon" />
                  </span>
                  <p className="font-display text-xl font-bold text-white">
                    More on LinkedIn
                  </p>
                  <p className="font-mono text-xs tracking-[0.2em] uppercase text-neon">
                    Follow Sandeep ↗
                  </p>
                </a>
              </div>

              {/* edge fades */}
              <div className="pointer-events-none absolute inset-y-0 -left-6 lg:-left-10 w-16 bg-gradient-to-r from-void/80 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 -right-6 lg:-right-10 w-16 bg-gradient-to-l from-void/80 to-transparent" />
            </div>
          </Reveal>
        ) : (
          <Reveal>
            <div className="relative glass rounded-2xl p-10 md:p-14 overflow-hidden">
              <div className="orb h-[240px] w-[240px] bg-neon/15 -top-20 -right-20" />
              <div className="relative max-w-2xl">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-neon mb-4">
                  {"//"} Feed syncing
                </p>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-white">
                  Latest posts land here soon.
                </h3>
                <p className="mt-4 text-white/50 leading-relaxed">
                  Thoughts on payments engineering, AI/ML in financial services,
                  and building teams that ship — published on LinkedIn and
                  syndicated to this feed.
                </p>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center gap-3 rounded-full border border-neon/40 px-7 py-3 font-display text-sm font-semibold text-neon hover:bg-neon/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-all"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-neon opacity-60 animate-ping" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
                  </span>
                  Follow on LinkedIn ↗
                </a>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
