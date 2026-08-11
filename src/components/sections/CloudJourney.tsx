import { motion } from "framer-motion";
import { ARCHITECTURE_STEPS } from "@/data/portfolio";
import { LevelTitle } from "@/components/pixel/Bits";
import { PixelCloud } from "@/components/pixel/Sprite";

export function CloudJourney() {
  return (
    <section
      id="cloud"
      className="relative overflow-hidden bg-gradient-to-b from-lavender/50 to-pink/40 px-4 py-20 sm:py-28"
    >
      <div aria-hidden className="absolute top-16 right-6 opacity-70">
        <PixelCloud scale={5} />
      </div>
      <div className="relative z-10 mx-auto max-w-3xl">
        <LevelTitle level="03" title="CLOUD ARCHITECTURE" />
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-grape/80">
          Keep scrolling — the infrastructure builds itself, one layer at a time.
        </p>

        <ol className="relative space-y-4">
          <span
            aria-hidden
            className="absolute top-0 left-[26px] h-full w-[3px] bg-grape/25 sm:left-[30px]"
          />
          {ARCHITECTURE_STEPS.map((step, i) => (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.7 }}
              transition={{ duration: 0.35 }}
              className="relative flex items-start gap-4"
            >
              <span className="pixel-border relative z-10 flex h-13 w-13 shrink-0 items-center justify-center bg-cream text-xl sm:h-16 sm:w-16">
                {step.glyph}
              </span>
              <div className="pixel-border flex-1 bg-card px-4 py-3">
                <h3 className="pixel text-[8px] text-primary sm:text-[10px]">
                  {String(i + 1).padStart(2, "0")} · {step.label}
                </h3>
                <p className="mt-2 text-xs text-grape/80 sm:text-sm">{step.detail}</p>
              </div>
            </motion.li>
          ))}
        </ol>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pixel mt-10 text-center text-[8px] leading-loose text-grape sm:text-[10px]"
        >
          INTERNET ↓ ROUTE 53 ↓ ALB ↓ EC2 / AUTO SCALING ↓ PRIVATE RDS
        </motion.p>
      </div>
    </section>
  );
}
