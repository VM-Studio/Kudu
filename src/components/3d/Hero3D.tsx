"use client";

import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";
import { Outfit } from "next/font/google"; // 👈 Fuente para títulos

export default function Hero3D() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 pt-12 pb-10 grid gap-8 md:gap-12 md:grid-cols-2">
        {/* 1) TÍTULO — CENTRADO A NIVEL PÁGINA (ocupa las 2 columnas) */}
        <div className="w-full md:col-span-2 flex justify-center">
          <h1 className="text-center text-[clamp(36px,5.5vw,866px)] font-extrabold leading-[1.05] tracking-[-0.01em] text-[#233265]">
            Electrodomésticoss
          </h1>
        </div>

        {/* 2) IZQUIERDA — Tarjeta 3D */}
        <div className="md:col-start-1 md:col-end-2 md:row-start-2 md:row-end-3">
          <div className="h-[320px] md:h-[360px] rounded-[28px] md:rounded-[36px] bg-gradient-to-br from-white to-[#233265]/25 ring-1 ring-black/5 shadow-[0_28px_70px_-25px_rgba(35,50,101,0.45)]">
            <Suspense fallback={<div className="h-full" />}>
              <Canvas camera={{ position: [0, 0, 5], fov: 48 }}>
                <ambientLight intensity={0.55} />
                <directionalLight position={[3, 3, 5]} intensity={0.75} />
                <Html center>
                  <div className="select-none pointer-events-none">
                    <h2 className="font-extrabold tracking-tight text-[#233265] leading-none whitespace-nowrap text-[clamp(72px,9vw,180px)]">
                      <motion.span
                        className="relative inline-block align-middle"
                        style={{ transformStyle: "preserve-3d" }}
                        animate={{ rotateY: 360 }}
                        transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                      >
                        <span className="block" style={{ backfaceVisibility: "hidden" }}>K</span>
                        <span className="block absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                          K
                        </span>
                      </motion.span>
                      <span className="align-middle">UDU</span>
                    </h2>
                  </div>
                </Html>
              </Canvas>
            </Suspense>
          </div>
        </div>

        {/* 3) DERECHA — Subtítulo + botones + orbes */}
        <div className="md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 mx-auto md:mx-0 max-w-2xl flex flex-col justify-start text-center md:text-left">
          <p className="text-[clamp(16px,2.2vw,18px)] text-zinc-600 leading-relaxed">
            Extractores, campanas, purificadores y anafes con performance y estética elegante.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
            <a
              href="https://wa.me/XXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#233265] text-white text-[15px] font-medium shadow-[0_10px_30px_-12px_rgba(35,50,101,0.35)] hover:bg-[#1e2a57] transition"
              aria-label="Contactar por WhatsApp"
            >
              <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                <path d="M19.11 17.2c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.27-.74.91-.91 1.1-.17.18-.34.21-.62.07-.28-.14-1.2-.44-2.3-1.4-.85-.75-1.42-1.67-1.59-1.95-.17-.27-.02-.42.13-.57.14-.14.32-.37.48-.55.16-.18.21-.3.32-.5.11-.2.06-.36-.03-.5-.1-.14-.64-1.53-.88-2.09-.23-.56-.47-.48-.64-.49l-.55-.01c-.2 0-.5.07-.76.36s-1 1-1 2.42 1.02 2.8 1.16 2.99c.14.19 2.01 3.06 4.88 4.29.68.29 1.2.46 1.61.58.68.22 1.3.19 1.79.12.55-.08 1.66-.68 1.9-1.34.24-.66.24-1.22.17-1.34-.07-.12-.25-.19-.53-.33zM26.67 5.33A13.3 13.3 0 0 0 16 1.33 13.34 13.34 0 0 0 2.67 14.69c0 2.36.63 4.17 1.71 5.96L2 30.67l10.27-2.69c1.74.64 3.36.98 5.06.98A13.33 13.33 0 0 0 30.67 16c0-3.56-1.38-6.9-4-9.33zM16 27.47c-1.56 0-3.09-.33-4.53-.93l-.33-.14-6.09 1.6 1.62-5.93-.17-.31a11.53 11.53 0 1 1 9.5 5.71z"/>
              </svg>
              WhatsApp
            </a>

            <a
              href="/catalogo"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#233265] text-white text-[15px] font-medium shadow-[0_10px_30px_-12px_rgba(35,50,101,0.35)] hover:bg-[#1e2a57] transition"
            >
              Ver catálogo
            </a>
          </div>

          {/* ORBES decorativos — una sola fila, debajo de los botones */}
          <div className="mt-6 md:mt-8">
            <div className="w-full">
              <div className="flex items-start justify-between gap-2 sm:gap-4">
                {/* EXTRACTORES */}
                <figure className="group flex flex-col items-center text-center w-16 sm:w-20">
                  <div
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full ring-1 ring-white/50 overflow-hidden shadow-[0_30px_50px_-24px_rgba(0,0,0,.35)] backdrop-blur-md animate-[float_6s_ease-in-out_infinite]"
                    style={{ background: "radial-gradient(120% 120% at 30% 25%,rgba(255,255,255,.9) 0%,rgba(255,255,255,.6) 35%,rgba(19,36,75,.25) 70%,rgba(19,36,75,.6) 100%)" }}
                  >
                    <div className="absolute -top-2 left-2 h-5 w-9 sm:h-8 sm:w-16 rounded-full bg-white/60 blur-xl" />
                    <div className="absolute right-3 bottom-3 h-1.5 w-1.5 rounded-full bg-white/70 blur-[2px]" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30" />
                    <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto h-8 w-8 sm:h-14 sm:w-14 drop-shadow">
                      <defs>
                        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="white" stopOpacity=".95" />
                          <stop offset="1" stopColor="#cfd8ea" stopOpacity=".9" />
                        </linearGradient>
                      </defs>
                      <circle cx="32" cy="32" r="4.5" fill="#102347" opacity=".95" />
                      <path d="M32 12c4 0 8 3 8 7 0 2-1 4-3 6-2 2-5 3-5 3s-1-3-3-5c-2-2-4-3-6-3-4 0-7-4-7-8 0-3 3-6 7-6 3 0 6 2 9 6Z" fill="url(#g1)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <path d="M52 32c0 4-3 8-7 8-2 0-4-1-6-3-2-2-3-5-3-5s3-1 5-3c2-2 3-4 3-6 0-4 4-7 8-7 3 0 6 3 6 7 0 3-2 6-6 9Z" fill="url(#g1)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <path d="M32 52c-4 0-8-3-8-7 0-2 1-4 3-6 2-2 5-3 5-3s1 3 3 5c2 2 4 3 6 3 4 0 7 4 7 8 0 3-3 6-7 6-3 0-6-2-9-6Z" fill="url(#g1)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <path d="M12 32c0-4 3-8 7-8 2 0 4 1 6 3 2 2 3 5 3 5s-3 1-5 3c-2 2-3 4-3 6 0 4-4 7-8 7-3 0-6-3-6-7 0-3 2-6 6-9Z" fill="url(#g1)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                    </svg>
                  </div>
                  <figcaption className="mt-1 text-[11px] sm:text-xs font-semibold text-[#102347]">Extractores</figcaption>
                  <div className="mt-1 h-[6px] w-12 sm:w-16 rounded-full bg-black/10 blur-[5px]" />
                </figure>

                {/* CAMPANAS */}
                <figure className="group flex flex-col items-center text-center w-16 sm:w-20">
                  <div
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full ring-1 ring-white/50 overflow-hidden shadow-[0_30px_50px_-24px_rgba(0,0,0,.35)] backdrop-blur-md animate-[float_6s_ease-in-out_infinite]"
                    style={{ background: "radial-gradient(120% 120% at 30% 25%,rgba(255,255,255,.9) 0%,rgba(255,255,255,.6) 35%,rgba(19,36,75,.25) 70%,rgba(19,36,75,.6) 100%)" }}
                  >
                    <div className="absolute -top-2 left-2 h-5 w-9 sm:h-8 sm:w-16 rounded-full bg-white/60 blur-xl" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30" />
                    <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto h-8 w-8 sm:h-14 sm:w-14 drop-shadow">
                      <defs>
                        <linearGradient id="g2" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="white" stopOpacity=".95" />
                          <stop offset="1" stopColor="#cfd8ea" stopOpacity=".9" />
                        </linearGradient>
                      </defs>
                      <rect x="28" y="12" width="8" height="12" rx="1.5" fill="url(#g2)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <path d="M16 26h32v14a6 6 0 0 1-6 6H22a6 6 0 0 1-6-6V26Z" fill="url(#g2)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <path d="M24 44v6M32 44v6M40 44v6" stroke="#102347" strokeWidth="2" strokeLinecap="round" opacity=".9" />
                    </svg>
                  </div>
                  <figcaption className="mt-1 text-[11px] sm:text-xs font-semibold text-[#102347]">Campanas</figcaption>
                  <div className="mt-1 h-[6px] w-12 sm:w-16 rounded-full bg-black/10 blur-[5px]" />
                </figure>

                {/* PURIFICADORES */}
                <figure className="group flex flex-col items-center text-center w-16 sm:w-20">
                  <div
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full ring-1 ring-white/50 overflow-hidden shadow-[0_30px_50px_-24px_rgba(0,0,0,.35)] backdrop-blur-md animate-[float_6s_ease-in-out_infinite]"
                    style={{ background: "radial-gradient(120% 120% at 30% 25%,rgba(255,255,255,.9) 0%,rgba(255,255,255,.6) 35%,rgba(19,36,75,.25) 70%,rgba(19,36,75,.6) 100%)" }}
                  >
                    <div className="absolute -top-2 left-2 h-5 w-9 sm:h-8 sm:w-16 rounded-full bg-white/60 blur-xl" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30" />
                    <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto h-8 w-8 sm:h-14 sm:w-14 drop-shadow">
                      <defs>
                        <linearGradient id="g3" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="white" stopOpacity=".95" />
                          <stop offset="1" stopColor="#cfd8ea" stopOpacity=".9" />
                        </linearGradient>
                      </defs>
                      <rect x="16" y="20" width="32" height="6" rx="2.5" fill="url(#g3)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <rect x="16" y="30" width="32" height="6" rx="2.5" fill="url(#g3)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <rect x="16" y="40" width="32" height="6" rx="2.5" fill="url(#g3)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <circle cx="22" cy="17" r="1.4" fill="#102347" opacity=".9" />
                      <circle cx="42" cy="17" r="1.2" fill="#102347" opacity=".8" />
                      <circle cx="32" cy="52" r="1.2" fill="#102347" opacity=".8" />
                    </svg>
                  </div>
                  <figcaption className="mt-1 text-[11px] sm:text-xs font-semibold text-[#102347]">Purificadores</figcaption>
                  <div className="mt-1 h-[6px] w-12 sm:w-16 rounded-full bg-black/10 blur-[5px]" />
                </figure>

                {/* ANAFES */}
                <figure className="group flex flex-col items-center text-center w-16 sm:w-20">
                  <div
                    className="relative h-16 w-16 sm:h-20 sm:w-20 rounded-full ring-1 ring-white/50 overflow-hidden shadow-[0_30px_50px_-24px_rgba(0,0,0,.35)] backdrop-blur-md animate-[float_6s_ease-in-out_infinite]"
                    style={{ background: "radial-gradient(120% 120% at 30% 25%,rgba(255,255,255,.9) 0%,rgba(255,255,255,.6) 35%,rgba(19,36,75,.25) 70%,rgba(19,36,75,.6) 100%)" }}
                  >
                    <div className="absolute -top-2 left-2 h-5 w-9 sm:h-8 sm:w-16 rounded-full bg-white/60 blur-xl" />
                    <div className="absolute inset-0 rounded-full ring-1 ring-white/30" />
                    <svg viewBox="0 0 64 64" className="absolute inset-0 m-auto h-8 w-8 sm:h-14 sm:w-14 drop-shadow">
                      <defs>
                        <linearGradient id="g4" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="white" stopOpacity=".95" />
                          <stop offset="1" stopColor="#cfd8ea" stopOpacity=".9" />
                        </linearGradient>
                      </defs>
                      <rect x="14" y="16" width="36" height="32" rx="4" fill="url(#g4)" stroke="#102347" strokeWidth="1.5" opacity=".95" />
                      <circle cx="24" cy="24" r="5.5" fill="none" stroke="#102347" strokeWidth="1.8" />
                      <circle cx="40" cy="24" r="5.5" fill="none" stroke="#102347" strokeWidth="1.8" />
                      <circle cx="24" cy="40" r="5.5" fill="none" stroke="#102347" strokeWidth="1.8" />
                      <circle cx="40" cy="40" r="5.5" fill="none" stroke="#102347" strokeWidth="1.8" />
                      <circle cx="52" cy="52" r="3" fill="#102347" opacity=".9" />
                    </svg>
                  </div>
                  <figcaption className="mt-1 text-[11px] sm:text-xs font-semibold text-[#102347]">Anafes</figcaption>
                  <div className="mt-1 h-[6px] w-12 sm:w-16 rounded-full bg-black/10 blur-[5px]" />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes para la animación de flotado */}
      <style jsx global>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
      `}</style>
    </section>
  );
}
