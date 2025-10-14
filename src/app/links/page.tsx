/* src/app/links/page.tsx — Server Component (sin hooks) */
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Links | Francis Landeo",
  description:
    "DBT aplicada a crianza consciente y maternidad realista. Agenda, redes y recursos de bienestar emocional.",
};

// --- Paleta de marca ---
const BRAND_COLORS = {
  primaryLight: "#ffd6ed",    // rosa pastel
  primaryMedium: "#efbecd",   // rosa medio
  secondaryLight: "#e5f0f1",  // celeste claro
  secondaryMedium: "#c1ebe0", // menta
  textContrast: "#000000",
};

const AVATAR = "/avatar-landeo.jpg";
const NAME = "Francis Landeo";

const BIO =
  "Psicóloga en formación DBT. Ayudo a madres/padres a aplicar regulación emocional y habilidades DBT en la crianza consciente —con ejemplos reales y herramientas simples.";

/* -------------------------- LINKS / RECURSOS -------------------------- */
const LINKS: {
  label: string;
  href: string;
  badge?: string;
  sub?: string;
  icon: React.ReactNode;
  external?: boolean;
}[] = [
  {
    label: "Reserva: Consulta para mamás/papás",
    href: "https://tusitio.com/agenda",
    badge: "DBT + Crianza",
    sub: "Sesión 50 min · online",
    icon: IconCalendar(),
    external: true,
  },
  {
    label: "Guía DBT para maternidad realista (PDF)",
    href: "https://tu-enlace-a-pdf.com/guia-dbt-maternidad.pdf",
    badge: "Gratis",
    sub: "Hojas de trabajo: emociones, límites, crisis",
    icon: IconBook(),
    external: true,
  },
  {
    label: "Serie de Reels: DBT en 60s",
    href: "https://instagram.com/tu_usuario",
    badge: "Reels",
    sub: "Regulación, tolerancia al malestar, mindfulness",
    icon: IconInstagram(),
    external: true,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@tu_usuario",
    sub: "Ejemplos rápidos del día a día",
    icon: IconTiktok(),
    external: true,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@tu_usuario",
    sub: "Charlas y demos de habilidades DBT",
    icon: IconYoutube(),
    external: true,
  },
  {
    label: "WhatsApp",
    href:
      "https://wa.me/51999999999?text=Hola%20Francis%2C%20quiero%20orientaci%C3%B3n%20en%20DBT%20para%20crianza%20consciente%20%F0%9F%8D%80",
    sub: "Mensaje prellenado (DBT + crianza)",
    icon: IconWhatsApp(),
    external: true,
  },
  {
    label: "Newsletter: maternidad realista",
    href: "https://tusitio.com/newsletter",
    sub: "Ideas prácticas semanales",
    icon: IconSpark(),
    external: true,
  },
  {
    label: "Email",
    href: "mailto:contacto@tusitio.com",
    sub: "Casos, prensa o alianzas",
    icon: IconMail(),
  },
  {
    label: "Web oficial",
    href: "/",
    sub: "Regresar al sitio",
    icon: IconGlobe(),
  },
];

/* -------------------------- ENFOQUE / TESTIMONIOS -------------------------- */
const FOCUS = [
  "DBT en crianza",
  "Regulación emocional",
  "Maternidad realista",
  "Límites sin culpa",
  "Niños y adolescentes",
];

const TESTIMONIALS = [
  "“Aprendí a validar emociones y poner límites sin pelear.”",
  "“Las habilidades DBT nos ayudaron en las mañanas caóticas.”",
  "“Tengo un plan claro para crisis y rabietas.”",
  "“Me siento menos culpable y más presente.”",
];

/* -------------------------- TIPADO CSS VARS -------------------------- */
type CSSVars = React.CSSProperties & {
  ["--color-primary-light"]?: string;
  ["--color-primary-medium"]?: string;
  ["--color-secondary-light"]?: string;
  ["--color-secondary-medium"]?: string;
  ["--color-text-contrast"]?: string;
  ["--font-title"]?: string;
  ["--font-body"]?: string;
};

