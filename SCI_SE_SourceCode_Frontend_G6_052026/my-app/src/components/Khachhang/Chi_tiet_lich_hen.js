import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import {
  Clock, Calendar, MapPin, Phone, Mail,
  User, RefreshCw, XCircle, Navigation, Star
} from 'lucide-react';
import { toast } from 'react-toastify';

const Chi_tiet_lich_hen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatCreatedAt = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes}, ${day}/${month}/${year}`;
  };

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/khach-hang/chi-tiet-dat-lich/${id}`);
      if (response.data && response.data.status) {
        setAppointment(response.data.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy chi tiết lịch hẹn:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id]);

  // --- SỬA HÀM HỦY: Nhận trực tiếp id_dat_lich ---
  const handleCancel = async (id_dat_lich) => {
    if (!id_dat_lich) {
        toast.error("Không tìm thấy mã đặt lịch!");
        return;
    }

    if (window.confirm("Bạn có chắc chắn muốn hủy lịch hẹn này không?")) {
      try {
        const response = await api.get(`/dat-lich/huy/${id_dat_lich}`);
        
        if (response.data && response.data.status) {
          toast.success("Hủy lịch hẹn thành công!");
          fetchDetail(); // Load lại dữ liệu để cập nhật trạng thái UI
        } else {
          toast.error(response.data.message || "Không thể hủy lịch hẹn.");
        }
      } catch (error) {
        const errorData = error.response?.data?.message;
        if (Array.isArray(errorData)) {
          errorData.forEach((msg) => toast.error(msg));
        } else {
          toast.error(errorData || "Đã có lỗi xảy ra khi hủy!");
        }
      }
    }
  };

  if (loading) return <div className="p-20 text-center text-slate-500 font-bold animate-pulse">Đang tải thông tin...</div>;
  if (!appointment) return <div className="p-20 text-center text-red-500 font-bold">Không tìm thấy dữ liệu lịch hẹn!</div>;

  const getStatusInfo = (status) => {
    const map = {
      1: { label: "Đã xác nhận", bg: "bg-[#e6f9f0]", text: "text-[#00b050]", dot: "bg-[#00b050]" },
      2: { label: "Đã hoàn thành", bg: "bg-[#f1f4f9]", text: "text-[#718096]", dot: "bg-[#718096]" },
      3: { label: "Đã hủy", bg: "bg-[#fee2e2]", text: "text-[#ef4444]", dot: "bg-[#ef4444]" }
    };
    return map[status] || { label: "Chờ xác nhận", bg: "bg-gray-100", text: "text-gray-500", dot: "bg-gray-500" };
  };

  const statusStyle = getStatusInfo(appointment.trang_thai_dat_lich);
  
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-[#1a202c]">
      <div className="max-w-5xl mx-auto">

        <header className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-[#3182ce] font-bold mb-4 flex items-center gap-1 hover:underline"
          >
            &larr; Quay lại
          </button>
          <h1 className="text-3xl font-extrabold mb-3">Chi tiết lịch hẹn </h1>
          <div className="flex items-center gap-4">
            <span className={`${statusStyle.bg} ${statusStyle.text} px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-2`}>
              <span className={`w-2 h-2 ${statusStyle.dot} rounded-full animate-pulse`}></span>
              {statusStyle.label}
            </span>
            <span className="text-[#718096] text-sm">
                Đặt lúc: {formatCreatedAt(appointment.created_at)}
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">

            <div className="bg-white p-6 rounded-[32px] shadow-sm flex gap-6 items-center border border-white">
              <img
                src={appointment.hinh_anh || "https://via.placeholder.com/200"}
                alt="Service"
                className="w-28 h-28 rounded-2xl object-cover"
              />
              <div className="space-y-2">
                <span className="text-[#3182ce] text-[10px] font-black uppercase tracking-[2px]">
                  DỊCH VỤ CHUYÊN NGHIỆP
                </span>
                <h2 className="text-2xl font-bold leading-tight">{appointment.ten_dich_vu}</h2>
                <div className="flex items-center gap-6 text-[#718096] font-medium pt-1">
                  <div className="flex items-center gap-2">
                    <Clock size={18} className="text-[#3182ce]" />
                    <span>{appointment.thoi_gian_du_kien || '0'} phút</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#2d3748]">
                      {new Intl.NumberFormat('vi-VN').format(Math.round(appointment.don_gia))}đ
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#f1f5f9] p-5 rounded-[24px] flex items-center gap-4">
                <div className="w-12 h-12 bg-[#3182ce15] text-[#3182ce] rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-wider">Nhân viên thực hiện</p>
                  <p className="font-bold text-lg">{appointment.ten_nhan_vien || 'Đang cập nhật'}</p>
                </div>
              </div>
              <div className="bg-[#f1f5f9] p-5 rounded-[24px] flex items-center gap-4">
                <div className="w-12 h-12 bg-[#3182ce15] text-[#3182ce] rounded-full flex items-center justify-center">
                  <Calendar size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-wider">Thời gian hẹn</p>
                  <p className="font-bold text-lg">
                    {appointment.ngay_dat_lich ? new Date(appointment.ngay_dat_lich).toLocaleDateString('vi-VN', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                    }) : 'Đang cập nhật'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[32px] shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[#3182ce] rounded-full"></div>
                <h3 className="font-bold text-lg">Khung giờ chi tiết</h3>
              </div>

              <div className="bg-[#f8fafc] p-6 rounded-[24px] flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-[#3182ce] rounded-full flex items-center justify-center shadow-sm">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-[#3182ce] uppercase tracking-wider">Bắt đầu - Kết thúc</p>
                    <p className="font-black text-2xl tracking-tight">{appointment.gio_bat_dau?.slice(0, 5)} - {appointment.gio_ket_thuc?.slice(0, 5) || '...'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#a0aec0] uppercase tracking-wider">Tổng Cộng</p>
                  <p className="font-bold text-xl">{new Intl.NumberFormat('vi-VN').format(Math.round(appointment.don_gia))}đ</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
              {appointment.trang_thai_dat_lich === 2 && (
                <button
                  onClick={() => navigate(`/danh-gia/${appointment.id}`)}
                  className="bg-[#3182ce] hover:bg-[#2b6cb0] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-100"
                >
                  <Star size={18} /> Đánh giá dịch vụ
                </button>
              )}

              <button
                // --- SỬA NÚT HỦY: Truyền đúng id_dat_lich ---
                onClick={() => handleCancel(appointment.id_dat_lich)}
                disabled={appointment.trang_thai_dat_lich === 3 || appointment.trang_thai_dat_lich === 2}
                className="bg-white hover:bg-[#fff5f5] text-[#e53e3e] border border-[#fecaca] py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:bg-gray-50"
              >
                <XCircle size={18} /> 
                {appointment.trang_thai_dat_lich === 3 ? "Lịch đã hủy" : 
                 appointment.trang_thai_dat_lich === 2 ? "Đã hoàn thành" : "Hủy lịch hẹn"}
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-[#0a1f44] p-8 rounded-[32px] text-white space-y-6 relative overflow-hidden">
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-black">Cần giúp đỡ?</h3>
                <p className="text-[#a0aec0] text-sm leading-relaxed">
                  Đội ngũ CSKH của chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.
                </p>
              </div>

              <div className="space-y-3 relative z-10">
                <div className="bg-[#ffffff08] hover:bg-[#ffffff12] border border-[#ffffff10] p-4 rounded-2xl flex items-center gap-4 transition-all group cursor-pointer">
                  
                  <div>
                    <p className="text-[10px] font-bold text-[#718096] uppercase tracking-wider">Hotline</p>
                    <p className="font-bold text-lg">{appointment.so_dien_thoai_nha_cung_cap}</p>
                    <p className="text-[10px] font-bold text-[#718096] uppercase tracking-wider">Email</p>
                    <p className="font-bold text-lg">{appointment.email_nha_cung_cap}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chi_tiet_lich_hen;