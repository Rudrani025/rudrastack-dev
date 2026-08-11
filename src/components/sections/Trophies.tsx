import { ACHIEVEMENTS } from "@/data/portfolio";
import { LevelTitle, Reveal, Stars } from "@/components/pixel/Bits";
import { useSfx } from "@/components/SoundProvider";

export function Trophies() {
  const sfx = useSfx();
  return (
    <section
      id="trophies"
      className="relative overflow-hidden bg-gradient-to-b from-pink/40 to-peach/50 px-4 py-20 sm:py-28"
    >
      <Stars count={18} />
      <div className="relative z-10 mx-auto max-w-4xl">
        <LevelTitle level="06.5" title="TROPHY ROOM" />

        <ul className="grid gap-5 sm:grid-cols-2">
          {ACHIEVEMENTS.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <li className="pixel-border-lg h-full bg-cream p-5">
                <span aria-hidden className="animate-float block text-3xl">
                  🏆
                </span>
                <h3 className="mt-3 text-[9px] leading-relaxed text-grape sm:text-[11px]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-grape/80">{item.org}</p>
                <p className="pixel mt-2 text-[7px] text-primary">{item.date}</p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={sfx.hover}
                  onClick={sfx.click}
                  className="pixel press pixel-border mt-4 inline-block bg-lavender px-3 py-2 text-[7px] text-grape"
                >
                  CREDENTIAL →
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
