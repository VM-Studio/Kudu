'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;

    // Honeypot anti-spam (campo oculto)
    const hp = (form.elements.namedItem('website') as HTMLInputElement).value;
    if (hp) return; // bot detectado: no envía

    const nombre = (form.elements.namedItem('nombre') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const telefono = (form.elements.namedItem('telefono') as HTMLInputElement).value.trim();
    const asunto = (form.elements.namedItem('asunto') as HTMLInputElement).value.trim();
    const mensaje = (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value.trim();

    if (!nombre || !email || !mensaje) {
      setError('Completá nombre, email y tu consulta.');
      return;
    }

    setLoading(true);
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

      // Estos nombres deben coincidir con las variables de tu Template en EmailJS
      await emailjs.send(
        serviceId,
        templateId,
        {
          title: asunto || 'Consulta',
          name: nombre,
          email: email,
          message: `${mensaje}${telefono ? `\n\nTeléfono: ${telefono}` : ''}`,
        },
        { publicKey }
      );

      router.push('/contacto/agradecimiento');
    } catch (err) {
      console.error('EmailJS error', err);
      setError('No se pudo enviar el formulario. Probá nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">Contacto</h1>
      <p className="mt-3 text-slate-600">
        Dejanos tu consulta y te respondemos a la brevedad.
      </p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        {/* Honeypot (oculto) */}
        <input type="text" name="website" aria-hidden="true" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="grid gap-2">
          <label htmlFor="nombre" className="font-medium text-slate-800">Nombre y apellido *</label>
          <input id="nombre" name="nombre" required className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:ring-2 focus:ring-slate-400/40" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="email" className="font-medium text-slate-800">Email *</label>
          <input id="email" name="email" type="email" required className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:ring-2 focus:ring-slate-400/40" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="telefono" className="font-medium text-slate-800">Teléfono (opcional)</label>
          <input id="telefono" name="telefono" className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:ring-2 focus:ring-slate-400/40" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="asunto" className="font-medium text-slate-800">Asunto</label>
          <input id="asunto" name="asunto" className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:ring-2 focus:ring-slate-400/40" placeholder="Consulta por producto / proyecto" />
        </div>

        <div className="grid gap-2">
          <label htmlFor="mensaje" className="font-medium text-slate-800">Mensaje *</label>
          <textarea id="mensaje" name="mensaje" rows={6} required className="rounded-2xl border border-slate-200 px-4 py-3 shadow-sm focus:ring-2 focus:ring-slate-400/40" placeholder="Contanos en qué podemos ayudarte…" />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-2xl bg-[#233265] px-6 py-3 font-semibold text-white shadow-md transition hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Enviando…' : 'Enviar formulario'}
        </button>

        <p className="text-xs text-slate-500">* Campos obligatorios.</p>
      </form>
    </main>
  );
}
