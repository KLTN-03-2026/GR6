import React from 'react';
import { 
  Search, 
  Bell, 
  Settings 
} from 'lucide-react';

const HeaderNCC = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-50">
      {/* 1. Logo Section (Bên trái) */}
      <div className="w-64 flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg 
            viewBox="0 0 24 24" 
            className="text-white w-5 h-5 fill-current"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="text-xl font-bold text-[#1e293b]">ServiceHub</span>
      </div>

      {/* Đường kẻ dọc ngăn cách giữa Sidebar và Content (nếu cần giống ảnh) */}
      <div className="h-full w-px bg-slate-100 mx-2"></div>

      {/* 2. Search Bar Section (Giữa) */}
      <div className="flex-1 flex justify-center px-8">
        <div className="relative w-full max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm dịch vụ, liệu trình..." 
            className="w-full pl-12 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-full text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />
        </div>
      </div>

      {/* 3. Action Icons & Profile (Bên phải) */}
      <div className="flex items-center gap-6 shrink-0">
        <button className="relative p-1 text-slate-500 hover:text-blue-600 transition-colors">
          <Bell size={22} strokeWidth={1.5} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <button className="p-1 text-slate-500 hover:text-blue-600 transition-colors">
          <Settings size={22} strokeWidth={1.5} />
        </button>

        {/* Đường kẻ dọc trước Profile */}
        <div className="h-8 w-px bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-slate-700">ABC</span>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <img 
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderNCC;