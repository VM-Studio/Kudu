"use client";

export default function DividerGlow() {
  return (
    // Full-bleed, sin padding vertical ni margen extra
    <div
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-0 my-0 z-0"
      aria-hidden="true"
    >
      {/* línea base */}
      <div className="relative h-[3px] w-full bg-[#63798a]/25 overflow-visible">
        {/* barra azul animada */}
        <span
          className="
            absolute top-1/2 -translate-y-1/2 left-[-10%]
            h-[3px] w-[12%] bg-[#63798a]
            shadow-[0_0_10px_2px_rgba(35,50,101,.55)]
            kudu-scan z-0
          "
        />
      </div>
    </div>
  );
}
