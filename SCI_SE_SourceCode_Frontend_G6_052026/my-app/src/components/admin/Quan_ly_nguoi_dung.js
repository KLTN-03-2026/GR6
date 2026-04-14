import React, { useState } from 'react';
import { 
  Users, UserCheck, UserPlus, UserX, 
  FileText, Settings, LayoutDashboard, List, 
  HelpCircle, LogOut, Download, Check, X, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { Link, useNavigate, useLocation } from "react-router-dom";
const Quan_ly_nguoi_dung = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const stats = [
    { label: "TỔNG NGƯỜI DÙNG", value: "1,284", trend: "+12%", icon: <Users className="text-blue-500" />, color: "bg-blue-50" },
    { label: "TÀI KHOẢN HOẠT ĐỘNG", value: "1,102", icon: <UserCheck className="text-blue-500" />, color: "bg-white", border: true },
    { label: "KHÁCH HÀNG MỚI (30 NGÀY)", value: "48", trend: "Xu hướng tăng", color: "bg-white", border: true },
    { label: "TÀI KHOẢN BỊ CẤM", value: "12", icon: <UserX className="text-red-500" />, color: "bg-white", border: true },
  ];

  const users = [
    { id: "SH-8821", name: "Nguyễn Thành Long", email: "long.nt@example.com", role: "ADMIN", status: "Active", avatar: "NL" },
    { id: "SH-8819", name: "Trần Thị Hoa", email: "hoa.tt@outlook.com", role: "CUSTOMER", status: "Active", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hoa" },
    { id: "SH-8750", name: "Phạm Văn Nam", email: "nam.pv@gmail.com", role: "CUSTOMER", status: "Banned", avatar: "PV" },
    { id: "SH-8742", name: "Lê Minh Tuấn", email: "tuan.lm@outlook.com", role: "CUSTOMER", status: "Active", avatar: "LMT" },
    { id: "SH-8740", name: "Đặng Văn Hùng", email: "hung.dv@serverhub.tech", role: "ADMIN", status: "Active", img: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hung" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
              <nav className="flex-grow px-4 space-y-1 text-slate-600 font-medium">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
                  <LayoutDashboard size={18} /> Bảng điều khiển
                </button>
                <Link to="/admin/quan-ly-danh-muc">
                  <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all">
                    <List size={18} /> Danh mục
                  </button>
                </Link>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold bg-blue-50 text-blue-600 rounded-xl transition-all">
                  <Users size={18} /> Khách hàng
                </button>
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
      <main className="flex-grow p-8 overflow-y-auto">
        {/* Title & Actions */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Quản lý người dùng</h1>
            <p className="text-gray-500 text-sm">Xem và điều chỉnh quyền truy cập của các thành viên trong hệ thống.</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-blue-600 hover:bg-gray-50 transition-all">
              <Download size={18} /> Xuất báo cáo
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 rounded-xl text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
              <UserPlus size={18} /> Tạo tài khoản
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} p-6 rounded-3xl ${s.border ? 'border border-gray-100' : 'shadow-lg shadow-blue-100'} flex flex-col justify-between h-36`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{s.label}</span>
                {s.icon && <div className="p-2 bg-blue-50/50 rounded-lg">{s.icon}</div>}
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-gray-900">{s.value}</span>
                {s.trend && <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.trend.includes('+') ? 'bg-green-50 text-green-500' : 'bg-blue-50 text-blue-500'}`}>{s.trend}</span>}
              </div>
            </div>
          ))}
        </div>

        {/* User Table Card */}
        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div className="flex gap-4">
              <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-600 focus:ring-0">
                <option>Vai trò: Tất cả</option>
              </select>
              <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold text-gray-600 focus:ring-0">
                <option>Trạng thái: Tất cả</option>
              </select>
            </div>
            <span className="text-xs text-gray-400 font-medium">Đang hiển thị 10 trong số 1,284 người dùng</span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="px-8 py-5 font-black">USERID</th>
                <th className="px-8 py-5 font-black">HỌ VÀ TÊN</th>
                <th className="px-8 py-5 font-black">EMAIL</th>
                <th className="px-8 py-5 font-black">VAI TRÒ</th>
                <th className="px-8 py-5 font-black">TRẠNG THÁI</th>
                <th className="px-8 py-5 font-black text-right">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-gray-400">{u.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      {u.img ? (
                        <img src={u.img} className="w-10 h-10 rounded-full" alt="avatar" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">{u.avatar}</div>
                      )}
                      <span className="text-sm font-bold text-gray-900">{u.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">{u.email}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tight">{u.role}</span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${u.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-bold ${u.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{u.status}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-green-500 bg-green-50 rounded-lg hover:bg-green-100 transition-all"><Check size={16} /></button>
                      <button className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-100 transition-all"><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="p-6 border-t border-gray-50 flex justify-between items-center">
            <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900"><ChevronLeft size={16} /> Trước</button>
            <div className="flex gap-2">
              {[1, 2, 3, '...', 128].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-100'}`}>{p}</button>
              ))}
            </div>
            <button className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900">Tiếp theo <ChevronRight size={16} /></button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Quan_ly_nguoi_dung;