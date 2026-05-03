import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata = {
  metadataBase: new URL("https://firdaus-carsy.id"),

  title: "Firdaus Carsy - Jual Beli Mobil Bekas | Kredit Syari'ah Karawang",
  description:
    "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba. Melayani Karawang, Cikampek, Purwakarta, Bandung, dan Jabodetabek. Hubungi 0821-2517-1716.",

  keywords: [
    "jual mobil bekas",
    "kredit mobil syariah",
    "mobil bekas",
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
    title: "Firdaus Carsy - Kredit Mobil Syari'ah Karawang",
    description:
      "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    url: "https://firdaus-carsy.id",
    siteName: "Firdaus Carsy",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logonav.webp",
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
      "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    images: ["/logonav.webp"],
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
              url: "https://firdaus-carsy.id",
              telephone: "082125171716",
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
  title: "Firdaus Cars - Jual Beli Mobil Bekas | Kredit Syari'ah Karawang",
  description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba. Melayani Karawang, Cikampek, Purwakarta, Bandung, dan Jabodetabek. Hubungi 0821-2517-1716.",
  keywords: "jual mobil bekas karawang, kredit mobil syariah, mobil bekas karawang, cicilan syariah tanpa riba, firdaus cars",
  authors: [{ name: "Firdaus Cars" }],
  openGraph: {
    title: "Firdaus Cars - Kredit Mobil Syari'ah Karawang",
    description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    url: "https://firdauscars.com",
    siteName: "Firdaus Cars",
    locale: "id_ID",
    type: "website",
    images: [{ url: "/logonav.webp", width: 800, height: 600, alt: "Firdaus Cars Syariah" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Firdaus Cars - Kredit Mobil Syari'ah Karawang",
    description: "Jual beli mobil bekas berkualitas dengan sistem kredit syari'ah tanpa riba di Karawang.",
    images: ["/logonav.webp"],
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