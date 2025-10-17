'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;  // ruta pública
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
  gallery?: string[];
};

const CATEGORIES = ['Todos', 'Extractores', 'Campanas', 'Purificadores', 'Anafes'] as const;
type CategoryFilter = typeof CATEGORIES[number];

function buildProductHref(p: Product) {
  if (p.gallery && p.gallery.length) {
    const params = new URLSearchParams();
    for (const src of p.gallery) params.append('imgs', src);
    return `/catalogo/${encodeURIComponent(p.id)}?${params.toString()}`;
  }
  return `/catalogo/${encodeURIComponent(p.id)}`;
}

export default function CatalogoPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState<CategoryFilter>('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/data/products.json', { cache: 'no-store' });
        const data: Product[] = await res.json();
        if (mounted) setAllProducts(data);
      } catch (e) {
        console.error('No se pudieron cargar los productos', e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const products = useMemo(() => {
    if (filter === 'Todos') return allProducts;
    return allProducts.filter((p) => p.category === filter);
  }, [allProducts, filter]);

  const activeIndex = CATEGORIES.indexOf(filter);

  return (
    <div className="min-h-[55vh] w-full bg-white">
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
        {/* Header centrado (solo título + subtítulo) */}
        <div className="mb-2 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900">
            Nuestro Catálogo
          </h1>
          <p className="mt-2 text-zinc-600">
            Elegí una categoría para filtrar los productos.
          </p>
        </div>

        {/* Segmented control */}
        <div className="mt-8">
          <div className="relative mx-auto w-full max-w-3xl rounded-2xl bg-zinc-50 p-1.5 ring-1 ring-zinc-200">
            <div
              className="absolute top-1 left-1 h-[44px] rounded-xl bg-[#586c7a] shadow-sm transition-transform duration-300 ease-out"
              style={{ width: 'calc(20% - 4px)', transform: `translateX(${activeIndex * 100}%)` }}
            />
            <div className="relative grid grid-cols-5 gap-1">
              {CATEGORIES.map((cat) => {
                const active = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={[
                      'z-10 flex h-11 items-center justify-center rounded-xl text-sm font-semibold transition',
                      active ? 'text-white' : 'text-black',
                    ].join(' ')}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Banner de descarga ALARGADO debajo del filtro */}
        <div className="mx-auto mt-8 w-full max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 rounded-3xl border border-zinc-200 bg-white px-5 py-4 shadow-[0_8px_28px_-16px_rgba(2,6,23,0.12)]">
            {/* Info izquierda */}
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                Vigente
              </span>
              <div className="flex flex-col">
                <span className="text-base md:text-lg font-semibold text-[#233265] leading-tight">
                  Catálogo completo
                </span>
                <span className="text-sm text-zinc-500">
                  PDF actualizado — todos los productos
                </span>
              </div>
            </div>

            {/* Botón derecha */}
            <a
              href="/catalogo.pdf"   // ← ajustá el nombre si es distinto
              download
              className="inline-flex items-center gap-2 rounded-xl bg-[#63798a]/10 px-5 py-3 text-[#63798a] font-semibold hover:bg-[#63798a] hover:text-white transition"
              aria-label="Descargar catálogo en PDF"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-5 w-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16" />
              </svg>
              Descargar PDF
            </a>
          </div>
        </div>

        {/* Separador */}
        <div className="mx-auto mt-8 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

        {/* Grid de productos */}
        <div className="mt-10">
          {loading ? (
            <p className="text-center text-slate-500">Cargando productos…</p>
          ) : products.length === 0 ? (
            <p className="text-center text-slate-500">No hay productos en esta categoría.</p>
          ) : (
            <section className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((p) => {
                const href = buildProductHref(p);
                return (
                  <article key={p.id} className="w-full">
                    <div
                      className="
                        mx-auto w-full max-w-[420px]
                        rounded-3xl bg-white/90 ring-1 ring-black/5
                        shadow-[0_14px_60px_-24px_rgba(2,6,23,.18)]
                        p-6 md:p-8
                        h-[520px] md:h-[560px]
                        flex flex-col items-center justify-between
                      "
                    >
                      {/* Imagen clickable */}
                      <Link href={href} className="block w-full">
                        <div
                          className="
                            w-full aspect-[4/3]
                            rounded-2xl bg-white
                            grid place-items-center
                          "
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.image}
                            alt={p.name}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      </Link>

                      {/* Descripción */}
                      <p className="px-2 text-center text-base md:text-lg leading-relaxed text-slate-600 min-h-[72px]">
                        {p.description}
                      </p>

                      {/* Pill con el nombre */}
                      <div className="w-full flex justify-center">
                        <Link href={href} className="inline-flex">
                          <span
                            className="
                              inline-flex items-center justify-center
                              rounded-full bg-[#233265]/10
                              px-5 py-2.5
                              text-lg font-semibold text-[#233265]
                              min-h-[52px]
                              hover:underline
                            "
                          >
                            {p.name}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          )}
        </div>
      </section>
    </div>
  );
}
