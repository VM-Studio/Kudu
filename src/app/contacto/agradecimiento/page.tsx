export default function AgradecimientoPage() {
    return (
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
          ¡Gracias por contactarnos!
        </h1>
        <p className="mt-4 text-slate-600">
          Recibimos tu consulta y en breve estaremos atendiéndote.
        </p>
        <div className="mt-8">
          <a
            href="/catalogo"
            className="rounded-2xl border border-slate-200 px-5 py-3 font-medium text-slate-800 shadow-sm hover:bg-slate-50"
          >
            Ver catálogo
          </a>
        </div>
      </main>
    );
  }
  