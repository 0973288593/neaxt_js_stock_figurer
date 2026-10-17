
// import { NextRequest, NextResponse } from "next/server";
// import { supabase } from "@/lib/supabase";

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData();
//     const file = formData.get("file");
//     const name = formData.get("name");

//     if (!(file instanceof File) || file.size === 0) {
//       return NextResponse.json(
//         { message: "กรุณาเลือกไฟล์รูป" },
//         { status: 400 }
//       );
//     }

//     if (typeof name !== "string" || !name.trim()) {
//       return NextResponse.json(
//         { message: "กรุณาระบุชื่อไฟล์" },
//         { status: 400 }
//       );
//     }

//     const extension = file.name.split(".").pop() || "png";
//     const safeName = name.trim().replace(/[^a-zA-Z0-9_-]/g, "_");
//     const filePath = `${crypto.randomUUID()}-${safeName}.${extension}`;

//     const { data, error } = await supabase.storage
//       .from("product")
//       .upload(filePath, file, {
//         contentType: file.type,
//         upsert: false,
//       });

//     if (error) {
//       console.error("Supabase upload error:", error.message);

//       return NextResponse.json(
//         { message: "upload_file_not_success", error: error.message },
//         { status: 403 }
//       );
//     }

//     return NextResponse.json({
//       message: "Upload successful",
//       name: data.path,
//     });
//   } catch (error) {
//     console.error("Upload route error:", error);

//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { supabase } from "@/lib/supabase";

export const runtime = "nodejs";

const allowedTypes: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "กรุณาเลือกไฟล์รูปภาพ" },
        { status: 400 }
      );
    }

    const extension = allowedTypes[file.type];

    if (!extension || file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: "รองรับ JPG, PNG, WebP ขนาดไม่เกิน 5 MB" },
        { status: 400 }
      );
    }

    const filename = `${randomUUID()}${extension}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    // Development: เก็บใน public/uploads/product
    if (process.env.NODE_ENV === "development") {
      const uploadDir = path.join(
        process.cwd(),
        "public",
        "uploads",
        "product"
      );

      await mkdir(uploadDir, { recursive: true });
      await writeFile(path.join(uploadDir, filename), buffer);

      // return NextResponse.json({
      //   image: `/uploads/product/${filename}`,
      // });
      return NextResponse.json({
        message: "Upload successful",
        name: filename,
      });
    }

    // Production: เก็บใน Supabase Storage
    // const supabaseUrl = process.env.SUPABASE_URL;
    // const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // if (!supabaseUrl || !serviceKey) {
    //   return NextResponse.json(
    //     { error: "Missing Supabase server configuration" },
    //     { status: 500 }
    //   );
    // }

    // const supabase = createClient(supabaseUrl, serviceKey);

    const { error } = await supabase.storage
      .from("product")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase upload error:", error.message);
      return NextResponse.json(
        { error: "อัปโหลดรูปไม่สำเร็จ" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: "Upload successful",
      name: filename,
    });



  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปโหลด" },
      { status: 500 }
    );
  }
}

