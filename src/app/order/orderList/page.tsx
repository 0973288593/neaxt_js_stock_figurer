"use client";

import { useMemo, useState, useEffect } from "react";
import TableOrder from "../../../components/table/order_table"

type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "COMPLETED"
  | "CANCELLED";

type PaymentType = "FULL" | "INSTALLMENT";

type Order = {
  id: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  itemCount: number;
  total: number;
  status: OrderStatus;
  paymentType: PaymentType;
  createdAt: string;
};

const mockOrders: Order[] = [
  {
    id: "1",
    orderNo: "ORD-00001",
    customerName: "สมชาย ใจดี",
    customerPhone: "081-111-1111",
    itemCount: 2,
    total: 35000,
    status: "CONFIRMED",
    paymentType: "INSTALLMENT",
    createdAt: "2026-08-16",
  },
  {
    id: "2",
    orderNo: "ORD-00002",
    customerName: "สมหญิง ใจดี",
    customerPhone: "082-222-2222",
    itemCount: 1,
    total: 12500,
    status: "COMPLETED",
    paymentType: "FULL",
    createdAt: "2026-08-15",
  },
  {
    id: "3",
    orderNo: "ORD-00003",
    customerName: "John Smith",
    customerPhone: "089-333-3333",
    itemCount: 3,
    total: 8900,
    status: "PENDING",
    paymentType: "INSTALLMENT",
    createdAt: "2026-08-14",
  },
  {
    id: "4",
    orderNo: "ORD-00004",
    customerName: "วิชัย พัฒนกิจ",
    customerPhone: "086-444-4444",
    itemCount: 2,
    total: 22000,
    status: "PROCESSING",
    paymentType: "FULL",
    createdAt: "2026-08-13",
  },
  {
    id: "5",
    orderNo: "ORD-00005",
    customerName: "นิดา ใจดี",
    customerPhone: "085-555-5555",
    itemCount: 1,
    total: 4500,
    status: "CANCELLED",
    paymentType: "FULL",
    createdAt: "2026-08-12",
  },
];

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "รอดำเนินการ",
    className:
      "bg-yellow-100 text-yellow-700",
  },
  CONFIRMED: {
    label: "ยืนยันแล้ว",
    className:
      "bg-blue-100 text-blue-700",
  },
  PROCESSING: {
    label: "กำลังดำเนินการ",
    className:
      "bg-purple-100 text-purple-700",
  },
  COMPLETED: {
    label: "เสร็จสิ้น",
    className:
      "bg-green-100 text-green-700",
  },
  CANCELLED: {
    label: "ยกเลิก",
    className:
      "bg-red-100 text-red-700",
  },
};

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<
    "ALL" | OrderStatus
  >("ALL");

  const [paymentType, setPaymentType] = useState<
    "ALL" | PaymentType
  >("ALL");

  const [currentPage, setCurrentPage] = useState(1);


  const [orderList, setOrderList] = useState([]);
  const [orderCount, setOrderCount] = useState('');
  const [orderTotal, setOrderTotal] = useState('');
  const [pagination, setPagination] = useState({});




  const itemsPerPage = 5;
  const limit = 20;


  const getOrder = async () => {

    console.log('getOrder')

    const res = await fetch(
      `/api/order?page=${currentPage}&limit=${limit}`
    );
    const data = await res.json();

    const totalOrder = data.data.order_list.reduce(
      (sum, order) => sum + Number(order.total),
      0
    );
    setOrderTotal(totalOrder)
    setOrderCount(data.data.order_count);
    setOrderList(data.data.order_list);
    setPagination(data.data.pagination);
  }

  const formatMoney = (value: number) => {
    return new Intl.NumberFormat("th-TH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString(
      "th-TH",
      {
        year: "numeric",
        month: "short",
        day: "numeric",
      }
    );
  };

  const filteredOrders = useMemo(() => {
    const keyword = search
      .trim()
      .toLowerCase();

    return mockOrders.filter((order) => {
      const matchSearch =
        !keyword ||
        order.orderNo
          .toLowerCase()
          .includes(keyword) ||
        order.customerName
          .toLowerCase()
          .includes(keyword) ||
        order.customerPhone.includes(keyword);

      const matchStatus =
        status === "ALL" ||
        order.status === status;

      const matchPayment =
        paymentType === "ALL" ||
        order.paymentType === paymentType;

      return (
        matchSearch &&
        matchStatus &&
        matchPayment
      );
    });
  }, [search, status, paymentType]);

  const totalPages = Math.ceil(
    filteredOrders.length / itemsPerPage
  );

  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalOrderAmount = filteredOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const resetFilters = () => {
    setSearch("");
    setStatus("ALL");
    setPaymentType("ALL");
    setCurrentPage(1);
  };


  useEffect(() => {
    getOrder();
  }, [currentPage, limit])

  return (
    <main className="min-h-screen bg-gray-100 p-6">


      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Order List
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              รายการคำสั่งซื้อทั้งหมด
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href =
                "/order/orderCreate";
            }}
            className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            + สร้าง Order
          </button>
        </div>

        {/* Summary */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Order ทั้งหมด
            </p>

            <p className="mt-2 text-2xl font-bold">
              {orderCount}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              ยอดขาย
            </p>

            <p className="mt-2 text-2xl font-bold text-blue-600">
              ฿{formatMoney(orderTotal)}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              กำลังดำเนินการ
            </p>

            <p className="mt-2 text-2xl font-bold text-purple-600">
              {
                filteredOrders.filter(
                  (order) =>
                    order.status ===
                    "PROCESSING"
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              ผ่อนสินค้า
            </p>

            <p className="mt-2 text-2xl font-bold text-orange-600">
              {
                filteredOrders.filter(
                  (order) =>
                    order.paymentType ===
                    "INSTALLMENT"
                ).length
              }
            </p>
          </div>

        </div>

        {/* Filters */}
        <div className="mb-6 rounded-xl border bg-white p-5 shadow-sm">

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">

            {/* Search */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-gray-700">
                ค้นหา
              </label>

              <input
                type="text"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setCurrentPage(1);
                }}
                placeholder="ค้นหา Order, ลูกค้า, เบอร์โทร..."
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                สถานะ
              </label>

              <select
                value={status}
                onChange={(event) => {
                  setStatus(
                    event.target.value as
                    | "ALL"
                    | OrderStatus
                  );
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="ALL">
                  ทุกสถานะ
                </option>

                <option value="PENDING">
                  รอดำเนินการ
                </option>

                <option value="CONFIRMED">
                  ยืนยันแล้ว
                </option>

                <option value="PROCESSING">
                  กำลังดำเนินการ
                </option>

                <option value="COMPLETED">
                  เสร็จสิ้น
                </option>

                <option value="CANCELLED">
                  ยกเลิก
                </option>
              </select>
            </div>

            {/* Payment */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                การชำระเงิน
              </label>

              <select
                value={paymentType}
                onChange={(event) => {
                  setPaymentType(
                    event.target.value as
                    | "ALL"
                    | PaymentType
                  );
                  setCurrentPage(1);
                }}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500"
              >
                <option value="ALL">
                  ทั้งหมด
                </option>

                <option value="FULL">
                  ชำระเต็ม
                </option>

                <option value="INSTALLMENT">
                  มัดจำ / ผ่อน
                </option>
              </select>
            </div>

          </div>

          {/* Reset */}
          {(search ||
            status !== "ALL" ||
            paymentType !== "ALL") && (
              <div className="mt-4">
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  ล้างตัวกรอง
                </button>
              </div>
            )}

        </div>
        {/* <TableOrder data={mockOrders} /> */}
        {/* Table */}

        <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

          <div className="overflow-x-auto">




            <table className="w-full min-w-[1000px]">

              <thead className="bg-gray-50">
                <tr className="border-b">

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    Order
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    ลูกค้า
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                    สินค้า
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                    ยอดรวม
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                    การชำระ
                  </th>

                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase text-gray-500">
                    สถานะ
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                    วันที่
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase text-gray-500">
                    Action
                  </th>

                </tr>
              </thead>
              <tbody className="divide-y">

                {orderList.map((order) => {
                  const statusInfo =
                    statusConfig[
                    order.paymentStatus
                    ];

                  return (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50"
                    >

                      {/* Order */}
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          onClick={() => {
                            window.location.href =
                              `/orders/${order.id}`;
                          }}
                          className="font-semibold text-blue-600 hover:text-blue-700"
                        >
                          {order.orderNumber}
                        </button>
                      </td>

                      {/* Customer */}
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.customerName}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {order.customerPhone}
                          </p>
                        </div>
                      </td>

                      {/* Items */}
                      <td className="px-6 py-4 text-center text-sm">
                        {order.itemCount} รายการ
                      </td>

                      {/* Total */}
                      <td className="px-6 py-4 text-right">
                        <span className="font-semibold">
                          ฿{formatMoney(order.total)}
                        </span>
                      </td>

                      {/* Payment */}
                      <td className="px-6 py-4 text-center">

                        {order.status ===
                          "INSTALLMENT" ? (
                          <span className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                            มัดจำ / ผ่อน
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                            ชำระเต็ม
                          </span>
                        )}

                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}
                        >
                          {statusInfo.label}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {formatDate(
                          order.createdAt
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() => {
                              window.location.href =
                                `/order/orderDetail/${order.id}`;
                            }}
                            className="rounded-lg border border-gray-300 px-3 py-2 text-xs font-medium hover:bg-gray-50"
                          >
                            ดู
                          </button>

                          {order.paymentType ===
                            "INSTALLMENT" && (
                              <button
                                type="button"
                                onClick={() => {
                                  window.location.href =
                                    `/payment-plans/new?orderId=${order.id}`;
                                }}
                                className="rounded-lg bg-orange-500 px-3 py-2 text-xs font-medium text-white hover:bg-orange-600"
                              >
                                Payment Plan
                              </button>
                            )}

                        </div>

                      </td>

                    </tr>
                  );
                })}

                {paginatedOrders.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-16 text-center"
                    >
                      <p className="font-medium text-gray-600">
                        ไม่พบ Order
                      </p>

                      <p className="mt-1 text-sm text-gray-400">
                        ลองเปลี่ยนคำค้นหาหรือตัวกรอง
                      </p>
                    </td>
                  </tr>
                )}

              </tbody>


            </table>

          </div>

          {/* Pagination */}
          {totalPages > 0 && (
            <div className="flex items-center justify-between border-t px-6 py-4">

              <p className="text-sm text-gray-500">
                แสดง{" "}
                <span className="font-medium text-gray-900">
                  {(currentPage - 1) *
                    itemsPerPage +
                    1}
                </span>{" "}
                -
                <span className="font-medium text-gray-900">
                  {" "}
                  {Math.min(
                    currentPage *
                    itemsPerPage,
                    filteredOrders.length
                  )}
                </span>{" "}
                จาก{" "}
                <span className="font-medium text-gray-900">
                  {filteredOrders.length}
                </span>{" "}
                รายการ
              </p>

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() =>
                    setCurrentPage(
                      (page) => page - 1
                    )
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ก่อนหน้า
                </button>

                <span className="px-3 text-sm text-gray-600">
                  {currentPage} /{" "}
                  {totalPages}
                </span>

                <button
                  type="button"
                  disabled={
                    currentPage === totalPages
                  }
                  onClick={() =>
                    setCurrentPage(
                      (page) => page + 1
                    )
                  }
                  className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
                >
                  ถัดไป
                </button>

              </div>

            </div>
          )}

        </div>

      </div>
    </main>
  );
}