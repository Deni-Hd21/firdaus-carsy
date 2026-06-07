import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const data = await prisma.artikel.findMany({
    where: status ? { status } : {},
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      judul: true,
      slug: true,
      excerpt: true,
      cover_url: true,
      status: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const data = await prisma.artikel.create({ data: body });
  return NextResponse.json({ data });
}