import prisma from "@/lib/prisma";

export type Order = {
    orderNumber: string;
    customer_id: number;
    paymentStatus: string;
    status: string;
    subtotal: number;
    discount: number;
    total: number;
    customerName: string;
    customerPhone: string;
    createdAt: Date;
    updatedAt: Date;
};

export class OrderModel {

    async insert(data: Order) {
        const order = await prisma.Order.create({
            data: {
                orderNumber: data.orderNumber,
                customer_id: data.customer_id,
                status: data.status,
                paymentStatus: 'PENDING',
                subtotal: data.subtotal,
                discount: data.discount,
                shippingCost: 0,
                tax: 0,
                total: data.total,
                customerName: data.customerName,
                customerEmail: '',
                customerPhone: data.customerPhone,
                shippingAddress: '',
                shippingState: '',
                shippingZip: '',
                shippingCountry: '',
                note: '',
                totalCost: data.totalCost,
                profit: data.profit,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
            select: {
                id: true,
            },
        });

        return order.id;
    }

    async getAll(page, limit, search) {
        return await prisma.Order.findMany({
            skip: page,
            take: limit,
            where: search
                ? {
                    OR: [
                        {
                            orderNumber: {
                                contains: search,
                                mode: "insensitive",
                            },
                        },
                        {
                            customerName: {
                                contains: search,
                                mode: "insensitive",
                            },
                        }
                    ],
                }
                : undefined,

            orderBy: {
                createdAt: "desc",
            },
        });
    }

    async getCountAll(search) {

        const count = await prisma.Order.count();
        // console.log("COUNT:", count, typeof count);
        //return await prisma.product.count();

        return count;
    }

    async getById(id: string) {
        const record = await prisma.Order.findUnique({
            where: {
                id: id
            }
        });

        return record;
    }


    async updateOrder(id: string, data: object) {
        return await prisma.Order.updateMany({
            where: {
                id: id,
            },
            data,
        });
    }

    async deleteOrder(id: string) {

        return await prisma.Order.delete({
            where: {
                id: id
            },
        });


    }

}