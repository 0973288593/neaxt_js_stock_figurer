import { NextResponse } from "next/server";
import { OrderModel } from "@/model/OrderModel";
import { OrderItemModel } from "@/model/OrderItemModel";
import CustomerModel from "@/model/CustomerModel";


export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ id: string }>;
    }
) {


    const { id } = await params;
    const orderModel = new OrderModel();
    const orderItemModel = new OrderItemModel();

    const orderDetail = await orderModel.getById(id);
    const productList = await orderItemModel.getOrderProduct(id); 


    const data = {
        orderDetail : orderDetail,
        productList : productList
    }



    return NextResponse.json({
        success: true,
        data: data,
    });
}