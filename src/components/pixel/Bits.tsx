import type { ReactNode } from "react";
import { motion } from "framer-motion";

export function LevelTitle({ level, title }: { level: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      className="mb-8 text-center sm:mb-12"
    >
      <span className="pixel-border inline-block bg-primary px-3 py-1.5 text-[8px] text-primary-foreground pixel sm:text-[10px]">
        LEVEL {level}
      </span>
      <h2 className="mt-4 text-base leading-relaxed text-grape sm:text-2xl">{title}</h2>
    </motion.div>
  );
}

export function Reveal({
  children,
  delay = 0,
  x = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  x?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.45, delay }}
      className={className ?? ""}
    >
      {children}
    </motion.div>
  );
}

export function Stars({ count = 30 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const left = (i * 37) % 100;
        const top = (i * 61) % 100;
        return (
          <span
            key={i}
            className="animate-twinkle absolute h-[3px] w-[3px] bg-cream"
            style={{
              left: `${left}%`,
              top: `${top}%`,
              animationDelay: `${(i % 7) * 0.35}s`,
            }}
          />
        );
      })}
    </div>
  );
}

export function GroundStrip({ tone = "oklch(0.62 0.11 155)" }: { tone?: string }) {
  return (
    <div aria-hidden className="absolute bottom-0 left-0 w-full">
      <div className="h-3 w-full" style={{ background: "var(--grape)" }} />
      <div className="h-10 w-full sm:h-16" style={{ background: tone }} />
    </div>
  );
}

export function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="pixel border-[3px] border-grape bg-cream px-2 py-1 text-[7px] text-grape sm:text-[8px]">
      {children}
    </span>
  );
}
