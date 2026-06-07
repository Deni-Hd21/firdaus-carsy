import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get("file");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const fileName = `artikel/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("mobil")
    .upload(fileName, buffer, { contentType: file.type });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: { publicUrl } } = supabase.storage
    .from("mobil")
    .getPublicUrl(fileName);

  return NextResponse.json({ url: publicUrl });
}