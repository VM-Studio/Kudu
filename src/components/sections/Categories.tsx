"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Extractores", href: "/catalogo?cat=Extractores", desc: "Ver productos", image: "/extractores.png" },
  { name: "Campanas", href: "/catalogo?cat=Campanas", desc: "Ver productos", image: "/campana.png" },
  { name: "Purificadores", href: "/catalogo?cat=Purificadores", desc: "Ver productos", image: "/purificador.png" },
  { name: "Anafes", href: "/catalogo?cat=Anafes", desc: "Ver productos", image: "/cat-anafes.jpg" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="mb-6 md:mb-8">
        <motion.h2
          initial={{ y: 8, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="text-left text-[clamp(28px,5.5vw,46px)] font-extrabold leading-[1.05] tracking-[-0.01em] text-[#233265]"
        >
          Descubrí por categorías
        </motion.h2>
      </div>

      {/* 4 por fila en desktop */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <motion.div key={c.name} whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
            <Link
              href={c.href}
              className="
                group relative block
                /* ⬇️ más altas, pero siguen 4 por fila */
                h-[12.75rem] md:h-[13.5rem] lg:h-[14rem]
                overflow-hidden rounded-2xl
                ring-1 ring-black/5
                shadow-[0_22px_60px_-28px_rgba(35,50,101,0.35)]
              "
            >
              {/* fondo */}
              <span
                className="absolute inset-0 bg-center bg-cover transition-transform duration-500 group-hover:scale-[1.04]"
                style={{ backgroundImage: `url(${c.image})` }}
                aria-hidden="true"
              />
              {/* overlay de legibilidad */}
              <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" aria-hidden="true" />

              {/* contenido */}
              <div className="relative z-10 p-6 md:p-7 flex flex-col justify-end h-full">
                <div className="text-white drop-shadow-md text-lg font-semibold">{c.name}</div>
                <div className="mt-1 text-white/80 drop-shadow-sm text-sm">{c.desc}</div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
