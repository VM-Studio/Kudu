// src/components/sections/ShowcaseQuad.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

type Props = {
  // Arriba-izquierda (producto)
  productTitle: string;
  productDescription: string;
  productCtaLabel?: string;
  productHref: string;

  // Arriba-derecha (imagen del producto)
  productImageSrc: string;
  productImageAlt?: string;

  // Abajo-izquierda (lifestyle)
  lifestyleImageSrc: string;
  lifestyleImageAlt?: string;

  // Abajo-derecha (info marca)
  brandKicker?: string; // ej: "Calidad KUDU"
  brandTitle: string;
  brandDescription: string;
  brandCtaLabel?: string;
  catalogHref: string;
};

export default function ShowcaseQuad({
  productTitle,
  productDescription,
  productCtaLabel = "Ver detalle",
  productHref,
  productImageSrc,
  productImageAlt = "",
  lifestyleImageSrc,
  lifestyleImageAlt = "",
  brandKicker = "Calidad KUDU",
  brandTitle,
  brandDescription,
  brandCtaLabel = "Ver catálogo",
  catalogHref,
}: Props) {
  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-6 pt-2 md:pt-3 pb-8 md:pb-10 text-slate-900">
      {/* ==== DECORACIÓN DE FONDO (mesh + dotted + viñeta) ==== */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        {/* mesh gradient */}
        <div className="absolute -top-40 -left-32 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,#9fb1be_0%,transparent_70%)] opacity-40 blur-2xl" />
        <div className="absolute -bottom-56 -right-24 h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(closest-side,#d5e0e7_0%,transparent_70%)] opacity-60 blur-3xl" />
        {/* dotted grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#c9d6df_1px,transparent_1.5px)] bg-[length:22px_22px] opacity-30" />
        {/* vignette suave */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/70" />
      </div>

      {/* marco suave del bloque */}
      <div className="rounded-3xl bg-[#647a8b]/5 p-2 md:p-3 ring-1 ring-slate-200/60 backdrop-blur-[2px]">
        {/* GRID 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
         {/* 3) Abajo-izquierda: lifestyle */}
         <figure className="relative overflow-hidden rounded-3xl ring-1 ring-slate-200/70 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)]">
            <div className="relative aspect-[4/3]">
              <Image
                src={lifestyleImageSrc}
                alt={lifestyleImageAlt}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <figcaption className="absolute left-4 top-4 rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-slate-700 backdrop-blur-md ring-1 ring-white/60">
              Hecho para tu cocina
            </figcaption>
          </figure>

          {/* 4) Abajo-derecha: info marca + CTA catálogo */}
          <section className="relative rounded-3xl bg-white/70 ring-1 ring-slate-200/70 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] p-6 md:p-8 flex flex-col">
            <p className="text-sm font-medium text-[#647a8b]">{brandKicker}</p>
            <h4 className="mt-1 text-3xl md:text-4xl font-extrabold tracking-tight">
              {brandTitle}
            </h4>
            <p className="mt-3 text-slate-600 leading-relaxed">
              {brandDescription}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link
                href={catalogHref}
                className="rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-[#647a8b] hover:bg-[#5a7080] transition shadow-md"
              >
                {brandCtaLabel}
              </Link>
              <span className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 ring-1 ring-slate-200">
                <span className="grid place-items-center size-5 rounded-full ring-1 ring-slate-300">✓</span>
                Garantía oficial
              </span>
            </div>

            {/* acento decorativo */}
            <div className="pointer-events-none absolute -right-8 -bottom-8 h-40 w-40 rounded-full bg-[radial-gradient(closest-side,#647a8b_0%,transparent_70%)] opacity-15 blur-2xl" />
          </section>
         
          {/* 1) Arriba-izquierda: copy del producto */}
          <article className="group rounded-3xl bg-white/70 ring-1 ring-slate-200/70 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] p-6 md:p-8 flex flex-col justify-between">
            <div className="max-w-prose">
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                {productTitle}
              </h3>
              <p className="mt-3 text-slate-600 leading-relaxed">
                {productDescription}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-4">
              <Link
                href={productHref}
                className="inline-flex items-center justify-center rounded-2xl px-5 py-3 text-sm font-semibold text-white bg-[#647a8b] hover:bg-[#5a7080] transition shadow-md"
              >
                {productCtaLabel}
              </Link>
              {/* mini-marca */}
              <div className="inline-flex items-center gap-2 text-sm text-slate-500">
                <span className="size-2 rounded-full bg-[#647a8b]" />
                KUDU
              </div>
            </div>
          </article>

          {/* 2) Arriba-derecha: imagen del producto */}
          <figure className="relative overflow-hidden rounded-3xl bg-white/60 ring-1 ring-slate-200/70 backdrop-blur-md shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] p-4 md:p-6">
            <div className="relative aspect-[4/3] md:aspect-[3/2]">
              <Image
                src={productImageSrc}
                alt={productImageAlt}
                fill
                priority
                className="object-contain drop-shadow-[0_25px_30px_rgba(0,0,0,0.15)] transition-transform duration-300 will-change-transform"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            {/* acento de luz */}
            <div className="pointer-events-none absolute inset-x-8 bottom-6 h-24 rounded-full bg-gradient-to-t from-[#647a8b]/10 to-transparent blur-2xl" />
          </figure>

          
        </div>
      </div>
    </section>
  );
}
