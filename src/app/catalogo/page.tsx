'use client';

import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;     // ruta pública (p. ej. /campana.png)
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
};

const CATEGORIES = ['Todos', 'Extractores', 'Campanas', 'Purificadores', 'Anafes'] as const;
type CategoryFilter = typeof CATEGORIES[number];

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
    return allProducts.filter(p => p.category === filter);
  }, [allProducts, filter]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Título */}
      <h1 className="text-center text-7xl font-extrabold tracking-tight text-slate-900">
        Catálogo
      </h1>

      {/* Barra de filtrado */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold transition",
                active
                  ? "border-[#233265]/20 bg-[#233265] text-white shadow"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              ].join(' ')}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Separador sutil */}
      <div className="mx-auto my-8 h-px max-w-5xl bg-slate-200/70" />

      {/* Grid de productos */}
      {loading ? (
        <p className="text-center text-slate-500">Cargando productos…</p>
      ) : products.length === 0 ? (
        <p className="text-center text-slate-500">No hay productos en esta categoría.</p>
      ) : (
        <section className="grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <article key={p.id} className="flex flex-col items-center">
              {/* Imagen en caja blanca como tu referencia */}
              <div className="rounded-xl bg-white p-6 shadow-[0_6px_24px_rgba(2,6,23,0.06)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="mx-auto h-40 w-auto object-contain"
                />
              </div>

              {/* Nombre + descripción */}
              <h3 className="mt-5 text-center text-xl font-extrabold tracking-tight text-slate-900">
                {p.name.toUpperCase()}
              </h3>
              <p className="mt-2 max-w-xs text-center text-sm leading-5 text-slate-600">
                {p.description}
              </p>

              {/* “Precio” de la maqueta → reemplazado por pill con el nombre */}
              <div className="mt-3">
                <span className="inline-block rounded-full bg-[#233265]/10 px-4 py-2 text-base font-extrabold text-[#233265]">
                  {p.name}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
