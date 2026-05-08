import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const data = await prisma.fAQ.findMany({
    where: { aktif: true },
    orderBy: { urutan: "asc" },
  });
  return NextResponse.json({ data });
}

export async function POST(req) {
  const body = await req.json();
  const data = await prisma.fAQ.create({ data: body });
  return NextResponse.json({ data });
}