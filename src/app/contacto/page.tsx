'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Montserrat_Alternates } from 'next/font/google';

const montAlt = Montserrat_Alternates({
  subsets: ['latin'],
  weight: ['800'],
  display: 'swap',
});

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
    if (hp) return;

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
    <main className="relative">
      {/* Fondo suave con gradiente y brillo */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#647a8b0f] via-white to-white" />
      <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-[radial-gradient(1200px_120px_at_50%_0%,rgba(128,150,168,0.18),transparent)]" />

      {/* Header centrado */}
      <section className="mx-auto max-w-4xl px-4 pt-10 md:pt-14">
        <h1
          className={`${montAlt.className} text-center text-4xl md:text-5xl font-extrabold tracking-tight text-[#1c212b]`}
        >
          Contacto
        </h1>
        <p className="mt-3 text-center text-slate-600">
          Dejanos tu consulta y te respondemos a la brevedad.
        </p>
      </section>

      {/* Card glass del formulario */}
      <section className="mx-auto max-w-4xl px-4 py-8 md:py-10">
        <div
          className="
            relative overflow-hidden
            rounded-3xl
            border border-white/60
            bg-white/70 backdrop-blur-xl
            shadow-[0_40px_120px_-35px_rgba(12,18,28,0.35)]
          "
        >
          {/* halos suaves */}
          <div className="pointer-events-none absolute -top-16 -left-16 h-40 w-40 rounded-full bg-[#8096a8]/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-16 -right-16 h-44 w-44 rounded-full bg-[#647a8b]/20 blur-2xl" />

          <form onSubmit={onSubmit} className="relative z-10 grid gap-6 p-6 md:p-10">
            {/* Honeypot (oculto) */}
            <input
              type="text"
              name="website"
              aria-hidden="true"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Layout 2 columnas en desktop */}
            <div className="grid gap-6 md:grid-cols-2">
              <Field
                id="nombre"
                name="nombre"
                label="Nombre y apellido *"
                autoComplete="name"
                required
              />
              <Field
                id="email"
                name="email"
                type="email"
                label="Email *"
                autoComplete="email"
                required
              />
              <Field
                id="telefono"
                name="telefono"
                label="Teléfono (opcional)"
                autoComplete="tel"
              />
              <Field
                id="asunto"
                name="asunto"
                label="Asunto"
                placeholder="Consulta por producto / proyecto"
              />
            </div>

            <TextArea
              id="mensaje"
              name="mensaje"
              label="Mensaje *"
              placeholder="Contanos en qué podemos ayudarte…"
              rows={6}
              required
            />

            {error && (
              <p className="text-sm font-medium text-red-600">{error}</p>
            )}

            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={loading}
                className="
                  inline-flex items-center justify-center
                  rounded-2xl bg-[#63798a] px-6 py-3
                  font-semibold text-white
                  shadow-md hover:opacity-90
                  transition disabled:opacity-60
                "
              >
                {loading ? 'Enviando…' : 'Enviar formulario'}
              </button>
              <p className="text-xs text-slate-500">* Campos obligatorios.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

/* ---------------------- UI subcomponents ---------------------- */

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  id: string;
  name: string;
};

function Field({ label, id, name, className = '', ...props }: FieldProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-medium text-slate-800">
        {label}
      </label>
      <input
        id={id}
        name={name}
        className={[
          "rounded-2xl border border-slate-200/80 bg-white/70",
          "px-4 py-3 shadow-sm outline-none",
          "focus:ring-4 focus:ring-[#647a8b]/20 focus:border-[#647a8b]/60",
          "placeholder:text-slate-400",
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  );
}

type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  id: string;
  name: string;
};

function TextArea({ label, id, name, className = '', ...props }: TextAreaProps) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="font-medium text-slate-800">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        className={[
          "rounded-2xl border border-slate-200/80 bg-white/70",
          "px-4 py-3 shadow-sm outline-none",
          "focus:ring-4 focus:ring-[#647a8b]/20 focus:border-[#647a8b]/60",
          "placeholder:text-slate-400",
          className,
        ].join(' ')}
        {...props}
      />
    </div>
  );
}
