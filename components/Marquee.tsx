import { skills } from "@/lib/data";

export function Marquee() {
  const items = [...skills, ...skills];
  return (
    <div className="relative border-y border-white/8 bg-panel/60 py-5 overflow-hidden">
      <div className="animate-marquee flex w-max items-center gap-10">
        {items.map((skill, i) => (
          <span key={`${skill}-${i}`} className="flex items-center gap-10 shrink-0">
            <span className="font-display text-sm md:text-base font-medium tracking-wide text-white/70 whitespace-nowrap">
              {skill}
            </span>
            <span className="text-neon/60 text-xs">◆</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent" />
    </div>
  );
}
