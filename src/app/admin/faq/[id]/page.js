"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditFAQ() {
  const router = useRouter();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ pertanyaan: "", jawaban: "", urutan: 0, aktif: true });

  useEffect(() => {
    fetch(`/api/faq/${id}`)
      .then((r) => r.json())
      .then(({ data }) => setForm(data));
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    setLoading(true);
    await fetch(`/api/faq/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, urutan: parseInt(form.urutan) }),
    });
    await fetch("/api/revalidate", { method: "POST" });
    router.push("/admin/faq");
  }

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Edit FAQ</h1>
          <button onClick={() => router.push("/admin/faq")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Kembali
          </button>
        </div>
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col gap-4">
          <div>
            <label className={labelClass}>Pertanyaan</label>
            <input name="pertanyaan" value={form.pertanyaan} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Jawaban</label>
            <textarea name="jawaban" value={form.jawaban} onChange={handleChange} className={inputClass} rows={6} />
          </div>
          <div>
            <label className={labelClass}>Urutan Tampil</label>
            <input name="urutan" type="number" value={form.urutan} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Status</label>
            <select name="aktif" value={form.aktif} onChange={(e) => setForm((prev) => ({ ...prev, aktif: e.target.value === "true" }))} className={inputClass}>
              <option value="true">Aktif</option>
              <option value="false">Nonaktif</option>
            </select>
          </div>
          <button onClick={handleSubmit} disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
            {loading ? "Menyimpan..." : "Update FAQ"}
          </button>
        </div>
      </div>
    </main>
  );
}