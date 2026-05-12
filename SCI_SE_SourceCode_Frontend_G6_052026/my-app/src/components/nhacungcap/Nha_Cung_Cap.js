import React, { useEffect, useState } from "react";
import { MoreVertical, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx"; // 1. Import thư viện Excel
import Menu from "./Menu";
import api from "../../api";

const chartData = [
  { month: "T1", doanh_thu: 15, nguoi_dung: 10 },
  { month: "T2", doanh_thu: 25, nguoi_dung: 18 },
  { month: "T3", doanh_thu: 30, nguoi_dung: 26 },
  { month: "T4", doanh_thu: 45, nguoi_dung: 38 },
  { month: "T5", doanh_thu: 55, nguoi_dung: 48 },
  { month: "T6", doanh_thu: 68, nguoi_dung: 62 },
  { month: "T7", doanh_thu: 78, nguoi_dung: 75 },
  { month: "T8", doanh_thu: 82, nguoi_dung: 85 },
  { month: "T9", doanh_thu: 88, nguoi_dung: 92 },
  { month: "T10", doanh_thu: 92, nguoi_dung: 95 },
  { month: "T11", doanh_thu: 98, nguoi_dung: 98 },
  { month: "T12", doanh_thu: 100, nguoi_dung: 100 },
];

export default function Nha_Cung_Cap() {
  const [loading, setLoading] = useState(true);
  const [dataList, setDataList] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/nha-cung-cap/bang-dieu-khien", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.data.status) {
        setDataList(res.data.data);
        const total = res.data.data
          .filter(item => Number(item.trang_thai_dat_lich) !== 3)
          .reduce((sum, item) => sum + Number(item.tong_tien_thanh_toan), 0);
        setTotalRevenue(total);
      }
    } catch (error) {
      toast.error("Không thể tải dữ liệu bảng điều khiển");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Hàm xử lý xuất Excel
  const handleExportExcel = () => {
    if (dataList.length === 0) {
      toast.warning("Không có dữ liệu để xuất!");
      return;
    }

    // Định dạng lại dữ liệu trước khi xuất (đổi key Tiếng Anh sang Tiếng Việt cho đẹp)
    const excelData = dataList.map((item) => ({
      "Mã Hóa Đơn": item.ma_hoa_don,
      "Khách Hàng": item.ten_khach_hang,
      "Dịch Vụ": item.ten_dich_vu,
      "Trạng Thái": getStatusInfo(item.trang_thai_dat_lich).text,
      "Tổng Tiền (VNĐ)": Number(item.tong_tien_thanh_toan),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "BaoCaoDoanhThu");

    // Xuất file
    XLSX.writeFile(workbook, `Bao_Cao_Nha_Cung_Cap_${new Date().getTime()}.xlsx`);
    toast.success("Xuất file Excel thành công!");
  };

  const formatVND = (amount) => {
    return new Intl.NumberFormat("vi-VN").format(amount);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 1: return { text: "ĐÃ XÁC NHẬN", color: "bg-blue-100 text-blue-700" };
      case 2: return { text: "HOÀN THÀNH", color: "bg-green-100 text-green-700" };
      case 3: return { text: "ĐÃ HỦY", color: "bg-red-100 text-red-700" };
      default: return { text: "KHÔNG XÁC ĐỊNH", color: "bg-gray-100 text-gray-700" };
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f6f8fc]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="flex bg-[#f6f8fc] min-h-screen">
      <Menu />
      <main className="flex-1 p-6">
        {/* TITLE */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-xl font-bold">Bảng điều khiển</h1>
            <p className="text-sm text-gray-500">
              Chào mừng trở lại, đây là tóm tắt hệ thống của bạn hôm nay.
            </p>
          </div>
          {/* 3. Gắn sự kiện vào nút Xuất báo cáo */}
          <button 
            onClick={handleExportExcel}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Xuất báo cáo
          </button>
        </div>

        {/* CARD DOANH THU THẬT */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <p className="text-xs text-gray-400 mb-2 font-semibold">TỔNG DOANH THU THỰC TẾ</p>
          <h2 className="text-4xl font-bold text-gray-800">
            {formatVND(totalRevenue)} <span className="text-lg text-gray-500 font-medium">VND</span>
          </h2>
          <div className="text-green-600 text-sm mt-2 flex items-center gap-1">
            <span className="font-bold">↑ 12.5%</span> so với tháng trước
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold mb-1">Sơ đồ tăng trưởng hệ thống</h3>
              <p className="text-xs text-gray-400">Xu hướng doanh thu và số người dùng năm 2026</p>
            </div>
            <div className="flex gap-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Doanh thu</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-300"></div>
                <span>Người dùng</span>
              </div>
            </div>
          </div>
          <svg viewBox="0 0 800 250" className="w-full" style={{ height: "200px" }}>
            {chartData.map((d, i) => (
              <text key={`month-${i}`} x={50 + i * 55} y="230" fontSize="10" fill="#999" textAnchor="middle">{d.month}</text>
            ))}
            <polyline points={chartData.map((d, i) => `${50 + i * 55},${200 - d.doanh_thu * 1.6}`).join(" ")} fill="none" stroke="#3b82f6" strokeWidth="3" />
            <polyline points={chartData.map((d, i) => `${50 + i * 55},${200 - d.nguoi_dung * 1.6}`).join(" ")} fill="none" stroke="#d1d5db" strokeWidth="2" strokeDasharray="5,5" />
          </svg>
        </div>

        {/* TABLE DỮ LIỆU THẬT */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex justify-between items-center p-4 font-semibold border-b">
            <span>Đặt chỗ mới nhất</span>
            <a href="/nha-cung-cap/quan-ly-lich-hen" className="text-blue-600 text-sm font-normal hover:underline">Xem tất cả</a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-600 border-b">
                  <th className="p-4 text-xs font-bold">MÃ ĐƠN</th>
                  <th className="p-4 text-xs font-bold">KHÁCH HÀNG</th>
                  <th className="p-4 text-xs font-bold">DỊCH VỤ</th>
                  <th className="p-4 text-xs font-bold">TRẠNG THÁI</th>
                  <th className="p-4 text-right text-xs font-bold">GIÁ TRỊ</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {dataList.length > 0 ? (
                  dataList.map((item, index) => {
                    const status = getStatusInfo(item.trang_thai_dat_lich);
                    return (
                      <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-500">{item.ma_hoa_don}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={`https://ui-avatars.com/api/?name=${item.ten_khach_hang}&background=random`}
                              className="w-7 h-7 rounded-full shadow-sm"
                              alt="avatar"
                            />
                            <span className="font-semibold text-gray-700">{item.ten_khach_hang}</span>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{item.ten_dich_vu}</td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider ${status.color}`}>
                            {status.text}
                          </span>
                        </td>
                        <td className="p-4 text-right font-bold text-gray-800">
                          {formatVND(item.tong_tien_thanh_toan)} đ
                        </td>
                        <td className="p-4 text-right text-gray-400">
                          <button className="hover:text-blue-600 transition-colors">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="6" className="p-10 text-center text-gray-400">
                      Chưa có dữ liệu đặt lịch nào.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}