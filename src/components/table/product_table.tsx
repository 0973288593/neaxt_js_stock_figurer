// app/table/page.tsx
'use client';
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Link from "next/link";


export default function TablePage() {
  const router = useRouter();
  const searchParams  = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  console.log(currentPage)
  const limit = 10
  const [products, setUsers] = useState<any[]>([]);
  const [pagination, setPagination] = useState({});

  const loadData = async () => {

    console.log(currentPage)

   
    
    const res = await fetch(
      `/api/product?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();
   
    setUsers(data.data.product_list);
    
    setPagination(data.data.pagination);
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
  const onPageChange = async(page) => {
    console.log(page)
    // setCurrentPage(page);
    router.push(`?page=${page}`);
   loadData();
  };

  // console.log(users)

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Producr Model</h3>
      {/* {users} */}
      <table className="rounded-md border" style={{ width: '100%' }}>
        <thead>
          <tr className="bg-gray-300">
            <th className="border p-2">image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">sku</th>
            <th className="border p-2">price</th>
            <th className="border p-2">price cost</th>
            <th className="border p-2">created</th>
            <th className="border p-2" style={{'width': '203px'}}>action</th>

          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-100">
              <td className="flex items-center border">
                <div className="text-white flex items-center  p-3 " style={{ width:'100%' }}>
                  <img style={{ width:'50px', height:'50px'  }} src={`/uploads/product/${product.image}`} alt={product.name} />
                </div>
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
   

  
      <div className="mt-3"  style={{ display: "flex", gap: "8px" }}>
      {[...Array(pagination.totalPages)].map((_, index) => {
        const page = index + 1;

        return (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              padding: "8px 12px",
              backgroundColor:
                pagination.currentPage === page ? "black" : "#ddd",
              color: pagination.currentPage === page ? "white" : "black",
              border: "none",
              borderRadius: "6px",
            }}
          >
            {page}
          </button>
        );
      })}
    </div>

    </div>
  );
}
