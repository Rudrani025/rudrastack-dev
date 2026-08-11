import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LevelTitle, Reveal, GroundStrip } from "@/components/pixel/Bits";
import { PixelCloud, PixelGirl, PixelTree } from "@/components/pixel/Sprite";

const FLOATERS = [
  { glyph: "☁", label: "AWS" },
  { glyph: "🐳", label: "Docker" },
  { glyph: "▩", label: "Terraform" },
  { glyph: "🔧", label: "Jenkins" },
  { glyph: "🐧", label: "Linux" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const walkX = useTransform(scrollYProgress, [0, 0.6], ["-30%", "40%"]);
  const cloudX = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-lavender/60 to-peach/50 px-4 py-20 sm:py-28"
    >
      <motion.div aria-hidden style={{ x: cloudX }} className="absolute top-10 left-6 opacity-80">
        <PixelCloud scale={4} />
      </motion.div>
      <motion.div aria-hidden style={{ x: cloudX }} className="absolute top-24 right-10 opacity-70">
        <PixelCloud scale={3} />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-4xl">
        <LevelTitle level="01" title="WHO AM I?" />

        <div className="grid gap-8 md:grid-cols-[1.4fr_1fr]">
          <Reveal className="pixel-panel p-5 sm:p-7">
            <h3 className="text-[11px] text-grape sm:text-sm">Hi, I&apos;m Rudrani 👋</h3>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-grape/85">
              <p>
                A computer science graduate passionate about technology, problem solving and
                continuous growth — a cloud infrastructure enthusiast working on scalable
                application deployment, DevOps automation and AWS services.
              </p>
              <p>
                I enjoy turning infrastructure requirements into practical cloud solutions — from
                designing secure AWS networks to containerizing applications and building CI/CD
                pipelines.
              </p>
              <p>
                I work with AWS, Linux, Docker, Git, Jenkins, Terraform and web technologies, and I
                focus on real-world projects that show how technology works beyond just theory.
              </p>
            </div>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-2">
            {FLOATERS.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.08}>
                <li className="pixel-border animate-float flex flex-col items-center gap-2 bg-cream px-2 py-4">
                  <span aria-hidden className="text-2xl">
                    {f.glyph}
                  </span>
                  <span className="pixel text-[7px] text-grape sm:text-[8px]">{f.label}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div aria-hidden className="relative mt-14 h-28">
        <div className="absolute bottom-12 left-4 sm:bottom-16">
          <PixelTree scale={4} />
        </div>
        <div className="absolute right-8 bottom-12 sm:bottom-16">
          <PixelTree scale={5} />
        </div>
        <motion.div style={{ x: walkX }} className="absolute bottom-12 left-1/4 sm:bottom-16">
          <PixelGirl scale={3} walking />
        </motion.div>
        <GroundStrip tone="oklch(0.66 0.1 150)" />
      </div>
    </section>
  );
}
