"use client";

import React from 'react';
import IconActionGrid from "@/app/components/IconActionGrid";
// FIX: Cambiamos los nombres de importación abreviados (IconWA, IconIG, etc.) 
// a los nombres largos para coincidir con el archivo de íconos.
import { 
    IconWhatsApp, 
    IconPhone, 
    IconShare, 
    IconInstagram, 
    IconTiktok, 
    IconYoutube 
} from "@/app/components/icons";

const ACTION_ITEMS = [
    {
        label: "WhatsApp",
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconWhatsApp />,
        href: "https://wa.me/51999999999?text=Hola%20me%20gustaría%20agendar%20una%20consulta%20🙌",
        external: true,
    },
    { 
        label: "Llamar", 
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconPhone />, 
        href: "tel:+51999999999" 
    },
    { 
        label: "Instagram", 
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconInstagram />, 
        href: "https://instagram.com/tu_usuario", 
        external: true 
    },
    { 
        label: "TikTok", 
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconTiktok />, 
        href: "https://tiktok.com/@tu_usuario", 
        external: true 
    },
    { 
        label: "YouTube", 
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconYoutube />, 
        href: "https://youtube.com/@tu_usuario", 
        external: true 
    },
    {
        label: "Compartir",
        // FIX: Usamos la función de ícono con el nombre completo
        icon: <IconShare />,
        // El manejador onClick se mantiene aquí, dentro del componente cliente.
        onClick: async () => {
            try {
                // NOTA: Se mantiene el alert() temporalmente, pero en producción 
                // se recomienda reemplazarlo por un mensaje de notificación customizado.
                if (navigator.share) await navigator.share({ title: "Francis Landeo", url: location.href });
                else if (navigator.clipboard) {
                    await navigator.clipboard.writeText(location.href);
                    alert("Enlace copiado ✅");
                }
            } catch (e) {
                console.error("Share failed", e);
            }
        },
    },
];

export default function ActionGridData() {
    return (
        <IconActionGrid items={ACTION_ITEMS} />
    );
}
