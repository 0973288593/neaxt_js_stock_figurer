import { NextResponse } from "next/server";
import CustomerModel from "@/model/CustomerModel";

type ResponseData = {
    message: string;
};


export async function GET(req: Request) {
    try {

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '10');
        const skip = (page - 1) * limit;


        const customerModel = new CustomerModel();
        const customer_list = await customerModel.getAll(skip, limit);
        const count_customer = await customerModel.getCountAll();

        const totalPages = Math.ceil(count_customer / limit);

        const pagination = {
            currentPage: page,
            totalPages,
            nextPage: page < totalPages ? page + 1 : null,
            hasNext: page < totalPages,
        };

        const data = {
            count_customer: count_customer || 0,
            customer_list: customer_list,
            pagination: pagination

        }

        // const res = await req.json()
        // const customerModel = new CustomerModel();
        // const result = await customerModel.insert(res);

        return NextResponse.json(
            { data },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}