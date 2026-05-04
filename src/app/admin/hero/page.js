"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export default function AdminHero() {
  const router = useRouter();
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);

  useEffect(() => { fetchFotos(); }, []);

  async function fetchFotos() {
    const res = await fetch("/api/foto-hero");
    const { data } = await res.json();
    setFotos(data || []);
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setLoading(true);
    for (let i = 0; i < files.length; i++) {
      const compressed = await compressImage(files[i]);
      const fd = new FormData();
      fd.append("file", compressed);
      fd.append("urutan", fotos.length + i);
      await fetch("/api/foto-hero", { method: "POST", body: fd });
    }
          await fetch("/api/revalidate", { method: "POST" });
    setFiles([]);
    await fetchFotos();
    setLoading(false);
  }

async function handleHapus(id) {
  if (!confirm("Yakin hapus foto ini?")) return;
  await fetch(`/api/foto-hero/${id}`, { method: "DELETE" });
  await fetch("/api/revalidate", { method: "POST" });
  fetchFotos();
}

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Kelola Foto Hero</h1>
          <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Dashboard
          </button>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
          <label className="text-gray-400 text-sm mb-2 block">Upload Foto Baru</label>
          <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files))} className="w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600" />
          {files.length > 0 && <p className="text-cyan-400 text-xs mt-2">{files.length} foto dipilih</p>}
          <button onClick={handleUpload} disabled={loading || files.length === 0} className="mt-4 w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? "Mengupload..." : "Upload Foto"}
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {fotos.map((foto) => (
            <div key={foto.id} className="relative group">
              <img src={foto.url} className="w-full h-40 object-cover rounded-xl" />
              <button onClick={() => handleHapus(foto.id)} className="absolute top-2 right-2 bg-red-500/90 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-lg transition">
                Hapus
              </button>
            </div>
          ))}
          {fotos.length === 0 && (
            <p className="text-gray-500 text-sm col-span-3">Belum ada foto hero.</p>
          )}
        </div>
      </div>
    </main>
  );
}