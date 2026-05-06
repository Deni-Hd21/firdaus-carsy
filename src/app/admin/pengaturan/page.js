"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Pengaturan() {
  const router = useRouter();
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [successPassword, setSuccessPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [emailForm, setEmailForm] = useState({ email: "" });
  const [passwordForm, setPasswordForm] = useState({
    password: "",
    konfirmasi: "",
  });

  async function handleGantiEmail() {
    setLoadingEmail(true);
    setErrorEmail("");
    setSuccessEmail("");

    if (!emailForm.email) {
      setErrorEmail("Email tidak boleh kosong");
      setLoadingEmail(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      email: emailForm.email,
    });

    if (error) {
      setErrorEmail(error.message);
    } else {
      setSuccessEmail("Email berhasil diubah! Cek inbox untuk konfirmasi.");
      setEmailForm({ email: "" });
    }
    setLoadingEmail(false);
  }

  async function handleGantiPassword() {
    setLoadingPassword(true);
    setErrorPassword("");
    setSuccessPassword("");

    if (!passwordForm.password || !passwordForm.konfirmasi) {
      setErrorPassword("Semua field wajib diisi");
      setLoadingPassword(false);
      return;
    }

    if (passwordForm.password.length < 6) {
      setErrorPassword("Password minimal 6 karakter");
      setLoadingPassword(false);
      return;
    }

    if (passwordForm.password !== passwordForm.konfirmasi) {
      setErrorPassword("Password dan konfirmasi tidak cocok");
      setLoadingPassword(false);
      return;
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordForm.password,
    });

    if (error) {
      setErrorPassword(error.message);
    } else {
      setSuccessPassword("Password berhasil diubah!");
      setPasswordForm({ password: "", konfirmasi: "" });
    }
    setLoadingPassword(false);
  }

  const inputClass = "w-full bg-slate-700 text-white px-4 py-3 rounded-xl border border-slate-600 focus:outline-none focus:border-cyan-400";
  const labelClass = "text-gray-400 text-sm mb-1 block";

  return (
    <main className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-white">Pengaturan Akun</h1>
          <button onClick={() => router.push("/admin/dashboard")} className="border border-slate-600 text-gray-400 hover:text-white text-sm px-4 py-2 rounded-xl transition">
            ← Dashboard
          </button>
        </div>

        {/* Ganti Email */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 mb-6">
          <h2 className="text-white font-bold text-lg mb-4">Ganti Email</h2>

          {errorEmail && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {errorEmail}
            </div>
          )}
          {successEmail && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
              {successEmail}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Email Baru</label>
              <input
                type="email"
                value={emailForm.email}
                onChange={(e) => setEmailForm({ email: e.target.value })}
                className={inputClass}
                placeholder="email@baru.com"
              />
            </div>
            <button
              onClick={handleGantiEmail}
              disabled={loadingEmail}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
              {loadingEmail ? "Memproses..." : "Simpan Email"}
            </button>
          </div>
        </div>

        {/* Ganti Password */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700">
          <h2 className="text-white font-bold text-lg mb-4">Ganti Password</h2>

          {errorPassword && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 text-sm px-4 py-3 rounded-xl mb-4">
              {errorPassword}
            </div>
          )}
          {successPassword && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 text-sm px-4 py-3 rounded-xl mb-4">
              {successPassword}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClass}>Password Baru</label>
              <input
                type="password"
                value={passwordForm.password}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, password: e.target.value }))}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className={labelClass}>Konfirmasi Password</label>
              <input
                type="password"
                value={passwordForm.konfirmasi}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, konfirmasi: e.target.value }))}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleGantiPassword}
              disabled={loadingPassword}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50">
              {loadingPassword ? "Memproses..." : "Simpan Password"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}