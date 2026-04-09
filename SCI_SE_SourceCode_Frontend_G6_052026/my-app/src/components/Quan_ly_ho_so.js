import React from 'react';
import { User, Calendar, Bell, Shield, LogOut, Upload, Globe, CheckCircle } from 'lucide-react';

const Quan_ly_ho_so = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 font-sans">
      <div className="container mx-auto flex pt-8 pb-20 px-4 max-w-7xl">
        
        {/* SIDEBAR BÊN TRÁI */}
        <aside className="w-64 shrink-0 hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6 px-4">Cài đặt tài khoản</p>
          <nav className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-blue-50 text-blue-600 rounded-xl">
              <User size={18} /> Thiết lập hồ sơ
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
              <Calendar size={18} /> Lịch hẹn của tôi
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
              <Bell size={18} /> Thông báo
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-500 hover:bg-gray-100 rounded-xl transition-all">
              <Shield size={18} /> Bảo mật
            </button>
          </nav>

          <div className="mt-40 pt-10 border-t border-gray-200 px-4">
            <button className="flex items-center gap-3 text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
              <LogOut size={18} /> Đăng xuất
            </button>
          </div>
        </aside>

        {/* NỘI DUNG CHÍNH BÊN PHẢI */}
        <main className="flex-grow md:ml-12 text-slate-900">
          <header className="mb-10">
            <h1 className="text-3xl font-black mb-2">Hồ sơ công khai</h1>
            <p className="text-gray-500 text-sm">Quản lý thông tin cá nhân và cách người dùng khác nhìn thấy bạn trên ServiceHub.</p>
          </header>

          {/* Form Chỉnh sửa Profile */}
          <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden mb-8">
            <div className="p-8 space-y-10">
              
              {/* Ảnh đại diện */}
              <div className="flex items-center gap-8">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center text-orange-400">
                   <User size={48} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Ảnh đại diện</h3>
                  <p className="text-xs text-gray-400 mb-4">JPG, GIF hoặc PNG. Kích thước tối đa 800K</p>
                  <div className="flex gap-3">
                    <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-700 transition-all shadow-md shadow-blue-100">
                      <Upload size={14} /> Tải ảnh mới
                    </button>
                    <button className="bg-gray-100 text-gray-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all">
                      Gỡ bỏ
                    </button>
                  </div>
                </div>
              </div>

              {/* Các trường nhập liệu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-900">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 px-1">Họ và tên</label>
                  <input type="text" defaultValue="John Doe" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 px-1">Ngày sinh</label>
                  <input type="text" defaultValue="15/05/1990" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 px-1">Địa chỉ Email</label>
                  <div className="relative">
                    <input type="email" defaultValue="johndoe@example.com" disabled className="w-full bg-gray-100 border border-gray-200 rounded-xl py-3 px-4 text-sm text-gray-400 cursor-not-allowed outline-none" />
                    <Shield className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300" size={16} />
                  </div>
                  <p className="text-[10px] text-gray-400 px-1">Email không thể thay đổi thủ công. Vui lòng liên hệ hỗ trợ.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-700 px-1">Số điện thoại</label>
                  <input type="text" defaultValue="+84 900 000 000" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-700 px-1">Giới thiệu bản thân</label>
                  <textarea rows="4" placeholder="Hãy kể một chút về bạn..." className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-none"></textarea>
                </div>
              </div>
            </div>

            {/* Nút lưu */}
            <div className="bg-gray-50/50 p-6 flex justify-end gap-3 border-t border-gray-100">
              <button className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-700">Hủy bỏ</button>
              <button className="bg-blue-600 text-white px-8 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">Lưu thay đổi</button>
            </div>
          </div>

          {/* Các thẻ phụ phía dưới */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
                  <Shield size={18} /> Xác minh tài khoản
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">Tài khoản của bạn đã được xác minh. Điều này giúp xây dựng lòng tin trong cộng đồng.</p>
              </div>
              <div className="flex items-center gap-1.5 text-green-500 bg-green-50 w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase">
                <CheckCircle size={14} /> Đã xác minh
              </div>
            </div>

            <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-4">
                  <Globe size={18} /> Ngôn ngữ & Vùng
                </div>
                <p className="text-gray-500 text-xs leading-relaxed mb-6">Thiết lập ngôn ngữ và múi giờ ưu tiên của bạn.</p>
              </div>
              <button className="text-blue-600 text-xs font-bold hover:underline w-fit uppercase">Thay đổi thiết lập</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Quan_ly_ho_so;