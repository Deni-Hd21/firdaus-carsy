export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4">
          <div className="text-center md:text-left">
            <span className="text-blue-900 text-xl font-bold">Firdaus</span>
            <span className="text-slate-800 text-xl font-bold"> Cars</span>
            <p className="text-slate-800 text-sm mt-1">Kredit Mobil Syari'ah</p>
          </div>
          <div className="flex gap-4 text-slate-800 text-sm">
            <a href="https://instagram.com/firdauscarsy" target="_blank" className="hover:text-cyan-500 transition">Instagram</a>
            <a href="https://wa.me/6282125171716" target="_blank" className="hover:text-cyan-500 transition">WhatsApp</a>
          </div>
        </div>
        <p className="text-slate-400 text-sm text-center w-full border-t border-slate-100 pt-4">
          © 2025 Firdaus Cars Syari'ah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}