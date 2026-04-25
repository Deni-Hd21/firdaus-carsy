"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
      }
    });
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
            <p className="text-gray-400 text-sm mt-1">Firdaus Cars Syari'ah</p>
          </div>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button onClick={() => router.push("/admin/mobil")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
            <p className="text-4xl mb-3">🚗</p>
            <h2 className="text-white font-bold text-lg">Kelola Mobil</h2>
            <p className="text-gray-400 text-sm mt-1">Tambah, edit, dan hapus data mobil</p>
          </button>
          <button onClick={() => router.push("/admin/testimoni")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
            <p className="text-4xl mb-3">⭐</p>
            <h2 className="text-white font-bold text-lg">Kelola Testimoni</h2>
            <p className="text-gray-400 text-sm mt-1">Tambah, edit, dan hapus testimoni pelanggan</p>
          </button>
          <button onClick={() => router.push("/admin/hero")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
            <p className="text-4xl mb-3">🖼️</p>
            <h2 className="text-white font-bold text-lg">Kelola Foto Hero</h2>
            <p className="text-gray-400 text-sm mt-1">Upload dan kelola foto slideshow halaman utama</p>
          </button>
          <button onClick={() => router.push("/admin/tentang")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
            <p className="text-4xl mb-3">🏢</p>
            <h2 className="text-white font-bold text-lg">Kelola Foto Tentang</h2>
            <p className="text-gray-400 text-sm mt-1">Upload foto showroom untuk halaman tentang kami</p>
          </button>

        </div>
      </div>
    </main>
  );
}