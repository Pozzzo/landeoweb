"use client";

import React, { useMemo, useState } from "react";

// --- Types ---
type Palette = {
  pink_soft: string;
  pink_deeper: string;
  blue_soft: string;
  beige: string;
  mint: string;
  ink: string;
};

type ContentBlock = {
  label: string;
  title: string;
  copy: string;
  cta: string;
  href: string;
};

type Brand = {
  name: string;
  tagline: string;
  bio: string;
  cta_text: string;
  cta_link: string;
  social: { instagram?: string; tiktok?: string; youtube?: string };
  palette: Palette;
  content_blocks: ContentBlock[];
};

// --- Default brand (editable) ---
const DEFAULT_BRAND: Brand = {
  name: "Francis Landeo",
  tagline: "Espacio seguro para tu bienestar emocional",
  bio: "Psicología con empatía y ciencia. Tips prácticos de salud mental, autoestima y manejo de ansiedad.",
  cta_text: "Reservar consulta online",
  cta_link: "#contacto",
  social: {
    instagram: "https://instagram.com/tu_usuario",
    tiktok: "https://tiktok.com/@tu_usuario",
  },
  palette: {
    pink_soft: "#ffd6ed",
    pink_deeper: "#efbecd",
    blue_soft: "#e5f0f1",
    beige: "#e9d5c4",
    mint: "#c1ebe0",
    ink: "#111111",
  },
  content_blocks: [
    {
      label: "Educativo",
      title: "Pequeños pasos para gestionar la ansiedad",
      copy: "3 técnicas simples de respiración para tu día a día.",
      cta: "Leer tips",
      href: "#tips",
    },
    {
      label: "Motivacional",
      title: "Amor propio no es egoísmo",
      copy: "Cuidarte te permite cuidar mejor a otros.",
      cta: "Ver post",
      href: "#motivacion",
    },
    {
      label: "Reel/TikTok",
      title: "¿Cómo parar el overthinking?",
      copy: "Un hábito de 30 segundos que sí funciona.",
      cta: "Ver video",
      href: "#video",
    },
    {
      label: "Historia",
      title: "Preguntas y respuestas",
      copy: "Deja tu pregunta anónima para la próxima historia.",
      cta: "Participar",
      href: "#historias",
    },
  ],
};

// --- UI bits ---
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <div className={`mx-auto max-w-5xl px-5 ${className}`}>{children}</div>
);

const Button: React.FC<React.PropsWithChildren<{ href?: string; onClick?: () => void; variant?: "primary" | "ghost" }>> = ({
  href,
  onClick,
  variant = "ghost",
  children,
}) => {
  const base =
    "inline-block rounded-2xl border border-neutral-900 px-4 py-2 text-neutral-900 shadow-[0_2px_0_0_rgba(0,0,0,1)] transition-transform hover:-translate-y-0.5 hover:shadow-[0_6px_0_0_rgba(0,0,0,1)]";
  const styles = variant === "primary" ? " bg-[#ffd6ed]" : " bg-white";
  if (href) return (
    <a href={href} className={base + styles}>
      {children}
    </a>
  );
  return (
    <button onClick={onClick} className={base + styles}>
      {children}
    </button>
  );
};

const Badge: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <span className={`inline-block rounded-full border border-black/20 bg-[#c1ebe0] px-3 py-1 text-sm ${className}`}>{children}</span>
);

const Card: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ className = "", children }) => (
  <article className={`flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white ${className}`}>{children}</article>
);

const CardBanner: React.FC<{ gradient?: [string, string] }> = ({ gradient = ["#e9d5c4", "#e5f0f1"] }) => (
  <div
    className="h-28 w-full"
    style={{
      background: `linear-gradient(45deg, ${gradient[0]}, ${gradient[1]})`,
    }}
  />
);

