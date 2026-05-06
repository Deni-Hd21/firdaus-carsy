"use client";

export default function TestimoniCard({ item }) {
  return (
    <div className="w-80 shrink-0 bg-slate-800/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-400 transition">
<div className="mb-1 mt-1 flex justify-center">
  <div className=" text-cyan-400 text-[14px] font-bold px-3 py-1 rounded-full tracking-wide">
    AKAD SERAH TERIMA
  </div>
</div>
      {/* Foto */}
<div className="relative mr-3 ml-3 border border-slate-600 rounded-2xl aspect-video bg-slate-700 flex items-center justify-center">
  {item.foto_url ? (
    <img
      src={item.foto_url}
      alt={item.nama}
      className="max-w-full rounded-2xl border-slate-600 max-h-full object-contain"
      loading="lazy"
    />
  ) : (
    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
      <span className="text-4xl">🤝</span>
      <p className="text-slate-400 text-xs">Foto Serah Terima</p>
    </div>
  )}
</div>

      {/* Info */}
      <div className="p-5">

        <div className="flex gap-1 mb-3">
          {[...Array(item.bintang)].map((_, i) => (
            <span key={i} className="text-yellow-500">★</span>
          ))}
        </div>

        <p className="text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
          {item.mobil}
        </p>

        <p className="text-white text-sm leading-relaxed italic line-clamp-3">
          "{item.pesan}"
        </p>

        <div className="mt-4 flex items-center gap-3 pt-4 border-t border-slate-700">
          <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white font-bold text-sm">
            {item.nama.charAt(0)}
          </div>

          <div>
            <p className="text-white font-semibold text-sm">{item.nama}</p>
            <p className="text-gray-300 text-xs">{item.kota}</p>
              {item.tanggal && (
    <p className="text-cyan-400 text-xs mt-0.5">
      {new Date(item.tanggal).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
    </p>
  )}
          </div>
        </div>
      </div>
    </div>
  );
}