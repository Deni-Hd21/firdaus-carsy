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
              <div key={item.id} className="bg-slate-800 p-5 rounded-xl flex justify-between items-center">
                <h3 className="text-white">{item.nama}</h3>

                <button
                  onClick={() => handleHapus(item.id)}
                  disabled={deletingId === item.id}
                  className="text-red-400 hover:text-red-500 text-sm disabled:opacity-50"
                >
                  {deletingId === item.id ? "Menghapus..." : "Hapus"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}