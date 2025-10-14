"use client";

import React from "react";

type Props = {
  whatsapp: string;   // e.g., "51999999999"
  phone: string;      // e.g., "+51 999 999 999"
  message?: string;   // prefill
};

export default function MobileActionBar({ whatsapp, phone, message = "Hola, me gustaría agendar una consulta 🙌" }: Props) {
  const waUrl = `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`;
  const telUrl = `tel:${phone.replace(/\s+/g, "")}`;

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: "Francis Landeo", url: location.href });
      else if (navigator.clipboard) { await navigator.clipboard.writeText(location.href); alert("Enlace copiado ✅"); }
    } catch {}
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-30 block border-t border-black/10 bg-white/90 backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center justify-between gap-2 px-4 py-3">
          <a href={waUrl} className="flex flex-1 items-center justify-center rounded-xl border border-black/20 px-3 py-2">
            WhatsApp
          </a>
          <a href={telUrl} className="flex flex-1 items-center justify-center rounded-xl border border-black/20 px-3 py-2">
            Llamar
          </a>
          <button onClick={share} className="flex items-center justify-center rounded-xl border border-black/20 px-3 py-2">
            Compartir
          </button>
        </div>
      </div>
      {/* Spacer para que no tape el contenido */}
      <div className="h-16 md:hidden" />
    </>
  );
}
