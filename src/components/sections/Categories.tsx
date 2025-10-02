"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const categories = [
  { name: "Extractores", href: "/catalogo?cat=Extractores", desc: "Ver productos" },
  { name: "Campanas", href: "/catalogo?cat=Campanas", desc: "Ver productos" },
  { name: "Purificadores", href: "/catalogo?cat=Purificadores", desc: "Ver productos" },
  { name: "Anafes", href: "/catalogo?cat=Anafes", desc: "Ver productos" },
];

export default function Categories() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      
        {/* Heading limpio, sin contorno */}
{/* Heading alineado a la izquierda, sin contorno */}
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


     

      {/* Grid de tarjetas elegantes */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((c) => (
          <motion.div
            key={c.name}
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
          >
            <Link
              href={c.href}
              className="
                group block h-full
                rounded-2xl
                bg-[radial-gradient(120%_120%_at_0%_0%,rgba(35,50,101,0.06),white)]
                ring-1 ring-black/5
                shadow-[0_22px_60px_-28px_rgba(35,50,101,0.35)]
                p-6
              "
            >
              {/* top line azul muy sutil */}
              <div className="h-1 w-12 rounded-full bg-[#233265]/60 group-hover:bg-[#233265] transition-colors" />
              <div className="mt-4 text-lg font-semibold text-[#0f172a]">{c.name}</div>
              <div className="mt-1 text-sm text-zinc-600">{c.desc}</div>

              {/* ring al hover (elegante) */}
              <div
                className="pointer-events-none rounded-2xl ring-2 ring-transparent group-hover:ring-[#233265]/30 transition-all mt-6"
              />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
