"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <main className="relative min-h-screen">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <img src="/bg-hero-v2.0.webp" alt="background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

      <section className="relative flex items-start justify-center px-4 pt-4 md:pt-4 min-h-screen">
        <div className="max-w-5xl mx-auto p-8 w-full">

          <div className="flex justify-center mb-4 items-center">
            <Image src="/logo-v2.webp" alt="Firdaus Cars" width={120} height={50} loading="eager" style={{ width: "120px", height: "auto" }} className="object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.6)]" />
          </div>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">Dashboard Admin</h1>
              <p className="text-gray-400 text-sm mt-1">Firdaus Cars Syari'ah</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => router.push("/admin/pengaturan")} className="bg-slate-700 hover:bg-slate-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                Setting
              </button>
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
                Logout
              </button>
            </div>
          </div>

          {/* Menu */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <button onClick={() => router.push("/admin/hero")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
              <p className="text-4xl mb-3">🖼️</p>
              <h2 className="text-white font-bold text-lg">Kelola Foto Hero</h2>
              <p className="text-gray-400 text-sm mt-1">Upload dan kelola foto slideshow halaman utama</p>
            </button>

            <button onClick={() => router.push("/admin/testimoni")} className="bg-slate-800 hover:border-cyan-400 border border-slate-700 rounded-2xl p-6 text-left transition">
              <p className="text-4xl mb-3">⭐</p>
              <h2 className="text-white font-bold text-lg">Kelola Testimoni</h2>
              <p className="text-gray-400 text-sm mt-1">Tambah, edit, dan hapus testimoni pelanggan</p>
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}