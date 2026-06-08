import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export const revalidate = 0;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const artikel = await prisma.artikel.findUnique({ where: { slug } });
  if (!artikel) return {};
  return {
    title: `${artikel.judul} | Firdaus Carsy`,
    description: artikel.meta_desc || artikel.excerpt || "",
    openGraph: {
      title: artikel.judul,
      description: artikel.meta_desc || artikel.excerpt || "",
      images: artikel.cover_url ? [artikel.cover_url] : [],
    },
  };
}

export default async function DetailArtikel({ params }) {
  const { slug } = await params;

  const artikel = await prisma.artikel.findUnique({
    where: { slug, status: "published" },
  });

  if (!artikel) notFound();

  // Ambil rekomendasi artikel lain
  const rekomendasi = await prisma.artikel.findMany({
    where: {
      status: "published",
      NOT: { slug },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      judul: true,
      slug: true,
      excerpt: true,
      cover_url: true,
      createdAt: true,
    },
  });

  const wordCount = artikel.konten.replace(/<[^>]*>/g, "").split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 pt-24 pb-16">






        {/* Layout desktop: konten kiri, rekomendasi kanan */}
        <div className="max-w-6xl mx-auto px-4 mt-10">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* Konten Utama */}
            <div className="flex-1 min-w-0">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/" className="hover:text-cyan-600 transition">Beranda</Link>
                <span>›</span>
                <Link href="/artikel" className="hover:text-cyan-600 transition">Artikel</Link>
                <span>›</span>
                <span className="text-gray-600 line-clamp-1">{artikel.judul}</span>
              </div>

              {/* Header */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{artikel.judul}</h1>

              <div className="flex items-center gap-4 mt-4 text-gray-400 text-sm">
                <span>📅 {new Date(artikel.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}</span>
                <span>⏱ {readTime} menit baca</span>
              </div>

              {artikel.excerpt && (
                <p className="mt-6 text-lg text-gray-600 leading-relaxed border-l-4 border-cyan-400 pl-4 italic">{artikel.excerpt}</p>
              )}

              {/* Cover — rasio 16:9 konsisten */}
              {artikel.cover_url && (
                <div className="w-full px-0 md:px-0 lg:px-8 xl:px-16">
                  {/*md:px-8 lg:px-16 xl:px-32*/}
                  <div className="w-full aspect-video overflow-hidden md:rounded-2xl">
                    <img src={artikel.cover_url} alt={artikel.judul} className="w-full h-full object-cover object-center" />
                  </div>
                </div>
              )}

              {/* Konten Artikel */}
              <div
                className="mt-8 max-w-none artikel-konten"
                dangerouslySetInnerHTML={{ __html: artikel.konten }}
              />

              {/* CTA */}
              <div className="mt-12 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-100">
                <h3 className="text-gray-900 font-bold text-xl">Tertarik dengan Kredit Mobil Syariah?</h3>
                <p className="text-gray-600 mt-2">Konsultasi gratis dengan tim Firdaus Carsy sekarang!</p>
                <a href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi kredit mobil syariah" target="_blank" className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full transition">
                  💬 Konsultasi via WhatsApp
                </a>
              </div>

              {/* Rekomendasi Mobile */}
              {rekomendasi.length > 0 && (
                <div className="lg:hidden mt-12">
                  <h3 className="text-gray-900 font-bold text-xl mb-4">Artikel Lainnya</h3>
                  <div className="flex flex-col gap-4">
                    {rekomendasi.map((item) => (
                      <Link key={item.slug} href={`/artikel/${item.slug}`} className="flex gap-3 group">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.judul} className="w-32 aspect-video object-cover rounded-xl shrink-0" />
                        ) : (
                          <div className="w-32 aspect-video bg-cyan-50 rounded-xl shrink-0 flex items-center justify-center text-2xl">📝</div>
                        )}
                        <div>
                          <p className="text-gray-900 font-semibold text-sm group-hover:text-cyan-600 transition line-clamp-2">{item.judul}</p>
                          <p className="text-gray-400 text-xs mt-1">
                            {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Kembali */}
              <div className="mt-8">
                <Link href="/artikel" className="text-cyan-600 hover:underline text-sm">
                  ← Kembali ke daftar artikel
                </Link>
              </div>
            </div>

            {/* Sidebar Rekomendasi Desktop */}
            {rekomendasi.length > 0 && (
              <div className="hidden lg:block w-72 shrink-0">
                <div className="sticky top-24">
                  <h3 className="text-gray-900 font-bold text-lg mb-4 pb-2 border-b border-gray-100">Artikel Lainnya</h3>
                  <div className="flex flex-col gap-5">
                    {rekomendasi.map((item) => (
                      <Link key={item.slug} href={`/artikel/${item.slug}`} className="group">
                        {item.cover_url ? (
                          <img src={item.cover_url} alt={item.judul} className="w-full aspect-video object-cover rounded-xl mb-2 group-hover:opacity-90 transition" />
                        ) : (
                          <div className="w-full aspect-video bg-cyan-50 rounded-xl mb-2 flex items-center justify-center text-3xl">📝</div>
                        )}
                        <p className="text-gray-900 font-semibold text-sm group-hover:text-cyan-600 transition line-clamp-2">{item.judul}</p>
                        <p className="text-gray-400 text-xs mt-1">
                          {new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}
                        </p>
                      </Link>
                    ))}
                  </div>

                  {/* CTA Sidebar */}
                  <div className="mt-6 bg-cyan-50 rounded-2xl p-4 border border-cyan-100">
                    <p className="text-gray-900 font-semibold text-sm">Mau kredit mobil syariah?</p>
                    <a href="https://wa.me/6281294412914" target="_blank" className="inline-block mt-3 w-full text-center bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-full transition">
                      💬 Hubungi Kami
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}