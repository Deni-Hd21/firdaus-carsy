import { prisma } from "@/lib/prisma";
import { motion } from "framer-motion";
import KatalogCard from "./KatalogCard";

export default async function Katalog() {
const mobil = await prisma.mobil.findMany({
  where: { tersedia: true },
  orderBy: { createdAt: "desc" },
  include: {
    fotos: {
      orderBy: { urutan: "asc" },
    },
  },
});

  return (
    <section id="katalog" className="bg-slate-950 pt-12 pb-15 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Pilihan Terbaik
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Katalog Mobil
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">
            Semua unit telah melalui inspeksi ketat dan dilengkapi garansi mesin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mobil.map((item, index) => (
            <KatalogCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {mobil.length === 0 && (
          <p className="text-center text-gray-500 mt-12">
            Belum ada unit tersedia saat ini.
          </p>
        )}
      </div>
    </section>
  );
}