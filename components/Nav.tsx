"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#journey", label: "Journey" },
  { href: "#expertise", label: "Expertise" },
  { href: "#portfolio", label: "Portfolio" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-void/70 border-b border-white/8"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="font-display text-lg font-bold tracking-tight">
          <span className="text-white">SANDEEP</span>
          <span className="text-gradient"> KUMAR</span>
          <span className="font-mono text-neon text-xs ml-2 tracking-widest">
            {""}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs tracking-[0.2em] uppercase text-white/60 hover:text-neon transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-neon/40 px-5 py-2 font-mono text-xs tracking-widest uppercase text-neon hover:bg-neon/10 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-neon pulse-dot" />
          Open to connect
        </a>
      </div>
    </motion.header>
  );
}
