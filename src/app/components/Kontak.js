"use client";
import { motion } from "framer-motion";

export default function Kontak() {
  return (
    <section id="kontak" className="bg-slate-950 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Hubungi Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Konsultasi Gratis
          </h2>
          <p className="text-gray-300 mt-4 max-w-xl mx-auto text-base md:text-lg">
            Temukan mobil impian kamu bersama kami. Tim kami siap membantu setiap saat.
          </p>
        </motion.div>

        <div className="flex justify-center">

          {/* Info Kontak */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col gap-5 w-full max-w-xl mx-auto"
        >
                      {[
              { judul: "Lokasi", isi: "Jl. Jenderal Ahmad Yani By Pass No.73, RT.04/RW.12, Karangpawitan, Kec. Karawang Bar., Karawang, Jawa Barat 41351" },
              { judul: <a href="https://wa.me/6281294412914" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">WhatsApp</a>, isi: <a href="https://wa.me/6281294412914" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-300">0812-9441-2914</a> },
              { judul: <a href="https://www.instagram.com/firdauscarsy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Instagram</a>, isi: <a href="https://www.instagram.com/firdauscarsy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-300">@firdauscarsy</a> },
              { judul: <a href="https://www.tiktok.com/@firdauscarsy" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Tiktok</a>, isi: <a href="https://www.tiktok.com/@firdauscarsy" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-300">@firdauscarsy</a> },
              { judul: <a href="https://www.facebook.com/aldi.akhmadf" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">Facebook</a>, isi: <a href="https://www.facebook.com/aldi.akhmadf" target="_blank" rel="noopener noreferrer" className="text-white hover:text-cyan-300">Aldi Akhmad Firdaus</a> },
              { judul: "Jam Operasional", isi: "Senin - Sabtu: 08.00 - 17.00 WIB" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-4 bg-slate-800 p-4 rounded-xl border border-slate-700"
              >
<div className="flex-1 text-center">
  <p className="text-cyan-400 font-semibold text-sm">{item.judul}</p>
  <p className="text-white mt-1">{item.isi}</p>
</div>
              </motion.div>
            ))}

            <a
              href="https://wa.me/6281294412914?text=Halo Pak Aldi, saya ingin konsultasi mengenai kredit mobil syariah"
              target="_blank"
              className="mt-2 block text-center bg-green-500 hover:bg-green-400 text-white font-semibold px-8 py-4 rounded-full transition text-lg"
            >
              💬 Chat WhatsApp Sekarang
            </a>
          </motion.div>

          {/* Google Maps 
          <div className="overflow-hidden rounded-2xl border border-slate-700">
            <motion.div
              initial={{ opacity: 0, y: 40 }} // ⬅️ FIX utama di sini
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full h-96"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.0!2d107.3!3d-6.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKosambi%2C+Karawang!5e0!3m2!1sid!2sid!4v1"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </motion.div>
          </div>
          */}

        </div>
      </div>
    </section>
  );
}
