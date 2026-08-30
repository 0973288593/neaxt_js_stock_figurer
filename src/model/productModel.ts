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
    return prisma.product.create({
      data: {
        sku: String(data.sku),
        name: String(data.name),
        description: data.description ?? '',
        price: Number(data.price),
        price_cost: Number(data.price_cost),
        image: data.imag ?? '',
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

    await prisma.productImage.deleteMany({
      where: {
        product_id: id
      }
    })

    return await prisma.product.delete({
      where: {
        id: id
      }
    })

  }

  // // ✅ GET ALL
  // async getAll(page, limit , search) {

  //   return await prisma.product.findMany({
  //     skip: page,
  //     take: limit,
  //     orderBy: {
  //       created_at: 'desc',
  //     },
  //   });
  // }
  async getAll(page, limit, search) {
  return await prisma.product.findMany({
    skip: page,
    take: limit,

    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
            {
              sku: {
                contains: search,
                mode: "insensitive",
              },
            }
          ],
        }
      : undefined,

    orderBy: {
      created_at: "desc",
    },
  });
}

  async getCountAll(search) {

    const count = await prisma.product.count();
    // console.log("COUNT:", count, typeof count);
    //return await prisma.product.count();

    return count;
  }



  // ✅ GET BY ID
  async getById(id: string) {
    return await prisma.product.findUnique({
      where: { id },

      include: {
        images: true,
      },
    });
  }
}
