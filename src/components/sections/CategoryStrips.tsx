"use client";

import Image from "next/image";
import Link from "next/link";

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
    /* full-bleed real, de borde a borde */
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="mx-auto max-w-none px-2 sm:px-3 md:px-4 py-4 md:py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              href={c.href}
              className="
                group relative isolate overflow-hidden
                h-24 md:h-28 lg:h-32
                rounded-2xl md:rounded-3xl
                bg-white ring-1 ring-black/5
                hover:ring-black/10 hover:shadow-[0_24px_40px_-18px_rgba(2,6,23,.18)]
                transition
                flex items-center
              "
              aria-label={`Ver productos de ${c.title}`}
            >
              {/* IMAGEN ÚNICA, LLENANDO LA TARJETA, CON DESVANECIDO A LA DERECHA */}
              <div className="absolute inset-0 pointer-events-none">
                <Image
                  src={c.img}
                  alt={c.title}
                  fill
                  sizes="100vw"
                  priority={false}
                  className="
                    object-contain object-left p-3 md:p-4
                    [mask-image:linear-gradient(to_right,black_60%,transparent_92%)]
                    [--tw:1]             /* nudge to keep same behavior in Safari/Chrome */
                    [webkit-mask-image:linear-gradient(to_right,black_60%,transparent_92%)]
                  "
                />
              </div>

              {/* CONTENIDO (solo texto), queda por encima; padding a la izquierda para no pisar la imagen */}
              <div className="relative z-10 pl-[44%] sm:pl-[42%] md:pl-[40%] pr-4 md:pr-6">
                <p className="text-zinc-900 font-semibold text-lg md:text-xl tracking-tight">
                  {c.title}
                </p>
              </div>

              {/* Halo sutil al hover */}
              <div
                className="pointer-events-none absolute -z-10 inset-0 opacity-0 group-hover:opacity-100 transition
                           blur-2xl bg-[radial-gradient(40%_80%_at_40%_50%,rgba(11,95,255,.10),rgba(11,95,255,0))]"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
