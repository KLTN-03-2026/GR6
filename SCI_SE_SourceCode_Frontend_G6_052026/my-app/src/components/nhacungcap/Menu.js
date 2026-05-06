import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Settings,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react";

// Component con cho từng item trong menu
const SidebarItem = ({ icon, text, to, active }) => (
  <Link to={to}>
    <div
      className={`flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer transition-all ${
        active ? "bg-blue-100 text-blue-600 font-medium" : "hover:bg-gray-100 text-gray-600"
      }`}
    >
      {icon}
      {text}
    </div>
  </Link>
);

const Menu = () => {
  const location = useLocation(); // Lấy đường dẫn hiện tại để tự động active menu

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, text: "Bảng điều khiển", to: "/nha-cung-cap" },
    { icon: <Briefcase size={18} />, text: "Dịch vụ", to: "/nha-cung-cap/quan-ly-dich-vu" },
    { icon: <Calendar size={18} />, text: "Lịch hẹn", to: "/nha-cung-cap/lich-hen" },
    { icon: <Users size={18} />, text: "Nhân viên", to: "/nha-cung-cap/quan-ly-nhan-vien" },
    { icon: <Settings size={18} />, text: "Cài đặt", to: "/nha-cung-cap/cai-dat" },
  ];

  return (
    <aside className="w-64 bg-white border-r p-4 flex flex-col justify-between sticky top-0 h-screen">
      <div>
        <div className="mb-8 px-2">
          <h2 className="text-xl font-bold text-blue-600 tracking-tight">ServiceHub</h2>
        </div>
        
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              to={item.to}
              active={location.pathname === item.to}
            />
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-400 border-t pt-4">
        <div className="cursor-pointer hover:text-black transition-colors px-2">Hỗ trợ</div>
        <div className="cursor-pointer hover:text-red-600 mt-2 transition-colors px-2">Đăng xuất</div>
      </div>
    </aside>
  );
};

export default Menu;