export default function LinksPage() {
  const styles: CSSVars = {
    ["--color-primary-light"]: BRAND_COLORS.primaryLight,
    ["--color-primary-medium"]: BRAND_COLORS.primaryMedium,
    ["--color-secondary-light"]: BRAND_COLORS.secondaryLight,
    ["--color-secondary-medium"]: BRAND_COLORS.secondaryMedium,
    ["--color-text-contrast"]: BRAND_COLORS.textContrast,
    ["--font-title"]: '"Playfair Display", serif',
    ["--font-body"]: "Poppins, system-ui, sans-serif",
    // Fondo rosado predominante
    background: "linear-gradient(180deg, #ffe6f2 0%, #ffd6ed 40%, #fff 100%)",
  };

  // Colores sólidos para “cuadros” (tiles) y mini-cards
 const TILE_COLORS = [
  '#ffffff',
];

  return (
    <main className="relative min-h-dvh overflow-hidden" style={styles}>
      {/* CSS local (sin styled-jsx) */}
      <style>{`
        @keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .header-content { animation: fadeIn 0.8s ease-out; }
        .link-item { animation: fadeIn 0.5s ease-out forwards; opacity: 0; }
        .link-item:nth-child(1){ animation-delay:.0s; }
        .link-item:nth-child(2){ animation-delay:.1s; }
        .link-item:nth-child(3){ animation-delay:.2s; }
        .link-item:nth-child(4){ animation-delay:.3s; }
        .link-item:nth-child(5){ animation-delay:.4s; }
        .link-item:nth-child(6){ animation-delay:.5s; }
        .link-item:nth-child(7){ animation-delay:.6s; }

        .marquee-track {
          display:inline-flex; gap:1.5rem; white-space:nowrap;
          animation: marquee 28s linear infinite; padding:.5rem 0;
        }

        /* Tiles SIN bordes ni sombra; color sólido */
        .tile {
          border: none;
          box-shadow: none;
          transition: transform .18s ease, filter .18s ease;
        }
        .tile:hover { transform: translateY(-2px); filter: brightness(0.98); }

        /* Badges sin borde */
        .badge-style { border: none; background: rgba(0,0,0,.08); }

        /* Mini-cards sin bordes ni sombra (el color lo daremos inline) */
        .mini-card { border: none; box-shadow: none; }
          .mini-green {
    border: none;
    box-shadow: none;
    border-radius: 1rem;
    padding: 1rem;
    background: linear-gradient(135deg, #e9f7f5 0%, #c1ebe0 100%);
  }
  .mini-green.alt {
    background: linear-gradient(135deg, #c1ebe0 0%, #b2e6d8 100%);
  }
  .mini-title {
    display:flex; align-items:center; gap:.5rem;
    font-weight:600; font-size:0.95rem;
  }
  .mini-copy { font-size:.9rem; opacity:.9; margin-top:.35rem; }
      `}</style>

      {/* JSON-LD básico para SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: NAME,
            description:
              "Psicóloga con enfoque DBT aplicada a crianza consciente y maternidad realista.",
            sameAs: [
              "https://instagram.com/tu_usuario",
              "https://tiktok.com/@tu_usuario",
              "https://youtube.com/@tu_usuario",
            ],
          }),
        }}
      />

      {/* Header / avatar */}
      <section className="header-content mx-auto flex max-w-md flex-col items-center px-6 pb-8 pt-12 text-neutral-900">
        <div className="relative mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-lg ring-4 ring-offset-2 ring-[var(--color-primary-medium)]">
          <Image src={AVATAR} alt={NAME} fill sizes="96px" style={{ objectFit: "cover" }} />
        </div>
        <h1 className="text-3xl font-bold" style={{ fontFamily: "var(--font-title)" }}>
          {NAME}
        </h1>
        <p className="mt-2 max-w-prose text-center text-base font-medium" style={{ fontFamily: "var(--font-body)" }}>
          {BIO}
        </p>

        {/* pill disponibilidad (la dejo sutil; si quieres también se la quitamos) */}
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs shadow-sm backdrop-blur">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" />
          Cupos esta semana
        </div>

        {/* chips de foco */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {FOCUS.map((t) => (
            <span
              key={t}
              className="rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                backgroundColor: BRAND_COLORS.primaryMedium,
                color: BRAND_COLORS.textContrast,
                fontFamily: "var(--font-body)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Sección nicho: DBT + crianza (3 mini-cards de color sólido) */}
      {/* Sección nicho: DBT + crianza (3 mini-cards verdizas) */}
<section className="mx-auto mt-2 max-w-md px-6">
  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
    <div className="mini-green">
      <div className="mini-title">
        {IconHeartBrain(20)} Regulación emocional
      </div>
      <p className="mini-copy">
        Validación + mindfulness para responder, no reaccionar.
      </p>
    </div>

    <div className="mini-green alt">
      <div className="mini-title">
        {IconFamily(20)} Límites sin culpa
      </div>
      <p className="mini-copy">
        Dialéctica: firmeza y calidez a la vez, con guías claras.
      </p>
    </div>

    <div className="mini-green">
      <div className="mini-title">
        {IconBaby(20)} Maternidad realista
      </div>
      <p className="mini-copy">
        Expectativas humanas, autocuidado y planes para crisis.
      </p>
    </div>
  </div>
</section>


      {/* Marquee testimonios */}
      <section className="mt-6 overflow-hidden bg-[var(--color-secondary-light)] py-2">
        <div className="marquee-track">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <span
              key={i}
              className="rounded-full bg-white/80 px-3 py-1 text-sm italic text-neutral-800 backdrop-blur"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Cards principales 2×N (SIN bordes: color sólido alternado) */}
      <section className="mx-auto w-full max-w-3xl px-6 pt-8">
        <ul className="grid grid-cols-2 gap-3">
          {LINKS.map((item, i) => (
            <li key={item.href} className="link-item">
              <a
                href={item.href}
                target={item.external ? "_blank" : undefined}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="tile group flex h-full flex-col justify-between gap-3 rounded-2xl p-4 text-neutral-900 hover:text-neutral-900"
                aria-label={item.label}
                style={{ fontFamily: "var(--font-body)", backgroundColor: TILE_COLORS[i % TILE_COLORS.length] }}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 h-6 w-6 flex-shrink-0">
                    {item.icon}
                  </span>
                  <div className="flex-1">
                    <span className="block text-[15px] font-semibold leading-snug">
                      {item.label}
                    </span>
                    {item.sub && (
                      <span className="mt-0.5 block text-[12px] opacity-85 leading-snug">
                        {item.sub}
                      </span>
                    )}
                  </div>
                  {item.badge && (
                    <span className="badge-style flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold">
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-end">
                  <span aria-hidden className="ml-1 text-lg transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* FAQ accesible (sin JS) */}
      <section className="mx-auto mt-8 max-w-md px-6">
        <h2 className="mb-3 text-lg font-semibold" style={{ fontFamily: "var(--font-title)" }}>
          Preguntas rápidas
        </h2>
        <div className="space-y-3">
          <details className="rounded-xl bg-white p-4">
            <summary className="cursor-pointer select-none text-sm font-medium">
              ¿Qué es DBT y por qué sirve en crianza?
            </summary>
            <p className="mt-2 text-sm opacity-85">
              DBT (Terapia Dialéctico-Conductual) combina validación emocional y cambio de
              conductas. En crianza ayuda a responder a crisis, poner límites efectivos y
              fortalecer la relación de apego.
            </p>
          </details>
          <details className="rounded-xl bg-white p-4">
            <summary className="cursor-pointer select-none text-sm font-medium">
              ¿Para quién es?
            </summary>
            <p className="mt-2 text-sm opacity-85">
              Madres y padres que buscan herramientas prácticas para regularse y acompañar a
              niños/adolescentes en emociones intensas.
            </p>
          </details>
          <details className="rounded-xl bg-white p-4">
            <summary className="cursor-pointer select-none text-sm font-medium">
              ¿Qué resultados puedo esperar?
            </summary>
            <p className="mt-2 text-sm opacity-85">
              Más calma, menos culpa, límites claros y planes para momentos difíciles
              (tolerancia al malestar, habilidades de comunicación y mindfulness).
            </p>
          </details>
        </div>
      </section>

      {/* Footer */}
      <section className="mx-auto mt-10 max-w-md px-6 pb-12">
        <p className="text-center text-xs opacity-70" style={{ fontFamily: "var(--font-body)" }}>
          © {new Date().getFullYear()} {NAME} — Experiencia con niños y adolescentes ·
          Especialización en DBT en curso
        </p>
      </section>
    </main>
  );
}

/* -------------------------- Iconos inline -------------------------- */
function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.5" cy="6.5" r="1.25" fill="currentColor" />
    </svg>
  );
}
function IconTiktok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M14.5 3h2.2c.2 1.7 1.3 3.1 3.3 3.4v2.2c-1.4 0-2.6-.4-3.7-1.1v6.7a6 6 0 11-6-6h.8v2.4h-.8a3.6 3.6 0 103.6 3.6V3z" />
    </svg>
  );
}
function IconYoutube() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23 12s0-3.4-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C18.4 4 12 4 12 4s-6.4 0-8.8.4c-.9.2-1.6.9-1.8 1.8C1 8.6 1 12 1 12s0 3.4.4 4.9c.2.9.9 1.6 1.8 1.8C5.6 20 12 20 12 20s6.4 0 8.8-.4c.9-.2 1.6-.9 1.8-1.8.4-1.5.4-4.9.4-4.9zM10 8l6 4-6 4V8z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 003.4 17.6L2 22l4.6-1.2A11 11 0 1020.5 3.5zM12 19.3c-4 0-7.3-3.2-7.3-7.3S8 4.7 12 4.7s7.3 3.2 7.3 7.3-3.2 7.3-7.3 7.3z" />
      <path d="M16.5 14.7l-.8-.5c-.4-.2-.9-.2-1.2.2l-.4.5a.9.9 0 01-1 .3c-1.6-.6-2.8-1.7-3.6-3.2a.9.9 0 01.1-.9l.4-.6c.3-.4.2-.9 0-1.3l-.4-.7c-.4-.8-1.6-.8-2 0a3.9 3.9 0 00-.4 1.8c0 .3 0 .6.1 .9.3 1 .9 2 1.6 2.8a9 9 0 003.5 2.4c.4 .1 .7 .2 1.1 .2 .6 0 1.3-.2 1.8-.5 .6-.4 1.2-1 1.2-1.7 0-.2-.1-.4-.2-.6z" />
    </svg>
  );
}
function IconMail() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" />
      <path d="M4 7l8 6 8-6" stroke="currentColor" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" />
      <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 0 1 0 18" stroke="currentColor" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" />
      <path d="M8 2v4M16 2v4M3 9h18" stroke="currentColor" />
    </svg>
  );
}
function IconHeartBrain(size = 22) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M12 21s-6-4.35-8.2-7.05C1.3 11.2 2.4 7.7 5.3 7.1A4.3 4.3 0 0 1 12 8.6a4.3 4.3 0 0 1 6.7-1.5c2.9.6 4 4.1 1.5 6.85C18 16.65 12 21 12 21Z" />
      <path d="M9.5 10.2c0-1.2.9-2.2 2.1-2.2a2.2 2.2 0 0 1 2.2 2.2v.4" />
    </svg>
  );
}
function IconFamily(size = 22) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="7" cy="7" r="3" />
      <circle cx="17" cy="8" r="3" />
      <path d="M2 22v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2" />
      <path d="M12 22v-2a5 5 0 0 1 5-5h0a5 5 0 0 1 5 5v2" />
    </svg>
  );
}
function IconBaby(size = 22) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="8" r="4" />
      <path d="M5 21a7 7 0 0 1 14 0" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5z" stroke="currentColor" />
      <path d="M9 7h8M9 11h8M9 15h8" stroke="currentColor" />
    </svg>
  );
}
function IconSpark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5L19 19M5 19l3.5-3.5M15.5 8.5L19 5" stroke="currentColor" />
    </svg>
  );
}
