// import mysql, { Pool } from 'mysql2/promise';


// let pool: Pool;

// export function getDatabaseConnection() {
//   if (!pool) {
//     pool = mysql.createPool({
//       host: 'localhost', // XAMPP MySQL host
//       user: 'root',      // ผู้ใช้ MySQL
//       password: '',      // รหัสผ่าน (ถ้าไม่มี ให้ปล่อยว่าง)
//       database: 'modal', // ชื่อฐานข้อมูล
//     });
//   }
//   return pool;
// }

// datasource db {
//   provider = "mysql"
//   url      = env("DATABASE_URL")
// }

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;

