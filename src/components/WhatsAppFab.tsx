'use client';

import { useMemo } from 'react';

type Props = {
  /** Teléfono con código de país, sin + ni espacios. Ej: 5491122334455 */
  phone: string;
  /** Mensaje inicial opcional */
  message?: string;
  /** UTM opcional para Analytics (ej. "utm_source=web...") */
  utm?: string;
};

export default function WhatsAppFab({ phone, message, utm }: Props) {
  const href = useMemo(() => {
    const url = new URL(`https://wa.me/${phone}`);
    if (message) url.searchParams.set('text', message);
    if (utm) url.search = (url.search ? url.search + '&' : '?') + utm;
    return url.toString();
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
        h-16 w-16 md:h-[72px] md:w-[72px]   /* un toque más grande */
        rounded-full bg-[#25D366] text-white
        shadow-[0_18px_40px_-16px_rgba(0,0,0,.6)]
        hover:brightness-95 active:brightness-90
        focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60
        transition
      "
      style={{
        bottom: 'max(16px, env(safe-area-inset-bottom))',
        right: 'max(16px, env(safe-area-inset-right))',
      }}
    >
      {/* Ícono oficial (globo + handset) en un solo path, nítido */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 md:h-9 md:w-9" /* escala del ícono dentro del botón */
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M16.003 3.2c-7.061 0-12.8 5.739-12.8 12.8 0 2.253.59 4.402 1.618 6.252L3.2 28.8l6.682-1.745A12.746 12.746 0 0 0 16.003 28.8c7.061 0 12.8-5.739 12.8-12.8s-5.739-12.8-12.8-12.8zm7.41 18.398c-.314.888-1.538 1.627-2.13 1.662-.568.033-1.281.047-2.066-.127-.478-.106-1.095-.358-1.893-.7-3.33-1.44-5.49-4.781-5.655-5.006-.165-.225-1.35-1.796-1.35-3.429 0-1.633.858-2.435 1.162-2.761.304-.327.661-.409.882-.409.221 0 .44.002.634.012.203.009.48-.077.751.574.271.652.92 2.257.999 2.423.08.166.133.361.025.586-.106.225-.16.361-.315.558-.155.197-.33.441-.47.593-.155.166-.317.346-.136.671.181.326.806 1.329 1.732 2.151 1.191 1.068 2.195 1.399 2.521 1.554.326.155.517.138.71-.083.193-.221.816-.949 1.035-1.275.218-.325.451-.271.747-.155.296.116 1.872.883 2.192 1.043.321.161.535.241.614.376.08.135.08.78-.234 1.667z"/>
      </svg>

      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
