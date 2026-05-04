import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Leaf, Calendar, Users, BarChart3, HelpCircle, 
  LogOut, Plus, Scissors, Filter, Download, Pencil, Trash2, 
  ChevronLeft, ChevronRight, Smile, Zap, EyeOff, MoreHorizontal, Loader2
} from 'lucide-react';
import { serviceApi } from '../../api/index';

const Quan_ly_dich_vu = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Hàm load dữ liệu
  const loadData = async () => {
    setLoading(true);
    try {
      // Gọi API với interceptor đã cấu hình sẵn để đính kèm localStorage.getItem("token")
      const res = await serviceApi.getDichVu();
      
      if (res.data.status) {
        // MẸO: Nếu Backend lỡ trả về toàn bộ, chúng ta có thể lọc lại một lần nữa ở đây
        // Giả sử thông tin nhà cung cấp cũng được lưu trong một key khác ở localStorage
        const nccInfo = JSON.parse(localStorage.getItem("ncc_info")); 
        
        if (nccInfo && nccInfo.id) {
          // Chỉ lấy những dịch vụ có id_nha_cung_cap trùng với NCC đang đăng nhập
          const filteredData = res.data.data.filter(item => item.id_nha_cung_cap === nccInfo.id);
          setServices(filteredData);
        } else {
          // Nếu không có thông tin lọc thêm, hiển thị theo dữ liệu Backend đã lọc bằng Token
          setServices(res.data.data);
        }
      }
    } catch (err) {
      console.error("Lỗi xác thực hoặc API không phản hồi");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Hàm render icon (giữ nguyên UI)
  const renderIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('massage')) return <Zap className="text-blue-500" />;
    if (n.includes('cắt')) return <Scissors className="text-blue-500" />;
    return <Leaf className="text-blue-500" />;
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-700">
      {/* Sidebar - Giữ nguyên UI */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavItem icon={<LayoutDashboard size={20} />} label="Bảng điều khiển" />
          <NavItem icon={<Leaf size={20} />} label="Dịch vụ" active />
          <NavItem icon={<Calendar size={20} />} label="Lịch hẹn" />
          <NavItem icon={<Users size={20} />} label="Khách hàng" />
          <NavItem icon={<BarChart3 size={20} />} label="Báo cáo" />
        </nav>
        <div className="p-4 border-t border-slate-100">
          <NavItem icon={<LogOut size={20} />} label="Đăng xuất" />
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto w-full">
          
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Quản lý dịch vụ</h1>
              <p className="text-slate-500 text-sm italic font-medium">
                Cửa hàng: <span className="text-blue-600">Dữ liệu được lọc theo tài khoản NCC</span>
              </p>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium shadow-lg shadow-blue-200">
              <Plus size={20} /> Thêm dịch vụ mới
            </button>
          </div>

          {/* Stats Cards - Cập nhật số liệu thực tế */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard icon={<Leaf className="text-blue-600" />} label="DỊCH VỤ CỦA BẠN" value={services.length} bgColor="bg-blue-50" />
            <StatCard icon={<LayoutDashboard className="text-orange-500" />} label="DANH MỤC" value="02" bgColor="bg-orange-50" />
            <StatCard icon={<EyeOff className="text-slate-500" />} label="ĐANG ẨN" value="0" bgColor="bg-slate-100" />
            <StatCard icon={<MoreHorizontal className="text-red-400" />} label="CHỜ DUYỆT" value="0" bgColor="bg-red-50" />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Scissors className="text-blue-500 rotate-90" size={20} /> Danh sách dịch vụ nhà cung cấp
              </div>
            </div>

            <div className="overflow-x-auto min-h-[400px]">
              {loading ? (
                <div className="flex flex-col items-center justify-center p-20">
                  <Loader2 className="animate-spin text-blue-500 mb-4" size={40} />
                  <p className="text-slate-400">Đang đồng bộ dịch vụ...</p>
                </div>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-50">
                      <th className="px-6 py-4 font-bold">Tên dịch vụ</th>
                      <th className="px-6 py-4 font-bold text-center">Đơn giá</th>
                      <th className="px-6 py-4 font-bold">Trạng thái</th>
                      <th className="px-6 py-4 font-bold text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {services.length > 0 ? services.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                              {renderIcon(item.ten_dich_vu)}
                            </div>
                            <div>
                              <p className="font-bold text-slate-700 text-sm">{item.ten_dich_vu}</p>
                              <p className="text-xs text-slate-400 line-clamp-1">{item.mo_ta_ngan}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-bold text-blue-600 text-center">
                            {Number(item.don_gia).toLocaleString('vi-VN')}đ
                          </p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold text-center">/ SUẤT</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-full flex items-center w-fit gap-1.5">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                            {item.trang_thai === 1 ? 'Hoạt động' : 'Tạm ẩn'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-3">
                            <button className="p-2 border border-blue-100 rounded-lg text-blue-500 hover:bg-blue-50 transition-all">
                              <Pencil size={16} />
                            </button>
                            <button className="p-2 border border-red-100 rounded-lg text-red-500 hover:bg-red-50 transition-all">
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan="4" className="px-6 py-20 text-center">
                          <div className="flex flex-col items-center gap-2">
                             <EyeOff className="text-slate-300" size={48} />
                             <p className="text-slate-400 font-medium">Bạn chưa đăng dịch vụ nào.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-between items-center text-sm text-slate-500">
              <span>Hiển thị {services.length} dịch vụ cá nhân</span>
              <div className="flex gap-2">
                <button className="p-2 border border-slate-200 rounded-lg"><ChevronLeft size={16}/></button>
                <button className="w-8 h-8 bg-blue-600 text-white rounded-lg font-bold">1</button>
                <button className="p-2 border border-slate-200 rounded-lg"><ChevronRight size={16}/></button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Sub-components giữ nguyên UI gốc của bạn
const NavItem = ({ icon, label, active = false }) => (
  <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
    {icon}
    <span className="text-sm">{label}</span>
  </div>
);

const StatCard = ({ icon, label, value, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-slate-200 flex items-center gap-4">
    <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center shrink-0`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">{label}</p>
      <p className="text-2xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

export default Quan_ly_dich_vu;