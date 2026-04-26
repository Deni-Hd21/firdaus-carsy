"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function DetailMobilClient({ mobil }) {
  const [fotoAktif, setFotoAktif] = useState(0);

  const hargaFormatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(mobil.harga);

  const kmFormatted = new Intl.NumberFormat("id-ID").format(mobil.kilometer);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-slate-950 pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* Foto */}
            <div>
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800">
                {mobil.fotos.length > 0 ? (
                  <img src={mobil.fotos[fotoAktif].url} alt={mobil.nama} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-slate-500">Belum ada foto</p>
                  </div>
                )}
                {mobil.fotos.length > 1 && (
                  <>
                    <button onClick={() => setFotoAktif((prev) => (prev - 1 + mobil.fotos.length) % mobil.fotos.length)} className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">
                      ‹
                    </button>
                    <button onClick={() => setFotoAktif((prev) => (prev + 1) % mobil.fotos.length)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white w-9 h-9 rounded-full flex items-center justify-center text-xl">
                      ›
                    </button>
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                      {fotoAktif + 1}/{mobil.fotos.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail */}
              {mobil.fotos.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {mobil.fotos.map((foto, i) => (
                    <button key={foto.id} onClick={() => setFotoAktif(i)} className={`shrink-0 w-16 aspect-square rounded-lg overflow-hidden border-2 transition ${i === fotoAktif ? "border-cyan-400" : "border-transparent"}`}>

                      <img src={foto.url} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">{mobil.nama}</h1>
              <p className="text-cyan-400 text-3xl font-bold mt-2">{hargaFormatted}</p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  { label: "Tahun", value: mobil.tahun },
                  { label: "Transmisi", value: mobil.transmisi },
                  { label: "Bahan Bakar", value: mobil.bahan_bakar },
                  { label: "Kilometer", value: `${kmFormatted} km` },
                  { label: "Warna", value: mobil.warna },
                  { label: "Status", value: mobil.tersedia ? "Tersedia" : "Terjual" },
                ].map((item, i) => (
                  <div key={i} className="bg-slate-800 rounded-xl p-3 border border-slate-700">
                    <p className="text-gray-500 text-xs">{item.label}</p>
                    <p className="text-white font-semibold mt-1">{item.value}</p>
                  </div>
                ))}
              </div>

              {mobil.deskripsi && (
                <div className="mt-6">
                  <p className="text-gray-400 text-sm font-semibold uppercase tracking-wider mb-2">Deskripsi</p>
                  <p className="text-gray-300 leading-relaxed">{mobil.deskripsi}</p>
                </div>
              )}

              <a href={`https://wa.me/6282125171716?text=Halo Pak Aldi, saya tertarik dengan ${mobil.nama} seharga ${hargaFormatted}. Boleh minta info lebih lanjut?`} target="_blank" className="mt-8 block text-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-4 rounded-full transition text-lg">
                💬 Tanya via WhatsApp
              </a>

              <a href="/#katalog" className="mt-3 block text-center border border-slate-600 text-gray-400 hover:text-white py-3 rounded-full transition">
                ← Kembali ke Katalog
              </a>
            </div>

          </motion.div>
        </div>
      </main>
    </>
  );
}