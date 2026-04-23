import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");
  const mobilId = formData.get("mobilId");
  const urutan = formData.get("urutan");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `${mobilId}/${Date.now()}-${file.name}`;

const { data: uploadData, error } = await supabase.storage
  .from("mobil")
  .upload(fileName, buffer, { contentType: file.type });

console.log("Upload result:", uploadData, error);

if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from("mobil")
    .getPublicUrl(fileName);

  const foto = await prisma.fotoMobil.create({
    data: {
      url: publicUrl,
      urutan: parseInt(urutan),
      mobilId: parseInt(mobilId),
    },
  });

  return NextResponse.json({ data: foto });
}