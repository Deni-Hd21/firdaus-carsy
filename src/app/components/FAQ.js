"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [

  {
  pertanyaan: "Apa itu Firdaus Carsy?",
  jawaban:
    "Firdaus Carsy adalah penyedia layanan kredit mobil bekas berbasis syariah terpercaya di Karawang yang berfokus pada kemudahan, transparansi, dan kehalalan dalam setiap proses transaksi. Kami membantu masyarakat memiliki kendaraan tanpa riba, tanpa denda, dan tanpa biaya tersembunyi, dengan proses yang cepat serta sesuai prinsip syariah. Melayani berbagai wilayah di Pulau Jawa, Sumatra, dan Kalimantan.\n\nDengan komitmen pada kejujuran dan pelayanan terbaik, Firdaus Carsy menyediakan skema kredit tanpa denda, tanpa provisi, dan tanpa biaya tersembunyi. Kami memahami kebutuhan pelanggan akan kendaraan yang terjangkau dan proses yang cepat, sehingga setiap transaksi dirancang agar nyaman, jelas, dan dapat dipercaya."
},
{
  pertanyaan: "Apa keunggulan membeli mobil di Firdaus Carsy?",
  jawaban:
    "Firdaus Carsy menawarkan berbagai keunggulan yang membuat pengalaman membeli mobil menjadi lebih baik:\n\n1. Sistem Syariah: Kami menggunakan akad jual beli (murabahah) yang sesuai dengan prinsip syariah, tanpa bunga (riba), sehingga memberikan ketenangan bagi pelanggan.\n\n2. Proses Mudah dan Cepat: Dengan proses yang sederhana dan cepat, pelanggan dapat memiliki mobil impian mereka tanpa ribet.\n\n3. Transparansi: Harga sudah disepakati di awal dan tidak berubah selama masa cicilan, sehingga tidak ada biaya tersembunyi atau kejutan di kemudian hari.\n\n4. Pelayanan Ramah: Tim kami siap membantu dengan konsultasi gratis untuk menemukan mobil yang sesuai dengan kebutuhan dan budget Anda.\n\n5. Pilihan Kendaraan Berkualitas: Kami menyediakan berbagai pilihan mobil bekas yang telah melalui pemeriksaan kualitas untuk memastikan kepuasan pelanggan."
},
{
    pertanyaan: "Apa itu kredit syari'ah tanpa riba dan bedanya dengan kredit biasa?",
    jawaban:
      "Kredit syari'ah menggunakan akad murabahah (jual beli), bukan sistem bunga (riba). Harga sudah disepakati di awal dan tidak berubah selama masa cicilan, sehingga lebih transparan dan sesuai prinsip Islam. Berbeda dengan kredit konvensional yang menggunakan bunga yang bisa berfluktuasi.",
  },
{
    pertanyaan: "Bagaimana alur kredit dari awal sampai selesai di Firdaus Carsy?",
    jawaban:
      "Proses yang dilakukan dari awal sampai selesai adalah sebagai berikut:\n\n 1. Konsumen mencari unit mobil sendiri (Bisa dari marketplace, showroom, atau kenalan).\n 2. Infokan spesifikasi & harga unit ke kami, Kirim detail seperti:\n• Merk & tipe mobil\n• Tahun\n• Harga\n• Lokasi unit.\n3. Kami buatkan estimasi kredit syari’ah Simulasi meliputi:\n• DP\n• Cicilan per bulan\n• Tenor pembiayaan.\n 4. Jika cocok dengan simulasi & unit Lanjut ke proses pengajuan.\n 5. Pengisian data awal konsumen.\n 6. Verifikasi data (BI Checking / SLIK).\n 7. Survey oleh pihak analis.\n8. Melengkapi dokumen persyaratan\n 9. PO pembelian unit diterbitkan.\n 10. Penyerahan DP / tanda keseriusan ke kami.\n 11. Penandatanganan dokumen akad syari’ah.\n 12. Kami membeli unit secara CASH dari penjual.\n 13. Akad serah terima unit ke konsumen.\n ✅ Estimasi proses: 3–7 hari kerja setelah pengajuan lengkap.",
},
{
    pertanyaan: "Bagaimana teknis jual beli di Firdaus Carsy?",
    jawaban:
      "Yang membedakan transaksi adalah :\n\nBarang dibeli lebih dahulu\n1. Ada serah terima yang jelas (objek, kunci, dokumen).\n2. Dijual kepada konsumen."
},
{
    pertanyaan: "Bagaimana cara skema akad Firdaus Carsy bekerja?",
    jawaban:
      "Skema akad Firdaus Carsy didasarkan pada prinsip Murni Jual Beli, di mana kendaraan akan dibeli dan kemudian dijual kembali kepada Anda dengan harga yang disepakati."
},
{
    pertanyaan: "Bagaimana teknis serah terima barang melalui skema pengajuan di Firdaus Carsy?",
    jawaban:
      "• Untuk motor dilakukan serah terima langsung di dealer/di lokasi motor tersebut, dengan mengeluarkan motor dari gudangnya, dan dilakukan serah terima kunci.\n• Untuk mobil dilakukan serah terima langsung di dealer/di lokasi mobil tersebut, dengan mengeluarkan mobil dari gudangnya, dan dilakukan serah terima kunci."
},
{
    pertanyaan: "Apakah saya perlu membayar biaya admin?",
    jawaban:
      "Tidak ada biaya admin. Firdaus Carsy tidak membebankan biaya admin tambahan kepada pelanggan."
},
{
    pertanyaan: "Bagaimana bisa jual beli tidak pakai denda?",
    jawaban:
      "Denda merupakan instrumen yang dikembangkan oleh berbagai Lembaga Keuangan dengan alasan memberikan efek jera, padahal dalam Islam, praktek denda dilarang karena merupakan bentuk dari riba jahiliah. Dalam Islam justru jika orang yang berhutang belum mampu membayar hutangnya, maka ia diberikan waktu tangguh bukannya didenda (lihat Al Baqarah: 280). Lain halnya jika seseorang sengaja tidak mau membayar, maka si pemberi hutang boleh mengadukan ke Ulil Amri atau pemerintah agar ia diadili."
},
{
    pertanyaan: "Apa yang dimaksud dengan DP mulai dari 15%?",
    jawaban:
      "DP (Down Payment) mulai dari 15% berarti pelanggan hanya perlu membayar 15% dari harga mobil yang akan dibeli sebagai uang muka."
},
{
    pertanyaan: "Ada di kota mana saja Firdaus Carsy?",
    jawaban:
      "Firdaus Carsy melayani pelanggan dari Karawang, Palembang, Bandung, Sunter, Jakarta Selatan, Makassar, Bekasi, Surabaya, Malang, Medan, Balikpapan, Bogor, Kendari, Pontianak, Batam, Pekanbaru, Bsd, Jakarta Utara, Samarinda, Sidoarjo, Tangerang."
},

];

