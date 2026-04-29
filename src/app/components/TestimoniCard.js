"use client";
import { motion } from "framer-motion";

export default function TestimoniCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      viewport={{ once: true }}
      className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition">
      <div className="relative w-full aspect-square bg-slate-700 flex flex-col items-center justify-center gap-2">
        {item.foto_url ? (
          <img src={item.foto_url} alt={item.nama} className="w-full h-full object-cover" />
        ) : (
          <>
            <span className="text-4xl">🤝</span>
            <p className="text-slate-400 text-xs">Foto Serah Terima</p>
            <p className="text-slate-500 text-xs">{item.nama} - {item.mobil}</p>
          </>
        )}
        <div className="absolute top-3 left-3 bg-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full">
          AKAD SERAH TERIMA
        </div>
      </div>
      <div className="p-5">
        <div className="flex gap-1 mb-3">
          {[...Array(item.bintang)].map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
        </div>
        <p className="text-slate-100 text-xs font-semibold uppercase tracking-wider mb-1">{item.mobil}</p>
        <p className="text-gray-400 text-sm leading-relaxed italic">"{item.pesan}"</p>
        <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-700">
          <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-sm">
            {item.nama.charAt(0)}
          </div>
          <div>
            <p className="text-white font-semibold text-sm">{item.nama}</p>
            <p className="text-gray-500 text-xs">{item.kota}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}