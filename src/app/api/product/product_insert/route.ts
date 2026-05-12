import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server"
import { ProductModel } from "@/model/productModel"
import { ProductImageModel } from "@/model/ProductImage"

import prisma from '@/lib/prisma';

type ResponseData = {
  message: string;
};

export async function POST(req: Request) {
  try {
    
    const res = await req.json()
    const test = await prisma.product.findMany()
    var main_img = ''

    if(res.product_img){
      if(res.product_img.includes(",")){

        const arr_img = res.product_img.split(",")
        main_img = arr_img[0]
      }
    }
    const data =  {
        name: res.product_name,
        sku: res.product_sku,
        imag: main_img,
        price: parseInt(res.product_price),
        price_cost: parseInt(res.product_cost),
        description: res.description,
    } 

    const productModel = new ProductModel();
    const result = await productModel.insert(data);

  
    const data_img = {
      img_name: JSON.stringify(res.product_img) || '' ,
      product_id: result.id
    }

    const imageModel = new ProductImageModel(); 
    const product_img = await imageModel.insert(data_img);
    return NextResponse.json({ status: 200, message: result });
  } catch (error) {

    return NextResponse.json({ status: 500, message: error });
    
  }



 
}