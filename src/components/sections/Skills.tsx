import { motion } from "framer-motion";
import { SKILL_TREE } from "@/data/portfolio";
import { LevelTitle } from "@/components/pixel/Bits";
import { useSfx } from "@/components/SoundProvider";

export function Skills() {
  const sfx = useSfx();

  return (
    <section
      id="skills"
      className="relative overflow-hidden bg-gradient-to-b from-peach/50 via-cream to-lavender/50 px-4 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(var(--grape) 1px, transparent 1px), linear-gradient(90deg, var(--grape) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />
      <div className="relative z-10 mx-auto max-w-5xl">
        <LevelTitle level="02" title="SKILL TREE" />

        <div className="space-y-10">
          {SKILL_TREE.map((branch, bi) => (
            <div key={branch.branch}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="pixel-border flex h-10 w-10 items-center justify-center bg-primary text-lg text-primary-foreground">
                  {branch.icon}
                </span>
                <h3 className="pixel text-[10px] text-grape sm:text-xs">{branch.branch}</h3>
                <span className="h-[3px] flex-1 bg-grape/30" />
              </motion.div>

              <ul className="mt-5 ml-3 grid grid-cols-2 gap-3 border-l-[3px] border-dashed border-grape/40 pl-4 sm:grid-cols-3 lg:grid-cols-5">
                {branch.skills.map((skill, si) => (
                  <motion.li
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8, y: 14 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.3, delay: si * 0.05 + bi * 0.02 }}
                  >
                    <button
                      onMouseEnter={sfx.hover}
                      className="pixel-border press flex w-full flex-col items-center gap-2 bg-cream px-2 py-3 transition-colors hover:bg-pink"
                    >
                      <span aria-hidden className="text-xl">
                        {skill.glyph}
                      </span>
                      <span className="pixel text-center text-[7px] leading-relaxed text-grape">
                        {skill.name}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
