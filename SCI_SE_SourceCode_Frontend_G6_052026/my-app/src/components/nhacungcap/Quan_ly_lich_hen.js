import React, { useState, useEffect } from 'react';
import api from '../../api';
import {
  Calendar, Clock, Filter, ChevronLeft, ChevronRight,
  UserCheck, Timer, CheckCircle2, XCircle, Plus, Loader2, X, AlertCircle
} from 'lucide-react';
import { toast } from 'react-toastify';
import Menu from './Menu'; // Đảm bảo đường dẫn này đúng

const Quan_ly_lich_hen = () => {
  // --- STATES ---
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [stats, setStats] = useState({
    tong: 0, xac_nhan: 0, hoan_thanh: 0, huy: 0
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- CONFIG ---
  const STATUS_MAP = { 1: 'ĐÃ XÁC NHẬN', 2: 'HOÀN THÀNH', 3: 'ĐÃ HỦY' };
  const STATUS_THEMES = {
    'ĐÃ XÁC NHẬN': 'bg-[#E0E9F7] text-[#3D78D8]',
    'HOÀN THÀNH': 'bg-[#E3F6ED] text-[#28A745]',
    'ĐÃ HỦY': 'bg-[#FEE7E9] text-[#DC3545]'
  };

  const FILTER_OPTIONS = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Đã xác nhận', value: '1' },
    { label: 'Hoàn thành', value: '2' },
    { label: 'Đã hủy', value: '3' }
  ];

  // --- FUNCTIONS ---
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/nha-cung-cap/lich-hen/get-data');
      if (response.data.status) {
        setAppointments(response.data.data_DatLich);
        setStats({
          tong: response.data.tong_lich_hen,
          xac_nhan: response.data.lich_da_xac_nhan,
          hoan_thanh: response.data.lich_da_hoan_thanh,
          huy: response.data.lich_da_huy
        });
      }
    } catch (error) {
      console.error("Lỗi:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filteredAppointments = appointments.filter(app => {
    if (filterStatus === 'ALL') return true;
    return app.trang_thai_dat_lich.toString() === filterStatus;
  });

  const openConfirmModal = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleConfirmDone = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.get(`thuong-hieu/dat-lich/hoan-thanh/${selectedId}`);
      if (response.data.status) {
        toast.success("Cập nhật trạng thái thành công!");
        await fetchData();
        setIsModalOpen(false);
      }
    } catch (error) {
      toast.error("Cập nhật thất bại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* 1. Sidebar Menu giống Hồ sơ thương hiệu */}
      <Menu />

      {/* 2. Main Content với padding và flex-1 */}
      <main className="flex-1 p-8">
        <div className="max-w-[1200px] mx-auto">
          
          {/* HEADER */}
          <header className="mb-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">Quản lý lịch đặt</h1>
            <p className="text-gray-500 text-sm">Theo dõi và cập nhật trạng thái các yêu cầu dịch vụ hôm nay.</p>
          </header>

          {/* THỐNG KÊ (Stats cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { label: 'TỔNG LỊCH HẸN', value: stats.tong, icon: <Calendar size={20} />, bg: 'bg-[#E0E9F7]', color: 'text-[#3D78D8]' },
              { label: 'ĐÃ XÁC NHẬN', value: stats.xac_nhan, icon: <Timer size={20} />, bg: 'bg-[#FEEFD8]', color: 'text-[#E38F12]' },
              { label: 'HOÀN THÀNH', value: stats.hoan_thanh, icon: <CheckCircle2 size={20} />, bg: 'bg-[#E3F6ED]', color: 'text-[#28A745]' },
              { label: 'ĐÃ HỦY', value: stats.huy, icon: <XCircle size={20} />, bg: 'bg-[#FEE7E9]', color: 'text-[#DC3545]' }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-5 rounded-[24px] flex items-center gap-4 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-[16px] flex items-center justify-center`}>{stat.icon}</div>
                <div>
                  <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                  <p className="text-[22px] font-black text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* BỘ LỌC DẠNG BUTTON NẰM NGANG */}
          <div className="flex items-center gap-2 mb-8 bg-gray-200/50 p-1.5 rounded-[20px] w-fit">
            {FILTER_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilterStatus(option.value)}
                className={`
                  px-6 py-2.5 rounded-[16px] text-[14px] font-bold transition-all duration-200
                  ${filterStatus === option.value 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-800'}
                `}
              >
                {option.label}
                {filterStatus === option.value && (
                  <span className="ml-2 bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-full">
                    {filteredAppointments.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* GRID LỊCH HẸN */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((app, idx) => {
                const currentStatus = STATUS_MAP[app.trang_thai_dat_lich];
                return (
                  <div key={idx} className="bg-white rounded-[28px] p-6 shadow-sm border border-gray-100 flex flex-col relative transition-all hover:shadow-xl hover:-translate-y-1">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-[56px] h-[56px] bg-gray-100 rounded-[18px] overflow-hidden border border-gray-50 shadow-inner">
                          <img 
                            src={app.avatar.includes('/storage/0') ? `https://ui-avatars.com/api/?name=${app.ten_khach_hang}&background=random` : app.avatar} 
                            className="w-full h-full object-cover" 
                            alt="" 
                          />
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-gray-800 truncate max-w-[120px]">{app.ten_khach_hang}</h3>
                          <p className="text-[12px] text-gray-400 font-medium truncate max-w-[120px]">{app.ten_dich_vu}</p>
                        </div>
                      </div>
                      <div className={`${STATUS_THEMES[currentStatus]} px-3 py-1.5 rounded-[10px] text-[10px] font-black uppercase tracking-tighter`}>
                        {currentStatus}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 py-4 border-t border-gray-50">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Calendar size={16} /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Ngày đặt</p>
                          <p className="text-[13px] font-bold text-gray-700">{app.ngay_thuc_hien}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Clock size={16} /></div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase">Giờ hẹn</p>
                          <p className="text-[13px] font-bold text-gray-700">{app.gio_bat_dau}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-50">
                      <p className="text-[12px] text-gray-400 font-medium">Mã: <span className="text-gray-800 font-bold">#{app.ma_hoa_don}</span></p>
                      {app.trang_thai_dat_lich === 1 && (
                        <button 
                          onClick={() => openConfirmModal(app.id)}
                          className="bg-blue-600 px-4 py-2 rounded-xl text-[12px] font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100"
                        >
                          HOÀN THÀNH
                        </button>
                      )}
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-24 text-center bg-white rounded-[32px] border border-dashed border-gray-200">
                <p className="text-gray-400 font-bold">Không tìm thấy lịch hẹn nào.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* MODAL XÁC NHẬN (GIỮ NGUYÊN) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" onClick={() => !isSubmitting && setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-md p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><AlertCircle size={32} /></div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác nhận hoàn thành</h2>
              <p className="text-gray-500 text-sm mb-8 px-4">Đánh dấu lịch hẹn này là <span className="font-bold text-green-600">Hoàn thành</span>?</p>
              <div className="flex gap-3 w-full">
                <button disabled={isSubmitting} onClick={() => setIsModalOpen(false)} className="flex-1 px-6 py-3.5 rounded-2xl border border-gray-200 font-bold text-gray-500 hover:bg-gray-50">Đóng</button>
                <button disabled={isSubmitting} onClick={handleConfirmDone} className="flex-1 px-6 py-3.5 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-100">
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : 'Xác nhận'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quan_ly_lich_hen;