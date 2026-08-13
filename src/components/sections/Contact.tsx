import { useState } from "react";
import { Github, Instagram, Linkedin, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { BRAND } from "@/data/portfolio";
import { LevelTitle, Stars } from "@/components/pixel/Bits";
import { PixelCloud, PixelGirl } from "@/components/pixel/Sprite";
import { useSfx } from "@/components/SoundProvider";
import { submitContactMessage } from "@/lib/contact.functions";

const LINKS = [
  { icon: Mail, label: "Email", value: BRAND.email, href: `mailto:${BRAND.email}` },
  { icon: Phone, label: "Phone", value: BRAND.phone, href: `tel:+918180854303` },
  { icon: MapPin, label: "Location", value: BRAND.location, href: undefined },
  { icon: Linkedin, label: "LinkedIn", value: BRAND.person, href: BRAND.linkedin },
  { icon: Github, label: "GitHub", value: BRAND.githubHandle, href: BRAND.github },
  { icon: MessageCircle, label: "WhatsApp", value: BRAND.whatsappHandle, href: BRAND.whatsapp },
  { icon: Instagram, label: "Instagram", value: BRAND.instagramHandle, href: BRAND.instagram },
];

export function Contact() {
  const sfx = useSfx();
  const send = useServerFn(submitContactMessage);
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    sfx.click();
    setBusy(true);
    setError(null);
    try {
      const result = await send({ data: form });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setSent(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden sunset-gradient px-4 pt-20 pb-28 sm:pt-28"
    >
      <Stars count={26} />
      <div aria-hidden className="absolute top-16 left-8 opacity-80">
        <PixelCloud scale={4} tone="oklch(0.92 0.06 40)" />
      </div>
      <div aria-hidden className="absolute top-32 right-10 opacity-70">
        <PixelCloud scale={3} tone="oklch(0.9 0.08 350)" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <LevelTitle level="08" title="READY FOR THE NEXT LEVEL?" />
        <p className="mx-auto mb-10 max-w-lg text-center text-sm text-cream sm:text-base">
          Let&apos;s build something awesome. I&apos;m always open to discussing exciting projects
          and new opportunities.
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          <ul className="space-y-3">
            {LINKS.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <span className="pixel-border flex items-center gap-3 bg-cream/95 px-4 py-3">
                  <Icon size={16} className="shrink-0 text-primary" />
                  <span className="pixel text-[7px] text-grape">{label}</span>
                  <span className="ml-auto truncate text-xs text-grape/80">{value}</span>
                </span>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      onMouseEnter={sfx.hover}
                      className="press block"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </li>
              );
            })}
          </ul>

          <form onSubmit={submit} className="pixel-border-lg space-y-4 bg-cream p-5">
            <div>
              <label htmlFor="name" className="pixel text-[7px] text-grape">
                YOUR NAME
              </label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-2 w-full border-[3px] border-grape bg-card px-3 py-2 text-sm text-grape outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="email" className="pixel text-[7px] text-grape">
                YOUR EMAIL
              </label>
              <input
                id="email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-2 w-full border-[3px] border-grape bg-card px-3 py-2 text-sm text-grape outline-none focus:border-primary"
              />
            </div>
            <div>
              <label htmlFor="message" className="pixel text-[7px] text-grape">
                YOUR MESSAGE
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-2 w-full border-[3px] border-grape bg-card px-3 py-2 text-sm text-grape outline-none focus:border-primary"
              />
            </div>
            <button
              type="submit"
              onMouseEnter={sfx.hover}
              className="pixel press pixel-border w-full bg-primary px-4 py-3 text-[8px] text-primary-foreground sm:text-[10px]"
            >
              SEND MESSAGE →
            </button>
            {sent && (
              <p className="pixel text-[7px] text-primary" role="status">
                ✓ MAIL APP OPENED — THANK YOU!
              </p>
            )}
          </form>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <PixelGirl scale={3} />
      </div>
      <div aria-hidden className="absolute bottom-0 left-0 h-8 w-full bg-grape/80" />
    </section>
  );
}
