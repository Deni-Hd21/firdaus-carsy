import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL("https://firdauscarsy.id"),

  title: "Firdaus Carsy - Solusi Kredit Mobil Syariah | Kredit Tanpa Bunga, Tanpa Riba, Proses Cepat Aman dan Terpercaya",
  description:
    "Ingin kredit mobil tanpa riba dengan cicilan tetap dan akad jelas? Firdaus Carsy hadir dengan proses cepat, aman, dan terpercaya. Melayani berbagai wilayah di Pulau Jawa, Sumatra, Sulawesi dan Kalimantan. Konsultasi sekarang! hubungi 6281294412914.",

  keywords: [
    "jual mobil bekas",
    "kredit mobil syariah",
    "kredit mobil syariah karawang",
    "cicilan syariah tanpa bunga",
    "kredit syariah tanpa riba",
    "mobil bekas dp kecil",
    "firdaus carsy",
  ],

  authors: [{ name: "Firdaus Carsy" }],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", 
  },

  openGraph: {
    title: "Firdaus Carsy - Solusi Kredit Mobil Syariah | Kredit Tanpa Bunga, Tanpa Riba, Proses Cepat Aman dan Terpercaya",
    description:
      "Tempat kredit mobil tanpa riba dengan cicilan tetap dan akad jelas. Melayani berbagai wilayah di Pulau Jawa, Sumatra, Sulawesi dan Kalimantan. Konsultasi sekarang! hubungi 6281294412914",
    url: "https://firdauscarsy.id",
    siteName: "Firdaus Carsy",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logonav-v2.webp",
        width: 800,
        height: 600,
        alt: "Firdaus Carsy Syariah",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Firdaus Carsy - Kredit Mobil Syari'ah Karawang",
    description:
      "Tempat kredit mobil tanpa riba dengan cicilan tetap dan akad jelas. Melayani berbagai wilayah di Pulau Jawa, Sumatra, Sulawesi dan Kalimantan. Konsultasi sekarang! hubungi 6281294412914.",
    images: ["/logonav-v2.webp"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body className={`${montserrat.className} bg-slate-950 text-white overflow-x-hidden`}>
        
        {/* SEO Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              name: "Firdaus Carsy",
              url: "https://firdauscarsy.id",
              telephone: "6281294412914",
              areaServed: "Karawang",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Karawang",
                addressCountry: "ID",
              },
            }),
          }}
        />

        {children}
      </body>
    </html>
  );
}

{/*import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  title: "Firdaus Carsy - Solusi Kredit Mobil Syariah | Kredit Tanpa Bunga, Tanpa Riba, Proses Cepat Aman dan Terpercaya",
  description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba. Melayani Karawang, Cikampek, Purwakarta, Bandung, dan Jabodetabek. Hubungi 0821-2517-1716.",
  keywords: "jual mobil bekas karawang, kredit mobil syariah, mobil bekas karawang, cicilan syariah tanpa riba, firdaus carsy",
  authors: [{ name: "Firdaus Carsy" }],
  openGraph: {
    title: "Firdaus Carsy - Kredit Mobil Syari'ah Karawang",
    description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    url: "https://firdauscarsy.com",
    siteName: "Firdaus Carsy",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/logonav-v2.webp", width: 800, height: 600, alt: "Firdaus Carsy Syariah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Firdaus Carsy - Kredit Mobil Syari'ah Karawang",
    description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    images: ["/logonav-v2.webp"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={montserrat.variable}>
      <body className={`${montserrat.className} bg-slate-950 text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
*/}