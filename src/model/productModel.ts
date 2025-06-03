import prisma from '@/lib/prisma';

export type ProductData = {
  sku: string;
  name: string;
  description?: string;
  price: number;
  price_cost: number;
  imag?: string;
};

export class ProductModel {
  // ✅ CREATE (Insert)
  async insert(data: ProductData) {
    return await prisma.product.create({
      data: {
        sku: data.sku,
        name: data.name,
        description: data.description || '',
        price: data.price,
        price_cost: data.price_cost,
        imag: data.imag || '',
      },
    });
  }

  // ✅ UPDATE
  async update(id: string, data: Partial<ProductData>) {
    return await prisma.product.update({
      where: { id },
      data,
    });
  }

  // ✅ DELETE
  async delete(id: string) {
    return await prisma.product.delete({
      where: { id },
    });
  }

  // ✅ GET ALL
  async getAll() {
    return await prisma.product.findMany();
  }

  // ✅ GET BY ID
  async getById(id: string) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }
}
