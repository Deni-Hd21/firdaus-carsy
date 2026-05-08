"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export default function EditTestimoni() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [foto, setFoto] = useState(null);
  const [form, setForm] = useState({
    nama: "",
    kota: "",
    mobil: "",
    pesan: "",
    bintang: 5,
    tanggal: "",
    foto_url: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/testimoni/${id}`);
        if (!res.ok) throw new Error("Gagal mengambil data");
        const { data } = await res.json();
        if (!data) throw new Error("Data tidak ditemukan");
        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      setSaving(true);
      let updatedForm = { ...form };

      if (foto) {
        const fd = new FormData();
        const compressed = await compressImage(foto);
        fd.append("file", compressed);
        fd.append("testimoniId", id);
        const resUpload = await fetch("/api/foto-testimoni", { method: "POST", body: fd });
        if (!resUpload.ok) throw new Error("Gagal upload foto");
        const { url } = await resUpload.json();
        updatedForm.foto_url = url;
      }

      const res = await fetch(`/api/testimoni/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...updatedForm, bintang: parseInt(updatedForm.bintang) }),
      });

      if (!res.ok) throw new Error("Gagal update data");
      await fetch("/api/revalidate", { method: "POST" });
      router.push("/admin/testimoni");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  if (loading) return <p className="text-white p-8">Memuat data...</p>;
  if (error) return <p className="text-red-400 p-8">{error}</p>;

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Testimoni</h1>
          <button onClick={() => router.push("/admin/testimoni")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Kembali
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Nama Pelanggan</label>
            <input name="nama" value={form.nama || ""} onChange={handleChange} className={inputClass} placeholder="Budi Santoso" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Kota</label>
              <input name="kota" value={form.kota || ""} onChange={handleChange} className={inputClass} placeholder="Karawang" />
            </div>
            <div>
              <label className={labelClass}>Bintang</label>
              <select name="bintang" value={form.bintang} onChange={handleChange} className={inputClass}>
                <option value={5}>⭐⭐⭐⭐⭐</option>
                <option value={4}>⭐⭐⭐⭐</option>
                <option value={3}>⭐⭐⭐</option>
              </select>
            </div>
          </div>

          <div>
            <label className={labelClass}>Mobil yang Dibeli</label>
            <input name="mobil" value={form.mobil || ""} onChange={handleChange} className={inputClass} placeholder="Toyota Avanza 2020" />
          </div>

          <div>
            <label className={labelClass}>Pesan / Ulasan</label>
            <textarea name="pesan" value={form.pesan || ""} onChange={handleChange} className={inputClass} rows={3} placeholder="Pelayanannya ramah dan jujur..." />
          </div>

          <div>
            <label className={labelClass}>Tanggal Akad</label>
            <input type="date" name="tanggal" value={form.tanggal || ""} onChange={handleChange} className={inputClass} />
          </div>

          {form.foto_url && (
            <div>
              <label className={labelClass}>Foto Saat Ini</label>
              <img src={form.foto_url} className="w-full h-48 object-cover rounded-xl" alt="foto testimoni" />
            </div>
          )}

          <div>
            <label className={labelClass}>Ganti Foto Serah Terima</label>
            <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} className={inputClass} />
            {foto && <p className="text-cyan-400 text-xs mt-1">{foto.name} dipilih</p>}
          </div>

          <button onClick={handleSubmit} disabled={saving} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {saving ? "Menyimpan..." : "Update Testimoni"}
          </button>
        </div>
      </div>
    </main>
  );
}