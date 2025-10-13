'use client';

import Image from 'next/image';
import Link from 'next/link';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'Extractores' | 'Campanas' | 'Purificadores' | 'Anafes';
  gallery?: string[];
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/data/products.json', { cache: 'no-store' });
        const data: Product[] = await res.json();
        const found = data.find((p) => p.id === params.id);
        if (mounted) setProduct(found ?? null);
      } catch (e) {
        console.error(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [params.id]);

  const gallery: string[] = useMemo(() => {
    if (!product) return [];
    if (product.gallery && product.gallery.length) return product.gallery;

    const qp = searchParams?.getAll('imgs') ?? [];
    if (qp.length) {
      const list = qp.flatMap((s) => s.split(',')).map((s) => s.trim()).filter(Boolean);
      if (list.length) return list;
    }
    return [product.image];
  }, [product, searchParams]);

  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => { setActiveIdx(0); }, [gallery.join('|')]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12">
        <p className="text-center text-slate-500">Cargando producto…</p>
      </div>
    );
  }
  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      {/* migas */}
      <nav className="mb-6 text-sm text-slate-500">
        <Link href="/" className="hover:underline">Inicio</Link>
        <span className="px-2">/</span>
        <Link href="/catalogo" className="hover:underline">Catálogo</Link>
        <span className="px-2">/</span>
        <span className="text-slate-700 font-medium">{product!.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Galería */}
        <section>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-white ring-1 ring-black/5 shadow-[0_14px_60px_-24px_rgba(2,6,23,.18)]">
            <Image
              src={gallery[activeIdx]}
              alt={`${product!.name} - ${activeIdx + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain p-4 md:p-6"
              priority
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-6">
            {gallery.map((src, i) => (
              <button
                key={`${src}-${i}`}
                onClick={() => setActiveIdx(i)}
                className={[
                  'relative aspect-square overflow-hidden rounded-xl ring-1 ring-black/5 bg-white',
                  i === activeIdx ? 'outline outline-2 outline-[#233265]' : 'hover:ring-black/10',
                ].join(' ')}
                aria-label={`Ver imagen ${i + 1}`}
              >
                <Image src={src} alt={`${product!.name} ${i + 1}`} fill className="object-contain p-1.5" sizes="120px" />
              </button>
            ))}
          </div>
        </section>

        {/* Info */}
        <section className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight text-slate-900">{product!.name}</h1>
          <p className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 w-max">
            {product!.category}
          </p>

          <p className="mt-6 text-slate-600 leading-relaxed text-base md:text-lg">{product!.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://wa.me/XXXXXXXXXXXX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-xl bg-[#233265] px-4 py-2.5 text-white font-semibold shadow hover:bg-[#1b244b] transition"
            >
              Consultar por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-slate-800 font-semibold bg-white hover:bg-slate-50 transition"
            >
              Volver al catálogo
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
