export default function sitemap() {
  return [
    {
      url: "https://firdauscars.com",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://firdauscars.com/admin/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.1,
    },
  ];
}