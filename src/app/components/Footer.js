"use client";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-slate-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Image src="/logo-v2.webp" alt="Firdaus Carsy" width={140} height={50} className="object-contain" />
            </div>
            <p className="text-slate-800 text-sm leading-relaxed max-w-md">
              Pilihan terpercaya untuk pembiayaan mobil syariah impian Anda. Kami berkomitmen memberikan layanan terbaik dengan proses mudah, cepat, dan transparan untuk kenyamanan keluarga Anda.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black font-semibold mb-6 text-lg">Tautan Cepat</h4>
            <ul className="flex flex-col gap-4 text-slate-800 text-sm">
              <li><Link href="/#tentang" className="hover:text-cyan-600 transition">Tentang Kami</Link></li>
              <li><Link href="/#testimoni" className="hover:text-cyan-600 transition">Testimoni Pelanggan</Link></li>
              <li><Link href="/#faq" className="hover:text-cyan-600 transition">Tanya Jawab (FAQ)</Link></li>
              <li><Link href="/artikel" className="hover:text-cyan-600 transition">Artikel & Blog</Link></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h4 className="text-black font-semibold mb-6 text-lg">Hubungi Kami</h4>
            <ul className="flex flex-col gap-4 text-slate-800 text-sm">
              <li className="flex items-center gap-3">
                {/*<span className="text-xl"></span>*/}
                <a href="https://wa.me/6281294412914" target="_blank" className="hover:text-cyan-600 transition">
                  +62 812-9441-2914
                </a>
              </li>
            </ul>

            <h4 className="text-black font-semibold mt-8 mb-4 text-lg">Ikuti Kami</h4>
            <div className="flex gap-4 text-slate-800">
              <a href="https://www.facebook.com/aldi.akhmadf" target="_blank" className="hover:text-cyan-600 transition text-sm">Facebook</a>
              <a href="https://www.tiktok.com/@firdauscarsy" target="_blank" className="hover:text-cyan-600 transition text-sm">TikTok</a>
              <a href="https://instagram.com/firdauscarsy" target="_blank" className="hover:text-cyan-600 transition text-sm">Instagram</a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 pt-8 border-t border-slate-100">
          <p className="text-slate-500 text-sm text-center md:text-left md:ml-20">
            © {new Date().getFullYear()} Firdaus Carsy. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm text-center md:mr-20">
            Powered by : rangke.id
          </p>
        </div>
      </div>
    </footer>
  );
}
