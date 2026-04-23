import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET ALL
export async function GET() {
  try {
    const data = await prisma.testimoni.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// CREATE
export async function POST(req) {
  try {
    const body = await req.json();

    // validasi sederhana
    const { nama, pesan, bintang } = body;

    if (!nama || !pesan) {
      return NextResponse.json(
        { error: "Nama dan pesan wajib diisi" },
        { status: 400 }
      );
    }

    if (bintang && (bintang < 1 || bintang > 5)) {
      return NextResponse.json(
        { error: "Bintang harus antara 1 sampai 5" },
        { status: 400 }
      );
    }

    const data = await prisma.testimoni.create({
      data: body,
    });

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: "Gagal menambahkan data" },
      { status: 500 }
    );
  }
}