// app/table/page.tsx
'use client';
import { useEffect, useState } from "react";

import Link from "next/link";

export default function TablePage({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const limit = 10
  const [products, setUsers] = useState<any[]>([]);

  const loadData = async () => {
    const res = await fetch(
      `/api/product?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
    const totalPages = Math.ceil(data.data.count_product / limit);


    setUsers(data.data.product_list);
  };

  useEffect(() => {
    loadData();
  }, [currentPage, limit])

  const formatDate = (date) => {
    return new Date(date).toLocaleString("th-TH", {
      timeZone: "Asia/Bangkok",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/product/delete_product/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert("ลบข้อมูลสำเร็จ");
        await loadData();

      } else {
        console.error("Failed to delete the record.");
      }
    } catch (error) {
      console.error("Error calling delete API:", error);
    }
  };


  // console.log(users)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User Data Table</h1>
      {/* {users} */}
      <table className="rounded-md border" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th className="border p-2">image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">sku</th>
            <th className="border p-2">price</th>
            <th className="border p-2">price cost</th>
            <th className="border p-2">created</th>
            <th className="border p-2">action</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="border">
                <img className="w-32" src={`/uploads/product/${product.image}`} alt={product.name} />
              </td>
              <td className="border p-2">
                <Link href={`products/edit/${product.id}`} >
                  {product.name}
                </Link>
              </td>
              <td className="border p-2">{product.sku}</td>
              <td className="border p-2">{product.price}</td>
              <td className="border p-2">{product.price_cost}</td>
              <td className="border p-2">{formatDate(product.created_at)}</td>
              <td className="flex-1">
                <div className="h-full px-4 py-2 flex-initial">
                  <Link href={`products/edit/${product.id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" >
                    edit
                  </Link>
                  {/* <button className="m-2 btn bg-green-500 hover:bg-green-400 text-white">
                    Button
                  </button> */}
                  <button onClick={() => handleDelete(product.id)} className="m-2 bg-gray-400 hover:bg-gray-500 text-gray-800 font-bold py-2 px-4 rounded">
                    delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
