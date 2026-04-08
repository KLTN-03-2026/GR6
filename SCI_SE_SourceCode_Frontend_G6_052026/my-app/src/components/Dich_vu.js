import React, { useState } from 'react';
import { Search, Star, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const categories = ['Tất cả', 'Làm đẹp', 'Sửa chữa', 'Gia đình', 'Thú cưng', 'Thể thao', 'Giáo dục', 'Vận chuyển'];

const mockServices = [
  { id: 1, title: 'Cắt tóc nam phong cách', rating: 4.9, price: '200.000 VND', desc: 'Cắt tóc, tạo kiểu và chăm sóc râu chuyên nghiệp với các stylist hàng...', img: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600', popular: true },
  { id: 2, title: 'Spa Chăm sóc da chuyên sâu', rating: 4.8, price: '550.000 VND', desc: 'Liệu trình trẻ hóa làn da và thư giãn tinh thần với tinh dầu tự nhiên.', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600', popular: false },
  { id: 3, title: 'Sửa chữa điện lạnh', rating: 4.5, price: '150.000 VND', desc: 'Bảo trì và sửa chữa máy lạnh, tủ lạnh nhanh chóng tại nhà.', img: 'https://images.unsplash.com/photo-1581091012184-2ff710bd895e?w=600', popular: false },
  { id: 4, title: 'Dịch vụ dọn dẹp nhà', rating: 4.7, price: '300.000 VND', desc: 'Dọn dẹp nhà cửa, căn hộ chuyên nghiệp, uy tín và sạch sẽ.', img: 'https://images.unsplash.com/photo-1581574204868-6e19d6b8acfc?w=600', popular: false },
  { id: 5, title: 'Trang điểm dự tiệc', rating: 4.9, price: '450.000 VND', desc: 'Makeup phong cách đa dạng từ nhẹ nhàng đến sang trọng cho các sự...', img: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600', popular: false },
  { id: 6, title: 'Gia sư tiếng Anh 1-1', rating: 4.6, price: '250.000 VND', desc: 'Cải thiện kỹ năng giao tiếp và thi chứng chỉ quốc tế IELTS/TOEIC.', img: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600', popular: false },
  { id: 7, title: 'Thiết kế Logo & Branding', rating: 5.0, price: '1.200.000 VND', desc: 'Nâng tầm thương hiệu với thiết kế sáng tạo và độc đáo.', img: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600', popular: false },
  { id: 8, title: 'Tư vấn tài chính cá nhân', rating: 4.4, price: '800.000 VND', desc: 'Lập kế hoạch tài chính, đầu tư và tiết kiệm hiệu quả lâu dài.', img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600', popular: false },
];

const Dich_vu = () => {
  const [activeCategory, setActiveCategory] = useState('Tất cả');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-gray-900">

      <main className="container mx-auto px-4 py-10 max-w-7xl flex-grow">
        {/* Tiêu đề trang */}
        <h1 className="text-4xl font-extrabold mb-8 tracking-tight text-slate-900">
          Dịch vụ chuyên nghiệp dành cho bạn
        </h1>

        {/* Lọc Categories */}
        <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap
                ${activeCategory === cat 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Lưới hiển thị dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {mockServices.map((service) => (
            /* THÊM SỰ KIỆN onClick VÀO ĐÂY */
            <div 
              key={service.id} 
              className="group cursor-pointer"
              onClick={() => navigate('/chi-tiet')} 
            >
              {/* Ảnh dịch vụ */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-4 shadow-sm border border-gray-50">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {service.popular && (
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full shadow-sm">
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-800">Phổ biến</span>
                  </div>
                )}
              </div>

              {/* Thông tin dịch vụ */}
              <div className="space-y-2 px-1">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-[17px] leading-tight text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500 shrink-0">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold text-gray-700">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed h-10">
                  {service.desc}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-black text-blue-600 tracking-tight">
                    {service.price}
                  </span>
                  <div className="w-10 h-10 border border-blue-100 rounded-xl flex items-center justify-center text-blue-600 bg-blue-50/50 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <CalendarDays size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Phân trang */}
        <div className="flex justify-center items-center gap-2 mt-16">
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 text-white font-bold">1</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 font-bold hover:bg-gray-100 transition-colors">2</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full text-gray-600 font-bold hover:bg-gray-100 transition-colors">3</button>
          <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-gray-50 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dich_vu;