import { prisma } from "@/lib/prisma";
import TentangKamiClient from "./TentangKamiClient";

export const revalidate = 0;

export default async function TentangKami() {
  
  const fotos = await prisma.fotoTentang.findMany({
    where: { aktif: true },
    orderBy: { urutan: "asc" },
  });

  return (
    <section id="tentang" className="bg-slate-900 py-20 px-4">
      <TentangKamiClient fotos={fotos} />
    </section>
  );
}