import { useEffect, useState } from "react";
import { SECTIONS } from "@/data/portfolio";
import { scrollToSection, useSfx } from "@/components/SoundProvider";

export function ScrollRail() {
  const [active, setActive] = useState<string>("start");
  const sfx = useSfx();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Journey progress"
      className="fixed top-1/2 left-2 z-40 hidden -translate-y-1/2 lg:block"
    >
      <ol className="pixel-panel bg-cream/90 px-3 py-3 backdrop-blur">
        {SECTIONS.map((s, i) => {
          const isActive = active === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => {
                  sfx.click();
                  scrollToSection(s.id);
                }}
                onMouseEnter={sfx.hover}
                aria-current={isActive ? "true" : undefined}
                className="flex items-center gap-2 py-0.5"
              >
                <span
                  className={`inline-block h-2.5 w-2.5 border-2 border-grape ${
                    isActive ? "bg-primary" : "bg-cream"
                  }`}
                />
                <span
                  className={`pixel text-[7px] ${
                    isActive ? "text-primary" : "text-grape/60"
                  }`}
                >
                  {s.label}
                </span>
              </button>
              {i < SECTIONS.length - 1 && (
                <span aria-hidden className="ml-[4px] block h-2 w-[2px] bg-grape/40" />
              )}
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
