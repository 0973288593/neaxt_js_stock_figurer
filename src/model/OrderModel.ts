import prisma from "@/lib/prisma";

export type Order = {
    orderNumber: string;
    customer_id: number;
    paymentStatus: string;
    status?: OrderStatus;
    subtotal: number;
    discount: number;
    totalCost: number;
    profit:number;
    total: number;
    customerName: string;
    customerPhone: string;
    createdAt: Date;
    updatedAt: Date;
};

export type OrderStatus =
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED";

export class OrderModel {

    async insert(data: Order) {
        const order = await prisma.order.create({
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

    async getAll(page: number, limit: number, search: string) {
        return await prisma.order.findMany({
            skip: page,
            take: limit,
            where: search
                ? {
                    OR: [
                        {
                            orderNumber: {
                                contains: search,
                            },
                        },
                        {
                            customerName: {
                                contains: search,
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

    async getCountAll() {

        const count = await prisma.order.count();
        // console.log("COUNT:", count, typeof count);
        //return await prisma.product.count();

        return count;
    }

    async getById(id: string) {
        const record = await prisma.order.findUnique({
            where: {
                id: id
            }
        });

        return record;
    }


    async updateOrder(id: string, data: object) {
        return await prisma.order.updateMany({
            where: {
                id: id,
            },
            data,
        });
    }

    async deleteOrder(id: string) {

        return await prisma.order.delete({
            where: {
                id: id
            },
        });


    }

}