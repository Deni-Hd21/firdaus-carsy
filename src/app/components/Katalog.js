import { prisma } from "@/lib/prisma";
import KatalogFilter from "./KatalogFilter";

export const revalidate = 0;

export default async function Katalog() {
  const limit = 6;

  const [mobil, total] = await Promise.all([
    prisma.mobil.findMany({
      where: { tersedia: true },
      orderBy: { createdAt: "desc" },
      include: { fotos: { orderBy: { urutan: "asc" } } },
      take: limit,
      skip: 0,
    }),
    prisma.mobil.count({ where: { tersedia: true } }),
  ]);

  const totalPages = Math.ceil(total / limit);

  return (
    <section id="katalog" className="bg-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Pilihan Terbaik</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Katalog Mobil</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto">Semua unit telah melalui inspeksi ketat dan dilengkapi garansi mesin.</p>
        </div>
        <KatalogFilter mobil={mobil} totalPages={totalPages} currentPage={1} />
      </div>
    </section>
  );
}