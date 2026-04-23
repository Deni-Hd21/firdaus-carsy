"use client";
import { motion } from "framer-motion";

export default function TentangKami() {
  return (
    <section id="tentang" className="bg-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* Gambar */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 40 }} // ✅ FIX
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="w-full h-80 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700">
            <p className="text-slate-500 text-sm">Foto Showroom</p>
          </div>
        </motion.div>

        {/* Konten */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }} // ✅ FIX
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Showroom Mobil Bekas <br />
            <span className="text-cyan-400">Syari'ah di Karawang</span>
          </h2>

          <p className="text-gray-400 mt-6 leading-relaxed">
            Firdaus Cars adalah showroom jual beli mobil bekas terpercaya dengan sistem kredit syari'ah tanpa riba.
          </p>

          <p className="text-gray-400 mt-4 leading-relaxed">
            Dipimpin oleh Aldi, Firdaus Cars hadir sebagai solusi kepemilikan kendaraan yang halal dan transparan.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "✅", teks: "Kredit Syari'ah Tanpa Riba" },
              { icon: "🛡️", teks: "Unit Berkualitas & Terawat" },
              { icon: "📋", teks: "Surat Lengkap & Legal" },
              { icon: "🤝", teks: "Harga Transparan & Jujur" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-slate-800 px-4 py-3 rounded-xl border border-slate-700"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-white text-sm font-medium">{item.teks}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}