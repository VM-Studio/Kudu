// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google"; // 👈 Fuente para títulos
import Link from "next/link";
export const metadata: Metadata = {
  title: "KUDU | ELECTRODOMESTICOS",
  description: "Catálogo de extractores, campanas, purificadores y anafes.",
};

// Cargamos Outfit para TITULOS (pesos altos) y la exponemos como variable CSS
const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400","600","700","800","900"], // elegí los que uses
  variable: "--font-montserrat-alt",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      {/* Agregamos la variable de la fuente al body */}
      <body className={`${montAlt.variable} min-h-screen bg-white text-zinc-900`}>
        {/* NAVBAR azul #233265 */}
        <header className="sticky top-0 z-50 bg-[#63798a] shadow-[0_8px_24px_-10px_rgba(35,50,101,0.85)]">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-8">
            {/* Menú (sin ml-auto) */}
            <nav className="flex items-center gap-6 text-sm">
            <Link href="/" className="text-white/90 hover:text-white transition-colors font-bold">
  Inicio
</Link>
              <a href="/catalogo" className="text-white/90 hover:text-white transition-colors font-bold">Catálogo</a>
            
              <a href="/contacto" className="text-white/90 hover:text-white transition-colors font-bold">Contacto</a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* FOOTER azul #233265 */}
        <footer className="mt-20 bg-[#63798a]">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-white/80">
            © {new Date().getFullYear()} KUDU — Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}
