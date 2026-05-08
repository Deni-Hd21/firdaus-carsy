"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminTestimoni() {
  const router = useRouter();
  const [testimoni, setTestimoni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    checkAuthAndFetch();
  }, []);

  async function checkAuthAndFetch() {
    try {
      setLoading(true);
      setError(null);

      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/admin/login");
        return;
      }

      await fetchTestimoni();
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat autentikasi");
    } finally {
      setLoading(false);
    }
  }

  async function fetchTestimoni() {
    try {
      setError(null);

      const res = await fetch("/api/testimoni");

      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }

      const result = await res.json();
      if (!result.data) {
        throw new Error("Format data tidak valid");
      }

      setTestimoni(result.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function handleHapus(id) {
    if (!confirm("Yakin ingin menghapus testimoni ini?")) return;

    try {
      setDeletingId(id);

      const res = await fetch(`/api/testimoni/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Gagal menghapus");
      }
    await fetch("/api/revalidate", { method: "POST" });
      // Optimistic update (lebih cepat dari fetch ulang)
      setTestimoni((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Kelola Testimoni</h1>
            <p className="text-gray-400 text-sm mt-1">
              {testimoni.length} testimoni terdaftar
            </p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
              ← Dashboard
            </button>
            <button onClick={() => router.push("/admin/testimoni/tambah")} className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
              + Tambah Testimoni
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 text-red-400 p-3 rounded-xl mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {testimoni.map((item) => (
              <div key={item.id} className="bg-slate-800 p-5 rounded-xl flex justify-between items-center gap-4">
                <div>
                  <h3 className="text-white font-semibold">{item.nama}</h3>
                  <p className="text-cyan-400 text-sm">{item.mobil}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.kota} · {"★".repeat(item.bintang)}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => router.push(`/admin/testimoni/${item.id}`)}
                    className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                    Edit
                  </button>
                  <button
                    onClick={() => handleHapus(item.id)}
                    disabled={deletingId === item.id}
                    className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-sm px-4 py-2 rounded-xl transition disabled:opacity-50">
                    {deletingId === item.id ? "..." : "Hapus"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}