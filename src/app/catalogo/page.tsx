'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;  // ruta pública
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
  gallery?: string[]; // opcional: si existe, la pasamos al detail por query (?imgs=…)
};

const CATEGORIES = ['Todos', 'Extractores', 'Campanas', 'Purificadores', 'Anafes'] as const;
type CategoryFilter = typeof CATEGORIES[number];

/** Arma el href al detail. Si hay galería, arma ?imgs=… (uno por param). */
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
        {/* Título */}
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-black tracking-tight text-zinc-900 md:text-6xl">
            Nuestro Catálogo
          </h1>
          <p className="text-zinc-600">Elegí una categoría para filtrar los productos.</p>
        </div>

        {/* Segmented control */}
        <div className="mt-10">
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

        {/* Separador */}
        <div className="mx-auto mt-10 h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />

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

                      {/* “Pill” clickable con el nombre */}
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
