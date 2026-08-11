import { createContext, useContext, type ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

type SoundApi = ReturnType<typeof useSound>;

const SoundContext = createContext<SoundApi | null>(null);

export function SoundProvider({ children }: { children: ReactNode }) {
  const api = useSound();
  return <SoundContext.Provider value={api}>{children}</SoundContext.Provider>;
}

const noop = () => {};

export function useSfx(): SoundApi {
  const ctx = useContext(SoundContext);
  return (
    ctx ?? {
      muted: true,
      toggleMuted: noop,
      hover: noop,
      click: noop,
      open: noop,
      close: noop,
      blip: noop,
    }
  );
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
