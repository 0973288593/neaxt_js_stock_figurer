"use client";

import { useMemo, useState } from "react";

type Product = {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
};

type Customer = {
    id: string;
    name: string;
    phone: string;
};

type OrderItem = Product & {
    quantity: number;
};

const mockProducts: Product[] = [
    {
        id: "p1",
        name: "iPhone 17 Pro",
        sku: "IPHONE-17-PRO",
        price: 35000,
        stock: 10,
    },
    {
        id: "p2",
        name: "iPhone Case",
        sku: "CASE-001",
        price: 1000,
        stock: 20,
    },
    {
        id: "p3",
        name: "USB-C Charger",
        sku: "CHARGER-001",
        price: 1200,
        stock: 15,
    },
];

const mockCustomers: Customer[] = [
    {
        id: "c1",
        name: "สมชาย ใจดี",
        phone: "081-111-1111",
    },
    {
        id: "c2",
        name: "สมหญิง ใจดี",
        phone: "082-222-2222",
    },
];

export default function NewOrderPage() {
    const [customerId, setCustomerId] = useState("");
    const [searchProduct, setSearchProduct] = useState("");
    const [items, setItems] = useState<OrderItem[]>([]);
    const [discount, setDiscount] = useState(0);

    const [paymentType, setPaymentType] = useState<
        "FULL" | "INSTALLMENT"
    >("FULL");

    const selectedCustomer = mockCustomers.find(
        (customer) => customer.id === customerId
    );

    const filteredProducts = useMemo(() => {
        if (!searchProduct.trim()) {
            return [];
        }

        const search = searchProduct.toLowerCase();

        return mockProducts.filter(
            (product) =>
                product.name.toLowerCase().includes(search) ||
                product.sku.toLowerCase().includes(search)
        );
    }, [searchProduct]);

    const subtotal = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
    }, [items]);

    const total = Math.max(subtotal - discount, 0);

    const totalQuantity = useMemo(() => {
        return items.reduce(
            (sum, item) => sum + item.quantity,
            0
        );
    }, [items]);

    const formatMoney = (value: number) => {
        return new Intl.NumberFormat("th-TH", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(value);
    };

    const addProduct = (product: Product) => {
        setItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                if (existingItem.quantity >= product.stock) {
                    return currentItems;
                }

                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity: 1,
                },
            ];
        });

        setSearchProduct("");
    };

    const increaseQuantity = (productId: string) => {
        setItems((currentItems) =>
            currentItems.map((item) => {
                if (item.id !== productId) {
                    return item;
                }

                if (item.quantity >= item.stock) {
                    return item;
                }

                return {
                    ...item,
                    quantity: item.quantity + 1,
                };
            })
        );
    };

    const decreaseQuantity = (productId: string) => {
        setItems((currentItems) =>
            currentItems
                .map((item) => {
                    if (item.id !== productId) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: item.quantity - 1,
                    };
                })
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (productId: string) => {
        setItems((currentItems) =>
            currentItems.filter(
                (item) => item.id !== productId
            )
        );
    };

    const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();

        const orderData = {
            customerId,
            items: items.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
                subtotal: item.price * item.quantity,
            })),
            subtotal,
            discount,
            total,
            paymentType,
        };

        console.log("Order Data:", orderData);

        // TODO:
        // ส่ง orderData ไป API
        //
        // await fetch("/api/orders", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(orderData),
        // });
    };

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-6">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">
                        สร้าง Order
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        สร้างรายการขายสินค้าใหม่
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* LEFT */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Customer */}
                            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                    ข้อมูลลูกค้า
                                </h2>

                                <button type="button" className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Default</button>


                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    ลูกค้า
                                </label>

                                <select
                                    value={customerId}
                                    onChange={(event) =>
                                        setCustomerId(event.target.value)
                                    }
                                    required
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="">
                                        -- เลือกลูกค้า --
                                    </option>

                                    {mockCustomers.map((customer) => (
                                        <option
                                            key={customer.id}
                                            value={customer.id}
                                        >
                                            {customer.name} - {customer.phone}
                                        </option>
                                    ))}
                                </select>

                                {selectedCustomer && (
                                    <div className="mt-4 rounded-lg bg-gray-50 p-4">
                                        <p className="font-medium text-gray-900">
                                            {selectedCustomer.name}
                                        </p>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {selectedCustomer.phone}
                                        </p>
                                    </div>
                                )}
                            </section>

                            {/* Product */}
                            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                    สินค้า
                                </h2>

                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchProduct}
                                        onChange={(event) =>
                                            setSearchProduct(event.target.value)
                                        }
                                        placeholder="ค้นหาชื่อสินค้า หรือ SKU..."
                                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                    />

                                    {searchProduct && (
                                        <div className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
                                            {filteredProducts.length > 0 ? (
                                                filteredProducts.map(
                                                    (product) => (
                                                        <button
                                                            key={product.id}
                                                            type="button"
                                                            onClick={() =>
                                                                addProduct(product)
                                                            }
                                                            className="flex w-full items-center justify-between border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
                                                        >
                                                            <div>
                                                                <p className="font-medium text-gray-900">
                                                                    {product.name}
                                                                </p>

                                                                <p className="mt-1 text-xs text-gray-500">
                                                                    SKU: {product.sku}
                                                                </p>
                                                            </div>

                                                            <div className="text-right">
                                                                <p className="font-medium">
                                                                    ฿
                                                                    {formatMoney(
                                                                        product.price
                                                                    )}
                                                                </p>

                                                                <p className="text-xs text-gray-500">
                                                                    Stock {product.stock}
                                                                </p>
                                                            </div>
                                                        </button>
                                                    )
                                                )
                                            ) : (
                                                <div className="px-4 py-6 text-center text-sm text-gray-500">
                                                    ไม่พบสินค้า
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Order Items */}
                                <div className="mt-6 space-y-3">
                                    {items.length === 0 ? (
                                        <div className="rounded-lg border border-dashed border-gray-300 px-4 py-12 text-center">
                                            <p className="text-sm text-gray-500">
                                                ยังไม่มีสินค้า
                                            </p>

                                            <p className="mt-1 text-xs text-gray-400">
                                                ค้นหาและเลือกสินค้าด้านบน
                                            </p>
                                        </div>
                                    ) : (
                                        items.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                                            >
                                                {/* Product */}
                                                <div className="min-w-0 flex-1">
                                                    <p className="font-medium text-gray-900">
                                                        {item.name}
                                                    </p>

                                                    <p className="mt-1 text-xs text-gray-500">
                                                        SKU: {item.sku}
                                                    </p>

                                                    <p className="mt-2 text-sm text-gray-600">
                                                        ฿
                                                        {formatMoney(
                                                            item.price
                                                        )}{" "}
                                                        / ชิ้น
                                                    </p>
                                                </div>

                                                {/* Quantity */}
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item.id
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                                                    >
                                                        −
                                                    </button>

                                                    <span className="w-8 text-center text-sm font-medium">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            increaseQuantity(
                                                                item.id
                                                            )
                                                        }
                                                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-300 hover:bg-gray-100"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Subtotal */}
                                                <div className="w-32 text-right font-semibold text-gray-900">
                                                    ฿
                                                    {formatMoney(
                                                        item.price *
                                                        item.quantity
                                                    )}
                                                </div>

                                                {/* Remove */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-sm font-medium text-red-500 hover:text-red-700"
                                                >
                                                    ลบ
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            {/* Payment Type */}
                            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                    รูปแบบการชำระ
                                </h2>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                                    {/* Full */}
                                    <label
                                        className={`cursor-pointer rounded-xl border p-5 transition ${paymentType === "FULL"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="FULL"
                                                checked={
                                                    paymentType === "FULL"
                                                }
                                                onChange={() =>
                                                    setPaymentType("FULL")
                                                }
                                                className="mt-1"
                                            />

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    ชำระเต็มจำนวน
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    ลูกค้าชำระเงินทั้งหมด
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                    {/* Installment */}
                                    <label
                                        className={`cursor-pointer rounded-xl border p-5 transition ${paymentType ===
                                            "INSTALLMENT"
                                            ? "border-blue-500 bg-blue-50"
                                            : "border-gray-200 hover:bg-gray-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <input
                                                type="radio"
                                                name="paymentType"
                                                value="INSTALLMENT"
                                                checked={
                                                    paymentType ===
                                                    "INSTALLMENT"
                                                }
                                                onChange={() =>
                                                    setPaymentType(
                                                        "INSTALLMENT"
                                                    )
                                                }
                                                className="mt-1"
                                            />

                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    มัดจำ / ผ่อน
                                                </p>

                                                <p className="mt-1 text-sm text-gray-500">
                                                    สร้าง PaymentPlan ภายหลัง
                                                </p>
                                            </div>
                                        </div>
                                    </label>

                                </div>
                            </section>
                        </div>

                        {/* RIGHT */}
                        <aside>
                            <div className="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">

                                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                                    สรุป Order
                                </h2>

                                <div className="space-y-4">

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            จำนวนสินค้า
                                        </span>

                                        <span className="font-medium">
                                            {totalQuantity} ชิ้น
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500">
                                            ยอดสินค้า
                                        </span>

                                        <span>
                                            ฿{formatMoney(subtotal)}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm text-gray-500">
                                            ส่วนลด
                                        </label>

                                        <input
                                            type="number"
                                            min={0}
                                            max={subtotal}
                                            step="0.01"
                                            value={discount}
                                            onChange={(event) =>
                                                setDiscount(
                                                    Number(
                                                        event.target.value
                                                    )
                                                )
                                            }
                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-right text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-gray-900">
                                                ยอดรวม
                                            </span>

                                            <span className="text-2xl font-bold text-blue-600">
                                                ฿{formatMoney(total)}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* Installment Notice */}
                                {paymentType ===
                                    "INSTALLMENT" && (
                                        <div className="mt-5 rounded-lg bg-orange-50 p-4">
                                            <p className="text-sm font-medium text-orange-800">
                                                มัดจำ / ผ่อน
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-orange-700">
                                                หลังจากสร้าง Order แล้ว
                                                สามารถสร้าง PaymentPlan
                                                สำหรับ Order นี้ได้
                                            </p>
                                        </div>
                                    )}

                                {/* Buttons */}
                                <div className="mt-6 flex gap-3">
                                    <button
                                        type="button"
                                        className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                    >
                                        ยกเลิก
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={
                                            !customerId ||
                                            items.length === 0
                                        }
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        สร้าง Order
                                    </button>
                                </div>

                            </div>
                        </aside>

                    </div>
                </form>
            </div>
        </main>
    );
}
