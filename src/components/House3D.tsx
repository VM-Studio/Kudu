"use client";

import { useEffect, useRef } from "react";
import { Montserrat_Alternates } from "next/font/google";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
});

export default function Hero3D() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const houseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const house = houseRef.current;
    if (!wrap || !house) return;

    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      house.style.transform = `
        perspective(20000px)
        rotateX(${y * 10 + 75}deg)
        rotateZ(${-x * 10 + 35}deg)
        translateZ(-9vw)
      `;
    };

    wrap.addEventListener("pointermove", onMove);
    return () => wrap.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Fondo existente */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-20"
        style={{
          backgroundImage: "url(/background.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Hero: misma grilla que antes */}
      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10 grid md:grid-cols-2 items-center gap-6 min-h-[56vh] md:min-h-[62vh]">
        {/* Izquierda: KUDU (sin duplicados ni truquitos 3D) */}
        <div className="flex flex-col justify-center md:pr-2 z-0">
          <h1
            className={`${montAlt.className} leading-[0.9] tracking-tight text-[#63798a] text-[clamp(92px,12.5vw,228px)]`}
          >
            KUDU
          </h1>
        </div>

        {/* Derecha: SOLO la casa (sin sombras, vidrio opaco) */}
        <div className="house-hero relative h-[42vh] md:h-[56vh] md:ml-auto md:translate-x-2 z-10">
          <div ref={wrapRef} className="house-wrap">
            <div ref={houseRef} id="h" className="house">
              {/* Sombras desactivadas por CSS override */}
              <div className="shadows">
                <div className="shadow-a" />
                <div className="shadow-b" />
              </div>

              {/* ====== A ====== */}
              <div className="al">
                <div className="al__front face" />
                <div className="al__back face" />
                <div className="al__right face" />
                <div className="al__left face" />
                <div className="al__top face" />
                <div className="al__bottom face" />
              </div>
              <div className="ab">
                <div className="ab__front face" />
                <div className="ab__back face" />
                <div className="ab__right face" />
                <div className="ab__left face" />
                <div className="ab__top face" />
                <div className="ab__bottom face" />
              </div>
              <div className="at">
                <div className="at__front face" />
                <div className="at__back face" />
                <div className="at__right face" />
                <div className="at__left face" />
                <div className="at__top face" />
                <div className="at__bottom face" />
              </div>
              <div className="ac">
                <div className="ac__front face" />
                <div className="ac__back face" />
                <div className="ac__right face" />
                <div className="ac__left face" />
                <div className="ac__top face" />
                <div className="ac__bottom face" />
              </div>

              {/* ====== B ====== */}
              <div className="bce">
                <div className="bce__front face" />
                <div className="bce__back face" />
                <div className="bce__right face" />
                <div className="bce__left face" />
                <div className="bce__top face" />
                <div className="bce__bottom face" />
              </div>
              <div className="bci">
                <div className="bci__front face" />
                <div className="bci__back face" />
                <div className="bci__right face" />
                <div className="bci__left face" />
                <div className="bci__top face" />
                <div className="bci__bottom face" />
              </div>
              <div className="bl">
                <div className="bl__front face" />
                <div className="bl__back face" />
                <div className="bl__right face" />
                <div className="bl__left face" />
                <div className="bl__top face" />
                <div className="bl__bottom face" />
              </div>
              <div className="bt">
                <div className="bt__front face" />
                <div className="bt__back face" />
                <div className="bt__right face" />
                <div className="bt__left face" />
                <div className="bt__top face" />
                <div className="bt__bottom face" />
              </div>
              <div className="bbe">
                <div className="bbe__front face" />
                <div className="bbe__back face" />
                <div className="bbe__right face" />
                <div className="bbe__left face" />
                <div className="bbe__top face" />
                <div className="bbe__bottom face" />
              </div>
              <div className="bbi">
                <div className="bbi__front face" />
                <div className="bbi__back face" />
                <div className="bbi__right face" />
                <div className="bbi__left face" />
                <div className="bbi__top face" />
                <div className="bbi__bottom face" />
              </div>

              {/* ====== C ====== */}
              <div className="cl">
                <div className="cl__front face">
                  <div className="lamp" />
                </div>
                <div className="cl__back face" />
                <div className="cl__right face" />
                <div className="cl__left face" />
                <div className="cl__top face" />
                <div className="cl__bottom face" />
              </div>
              <div className="cc">
                <div className="cc__front face" />
                <div className="cc__back face" />
                <div className="cc__right face" />
                <div className="cc__left face" />
                <div className="cc__top face" />
                <div className="cc__bottom face" />
              </div>
              <div className="ccl">
                <div className="ccl__front face" />
                <div className="ccl__back face" />
                <div className="ccl__right face" />
                <div className="ccl__left face" />
                <div className="ccl__top face" />
                <div className="ccl__bottom face" />
              </div>
              <div className="cml">
                <div className="cml__front face" />
                <div className="cml__back face" />
                <div className="cml__right face" />
                <div className="cml__left face" />
                <div className="cml__top face" />
                <div className="cml__bottom face" />
              </div>
              <div className="cmr">
                <div className="cmr__front face" />
                <div className="cmr__back face" />
                <div className="cmr__right face" />
                <div className="cmr__left face" />
                <div className="cmr__top face" />
                <div className="cmr__bottom face" />
              </div>
              <div className="cmt">
                <div className="cmt__front face" />
                <div className="cmt__back face" />
                <div className="cmt__right face" />
                <div className="cmt__left face" />
                <div className="cmt__top face" />
                <div className="cmt__bottom face" />
              </div>

              {/* ====== D/E/F… ====== */}
              <div className="dl">
                <div className="dl__front face" />
                <div className="dl__back face" />
                <div className="dl__right face" />
                <div className="dl__left face" />
                <div className="dl__top face" />
                <div className="dl__bottom face" />
              </div>
              <div className="dm">
                <div className="dm__front face" />
                <div className="dm__back face" />
                <div className="dm__right face" />
                <div className="dm__left face" />
                <div className="dm__top face" />
                <div className="dm__bottom face" />
              </div>
              <div className="dt">
                <div className="dt__front face" />
                <div className="dt__back face" />
                <div className="dt__right face" />
                <div className="dt__left face" />
                <div className="dt__top face" />
                <div className="dt__bottom face" />
              </div>

              <div className="el"><div className="el__front face" /></div>
              <div className="ec"><div className="ec__front face" /></div>
              <div className="er"><div className="er__right face" /></div>
              <div className="eb"><div className="eb__back face" /></div>

              <div className="fl">
                <div className="fl__front face" />
                <div className="fl__back face" />
                <div className="fl__right face" />
                <div className="fl__left face" />
                <div className="fl__top face" />
                <div className="fl__bottom face" />
              </div>
              <div className="ft">
                <div className="ft__front face" />
                <div className="ft__back face" />
                <div className="ft__right face" />
                <div className="ft__left face" />
                <div className="ft__top face" />
                <div className="ft__bottom face" />
              </div>
              <div className="fb">
                <div className="fb__front face" />
                <div className="fb__back face" />
                <div className="fb__right face" />
                <div className="fb__left face" />
                <div className="fb__top face" />
                <div className="fb__bottom face" />
              </div>

              <div className="table">
                <div className="table__front face" />
                <div className="table__back face" />
                <div className="table__right face" />
                <div className="table__left face" />
                <div className="table__top face" />
                <div className="table__bottom face" />
                <div className="foot">
                  <div className="foot__front face" />
                  <div className="foot__back face" />
                  <div className="foot__right face" />
                  <div className="foot__left face" />
                  <div className="foot__top face" />
                  <div className="foot__bottom face" />
                </div>
                <div className="foot">
                  <div className="foot__front face" />
                  <div className="foot__back face" />
                  <div className="foot__right face" />
                  <div className="foot__left face" />
                  <div className="foot__top face" />
                  <div className="foot__bottom face" />
                </div>
                <div className="foot">
                  <div className="foot__front face" />
                  <div className="foot__back face" />
                  <div className="foot__right face" />
                  <div className="foot__left face" />
                  <div className="foot__top face" />
                  <div className="foot__bottom face" />
                </div>
                <div className="foot">
                  <div className="foot__front face" />
                  <div className="foot__back face" />
                  <div className="foot__right face" />
                  <div className="foot__left face" />
                  <div className="foot__top face" />
                  <div className="foot__bottom face" />
                </div>
              </div>

              <div className="kitchen">
                <div className="kitchen__front face" />
                <div className="kitchen__back face" />
                <div className="kitchen__right face" />
                <div className="kitchen__left face" />
                <div className="kitchen__top face" />
                <div className="kitchen__bottom face" />
              </div>

              <div className="couch">
                <div className="couch__front face" />
                <div className="couch__back face" />
                <div className="couch__right face" />
                <div className="couch__left face" />
                <div className="couch__top face" />
                <div className="couch__bottom face" />
              </div>
              <div className="couchb">
                <div className="couchb__front face" />
                <div className="couchb__back face" />
                <div className="couchb__right face" />
                <div className="couchb__left face" />
                <div className="couchb__top face" />
                <div className="couchb__bottom face" />
              </div>
              <div className="couchc">
                <div className="couchc__front face" />
                <div className="couchc__back face" />
                <div className="couchc__right face" />
                <div className="couchc__left face" />
                <div className="couchc__top face" />
                <div className="couchc__bottom face" />
              </div>
              <div className="couchd">
                <div className="couchd__front face" />
                <div className="couchd__back face" />
                <div className="couchd__right face" />
                <div className="couchd__left face" />
                <div className="couchd__top face" />
                <div className="couchd__bottom face" />
              </div>

              <div className="picture">
                <div className="picture__front face" />
                <div className="picture__back face" />
                <div className="picture__right face" />
                <div className="picture__left face" />
                <div className="picture__top face" />
                <div className="picture__bottom face" />
              </div>

              <div className="door-r">
                <div className="door-r__front face" />
                <div className="door-r__back face" />
                <div className="door-r__right face" />
                <div className="door-r__left face" />
                <div className="door-r__top face" />
                <div className="door-r__bottom face" />
              </div>
              <div className="door-l">
                <div className="door-l__front face" />
                <div className="door-l__back face" />
                <div className="door-l__right face" />
                <div className="door-l__left face" />
                <div className="door-l__top face" />
                <div className="door-l__bottom face" />
              </div>
              <div className="door-b">
                <div className="door-b__front face" />
                <div className="door-b__back face" />
                <div className="door-b__right face" />
                <div className="door-b__left face" />
                <div className="door-b__top face" />
                <div className="door-b__bottom face" />
              </div>
              <div className="door-t">
                <div className="door-t__front face" />
                <div className="door-t__back face" />
                <div className="door-t__right face" />
                <div className="door-t__left face" />
                <div className="door-t__top face" />
                <div className="door-t__bottom face" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overrides para que se vea SOLO la casa (sin sombras/vidrio) */}
      <style jsx>{`
        .house-hero {
          isolation: isolate;
        }
        .house-hero *,
        .house-hero *::before,
        .house-hero *::after {
          box-sizing: border-box;
          user-select: none;
          transform-style: preserve-3d;
          -webkit-tap-highlight-color: transparent;
        }
        .house-hero .face { position: absolute; }

        /* caja donde rotamos con el mouse */
        .house-wrap {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: visible;
        }

        /* colocación igual que el keypad (pegada a la derecha y abajo) */
        .house {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 36vw;
          height: 24vw;
          transition: transform .1s linear;
          pointer-events: none;
        }

        /* 1) SIN CUADRADO/SOMBRAS DETRÁS */
        .house-hero .shadows { display: none !important; }

        /* 2) VIDRIO OPACO (no deja ver KUDU detrás) */
        .house-hero .ac .face,
        .house-hero .ac__top,
        .house-hero .el__front,
        .house-hero .ec__front,
        .house-hero .er__right,
        .house-hero .eb__back {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
