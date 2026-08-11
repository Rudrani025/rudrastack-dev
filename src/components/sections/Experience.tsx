import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCE } from "@/data/portfolio";
import { Chip, GroundStrip, LevelTitle } from "@/components/pixel/Bits";
import { PixelGirl } from "@/components/pixel/Sprite";

export function Experience() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0.1, 0.85], ["5%", "80%"]);

  return (
    <section
      ref={ref}
      id="experience"
      className="relative overflow-hidden bg-gradient-to-b from-lavender/60 to-pink/40 px-4 py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <LevelTitle level="06" title="THE ROAD SO FAR" />

        <div className="space-y-6">
          {EXPERIENCE.map((item, i) => (
            <motion.article
              key={item.org}
              initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4 }}
              className="pixel-border-lg bg-card p-5 sm:p-7"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="pixel text-[8px] text-primary sm:text-[10px]">
                  STOP {String(i + 1).padStart(2, "0")}
                </span>
                <span className="pixel text-[7px] text-grape/70">{item.period}</span>
              </div>
              <h3 className="mt-4 text-[11px] leading-relaxed text-grape sm:text-sm">
                {item.role}
              </h3>
              <p className="mt-2 text-sm text-grape/80">
                {item.org} · {item.kind}
              </p>
              <ul className="mt-3 space-y-1.5 text-sm text-grape/85">
                {item.points.map((p) => (
                  <li key={p}>✦ {p}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tech.map((t) => (
                  <Chip key={t}>{t}</Chip>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <div aria-hidden className="relative mt-14 h-28">
        <motion.div style={{ x }} className="absolute bottom-12 left-0 sm:bottom-16">
          <PixelGirl scale={3} walking />
        </motion.div>
        <GroundStrip tone="oklch(0.55 0.03 300)" />
        <div className="absolute bottom-2 left-0 flex w-full justify-around">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="h-1 w-6 bg-cream/70" />
          ))}
        </div>
      </div>
    </section>
  );
}
