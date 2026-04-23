"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminMobil() {
  const router = useRouter();
  const [mobil, setMobil] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) router.push("/admin/login");
    });
    fetchMobil();
  }, []);

  async function fetchMobil() {
    const { data } = await fetch("/api/mobil").then(r => r.json());
    setMobil(data || []);
    setLoading(false);
  }

  async function handleHapus(id) {
    if (!confirm("Yakin ingin menghapus mobil ini?")) return;
    await fetch(`/api/mobil/${id}`, { method: "DELETE" });
    fetchMobil();
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Kelola Mobil</h1>
            <p className="text-gray-400 text-sm mt-1">{mobil.length} unit terdaftar</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
              ← Dashboard
            </button>
            <button onClick={() => router.push("/admin/mobil/tambah")} className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
              + Tambah Mobil
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {mobil.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700 flex justify-between items-center">
                <div>
                  <h3 className="text-white font-bold">{item.nama}</h3>
                  <p className="text-cyan-400 text-sm mt-1">
                    Rp {item.harga.toLocaleString("id-ID")}
                  </p>
                  <p className="text-gray-500 text-xs mt-1">
                    {item.transmisi} · {item.bahan_bakar} · {item.kilometer.toLocaleString("id-ID")} km
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => router.push(`/admin/mobil/${item.id}`)} className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                    Edit
                  </button>
                  <button onClick={() => handleHapus(item.id)} className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                    Hapus
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