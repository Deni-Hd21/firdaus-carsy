import { prisma } from "@/lib/prisma";
import TestimoniSlider from "./TestimoniSlider";

export const revalidate = 0;

export default async function Testimoni() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section id="testimoni" className="relative py-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[url('/bg-hero-v2.0.webp')] bg-cover bg-center bg-fixed" />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Bukti Nyata
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Akad Serah Terima
          </h2>
          <p className="text-gray-300 text-base md:text-lg  mt-4 max-w-xl mx-auto">
            Ratusan pelanggan telah mempercayakan pembelian mobil mereka kepada kami.
          </p>
        </div>

        {testimoni.length > 0 ? (
          <TestimoniSlider testimoni={testimoni} />
        ) : (
          <p className="text-center text-gray-500 mt-12">
            Belum ada testimoni saat ini.
          </p>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-300 text-base md:text-lg  mb-4">
            Ingin menjadi pelanggan puas kami berikutnya?
          </p>
          <a
            href="https://wa.me/6282125171716?text=Halo Pak Aldi, saya ingin konsultasi mengenai kredit mobil syariah"
            target="_blank"
            className="inline-block bg-red-600 hover:bg-red-400 text-white font-semibold px-8 py-3 rounded-full transition"
          >
            Konsultasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}