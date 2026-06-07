"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import TipTapEditor from "@/app/components/TipTapEditor";
import { compressImage } from "@/lib/compressImage";

function generateSlug(judul) {
  return judul
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function EditArtikel() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [form, setForm] = useState({
    judul: "",
    slug: "",
    excerpt: "",
    konten: "",
    meta_desc: "",
    status: "draft",
    cover_url: "",
  });

  useEffect(() => {
    fetch(`/api/artikel/${id}`)
      .then((r) => r.json())
      .then(({ data }) => {
        setForm(data);
        setFetching(false);
      });
  }, [id]);

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
    setLoading(true);
    try {
      let cover_url = form.cover_url;
      if (coverFile) {
        const compressed = await compressImage(coverFile);
        const fd = new FormData();
        fd.append("file", compressed);
        const res = await fetch("/api/upload-cover", { method: "POST", body: fd });
        const { url } = await res.json();
        cover_url = url;
      }

      await fetch(`/api/artikel/${id}`, {
        method: "PUT",
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

  if (fetching) return <p className="text-white p-8">Memuat artikel...</p>;

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Edit Artikel</h1>
          <div className="flex gap-2">
            <button onClick={() => window.open(`/artikel/${form.slug}`, "_blank")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-xl transition">
              👁 Preview
            </button>
            <button onClick={() => router.push("/admin/artikel")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
              ← Kembali
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <label className={labelClass}>Judul Artikel</label>
            <input name="judul" value={form.judul || ""} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Slug URL</label>
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm shrink-0">firdauscarsy.id/artikel/</span>
              <input name="slug" value={form.slug || ""} onChange={handleChange} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>Excerpt</label>
            <textarea name="excerpt" value={form.excerpt || ""} onChange={handleChange} className={inputClass} rows={2} />
          </div>
          <div>
            <label className={labelClass}>Meta Description <span className="text-xs text-gray-500">(maks 160 karakter)</span></label>
            <textarea name="meta_desc" value={form.meta_desc || ""} onChange={handleChange} className={inputClass} rows={2} maxLength={160} />
            <p className="text-gray-500 text-xs mt-1">{(form.meta_desc || "").length}/160 karakter</p>
          </div>
          <div>
            <label className={labelClass}>Foto Cover</label>
            {(coverPreview || form.cover_url) && (
              <img src={coverPreview || form.cover_url} className="w-full h-48 object-cover rounded-xl mb-3" alt="cover" />
            )}
            <input type="file" accept="image/*" onChange={handleCoverChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Konten Artikel</label>
            <TipTapEditor content={form.konten} onChange={(val) => setForm((prev) => ({ ...prev, konten: val }))} />
          </div>
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