// --- Main component ---
export default function Landing({ brand = DEFAULT_BRAND }: { brand?: Brand }) {
  const paletteEntries = useMemo(
    () => [
      { key: "Rosa pastel", hex: brand.palette.pink_soft },
      { key: "Rosa intenso", hex: brand.palette.pink_deeper },
      { key: "Celeste claro", hex: brand.palette.blue_soft },
      { key: "Beige claro", hex: brand.palette.beige },
      { key: "Mint", hex: brand.palette.mint },
    ],
    [brand.palette]
  );

  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("¡Gracias! Te contactaré pronto.");
    setForm({ nombre: "", correo: "", mensaje: "" });
  };

  return (
    <>
      {/* Head tags for fonts (drop these into _app.tsx/_document.tsx in Next.js) */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-black/10 bg-white/70 backdrop-blur">
      <a href="/links" className="rounded-xl px-3 py-2 hover:bg-[#e5f0f1]">Links</a>
        <Container className="flex items-center justify-between py-3">
          <a className="flex items-center gap-3" href="#inicio" aria-label="Inicio">
            <LogoCircle />
            <div className="font-bold tracking-wide" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
              {brand.name}
            </div>
          </a>
          <nav className="flex items-center gap-1">
            {[
              ["Inicio", "#inicio"],
              ["Contenidos", "#contenidos"],
              ["Identidad", "#paleta"],
              ["Contacto", "#contacto"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="rounded-xl px-3 py-2 hover:bg-[#e5f0f1]"
              >
                {label}
              </a>
            ))}
          </nav>
        </Container>
      </header>

      {/* Hero */}
      <section id="inicio" className="border-b border-black/10 bg-gradient-to-b from-[#ffd6ed] to-white py-12 md:py-14">
        <Container>
          <Badge className="mb-3">Psicología · Bienestar · Comunidad</Badge>
          <h1
            className="mb-2 text-[clamp(30px,5vw,48px)] font-bold"
            style={{ fontFamily: '"Playfair Display", serif' }}
          >
            {brand.tagline}
          </h1>
          <p className="mb-4 max-w-prose opacity-90" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
            {brand.bio}
          </p>
          <Button href={brand.cta_link} variant="primary">
            {brand.cta_text}
          </Button>
        </Container>
      </section>

      {/* Content Grid */}
      <section id="contenidos" className="py-10">
        <Container>
          <h2 className="mb-4 text-[clamp(22px,3.4vw,34px)] font-semibold">Parrilla de contenidos</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {brand.content_blocks.map((c, i) => (
              <Card key={i}>
                <CardBanner />
                <div className="flex flex-1 flex-col gap-2 p-4">
                  <div className="w-fit rounded-lg border border-black/10 bg-[#efbecd] px-2 py-1 text-xs tracking-wide">
                    {c.label}
                  </div>
                  <div className="text-lg font-bold">{c.title}</div>
                  <p className="opacity-85 text-sm">{c.copy}</p>
                  <div className="mt-auto">
                    <Button href={c.href}>{c.cta}</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Palette */}
      <section id="paleta" className="py-10">
        <Container>
          <h2 className="mb-4 text-[clamp(22px,3.4vw,34px)] font-semibold">Identidad visual</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {paletteEntries.map(({ key, hex }) => (
              <div key={hex} className="overflow-hidden rounded-xl border border-black/10">
                <div className="h-16 w-full" style={{ background: hex }} />
                <div className="p-3 text-sm">
                  <div className="font-medium">{key}</div>
                  <div className="opacity-70">{hex}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section id="contacto" className="py-10">
        <Container>
          <h2 className="mb-4 text-[clamp(22px,3.4vw,34px)] font-semibold">Contacto</h2>
          <form onSubmit={submit} className="grid gap-3 rounded-2xl border border-black/20 bg-white p-5">
            <input
              className="rounded-xl border border-black/20 p-3"
              placeholder="Nombre"
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              required
            />
            <input
              type="email"
              className="rounded-xl border border-black/20 p-3"
              placeholder="Correo"
              value={form.correo}
              onChange={(e) => setForm((f) => ({ ...f, correo: e.target.value }))}
              required
            />
            <textarea
              rows={4}
              className="rounded-xl border border-black/20 p-3"
              placeholder="Cuéntame brevemente en qué puedo ayudarte"
              value={form.mensaje}
              onChange={(e) => setForm((f) => ({ ...f, mensaje: e.target.value }))}
            />
            <div>
              <Button variant="primary">Enviar</Button>
            </div>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {brand.social.instagram && (
              <Button href={brand.social.instagram}>Instagram</Button>
            )}
            {brand.social.tiktok && <Button href={brand.social.tiktok}>TikTok</Button>}
            {brand.social.youtube && <Button href={brand.social.youtube}>YouTube</Button>}
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="mt-10 border-t border-black/10 bg-gradient-to-b from-white to-[#e5f0f1] py-8">
        <Container className="grid gap-3 md:grid-cols-2">
          <div>© {new Date().getFullYear()} {brand.name} — {brand.tagline}</div>
          <div className="flex gap-2 md:justify-end">
            {brand.social.instagram && (
              <a className="underline" href={brand.social.instagram} target="_blank" rel="noreferrer">
                Instagram
              </a>
            )}
            {brand.social.tiktok && (
              <a className="underline" href={brand.social.tiktok} target="_blank" rel="noreferrer">
                TikTok
              </a>
            )}
            {brand.social.youtube && (
              <a className="underline" href={brand.social.youtube} target="_blank" rel="noreferrer">
                YouTube
              </a>
            )}
          </div>
        </Container>
      </footer>
    </>
  );
}

// --- Simple logo placeholder matching the brand gradient ---
function LogoCircle() {
  return (
    <svg width="36" height="36" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffd6ed" />
          <stop offset="100%" stopColor="#c1ebe0" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#g)" stroke="#111" strokeWidth="4" />
      <path
        d="M60 40c-10 0-18 8-18 18 0 16 18 28 18 28s18-12 18-28c0-10-8-18-18-18zm0 26a8 8 0 1 1 0-16 8 8 0 0 1 0 16z"
        fill="#fff"
        stroke="#111"
        strokeWidth="3"
      />
    </svg>
  );
}
