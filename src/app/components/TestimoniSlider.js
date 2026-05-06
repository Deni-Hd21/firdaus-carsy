"use client";

import { useState, useEffect } from "react";
import TestimoniCard from "./TestimoniCard";

export default function TestimoniSlider({ testimoni }) {
  const [aktif, setAktif] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextSlide = () => {
    setAktif((prev) => (prev + 1) % testimoni.length);
  };

  const prevSlide = () => {
    setAktif((prev) => (prev - 1 + testimoni.length) % testimoni.length);
  };

  // autoplay (mirip hero)
  useEffect(() => {
    if (testimoni.length <= 1 || paused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [aktif, paused, testimoni.length]);

  if (!testimoni || testimoni.length === 0) return null;

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* TRACK */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${aktif * 100}%)`,
        }}
      >
        {testimoni.map((item, index) => (
          <div key={index} className="w-full shrink-0 flex justify-center">
            <div className="w-80">
              <TestimoniCard item={item} />
            </div>
          </div>
        ))}
      </div>

      {/* NAV */}
      {testimoni.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white w-9 h-9 rounded-full flex items-center justify-center"
          >
            ›
          </button>
        </>
      )}

      {/* DOT */}
      <div className="flex justify-center mt-6 gap-2">
        {testimoni.map((_, i) => (
          <button
            key={i}
            onClick={() => setAktif(i)}
            className={`w-2 h-2 rounded-full transition ${
              i === aktif ? "bg-cyan-400" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}