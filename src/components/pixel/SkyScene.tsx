import { motion, useScroll, useTransform } from "framer-motion";
import { PixelCloud, PixelMountain, PixelTree, Sprite } from "@/components/pixel/Sprite";

/* ---------------- pixel bird ---------------- */
const BIRD_UP = [
  ".XX...XX.",
  "X..X.X..X",
  "....X....",
];
const BIRD_DOWN = [
  "....X....",
  "X..X.X..X",
  ".XX...XX.",
];

function PixelBird({ scale = 3, phase = 0 }: { scale?: number; phase?: number }) {
  return (
    <div className="relative" style={{ animation: `flap 0.5s steps(1, end) ${phase}s infinite` }}>
      <span className="block [animation:bird-a_0.5s_steps(1,end)_infinite]">
        <Sprite map={BIRD_UP} palette={{ X: "var(--grape)" }} scale={scale} />
      </span>
      <span className="absolute inset-0 [animation:bird-b_0.5s_steps(1,end)_infinite]">
        <Sprite map={BIRD_DOWN} palette={{ X: "var(--grape)" }} scale={scale} />
      </span>
    </div>
  );
}

const BIRD_FLOCKS = [
  { top: "18%", scale: 3, duration: 34, delay: -2, phase: 0 },
  { top: "23%", scale: 2, duration: 42, delay: -16, phase: 0.15 },
  { top: "31%", scale: 2, duration: 52, delay: -30, phase: 0.3 },
];

const CLOUDS = [
  { top: "10%", scale: 6, duration: 58, delay: 0, tone: "var(--cream)", depth: 0.5 },
  { top: "20%", scale: 4, duration: 74, delay: -18, tone: "color-mix(in oklab, var(--pink) 55%, white)", depth: 0.35 },
  { top: "37%", scale: 5, duration: 66, delay: -34, tone: "var(--cream)", depth: 0.45 },
  { top: "48%", scale: 3, duration: 88, delay: -10, tone: "color-mix(in oklab, var(--lavender) 60%, white)", depth: 0.25 },
  { top: "58%", scale: 2, duration: 96, delay: -52, tone: "var(--cream)", depth: 0.18 },
];

const PARTICLES = Array.from({ length: 26 }).map((_, i) => ({
  left: (i * 53) % 100,
  size: (i % 3) + 2,
  duration: 9 + (i % 6) * 2.5,
  delay: -(i % 9) * 1.7,
  tone: i % 3 === 0 ? "var(--pink)" : i % 3 === 1 ? "var(--lavender)" : "var(--cream)",
}));

/**
 * Layered parallax pixel sky: gradient, sun, twinkling stars, drifting clouds,
 * flapping bird flocks, distant mountain ranges, a tree line and rising particles.
 */
export function SkyScene() {
  const { scrollYProgress } = useScroll();
  const farY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const midY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const nearY = useTransform(scrollYProgress, [0, 1], [0, 340]);
  const skyFade = useTransform(scrollYProgress, [0, 0.25], [1, 0.35]);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* sun */}
      <motion.div
        style={{ y: farY, opacity: skyFade }}
        className="absolute left-1/2 top-[12%] -translate-x-1/2"
      >
        <div className="relative h-24 w-24 sm:h-32 sm:w-32">
          <div className="absolute -inset-6 animate-pulse-slow rounded-full bg-[color-mix(in_oklab,var(--peach)_70%,white)] blur-2xl" />
          <div className="absolute inset-2 rounded-full border-[6px] border-[color-mix(in_oklab,var(--peach)_85%,white)] bg-cream" />
          <div className="absolute inset-2 rounded-full [box-shadow:inset_0_0_0_10px_color-mix(in_oklab,var(--pink)_45%,transparent)]" />
        </div>
      </motion.div>

      {/* stars */}
      <motion.div style={{ y: farY }} className="absolute inset-0">
        {Array.from({ length: 44 }).map((_, i) => (
          <span
            key={i}
            className="animate-twinkle absolute bg-cream"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 29) % 70}%`,
              height: i % 5 === 0 ? 4 : 3,
              width: i % 5 === 0 ? 4 : 3,
              animationDelay: `${(i % 8) * 0.31}s`,
            }}
          />
        ))}
      </motion.div>

      {/* clouds */}
      <motion.div style={{ y: farY }} className="absolute inset-0">
        {CLOUDS.map((c, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: c.top,
              opacity: 0.55 + c.depth,
              animation: `drift ${c.duration}s linear ${c.delay}s infinite`,
            }}
          >
            <PixelCloud scale={c.scale} tone={c.tone} />
          </div>
        ))}
      </motion.div>

      {/* birds */}
      <motion.div style={{ y: midY }} className="absolute inset-0">
        {BIRD_FLOCKS.map((b, i) => (
          <div
            key={i}
            className="absolute flex gap-4"
            style={{ top: b.top, animation: `drift ${b.duration}s linear ${b.delay}s infinite` }}
          >
            <PixelBird scale={b.scale} phase={b.phase} />
            <span className="mt-3 block">
              <PixelBird scale={Math.max(2, b.scale - 1)} phase={b.phase + 0.2} />
            </span>
            <span className="mt-1 block">
              <PixelBird scale={b.scale} phase={b.phase + 0.35} />
            </span>
          </div>
        ))}
      </motion.div>

      {/* distant mountain range */}
      <motion.div
        style={{ y: midY }}
        className="absolute bottom-[210px] left-0 flex w-full items-end justify-around opacity-45 blur-[1px] sm:bottom-[230px]"
      >
        <PixelMountain scale={4} tone="oklch(0.84 0.05 300)" />
        <PixelMountain scale={6} tone="oklch(0.86 0.05 320)" />
        <PixelMountain scale={3} tone="oklch(0.84 0.05 300)" />
        <PixelMountain scale={5} tone="oklch(0.86 0.05 320)" />
      </motion.div>

      {/* near mountains */}
      <motion.div
        style={{ y: nearY }}
        className="absolute bottom-[130px] left-0 flex w-full items-end justify-between opacity-85 sm:bottom-[150px]"
      >
        <PixelMountain scale={5} />
        <PixelMountain scale={8} tone="oklch(0.78 0.08 300)" />
        <PixelMountain scale={4} />
      </motion.div>

      {/* tree line */}
      <motion.div
        style={{ y: nearY }}
        className="absolute bottom-[84px] left-0 flex w-full items-end justify-around sm:bottom-[92px]"
      >
        {[5, 4, 6, 4, 5, 4, 6, 5].map((s, i) => (
          <span
            key={i}
            className="block"
            style={{ animation: `sway 5.5s ease-in-out ${-i * 0.6}s infinite`, transformOrigin: "bottom center" }}
          >
            <PixelTree scale={s} />
          </span>
        ))}
      </motion.div>

      {/* soft rising particles */}
      <div className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute bottom-0"
            style={{
              left: `${p.left}%`,
              height: p.size,
              width: p.size,
              background: p.tone,
              animation: `rise ${p.duration}s linear ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
