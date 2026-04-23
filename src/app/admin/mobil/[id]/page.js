"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export default function EditMobil() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState([]);
  const [existingFotos, setExistingFotos] = useState([]);
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

  useEffect(() => {
    fetch(`/api/mobil/${id}`)
      .then((r) => r.json())
      .then(({ data }) => {
        setForm({
          nama: data.nama,
          harga: data.harga,
          tahun: data.tahun,
          transmisi: data.transmisi,
          bahan_bakar: data.bahan_bakar,
          kilometer: data.kilometer,
          warna: data.warna,
          deskripsi: data.deskripsi || "",
          tersedia: data.tersedia,
        });
        setExistingFotos(data.fotos || []);
      });
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleHapusFoto(fotoId) {
    await fetch(`/api/foto-mobil/${fotoId}`, { method: "DELETE" });
    setExistingFotos((prev) => prev.filter((f) => f.id !== fotoId));
  }

  async function handleUploadFoto(mobilId) {
    for (let i = 0; i < foto.length; i++) {
      const fd = new FormData();
      const compressed = await compressImage(foto[i]);
fd.append("file", compressed);
      fd.append("mobilId", mobilId);
      fd.append("urutan", existingFotos.length + i);
      await fetch("/api/foto-mobil", { method: "POST", body: fd });
    }
  }

  async function handleSubmit() {
    setLoading(true);
    await fetch(`/api/mobil/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        harga: parseInt(form.harga),
        tahun: parseInt(form.tahun),
        kilometer: parseInt(form.kilometer),
      }),
    });
    if (foto.length > 0) await handleUploadFoto(parseInt(id));
    router.push("/admin/mobil");
  }

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Mobil</h1>
          <button onClick={() => router.push("/admin/mobil")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Kembali
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Nama Mobil</label>
            <input name="nama" value={form.nama} onChange={handleChange} className={inputClass} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Harga (Rp)</label>
              <input name="harga" value={form.harga} onChange={handleChange} className={inputClass} type="number" />
            </div>
            <div>
              <label className={labelClass}>Tahun</label>
              <input name="tahun" value={form.tahun} onChange={handleChange} className={inputClass} type="number" />
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
              <input name="kilometer" value={form.kilometer} onChange={handleChange} className={inputClass} type="number" />
            </div>
            <div>
              <label className={labelClass}>Warna</label>
              <input name="warna" value={form.warna} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Deskripsi</label>
            <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className={inputClass} rows={3} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="tersedia" value={form.tersedia} onChange={(e) => setForm(prev => ({ ...prev, tersedia: e.target.value === "true" }))} className={inputClass}>
              <option value="true">Tersedia</option>
              <option value="false">Terjual</option>
            </select>
          </div>

          {/* Foto yang sudah ada */}
          {existingFotos.length > 0 && (
            <div>
              <label className={labelClass}>Foto Saat Ini</label>
              <div className="grid grid-cols-3 gap-2">
                {existingFotos.map((f) => (
                  <div key={f.id} className="relative group">
                    <img src={f.url} className="w-full h-24 object-cover rounded-lg" />
                    <button onClick={() => handleHapusFoto(f.id)} className="absolute top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full opacity-0 group-hover:opacity-100 transition">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className={labelClass}>Tambah Foto Baru (maksimal {10 - existingFotos.length} foto)</label>
            <input type="file" accept="image/*" multiple onChange={(e) => setFoto(Array.from(e.target.files).slice(0, 10 - existingFotos.length))} className={inputClass} />
            {foto.length > 0 && (
              <p className="text-cyan-400 text-xs mt-1">{foto.length} foto dipilih</p>
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? "Menyimpan..." : "Update Mobil"}
          </button>
        </div>
      </div>
    </main>
  );
}