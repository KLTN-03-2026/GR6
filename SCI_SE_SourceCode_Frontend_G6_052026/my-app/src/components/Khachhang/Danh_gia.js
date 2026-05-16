import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api'; 
import { Star, Briefcase } from 'lucide-react';
import { toast } from 'react-toastify';

const Danh_gia = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [appointmentDetail, setAppointmentDetail] = useState(null);
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await api.get(`/khach-hang/chi-tiet-dat-lich/${id}`);
        if (response.data && response.data.status) {
          setAppointmentDetail(response.data.data);
          console.log("Dữ liệu lịch hẹn:", response.data.data);
        }
      } catch (error) {
        console.error("Lỗi khi lấy thông tin dịch vụ:", error);
      }
    };
    fetchAppointment();
  }, [id]);

  const handleSubmit = async () => {
    if (!appointmentDetail || !appointmentDetail.id_dich_vu) {
      alert("Đang tải thông tin dịch vụ, vui lòng đợi trong giây lát!");
      return;
    }

    if (!comment.trim()) {
      alert("Vui lòng nhập nội dung nhận xét!");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        id_dich_vu: appointmentDetail.id_dich_vu, 
        muc_hai_long: rating,
        noi_dung: comment, 
      };

      const response = await api.post('/danh-gia/create', payload);

      if (response.data.status) {
        toast.success(response.data.message);
        navigate(-1); 
      } else {
        toast.error(response.data.message || "Đã có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi khi gửi đánh giá:", error);
      const errorMsg = error.response?.data?.message || "Không thể gửi đánh giá. Vui lòng kiểm tra lại kết nối!";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
      <div className="bg-white w-full max-w-[500px] rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-[#f1f5f9]">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 bg-[#eff6ff] rounded-2xl flex items-center justify-center mb-6">
            <Briefcase className="text-[#3b82f6]" size={28} strokeWidth={2.5} />
          </div>
          <h1 className="text-[24px] font-bold text-[#0f172a] leading-tight mb-2">
            Trải nghiệm của bạn với {appointmentDetail?.ten_dich_vu || 'dịch vụ'} thế nào?
          </h1>
          <p className="text-[#64748b] text-[15px]">
            Phản hồi của bạn giúp chúng tôi cải thiện chất lượng tốt hơn.
          </p>
        </div>
        <div className="flex flex-col items-center mb-8">
          <span className="text-[11px] font-bold text-[#94a3b8] uppercase tracking-[1.5px] mb-4">
            CHỌN XẾP HẠNG
          </span>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform active:scale-90 disabled:opacity-50"
                disabled={isSubmitting}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => setRating(star)}
              >
                <Star
                  size={36}
                  fill={(hover || rating) >= star ? "#fbbf24" : "transparent"}
                  color={(hover || rating) >= star ? "#fbbf24" : "#e2e8f0"}
                  strokeWidth={2}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-[15px] font-bold text-[#334155] mb-2">
            Viết nhận xét của bạn
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={isSubmitting}
            placeholder="Chia sẻ chi tiết về trải nghiệm của bạn. Điều gì tốt? Điều gì cần cải thiện?"
            className="w-full h-[150px] bg-white border border-[#e2e8f0] rounded-[20px] p-4 text-[15px] focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all placeholder:text-[#94a3b8] resize-none disabled:bg-slate-50"
          />
        </div>

        {/* Nút Gửi */}
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !appointmentDetail}
          className={`w-full ${isSubmitting || !appointmentDetail ? 'bg-slate-400 cursor-not-allowed' : 'bg-[#3b82f6] hover:bg-[#2563eb]'} text-white py-4 rounded-[18px] font-bold text-[16px] transition-all shadow-lg shadow-blue-100 active:scale-[0.98] mb-4 flex items-center justify-center gap-2`}
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </button>

        {/* Footer */}
        <p className="text-center text-[12px] text-[#94a3b8]">
          Bằng cách gửi, bạn đồng ý với{' '}
          <span className="underline cursor-pointer">Hướng dẫn cộng đồng</span> của chúng tôi.
        </p>
      </div>
    </div>
  );
};

export default Danh_gia;