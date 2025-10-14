"use client";

import React, { useRef } from "react";

export type ActionItem = {
  label: string;
  href?: string; // si es link
  external?: boolean;
  onClick?: () => void; // o acción custom (p.ej. share)
  icon: React.ReactNode;
};

type Props = {
  items: ActionItem[];
  className?: string;
};

export default function IconActionGrid({ items, className = "" }: Props) {
  // FIX: Create an array of refs outside the map loop.
  // We use the items array length to initialize the array of refs.
  const itemRefs = useRef<(HTMLButtonElement | HTMLAnchorElement)[]>([]);

  // Clear and resize the refs array on render to match the current items.
  itemRefs.current = itemRefs.current.slice(0, items.length);

  // util: vibra leve (solo Android la respeta)
  const vibrate = (ms = 10) => {
    try { if ("vibrate" in navigator) (navigator as any).vibrate(ms); } catch {}
  };

  // animación de pulso
  const pulse = (el: HTMLElement | null) => {
    if (!el) return;
    el.classList.remove("iag-pulse");
    void el.offsetWidth; // reflow para reiniciar anim
    el.classList.add("iag-pulse");
    setTimeout(() => el.classList.remove("iag-pulse"), 300);
  };

  // The ref passed here is an element from the itemRefs array.
  const handlePress = (el: HTMLElement | null, cb?: () => void) => {
    pulse(el);
    vibrate(8);
    cb?.();
  };

  return (
    <>
      <div className={`grid grid-cols-2 gap-3 md:grid-cols-4 ${className}`}>
        {items.map((it, index) => {
          // Initialize a ref for this item if it doesn't exist
          // We don't call useRef here, but we use the index to reference the element.
          
          const base =
            "group flex flex-col items-center justify-center gap-2 rounded-2xl border border-black/15 bg-white/90 px-3 py-3 text-sm shadow-sm backdrop-blur transition-transform active:scale-95";
          const iconWrap =
            "grid h-14 w-14 place-items-center rounded-2xl border border-black/15 shadow-[0_2px_0_0_rgba(0,0,0,.7)] transition-transform group-hover:-translate-y-0.5";
          const label = "text-[13px] leading-none";

          if (it.href) {
            return (
              <a
                // Use a functional ref to set the element in the itemRefs array
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                key={it.label}
                href={it.href}
                target={it.external ? "_blank" : undefined}
                rel={it.external ? "noopener noreferrer" : undefined}
                onClick={() => handlePress(itemRefs.current[index], undefined)}
                className={base}
                aria-label={it.label}
              >
                <span className={`${iconWrap}`}>{it.icon}</span>
                <span className={label}>{it.label}</span>
              </a>
            );
          }
          return (
            <button
              // Use a functional ref to set the element in the itemRefs array
              ref={(el) => {
                if (el) itemRefs.current[index] = el;
              }}
              key={it.label}
              onClick={() => handlePress(itemRefs.current[index], it.onClick)}
              className={base}
              aria-label={it.label}
            >
              <span className={`${iconWrap}`}>{it.icon}</span>
              <span className={label}>{it.label}</span>
            </button>
          );
        })}
      </div>

      {/* estilos locales */}
      <style>{`
        @keyframes iag_pulse { 
          0% { transform: scale(1); } 
          50% { transform: scale(1.06); } 
          100% { transform: scale(1); } 
        }
        .iag-pulse { animation: iag_pulse .28s ease-out; }
      `}</style>
    </>
  );
}