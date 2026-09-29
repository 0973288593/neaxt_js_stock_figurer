import prisma from '@/lib/prisma';

export type ProductImageData = {
  img_name: string;
  product_id: string;
};
export interface ProductData {
  name?: string;
  price?: number;
  description?: string;
}
export interface ProductImageDataUp {
  img_name?: string;
}

export class ProductImageModel {
  async insert(data: ProductImageData) {
    return await prisma.productImage.create({
      data: {
        img_name: data.img_name,
        product_id: data.product_id,
      },
    });
  }

  async update(id: string, data: Partial<ProductImageDataUp>) {
    return await prisma.productImage.updateMany({
  where: {
    product_id: id,
  },
  data,
});
  }
}

