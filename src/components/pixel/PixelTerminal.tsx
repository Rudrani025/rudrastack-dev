import { useEffect, useRef, useState } from "react";

/** Typewriter terminal window. Starts typing when scrolled into view. */
export function PixelTerminal({
  title = "rudrani@cloud:~",
  lines,
  className,
  autoStart = false,
}: {
  title?: string;
  lines: { text: string; tone?: "prompt" | "out" | "ok" }[];
  className?: string;
  autoStart?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(autoStart);
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    if (started || !ref.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.3 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);

  const total = lines.reduce((sum, l) => sum + l.text.length + 1, 0);

  useEffect(() => {
    if (!started) return;
    const id = window.setInterval(() => {
      setCharCount((c) => {
        if (c >= total) {
          window.clearInterval(id);
          return c;
        }
        return c + 1;
      });
    }, 28);
    return () => window.clearInterval(id);
  }, [started, total]);

  let budget = charCount;
  const rendered = lines.map((line) => {
    const take = Math.max(0, Math.min(line.text.length, budget));
    budget -= line.text.length + 1;
    return { ...line, visible: line.text.slice(0, take) };
  });

  return (
    <div ref={ref} className={`pixel-border-lg overflow-hidden bg-terminal ${className ?? ""}`}>
      <div className="flex items-center gap-2 border-b-[3px] border-grape bg-lavender px-2 py-1.5">
        <span className="h-2.5 w-2.5 bg-destructive" />
        <span className="h-2.5 w-2.5 bg-peach" />
        <span className="h-2.5 w-2.5 bg-mint" />
        <span className="pixel ml-2 truncate text-[7px] text-grape sm:text-[8px]">{title}</span>
      </div>
      <div className="scanlines space-y-1 p-3 font-mono text-[10px] leading-relaxed text-terminal-foreground sm:text-xs">
        {rendered.map((line, i) => (
          <p
            key={i}
            className={
              line.tone === "prompt"
                ? "text-pink"
                : line.tone === "ok"
                  ? "text-mint"
                  : "text-terminal-foreground"
            }
          >
            {line.visible}
            {line.visible.length > 0 && line.visible.length < line.text.length && (
              <span className="animate-blink">▌</span>
            )}
          </p>
        ))}
      </div>
    </div>
  );
}
