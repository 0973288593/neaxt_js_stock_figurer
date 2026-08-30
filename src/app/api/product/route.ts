import type { NextApiRequest, NextApiResponse } from "next";
// import { NextResponse } from "next/server"
import { ProductModel } from "@/model/productModel"
import { ProductImageModel } from "@/model/ProductImage"
import prisma from '@/lib/prisma';


// export async function Get(req: Request) {
//     try {
//         const { searchParams } = new URL(req.url);
//         const page = parseInt(searchParams.get('page') || '1');
//         const limit = parseInt(searchParams.get('limit') || '10');
//         const skip = (page - 1) * limit;

//         // const productModel = new ProductModel();

//         // const product = await productModel.getAll(skip, limit);
//         // const count_product = productModel.getCountAll();

//         // const data = {
//         //     product_list: product,
//         //     product_count:count_product
//         // }


//         // return NextResponse.json({ status: 200,  message: 'get_product__success' });
//          return NextResponse.json({
//             product_list: [],
//         });
//     } catch (error) {
//         return NextResponse.json({ status: 500, message: error });
//     }
// }
// app/api/product/route.ts
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = parseInt(searchParams.get('search') || ' ');
        const skip = (page - 1) * limit;
       

        const productModel = new ProductModel();

        const product = await productModel.getAll(skip, limit, search);
        const count_product = await productModel.getCountAll(search);

        const totalPages = Math.ceil(count_product / limit);

        const pagination = {
            currentPage: page,
            totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            hasNext: page < totalPages,
        };

        const data = {
            product_count: count_product || 0,
            product_list: product,
            pagination: pagination
          
        }

    return NextResponse.json(
      { data },
      { status: 200 }
    );

  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
