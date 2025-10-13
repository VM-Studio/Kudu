'use client';
import Image from 'next/image';

export default function HeroInicio() {
  return (
    // Full-bleed; -mt-px pega la imagen al divider evitando hueco por redondeo
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] -mt-px z-[1]">
      <div className="relative h-[46vh] sm:h-[56vh] md:h-[64vh] lg:h-[72vh]">
        <Image
          src="/kuduInicio.png"
          alt="KUDU"
          fill
          priority
          sizes="100vw"
          quality={100}
          className="object-cover object-center select-none"
        />
      </div>
    </section>
  );
}
