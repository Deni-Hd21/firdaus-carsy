import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

// GET
export async function GET(_, { params }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const data = await prisma.testimoni.findUnique({
      where: { id: parsedId },
    });

    if (!data) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

// PUT
export async function PUT(req, { params }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();
    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: "Data kosong" }, { status: 400 });
    }

    const { nama, pesan, bintang, kota, mobil, foto_url } = body;

    const data = await prisma.testimoni.update({
      where: { id: parsedId },
      data: { nama, pesan, bintang, kota, mobil, foto_url },
    });

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Data tidak ditemukan atau invalid" },
        { status: 400 }
      );
    }

    return NextResponse.json({ error: "Gagal update data" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(_, { params }) {
  try {
    const { id } = await params;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
    }

    const existing = await prisma.testimoni.findUnique({
      where: { id: parsedId },
    });

    if (!existing) {
      return NextResponse.json({ error: "Data tidak ditemukan" }, { status: 404 });
    }

    await prisma.testimoni.delete({
      where: { id: parsedId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menghapus data" }, { status: 500 });
  }
}