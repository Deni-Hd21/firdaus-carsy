"use client";
import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <div className="flex items-center">
          <Image src="/logonav.webp" alt="Firdaus Carsy" width={120} height={50} className="object-contain" />
        </div>  
          <div className="flex gap-4 text-slate-800 text-sm">
            <a href="https://instagram.com/firdauscarsy" target="_blank" className="hover:text-cyan-500 transition">Instagram</a>
            <a href="https://wa.me/6281294412914" target="_blank" className="hover:text-cyan-500 transition">WhatsApp</a>
          </div>
        </div>
        <p className="text-slate-400 text-sm text-center w-full border-t border-slate-100 pt-4">
          © 2026 Firdaus Carsy. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
