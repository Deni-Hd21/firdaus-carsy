"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { compressImage } from "@/lib/compressImage";
import ImageCropper from "@/app/admin/components/ImageCropper";

export default function EditTestimoni() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [foto, setFoto] = useState(null);
  const [cropImageSrc, setCropImageSrc] = useState(null);
  const [cropOriginalName, setCropOriginalName] = useState("");
  const [showCropper, setShowCropper] = useState(false);
  const [croppedPreview, setCroppedPreview] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    kota: "",
    mobil: "",
    pesan: "",
    bintang: 5,
    tanggal: "",
    foto_url: "",
  });

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setCropOriginalName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setCropImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);

    // Reset input value so same file can be selected again
    e.target.value = "";
  }

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

          {croppedPreview ? (
            <div>
              <label className={labelClass}>Foto Baru (Pratinjau 16:9)</label>
              <div className="space-y-3">
                <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-700 bg-slate-900 group">
                  <img
                    src={croppedPreview}
                    alt="Pratinjau Foto Akad Baru"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowCropper(true)}
                      className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition shadow-lg shadow-cyan-500/25"
                    >
                      Potong Ulang
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setFoto(null);
                        setCroppedPreview(null);
                        setCropImageSrc(null);
                      }}
                      className="bg-red-500/80 hover:bg-red-500 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition shadow-lg shadow-red-500/25"
                    >
                      Batal Ganti
                    </button>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowCropper(true)}
                    className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold underline"
                  >
                    Atur Sorotan (Crop)
                  </button>
                  <span className="text-slate-600 text-xs">|</span>
                  <label className="text-cyan-400 hover:text-cyan-300 text-xs font-semibold underline cursor-pointer">
                    Pilih Foto Lain
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>
          ) : (
            <>
              {form.foto_url && (
                <div>
                  <label className={labelClass}>Foto Saat Ini</label>
                  <img src={form.foto_url} className="w-full aspect-video object-cover rounded-xl border border-slate-700" alt="foto testimoni" />
                </div>
              )}

              <div>
                <label className={labelClass}>Ganti Foto Serah Terima</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={inputClass}
                />
                <p className="text-xs text-gray-500 mt-1">
                  💡 Foto akan dipotong dengan rasio 16:9 secara interaktif setelah dipilih.
                </p>
              </div>
            </>
          )}

          <button onClick={handleSubmit} disabled={saving} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {saving ? "Menyimpan..." : "Update Testimoni"}
          </button>
        </div>
      </div>

      {showCropper && cropImageSrc && (
        <ImageCropper
          imageSrc={cropImageSrc}
          originalFileName={cropOriginalName}
          onCrop={(croppedFile) => {
            setFoto(croppedFile);
            const previewUrl = URL.createObjectURL(croppedFile);
            setCroppedPreview(previewUrl);
            setShowCropper(false);
          }}
          onClose={() => setShowCropper(false)}
        />
      )}
    </main>
  );
}