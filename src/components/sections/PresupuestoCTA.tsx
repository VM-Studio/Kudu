"use client";

import Link from "next/link";

export default function PresupuestoCTA() {
  return (
    <section className="relative w-full mt-20 md:mt-24">
      {/* fondo suave (match con tu estética) */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#647a8b]/5 to-transparent pointer-events-none" />

      <div className="mx-auto w-full max-w-6xl px-4">
        {/* tarjeta glass/gradiente */}
        <div
          className="
            relative overflow-hidden
            rounded-[28px]
            border border-white/20
            bg-gradient-to-tr from-[#647a8b] to-[#8096a8]
            text-white
            shadow-[0_40px_120px_-35px_rgba(12,18,28,0.55)]
          "
        >
          {/* brillos decorativos */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-white/15 blur-2xl" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-white/10" style={{ maskImage: "linear-gradient(to bottom, black, transparent)" }} />

          {/* contenido */}
          <div className="relative px-6 py-10 md:px-12 md:py-14">
            <div className="flex flex-col items-center text-center">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold tracking-wide">
                ¿Necesitás cotización?
              </p>

              <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
                Pedí tu <span className="text-white/90">presupuesto</span> en minutos
              </h2>

              <p className="mt-3 max-w-2xl text-white/85 md:text-lg">
                Contanos qué necesitás y te respondemos a la brevedad. Sin compromiso.
              </p>

              {/* botones */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href="/contacto"
                  className="
                    inline-flex items-center justify-center
                    rounded-xl bg-white text-[#647a8b]
                    px-5 py-3 font-semibold shadow-md
                    hover:bg-white/95 transition
                  "
                >
                  Ir al formulario
                </Link>

                <a
                  href="https://wa.me/XXXXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center justify-center gap-2
                    rounded-xl border border-white/40 bg-white/10
                    px-5 py-3 font-semibold text-white backdrop-blur
                    hover:bg-white/15 transition
                  "
                >
                  <span aria-hidden>💬</span> WhatsApp
                </a>
              </div>
            </div>
          </div>

          {/* base glow */}
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-10 rounded-t-[24px] bg-white/10 blur" />
        </div>
      </div>
    </section>
  );
}
