import { NextResponse } from 'next/server';
import { ProductModel } from "@/model/productModel"

export async function DELETE( req: Request,{ params }: { params: Promise<{ id: string }> }) 
{
    const { id } = await params
    try {
   

      const productModel = new ProductModel();
      //const resultDelete = '';

      const resultDelete = await productModel.delete(id);



      return NextResponse.json({ status: 200, rersult:resultDelete , message: `Item ${id} deleted successfully` });


    } catch (error) {

      return NextResponse.json({ status: 500, message: error });
    
    }

  
}