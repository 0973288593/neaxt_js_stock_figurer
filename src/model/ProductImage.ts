import prisma from '@/lib/prisma';

export type ProductImageData = {
  img_name: string;
  product_id: number;
};

export class ProductImageModel {
  async insert(data: ProductImageData) {
    return await prisma.productImage.create({
      data: {
        img_name: data.img_name,
        product_id: data.product_id,
      },
    });
  }
}