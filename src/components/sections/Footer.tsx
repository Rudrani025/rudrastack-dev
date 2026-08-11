import { Github, Linkedin } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { BRAND } from "@/data/portfolio";
import { Stars } from "@/components/pixel/Bits";
import { useSfx } from "@/components/SoundProvider";

export function Footer() {
  const sfx = useSfx();
  return (
    <footer className="relative overflow-hidden night-gradient px-4 py-12">
      <Stars count={22} />
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-4 text-center">
        <img
          src={logo.url}
          alt={`${BRAND.full} pixel-art logo`}
          className="h-14 w-14 object-contain"
        />
        <p className="pixel text-[9px] text-pink sm:text-[11px]">
          {BRAND.name}
          <span className="text-peach">{BRAND.tld}</span>
        </p>
        <p className="text-sm text-cream/90">Built with ☁️ Cloud, ⚙️ DevOps &amp; 💜 Creativity</p>
        <p className="pixel text-[8px] text-cream">{BRAND.person}</p>
        <div className="mt-2 flex gap-3">
          <a
            href={BRAND.github}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={sfx.hover}
            aria-label="GitHub"
            className="press border-[3px] border-pink bg-grape p-2 text-pink"
          >
            <Github size={16} />
          </a>
          <a
            href={BRAND.linkedin}
            target="_blank"
            rel="noreferrer"
            onMouseEnter={sfx.hover}
            aria-label="LinkedIn"
            className="press border-[3px] border-pink bg-grape p-2 text-pink"
          >
            <Linkedin size={16} />
          </a>
        </div>
        <p className="text-xs text-cream/60">
          © {new Date().getFullYear()} {BRAND.full} — rudrastack.dev
        </p>
      </div>
    </footer>
  );
}
