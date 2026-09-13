import { NextResponse } from "next/server";
import { OrderModel } from "@/model/OrderModel";
import { OrderItemModel } from "@/model/OrderItemModel";
import CustomerModel from "@/model/CustomerModel";



type ResponseData = {
    message: string;
};

export async function POST(req: Request) {
    try {
        // const res = await req.json()
        const customerModel = new CustomerModel();
        const orderModel = new OrderModel();
        const orderItemModel = new OrderItemModel();

        const res = await req.json()
        const orderNumber = Math.floor(100000 + Math.random() * 900000);
        const customerDetail = await customerModel.getCustomerById(parseInt(res.customerId))
        const now = new Date();

        const data_order_insrert = {
            orderNumber: orderNumber,
            customer_id: res.customerId,
            status: res.paymentType,
            paymentStatus: '',
            subtotal: res.subtotal,
            discount: res.discount,
            shippingCost: 0,
            tax: 0,
            total: res.subtotal,
            customerName: customerDetail.name,
            customerEmail: '',
            customerPhone: customerDetail.phoneNumber,
            shippingAddress: '',
            shippingState: '',
            shippingZip: '',
            shippingCountry: '',
            note: '',
            createdAt: now.toISOString(),
            updatedAt: now.toISOString(),
        }

        const resultOrder = await orderModel.insert(data_order_insrert)



        if ((resultOrder) && (res.items.length > 0)) {
            console.log('inloop'+resultOrder)
            for (const element of res.items) {
                //console.log(element)
                const data_order_item = {
                    orderId: resultOrder,
                    productId: element.productId,
                    productName: element.prductName,
                    productSku: element.prductSku,
                    quantity: element.quantity,
                    unitPrice: element.price,
                    totalPrice: element.subtotal,
                    createdAt: now.toISOString(),
                };
                //console.log(data_order_item)
                const result_sdd_order_item = await orderItemModel.insert(data_order_item);
            }

        }


        // const customerModel = new CustomerModel();
        // const result = await customerModel.insert(res);




        //const orderModel = new OrderModel();
        // const result = await orderModel.insert(res);



        return NextResponse.json({ status: 200, message: "insert_order_success" });

    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}