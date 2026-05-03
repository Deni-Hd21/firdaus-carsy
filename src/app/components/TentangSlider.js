"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function TentangSlider({ fotos = [] }) {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    if (fotos.length <= 1) return;

    const interval = setInterval(() => {
      setAktif((prev) => (prev + 1) % fotos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [fotos.length]);

  if (fotos.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
        <p className="text-slate-500 text-sm">Belum ada foto</p>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
      
      {/* ✅ Hanya render 1 gambar */}
      <Image
        key={fotos[aktif].id}
        src={fotos[aktif].url}
        alt={`Tentang ${aktif + 1}`}
        fill
        priority={aktif === 0} // penting untuk load pertama
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-opacity duration-700"
      />

      {/* ⬅️ Tombol kiri */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={() =>
              setAktif((prev) => (prev - 1 + fotos.length) % fotos.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-xl"
          >
            ‹
          </button>

          {/* ➡️ Tombol kanan */}
          <button
            onClick={() =>
              setAktif((prev) => (prev + 1) % fotos.length)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center transition text-xl"
          >
            ›
          </button>

          {/* 🔘 Indicator */}
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
        </>
      )}
    </div>
  );
}