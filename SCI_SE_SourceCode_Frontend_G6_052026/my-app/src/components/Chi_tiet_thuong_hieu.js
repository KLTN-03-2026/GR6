import React, { useState } from 'react';
import { Star, MapPin, Calendar, MessageCircle, Clock, Phone, Mail, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Chi_tiet_thuong_hieu = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dịch vụ');

  const brandData = {
    name: "Sen Spa & Wellness",
    address: "123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh",
    rating: 4.8,
    reviews: 250,
    banner: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200",
    logo: "https://api.dicebear.com/7.x/initials/svg?seed=SS&backgroundColor=f87171",
    description: "Sen Spa & Wellness tự hào là điểm đến thư giãn hàng đầu tại trung tâm Sài Gòn. Với không gian mang đậm hơi thở thiên nhiên và đội ngũ kỹ thuật viên tận tâm, chúng tôi cam kết mang lại trải nghiệm tái tạo năng lượng tuyệt vời nhất cho quý khách.",
    workingHours: "Thứ 2 - Chủ Nhật: 09:00 - 21:00",
    phone: "028 1234 5678",
    email: "contact@senspa.vn"
  };

  const services = [
    { id: 1, title: 'Massage Toàn Thân', price: '500.000đ', time: '60 - 90 phút', img: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=400', desc: 'Kết hợp phương pháp truyền thống và tinh dầu thảo dược giúp giảm căng thẳng.' },
    { id: 2, title: 'Chăm Sóc Da Mặt', price: '350.000đ', time: '45 phút', img: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400', desc: 'Làm sạch sâu, cấp ẩm và phục hồi làn da rạng rỡ với tinh chất tự nhiên.' },
    { id: 3, title: 'Gội Đầu Thảo Dược', price: '150.000đ', time: '30 phút', img: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400', desc: 'Gội đầu dưỡng sinh kết hợp massage cổ vai gáy giải tỏa mệt mỏi.' },
    { id: 4, title: 'Làm Móng Cao Cấp', price: '200.000đ', time: '60 phút', img: 'https://images.unsplash.com/photo-1632345031435-81979cd75a39?w=400', desc: 'Cắt tỉa, tạo dáng và sơn gel chuyên nghiệp với nhiều mẫu mã đa dạng.' },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* 1. HERO BANNER SECTION */}
      <section className="relative h-[450px]">
        <img src={brandData.banner} alt="banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/40"></div> {/* Overlay tối */}
        
        <div className="absolute bottom-0 left-0 right-0 py-10">
          <div className="container mx-auto px-6 flex items-end gap-6">
            {/* Brand Logo */}
            <div className="w-32 h-32 bg-white rounded-2xl p-2 shadow-xl shrink-0 translate-y-16 hidden md:block">
              <img src={brandData.logo} alt="logo" className="w-full h-full rounded-xl object-cover" />
            </div>
            
            {/* Brand Info on Banner */}
            <div className="flex-grow text-white pb-4">
              <h1 className="text-4xl font-bold mb-2">{brandData.name}</h1>
              <div className="flex items-center gap-4 text-sm opacity-90">
                <span className="flex items-center gap-1"><MapPin size={16} /> {brandData.address}</span>
                <span className="flex items-center gap-1 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">
                  ★ {brandData.rating} stars ({brandData.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pb-4">
              <button className="bg-white text-gray-900 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-100 transition-all">
                <Calendar size={18} /> Đặt lịch ngay
              </button>
              <button className="bg-blue-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-600 transition-all">
                <MessageCircle size={18} /> Nhắn tin
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TAB NAVIGATION */}
      <div className="border-b border-gray-100 mt-16 md:mt-20">
        <div className="container mx-auto px-6">
          <div className="flex gap-10">
            {['Dịch vụ', 'Về chúng tôi', 'Đánh giá', 'Hình ảnh'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                {tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 3. MAIN CONTENT LAYOUT */}
      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* LEFT: Featured Services */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-bold mb-8 text-gray-900">Dịch vụ nổi bật</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map(sv => (
                <div key={sv.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="h-48 overflow-hidden">
                    <img src={sv.img} alt={sv.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{sv.title}</h3>
                      <span className="text-blue-600 font-bold">{sv.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 flex-grow">{sv.desc}</p>
                    <div className="flex justify-between items-center mt-auto">
                      <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={14}/> {sv.time}</span>
                      <button 
                        onClick={() => navigate('/chi-tiet')}
                        className="text-blue-600 text-xs font-bold px-4 py-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all"
                      >
                        Chi tiết
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: About & Promo */}
          <div className="lg:col-span-4 space-y-8">
            {/* About Card */}
            <div className="bg-gray-50/50 p-8 rounded-[32px] border border-gray-100">
              <h3 className="text-xl font-bold mb-4">Về chúng tôi</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">{brandData.description}</p>
              
              <div className="space-y-4">
                <div className="flex gap-3 text-sm">
                  <Clock className="text-blue-500 shrink-0" size={18} />
                  <div>
                    <p className="font-bold text-gray-900">Giờ mở cửa</p>
                    <p className="text-gray-500">{brandData.workingHours}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Phone className="text-blue-500 shrink-0" size={18} />
                  <div>
                    <p className="font-bold text-gray-900">Điện thoại</p>
                    <p className="text-gray-500">{brandData.phone}</p>
                  </div>
                </div>
                <div className="flex gap-3 text-sm">
                  <Mail className="text-blue-500 shrink-0" size={18} />
                  <div>
                    <p className="font-bold text-gray-900">Email</p>
                    <p className="text-gray-500">{brandData.email}</p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="mt-8">
                <p className="font-bold text-sm mb-3">Vị trí</p>
                <div className="h-40 bg-gray-200 rounded-2xl overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?w=400" className="w-full h-full object-cover grayscale opacity-50" alt="map" />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <MapPin className="text-red-500" size={32} />
                    </div>
                </div>
              </div>
            </div>

            {/* Promo Card */}
            <div className="bg-blue-600 p-8 rounded-[32px] text-white relative overflow-hidden">
                <div className="relative z-10">
                    <h4 className="font-bold text-lg mb-2">Ưu đãi hôm nay</h4>
                    <p className="text-blue-100 text-xs mb-6">Giảm ngay 20% cho khách hàng đặt lịch trước 12:00 trưa hàng ngày.</p>
                    <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all">
                        Nhận ưu đãi
                    </button>
                </div>
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500 rounded-full blur-2xl opacity-50"></div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Chi_tiet_thuong_hieu;