"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminFAQ() {
  const router = useRouter();
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchFAQ(); }, []);

  async function fetchFAQ() {
    const res = await fetch("/api/faq");
    const { data } = await res.json();
    setFaqs(data || []);
    setLoading(false);
  }

  async function handleHapus(id) {
    if (!confirm("Yakin ingin menghapus FAQ ini?")) return;
    await fetch(`/api/faq/${id}`, { method: "DELETE" });
    await fetch("/api/revalidate", { method: "POST" });
    fetchFAQ();
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Kelola FAQ</h1>
            <p className="text-gray-400 text-sm mt-1">{faqs.length} pertanyaan terdaftar</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
              ← Dashboard
            </button>
            <button onClick={() => router.push("/admin/faq/tambah")} className="bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-4 py-2 rounded-xl transition">
              + Tambah FAQ
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-gray-400">Memuat data...</p>
        ) : (
          <div className="flex flex-col gap-4">
            {faqs.map((item) => (
              <div key={item.id} className="bg-slate-800 rounded-2xl p-5 border border-slate-700">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-3">
                    <span className="bg-blue-900 text-white text-xs font-bold w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                        {item.urutan}
                    </span>
                    <p className="text-white font-semibold">{item.pertanyaan}</p>
                    </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => router.push(`/admin/faq/${item.id}`)} className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                      Edit
                    </button>
                    <button onClick={() => handleHapus(item.id)} className="border border-red-500 text-red-400 hover:bg-red-500 hover:text-white text-sm px-4 py-2 rounded-xl transition">
                      Hapus
                    </button>
                  </div>
                </div>
                <p className="text-gray-400 text-sm ml-10 mt-2 line-clamp-2">{item.jawaban}</p>
              </div>
            ))}
            {faqs.length === 0 && (
              <p className="text-gray-500 text-center py-12">Belum ada FAQ. Tambahkan sekarang!</p>
            )}
          </div>
        )}
      </div>
    </main>
  );
}