import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { User, Clock, Calendar as CalendarIcon, ChevronLeft } from 'lucide-react';
import api from '../../api';
import { toast } from 'react-toastify';

const Dat_lich = () => {
    const { id_thuong_hieu, id_dich_vu } = useParams();
    const navigate = useNavigate();

    const [serviceInfo, setServiceInfo] = useState(null);
    const [serviceImage, setServiceImage] = useState("https://via.placeholder.com/150");
    const [listNhanVien, setListNhanVien] = useState([]);
    const [userProfile, setUserProfile] = useState({ ten_khach_hang: 'Khách hàng', so_dien_thoai: '' });
    const [isLoading, setIsLoading] = useState(true);
    const [isFetchingTimes, setIsFetchingTimes] = useState(false);
    
    const [bookedRanges, setBookedRanges] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());

    const days = Array.from({ length: 14 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() + i);
        return {
            dayNum: d.getDate(),
            fullDate: d.toISOString().split('T')[0],
            month: d.getMonth() + 1
        };
    });

    const [selectedDate, setSelectedDate] = useState(days[0].fullDate);
    const [selectedStaff, setSelectedStaff] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [ghiChu, setGhiChu] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const times = ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'];

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 60000);
        return () => clearInterval(timer);
    }, []);

    const timeToMinutes = (timeStr) => {
        const [hrs, mins] = timeStr.split(':').map(Number);
        return hrs * 60 + mins;
    };

    const fetchBookedTimes = async (date, staff) => {
        setIsFetchingTimes(true);
        setBookedRanges([]);
        
        try {
            const res = await api.get(`/nhan-vien/thoi-gian-lam-viec/${staff || 0}?date=${date}`);
            if (res.data.status) {
                const ranges = res.data.data.map(item => ({
                    start: timeToMinutes(item.gio_bat_dau.substring(0, 5)),
                    end: timeToMinutes(item.gio_ket_thuc.substring(0, 5))
                }));
                setBookedRanges(ranges);
            }
        } catch (error) {
            setBookedRanges([]);
        } finally {
            setIsFetchingTimes(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const [resDetail, resImages, resProfile, resStaff] = await Promise.all([
                    api.get(`/dich-vu/chi-tiet-dich-vu/${id_dich_vu}`),
                    api.get("hinh-anh-dich-vu/get-data-hinh-anh"),
                    api.get("/khach-hang/thong-tin-ca-nhan"),
                    api.get(`/khach-hang/nhan-vien/get-data/${id_thuong_hieu}`)
                ]);

                if (resDetail.data.status) setServiceInfo(resDetail.data.data);
                if (resImages.data.status) {
                    const findImg = resImages.data.data.find(img => img.id_dich_vu === parseInt(id_dich_vu));
                    if (findImg?.hinh_anh) setServiceImage(findImg.hinh_anh.startsWith('http') ? findImg.hinh_anh : `http://127.0.0.1:8000/storage/${findImg.hinh_anh}`);
                }
                if (resProfile.data.status) setUserProfile(resProfile.data.data);
                if (resStaff.data.status) setListNhanVien(resStaff.data.data);
                
                await fetchBookedTimes(selectedDate, selectedStaff);
            } catch (error) {
                toast.error("Lỗi tải dữ liệu");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id_dich_vu, id_thuong_hieu]);

    useEffect(() => {
        if (!isLoading) {
            setSelectedTime(null);
            fetchBookedTimes(selectedDate, selectedStaff);
        }
    }, [selectedDate, selectedStaff]);

    const handleBooking = async () => {
        if (!selectedTime) { 
            toast.warning("Vui lòng chọn khung giờ!"); 
            return; 
        }
        setIsSubmitting(true);
        const payload = {
            id_thuong_hieu, 
            id_dich_vu, 
            id_nhan_vien: selectedStaff,
            ten_nguoi_dat: userProfile.ten_khach_hang,
            so_dien_thoai_nguoi_dat: userProfile.so_dien_thoai,
            ghi_chu: ghiChu,
            dia_chi_thuc_hien: "Tại chi nhánh",
            gio_bat_dau: selectedTime,
            ngay_dat_lich: selectedDate,
            so_luong: 1,
            don_gia: serviceInfo?.don_gia || 0
        };
        try {
            const res = await api.post('/khach-hang/dat-lich/create', payload);
            if (res.data.status) { 
                toast.success("Đặt lịch thành công!");
                // Lấy ID chi tiết đặt lịch từ response của API (giả sử key là id_chi_tiet)
                const bookingId = res.data.id_chi_tiet_dat_lich ;
                if (bookingId) {
                    navigate(`/thanh-toan/${bookingId}`);
                } else {
                    navigate('/thanh-toan');
                }
            } else { 
                toast.error(res.data.message); 
            }
        } catch (error) { 
            toast.error("Lỗi kết nối!"); 
        } finally { 
            setIsSubmitting(false); 
        }
    };

    if (isLoading) return <div className="p-20 text-center font-bold text-blue-600 animate-pulse">Đang tải...</div>;

    return (
        <div className="bg-[#F3F4F6] min-h-screen pb-20 font-sans text-gray-800">
            <div className="max-w-6xl mx-auto px-4 pt-6">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-blue-600 mb-6 font-bold transition-all">
                    <ChevronLeft size={20}/> Quay lại
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-5 rounded-3xl shadow-sm border border-white flex flex-wrap gap-6 items-center">
                            <img src={serviceImage} className="w-24 h-24 rounded-2xl object-cover border" alt="dv" />
                            <div className="flex-1 min-w-[200px]">
                                <h1 className="text-2xl font-black text-gray-900">{serviceInfo?.ten_dich_vu}</h1>
                                <div className="flex items-center gap-4 mt-2">
                                    <span className="text-blue-600 font-extrabold text-xl">{new Intl.NumberFormat('vi-VN').format(serviceInfo?.don_gia || 0)} đ</span>
                                    <span className="text-gray-400 text-sm flex items-center gap-1 font-bold"><Clock size={14}/> 60 phút</span>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1">Người đặt lịch</p>
                                <p className="text-sm font-bold text-blue-800">{userProfile.ten_khach_hang}</p>
                                <p className="text-xs text-blue-600 font-bold">{userProfile.so_dien_thoai || 'Chưa cập nhật SĐT'}</p>
                            </div>
                        </div>

                        {/* 1. Chọn ngày */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Chọn ngày làm việc
                            </h2>
                            <div className="flex gap-3 overflow-x-auto pb-4">
                                {days.map((d) => (
                                    <button
                                        key={d.fullDate}
                                        onClick={() => setSelectedDate(d.fullDate)}
                                        className={`flex-shrink-0 w-20 py-4 rounded-2xl border-2 transition-all flex flex-col items-center
                                            ${selectedDate === d.fullDate ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-50 text-gray-400'}`}
                                    >
                                        <span className="text-[10px] uppercase font-black">Tháng {d.month}</span>
                                        <span className="text-xl font-black">{d.dayNum}</span>
                                    </button>
                                ))}
                            </div>
                        </section>

                        {/* 2. Chọn giờ */}
                        <section className={`bg-white p-8 rounded-[32px] shadow-sm transition-opacity ${isFetchingTimes ? 'opacity-50' : 'opacity-100'}`}>
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                Chọn khung giờ
                            </h2>
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                                {times.map(t => {
                                    const btnMin = timeToMinutes(t);
                                    const isPast = (selectedDate === currentTime.toISOString().split('T')[0]) && 
                                                   btnMin <= (currentTime.getHours() * 60 + currentTime.getMinutes() + 15);
                                    
                                    const isBooked = bookedRanges.some(r => btnMin >= r.start && btnMin < r.end);
                                    const disabled = isPast || isBooked || isFetchingTimes;

                                    return (
                                        <button 
                                            key={t} disabled={disabled}
                                            onClick={() => setSelectedTime(t)}
                                            className={`py-3 rounded-xl border-2 font-black text-sm relative transition-all
                                                ${disabled ? 'bg-gray-50 border-gray-100 text-gray-200 cursor-not-allowed' 
                                                : selectedTime === t ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' 
                                                : 'border-gray-50 hover:bg-gray-50'}`}
                                        >
                                            {t}
                                            {isBooked && !isFetchingTimes && <span className="absolute top-0 right-1 text-[7px] text-red-400 font-bold uppercase">Full</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </section>

                        {/* 3. Chọn nhân viên */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-6 flex items-center gap-3">
                                <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                Chọn kỹ thuật viên
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div onClick={() => setSelectedStaff(null)} 
                                     className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${selectedStaff === null ? 'border-blue-600 bg-blue-50' : 'border-gray-50'}`}>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-2 flex items-center justify-center text-gray-400"><User/></div>
                                    <p className="text-xs font-bold">Hệ thống chọn</p>
                                </div>
                                {listNhanVien.map((nv) => (
                                    <div key={nv.id} onClick={() => setSelectedStaff(nv.id)}
                                        className={`p-4 rounded-2xl border-2 text-center cursor-pointer transition-all ${selectedStaff === nv.id ? 'border-blue-600 bg-blue-50' : 'border-gray-50'}`}>
                                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full mx-auto mb-2 flex items-center justify-center font-black overflow-hidden">
                                            {nv.hinh_anh ? <img src={nv.hinh_anh.startsWith('http') ? nv.hinh_anh : `http://127.0.0.1:8000/storage/${nv.hinh_anh}`} className="w-full h-full object-cover" alt="nv" /> : nv.ten_nhan_vien?.charAt(0)}
                                        </div>
                                        <p className="text-xs font-black truncate">{nv.ten_nhan_vien}</p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Ghi chú */}
                        <section className="bg-white p-8 rounded-[32px] shadow-sm">
                            <h2 className="text-lg font-black mb-4">Ghi chú thêm</h2>
                            <textarea 
                                value={ghiChu}
                                onChange={(e) => setGhiChu(e.target.value)}
                                placeholder="Bạn có yêu cầu đặc biệt nào không?"
                                className="w-full p-4 bg-gray-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                            />
                        </section>
                    </div>

                    {/* Sidebar Tóm tắt */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-gray-100 sticky top-10">
                            <h3 className="text-xl font-black mb-6">Tóm tắt</h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between"><span className="text-gray-400 font-bold">Dịch vụ:</span><span className="font-black">{serviceInfo?.ten_dich_vu}</span></div>
                                <div className="flex justify-between"><span className="text-gray-400 font-bold">Ngày:</span><span className="font-black">{selectedDate}</span></div>
                                <div className="flex justify-between"><span className="text-gray-400 font-bold">Giờ:</span><span className="font-black text-blue-600">{selectedTime || "Chưa chọn"}</span></div>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-2xl mb-8">
                                <p className="text-sm text-gray-400 font-bold">Tổng cộng</p>
                                <p className="text-2xl font-black text-blue-600">{new Intl.NumberFormat('vi-VN').format(serviceInfo?.don_gia || 0)} đ</p>
                            </div>
                            <button 
                                onClick={handleBooking}
                                disabled={isSubmitting || !selectedTime}
                                className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${isSubmitting || !selectedTime ? 'bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
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