"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import FileUpload from "@/app/ui/Dropzone";
// src\app\globals.css





export default function EditProduct() {
  const router = useRouter();
  const params = useParams();


  const id = params.id;
  const [loading, setLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    product_cost: 0,
    product_sku: "",
    product_price: 0,
    Stock: 0,
    product_img: "",
    images: [],
  });

    // โหลดข้อมูลเดิม
    useEffect(() => {
        loadProduct();
    }, []);

  const loadProduct = async () => {
    const res = await fetch(`/api/product/${id}`);

    const data = await res.json();

    const product = data.data;


    console.log(product.images[0].img_name.replace(/^"|"$/g, '').split(','))


    

    setFormData({
      product_name: product.name || "",
      description: product.description || "",
      product_cost: product.price_cost || 0,
      product_sku: product.sku || "",
      product_price: product.price || 0,
      Stock: product.Stock || 0,
      product_img: product.image || "",
        images: product.images?.[0]?.img_name
    ?.replace(/^"|"$/g, "")
    ?.split(",") || [],
    });
    


    console.log(formData.images);



    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // update
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await fetch(
        `/api/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("แก้ไขสำเร็จ");

        router.push("/products");
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

   

  return (
    <div className="p-6">
        <div className="my-1">
        <a href="/products" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Black
        </a>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4" >

       <div className="w-full">
          <div className="p-4">
            <h1 className="text-black">Edit Product</h1>
          </div>
          <div>
            <div className="h-auto mb-5">
            {/* <FileUpload onFileUpload={setImages} /> */}
            <FileUpload
                  existingImages={formData.images}
                  onFileUpload={(updater) =>
                    setFormData((prev) => ({
                      ...prev,
                      images:
                        typeof updater === "function"
                          ? updater(prev.images)
                          : updater,
                    }))
                  }
                />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="px-4 text-white">
              <div className="mb-5">
                <label
                  htmlFor="product_name"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Product name
                </label>
                <input
                  type="text"
                  id="product_name"
                  name="product_name"
                  value={formData.product_name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="product name"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Desscxription
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Desscxription"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="product_cost"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Product cost
                </label>
                <input
                  type="text"
                  id="product_cost"
                  name="product_cost"
                  value={formData.product_cost}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="product_cost"
                  required
                />
              </div>
            </div>
            <div className=" px-4 text-white">
              <div className="mb-5">
                <label
                  htmlFor="product_sku"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Product sku
                </label>
                <input
                  type="text"
                  id="product_sku"
                  name="product_sku"
                  value={formData.product_sku}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="product name"
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="product_price"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Price
                </label>
                <input
                  type="number"
                  id="product_price"
                  name="product_price"
                  value={formData.product_price}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="Stock"
                  className="block mb-2 text-sm font-medium  text-black"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="Stock"
                  name="Stock"
                  value={formData.Stock}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder=""
                  required
                />
              </div>
            </div>
            <div className="px-4">
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    {loading ? "Loading..." : "Update"}
                </button>
            </div>
          </div>
        </div>
      
      </form>
    </div>
  );
}