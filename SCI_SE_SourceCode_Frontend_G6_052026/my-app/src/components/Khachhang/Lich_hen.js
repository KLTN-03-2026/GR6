import React, { useState, useEffect } from 'react';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ChevronRight, ChevronDown, Wallet } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Lich_hen = () => {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
    const status = searchParams.get('status');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/khach-hang/dat-lich/get-data');
      if (response.data && response.data.status) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lịch hẹn:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
     if(status === 'true') {
        toast.error("Thanh toán thất bại hoặc đã bị hủy!");
      }
  }, []);

  const getStatusDetail = (status) => {
    const map = {
      0: { label: "Đang chờ", class: "bg-[#fff2e6] text-[#ff8c00]" },
      1: { label: "Xác nhận", class: "bg-[#e6f9f0] text-[#00b050]" },
      2: { label: "Đã xong", class: "bg-[#f1f4f9] text-[#718096]" },
      3: { label: "Đã hủy", class: "bg-[#fff0f0] text-[#e53e3e]" }
    };
    return map[status] || { label: "Không xác định", class: "bg-gray-100 text-gray-500" };
  };

  const filteredAppointments = appointments.filter(item => {
    if (activeTab === 'Tất cả') return true;
    if (activeTab === 'Sắp tới') return item.trang_thai_dat_lich === 0 || item.trang_thai_dat_lich === 1;
    if (activeTab === 'Đã hoàn thành') return item.trang_thai_dat_lich === 2;
    if (activeTab === 'Đã hủy') return item.trang_thai_dat_lich === 3;
    return true;
  });

  if (loading) return <div className="p-10 text-center text-slate-500 font-medium animate-pulse">Đang tải lịch hẹn...</div>;

  return (
    <div className="bg-[#f8fafc] min-h-screen p-8 font-sans text-[#2d3748]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-[32px] font-bold text-[#1a202c] mb-2">Lịch hẹn của tôi</h1>
          <p className="text-[#718096] text-lg">Quản lý các cuộc hẹn chăm sóc sức khỏe và làm đẹp của bạn.</p>
        </header>

        <div className="flex gap-10 border-b border-[#e2e8f0] mb-8 relative">
          {['Tất cả', 'Sắp tới', 'Đã hoàn thành', 'Đã hủy'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-[15px] font-semibold transition-all relative ${
                activeTab === tab ? "text-[#3182ce]" : "text-[#718096]"
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-1px] left-0 w-full h-[3px] bg-[#4299e1] rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-5">
          {filteredAppointments.length > 0 ? filteredAppointments.map((item) => {
            const status = getStatusDetail(item.trang_thai_dat_lich);
            const tien_con_lai = Number(item.trang_thai_dat_lich) === 2 
              ? 0 
              : (item.tong_tien_thanh_toan || 0) - (item.tong_tien_da_nhan || 0);
            const isCancelled = item.trang_thai_dat_lich === 3;

            return (
              <div 
                key={item.id} 
                className={`bg-white rounded-[24px] p-5 flex gap-7 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] border border-white hover:border-[#e2e8f0] transition-all group relative ${isCancelled ? 'opacity-80' : ''}`}
              >
                {/* ẢNH */}
                <div className="w-[200px] h-[135px] flex-shrink-0 rounded-[20px] overflow-hidden border border-[#edf2f7]">
                  <img 
                    src={item.hinh_anh || "https://via.placeholder.com/200x135"} 
                    alt={item.ten_dich_vu} 
                    className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ${isCancelled ? 'grayscale' : ''}`} 
                  />
                </div>

                {/* NỘI DUNG CHÍNH (CĂN GIỮA THEO CHIỀU DỌC ẢNH) */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className={`text-xl font-bold mb-1 ${isCancelled ? 'text-[#a0aec0]' : 'text-[#2d3748]'}`}>
                          {item.ten_dich_vu}
                        </h3>
                        <p className="text-[#4299e1] font-semibold text-sm mb-3">{item.ten_thuong_hieu}</p>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[12px] font-bold ${status.class}`}>
                        {status.label}
                      </span>
                    </div>

                    {/* DÒNG NGÀY GIỜ: Luôn nằm cố định ở đây */}
                    <div className="flex items-center gap-8 text-[#718096]">
                      <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-[#a0aec0]" />
                        <span className="text-[15px]">{item.ngay_dat_lich}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-[#a0aec0]" />
                        <span className="text-[15px]">{item.gio_bat_dau}</span>
                      </div>
                    </div>
                  </div>

                  {/* CHI TIẾT: Luôn nằm ở đáy cột bên cạnh ảnh */}
                  <div className="mt-auto">
                    <button 
                      onClick={() => navigate(`/chi-tiet-lich-hen/${item.id_chi_tiet_dat_lich}`)}
                      className="flex items-center text-[#4299e1] text-[14px] font-bold hover:translate-x-1 transition-transform"
                    >
                      Chi tiết lịch hẹn <ChevronRight size={16} className="ml-1" />
                    </button>
                  </div>
                </div>

                {/* PHẦN TIỀN: Đưa ra ngoài luồng nội dung chính bằng absolute để không làm lệch dòng ngày giờ */}
                {!isCancelled && (
                  <div className="absolute right-6 bottom-5 flex flex-col items-end group/money">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#a0aec0] mb-1">
                      Số tiền còn lại
                    </span>
                    <div className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-xl transition-all duration-300
                      ${tien_con_lai > 0 
                        ? "bg-orange-50 text-orange-600 ring-1 ring-orange-200" 
                        : "bg-green-50 text-green-600 ring-1 ring-green-200"}
                    `}>
                      <Wallet size={14} className={tien_con_lai > 0 ? "text-orange-400" : "text-green-400"} />
                      <span className="text-[16px] font-black tracking-tight">
                        {new Intl.NumberFormat('vi-VN').format(tien_con_lai)}
                        <span className="text-[12px] ml-0.5">đ</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          }) : (
            <div className="text-center py-20 text-slate-400 font-medium bg-white rounded-3xl border-2 border-dashed border-slate-100">
              Không tìm thấy lịch hẹn nào trong mục này.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lich_hen;