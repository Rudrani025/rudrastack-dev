import { useEffect, useState } from "react";
import { Menu, Volume2, VolumeX, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND, NAV } from "@/data/portfolio";
import { scrollToSection, useSfx } from "@/components/SoundProvider";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sfx = useSfx();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    sfx.click();
    setOpen(false);
    scrollToSection(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "border-b-[3px] border-grape bg-cream/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-3 py-2 sm:px-6 sm:py-3">
        <button
          onClick={() => go("start")}
          onMouseEnter={sfx.hover}
          className="flex items-center gap-2"
          aria-label={`${BRAND.full} home`}
        >
          <span className="pixel text-[9px] text-grape sm:text-[11px]">
            {BRAND.name}
            <span className="text-primary">{BRAND.tld}</span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              onMouseEnter={sfx.hover}
              className="pixel px-2 py-1 text-[9px] text-grape transition-colors hover:bg-pink hover:text-grape"
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={sfx.toggleMuted}
            aria-label={sfx.muted ? "Enable sounds" : "Mute sounds"}
            className="ml-1 border-[3px] border-grape bg-lavender p-1 text-grape"
          >
            {sfx.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={sfx.toggleMuted}
            aria-label={sfx.muted ? "Enable sounds" : "Mute sounds"}
            className="border-[3px] border-grape bg-lavender p-1 text-grape"
          >
            {sfx.muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <button
            onClick={() => {
              sfx.open();
              setOpen((o) => !o);
            }}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="border-[3px] border-grape bg-pink p-1 text-grape"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile"
          className="border-t-[3px] border-grape bg-cream/95 px-3 pb-3 backdrop-blur md:hidden"
        >
          {NAV.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="pixel block w-full border-b border-grape/20 py-3 text-left text-[10px] text-grape"
            >
              ▸ {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
