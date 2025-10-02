"use client";

export default function DividerGlow() {
  return (
    // Full-bleed: saca la limitación del contenedor y estira a los bordes del viewport
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-8 pointer-events-none"
      aria-hidden="true"
    >
      {/* línea base (gris) de borde a borde, sin bordes redondeados */}
      <div className="relative h-[3px] w-full bg-[#233265]/25 overflow-visible">
        {/* barra azul sólida, sin halo ni extremos redondeados */}
        <span
          className="
            absolute top-1/2 -translate-y-1/2 left-[-10%] z-10
            h-[3px] w-[12%] bg-[#233265] shadow-[0_0_10px_2px_rgba(35,50,101,.55)]
            kudu-scan
          "
        />
      </div>
    </div>
  );
}
