import { NextResponse } from "next/server";
import OrderModel from "@/model/OrderModel";
import CustomerModel from "@/model/CustomerModel";



// type ResponseData = {
//     message: string;
// };

export async function POST(req: Request) {
    try {
        // const res = await req.json()
        const customerModel = new CustomerModel();
        const res = await req.json()
        const orderNumber = Math.floor(100000 + Math.random() * 900000);


        const customerDetail = customerModel.getCustomerById(res.customerId)




        // const data = {
        //    orderNumber: orderNumber,
        //    customer_id: res.customerId,
        //    status: '',
        //    paymentStatus: res.paymentType,
        //    subtotal: res.subtotal,
        //    discount: res.discount,
        //    shippingCost: 0,
        //    tax: 0,
        //    total:res.subtotal,
        // }

        // const customerModel = new CustomerModel();
        // const result = await customerModel.insert(res);




        //const orderModel = new OrderModel();
        // const result = await orderModel.insert(res);



        return NextResponse.json({ status: 200, message: customerDetail });

    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}