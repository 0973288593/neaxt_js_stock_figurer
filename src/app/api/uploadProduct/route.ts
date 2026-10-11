
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const name = formData.get("name");

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { message: "กรุณาเลือกไฟล์รูป" },
        { status: 400 }
      );
    }

    if (typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { message: "กรุณาระบุชื่อไฟล์" },
        { status: 400 }
      );
    }

    const extension = file.name.split(".").pop() || "png";
    const safeName = name.trim().replace(/[^a-zA-Z0-9_-]/g, "_");
    const filePath = `${crypto.randomUUID()}-${safeName}.${extension}`;

    const { data, error } = await supabase.storage
      .from("product")
      .upload(filePath, file, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error.message);

      return NextResponse.json(
        { message: "upload_file_not_success", error: error.message },
        { status: 403 }
      );
    }

    return NextResponse.json({
      message: "Upload successful",
      name: data.path,
    });
  } catch (error) {
    console.error("Upload route error:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
