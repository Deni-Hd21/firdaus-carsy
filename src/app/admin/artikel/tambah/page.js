"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TipTapEditor from "@/app/components/TipTapEditor";
import { compressImage } from "@/lib/compressImage";
import ImageCropper from "@/app/admin/components/ImageCropper";




function generateSlug(judul) {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function TambahArtikel() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [coverFile, setCoverFile] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [showCrop, setShowCrop] = useState(false);
  const [coverPreview, setCoverPreview] = useState(null);
  const [form, setForm] = useState({
    judul: "",
    slug: "",
    excerpt: "",
    konten: "",
    meta_desc: "",
    status: "draft",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "judul" ? { slug: generateSlug(value) } : {}),
    }));
  }

  function handleCoverChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  }

  async function handleSubmit(status) {
    if (!form.judul || !form.konten) {
      alert("Judul dan konten wajib diisi!");
      return;
    }
    setLoading(true);

    try {
      let cover_url = "";
      if (coverFile) {
        const compressed = await compressImage(coverFile);
        const fd = new FormData();
        fd.append("file", compressed);
        const res = await fetch("/api/upload-cover", { method: "POST", body: fd });
        const { url } = await res.json();
        cover_url = url;
      }

      await fetch("/api/artikel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, cover_url, status }),
      });

      await fetch("/api/revalidate", { method: "POST" });
      router.push("/admin/artikel");
    } catch (err) {
      alert("Terjadi kesalahan: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Tulis Artikel Baru</h1>
          <button onClick={() => router.push("/admin/artikel")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Kembali
          </button>
        </div>

        <div className="flex flex-col gap-5">
          {/* Judul */}
          <div>
            <label className={labelClass}>Judul Artikel</label>
            <input name="judul" value={form.judul} onChange={handleChange} className={inputClass} placeholder="Cara Kredit Mobil Syariah di Karawang" />
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug URL <span className="text-xs text-gray-500">(otomatis dari judul)</span></label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm shrink-0">firdauscarsy.id/artikel/</span>
              <input name="slug" value={form.slug} onChange={handleChange} className={inputClass} placeholder="cara-kredit-mobil-syariah" />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className={labelClass}>Excerpt <span className="text-xs text-gray-500">(ringkasan singkat, tampil di daftar artikel)</span></label>
            <textarea name="excerpt" value={form.excerpt} onChange={handleChange} className={inputClass} rows={2} placeholder="Ringkasan singkat artikel..." />
          </div>

          {/* Meta Description */}
          <div>
            <label className={labelClass}>Meta Description <span className="text-xs text-gray-500">(untuk SEO, maks 160 karakter)</span></label>
            <textarea name="meta_desc" value={form.meta_desc} onChange={handleChange} className={inputClass} rows={2} placeholder="Deskripsi artikel untuk Google..." maxLength={160} />
            <p className="text-gray-500 text-xs mt-1">{form.meta_desc.length}/160 karakter</p>
          </div>

          {/* Cover */}
          <div>
            <label className={labelClass}>Foto Cover</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = () => {
                    setCropSrc(reader.result);
                    setShowCrop(true);
                  };
                  reader.readAsDataURL(file);
                }}
                className={inputClass}
              />

              {showCrop && cropSrc && (
                <ImageCropper
                  imageSrc={cropSrc}
                  aspect={16 / 9}
                  onCrop={(croppedFile) => {
                    setCoverFile(croppedFile);
                    setCoverPreview(URL.createObjectURL(croppedFile));
                    setShowCrop(false);
                    setCropSrc(null);
                  }}
                  onClose={() => {
                    setShowCrop(false);
                    setCropSrc(null);
                  }}
                />
              )}
            {coverPreview && (
              <img src={coverPreview} className="mt-3 w-full h-48 object-cover rounded-xl" alt="preview cover" />
            )}
          </div>

          {/* Konten */}
          <div>
            <label className={labelClass}>Konten Artikel</label>
            <TipTapEditor content={form.konten} onChange={(val) => setForm((prev) => ({ ...prev, konten: val }))} />
          </div>

          {/* Tombol */}
          <div className="flex gap-3 pt-4">
            <button onClick={() => handleSubmit("draft")} disabled={loading} className="flex-1 border border-yellow-500 text-yellow-400 hover:bg-yellow-500 hover:text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
              {loading ? "Menyimpan..." : "Simpan sebagai Draft"}
            </button>
            <button onClick={() => handleSubmit("published")} disabled={loading} className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
              {loading ? "Menyimpan..." : "Publish Artikel"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}