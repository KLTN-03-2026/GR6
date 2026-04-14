import React, { useState } from 'react';
import { 
  LayoutDashboard, List, Users, Settings, FileText, 
  HelpCircle, LogOut, Plus, Scissors, Flower2, 
  Smile, Paintbrush, HeartPulse, Edit3, Trash2, 
  Image as ImageIcon, Shapes
} from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";

const Quan_ly_danh_muc = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  const categoriesData = [
    { id: 1, title: 'Dịch vụ Làm tóc', desc: 'Cắt, nhuộm, uốn và tạo kiểu tóc chuyên nghiệp với các chuyên gia...', count: '15 Dịch vụ', icon: <Scissors className="text-pink-500" />, status: 'ACTIVE' },
    { id: 2, title: 'Spa & Massage', desc: 'Thư giãn cơ thể và tâm trí với các liệu trình massage tinh dầu và đá nóng.', count: '8 Liệu trình', icon: <Flower2 className="text-pink-500" />, status: 'ACTIVE' },
    { id: 3, title: 'Chăm sóc Da mặt', desc: 'Liệu trình chăm sóc da mặt chuyên sâu, trị mụn và trẻ hóa làn da.', count: '12 Dịch vụ', icon: <Smile className="text-pink-500" />, status: 'ACTIVE' },
    { id: 4, title: 'Nail & Makeup', desc: 'Làm móng nghệ thuật và trang điểm dự tiệc theo xu hướng mới nhất.', count: '10 Dịch vụ', icon: <Paintbrush className="text-pink-500" />, status: 'ACTIVE' },
    { id: 5, title: 'Trị liệu Sức khỏe', desc: 'Các gói trị liệu phục hồi sức khỏe, thải độc cơ thể và cân bằng năng lượng.', count: '6 Gói liệu trình', icon: <HeartPulse className="text-pink-500" />, status: 'ACTIVE' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans text-slate-900">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
        <nav className="flex-grow px-4 space-y-1 text-slate-600 font-medium">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
            <LayoutDashboard size={18} /> Bảng điều khiển
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-blue-50 text-blue-600 rounded-xl transition-all">
            <List size={18} /> Danh mục
          </button>
          <Link to="/admin/quan-ly-nguoi-dung">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
              <Users size={18} /> Khách hàng
            </button>
          </Link>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
            <Users size={18} /> Nhà cung cấp
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
            <Settings size={18} /> Cài đặt
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
            <FileText size={18} /> Báo cáo
          </button>
        </nav>

        <div className="p-4 border-t border-gray-100 space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <HelpCircle size={18} /> Hỗ trợ
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-all">
            <LogOut size={18} /> Đăng xuất
          </button>
        </div>
      </aside>

      {/* NỘI DUNG CHÍNH */}
      <main className="flex-grow p-10 overflow-y-auto">
        
        {/* Header Title & Action */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-3xl font-black mb-2">Quản lý danh mục</h1>
            <p className="text-gray-500 text-sm">Sắp xếp các dịch vụ chăm sóc sức khỏe và sắc đẹp của spa.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <Plus size={20} /> Thêm danh mục
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* CỘT TRÁI: FORM CHI TIẾT DANH MỤC */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">TỔNG QUAN</p>
                <h3 className="text-3xl font-black text-blue-600">12</h3>
                <p className="text-xs font-bold text-blue-400">Danh mục hiện có</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <Shapes size={24} />
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-6">
              <h3 className="text-lg font-bold">Chi tiết danh mục</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">TÊN DANH MỤC</label>
                <input type="text" placeholder="Ví dụ: Dịch vụ Làm tóc" className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">MÔ TẢ</label>
                <textarea rows="4" placeholder="Nhập mô tả về nhóm dịch vụ này..." className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"></textarea>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">ICON ĐẠI DIỆN</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex items-center justify-center text-gray-400">
                    <ImageIcon size={24} />
                  </div>
                  <button className="text-xs font-bold text-pink-500 hover:underline">Tải lên icon mới</button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">TRẠNG THÁI</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" defaultChecked className="w-4 h-4 text-pink-500 focus:ring-pink-400" />
                    <span className="text-sm font-bold text-gray-700">Hoạt động</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="status" className="w-4 h-4 text-pink-500 focus:ring-pink-400" />
                    <span className="text-sm font-bold text-gray-700">Tạm ngưng</span>
                  </label>
                </div>
              </div>

              <button className="w-full bg-gray-200 text-gray-500 py-4 rounded-2xl font-black text-sm tracking-wide hover:bg-gray-300 transition-all mt-4">
                Lưu thay đổi
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: DANH SÁCH CARDS */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {categoriesData.map((cat) => (
              <div key={cat.id} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-md transition-all group relative">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-pink-50 rounded-2xl flex items-center justify-center">
                    {cat.icon}
                  </div>
                  <span className="bg-green-50 text-green-500 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {cat.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">{cat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">{cat.desc}</p>
                
                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                  <span className="text-xs font-bold text-gray-300">{cat.count}</span>
                  <div className="flex gap-4">
                    <button className="text-gray-400 hover:text-blue-600 transition-colors"><Edit3 size={18} /></button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                  </div>
                </div>
              </div>
            ))}

            {/* Nút Tạo danh mục mới rỗng */}
            <div className="border-2 border-dashed border-gray-200 rounded-[32px] flex flex-col items-center justify-center p-8 text-gray-400 hover:bg-gray-50 hover:border-blue-200 cursor-pointer transition-all">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
                <Plus size={24} />
              </div>
              <span className="text-sm font-bold">Tạo danh mục mới</span>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Quan_ly_danh_muc;