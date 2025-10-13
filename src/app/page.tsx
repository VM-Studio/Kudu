"use client";

import dynamic from "next/dynamic";
import DividerGlow from "@/components/DividerGlow";
import HeroInicio from "@/components/sections/HeroInicio";
import CategoryStrips from "@/components/sections/CategoryStrips";

// Cargamos el Hero 3D sólo en cliente
const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Hero3D />
      
      <CategoryStrips />
      <HeroInicio />
    </div>
  );
}
