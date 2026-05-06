/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
      ],
    },
    {
      // Cache gambar, font, dan file statis selama 1 tahun
      source: "/(.*)\\.(ico|jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|otf)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Cache file JS dan CSS selama 1 tahun
      source: "/(.*)\\.(js|css)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      // Jangan cache halaman HTML
      source: "/(.*)",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=0, must-revalidate",
        },
      ],
    },
  ],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "patwrieglmispxadpuhl.supabase.co",
      },
    ],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;