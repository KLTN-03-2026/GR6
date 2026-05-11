import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, User, Mail, Phone, 
  MessageSquare, ShieldCheck, Lock, Check 
} from 'lucide-react';
import api from '../../api'; // Đảm bảo đường dẫn này đúng với project của bạn
import { toast } from 'react-toastify';
import { useSearchParams } from 'react-router-dom';

const Thanh_toan = () => {
  const { id } = useParams(); 
  const [paymentMethod, setPaymentMethod] = useState('full');
  const [bookingData, setBookingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    const fetchBookingDetail = async () => {
      try {
        setIsLoading(true);
        const res = await api.get(`/khach-hang/chi-tiet-dat-lich/${id}`);
        console.log("Booking Detail Response:", res.data);
        if (res.data.status) {
          setBookingData(res.data.data);
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.error("Error fetching booking detail:", error);
        toast.error("Không thể tải thông tin đơn hàng");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchBookingDetail();
    if(status === 'false') {
    toast.error("Thanh toán thất bại hoặc đã bị hủy!");
  }
  }, [id]);

  // Tính toán số tiền trước để dùng cho cả UI và API
  const price = bookingData?.don_gia || 0;
  const quantity = bookingData?.so_luong || 1;
  const subTotal = price * quantity;
  const depositAmount = subTotal * 0.3; // 30% cọc

  // Hàm xử lý thanh toán khi click nút
  const handlePayment = async () => {
    try {
      setIsProcessing(true);
      const amountToPay = paymentMethod === 'full' ? subTotal : depositAmount;

      // Gọi đến Route Backend
      const res = await api.post('/vnpay-payment', {
        id_chi_tiet_dat_lich: id,
        payment_type: paymentMethod, 
        so_tien: amountToPay 
      });

      if (res.data.status && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Payment error:", error);
      const errorMsg = error.response?.data?.message || "Lỗi hệ thống khi thanh toán";
      toast.error(errorMsg);
    } finally {
      setIsProcessing(false);
    }
  };
  

  const formatVND = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  if (isLoading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse">Đang tải thông tin thanh toán...</div>;
  if (!bookingData) return <div className="p-20 text-center">Không tìm thấy đơn hàng.</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
      {/* 1. Progress Stepper */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center justify-center relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -translate-y-1/2 z-0"></div>
          <div className="absolute top-1/2 left-1/4 w-1/2 h-0.5 bg-blue-500 -translate-y-1/2 z-0"></div>
          
          <div className="flex justify-between w-full max-w-2xl z-10">
            <StepItem icon={<Check size={20}/>} label="DỊCH VỤ" active completed />
            <StepItem icon={<div className="w-5 h-5 bg-white rounded-sm border-2 border-blue-500" />} label="THANH TOÁN" active />
            <StepItem icon={<Check size={20}/>} label="HOÀN TẤT" disabled />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Service Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
              <span className="text-blue-500"></span> Thông tin dịch vụ
            </h2>
            <div className="flex flex-col md:flex-row gap-5">
              <img 
                src={bookingData.hinh_anh} 
                alt="Spa" 
                className="w-full md:w-40 h-32 object-cover rounded-xl"
              />
              <div className="space-y-2">
                <h3 className="font-bold text-xl text-slate-800">{bookingData.ten_dich_vu}</h3>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Calendar size={16}/> <span>{new Date(bookingData.ngay_dat_lich).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <Clock size={16}/> <span>{bookingData.gio_bat_dau} (Nhân viên: {bookingData.ten_nhan_vien})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500 text-sm">
                  <MapPin size={16}/> <span>{bookingData.dia_chi_thuc_hien || bookingData.dia_chi}</span>
                </div>
                <div className="mt-2 inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded">
                  MÃ HÓA ĐƠN: {bookingData.ma_hoa_don}
                </div>
              </div>
            </div>
          </div>

          {/* Customer Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="text-lg font-bold flex items-center gap-2 mb-6 text-slate-800">
              <User size={20} className="text-blue-500" /> Thông tin khách hàng
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Họ và tên</p>
                <p className="font-semibold text-slate-800">{bookingData.ten_khach_hang}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Số điện thoại</p>
                <p className="font-semibold text-slate-800">{bookingData.so_dien_thoai}</p>
              </div>
              <div className="md:col-span-2 border-t border-slate-50 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                <p className="font-semibold text-slate-800">{bookingData.email}</p>
              </div>
              <div className="md:col-span-2 border-t border-slate-50 pt-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ghi chú</p>
                <p className="text-slate-600 italic">"{bookingData.ghi_chu || "Không có ghi chú"}"</p>
              </div>
            </div>
          </div>

          {/* PCI Security Banner */}
          <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 flex items-center gap-3">
            <ShieldCheck className="text-blue-500" size={24} />
            <p className="text-sm text-slate-600">Thông tin của bạn được bảo mật tuyệt đối theo chuẩn PCI DSS.</p>
          </div>
        </div>

        {/* RIGHT COLUMN: PAYMENT SUMMARY */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 h-fit">
          <h2 className="text-xl font-bold mb-6 text-slate-800">Tóm tắt thanh toán</h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-slate-500">
              <span>Giá dịch vụ ({bookingData.so_luong} suất)</span>
              <span>{formatVND(subTotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Phí dịch vụ</span>
              <span>{formatVND(0)}</span>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
              <span className="text-lg font-bold text-slate-800">Tổng cộng</span>
              <span className="text-2xl font-black text-blue-600">{formatVND(subTotal)}</span>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3">Chọn phương thức thanh toán</p>
            
            <PaymentOption 
              id="full"
              selected={paymentMethod === 'full'}
              onClick={() => setPaymentMethod('full')}
              title="Thanh toán 100%"
              description="Thanh toán toàn bộ để hoàn tất dịch vụ"
              price={formatVND(subTotal)}
            />

            <PaymentOption 
              id="deposit"
              selected={paymentMethod === 'deposit'}
              onClick={() => setPaymentMethod('deposit')}
              title="Đặt cọc trước 30%"
              description="Phần còn lại thanh toán tại cửa hàng"
              price={formatVND(depositAmount)}
            />
          </div>

          <button 
            onClick={handlePayment}
            disabled={isProcessing}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 mb-6 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isProcessing ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Lock size={18} />
            )}
            {isProcessing ? 'Đang xử lý...' : `Thanh toán ${paymentMethod === 'full' ? formatVND(subTotal) : formatVND(depositAmount)}`}
          </button>

          <div className="flex justify-center gap-4 mb-6 opacity-60">
            <div className="w-10 h-6 bg-slate-200 rounded"></div>
            <div className="w-10 h-6 bg-slate-200 rounded"></div>
            <div className="w-10 h-6 bg-slate-200 rounded"></div>
          </div>

          <p className="text-[10px] text-center text-slate-400 leading-relaxed px-4">
            Bằng cách nhấn thanh toán, bạn đồng ý với <span className="text-blue-400 cursor-pointer">Điều khoản dịch vụ</span> và <span className="text-blue-400 cursor-pointer">Chính sách hoàn tiền</span> của chúng tôi.
          </p>
        </div>
      </div>
    </div>
  );
};

const StepItem = ({ icon, label, active, completed, disabled }) => (
  <div className="flex flex-col items-center gap-2 group cursor-default">
    <div className={`
      w-10 h-10 rounded-full flex items-center justify-center transition-all border-2
      ${active ? 'bg-blue-500 border-blue-500 text-white shadow-md' : 'bg-white border-slate-200 text-slate-300'}
      ${completed ? 'bg-blue-500' : ''}
    `}>
      {icon}
    </div>
    <span className={`text-[10px] font-bold tracking-widest ${active ? 'text-blue-500' : 'text-slate-400'}`}>
      {label}
    </span>
  </div>
);

const PaymentOption = ({ selected, onClick, title, description, price }) => (
  <div 
    onClick={onClick}
    className={`
      border-2 rounded-xl p-4 cursor-pointer transition-all flex items-start gap-3
      ${selected ? 'border-blue-500 bg-blue-50/30' : 'border-slate-100 bg-white hover:border-slate-200'}
    `}
  >
    <div className={`
      w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
      ${selected ? 'border-blue-500' : 'border-slate-300'}
    `}>
      {selected && <div className="w-2.5 h-2.5 bg-blue-500 rounded-full" />}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <h4 className="font-bold text-sm text-slate-800">{title}</h4>
        <span className="font-bold text-sm text-slate-800">{price}</span>
      </div>
      <p className="text-[11px] text-slate-500 mt-1 leading-tight">{description}</p>
    </div>
  </div>
);

export default Thanh_toan;