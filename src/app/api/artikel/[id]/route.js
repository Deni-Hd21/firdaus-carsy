import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  const { id } = await params;
  const data = await prisma.artikel.findUnique({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ data });
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();
  const data = await prisma.artikel.update({
    where: { id: parseInt(id) },
    data: { ...body, updatedAt: new Date() },
  });
  return NextResponse.json({ data });
}

export async function DELETE(_, { params }) {
  const { id } = await params;
  await prisma.artikel.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ success: true });
}