"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { compressImage } from "@/lib/compressImage";

export default function EditTestimoni() {
  const router = useRouter();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [foto, setFoto] = useState(null);

  const [form, setForm] = useState({
    nama: "",
    kota: "",
    mobil: "",
    pesan: "",
    bintang: 5,
    foto_url: "",
  });

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch(`/api/testimoni/${id}`);

        if (!res.ok) {
          throw new Error("Gagal mengambil data");
        }

        const { data } = await res.json();

        if (!data) {
          throw new Error("Data tidak ditemukan");
        }

        setForm(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit() {
    try {
      setSaving(true);

      let updatedForm = { ...form };

      // upload foto
      if (foto) {
        const fd = new FormData();
        const compressed = await compressImage(foto);
fd.append("file", compressed);
        fd.append("testimoniId", id);

        const resUpload = await fetch("/api/foto-testimoni", {
          method: "POST",
          body: fd,
        });

        if (!resUpload.ok) {
          throw new Error("Gagal upload foto");
        }

        const { url } = await resUpload.json();
        updatedForm.foto_url = url;
        await fetch("/api/revalidate", { method: "POST" });
      }

      const res = await fetch(`/api/testimoni/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...updatedForm,
          bintang: parseInt(updatedForm.bintang),
        }),
      });

      if (!res.ok) {
        throw new Error("Gagal update data");
      }

      router.push("/admin/testimoni");
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  if (loading) {
    return <p className="text-white p-8">Memuat data...</p>;
  }

  if (error) {
    return <p className="text-red-400 p-8">{error}</p>;
  }

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Edit Testimoni
        </h1>

        <div className="bg-slate-800 p-6 rounded-xl flex flex-col gap-4">
          <input name="nama" value={form.nama} onChange={handleChange} className={inputClass} />

          <textarea name="pesan" value={form.pesan} onChange={handleChange} className={inputClass} />

          <input type="file" onChange={(e) => setFoto(e.target.files[0])} />

          <button
            onClick={handleSubmit}
            disabled={saving}
            className="bg-cyan-500 p-3 rounded-xl text-white"
          >
            {saving ? "Menyimpan..." : "Update"}
          </button>
        </div>
      </div>
    </main>
  );
}