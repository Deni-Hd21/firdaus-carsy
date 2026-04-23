import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
const data = await prisma.mobil.findMany({
  orderBy: { createdAt: "desc" },
  include: {
    fotos: {
      orderBy: { urutan: "asc" },
    },
  },
});
  return NextResponse.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const data = await prisma.mobil.create({ data: body });
  return NextResponse.json({ data });
}