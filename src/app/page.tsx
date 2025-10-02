"use client";

import dynamic from "next/dynamic";
import Categories from "@/components/sections/Categories";
import DividerGlow from "@/components/DividerGlow";

// Cargamos el Hero 3D sólo en cliente
const Hero3D = dynamic(() => import("@/components/3d/Hero3D"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Hero3D />
      <DividerGlow /> 
      <Categories />
    </div>
  );
}
