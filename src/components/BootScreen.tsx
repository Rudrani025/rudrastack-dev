import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import logo from "@/assets/logo.png.asset.json";
import { BRAND } from "@/data/portfolio";

const LINES = [
  "RUDRASTACK BIOS v1.0",
  "> checking cloud region ... ap-south-1 OK",
  "> mounting /dev/creativity ... OK",
  "> loading docker daemon ... OK",
  "> terraform init ... OK",
  "> starting pixel renderer ... OK",
  "READY.",
];

export function BootScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined" && window.sessionStorage.getItem("rudrastack-booted")) {
      setVisible(false);
      onDone();
      return;
    }
    const timers: number[] = [];
    LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setShown(i + 1), 260 * (i + 1)));
    });
    timers.push(
      window.setTimeout(() => {
        window.sessionStorage.setItem("rudrastack-booted", "1");
        setVisible(false);
        onDone();
      }, 260 * LINES.length + 900),
    );
    return () => timers.forEach(clearTimeout);
  }, [onDone]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center gap-6 px-6 night-gradient scanlines"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <img
            src={logo.url}
            alt={`${BRAND.full} pixel-art logo`}
            className="h-24 w-24 object-contain sm:h-32 sm:w-32"
          />
          <p className="pixel text-center text-[10px] text-pink sm:text-sm">
            {BRAND.name}
            <span className="text-peach">{BRAND.tld}</span>
          </p>
          <div className="w-full max-w-md space-y-1 font-mono text-[10px] text-terminal-foreground sm:text-xs">
            {LINES.slice(0, shown).map((line) => (
              <p key={line}>{line}</p>
            ))}
            <span className="inline-block animate-blink text-mint">▌</span>
          </div>
          <button
            onClick={() => {
              window.sessionStorage.setItem("rudrastack-booted", "1");
              setVisible(false);
              onDone();
            }}
            className="pixel press pixel-border bg-pink px-4 py-2 text-[8px] text-grape sm:text-[10px]"
          >
            SKIP INTRO
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
