import type { NextApiRequest, NextApiResponse } from "next";
import { ProductModel } from "@/model/productModel"
import { ProductImageModel } from "@/model/ProductImage"

import prisma from '@/lib/prisma';

type ResponseData = {
  message: string;
};

export async function POST(req: Request) {
  // try {
    
    const res = await req.json()
    const test = await prisma.product.findMany()

    const data =  {
        name: res.product_name,
        sku: res.product_sku,
        imag: "image_url",
        price: parseInt(res.product_price),
        price_cost: parseInt(res.product_cost),
        description: res.description,
    } 
    const productModel = new ProductModel();
    const result = await productModel.insert(data);


    const dataImg = {
      img_name: JSON.stringify(res.product_img),
      product_id: result.id
    }
    const imageModel = new ProductImageModel(); 
    const product_img = await imageModel.insert(dataImg);

    // const result =  ProductModel.create({
    //   sku: res.product_sku,
    //   name: res.product_name,
    //   description: res.description,
    //   price: res.product_price,
    //   price_cost:res.product_cost,
    // })
  //  const resultimg = await prisma.productImage.create({
  //     data: {
  //       img_name: JSON.stringify(res.product_img),
  //       product_id: result.id,
  //     },
  //   });

    // const get_all = await ProductModel.getAll();



    return Response.json({ status: 200, message: result });
  // } catch (error) {

  //   return Response.json({ status: 500, message: error });
  // }



 
}
