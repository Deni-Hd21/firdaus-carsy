export default function sitemap() {
  return [
    {
      url: "https://firdauscarsy.id",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: "https://firdauscarsy.id/admin/login",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.1,
    },
  ];
}