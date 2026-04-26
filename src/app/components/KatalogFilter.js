"use client";
import { useState, useEffect } from "react";
import KatalogCard from "./KatalogCard";

export default function KatalogFilter({ mobil }) {
  const [filtered, setFiltered] = useState(mobil);
  const [search, setSearch] = useState("");
  const [transmisi, setTransmisi] = useState("Semua");
  const [bahanBakar, setBahanBakar] = useState("Semua");
  const [hargaMax, setHargaMax] = useState("");
  const [sortBy, setSortBy] = useState("terbaru");

  useEffect(() => {
    let result = [...mobil];

    if (search) {
      result = result.filter((m) =>
        m.nama.toLowerCase().includes(search.toLowerCase()) ||
        m.warna.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (transmisi !== "Semua") {
      result = result.filter((m) => m.transmisi === transmisi);
    }

    if (bahanBakar !== "Semua") {
      result = result.filter((m) => m.bahan_bakar === bahanBakar);
    }

    if (hargaMax) {
      result = result.filter((m) => m.harga <= parseInt(hargaMax));
    }

    if (sortBy === "terbaru") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "termurah") {
      result.sort((a, b) => a.harga - b.harga);
    } else if (sortBy === "termahal") {
      result.sort((a, b) => b.harga - a.harga);
    } else if (sortBy === "km_terendah") {
      result.sort((a, b) => a.kilometer - b.kilometer);
    }

    setFiltered(result);
  }, [search, transmisi, bahanBakar, hargaMax, sortBy, mobil]);

  function handleReset() {
    setSearch("");
    setTransmisi("Semua");
    setBahanBakar("Semua");
    setHargaMax("");
    setSortBy("terbaru");
  }

  const inputClass = "w-full bg-slate-800 text-white px-4 py-2.5 rounded-xl border border-slate-700 focus:outline-none focus:border-cyan-400 text-sm";

  return (
    <div>
      {/* Filter Bar */}
      <div className="bg-slate-800 rounded-2xl p-4 mb-8 border border-slate-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input
            type="text"
            placeholder="🔍 Cari nama atau warna..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={inputClass}
          />
          <select value={transmisi} onChange={(e) => setTransmisi(e.target.value)} className={inputClass}>
            <option value="Semua">Semua Transmisi</option>
            <option value="Manual">Manual</option>
            <option value="Otomatis">Otomatis</option>
          </select>
          <select value={bahanBakar} onChange={(e) => setBahanBakar(e.target.value)} className={inputClass}>
            <option value="Semua">Semua Bahan Bakar</option>
            <option value="Bensin">Bensin</option>
            <option value="Solar">Solar</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Listrik">Listrik</option>
          </select>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={inputClass}>
            <option value="terbaru">Terbaru</option>
            <option value="termurah">Harga Termurah</option>
            <option value="termahal">Harga Termahal</option>
            <option value="km_terendah">KM Terendah</option>
          </select>
          <button onClick={handleReset} className="w-full bg-red-700 hover:bg-red-600 text-white hover:text-white text-sm px-4 py-2.5 rounded-xl transition">
            Reset Filter
          </button>
        </div>
      </div>

      {/* Hasil */}
      <p className="text-gray-500 text-sm mb-4">{filtered.length} unit ditemukan</p>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white font-semibold">Mobil tidak ditemukan</p>
          <p className="text-gray-400 text-sm mt-2">Coba ubah filter pencarian</p>
          <button onClick={handleReset} className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-6 py-2 rounded-full transition">
            Reset Filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, index) => (
            <KatalogCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}