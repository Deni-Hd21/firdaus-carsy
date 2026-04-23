import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const testimoniId = formData.get("testimoniId");

    // validasi dasar
    if (!file || !testimoniId) {
      return NextResponse.json(
        { error: "File dan testimoniId wajib ada" },
        { status: 400 }
      );
    }

    // validasi tipe file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File harus berupa gambar" },
        { status: 400 }
      );
    }

    // validasi size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Ukuran file maksimal 2MB" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const fileName = `${testimoniId}/${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("testimoni")
      .upload(fileName, buffer, {
        contentType: file.type,
      });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Gagal upload file" },
        { status: 500 }
      );
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("testimoni").getPublicUrl(fileName);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Terjadi kesalahan server" },
      { status: 500 }
    );
  }
}