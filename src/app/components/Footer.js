"use client";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center">
          <Image src="/logonav.webp" alt="Firdaus Cars" width={120} height={50} className="object-contain" />
        </div>        

        <p className="text-gray-500 text-sm text-center">
          © 2025 Firdaus Cars Syari'ah. All rights reserved.
        </p>
        <div className="flex gap-4 text-gray-500 text-sm">
          <a href="https://instagram.com/firdauscarsy" target="_blank" className="hover:text-orange-500 transition">Instagram</a>
          <a href="https://wa.me/6281294412914" target="_blank" className="hover:text-orange-500 transition">WhatsApp</a>
        </div>
      </div>
    </footer>
  );
}
