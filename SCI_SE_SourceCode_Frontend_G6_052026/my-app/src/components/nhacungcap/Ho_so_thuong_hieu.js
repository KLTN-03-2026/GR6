import React, { useState, useEffect } from 'react';
import {
    Camera, MapPin, Clock, Phone, Info, Pencil, Store, Loader2
} from 'lucide-react';
import { toast } from 'react-toastify';
import axios from 'axios'; // Hoặc import từ file api của bạn
import Menu from './Menu';
import api from '../../api';

const Ho_so_thuong_hieu = () => {
    const [banks, setBanks] = useState([]);

    useEffect(() => {
        // Gọi API lấy danh sách ngân hàng khi component mount
        axios.get("https://api.vietqr.io/v2/banks")
            .then(res => {
                if (res.data.code === "00") {
                    setBanks(res.data.data);
                }
            })
            .catch(err => console.error("Lỗi lấy danh sách ngân hàng:", err));
    }, []);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // State lưu trữ dữ liệu từ API
    const [formData, setFormData] = useState({
        ten_thuong_hieu: '',
        so_dien_thoai: '',
        id_danh_muc_dich_vu: '',
        ma_so_thue: '',
        ma_bin_ngan_hang: '',
        tai_khoan_ngan_hang: '',
        dia_chi: '',
        logo: null,
        anh_bia: null
    });

    // State preview ảnh
    const [previews, setPreviews] = useState({
        logo: null,
        anh_bia: null
    });

    // 1. Lấy dữ liệu từ API
    const fetchThuongHieu = async () => {
        try {
            setLoading(true);
            // Thay URL bằng đường dẫn thực tế của bạn
            const res = await api.get('/nha-cung-cap/thuong-hieu/get-data', {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });

            if (res.data.status && res.data.data.length > 0) {
                const item = res.data.data[0]; // Lấy bản ghi đầu tiên
                setFormData({
                    ...formData,
                    ten_thuong_hieu: item.ten_thuong_hieu || '',
                    so_dien_thoai: item.so_dien_thoai || '',
                    id_danh_muc_dich_vu: item.id_danh_muc_dich_vu || '',
                    ma_so_thue: item.ma_so_thue || '',
                    ma_bin_ngan_hang: item.ma_bin_ngan_hang || '',
                    tai_khoan_ngan_hang: item.tai_khoan_ngan_hang || '',
                    dia_chi: item.dia_chi || '',
                });
                setPreviews({
                    logo: item.logo, // URL đã được Laravel xử lý asset() trong controller
                    anh_bia: item.anh_bia,
                });
            }
        } catch (err) {
            toast.error("Không thể tải thông tin thương hiệu!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchThuongHieu();
    }, []);

    // 2. Xử lý thay đổi Input text
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. Xử lý thay đổi File (Logo/Ảnh bìa)
    const handleFileChange = (e, type) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, [type]: file });
            setPreviews({ ...previews, [type]: URL.createObjectURL(file) });
        }
    };

    // 4. Gửi dữ liệu cập nhật
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        });

        try {
            const res = await api.post('nha-cung-cap/thuong-hieu/update', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (res.data.status) {
                toast.success(res.data.message);
                fetchThuongHieu(); // Reload lại dữ liệu
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Cập nhật thất bại!");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
                <Loader2 className="animate-spin text-blue-600" size={48} />
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-[#F8FAFC]">
            <Menu />

            <main className="flex-1 p-8">
                {/* HEADER */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800">Hồ sơ thương hiệu</h1>
                        <p className="text-gray-500 text-sm">Quản lý nhận diện thương hiệu và thông tin liên hệ của Spa.</p>
                    </div>
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={fetchThuongHieu}
                            className="px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-600 font-semibold hover:bg-gray-50 transition-all"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2"
                        >
                            {isSubmitting && <Loader2 className="animate-spin" size={18} />}
                            Lưu thay đổi
                        </button>
                    </div>
                </div>

                <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">

                    {/* CỘT TRÁI */}
                    <div className="col-span-12 lg:col-span-5 space-y-6">

                        {/* Logo Card */}
                        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-6">Hình ảnh đại diện</h3>
                            <div className="flex flex-col items-center">
                                <p className="text-[10px] font-black text-gray-400 tracking-[0.2em] mb-4 self-start uppercase">Logo thương hiệu</p>
                                <div className="relative">
                                    <div className="w-44 h-44 bg-gray-50 rounded-[32px] border border-gray-100 flex items-center justify-center p-4 overflow-hidden">
                                        {previews.logo ? (
                                            <img src={previews.logo} alt="Logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <Store size={60} className="text-gray-200" />
                                        )}
                                    </div>
                                    <label className="absolute -bottom-2 -right-2 p-2.5 bg-blue-600 text-white rounded-full border-4 border-white shadow-lg cursor-pointer hover:scale-110 transition-transform">
                                        <Pencil size={14} />
                                        <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'logo')} accept="image/*" />
                                    </label>
                                </div>
                                <p className="text-[11px] text-gray-400 mt-6 italic font-medium">Kích thước khuyến dùng: 500×500px</p>
                            </div>
                        </div>

                        {/* Ảnh bìa Card */}
                        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                            <h3 className="font-bold text-gray-800 mb-6">Ảnh bìa</h3>
                            <label className="border-2 border-dashed border-gray-100 rounded-[20px] bg-gray-50/50 p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-all group overflow-hidden relative min-h-[160px]">
                                {previews.anh_bia ? (
                                    <img src={previews.anh_bia} alt="Cover" className="absolute inset-0 w-full h-full object-cover rounded-[20px] opacity-70 group-hover:opacity-100 transition-opacity" />
                                ) : (
                                    <div className="flex flex-col items-center">
                                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-blue-600 mb-3 group-hover:scale-110 transition-transform">
                                            <Camera size={24} />
                                        </div>
                                        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Tải lên ảnh bìa</span>
                                        <span className="text-[11px] text-gray-400 mt-1">PNG, JPG hoặc WebP</span>
                                    </div>
                                )}
                                <input type="file" className="hidden" onChange={(e) => handleFileChange(e, 'anh_bia')} />
                            </label>
                            <p className="text-[11px] text-gray-400 mt-4 text-center italic font-medium">Tỷ lệ khuyến nghị 2.5:1</p>
                        </div>

                        {/* SĐT Card */}
                        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm">
                            <div className="flex items-center gap-3 text-blue-600 mb-4">
                                <Phone size={20} />
                                <span className="font-bold text-gray-800">Số điện thoại thương hiệu</span>
                            </div>
                            <input
                                type="text"
                                name="so_dien_thoai"
                                value={formData.so_dien_thoai}
                                onChange={handleChange}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3.5 text-sm font-bold text-gray-700 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* CỘT PHẢI */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm h-full">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-lg font-bold text-gray-800">Thông tin chi tiết</h3>
                                <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500">
                                    <Info size={18} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Tên & Mã số thuế */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-2 uppercase">Tên thương hiệu</label>
                                        <input
                                            type="text"
                                            name="ten_thuong_hieu"
                                            value={formData.ten_thuong_hieu}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-2 uppercase">Mã số thuế</label>
                                        <input
                                            type="text"
                                            name="ma_so_thue"
                                            value={formData.ma_so_thue}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Ngân hàng */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-2 uppercase">
                                            Ngân hàng (Mã BIN)
                                        </label>
                                        <select
                                            name="ma_bin_ngan_hang"
                                            value={formData.ma_bin_ngan_hang}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all appearance-none"
                                        >
                                            <option value="">-- Chọn ngân hàng --</option>
                                            {banks.map((bank) => (
                                                <option key={bank.id} value={bank.bin}>
                                                    {bank.shortName} - {bank.name} 
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-2 uppercase">Số tài khoản</label>
                                        <input
                                            type="text"
                                            name="tai_khoan_ngan_hang"
                                            value={formData.tai_khoan_ngan_hang}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Địa chỉ */}
                                <div>
                                    <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-2 uppercase">Địa chỉ trụ sở</label>
                                    <div className="relative">
                                        <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                                        <input
                                            type="text"
                                            name="dia_chi"
                                            value={formData.dia_chi}
                                            onChange={handleChange}
                                            className="w-full bg-gray-50 border border-gray-100 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-gray-800 focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                {/* Mock Giờ làm việc - Giữ nguyên UI */}
                                <div>
                                    <label className="text-[11px] font-bold text-gray-400 tracking-[0.15em] block mb-4 uppercase">Giờ làm việc (Mặc định)</label>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center group cursor-not-allowed border border-transparent">
                                            <div>
                                                <p className="text-[10px] font-black text-blue-500 mb-1">MỞ CỬA</p>
                                                <p className="text-base font-black text-gray-700 uppercase">09:00 AM</p>
                                            </div>
                                            <Clock size={20} className="text-gray-300" />
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center group cursor-not-allowed border border-transparent">
                                            <div>
                                                <p className="text-[10px] font-black text-blue-500 mb-1">ĐÓNG CỬA</p>
                                                <p className="text-base font-black text-gray-700 uppercase">09:00 PM</p>
                                            </div>
                                            <Clock size={20} className="text-gray-300" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Ho_so_thuong_hieu;