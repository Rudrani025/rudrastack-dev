import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND } from "@/data/portfolio";
import { PixelCloud, PixelGirl, PixelMountain } from "@/components/pixel/Sprite";
import { PixelTerminal } from "@/components/pixel/PixelTerminal";
import { GroundStrip, Stars } from "@/components/pixel/Bits";
import { scrollToSection, useSfx } from "@/components/SoundProvider";

const CLOUDS = [
  { top: "14%", scale: 6, duration: 52, delay: 0 },
  { top: "26%", scale: 4, duration: 68, delay: -14 },
  { top: "44%", scale: 5, duration: 60, delay: -30 },
  { top: "58%", scale: 3, duration: 76, delay: -8 },
];

export function Hero() {
  const sfx = useSfx();

  return (
    <section
      id="start"
      className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden sky-gradient px-4 pt-24 pb-28"
    >
      <Stars count={36} />
      {CLOUDS.map((c, i) => (
        <div
          key={i}
          aria-hidden
          className="absolute"
          style={{
            top: c.top,
            animation: `drift ${c.duration}s linear ${c.delay}s infinite`,
          }}
        >
          <PixelCloud scale={c.scale} tone="var(--cream)" />
        </div>
      ))}

      <div aria-hidden className="absolute bottom-10 left-0 flex w-full items-end justify-between opacity-80 sm:bottom-14">
        <PixelMountain scale={5} />
        <PixelMountain scale={7} tone="oklch(0.78 0.08 300)" />
        <PixelMountain scale={4} />
      </div>

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center gap-6">
        <motion.img
          src={logo.url}
          alt={`${BRAND.full} logo — pixel-art R with AWS, Docker, Kubernetes, Terraform and Linux icons`}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="h-24 w-24 object-contain sm:h-32 sm:w-32"
        />

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center text-xl text-grape sm:text-4xl lg:text-5xl"
        >
          {BRAND.name}
          <span className="text-primary">{BRAND.tld}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="pixel text-center text-[9px] tracking-wide text-primary sm:text-sm"
        >
          {BRAND.person} — {BRAND.role}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="max-w-md text-center text-sm text-grape/80 sm:text-base"
        >
          “{BRAND.tagline}”
        </motion.p>

        <div className="mt-2 grid w-full items-center gap-6 sm:mt-4 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center">
            <PixelGirl scale={5} />
          </div>
          <PixelTerminal
            autoStart
            lines={[
              { text: "$ whoami", tone: "prompt" },
              { text: "Rudrani" },
              { text: "$ role", tone: "prompt" },
              { text: "Cloud & DevOps Engineer" },
              { text: "$ status", tone: "prompt" },
              { text: "Building scalable infrastructure...", tone: "ok" },
            ]}
          />
        </div>

        <button
          onClick={() => {
            sfx.click();
            scrollToSection("about");
          }}
          onMouseEnter={sfx.hover}
          className="pixel press pixel-border-lg mt-4 flex items-center gap-3 bg-primary px-5 py-4 text-[9px] text-primary-foreground sm:px-8 sm:text-xs"
        >
          [ EXPLORE MY JOURNEY
          <ArrowDown size={14} className="animate-bob" />]
        </button>
      </div>

      <GroundStrip />
    </section>
  );
}
