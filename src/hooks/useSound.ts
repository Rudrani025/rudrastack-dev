import { useCallback, useEffect, useRef, useState } from "react";

type Ctx = AudioContext | null;

/** Tiny 8-bit style blip generator (no audio files needed). */
export function useSound() {
  const ctxRef = useRef<Ctx>(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem("rudrastack-muted");
    if (stored === "1") setMuted(true);
  }, []);

  const toggleMuted = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      window.localStorage.setItem("rudrastack-muted", next ? "1" : "0");
      return next;
    });
  }, []);

  const blip = useCallback(
    (freq = 440, duration = 0.08, type: OscillatorType = "square", gain = 0.05) => {
      if (muted || typeof window === "undefined") return;
      try {
        if (!ctxRef.current) ctxRef.current = new AudioContext();
        const ctx = ctxRef.current;
        if (ctx.state === "suspended") void ctx.resume();
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        g.gain.setValueAtTime(gain, ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(g).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
      } catch {
        /* audio unavailable */
      }
    },
    [muted],
  );

  const hover = useCallback(() => blip(880, 0.04, "square", 0.025), [blip]);
  const click = useCallback(() => {
    blip(660, 0.06);
    window.setTimeout(() => blip(990, 0.08), 60);
  }, [blip]);
  const open = useCallback(() => {
    blip(520, 0.05);
    window.setTimeout(() => blip(780, 0.05), 50);
    window.setTimeout(() => blip(1040, 0.09), 100);
  }, [blip]);
  const close = useCallback(() => {
    blip(760, 0.05);
    window.setTimeout(() => blip(420, 0.08), 55);
  }, [blip]);

  return { muted, toggleMuted, hover, click, open, close, blip };
}
