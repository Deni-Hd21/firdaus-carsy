"use client";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed left-0 right-0 z-50 top-0 bg-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/logonav.webp" alt="Firdaus Cars" width={120} height={50} loading="eager" style={{ width: "120px", height: "auto" }} className="object-contain" />
        </div>
        <ul className="hidden md:flex gap-8 text-white text-sm font-medium">
          <li><a href="#katalog" className="hover:text-cyan-400 transition">Katalog</a></li>
          <li><a href="#tentang" className="hover:text-cyan-400 transition">Tentang Kami</a></li>
          <li><a href="#testimoni" className="hover:text-cyan-400 transition">Testimoni</a></li>
          <li><a href="#kontak" className="hover:text-cyan-400 transition">Kontak</a></li>
        </ul>
        <a href="https://wa.me/628129442914" target="_blank" className="hidden md:block bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
          Hubungi Kami
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white focus:outline-none">
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-blue-900 px-4 pb-4 w-full">
          <ul className="flex flex-col gap-4 text-white text-sm font-medium pt-4">
            <li><a href="#katalog" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Katalog</a></li>
            <li><a href="#tentang" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Tentang Kami</a></li>
            <li><a href="#testimoni" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Testimoni</a></li>
            <li><a href="#kontak" onClick={() => setMenuOpen(false)} className="hover:text-cyan-400 transition">Kontak</a></li>
          </ul>
          <a href="https://wa.me/628129442914" target="_blank" className="mt-4 block text-center bg-cyan-500 hover:bg-cyan-600 text-white text-sm font-semibold px-5 py-2 rounded-full transition">
            Hubungi Kami
          </a>
        </div>
      )}
    </nav>
  );
}