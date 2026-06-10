import { prisma } from "@/lib/prisma";

export default async function sitemap() {
  const baseUrl = "https://firdauscarsy.id";

  // Static pages
  const pages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mobil`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  try {
    // Fetch published articles
    const articles = await prisma.artikel.findMany({
      where: { status: "published" },
      select: { slug: true, updatedAt: true },
    });

    articles.forEach((article) => {
      pages.push({
        url: `${baseUrl}/artikel/${article.slug}`,
        lastModified: article.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    });

    // Fetch all cars
    const mobils = await prisma.mobil.findMany({
      select: { id: true, updatedAt: true },
    });

    mobils.forEach((mobil) => {
      pages.push({
        url: `${baseUrl}/mobil/${mobil.id}`,
        lastModified: mobil.updatedAt,
        changeFrequency: "weekly",
        priority: 0.7,
      });
    });
  } catch (error) {
    console.error("Error fetching data for sitemap:", error);
  }

  return pages;
}
