import prisma from "@/lib/prisma";

export type OrderItem = {
    orderId: string;
    productId: string;
    productName: string;
    productSku: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    createdAt: Date;
};

export class OrderItemModel {

    async insert(data: OrderItem) {
        const orderItem = prisma.OrderItem.create({
            data: {
                orderId: data.orderId,
                productId: data.productId,
                productName: data.productName,
                productSku: data.productSku,
                quantity: data.quantity,
                unitPrice: data.unitPrice,
                totalPrice: data.totalPrice,
                createdAt: data.createdAt
            }
        });
        return orderItem;
    }


    async getOrderProduct(id: string) {

        const records = await prisma.OrderItem.findMany({
            include: {
                product: true,
            },
            where: {
                orderId: id
            }
        });

        return records;

    }
}
