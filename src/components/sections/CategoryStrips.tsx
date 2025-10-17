"use client";

import Image from "next/image";
import Link from "next/link";
import { Montserrat_Alternates } from "next/font/google";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

type CatItem = {
  key: "extractores" | "campanas" | "purificadores" | "anafes";
  title: string;
  img: string;   // ruta en /public
  href: string;
};

const CATEGORIES: CatItem[] = [
  { key: "extractores",   title: "Extractores",   img: "/extractores.png",  href: "/catalogo?cat=extractores" },
  { key: "campanas",      title: "Campanas",      img: "/campana.png",      href: "/catalogo?cat=campanas" },
  { key: "purificadores", title: "Purificadores", img: "/purificador.png",  href: "/catalogo?cat=purificadores" },
  { key: "anafes",        title: "Anafes",        img: "/anafes.png",       href: "/catalogo?cat=anafes" },
];

export default function CategoryStrips() {
  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      {/* ↑↑ Un poco más de padding vertical */}
      <div className="mx-auto max-w-none px-2 sm:px-3 md:px-4 py-6 md:py-10">
        <h2
          className={`${montAlt.className} text-center text-black tracking-tight
                      text-5xl sm:text-3xl md:text-4xl mb-6 md:mb-8`}
        >
          Todas nuestras categorías
        </h2>

        {/* GRID de “botones” sin tarjeta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={c.href}
              className="
                group inline-flex items-center
                gap-1 md:gap-2.5
                h-20 md:h-24 lg:h-28
                px-2.5 md:px-3 rounded-md
                bg-transparent border-0 shadow-none
                transition hover:opacity-95
                focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40
              "
              aria-label={`Ver productos de ${c.title}`}
            >
              {/* Imagen a la izquierda */}
              <span className="relative shrink-0 w-24 h-20 md:w-28 md:h-24 lg:w-32 lg:h-28">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="(min-width:1024px) 25vw, 50vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.06] group-hover:translate-x-0.5"
                />
              </span>

              {/* Texto a la derecha (sin truncar) */}
              <span className="flex-1 min-w-0 pr-2">
                <span
                  className={`${montAlt.className} block text-zinc-900 font-extrabold
                              leading-tight whitespace-normal
                              text-xl md:text-2xl tracking-tight`}
                >
                  {c.title}
                </span>
                <span className="text-sm md:text-base text-zinc-500 group-hover:text-zinc-700 transition">
                  Ver productos →
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
