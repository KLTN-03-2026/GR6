import React, { useState } from 'react';
import { MapPin, Sun, Moon, Calendar as CalendarIcon, User, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Dat_lich = () => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedStaff, setSelectedStaff] = useState('system');
  const [selectedTime, setSelectedTime] = useState('09:00');

  const morningTimes = ['08:00', '09:00', '10:00', '11:00'];
  const afternoonTimes = ['14:00', '15:00', '16:00', '17:00'];

  return (
    <div className="bg-[#F8FAFC] min-h-screen pb-20 font-sans text-[#2D3748]">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Service Header Card */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-5">
              <div className="relative w-40 h-28 shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1544161515-4ae6ce6db874?w=400" 
                  alt="Massage" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="bg-blue-100 text-blue-600 text-[10px] font-extrabold px-2 py-1 rounded-md w-fit tracking-wider">ĐANG CHỌN</span>
                <h1 className="text-xl font-bold mt-2">Massage Thư Giãn Đá Nóng</h1>
                <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                  <span className="inline-block w-4 h-4 bg-gray-100 rounded flex items-center justify-center text-[10px]">🏠</span>
                  Sen Spa & Wellness
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-blue-600 font-bold text-lg">500.000 đ</span>
                  <span className="text-gray-400 text-sm font-medium">60 phút</span>
                </div>
              </div>
            </div>

            {/* 1. Chọn ngày đặt lịch */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="bg-[#3B82F6] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shadow-md shadow-blue-200">1</span>
                  <h2 className="font-bold text-lg">Chọn ngày đặt lịch</h2>
                </div>
                <div className="flex items-center gap-4">
                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronLeft className="w-5 h-5 text-gray-400" /></button>
                  <span className="font-bold text-sm">Tháng 10 2023</span>
                  <button className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5 text-gray-400" /></button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map(day => (
                  <div key={day} className="text-center text-[11px] font-bold text-gray-400 mb-2 uppercase tracking-tighter">{day}</div>
                ))}
                {[27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((date) => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`h-12 flex flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all
                      ${date < 1 || date > 14 ? 'text-gray-200 pointer-events-none' : 'text-gray-700 hover:bg-blue-50'}
                      ${selectedDate === date ? 'bg-[#3B82F6] !text-white shadow-lg shadow-blue-200' : ''}`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </section>

            {/* 2. Chọn nhân viên */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#3B82F6] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shadow-md shadow-blue-200">2</span>
                <h2 className="font-bold text-lg">Chọn nhân viên</h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <StaffCard 
                  id="system" name="Hệ thống chọn" role="Nhanh nhất" 
                  active={selectedStaff === 'system'} onClick={setSelectedStaff}
                />
                <StaffCard 
                  id="staff1" name="Trần Thị Mai" role="Chuyên gia" rating="4.9" 
                  active={selectedStaff === 'staff1'} onClick={setSelectedStaff}
                />
                <StaffCard 
                  id="staff2" name="Lê Minh Anh" role="Kỹ thuật viên" rating="4.8" 
                  active={selectedStaff === 'staff2'} onClick={setSelectedStaff}
                />
                <StaffCard 
                  id="staff3" name="Nguyễn Phương" role="Chuyên gia" rating="5.0" 
                  active={selectedStaff === 'staff3'} onClick={setSelectedStaff}
                />
              </div>
            </section>

            {/* 3. Địa chỉ */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-3 mb-5">
                <span className="bg-[#3B82F6] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shadow-md shadow-blue-200">3</span>
                <h2 className="font-bold text-lg">Địa chỉ thực hiện</h2>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50/30 border border-blue-100 rounded-2xl">
                <div className="bg-blue-100 p-3 rounded-xl">
                  <MapPin className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Thực hiện tại cửa hàng</p>
                  <p className="text-gray-400 text-sm">36 Tràng Tiền, Hoàn Kiếm, Hà Nội</p>
                </div>
              </div>
            </section>

            {/* 4. Khung giờ */}
            <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-[#3B82F6] text-white w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold shadow-md shadow-blue-200">4</span>
                <h2 className="font-bold text-lg">Chọn khung giờ</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Sun className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-widest uppercase">Buổi sáng</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {morningTimes.map(t => (
                      <TimeButton key={t} time={t} active={selectedTime === t} onClick={setSelectedTime} />
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-gray-400 mb-4">
                    <Moon className="w-4 h-4" />
                    <span className="text-[11px] font-bold tracking-widest uppercase">Buổi chiều</span>
                  </div>
                  <div className="grid grid-cols-4 gap-3">
                    {afternoonTimes.map(t => (
                      <TimeButton key={t} time={t} active={selectedTime === t} onClick={setSelectedTime} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-8">
              <h2 className="font-bold text-xl mb-8 text-gray-800">Chi tiết đặt lịch</h2>
              
              <div className="space-y-6 mb-8 text-[13px]">
                <SidebarInfoItem icon={<CalendarIcon size={16}/>} label="Thời gian" value="09:00, Thứ 5, 05/10/2023" />
                <SidebarInfoItem icon={<User size={16}/>} label="Nhân viên" value="Hệ thống tự động chọn" />
                <SidebarInfoItem icon={<MapPin size={16}/>} label="Địa điểm" value="36 Tràng Tiền, Hoàn Kiếm, Hà Nội" />
              </div>

              <div className="border-t border-dashed pt-5 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Giá dịch vụ</span>
                  <span className="text-gray-800">500.000 đ</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 font-medium">
                  <span>Thuế (VAT 10%)</span>
                  <span className="text-gray-800">50.000 đ</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold text-gray-800">Tổng cộng</span>
                  <span className="text-[#3B82F6] text-xl font-extrabold">550.000 đ</span>
                </div>
              </div>

              <button className="w-full bg-[#3B82F6] text-white font-bold py-4 rounded-2xl mt-8 shadow-lg shadow-blue-100 hover:bg-blue-600 transition-colors">
                Tiếp tục thanh toán
              </button>
              <button className="w-full text-gray-400 text-sm font-bold mt-4 hover:text-gray-600">Hủy bỏ</button>
              
              <div className="mt-8 pt-4 border-t border-gray-50 flex items-center justify-center gap-2 text-[11px] text-green-500 font-bold">
                <span className="bg-green-100 rounded-full p-0.5">✔</span>
                Đảm bảo an toàn & Bảo mật thông tin
              </div>
            </div>

            <div className="mt-4 p-4 bg-blue-50/50 border border-blue-50 rounded-xl flex gap-3 italic">
              <span className="text-blue-500 font-bold">ⓘ</span>
              <p className="text-[12px] text-blue-500/80 leading-relaxed font-medium">
                Bạn có thể thay đổi hoặc hủy lịch hẹn trước khi thiếu 2 giờ mà không mất phí.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Reusable Components
const StaffCard = ({ id, name, role, rating, active, onClick }) => (
  <div 
    onClick={() => onClick(id)}
    className={`border-2 p-4 rounded-2xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center
      ${active ? 'border-blue-500 bg-blue-50/50 ring-1 ring-blue-500' : 'border-gray-50 hover:border-blue-100'}`}
  >
    <div className="w-14 h-14 bg-gray-100 rounded-full mb-3 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
      {id === 'system' ? <User className="text-blue-400" /> : <div className="bg-blue-200 w-full h-full" />}
    </div>
    <p className="text-[13px] font-bold text-gray-800 leading-tight mb-1">{name}</p>
    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">{role}</p>
    {rating && (
      <div className="flex items-center gap-1 mt-2">
        <Star size={10} fill="#EAB308" className="text-yellow-500" />
        <span className="text-[11px] font-extrabold text-gray-700">{rating}</span>
      </div>
    )}
  </div>
);

const TimeButton = ({ time, active, onClick }) => (
  <button
    onClick={() => onClick(time)}
    className={`py-3.5 rounded-xl border text-sm font-bold transition-all
      ${active 
        ? 'border-blue-500 bg-blue-50 text-blue-600 ring-1 ring-blue-500 shadow-sm shadow-blue-50' 
        : 'border-gray-100 text-gray-700 hover:border-blue-100 hover:bg-gray-50/50'}`}
  >
    {time}
  </button>
);

const SidebarInfoItem = ({ icon, label, value }) => (
  <div className="flex gap-4 items-start">
    <div className="text-gray-300 mt-1">{icon}</div>
    <div className="space-y-0.5">
      <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest leading-none">{label}</p>
      <p className="text-gray-700 font-bold leading-tight">{value}</p>
    </div>
  </div>
);

export default Dat_lich;