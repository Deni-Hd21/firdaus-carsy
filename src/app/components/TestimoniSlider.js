"use client";

import { useRef, useEffect, useState } from "react";
import TestimoniCard from "./TestimoniCard";

export default function TestimoniSlider({ testimoni }) {
  const containerRef = useRef(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const scroll = (direction) => {
    const container = containerRef.current;
    const scrollAmount = 340; // width + gap

    if (container) {
      container.scrollBy({
        left: direction === "next" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto scroll (pelan & manusiawi)
  useEffect(() => {
    if (!autoScroll) return;

    const interval = setInterval(() => {
      scroll("next");
    }, 4000);

    return () => clearInterval(interval);
  }, [autoScroll]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setAutoScroll(false)}
      onMouseLeave={() => setAutoScroll(true)}
    >
      {/* Slider */}
      <div
        ref={containerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-hide"
      >
        {testimoni.map((item, index) => (
          <div key={index} className="snap-start">
            <TestimoniCard item={item} />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <button
        onClick={() => scroll("prev")}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full"
      >
        ‹
      </button>

      <button
        onClick={() => scroll("next")}
        className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-3 rounded-full"
      >
        ›
      </button>
    </div>
  );
}