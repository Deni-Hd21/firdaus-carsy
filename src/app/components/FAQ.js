import { prisma } from "@/lib/prisma";
import FAQClient from "./FAQClient";

export const revalidate = 0;

export default async function FAQ() {
  const faqs = await prisma.fAQ.findMany({
    where: { aktif: true },
    orderBy: { urutan: "asc" },
  });

  return (
    <section id="faq" className="bg-slate-900 py-20 px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">FAQ</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Pertanyaan yang Sering Ditanyakan</h2>
          <p className="mt-4 max-w-xl mx-auto text-slate-400">Temukan jawaban atas pertanyaan umum seputar kredit syari'ah dan layanan Firdaus Carsy.</p>
        </div>

        {faqs.length > 0 ? (
          <FAQClient faqs={faqs} />
        ) : (
          <p className="text-center text-gray-500">Belum ada FAQ.</p>
        )}

        <div className="text-center mt-10">
          <a href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi mengenai kredit mobil syariah" target="_blank" className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-full transition text-lg">
            💬 Tanyakan Via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}