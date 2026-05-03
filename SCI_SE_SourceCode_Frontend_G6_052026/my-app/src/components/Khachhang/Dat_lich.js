import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Clock, Calendar as CalendarIcon, ChevronLeft, Check, Phone } from 'lucide-react';
import api from '../../api'; 
import { toast } from 'react-toastify';

const Dat_lich = () => {
    const { id_thuong_hieu, id_dich_vu } = useParams();
    const navigate = useNavigate();

    // --- STATE DỮ LIỆU TỪ API ---
    const [serviceInfo, setServiceInfo] = useState(null);
    const [serviceImage, setServiceImage] = useState(null);
    const [listNhanVien, setListNhanVien] = useState([]);
    const [userProfile, setUserProfile] = useState({ ho_ten: '', so_dien_thoai: '' }); // State lưu info từ API
    const [isLoading, setIsLoading] = useState(true);

    // --- STATE LỰA CHỌN CỦA KHÁCH ---
    const [selectedDate, setSelectedDate] = useState(new Date().getDate());
    const [selectedStaff, setSelectedStaff] = useState(null); 
    const [selectedTime, setSelectedTime] = useState('09:00');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const times = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];
    
    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return { 
            dayNum: d.getDate(), 
            fullDate: d.toISOString().split('T')[0],
            month: d.getMonth() + 1,
            year: d.getFullYear()
        };
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                // Gọi đồng thời 4 API: Chi tiết DV, Danh sách ảnh, Nhân viên, và Profile Khách hàng
                const [resDetail, resImages, resStaff, resProfile] = await Promise.all([
                    api.get(`/dich-vu/chi-tiet-dich-vu/${id_dich_vu}`),
                    api.get("hinh-anh-dich-vu/get-data-hinh-anh"),
                    api.get(`/thuong-hieu/nhan-vien/get-data/${id_dich_vu}`),
                    api.get("/khach-hang/thong-tin-ca-nhan") // Lấy thông tin từ Route bạn đã cung cấp
                ]);

                if (resDetail.data.status) setServiceInfo(resDetail.data.data);

                if (resImages.data.status) {
                    const findImg = resImages.data.data.find(img => img.id_dich_vu === parseInt(id_dich_vu));
                    const rawPath = findImg?.hinh_anh;
                    if (rawPath) {
                        setServiceImage(rawPath.startsWith('http') ? rawPath : `http://127.0.0.1:8000/storage/${rawPath}`);
                    }
                }

                if (resStaff.data.status) setListNhanVien(resStaff.data.data);

                // Lưu thông tin người dùng từ API Profile
                if (resProfile.data.status) {
                    setUserProfile({
                        ten_khach_hang: resProfile.data.data.ten_khach_hang,
                        so_dien_thoai: resProfile.data.data.so_dien_thoai
                    });
                }

            } catch (error) {
                console.error("Lỗi fetch dữ liệu:", error);
                toast.error("Vui lòng đăng nhập để sử dụng tính năng này");
            } finally {
                setIsLoading(false);
            }
        };
        if (id_dich_vu) fetchData();
    }, [id_dich_vu]);

    const handleBooking = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.warning("Vui lòng đăng nhập hệ thống!");
            return;
        }

        setIsSubmitting(true);
        const selectedDayObj = days.find(d => d.dayNum === selectedDate);
        
        const payload = {
            id_thuong_hieu: id_thuong_hieu,
            id_dich_vu: id_dich_vu,
            id_nhan_vien: selectedStaff,
            ten_nguoi_dat: userProfile.ten_khach_hang, // Lấy từ API
            so_dien_thoai_nguoi_dat: userProfile.so_dien_thoai, // Lấy từ API
            ghi_chu: `Khách đặt lịch cho ngày ${selectedDate}`,
            dia_chi_thuc_hien: "Tại chi nhánh hệ thống",
            gio_bat_dau: selectedTime,
            ngay_dat_lich: `${selectedDayObj.year}-${String(selectedDayObj.month).padStart(2, '0')}-${String(selectedDate).padStart(2, '0')}`,
            so_luong: 1,
            don_gia: serviceInfo?.don_gia || 0
        };

        try {
            const res = await api.post('/khach-hang/dat-lich/create', payload);
            if (res.data.status) {
                toast.success(res.data.message);
                navigate('/lich-su-dat-lich');
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Lỗi khi đặt lịch!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading) return <div className="p-20 text-center font-bold text-blue-600 italic">Đang chuẩn bị dữ liệu & SĐT...</div>;

    return (
        <div className="bg-[#F3F4F6] min-h-screen pb-20 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-bold transition-all">
                    <ChevronLeft size={20}/> Quay lại
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        {/* Box Dịch vụ & Người đặt (Dùng UserProfile từ API) */}
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-white flex flex-wrap gap-6 items-center">
                            <img 
                                src={serviceImage || "https://via.placeholder.com/150"} 
                                className="w-24 h-24 rounded-2xl object-cover border" 
                                alt="dv"
                                onError={(e) => e.target.src = "https://via.placeholder.com/150"}
                            />
                            <div className="flex-1 min-w-[200px]">
                                <h1 className="text-2xl font-black text-gray-900">{serviceInfo?.ten_dich_vu}</h1>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-blue-600 font-extrabold text-xl">{new Intl.NumberFormat('vi-VN').format(serviceInfo?.don_gia || 0)} đ</span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1 font-bold"><Clock size={14}/> 60 phút</span>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Người đặt lịch</p>
                                <p className="text-sm font-bold text-blue-800">{userProfile.ten_khach_hang }</p>
                                <p className="text-xs text-blue-600 font-bold">{userProfile.so_dien_thoai}</p>
                            </div>
                        </div>

                        {/* 1. Chọn ngày */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">1</span>
                                Chọn ngày làm việc
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                {days.map((d) => (
                                    <button
                                        key={d.fullDate}
                                        onClick={() => setSelectedDate(d.dayNum)}
                                        className={`flex-shrink-0 w-20 py-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-1
                                            ${selectedDate === d.dayNum ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-50 text-gray-400 hover:border-blue-100'}`}
                                    >
                                        <span className="text-[10px] uppercase font-black tracking-widest">Tháng {d.month}</span>
                                        <span className="text-xl font-black">{d.dayNum}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 2. Chọn nhân viên */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">2</span>
                                Chọn kỹ thuật viên
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div onClick={() => setSelectedStaff(null)} className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${selectedStaff === null ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-50'}`}>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400"><User/></div>
                                    <p className="text-xs font-bold">Hệ thống chọn</p>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Nhanh nhất</p>
                                </div>

                                {listNhanVien.map((nv) => (
                                    <div key={nv.id} onClick={() => setSelectedStaff(nv.id)}
                                        className={`p-4 rounded-2xl border-2 text-center cursor-pointer relative transition-all duration-200 
                                            ${selectedStaff === nv.id ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-50 hover:border-blue-200 bg-white'}`}>
                                        {selectedStaff === nv.id && (
                                            <div className="absolute top-2 right-2 bg-blue-600 text-white rounded-full p-0.5 shadow-sm">
                                                <Check size={10} strokeWidth={4} />
                                            </div>
                                        )}
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center font-black text-lg shadow-inner">
                                            {nv.hinh_anh ? (
                                                <img src={nv.hinh_anh.startsWith('http') ? nv.hinh_anh : `http://127.0.0.1:8000/storage/${nv.hinh_anh}`} 
                                                    className="w-full h-full object-cover rounded-full" alt="avatar"
                                                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerText = nv.ten_nhan_vien?.charAt(0) || "N"; }}
                                                />
                                            ) : ( nv.ten_nhan_vien?.charAt(0) || "N" )}
                                        </div>
                                        <p className="text-xs font-black text-gray-800 truncate px-1">{nv.ten_nhan_vien || "Nhân viên"}</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tight">{nv.ten_nhan_vien || "Kỹ thuật viên"}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* 3. Chọn giờ */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm">3</span>
                                Chọn khung giờ
                            </h2>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                {times.map(t => (
                                    <button key={t} onClick={() => setSelectedTime(t)}
                                        className={`py-3 rounded-xl border-2 font-black text-sm transition-all
                                            ${selectedTime === t ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-gray-50 hover:bg-gray-50'}`}>{t}</button>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* CỘT PHẢI: XÁC NHẬN */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 sticky top-10">
                            <h3 className="text-xl font-black mb-8 border-b pb-4">Tóm tắt đơn hàng</h3>
                            <div className="space-y-6 mb-10">
                                <div className="flex gap-4">
                                    <CalendarIcon className="text-blue-600" size={18}/>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ngày & Giờ hẹn</p>
                                        <p className="font-bold text-gray-800">{selectedTime}, ngày {selectedDate}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <User className="text-blue-600" size={18}/>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Chuyên viên</p>
                                        <p className="font-bold text-gray-800">
                                            {selectedStaff ? listNhanVien.find(n => n.id === selectedStaff)?.ten_nhan_vien : "Hệ thống tự động sắp xếp"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Phone className="text-blue-600" size={18}/>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Liên hệ khách</p>
                                        <p className="font-bold text-gray-800">{userProfile.so_dien_thoai || 'Chưa cập nhật'}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-5 rounded-2xl flex justify-between items-center mb-8 border border-gray-100">
                                <span className="font-bold text-gray-500">Tổng tiền:</span>
                                <span className="text-2xl font-black text-blue-600">{new Intl.NumberFormat('vi-VN').format(serviceInfo?.don_gia || 0)} đ</span>
                            </div>

                            <button 
                                onClick={handleBooking}
                                disabled={isSubmitting}
                                className={`w-full py-5 rounded-2xl font-black text-lg shadow-lg transition-all active:scale-95
                                ${isSubmitting ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}`}
                            >
                                {isSubmitting ? "ĐANG XỬ LÝ..." : "XÁC NHẬN ĐẶT LỊCH"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dat_lich;