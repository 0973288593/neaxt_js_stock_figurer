"use client";

export default function table_order({ items , pagination }) {

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

                    {items.map((order) => {
                        const statusInfo =
                            statusConfig[
                            order.status
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
                                        {order.orderNo}
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

                                    {order.paymentType ===
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
                                                    `/orders/${order.id}`;
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


}