import prisma from "@/lib/prisma";

export type customer = {
  name: string;
  lineAccount: string;
  phoneNumber: string;
  tiktokAccount: string;
};

class Customer {
  async insert(data: customer) {
    return prisma.Customer.create({
      data: {
        name: data.name,
        lineAccount: data.lineAccount,
        phoneNumber: data.phoneNumber,
        tiktokAccount: data.tiktokAccount,
      },
    });
  }


  // ✅ GET ALL
  async getAll(page, limit) {

    return await prisma.Customer.findMany({
      skip: page,
      take: limit,
      // orderBy: {
      //   created_at: 'desc',
      // },
    });
  }
  async getCountAll() {
    const count = await prisma.Customer.count();
    // console.log("COUNT:", count, typeof count);
    //return await prisma.product.count();
    return count;
  }

  async getCustomerById(id: number) {

    return id

    // return await prisma.Customer.findUnique({
    //   where: { id: id }, 
    // });
  }

}

export default Customer;