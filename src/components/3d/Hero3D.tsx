"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Outfit, Montserrat_Alternates } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], display: "swap" });
const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function Hero3D() {
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(
      "https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3"
    );
    if (audioRef.current) audioRef.current.muted = muted;
  }, []);
  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = muted;
  }, [muted]);

  const press = (id: string) => {
    document.getElementById(id)?.setAttribute("data-pressed", "true");
    if (!muted && audioRef.current) {
      audioRef.current.currentTime = 0;
      void audioRef.current.play().catch(() => {});
    }
  };
  const release = (id: string) =>
    document.getElementById(id)?.removeAttribute("data-pressed");

  return (
    <section className="relative overflow-hidden">
      {/* Fondo con transparencia desde /public */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Hero compacto */}
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-4 grid md:grid-cols-2 items-center gap-3">
        {/* IZQUIERDA — KUDU grande, cerca del keypad */}
        <div className="flex flex-col justify-center md:pr-2">
          <h1
            className={`${montAlt.className} leading-[0.9] tracking-tight text-[#63798a] 
            text-[clamp(92px,12.5vw,228px)]`}
          >
            <motion.span
              className="relative inline-block align-middle"
              style={{ transformStyle: "preserve-3d" }}
              animate={{ rotateY: 360 }}
              transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              aria-label="K de KUDU girando"
            >
              <span className="block" style={{ backfaceVisibility: "hidden" }}>
                K
              </span>
              <span
                className="block absolute inset-0"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                K
              </span>
            </motion.span>
            <span className="align-middle">UDU</span>
          </h1>
        </div>

        {/* DERECHA — Keypad 3D */}
        <div className="relative md:ml-auto md:translate-x-2">
          <div className="keypad opacity-0 will-change-transform select-none [transform-style:preserve-3d] relative aspect-[400/310] w-[min(420px,38vw)]">
            {/* Base */}
            <div className="keypad__base absolute bottom-0 w-full">
              <img
                src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86"
                alt=""
                className="w-full"
              />
            </div>

            {/* SINGLE izquierda — INICIO */}
            <button
              id="key-inicio"
              type="button"
              className="key keypad__single keypad__single--left"
              onPointerDown={() => press("key-inicio")}
              onPointerUp={() => release("key-inicio")}
              onPointerLeave={() => release("key-inicio")}
              aria-label="Inicio"
              style={
                {
                  "--travel": "24",
                  "--key-color": "#586c7a",
                  // plano + offsets: MÁS ARRIBA y a la IZQUIERDA
                  "--pw": "66%",
                  "--ph": "50%",
                  "--ox": "-5%",   // antes 9%
                  "--oy": "-58%", // antes -6%
                } as React.CSSProperties
              }
            >
              <span className="key__content">
                <span className="key__centerplane">
                  <span className="key__label">Inicio</span>
                </span>
                <img
                  src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                  alt=""
                />
                <span className="key__tint" />
              </span>
            </button>

            {/* SINGLE derecha — WHATSAPP */}
            <a
              id="key-wpp"
              href="https://wa.me/XXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="key keypad__single"
              onPointerDown={() => press("key-wpp")}
              onPointerUp={() => release("key-wpp")}
              onPointerLeave={() => release("key-wpp")}
              aria-label="WhatsApp"
              style={
                {
                  "--travel": "24",
                  "--key-color": "#586c7a",
                  "--pw": "60%",
                  "--ph": "60%",
                  "--ox": "-4%",  // antes 6%
                  "--oy": "-40%",  // antes -5%
                } as React.CSSProperties
              }
            >
              <span className="key__content">
                <span className="key__centerplane">
                  <svg viewBox="0 0 32 32" className="key__icon" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M19.11 17.2c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.27-.74.91-.91 1.1-.17.18-.34.21-.62.07-.28-.14-1.2-.44-2.3-1.4-.85-.75-1.42-1.67-1.59-1.95-.17-.27-.02-.42.13-.57.14-.14.32-.37.48-.55.16-.18.21-.3.32-.5.11-.2.06-.36-.03-.5-.1-.14-.64-1.53-.88-2.09-.23-.56-.47-.48-.64-.49l-.55-.01c-.2 0-.5.07-.76.36s-1 1-1 2.42 1.02 2.8 1.16 2.99c.14.19 2.01 3.06 4.88 4.29.68.29 1.2.46 1.61.58.68.22 1.3.19 1.79.12.55-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.25-.19-.53-.33zM26.67 5.33A13.3 13.3 0 0 0 16 1.33 13.34 13.34 0 0 0 2.67 14.69c0 2.36.63 4.17 1.71 5.96L2 30.67l10.27-2.69c1.74.64 3.36.98 5.06.98A13.33 13.33 0 0 0 30.67 16c0-3.56-1.38-6.9-4-9.33zM16 27.47c-1.56 0-3.09-.33-4.53-.93l-.33-.14-6.09 1.6 1.62-5.93-.17-.31a11.53 11.53 0 1 1 9.5 5.71z"
                    />
                  </svg>
                </span>
                <img
                  src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86"
                  alt=""
                />
                <span className="key__tint" />
              </span>
            </a>

            {/* DOUBLE — VER CATÁLOGO */}
            <a
              id="key-catalogo"
              href="/catalogo"
              className="key keypad__double"
              onPointerDown={() => press("key-catalogo")}
              onPointerUp={() => release("key-catalogo")}
              onPointerLeave={() => release("key-catalogo")}
              aria-label="Ver Catálogo"
              style={
                {
                  "--travel": "18",
                  "--key-color": "#477e77",
                  "--pw": "80%",
                  "--ph": "58%",
                  "--ox": "-3%",    // antes 11%
                  "--oy": "-35%",  // antes -7%
                } as React.CSSProperties
              }
            >
              <span className="key__content">
                <span className="key__centerplane">
                  <span className="key__label">Ver Catálogo</span>
                </span>
                <img
                  src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86"
                  alt=""
                />
                <span className="key__tint" />
              </span>
            </a>
          </div>

          {/* Mutear click */}
          <div className="mt-3 flex items-center gap-2 text-sm text-[#0f2a55]/80">
            <label className="inline-flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#2b6cb0]"
                checked={muted}
                onChange={(e) => setMuted(e.target.checked)}
              />
              Mutear click
            </label>
          </div>
        </div>
      </div>

      {/* Estilos: centrado perfecto en perspectiva */}
      <style jsx>{`
        .keypad {
          transition: translate 0.26s ease-out, transform 0.26s ease-out,
            opacity 0.26s ease-out;
          transform-style: preserve-3d;
          opacity: 1;
        }
        .key,
        .keypad__base {
          transition: translate 0.26s ease-out;
        }
        .key {
          position: absolute;
          transform-style: preserve-3d;
          border: 0;
          background: transparent;
          padding: 0;
          cursor: pointer;
          outline: none;
          color: hsl(210 80% 95%);
        }
        .key .key__content {
          width: 100%;
          height: 100%;
          display: inline-block;
          transition: translate 0.12s ease-out;
          position: relative;
          container-type: inline-size;
        }
        .key img {
          width: 100%;
          height: auto;
          display: block;
          transition: translate 0.12s ease-out;
        }

        /* Tinte de color */
        .key .key__tint {
          position: absolute;
          inset: 0;
          background: var(--key-color);
          mix-blend-mode: color;
          pointer-events: none;
        }

        /* Plano centrado (cara superior) */
        .key .key__centerplane {
          position: absolute;
          top: 50%;
          left: 50%;
          width: var(--pw, 70%);
          height: var(--ph, 52%);
          transform:
            translate(calc(-50% + var(--ox, 0%)), calc(-50% + var(--oy, 0%)))
            rotateX(36deg) rotateY(45deg) rotateX(-90deg);
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          will-change: transform;
        }

        .key .key__label {
          font-weight: 800;
          letter-spacing: -0.01em;
          font-size: 11.8cqi;
          line-height: 1.05;
          color: hsl(210 80% 95%);
          white-space: nowrap;
        }
        .key .key__icon { width: 100%; height: 100%; color: hsl(210 80% 95%); }

        /* Hundido al presionar */
        .key[data-pressed="true"] .key__content,
        .key:active .key__content {
          translate: 0 calc(var(--travel, 20) * 1%);
        }

        /* Geometrías/máscaras */
        .keypad__single {
          width: 40.5%;
          left: 54%;
          bottom: 36%;
          height: 46%;
          clip-path: polygon(
            0 0,
            54% 0,
            89% 24%,
            100% 70%,
            54% 100%,
            46% 100%,
            0 69%,
            12% 23%,
            47% 0%
          );
          -webkit-mask: url(https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86)
            50% 50% / 100% 100%;
          mask: url(https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86)
            50% 50% / 100% 100%;
        }
        .keypad__single--left {
          left: 29.3%;
          bottom: 54.2%;
        }
        .keypad__double {
          width: 64%;
          height: 65%;
          left: 6%;
          bottom: 17.85%;
          clip-path: polygon(
            34% 0,
            93% 44%,
            101% 78%,
            71% 100%,
            66% 100%,
            0 52%,
            0 44%,
            7% 17%,
            30% 0
          );
          -webkit-mask: url(https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86)
            50% 50% / 100% 100%;
          mask: url(https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86)
            50% 50% / 100% 100%;
        }

        @media (max-width: 768px) {
          .keypad { width: min(380px, 92vw); }
        }
      `}</style>
    </section>
  );
}
