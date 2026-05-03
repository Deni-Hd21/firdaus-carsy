"use client";
import { useEffect, useRef, useState } from "react";

export default function TestimoniSlider({ testimoni }) {
  const trackRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Duplikat data untuk efek infinite scroll
  const items = [...testimoni, ...testimoni, ...testimoni];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || testimoni.length === 0) return;

    let animationId;
    let position = 0;
    const speed = 0.5; // px per frame — semakin kecil semakin lambat
    const cardWidth = 320 + 24; // lebar card + gap
    const totalWidth = cardWidth * testimoni.length;

    function animate() {
      if (!paused) {
        position += speed;
        if (position >= totalWidth) {
          position = 0;
        }
        track.style.transform = `translateX(-${position}px)`;
      }
      animationId = requestAnimationFrame(animate);
    }

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [paused, testimoni.length]);

  if (!testimoni || testimoni.length === 0) return null;

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex gap-6" style={{ width: "max-content" }}>
        {items.map((item, index) => (
          <div
            key={index}
            className="w-80 shrink-0 bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition"
          >
            {/* Foto */}
            <div className="relative w-full aspect-square bg-slate-700">
              {item.foto_url ? (
                <img
                  src={item.foto_url}
                  alt={`Testimoni ${item.nama}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                  <span className="text-4xl">🤝</span>
                  <p className="text-slate-400 text-xs">Foto Serah Terima</p>
                </div>
              )}
              <div className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                AKAD SERAH TERIMA
              </div>
            </div>

            {/* Info */}
            <div className="p-5">
              <div className="flex gap-1 mb-3">
                {[...Array(item.bintang)].map((_, i) => (
                  <span key={i} className="text-orange-500">★</span>
                ))}
              </div>
              <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">{item.mobil}</p>
              <p className="text-gray-300 text-sm leading-relaxed italic line-clamp-3">"{item.pesan}"</p>
              <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-700">
                <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {item.nama.charAt(0)}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{item.nama}</p>
                  <p className="text-gray-500 text-xs">{item.kota}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}