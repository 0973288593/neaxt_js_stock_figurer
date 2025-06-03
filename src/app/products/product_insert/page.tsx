"use client";

import { useState, useEffect } from "react";
import FileUpload from "../../ui/Dropzone"

export default function createProduct() {
  const [formData, setFormData] = useState({
    product_name: "",
    description: "",
    product_cost: 0,
    product_sku: "",
    product_price: 0,
    Stock: 0,
    product_img:""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);


  // เมื่อ uploadedFiles เปลี่ยน, ดึงรูปแรกมาใส่ใน formData.product_img
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        product_img: ""+uploadedFiles +"" // หรือเลือก index อื่นตามต้องการ
      }));
    }
  }, [uploadedFiles]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //  const handleDrop = (acceptedFiles: File[]) => {
  //    setFormData({ ...formData, product_img: acceptedFiles });
  //  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(formData);
    // return false

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/product/product_insert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log(result);
        setMessage("บันทึกข้อมูลสำเร็จ!");
        // setFormData({ name: "", email: "" });
      } else {
        setMessage(result.error || "เกิดข้อผิดพลาด");
      }
    } catch (error) {
      setMessage("เกิดข้อผิดพลาดในการส่งข้อมูล");
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 p-6 bg-white shadow-md rounded-lg">
      <div className="my-1">
        <a
          href="/products"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Black
        </a>
      </div>

      <h2 className="text-xl font-bold mb-4">กรอกข้อมูล</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="w-full">
          <div className="p-4">
            <h1 className="text-black">Create product</h1>
          </div>
          <div>
            <div className="h-auto mb-5">
              <FileUpload onFileUpload={setUploadedFiles}></FileUpload>
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
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Button
              </button>
            </div>
          </div>
        </div>

        {/* <div>
          <label className="block text-sm font-medium">ชื่อ</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">อีเมล</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
        </button> */}
      </form>
      {message && <p className="mt-4 text-center text-green-600">{message}</p>}
    </div>
  );
}

