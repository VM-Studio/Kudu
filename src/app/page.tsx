// src/app/page.tsx
"use client";

import dynamic from "next/dynamic";
import DividerGlow from "@/components/DividerGlow";
import HeroInicio from "@/components/sections/HeroInicio";
import CategoryStrips from "@/components/sections/CategoryStrips";
import FeaturedProducts from "@/components/sections/FeaturedProducts";
import PresupuestoCTA from "@/components/sections/PresupuestoCTA";

// 🔹 NUEVO: sección 2x2 tipo “cuatro cuadrados”
import ShowcaseQuad from "@/components/sections/ShowcaseQuad";

// Cargamos el Hero 3D sólo en cliente
const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Hero3D />
      <CategoryStrips />

     

      {/* 🔹 Sección 2x2 (igual a la referencia) */}
      <div className="my-16 md:my-24">
        <ShowcaseQuad
          productTitle="Campana RODAS"
          productDescription="Campana de acero inoxidable con 3 velocidades, iluminación LED y filtros metálicos lavables. Silenciosa, potente y de diseño minimalista."
          productCtaLabel="Ver detalle"
          productHref="/catalogo/rodas"

          // Sube estas imágenes a /public/home/...
          productImageSrc="/home/producto-estrella.jpg"
          productImageAlt="Campana RODAS - KUDU"

          lifestyleImageSrc="/home/cocina-lifestyle.jpg"
          lifestyleImageAlt="Cocina moderna con productos KUDU"

          brandKicker="Hecho para tu cocina"
          brandTitle="Diseño, potencia y eficiencia"
          brandDescription="Fabricamos productos confiables con materiales premium y foco en la experiencia diaria: campanas, extractores, purificadores y anafes."
          brandCtaLabel="Ver catálogo"
          catalogHref="/catalogo"
        />
      </div>
      
      <HeroInicio />
      <FeaturedProducts />
      <PresupuestoCTA />
    </div>
  );
}
