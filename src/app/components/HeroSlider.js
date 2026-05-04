"use client";

import { useState, useEffect, useRef } from "react";

export default function HeroSlider({ fotos }) {
  const [aktif, setAktif] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef(null);

  const nextSlide = () => {
    setAktif((prev) => (prev + 1) % fotos.length);
  };

  const prevSlide = () => {
    setAktif((prev) => (prev - 1 + fotos.length) % fotos.length);
  };

  // autoplay lebih "waras"
  useEffect(() => {
    if (fotos.length <= 1 || paused) return;

    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timeoutRef.current);
  }, [aktif, paused, fotos.length]);

  if (!fotos || fotos.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
        <p className="text-slate-500 text-sm">Belum ada foto</p>
      </div>
    );
  }

  const current = fotos[aktif];
  const next = fotos[(aktif + 1) % fotos.length];

  return (
    <div
      className="relative w-full aspect-[2/3] md:aspect-[3/4] rounded-2xl overflow-hidden max-h-[650px] max-w-[420px] border border-slate-700 shadow-lg bg-slate-800"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Current Image */}
      <img
        key={current.id}
        src={current.url}
        alt={`Hero ${aktif + 1}`}
        className="absolute inset-0 w-full h-full object-content transition-opacity duration-700 opacity-100"
        loading="eager"
        decoding="async"
      />

      {/* Preload next image (hidden) */}
      {next && (
        <img
          src={next.url}
          alt=""
          className="hidden"
          loading="lazy"
        />
      )}

      {/* NAV */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition"
          >
            ›
          </button>
        </>
      )}

      {/* DOT */}
      {fotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === aktif ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

{/*"use client";
import { useState, useEffect } from "react";

export default function HeroSlider({ fotos }) {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    if (fotos.length <= 1) return;
    const interval = setInterval(() => {
      setAktif((prev) => (prev + 1) % fotos.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [fotos.length]);

  if (!fotos || fotos.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-800 rounded-1x2 flex items-center justify-center border border-slate-700">
        <p className="text-slate-500 text-sm">Belum ada foto</p>
      </div>
    );
  }

  return (
    <div className="mb-5 relative w-full aspect-[2/3] sm:aspect-[2/3] md:aspect-[3/4] lg:aspect-[2/3] rounded-2xl overflow-hidden max-h-[650px] max-w-[433px] mx-auto border border-slate-700 shadow-lg bg-slate-800">
      {fotos.map((foto, i) => (
        <img
          key={foto.id}
          src={foto.url}
          alt={`Hero ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${i === aktif ? "opacity-100" : "opacity-0"}`}
        />
      ))}

      {/* Tombol navigasi *
      {fotos.length > 1 && (
        <>
          <button onClick={() => setAktif((prev) => (prev - 1 + fotos.length) % fotos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-xl">
            ‹
          </button>
          <button onClick={() => setAktif((prev) => (prev + 1) % fotos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-xl">
            ›
          </button>
        </>
      )}

      {/* Dot indikator *
      {fotos.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
          {fotos.map((_, i) => (
            <button key={i} onClick={() => setAktif(i)} className={`w-2 h-2 rounded-full transition ${i === aktif ? "bg-white" : "bg-white/40"}`} />
          ))}
        </div>
      )}
    </div>
  );
*/}