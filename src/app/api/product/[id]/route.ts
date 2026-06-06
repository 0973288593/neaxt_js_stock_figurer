import { NextResponse } from "next/server";
import { ProductModel } from "@/model/productModel"
import { ProductImageModel } from "@/model/ProductImage"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
    const { id } = params;

    const productModel = new ProductModel();
    const product_detail = await productModel.getById(id);

    return NextResponse.json({
        success: true,
        data: product_detail,
    });
}