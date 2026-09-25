"use client";

import "../../../../../public/css/order-detail.css";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";



export default function orderDetail() {
    const router = useRouter();
    const params = useParams();
    // const [orderDetail, setOrderDetail] = useState({});
    const [productList, setProductList] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);

    const [orderDetail, setOrderDetail] = useState<OrderDetail | null>(null);

    const [statusEditshipCost, setStatusEditshipCost] = useState(false);
    const [shippingCost, setShippingCost] = useState(0);
    const [totalProductCost, setTotalProductCost] = useState(0);


    interface OrderDetail {
        id: string;
        shipping_cost?: number;
        // ... add other order fields
    }
    const id = params.id;


    const loadOrderDetail = async () => {

        try {
            const res = await fetch(`/api/order/${id}`);
            const data = await res.json();


            const productList = data.data.productList;
            const orderDetail = data.data.orderDetail;


            setOrderDetail(orderDetail)
            setProductList(productList)
            setShippingCost(data.data.orderDetail.shippingCost)


            const totalCost = productList.reduce((total: number, item: any) => {
                return total +
                    (Number(item.product.price_cost) * Number(item.quantity));
            }, 0);

            setTotalProductCost(totalCost)




        } catch (error) {

            console.log(error)

        }

    }

    const updateShippingCost = async () => {
        try {
            const response = await fetch(`/api/order/${orderDetail.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    shippingCost: shippingCost,
                    profit: orderDetail.profit

                }),
            });

            if (!response.ok) {
                throw new Error("Update shipping cost failed");
            }

            const result = await response.json();

            await loadOrderDetail();

            // ปิดโหมดแก้ไข
            setStatusEditshipCost(false);

        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {

        loadOrderDetail();

    }, []);


    return (
        <div className="dashboard">
            {/* ================= MAIN ================= */}
            <div className="main">
                {/* ================= CONTENT ================= */}
                <main className="content">

                    <div className="content-grid">


                        {/* ================= LEFT ================= */}
                        <div className="left-column">


                            {/* ORDER PRODUCTS */}
                            <section className="card order-card">

                                <div className="card-title">

                                    <h2>
                                        Order #{orderDetail.orderNumber}
                                    </h2>

                                    <button className="invoice-btn">
                                        Invoice
                                    </button>

                                </div>


                                {/* Table Header */}
                                <div className="product-table-header">

                                    <span>PRODUCT</span>

                                    <span>
                                        PRICE
                                        <small>↕</small>
                                    </span>

                                    <span>QUANTITY</span>

                                    <span>
                                        TOTAL AMOUNT
                                        <small>↕</small>
                                    </span>

                                </div>


                                {productList.map((item) => (

                                    <div className="product-row" key={item.id}>

                                        <div className="product-name">

                                            <div className="product-image">

                                                <img style={{ width: '50px', height: '50px' }} src={`/uploads/product/${item.product.image}`} alt={item.product.name}
                                                    onClick={() =>
                                                        setSelectedImage(
                                                            `/uploads/product/${item.product.image}`
                                                        )
                                                    } />
                                            </div>

                                            <div>
                                                <h3>
                                                    {item.product.name}
                                                </h3>

                                                {/* <p>
                                                    PRODUCT ID: 
                                                </p> */}
                                            </div>

                                        </div>

                                        <span>$ {item.unitPrice}</span>

                                        <span>{item.quantity}</span>

                                        <strong>${(item.unitPrice * item.quantity)}</strong>

                                    </div>
                                ))}


                            </section>


                            {/* COMMENT + SHIPPING */}
                            <div className="two-column">


                                {/* Comment */}
                                <section className="card comment-card">

                                    <h2>Comment</h2>

                                    <textarea
                                        placeholder="Add a Note: This is a small notes section that only the seller can see."
                                    />

                                </section>


                                {/* Shipping */}
                                <section className="card shipping-card">

                                    <h2>
                                        Shipping Information
                                    </h2>

                                    <div className="info-row">
                                        <span>FULL NAME</span>
                                        <strong className="text-black">{orderDetail.customerName}</strong>
                                    </div>

                                    <div className="info-row">
                                        <span>ADDRESS</span>
                                        <strong>
                                            12 Tompkins Drive, Port Orange...
                                        </strong>
                                    </div>

                                    <div className="info-row">
                                        <span>PHONE NUMBER</span>
                                        <strong>
                                            {orderDetail.customerPhone}
                                        </strong>
                                    </div>

                                    <div className="info-row">
                                        <span>EMAIL</span>
                                        <strong>
                                            dashboard@comvi.com
                                        </strong>
                                    </div>

                                </section>

                            </div>


                            {/* BANNER + PAYMENT */}
                            <div className="two-column bottom-row">


                                {/* Banner */}
                                <section className="sale-banner">

                                    <div>
                                        <h2>
                                            Sale Designer
                                            <br />
                                            Brands
                                        </h2>
                                    </div>

                                    <span className="sale-badge">
                                        SALE -32%
                                    </span>

                                </section>


                                {/* Payment */}
                                <section className="card payment-card">

                                    <h2>
                                        Payment Details
                                    </h2>

                                    <div className="info-row">
                                        <span>TRANSACTIONS</span>
                                        <strong>
                                            #AME123461272341
                                        </strong>
                                    </div>

                                    <div className="info-row">
                                        <span>PAYMENT METHOD</span>
                                        <strong>
                                            Debit Card
                                        </strong>
                                    </div>

                                    <div className="info-row">
                                        <span>CARD HOLDER NAME</span>
                                        <strong>
                                            Gabriel Pires
                                        </strong>
                                    </div>

                                    <div className="info-row">
                                        <span>CARD NUMBER</span>
                                        <strong>
                                            XXXX XXXX XXXX 1235
                                        </strong>
                                    </div>

                                </section>

                            </div>

                        </div>


                        {/* ================= RIGHT ================= */}
                        <aside className="right-column">


                            {/* Order Summary */}
                            <section className="card summary-card">

                                <h2 >
                                    Order Summary
                                </h2>

                                <div className="summary-row">
                                    <span>SUB TOTAL :</span>
                                    <strong>${orderDetail.subtotal}</strong>
                                </div>

                                <div className="summary-row">
                                    <span>DISCOUNT :</span>
                                    <strong>$0</strong>
                                </div>

                                <div className="summary-row">
                                    <span>SHIPPING :</span>
                                    {statusEditshipCost === false ? (
                                        <div className="text-base text-dark">
                                            <span
                                                onClick={() => setStatusEditshipCost(true)}
                                                className="cursor-pointer"
                                            >
                                                Edit
                                            </span>

                                            <span>
                                                $ {orderDetail.shippingCost}
                                            </span>
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                className="border p-1"
                                                type="number"
                                                value={shippingCost}
                                                onChange={(e) => setShippingCost(Number(e.target.value))}
                                            />

                                            <button className="cursor-pointer"
                                                onClick={updateShippingCost}
                                            >
                                                Save
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="summary-row">
                                    <span>ESTIMATED TAX :</span>
                                    <strong>$00.00</strong>
                                </div>

                                <div className="summary-row total-row">
                                    <span>TOTAL :</span>
                                    <strong>${orderDetail.total}</strong>
                                </div>
                                <div className="summary-row total-row">
                                    <span>Sales Profit :</span>
                                    <strong>${(orderDetail.profit - orderDetail.shippingCost)}</strong>
                                </div>


                                <div className="discount-code">

                                    <input
                                        type="text"
                                        placeholder="Enter Discount Code"
                                    />

                                    <button>
                                        Apply
                                    </button>

                                </div>

                            </section>


                            {/* Track Order */}
                            <section className="card tracking-card">

                                <h2>
                                    Track Order
                                </h2>

                                <p className="tracking-id">
                                    TRACKING ID: 1004152012012
                                </p>


                                <div className="tracking-list">


                                    {/* Step */}
                                    <div className="tracking-item active">

                                        <div className="tracking-icon">
                                            ♧
                                        </div>

                                        <div>
                                            <h3>
                                                Order Placed
                                            </h3>

                                            <p>
                                                An order has been placed
                                            </p>

                                            <small>
                                                Mar 21 2023 07:22 AM
                                            </small>
                                        </div>

                                    </div>


                                    {/* Step */}
                                    <div className="tracking-item active">

                                        <div className="tracking-icon">
                                            ♧
                                        </div>

                                        <div>
                                            <h3>
                                                Packed
                                            </h3>

                                            <p>
                                                Picked up by courier partner
                                            </p>

                                            <small>
                                                Mar 21 2023 07:22 AM
                                            </small>
                                        </div>

                                    </div>


                                    {/* Step */}
                                    <div className="tracking-item active">

                                        <div className="tracking-icon">
                                            🚚
                                        </div>

                                        <div>
                                            <h3>
                                                Shipped
                                            </h3>

                                            <p>
                                                QWT Logistics
                                            </p>

                                            <small>
                                                Mar 21 2023 07:22 AM
                                            </small>
                                        </div>

                                    </div>


                                    {/* Step */}
                                    <div className="tracking-item">

                                        <div className="tracking-icon">
                                            ♧
                                        </div>

                                        <div>
                                            <h3>
                                                Out for Delivery
                                            </h3>

                                            <p>
                                                An order has been placed.
                                            </p>

                                            <small>
                                                Mar 21 2023 07:22 AM
                                            </small>
                                        </div>

                                    </div>


                                    {/* Step */}
                                    <div className="tracking-item">

                                        <div className="tracking-icon">
                                            ▱
                                        </div>

                                        <div>
                                            <h3>
                                                Delivered
                                            </h3>

                                            <p>
                                                An order has been placed.
                                            </p>

                                            <small>
                                                Mar 21 2023 07:22 AM
                                            </small>
                                        </div>

                                    </div>

                                </div>

                            </section>

                        </aside>

                    </div>

                </main>

            </div>

            {selectedImage && (
                <div
                    className="image-modal"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="image-modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="close-button"
                            onClick={() => setSelectedImage(null)}
                        >
                            ×
                        </button>

                        <img
                            src={selectedImage}
                            alt="Product preview"
                        />
                    </div>
                </div>
            )}
        </div>

    );


}
