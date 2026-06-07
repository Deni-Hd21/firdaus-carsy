"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminArtikel() {
  const router = useRouter();
  const [artikels, setArtikels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchArtikel(); }, []);

  async function fetchArtikel() {
    const res = await fetch("/api/artikel");
    const { data } = await res.json();
    setArtikels(data || []);
    setLoading(false);
  }

  async function handleHapus(id) {
    if (!confirm("Yakin ingin menghapus artikel ini?")) return;
    await fetch(`/api/artikel/${id}`, { method: "DELETE" });
    await fetch("/api/revalidate", { method: "POST" });
    fetchArtikel();
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Kelola Artikel</h1>
            <p className="text-gray-400 text-sm mt-1">{artikels.length} artikel</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
              ← Dashboard
            </button>
            <button onClick={() => router.push("/admin/artikel/tambah")} className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
              + Tulis Artikel
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {artikels.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  {item.cover_url && (
                    <img src={item.cover_url} className="w-16 h-16 object-cover rounded-xl shrink-0" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${item.status === "published" ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"}`}>
                        {item.status === "published" ? "Published" : "Draft"}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold">{item.judul}</h3>
                    <p className="text-gray-500 text-xs mt-1">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => window.open(`/artikel/${item.slug}`, "_blank")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-3 py-2 rounded-xl transition">
                    👁 Preview
                  </button>
                  <button onClick={() => router.push(`/admin/artikel/${item.id}`)} className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                    Edit
                  </button>
                  <button onClick={() => handleHapus(item.id)} className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                    Hapus
                  </button>
                </div>
              </div>
            ))}
            {artikels.length === 0 && (
              <div className="text-center py-20">
                <p className="text-4xl mb-4">✍️</p>
                <p className="text-white font-semibold">Belum ada artikel</p>
                <p className="text-gray-400 text-sm mt-2">Mulai tulis artikel pertama untuk meningkatkan SEO</p>
                <button onClick={() => router.push("/admin/artikel/tambah")} className="mt-4 bg-cyan-500 hover:bg-cyan-600 text-white text-sm px-6 py-2 rounded-full transition">
                  Tulis Artikel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}