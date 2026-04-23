"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export default function TambahMobil() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(false);
  const [form, setForm] = useState({
    nama: "",
    harga: "",
    tahun: "",
    transmisi: "Manual",
    bahan_bakar: "Bensin",
    kilometer: "",
    warna: "",
    deskripsi: "",
    tersedia: true,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  async function handleUploadFoto(mobilId) {
  for (let i = 0; i < foto.length; i++) {
    const fd = new FormData();
    const compressed = await compressImage(foto[i]);
fd.append("file", compressed);
    fd.append("mobilId", mobilId);
    fd.append("urutan", i);
    await fetch("/api/foto-mobil", { method: "POST", body: fd });
  }
}
async function handleSubmit() {
  setLoading(true);
  const res = await fetch("/api/mobil", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...form,
      harga: parseInt(form.harga),
      tahun: parseInt(form.tahun),
      kilometer: parseInt(form.kilometer),
    }),
  });
  const { data } = await res.json();
  if (foto.length > 0) await handleUploadFoto(data.id);
  router.push("/admin/mobil");
}

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Tambah Mobil</h1>
          <button onClick={() => router.push("/admin/mobil")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Kembali
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Nama Mobil</label>
            <input name="nama" value={form.nama} onChange={handleChange} className={inputClass} placeholder="Toyota Avanza 2020" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Harga (Rp)</label>
              <input name="harga" value={form.harga} onChange={handleChange} className={inputClass} placeholder="185000000" type="number" />
            </div>
            <div>
              <label className={labelClass}>Tahun</label>
              <input name="tahun" value={form.tahun} onChange={handleChange} className={inputClass} placeholder="2020" type="number" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Transmisi</label>
              <select name="transmisi" value={form.transmisi} onChange={handleChange} className={inputClass}>
                <option>Manual</option>
                <option>Otomatis</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Bahan Bakar</label>
              <select name="bahan_bakar" value={form.bahan_bakar} onChange={handleChange} className={inputClass}>
                <option>Bensin</option>
                <option>Solar</option>
                <option>Hybrid</option>
                <option>Listrik</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kilometer</label>
              <input name="kilometer" value={form.kilometer} onChange={handleChange} className={inputClass} placeholder="32000" type="number" />
            </div>
            <div>
              <label className={labelClass}>Warna</label>
              <input name="warna" value={form.warna} onChange={handleChange} className={inputClass} placeholder="Putih" />
            </div>
          </div>
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className={inputClass} placeholder="Kondisi mulus, terawat..." rows={3} />
          </div>
          <div>
  <label className={labelClass}>
    Foto Mobil (maksimal 10 foto)
  </label>
  <input
    type="file"
    accept="image/*"
    multiple
    onChange={(e) => {
      const files = Array.from(e.target.files).slice(0, 10);
      setFoto(files);
    }}
    className={inputClass}
  />
  {foto.length > 0 && (
    <p className="text-cyan-400 text-xs mt-1">{foto.length} foto dipilih</p>
  )}
</div>
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? "Menyimpan..." : "Simpan Mobil"}
          </button>
        </div>
      </div>
    </main>
  );
}