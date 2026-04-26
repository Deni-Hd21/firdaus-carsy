"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FotoSlider({ fotos, nama }) {
  const [aktif, setAktif] = useState(0);

  if (!fotos || fotos.length === 0) {
    return (
      <div className="aspect-[4/3] bg-slate-700 flex items-center justify-center">
        <p className="text-slate-500 text-sm">Belum ada foto</p>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] bg-slate-700 overflow-hidden">

      {/* Image with smooth transition */}
      <AnimatePresence mode="wait">
        <motion.img
          key={aktif}
          src={fotos[aktif].url}
          alt={nama}
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Tombol navigasi */}
      {fotos.length > 1 && (
        <>
          <button
            onClick={() => setAktif((prev) => (prev - 1 + fotos.length) % fotos.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center transition duration-200">
            ‹
          </button>
          <button
            onClick={() => setAktif((prev) => (prev + 1) % fotos.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-7 h-7 rounded-full flex items-center justify-center transition duration-200">
            ›
          </button>
        </>
      )}

      {/* Dot indikator */}
      {fotos.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          {fotos.map((_, i) => (
            <button
              key={i}
              onClick={() => setAktif(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                i === aktif ? "bg-white scale-110" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      )}

      {/* Counter */}
      {fotos.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
          {aktif + 1}/{fotos.length}
        </div>
      )}
    </div>
  );
}

export default function KatalogCard({ item, index }) {
  const hargaFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(item.harga);

  const kilometerFormatted = new Intl.NumberFormat("id-ID").format(item.kilometer);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      viewport={{ once: true }}
      className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 
                 hover:border-cyan-400 transition-all duration-300 
                 group hover:-translate-y-1 hover:shadow-xl"
    >
      <FotoSlider fotos={item.fotos} nama={item.nama} />

      <div className="p-5">
        <a href={`/mobil/${item.id}`} className="hover:text-cyan-400 transition">
  <h3 className="text-white font-bold text-lg">{item.nama}</h3>
</a>
        <p className="text-cyan-400 font-bold text-xl mt-1">{hargaFormatted}</p>

        <div className="mt-4 grid grid-cols-2 gap-2 text-sm text-gray-400">
          <span>⚙️ {item.transmisi}</span>
          <span>⛽ {item.bahan_bakar}</span>
          <span>🛣️ {kilometerFormatted} km</span>
          <span>🎨 {item.warna}</span>
        </div>

<a href={`/mobil/${item.id}`} className="mt-5 block text-center border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold py-2 rounded-full transition">
  Lihat Detail
</a>

        <a
          href={`https://wa.me/6281294412914?text=Halo Pak Aldi, saya tertarik dengan ${item.nama} seharga ${hargaFormatted}`}
          target="_blank"
          className="mt-5 block text-center bg-cyan-400 hover:bg-cyan-600 text-white font-semibold py-2 rounded-full transition duration-200"
        >
          Tanya via WhatsApp
        </a>
      </div>
    </motion.div>
  );
}