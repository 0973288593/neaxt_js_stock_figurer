// app/deposit/page.tsx

export default function DepositPage() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">Deposit</h1>
        <p className="text-gray-500">
          จัดการรายการมัดจำสินค้า
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-gray-500">ยอดมัดจำทั้งหมด</p>
          <h2 className="text-3xl font-bold mt-2">
            ฿150,000
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-gray-500">รอมัดจำ</p>
          <h2 className="text-3xl font-bold mt-2">
            23
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-gray-500">ใกล้ครบกำหนด</p>
          <h2 className="text-3xl font-bold mt-2">
            5
          </h2>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <p className="text-gray-500">คืนแล้ว</p>
          <h2 className="text-3xl font-bold mt-2">
            102
          </h2>
        </div>

      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center">

        <button
          className="
          bg-blue-600
          hover:bg-blue-700
          text-white
          px-4
          py-2
          rounded-lg
          "
        >
          + เพิ่มรายการมัดจำ
        </button>

        <input
          type="text"
          placeholder="ค้นหา..."
          className="
          border
          rounded-lg
          px-4
          py-2
          w-80
          "
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50">
            <tr>

              <th className="p-4 text-left">
                เลขที่เอกสาร
              </th>

              <th className="p-4 text-left">
                ลูกค้า
              </th>

              <th className="p-4 text-left">
                ยอดมัดจำ
              </th>

              <th className="p-4 text-left">
                คงเหลือ
              </th>

              <th className="p-4 text-left">
                สถานะ
              </th>

            </tr>
          </thead>

          <tbody>

            <tr className="border-t">

              <td className="p-4">
                DP250001
              </td>

              <td className="p-4">
                บริษัท ABC
              </td>

              <td className="p-4">
                ฿5,000
              </td>

              <td className="p-4">
                ฿5,000
              </td>

              <td className="p-4">

                <span
                  className="
                  bg-yellow-100
                  text-yellow-700
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  "
                >
                  รอมัดจำ
                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}