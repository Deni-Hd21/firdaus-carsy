import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const { id } = await params;
  await prisma.fotoTentang.delete({
    where: { id: parseInt(id) },
  });
  return NextResponse.json({ success: true });
}