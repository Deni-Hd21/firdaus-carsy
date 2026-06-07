import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const revalidate = 0;

export const metadata = {
  title: "Artikel | Firdaus Carsy - Kredit Mobil Syariah",
  description: "Artikel dan tips seputar kredit mobil syariah, jual beli mobil bekas, dan otomotif dari Firdaus Carsy Karawang.",
};

export default async function HalamanArtikel() {
  const artikels = await prisma.artikel.findMany({
    where: { status: "published" },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      judul: true,
      slug: true,
      excerpt: true,
      cover_url: true,
      createdAt: true,
    },
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900">Artikel & Tips</h1>
            <p className="text-gray-500 mt-3 text-lg">Informasi seputar kredit mobil syariah dan otomotif</p>
          </div>

          {artikels.length === 0 ? (
            <p className="text-center text-gray-400 py-20">Belum ada artikel.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {artikels.map((item) => (
                <Link key={item.id} href={`/artikel/${item.slug}`} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition border border-gray-100">
                  {item.cover_url ? (
                    <img src={item.cover_url} alt={item.judul} className="w-full aspect-video object-cover group-hover:scale-105 transition duration-300" /> ) : (
                      <div className="w-full aspect-video bg-gradient-to-br from-cyan-50 to-blue-100 flex items-center justify-center">                      <span className="text-4xl">📝</span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-gray-400 text-xs mb-2">
                      {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                    </p>
                    <h2 className="text-gray-900 font-bold text-lg group-hover:text-cyan-600 transition line-clamp-2">{item.judul}</h2>
                    {item.excerpt && (
                      <p className="text-gray-500 text-sm mt-2 line-clamp-3">{item.excerpt}</p>
                    )}
                    <span className="inline-block mt-4 text-cyan-600 text-sm font-semibold group-hover:underline">
                      Baca selengkapnya →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}