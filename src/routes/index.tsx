import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BRAND } from "@/data/portfolio";
import { SoundProvider } from "@/components/SoundProvider";
import { BootScreen } from "@/components/BootScreen";
import { PixelCursor } from "@/components/pixel/PixelCursor";
import { Header } from "@/components/Header";
import { ScrollRail } from "@/components/ScrollRail";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { CloudJourney } from "@/components/sections/CloudJourney";
import { Projects } from "@/components/sections/Projects";
import { DevOpsWorld } from "@/components/sections/DevOpsWorld";
import { Experience } from "@/components/sections/Experience";
import { Trophies } from "@/components/sections/Trophies";
import { ResumeSection } from "@/components/sections/ResumeSection";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

const TITLE = "RudraStack.dev | Cloud & DevOps Engineer";
const DESCRIPTION =
  "Rudrani Gawande — Cloud & DevOps Engineer portfolio showcasing AWS, DevOps, cloud architecture, automation, infrastructure, and scalable projects.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "RudraStack.dev" },
      { property: "og:url", content: "https://rudrastack.dev/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "https://rudrastack.dev/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: BRAND.person,
          jobTitle: BRAND.role,
          url: "https://rudrastack.dev/",
          email: `mailto:${BRAND.email}`,
          sameAs: [BRAND.github, BRAND.linkedin, BRAND.instagram],
          knowsAbout: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "Linux", "CI/CD"],
        }),
      },
    ],
  }),
});

function Index() {
  const [booted, setBooted] = useState(false);
  const onDone = useCallback(() => setBooted(true), []);

  return (
    <SoundProvider>
      <BootScreen onDone={onDone} />
      <PixelCursor />
      <Header />
      <ScrollRail />
      <main
        className={`transition-opacity duration-500 ${booted ? "opacity-100" : "opacity-0"}`}
      >


        <Hero />
        <About />
        <Skills />
        <CloudJourney />
        <Projects />
        <DevOpsWorld />
        <Experience />
        <Trophies />
        <ResumeSection />
        <Contact />
      </main>
      <Footer />
    </SoundProvider>
  );
}
