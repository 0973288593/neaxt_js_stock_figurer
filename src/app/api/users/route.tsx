import { NextRequest, NextResponse } from 'next/server';
import { query } from '../../../lib/prisma';

type User = {
  id: number;
  name: string;
  email: string;
};

// ตัวจัดการคำขอ GET
export async function GET(req: NextRequest) {
  try {
    // ตรวจสอบการทำงานของคำขอ GET
    const users = (await query('SELECT * FROM modal_product')) as User[];

    return NextResponse.json({ 
      data: users,
      error: 0,
      message: 'GET request successful' 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ตัวจัดการคำขอ POST
export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // รับข้อมูลจากคำขอ POST
    return NextResponse.json({ message: 'POST request successful', body });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ตัวจัดการคำขออื่นๆ สามารถทำได้เช่นกัน เช่น PUT, DELETE
export async function PUT(req: NextRequest) {
  // การตอบกลับของคำขอ PUT
}

export async function DELETE(req: NextRequest) {
  // การตอบกลับของคำขอ DELETE
}


// import type { NextApiRequest, NextApiResponse } from 'next';
// import { query } from '../../../../lib/db';

// // โครงสร้างข้อมูลที่ส่งกลับ
// type User = {
//   id: number;
//   name: string;
//   email: string;
// };
// // API Handler
// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     console.log(req.method )
//     if (req.method === 'GET') {
//       // ดึงข้อมูลผู้ใช้ทั้งหมด
//       const users = (await query('SELECT * FROM modal_product')) as User[];
//       res.status(200).json(users);

//       console.log(users)

//     } else if (req.method === 'POST') {
//       // เพิ่มผู้ใช้ใหม่
//       const { sku, name } = req.body;
//       const result = await query(
//         'INSERT INTO modal_product (sku, name) VALUES (?, ?)',
//         [sku, name]
//       );
//       res.status(201).json({ id: result, sku, name });
//     } else {
//       res.setHeader('Allow', ['GET', 'POST']);
//       res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }
