import { Download } from "lucide-react";
import resume from "@/assets/resume.pdf.asset.json";
import { ACHIEVEMENTS, BRAND, EXPERIENCE, PROJECTS, RESUME } from "@/data/portfolio";
import { LevelTitle, Reveal } from "@/components/pixel/Bits";
import { PixelGirl } from "@/components/pixel/Sprite";
import { useSfx } from "@/components/SoundProvider";

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h3 className="pixel text-[8px] text-primary sm:text-[9px]">{title}</h3>
      <ul className="mt-3 space-y-1.5 text-sm text-grape/85">
        {items.map((i) => (
          <li key={i}>▸ {i}</li>
        ))}
      </ul>
    </div>
  );
}

export function ResumeSection() {
  const sfx = useSfx();

  return (
    <section
      id="resume"
      className="relative overflow-hidden bg-gradient-to-b from-peach/50 to-lavender/60 px-4 py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <LevelTitle level="07" title="RESUME" />

        <Reveal className="pixel-border-lg bg-cream">
          <div className="flex items-center gap-3 border-b-[3px] border-grape bg-lavender px-4 py-2">
            <PixelGirl scale={2} />
            <span className="pixel text-[8px] text-grape sm:text-[10px]">
              {BRAND.person} — {BRAND.role}
            </span>
          </div>

          <div className="grid gap-7 p-5 sm:grid-cols-2 sm:p-7">
            <Block
              title="EDUCATION"
              items={RESUME.education.map((e) => `${e.title} — ${e.org} (${e.period})`)}
            />
            <Block title="COURSEWORK" items={RESUME.coursework} />
            <Block title="SKILLS" items={RESUME.skills} />
            <Block title="PROJECTS" items={PROJECTS.map((p) => p.title)} />
            <Block
              title="EXPERIENCE"
              items={EXPERIENCE.map((e) => `${e.role} — ${e.org} (${e.period})`)}
            />
            <Block title="CERTIFICATIONS" items={ACHIEVEMENTS.map((a) => a.title)} />
          </div>

          <div className="border-t-[3px] border-grape px-5 py-5 sm:px-7">
            <a
              href={resume.url}
              download="Rudrani_Gawande_Resume.pdf"
              onMouseEnter={sfx.hover}
              onClick={sfx.click}
              className="pixel press pixel-border inline-flex items-center gap-2 bg-primary px-4 py-3 text-[8px] text-primary-foreground sm:text-[10px]"
            >
              <Download size={14} /> DOWNLOAD RESUME
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
