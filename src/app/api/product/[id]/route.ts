import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { ProductModel } from "@/model/productModel";
import { ProductImageModel } from "@/model/ProductImage"


const productModel = new ProductModel();

// GET /api/product/[id]
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  const product = await productModel.getById(id);

  return NextResponse.json({
    success: true,
    data: product,
  });
}

// POST /api/product/[id]
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const body = await request.json();
  const imageModel = new ProductImageModel();


  const oldProduct = await productModel.getById(id);

  if (!oldProduct) {
    return NextResponse.json(
      {
        error: "ไม่พบสินค้า",
      },
      {
        status: 404,
      }
    );
  }
  const oldImages = oldProduct.images || [];

  const newImages: string[] = Array.isArray(body.images)
    ? body.images
    : [];
  // =========================
  // 2. รูปเก่าของ Product
  // =========================

  const oldImageNames = oldImages.flatMap((item) =>
    item.img_name
      .split(",")
      .map((name) => name.trim())
      .filter(Boolean)
  );

  // =========================
  // 3. หาไฟล์ที่ถูกลบ
  // =========================

  const removedImages = oldImageNames.filter(
    (oldImage) => !newImages.includes(oldImage)
  );
  console.log(
    "REMOVED IMAGES:",
    removedImages
  );



  // =========================
  // 4. ลบไฟล์จาก public/uploads/product
  // =========================

  const uploadDir = path.join(
    process.cwd(),
    "public",
    "uploads",
    "product"
  );


  for (const filename of removedImages) {
    const safeFilename = path.basename(filename);

    const filePath = path.join(
      uploadDir,
      safeFilename
    );

    try {
      await fs.unlink(filePath);

      console.log(
        "DELETE FILE SUCCESS:",
        safeFilename
      );
    } catch (error: any) {
      if (error.code === "ENOENT") {
        console.log(
          "FILE NOT FOUND:",
          safeFilename
        );
      } else {
        throw error;
      }
    }
  }
  // =========================
  // 5. Update Database
  // =========================

  const newBody = {
    name: body.product_name,
    description: body.description,
    price_cost: parseFloat(body.product_cost),
    sku: body.product_sku,
    price: body.product_price,
    image: body.product_img,
  };




  const result = await productModel.update(id, newBody);
  const newBodyMoreIMG = {
    img_name: body.images.join(",")
  };

  console.log(body.images.join(","))


  // ตัวอย่าง update หรือทำงานอื่น
  const resultImage = await imageModel.update(id, newBodyMoreIMG);

  return NextResponse.json({
    success: true,
    img_name: body.images.join(","),
    data: result,
    dataImage: resultImage
  });

}