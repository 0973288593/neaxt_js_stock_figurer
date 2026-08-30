import { NextResponse } from "next/server";
import CustomerModel from "@/model/CustomerModel";



type ResponseData = {
    message: string;
};


export async function POST(req: Request) {
   try {
        const res = await req.json()
        const customerModel = new CustomerModel();
        const result = await customerModel.insert(res);

        return NextResponse.json({ status: 200, message: result });
    } catch (error) {
        return NextResponse.json({ status: 500, message: error });
    }
}