function FAQItem({ item, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      viewport={{ once: true }}
      className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-800/50 backdrop-blur-sm"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
      >
        <span className="text-white font-semibold text-base md:text-lg group-hover:text-cyan-400 transition-colors duration-600">
          {item.pertanyaan}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 group-hover:bg-cyan-500/20 border border-slate-600 group-hover:border-cyan-500 flex items-center justify-center text-cyan-400 transition-colors duration-300 text-lg leading-none"
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5">
              <div className="h-px bg-slate-700 mb-4" />
              <p className="text-slate-300 leading-relaxed text-base md:text-lg whitespace-pre-line">
                {item.jawaban}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-slate-900 py-20 px-4 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="mt-4 max-w-xl mx-auto text-base md:text-lg">
            Temukan jawaban atas pertanyaan umum seputar kredit syari'ah dan
            layanan Firdaus Carsy.
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="flex flex-col gap-3">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* CTA bawah */}
        <motion.p
          className="text-center text-white text-base md:text-lg mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Masih ada pertanyaan lain?{" "}
                      <a
              href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi mengenai pembelian mobil"
              target="_blank"
              className="mt-2 block text-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-full transition text-lg"
            >
              💬 Tanyakan Via WhatsApp
            </a>
            {/* <a
          <a
            href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin bertanya mengenai Firdaus Cars"
            target="_blank"
            className="text-cyan-400 hover:text-cyan-300 font-semibold underline underline-offset-2 transition-colors"
          >
            Tanya langsung via WhatsApp →
          </a>*/}
        </motion.p>
      </div>
    </section>
  );
}
