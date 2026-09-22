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
        orderDetail: orderDetail,
        productList: productList
    }
    return NextResponse.json({
        success: true,
        data: data,
    });
}


export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        const orderModel = new OrderModel();

        //body.profit = await body.profit - body.shippingCost;
        const resultUpdate = await orderModel.updateOrder(id, body);

        return NextResponse.json({
            success: true,
            message: "update_order_success",
            result: resultUpdate
        });

    } catch (error) {
        console.error("UPDATE ORDER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "update_order_failed",
                error: error instanceof Error
                    ? error.message
                    : "Unknown error"
            },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request,
    { params }: { params: { id: string } }
) {
    try {

        const { id } = await params;


        const orderModel = new OrderModel();
        const orderItemModel = new OrderItemModel();



        const resultDeleteOrderITem = await orderItemModel.deleteOrderItem(id)


        if (resultDeleteOrderITem) {

            const resultDeleteOrder = await orderModel.deleteOrder(id)




            if (resultDeleteOrder) {

                const dataresult = {
                    orderItem: resultDeleteOrderITem,
                    order: resultDeleteOrder
                }
                return NextResponse.json({
                    success: true,
                    message: "delete_order_success",
                    result: dataresult
                });
            }

        }



    } catch (error) {

        return NextResponse.json(
            {
                success: false,
                message: "delete_order_failed",
                error: error instanceof Error
                    ? error.message
                    : "Unknown error"
            },
            { status: 500 }
        );

    }




}


