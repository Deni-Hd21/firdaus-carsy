import { prisma } from "@/lib/prisma";
import HeroSlider from "./HeroSlider";
import Image from "next/image";

export const revalidate = 60; // cache 1 menit (jangan 0 lagi)

export default async function Hero() {
  const fotos = await prisma.fotoHero.findMany({
    where: { aktif: true },
    orderBy: { urutan: "asc" },
  });

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 md:pt-20 overflow-hidden">
      
      {/* Background Image (OPTIMIZED) */}
      <Image
        src="/bg-hero.webp"
        alt="Background"
        fill
        priority
        quality={80}
        className="object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/75 z-10"></div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center gap-12">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center md:text-left">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Solusi Kredit Mobil Syari'ah
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 leading-tight">
            Proses Cepat, <br />
            <span className="text-cyan-400">Aman & Terpercaya</span>
          </h1>

          <p className="text-blue-100 mt-6 text-lg max-w-lg">
            Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba. 
            Melayani Karawang, Cikampek, Purwakarta, Bandung, dan Jabodetabek.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a
              href="https://www.instagram.com/firdauscarsy"
              target="_blank"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-3 rounded-full transition text-center"
            >
              Lihat Katalog di Instagram
            </a>

            <a
              href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi kredit syariah"
              target="_blank"
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-white font-semibold px-8 py-3 rounded-full transition text-center"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-8 justify-center md:justify-start">
            <div>
              <p className="text-3xl font-bold text-white">50+</p>
              <p className="text-blue-300 text-sm">Unit Tersedia</p>
            </div>

            <div className="border-l border-blue-800 pl-8">
              <p className="text-3xl font-bold text-white">420+</p>
              <p className="text-blue-300 text-sm">Transaksi Selesai</p>
            </div>

            <div className="border-l border-blue-800 pl-8">
              <p className="text-3xl font-bold text-white">4rb+</p>
              <p className="text-blue-300 text-sm">Pengikut Instagram</p>
            </div>
          </div>
        </div>

        {/* RIGHT SLIDER */}
        <div className="w-full md:flex-1 mb-8 md:mb-0">
          <HeroSlider fotos={fotos} />
        </div>

      </div>
    </section>
  );
}
