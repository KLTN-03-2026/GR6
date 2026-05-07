import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  List, 
  Users, 
  Settings, 
  FileText, 
  LogOut 
} from 'lucide-react';

const MenuAd = ({ onLogout }) => {
  const location = useLocation();

  // Hàm kiểm tra xem đường dẫn hiện tại có khớp với menu không để đổi màu icon/chữ
  const isActive = (path) => location.pathname === path;

  const menuItems = [
    {
      name: 'Bảng điều khiển',
      icon: <LayoutDashboard size={18} />,
      path: '/admin/thong-ke-he-thong',
    },
    {
      name: 'Danh mục',
      icon: <List size={18} />,
      path: '/admin/quan-ly-danh-muc',
    },
    {
      name: 'Khách hàng',
      icon: <Users size={18} />,
      path: '/admin/quan-ly-khach-hang',
    },
    {
      name: 'Nhà cung cấp',
      icon: <Users size={18} />,
      path: '/admin/quan-ly-nha-cung-cap',
    },
    {
      name: 'Cài đặt',
      icon: <Settings size={18} />,
      path: '/admin/cai-dat',
    },
    {
      name: 'Báo cáo',
      icon: <FileText size={18} />,
      path: '/admin/bao-cao',
    },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
      {/* Logo hoặc Tên hệ thống (Tùy chọn thêm) */}
      <div className="p-6 pb-2">
        <h2 className="text-xl font-black text-blue-600 tracking-tight">SERVICE HUB</h2>
      </div>

      <nav className="flex-grow px-4 space-y-1 text-slate-600 font-medium mt-4">
        {menuItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm rounded-xl transition-all mb-1 ${
                isActive(item.path)
                  ? 'bg-blue-50 text-blue-600 font-bold'
                  : 'hover:bg-gray-50'
              }`}
            >
              {item.icon}
              {item.name}
            </button>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100 space-y-1">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all"
        >
          <LogOut size={18} /> 
          Đăng xuất
        </button>
      </div>
    </aside>
  );
};

export default MenuAd;