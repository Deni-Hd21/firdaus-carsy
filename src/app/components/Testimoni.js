import { prisma } from "@/lib/prisma";
import TestimoniCard from "./TestimoniCard";


export const revalidate = 0;

export default async function Testimoni() {
  const testimoni = await prisma.testimoni.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section id="testimoni" className="bg-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Bukti Nyata</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Akad Serah Terima</h2>
          <p className="text-gray-200 mt-4 max-w-xl mx-auto text-base md:text-lg">Ratusan pelanggan telah mempercayakan pembelian mobil mereka kepada kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimoni.map((item, index) => (
            <TestimoniCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {testimoni.length === 0 && (
          <p className="text-center text-gray-500 mt-12">Belum ada testimoni saat ini.</p>
        )}

        <div className="text-center mt-12">
          <p className="text-gray-200 mb-4 text-base md:text-lg">Ingin menjadi pelanggan puas kami berikutnya?</p>
          <a href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi mengenai pembelian mobil" target="_blank" className="inline-block bg-cyan-400 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-full transition">
            Konsultasi Sekarang
          </a>
        </div>
      </div>
    </section>
  );
}