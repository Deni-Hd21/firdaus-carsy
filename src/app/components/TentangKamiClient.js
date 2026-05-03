"use client";
import { motion } from "framer-motion";
import TentangSlider from "./TentangSlider";

export default function TentangKamiClient({ fotos }) {

  const cityGroups = [
    {
      island: "Sumatera",
      cities: ["Medan", "Pekanbaru", "Batam", "Palembang"],
    },
    {
      island: "Jawa",
      cities: [
        "Jakarta Selatan",
        "Jakarta Utara",
        "Sunter",
        "BSD",
        "Tangerang",
        "Bekasi",
        "Karawang",
        "Bogor",
        "Bandung",
        "Sidoarjo",
        "Surabaya",
        "Malang",
      ],
    },
    {
      island: "Kalimantan",
      cities: ["Pontianak", "Balikpapan", "Samarinda"],
    },
    {
      island: "Sulawesi",
      cities: ["Makassar", "Kendari"],
    },
  ];

  const features = [
    {
      icon: "/icon/murni-jual-beli.svg",
      title: "Murni Jual Beli",
      description: "Kami menawarkan sistem transaksi yang benar-benar murni jual beli tanpa biaya tersembunyi. Setiap transaksi dilakukan dengan prinsip kejujuran dan transparansi penuh sesuai dengan syariat Islam.",
      bgColor: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-500",
    },
    {
      icon: "/icon/dp15.svg",
      title: "DP Mulai dari 15%",
      description: "Kami memberikan fleksibilitas dengan DP mulai dari 15% untuk memudahkan Anda memiliki mobil impian. Semakin kecil DP berarti lebih ringan beban awal Anda.",
      bgColor: "from-cyan-400 to-cyan-500",
      iconBg: "bg-cyan-400",
    },
    {
      icon: "/icon/angsuran-5thn.svg",
      title: "Angsuran Maksimal 5 Tahun",
      description: "Kami menyediakan opsi angsuran dengan tenor hingga maksimal 5 tahun, sehingga Anda dapat merencanakan pembayaran sesuai dengan kemampuan finansial Anda.",
      bgColor: "from-yellow-400 to-yellow-500",
      iconBg: "bg-yellow-400",
    },
    {
      icon: "/icon/tanpa-wakalah.svg",
      title: "Tanpa Wakalah",
      description: "Kami tidak membebani Anda dengan biaya wakalah, sehingga Anda dapat fokus pada kepemilikan kendaraan tanpa beban biaya tambahan yang tidak perlu.",
      bgColor: "from-red-400 to-red-500",
      iconBg: "bg-red-500",
    },
    {
      icon: "/icon/tanpa-admin.svg",
      title: "Tanpa Biaya Admin",
      description: "Tidak ada biaya administrasi yang akan kami tarik dari Anda. Proses administratif berjalan lancar tanpa membebani kantong Anda dengan biaya tersembunyi.",
      bgColor: "from-green-400 to-green-500",
      iconBg: "bg-green-500",
    },
    {
      icon: "/icon/tanpa-provisi.svg",
      title: "Tanpa Provisi",
      description: "Tidak ada biaya provisi yang harus Anda bayar. Kami berkomitmen memberikan harga paling kompetitif dan terjangkau tanpa charge tambahan.",
      bgColor: "from-indigo-400 to-indigo-500",
      iconBg: "bg-indigo-600",
    },
    {
      icon: "/icon/tanpa-sita.svg",
      title: "Tanpa Sita",
      description: "Kami berkomitmen untuk tidak melakukan penyitaan kendaraan Anda. Hubungan dengan pelanggan dibangun atas dasar kepercayaan dan kerjasama yang saling menguntungkan.",
      bgColor: "from-pink-400 to-pink-500",
      iconBg: "bg-pink-500",
    },
    {
      icon: "/icon/tanpa-denda.svg",
      title: "Tanpa Denda",
      description: "Kami tidak mengenakan denda tambahan untuk keterlambatan pembayaran. Kami memahami kesulitan finansial dan siap berdiskusi untuk solusi terbaik.",
      bgColor: "from-orange-400 to-orange-500",
      iconBg: "bg-orange-500",
    },
    {
      icon: "/icon/tanpa-pinalti.svg",
      title: "Tanpa Pinalti",
      description: "Tidak ada denda pinalti dalam setiap transaksi dengan kami. Sistem pembayaran kami dirancang untuk memberikan kenyamanan maksimal bagi pelanggan.",
      bgColor: "from-teal-400 to-teal-500",
      iconBg: "bg-teal-500",
    },
    {
      icon: "/icon/tanpa-asuransi.svg",
      title: "Tanpa Asuransi",
      description: "Kami memberikan pilihan tanpa asuransi wajib, sehingga Anda dapat mengelola risiko sesuai kebutuhan pribadi Anda.",
      bgColor: "from-purple-400 to-purple-500",
      iconBg: "bg-purple-500",
    },
  ];

   return (
    <div className="space-y-16">
      {/* Bagian Hero dengan Slider dan Deskripsi */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">

        {/* FIX: ganti x: -60 → y: 40 agar tidak overflow ke kiri di mobile */}
        <motion.div
          className="flex-1 w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <TentangSlider fotos={fotos} />
        </motion.div>

        {/* FIX: ganti x: 60 → y: 40 agar tidak overflow ke kanan di mobile */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Tentang Kami</span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Kredit Mobil Bekas <br />
            <span className="text-cyan-400">Syari'ah di Karawang</span>
          </h2>

          <p className="mt-6 leading-relaxed text-base md:text-lg">
            Firdaus Carsy adalah penyedia layanan kredit mobil bekas berbasis syariah terpercaya di Karawang yang berfokus pada kemudahan, transparansi, dan kehalalan dalam setiap proses transaksi. Kami membantu masyarakat memiliki kendaraan tanpa riba, tanpa denda, dan tanpa biaya tersembunyi, dengan proses yang cepat serta sesuai prinsip syariah. Melayani berbagai wilayah di Pulau Jawa, Sumatra, dan Kalimantan.
          </p>

          <p className="mt-4 leading-relaxed text-base md:text-lg">
            Firdaus Carsy tidak terbatas pada stok kendaraan tertentu. Kami memberikan kebebasan bagi pelanggan untuk memilih mobil dari mana saja, kemudian kami bantu memfasilitasi proses pembiayaan dengan skema syariah yang jelas dan transparan. Dipimpin oleh Aldi, kami berkomitmen memberikan pelayanan profesional dengan pendekatan yang jujur dan solutif.
          </p>
        </motion.div>
      </div>

      {/* ✅ KOTA (SUDAH DIUPDATE) */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
            Kota yang Tercover Layanan Kami
          </span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
            <span className="text-white"><h1>Firdaus Carsy</h1></span>
          </h3>
        </div>

        <div className="space-y-12">
          {cityGroups.map((group, i) => (
            <div key={i}>
              <h3 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
                {group.island}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols- md:grid-cols-4 gap-3">
                {group.cities.map((city, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="group relative bg-slate-800 rounded-xl p-2 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 text-center"
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-5 transition duration-300"></div>

                    <h4 className="relative z-10 text-white font-semibold group-hover:text-cyan-400 transition">
                      {city}
                    </h4>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ✅ KEUNGGULAN KAMI (100% ASLI, TIDAK DIUBAH) */}
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">Keunggulan Kami</span>
          <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
            Skema Layanan <span className="text-cyan-400">Firdaus Carsy</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 text-center md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

              <div className="relative z-10">
                <div className="flex items-center justify-center mb-4">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-20 h-20 drop-shadow-lg"
                  />
                </div>

                <h4 className="text-3xl font-bold text-white mb-3">
                  {feature.title}
                </h4>

                <p className="mt-4 leading-relaxed text-base md:text-lg">
                  {feature.description}
                </p>
              </div>

              <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/50 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>
      </div>

{/* Bagian Video */} 
<div className="max-w-7xl mx-auto w-full mt-16">
  {/*<div className="text-center mb-8">
    <span className="text-cyan-400 text-sm font-semibold uppercase tracking-widest">
      Video Kami
    </span>
    <h3 className="text-3xl md:text-4xl font-bold text-white mt-2">
      Kenal Lebih Dekat <span className="text-cyan-400">Firdaus Cars</span>
    </h3>
  </div>*/}

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    
    {/* Video 1 */}
    <div>
      <h4 className="text-white font-semibold text-lg mb-3 text-center ">
        PENJELASAN BAHAYA RIBA
      </h4>

      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 shadow-lg bg-slate-800">
        <div className="relative pt-[56.25%]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline
          >
            <source src="https://patwrieglmispxadpuhl.supabase.co/storage/v1/object/public/mobil/vidio-bayaya-riba.mp4" type="video/mp4" />
            Browser kamu tidak mendukung video.
          </video>
        </div>
      </div>
    </div>

    {/* Video 2 */}
    <div>
      <h4 className="text-white font-semibold text-lg mb-3 text-center">
        CASH DAN KREDIT BEDA HARGA, APAKAH RIBA?
      </h4>

      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 shadow-lg bg-slate-800">
        <div className="relative pt-[56.25%]">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            controls
            preload="metadata"
            playsInline
          >
            <source src="https://patwrieglmispxadpuhl.supabase.co/storage/v1/object/public/mobil/cash-kredit-beda-harga.mp4" type="video/mp4" />
            Browser kamu tidak mendukung video.
          </video>
        </div>
      </div>
    </div>

  </div>
</div>

    </div>
  );
}