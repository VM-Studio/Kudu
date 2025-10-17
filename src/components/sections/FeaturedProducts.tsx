"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Montserrat_Alternates } from "next/font/google";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

type Item = { href: string; src: string; alt: string; title: string };

export default function FeaturedProducts() {
  // 6 tarjetas (asegurate de tener las imágenes en /public/productos/)
  const allItems: Item[] = useMemo(
    () => [
      { href: "/catalogo/KU-CC60NG", src: "/productos/campana-creta.png", alt: "Campana CRETA 60 cm", title: "Campana CRETA 60 cm (NG)" },
      { href: "/catalogo/KU-CM90SMNG", src: "/productos/campana-rodas.png", alt: "Campana RODAS 90 cm Digital", title: "Campana RODAS 90 cm Digital" },
      { href: "/catalogo/KU.EX4.CR", src: "/productos/extractor-4-cromado.png", alt: 'Extractor de Aire 4" Cromado / Grafito / Cobre', title: 'Extractor de Aire 4" Cromado / Grafito / Cobre' },
      { href: "/catalogo/KU-AG01-SS", src: "/productos/anafe-gas.png", alt: "Anafe a Gas 4 Hornallas (Acero Inox.)", title: "Anafe a Gas 4 Hornallas (Acero Inox.)" },
      { href: "/catalogo/KU.PU601.SS", src: "/productos/purificador-acero.png", alt: "Purificador 1 Motor (Acero)", title: "Purificador 1 Motor (Acero)" },
      { href: "/catalogo/KU.EX6.BL", src: "/productos/extractor-6-blanco.png", alt: 'Extractor de Aire 6" Blanco', title: 'Extractor de Aire 6" Blanco' },
    ],
    []
  );

  // Estado del loop
  const [visibleCount, setVisibleCount] = useState(3); // 3 -> 4 -> 5 -> 6 -> reset a 3
  const [offsetPx, setOffsetPx] = useState(0);         // desplazamiento en px del track
  const [resetting, setResetting] = useState(false);   // para que el reset no anime

  // Medimos ancho real de tarjeta + gap para mover EXACTO 1 tarjeta
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [stepPx, setStepPx] = useState(0);

  useEffect(() => {
    function measure() {
      if (!trackRef.current || !cardRef.current) return;
      const styles = getComputedStyle(trackRef.current);
      const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
      const w = cardRef.current.offsetWidth;
      setStepPx(w + gap);
    }
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (cardRef.current) ro.observe(cardRef.current);
    return () => ro.disconnect();
  }, []);

  // Bucle: cada 3s agrega 1 tarjeta y corre 1 paso a la IZQUIERDA; al llegar a 6, resetea suave a 3
  useEffect(() => {
    const TICK = 3000; // ← cambiado a 3 segundos
    const id = setInterval(() => {
      setResetting(false);

      setVisibleCount((v) => {
        if (v < 6) {
          const next = v + 1;
          // ← mover hacia la IZQUIERDA (positivo porque animamos -offsetPx más abajo)
          setOffsetPx((next - 3) * stepPx);
          return next;
        } else {
          // reset suave a 3 y offset 0 (sin animación)
          setTimeout(() => {
            setResetting(true);
            setOffsetPx(0);
            setVisibleCount(3);
            requestAnimationFrame(() => setResetting(false));
          }, 520);
          return v;
        }
      });
    }, TICK);

    return () => clearInterval(id);
  }, [stepPx]);

  const showing = allItems.slice(0, visibleCount);

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] mt-16 md:mt-16">
      <div className="w-full px-4">
        {/* PANEL (diseño glass) */}
        <div className="mx-auto max-w-[1200px] rounded-[28px] border border-white/20 bg-white/10 backdrop-blur-xl shadow-[0_30px_120px_-35px_rgba(12,18,28,0.45)] overflow-hidden">
          {/* Header */}
          <div className="relative flex items-center justify-between px-5 md:px-8 py-4">
            <h2 className={`${montAlt.className} text-left text-black font-extrabold tracking-tight text-xl md:text-4xl`}>
              Nuestros productos destacados
            </h2>

            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-[#647a8b] px-4 py-2 text-sm font-semibold shadow hover:bg-white transition"
            >
              Catálogo
            </Link>

            <div className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-white/10 to-transparent" />
          </div>

          {/* Viewport: siempre 3 a la vista */}
          <div className="relative px-4 md:px-8 pb-8 pt-3">
            <div className="absolute inset-0 bg-gradient-to-br from-[#647a8b]/15 via-[#7b8f9f]/12 to-[#8096a8]/15" />

            <div className="relative z-10 overflow-hidden">
              <motion.div
                ref={trackRef}
                className="flex gap-6 md:gap-8"
                animate={{ x: -offsetPx }} // ← animamos el track usando el offset calculado
                transition={{ duration: resetting ? 0 : 0.5, ease: "easeInOut" }}
                style={{ willChange: "transform" }}
              >
                {showing.map((p, idx) => (
                  <div
                    key={`${p.href}-${idx}`}
                    ref={idx === 0 ? cardRef : undefined}
                    className="flex-none w-[300px] md:w-[340px] rounded-3xl border border-white/25 bg-white/10 backdrop-blur-md shadow-[0_24px_80px_-30px_rgba(12,18,28,0.45)] px-6 py-6 md:px-7 md:py-7"
                  >
                    <Link href={p.href} className="grid grid-rows-[1fr_auto] h-full group">
                      <div className="flex items-center justify-center">
                        <Image
                          src={p.src}
                          alt={p.alt}
                          width={420}
                          height={280}
                          className="max-h-56 md:max-h-64 w-auto object-contain drop-shadow"
                          priority={idx === 0}
                        />
                      </div>
                      <div className="mt-5">
                        <h3 className="text-center font-semibold text-base md:text-lg text-black group-hover:underline">
                          {p.title}
                        </h3>
                        <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <p className="mt-3 text-xs md:text-sm text-black/40 text-center">
                          Ver detalle
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="absolute inset-x-0 -bottom-6 h-6 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
