import prisma from "@/lib/prisma";

export type customer = {
  name: string;
  lineAccount: string;
  phoneNumber: string;
  tiktokAccount: string;
};

class Customer {
  async insert(data: customer) {
    return prisma.customer.create({
      data: {
        name: data.name,
        lineAccount: data.lineAccount,
        phoneNumber: data.phoneNumber,
        tiktokAccount: data.tiktokAccount,
      },
    });
  }


  // ✅ GET ALL
  async getAll(page : number, limit : number) {

    return await prisma.customer.findMany({
      skip: page,
      take: limit,
      // orderBy: {
      //   created_at: 'desc',
      // },
    });
  }
  async getCountAll() {
    const count = await prisma.customer.count();
    // console.log("COUNT:", count, typeof count);
    //return await prisma.product.count();
    return count;
  }

  async getCustomerById(id: number) {

    return await prisma.customer.findUnique({
      where: { id: id }, 
    });
  }

}

export default Customer;