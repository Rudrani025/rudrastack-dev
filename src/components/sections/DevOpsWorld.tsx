import { motion } from "framer-motion";
import { PIPELINE } from "@/data/portfolio";
import { LevelTitle } from "@/components/pixel/Bits";
import { PixelTerminal } from "@/components/pixel/PixelTerminal";

export function DevOpsWorld() {
  return (
    <section
      id="devops"
      className="relative overflow-hidden bg-gradient-to-b from-peach/40 to-lavender/60 px-4 py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <LevelTitle level="05" title="AUTOMATE EVERYTHING" />

        <div className="pixel-border-lg bg-cream p-4 sm:p-6">
          <ol className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {PIPELINE.map((stage, i) => (
              <motion.li
                key={stage.stage}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.12 }}
                className="flex items-center gap-3"
              >
                <div className="pixel-border animate-float flex h-16 w-16 flex-col items-center justify-center gap-1 bg-lavender sm:h-20 sm:w-20">
                  <span aria-hidden className="text-lg">
                    {stage.glyph}
                  </span>
                  <span className="pixel text-[6px] text-grape sm:text-[7px]">{stage.stage}</span>
                </div>
                {i < PIPELINE.length - 1 && (
                  <span aria-hidden className="pixel text-[10px] text-primary">
                    →
                  </span>
                )}
              </motion.li>
            ))}
          </ol>
        </div>

        <PixelTerminal
          className="mt-8"
          title="rudrani@pipeline:~"
          lines={[
            { text: "$ git push origin main", tone: "prompt" },
            { text: "  → webhook received, pipeline #42 started" },
            { text: "$ docker build -t app:42 .", tone: "prompt" },
            { text: "  → image built in 38s" },
            { text: "$ docker run --rm app:42 npm test", tone: "prompt" },
            { text: "  → 24 passing" },
            { text: "$ docker deploy app:42", tone: "prompt" },
            { text: "  → rolling update on EC2 auto scaling group" },
            { text: "✓ Deployment successful", tone: "ok" },
          ]}
        />
      </div>
    </section>
  );
}
