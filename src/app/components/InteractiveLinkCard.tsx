"use client";

import React, { useRef, useState } from "react";

type Props = {
  href: string;
  label: string;
  sub?: string;
  badge?: string;
  icon?: React.ReactNode;
  external?: boolean;
  className?: string;
};

/**
 * Card con:
 * - Ripple táctil
 * - Vibración háptica (si existe)
 * - Long-press (0.45s) para menú rápido: compartir / copiar enlace
 * - Web Share API (si existe) con fallback al portapapeles
 */
export default function InteractiveLinkCard({
  href,
  label,
  sub,
  badge,
  icon,
  external,
  className = "",
}: Props) {
  const [showMenu, setShowMenu] = useState(false);
  const pressTimer = useRef<number | null>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);

  const vibrate = (ms = 10) => {
    try {
      if ("vibrate" in navigator) (navigator as any).vibrate(ms);
    } catch {}
  };

  const onPointerDown = (e: React.PointerEvent) => {
    // Ripple
    const el = cardRef.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement("span");
      ripple.className = "ilc-ripple";
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    }
    vibrate(8);

    // Long press -> menú
    pressTimer.current = window.setTimeout(() => {
      setShowMenu(true);
      vibrate(12);
    }, 450);
  };

  const onPointerUp = () => {
    if (pressTimer.current) {
      clearTimeout(pressTimer.current);
      pressTimer.current = null;
    }
  };

  const share = async () => {
    try {
      if (navigator.share) {
        await navigator.share({ title: label, text: sub ?? label, url: href });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(href);
        alert("Enlace copiado ✅");
      }
    } catch {}
    setShowMenu(false);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(href);
      alert("Enlace copiado ✅");
    } catch {}
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <a
        ref={cardRef}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        className={
          "ilc-btn group flex w-full items-center gap-4 rounded-[1.25rem] p-4 text-neutral-900 hover:text-neutral-900 " +
          className
        }
        style={{ fontFamily: "var(--font-body)" }}
      >
        <span className="h-6 w-6 flex-shrink-0 text-[var(--color-text-contrast)]">{icon}</span>
        <span className="flex-1">
          <span className="block text-[16px] font-semibold">{label}</span>
          {sub && <span className="mt-0.5 block text-xs opacity-75">{sub}</span>}
        </span>
        {badge && (
          <span className="badge-style flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold">
            {badge}
          </span>
        )}
        <span aria-hidden className="ml-1 text-xl transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>

      {/* Menú flotante del long-press */}
      {showMenu && (
        <div
          className="absolute right-3 top-3 z-20 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg"
          onClick={(e) => e.preventDefault()}
        >
          <button
            onClick={share}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-black/5"
          >
            Compartir
          </button>
          <button
            onClick={copy}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-black/5"
          >
            Copiar enlace
          </button>
          <button
            onClick={() => setShowMenu(false)}
            className="block w-full px-3 py-2 text-left text-sm hover:bg-black/5"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* estilos internos del botón */}
      <style>{`
        .ilc-btn{
          background:#fff; 
          border:1px solid var(--color-text-contrast);
          box-shadow:4px 4px 0 0 var(--color-text-contrast);
          transition:transform .18s ease, box-shadow .18s ease;
          position: relative;
          overflow: hidden;
        }
        .ilc-btn:hover{ transform: translate(-2px,-2px); box-shadow:6px 6px 0 0 var(--color-primary-medium); }
        .ilc-ripple{
          position:absolute; width:14px; height:14px; border-radius:999px;
          transform:translate(-50%,-50%); background: rgba(0,0,0,.08);
          animation: ilc_ripple .6s ease-out forwards;
          pointer-events:none;
        }
        @keyframes ilc_ripple{
          to{ opacity:0; transform: translate(-50%,-50%) scale(12); }
        }
      `}</style>
    </div>
  );
}
