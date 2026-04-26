import { prisma } from "@/lib/prisma";
import DetailMobilClient from "@/app/components/DetailMobilClient";

export const revalidate = 0;

export default async function DetailMobil({ params }) {
  const { id } = await params;
  const mobil = await prisma.mobil.findUnique({
    where: { id: parseInt(id) },
    include: {
      fotos: { orderBy: { urutan: "asc" } },
    },
  });

  if (!mobil) return <div className="text-white p-8">Mobil tidak ditemukan.</div>;

  return <DetailMobilClient mobil={mobil} />;
}