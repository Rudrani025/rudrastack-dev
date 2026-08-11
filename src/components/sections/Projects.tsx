import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { Chip, LevelTitle, Reveal } from "@/components/pixel/Bits";
import { useSfx } from "@/components/SoundProvider";

function ProjectPanel({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-grape/70 p-3 backdrop-blur-sm sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      <motion.div
        initial={{ y: 30, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="pixel-border-lg my-8 w-full max-w-2xl bg-cream"
      >
        <div className="flex items-center justify-between gap-3 border-b-[3px] border-grape bg-lavender px-4 py-2">
          <span className="pixel text-[8px] text-grape sm:text-[10px]">
            PROJECT {project.index} · {project.world}
          </span>
          <button
            onClick={onClose}
            aria-label="Close project details"
            className="border-[3px] border-grape bg-pink p-1 text-grape"
            autoFocus
          >
            <X size={14} />
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-7">
          <h3 className="text-[11px] leading-relaxed text-grape sm:text-base">{project.title}</h3>

          <div>
            <h4 className="pixel text-[8px] text-primary">PROBLEM</h4>
            <p className="mt-2 text-sm text-grape/85">{project.problem}</p>
          </div>
          <div>
            <h4 className="pixel text-[8px] text-primary">SOLUTION</h4>
            <p className="mt-2 text-sm text-grape/85">{project.solution}</p>
          </div>
          <div>
            <h4 className="pixel text-[8px] text-primary">ARCHITECTURE</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-grape/85">
              {project.architecture.map((a) => (
                <li key={a} className="font-mono text-xs">
                  ▸ {a}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pixel text-[8px] text-primary">KEY FEATURES</h4>
            <ul className="mt-2 space-y-1.5 text-sm text-grape/85">
              {project.features.map((f) => (
                <li key={f}>✦ {f}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="pixel text-[8px] text-primary">TECHNOLOGIES</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <Chip key={t}>{t}</Chip>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="pixel press pixel-border flex items-center gap-2 bg-primary px-4 py-3 text-[8px] text-primary-foreground"
            >
              <Github size={14} /> GITHUB
            </a>
            <a
              href={project.demo ?? project.github}
              target="_blank"
              rel="noreferrer"
              className="pixel press pixel-border flex items-center gap-2 bg-pink px-4 py-3 text-[8px] text-grape"
            >
              <ExternalLink size={14} /> LIVE DEMO
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null);
  const sfx = useSfx();

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-pink/40 via-cream to-peach/40 px-4 py-20 sm:py-28"
    >
      <div className="relative z-10 mx-auto max-w-5xl">
        <LevelTitle level="04" title="PROJECT WORLD" />

        <div className="space-y-8">
          {PROJECTS.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <article className="pixel-border-lg overflow-hidden bg-card">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b-[3px] border-grape bg-lavender px-4 py-2">
                  <span className="pixel text-[8px] text-grape sm:text-[10px]">
                    ▶ WORLD {project.index} — {project.world}
                  </span>
                  <span className="pixel text-[7px] text-primary">UNLOCKED</span>
                </div>

                <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[1.3fr_1fr]">
                  <div>
                    <h3 className="text-[11px] leading-relaxed text-grape sm:text-sm">
                      {project.title}
                    </h3>
                    <p className="mt-3 text-sm text-grape/80">{project.solution}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <Chip key={t}>{t}</Chip>
                      ))}
                    </div>
                    <button
                      onClick={() => {
                        sfx.open();
                        setOpen(project);
                      }}
                      onMouseEnter={sfx.hover}
                      className="pixel press pixel-border mt-6 bg-primary px-4 py-3 text-[8px] text-primary-foreground sm:text-[10px]"
                    >
                      VIEW PROJECT →
                    </button>
                  </div>

                  <div className="pixel-border bg-terminal p-3">
                    <ul className="space-y-2 font-mono text-[10px] text-terminal-foreground">
                      {project.architecture.slice(0, 4).map((a, ai) => (
                        <motion.li
                          key={a}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: ai * 0.12 }}
                        >
                          <span className="text-pink">▸</span> {a}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <ProjectPanel
            project={open}
            onClose={() => {
              sfx.close();
              setOpen(null);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
