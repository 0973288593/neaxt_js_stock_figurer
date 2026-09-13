import { NextResponse } from "next/server";
import { OrderModel } from "@/model/OrderModel";


export async function GET(req: Request) {



    try {

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const search = parseInt(searchParams.get('search') || ' ');
        const skip = (page - 1) * limit;

        const orderModel = new OrderModel();


        const OrderList = await orderModel.getAll(skip, limit, search);
        const count_order = await orderModel.getCountAll(search);
        const totalPages = Math.ceil(count_order / limit);

        const pagination = {
            currentPage: page,
            totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            hasNext: page < totalPages,
        };

        const data = {
            order_count: count_order || 0,
            order_list: OrderList,
            pagination: pagination

        }

        return NextResponse.json(
            { data },
            { status: 200 }
        );
    } catch (error) {
        console.error("API ERROR:", error);

        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }



}