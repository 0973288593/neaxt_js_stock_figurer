import prisma from "@/lib/prisma";

export type Order = {
  name: string;
  lineAccount: string;
  phoneNumber: string;
  tiktokAccount: string;
};


export class OrderModel {

    async insert(data: Order) {
        return prisma.Order.create({
            data: {
                name: data.name,
                lineAccount: data.lineAccount,
                phoneNumber: data.phoneNumber,
                tiktokAccount: data.tiktokAccount,
            },
        });
    }

}