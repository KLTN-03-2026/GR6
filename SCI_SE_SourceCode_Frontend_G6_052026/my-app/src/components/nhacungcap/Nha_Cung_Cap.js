import React from "react";
import {
  LayoutDashboard,
  Settings,
  Users,
  Calendar,
  Briefcase,
  Search,
  Bell,
  MoreVertical,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

// fake data
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

export default function Nha_Cung_Cap(props) {
  return (
    <div className="flex bg-[#f6f8fc] min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between">
        <div>
          <Link to="/" className="flex items-center gap-2 font-bold text-lg mb-6">
            🔷 ServiceHub
          </Link>

          <div className="space-y-1">
            <SidebarItem icon={<LayoutDashboard size={18} />} text="Bảng điều khiển" active />
            <SidebarItem icon={<Briefcase size={18} />} text="Dịch vụ" />
            <SidebarItem icon={<Calendar size={18} />} text="Lịch hẹn" />
            <SidebarItem icon={<Users size={18} />} text="Khách hàng" />
            <SidebarItem icon={<Settings size={18} />} text="Cài đặt" />
          </div>
        </div>

        <div className="text-sm text-gray-400">
          <div className="cursor-pointer hover:text-black">Hỗ trợ</div>
          <div className="cursor-pointer hover:text-black mt-2">Đăng xuất</div>
        </div>
      </aside>
      <main className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-80">
            <Search className="absolute top-2.5 left-3 text-gray-400" size={16} />
            <input
              className="w-full bg-white rounded-full pl-9 pr-4 py-2 text-sm border"
              placeholder="Tìm kiếm tài nguyên..."
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell size={18} />
            <Settings size={18} />
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">ABC</span>
              <img
                src="https://ui-avatars.com/api/?name=ABC"
                className="w-8 h-8 rounded-full"
              />
            </div>
          </div>
        </div>

        {/* TITLE */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-xl font-bold">Bảng điều khiển</h1>
            <p className="text-sm text-gray-500">
              Chào mừng trở lại, đây là tóm tắt hệ thống của bạn hôm nay.
            </p>
          </div>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
            Xuất báo cáo
          </button>
        </div>

        {/* CARD */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-xs text-gray-400 mb-2 font-semibold">
            TỔNG DOANH THU
          </p>
          <h2 className="text-4xl font-bold">
            1,500,000,000 <span className="text-lg text-gray-500">VND</span>
          </h2>

          <div className="text-green-600 text-sm mt-2">
            +12.5% so với tháng trước
          </div>
        </div>

        {/* CHART */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-semibold mb-1">Sơ đồ tăng trưởng hệ thống</h3>
              <p className="text-xs text-gray-400">Xu hướng doanh thu và số người dùng năm 2024</p>
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
            {/* Grid lines */}
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <line
                key={`grid-${y}`}
                x1="40"
                y1={200 - y * 1.6}
                x2="750"
                y2={200 - y * 1.6}
                stroke="#f0f0f0"
                strokeWidth="1"
              />
            ))}
            
            {/* Y axis labels */}
            {[0, 20, 40, 60, 80, 100].map((y) => (
              <text key={`label-${y}`} x="25" y={205 - y * 1.6} fontSize="10" fill="#999">
                {y}
              </text>
            ))}

            {/* Line 1 - Doanh thu (Blue) */}
            <polyline
              points={chartData
                .map((d, i) => `${50 + i * 55},${200 - d.doanh_thu * 1.6}`)
                .join(" ")}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Line 2 - Người dùng (Gray) */}
            <polyline
              points={chartData
                .map((d, i) => `${50 + i * 55},${200 - d.nguoi_dung * 1.6}`)
                .join(" ")}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray="5,5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* X axis labels */}
            {chartData.map((d, i) => (
              <text
                key={`month-${i}`}
                x={50 + i * 55}
                y="230"
                fontSize="10"
                fill="#999"
                textAnchor="middle"
              >
                {d.month}
              </text>
            ))}
          </svg>
        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="flex justify-between items-center p-4 font-semibold border-b">
            <span>Đặt chỗ mới nhất</span>
            <a href="#" className="text-blue-600 text-sm font-normal">Xem tất cả</a>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-left text-xs font-semibold text-gray-600">ID ĐƠN HÀNG</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600">KHÁCH HÀNG</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600">DỊCH VỤ</th>
                <th className="p-4 text-left text-xs font-semibold text-gray-600">TRẠNG THÁI</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600">GIÁ TRỊ</th>
                <th className="p-4 text-right text-xs font-semibold text-gray-600"></th>
              </tr>
            </thead>
            <tbody>
              <Row 
                id="#SH-6821"
                initials="MH"
                name="Minh Hoàng" 
                service="Liệu trình Spa cao cấp"
                status="HOÀN TẤT" 
                statusColor="bg-green-100 text-green-700"
                price="2,500,000 đ" 
              />
              <Row 
                id="#SH-6822"
                initials="TA"
                name="Tuấn Anh" 
                service="Cắt tóc & tạo kiểu"
                status="ĐANG PHỤC VỤ" 
                statusColor="bg-blue-100 text-blue-700"
                price="450,000 đ" 
              />
              <Row 
                id="#SH-6823"
                initials="KV"
                name="Khánh Vy" 
                service="Chăm sóc da mặt chuyên sâu"
                status="CHỜ XÁC NHẬN" 
                statusColor="bg-yellow-100 text-yellow-700"
                price="1,800,000 đ" 
              />
              <Row 
                id="#SH-6824"
                initials="ML"
                name="Mỹ Linh" 
                service="Massage tái tạo"
                status="ĐÃ HỦY" 
                statusColor="bg-red-100 text-red-700"
                price="1,200,000 đ" 
              />
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer ${
      active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    {text}
  </div>
);

const Row = ({ id, initials, name, service, price, status, statusColor }) => (
  <tr className="border-t hover:bg-gray-50">
    <td className="p-4 text-gray-600">{id}</td>
    <td className="p-4">
      <div className="flex items-center gap-2">
        <img
          src={`https://ui-avatars.com/api/?name=${name}`}
          className="w-6 h-6 rounded-full"
        />
        {name}
      </div>
    </td>
    <td className="p-4 text-gray-600">{service}</td>
    <td className="p-4">
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor}`}>
        {status}
      </span>
    </td>
    <td className="p-4 text-right font-semibold">{price}</td>
    <td className="p-4 text-right cursor-pointer hover:text-blue-600">
      <MoreVertical size={16} />
    </td>
  </tr>
);