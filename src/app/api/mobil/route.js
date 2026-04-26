import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 6;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    prisma.mobil.findMany({
      where: { tersedia: true },
      orderBy: { createdAt: "desc" },
      include: { fotos: { orderBy: { urutan: "asc" } } },
      take: limit,
      skip,
    }),
    prisma.mobil.count({ where: { tersedia: true } }),
  ]);

  return NextResponse.json({
    data,
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}

export async function POST(req) {
  const body = await req.json();
  const data = await prisma.mobil.create({ data: body });
  return NextResponse.json({ data });
}