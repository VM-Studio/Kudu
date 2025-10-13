'use client';

import { useMemo } from 'react';

type Props = {
  /** Teléfono con código de país, sin + ni espacios. Ej: 5491122334455 */
  phone: string;
  /** Mensaje inicial opcional */
  message?: string;
  /** UTM opcional para Analytics */
  utm?: string;
};

export default function WhatsAppFab({ phone, message, utm }: Props) {
  const href = useMemo(() => {
    const base = new URL(`https://wa.me/${phone}`);
    if (message) base.searchParams.set('text', message);
    if (utm) base.search = (base.search ? base.search + '&' : '?') + utm;
    return base.toString();
  }, [phone, message, utm]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chatear por WhatsApp"
      className="
        fixed z-[999]
        right-4 bottom-4 md:right-6 md:bottom-6
        inline-flex items-center justify-center
        h-16 w-16 md:h-18 md:w-18       /* ← un poquito más grande */
        rounded-full bg-[#25D366] text-white
        shadow-[0_14px_34px_-12px_rgba(0,0,0,.5)]
        hover:brightness-95 active:brightness-90
        focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60
        transition
      "
      style={{
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      {/* Ícono WhatsApp (globo + handset), limpio y nítido */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 md:h-9 md:w-9"  /* ← escala del ícono */
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Globo de chat */}
        <path d="M19.05 15.56c-.27-.14-1.6-.86-1.85-.96-.25-.09-.43-.14-.6.14-.18.27-.7.94-.85 1.12-.16.19-.31.21-.57.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.38-1.65-1.54-1.93-.16-.27-.02-.42.12-.57.13-.13.31-.35.46-.53.15-.18.19-.29.3-.48.1-.19.06-.36-.02-.52-.08-.15-.58-1.41-.8-1.96-.22-.52-.44-.45-.6-.46l-.52-.01c-.19 0-.49.07-.75.35-.26.28-.99.97-.99 2.33 0 1.36 1.01 2.67 1.15 2.85.14.18 1.99 2.95 4.73 4.15.68.29 1.15.46 1.55.58.66.21 1.26.19 1.74.12.54-.08 1.6-.66 1.83-1.33.23-.67.23-1.2.16-1.33-.06-.12-.24-.19-.5-.32z" />
        {/* contorno circular (ligero) para mejorar legibilidad sobre fondos claros */}
        <path d="M26.67 5.33A13.3 13.3 0 0 0 16 1.33 13.34 13.34 0 0 0 2.67 14.69c0 2.36.63 4.17 1.71 5.96L2 30.67l10.27-2.69c1.74.64 3.36.98 5.06.98A13.33 13.33 0 0 0 30.67 16c0-3.56-1.38-6.9-4-9.33z"
              fill="currentColor" opacity=".0" />
      </svg>

      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
