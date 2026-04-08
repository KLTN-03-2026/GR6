import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Clock, CircleDollarSign, ShieldCheck, CalendarCheck, Info, ChevronRight } from 'lucide-react';

const Chi_tiet_dv = () => {
  const navigate = useNavigate();
  const serviceDetail = {
    title: "Combo Cắt gội massage",
    rating: 4.8,
    reviews: 128,
    price: "350,000 VND",
    duration: "60 phút",
    description: "Trải nghiệm thư giãn tuyệt vời với gói dịch vụ cao cấp của chúng tôi. Combo bao gồm cắt tóc tạo kiểu chuyên nghiệp, gội đầu dưỡng sinh bằng thảo dược tự nhiên và massage cổ vai gáy giảm căng thẳng mệt mỏi. Sản phẩm sử dụng hoàn toàn từ thiên nhiên, phù hợp với mọi loại da và tóc.",
    images: [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400",
      "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=400",
      "https://images.unsplash.com/photo-1519415355175-7527b23cf4ad?w=400",
    ],
    provider: {
      name: "Uổn Beauty House",
      address: "Đống Đa, Hà Nội",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lily"
    },
    comments: [
      { id: 1, author: "Nguyễn Thùy Linh", time: "2 ngày trước", content: "Dịch vụ cực kỳ tốt, nhân viên tay nghề cao và rất nhiệt tình. Không gian spa yên tĩnh, sạch sẽ. Chắc chắn sẽ quay lại!", rating: 5 },
      { id: 2, author: "Trần Văn Nam", time: "1 tuần trước", content: "Cắt tóc đẹp, massage rất thư giãn. Giá cả hợp lý so với chất lượng nhận được.", rating: 5 }
    ]
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Layout Grid: 8 cột cho nội dung, 4 cột cho Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* CỘT TRÁI: HÌNH ẢNH & THÔNG TIN */}
          <div className="lg:col-span-8 space-y-8">
            {/* Gallery Hình ảnh */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 h-[400px] rounded-3xl overflow-hidden shadow-sm">
                <img src={serviceDetail.images[0]} alt="main" className="w-full h-full object-cover" />
              </div>
              {serviceDetail.images.slice(1).map((img, index) => (
                <div key={index} className="h-28 rounded-2xl overflow-hidden shadow-sm">
                  <img src={img} alt="sub" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Tiêu đề & Rating */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-black text-gray-900">{serviceDetail.title}</h1>
                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Giảm 10% hôm nay</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star size={18} fill="currentColor" />
                </div>
                <span className="font-bold text-gray-900">{serviceDetail.rating}</span>
                <span className="text-gray-400 text-sm">({serviceDetail.reviews} đánh giá)</span>
              </div>
            </div>

            {/* Mô tả chi tiết */}
            <div className="bg-white p-8 rounded-[32px] shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Mô tả dịch vụ</h2>
              <p className="text-gray-600 leading-relaxed mb-8">{serviceDetail.description}</p>
              
              <div className="flex flex-wrap gap-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Thời lượng</p>
                    <p className="font-bold text-gray-900">{serviceDetail.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                    <CircleDollarSign size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest">Giá dịch vụ</p>
                    <p className="font-bold text-gray-900">{serviceDetail.price}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Đánh giá khách hàng */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Đánh giá từ khách hàng</h2>
                <button className="text-blue-600 font-bold text-sm flex items-center">Xem tất cả <ChevronRight size={16} /></button>
              </div>
              <div className="space-y-6">
                {serviceDetail.comments.map(comment => (
                  <div key={comment.id} className="flex gap-4">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.author}`} className="w-12 h-12 rounded-full border border-gray-100" alt="user" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-gray-900">{comment.author}</h4>
                        <span className="text-xs text-gray-400">• {comment.time}</span>
                      </div>
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CỘT PHẢI: BOOKING CARD (STICKY) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Thẻ đặt ngay */}
              <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-blue-100/50 border border-gray-50">
                <p className="text-sm font-bold text-gray-400 mb-1">Giá trọn gói</p>
                <h3 className="text-3xl font-black text-gray-900 mb-6">{serviceDetail.price}</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl text-blue-700 text-xs font-bold">
                    <ShieldCheck size={18} /> Đảm bảo chất lượng ServiceHub
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl text-blue-700 text-xs font-bold">
                    <CalendarCheck size={18} /> Lịch trống hôm nay
                  </div>
                </div>

                <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                  ĐẶT NGAY
                </button>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">Thông tin nhà cung cấp</p>
                  <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all" onClick={() => navigate('/chi-tiet-thuong-hieu')}>
                    <img src={serviceDetail.provider.avatar} className="w-12 h-12 rounded-xl" alt="provider" />
                    <div>
                      <h4 className="font-bold text-gray-900">{serviceDetail.provider.name}</h4>
                      <p className="text-xs text-gray-500">{serviceDetail.provider.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Thẻ Lưu ý */}
              <div className="bg-blue-50/50 p-6 rounded-[32px] border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 font-bold mb-3 text-sm">
                  <Info size={18} /> Lưu ý
                </div>
                <ul className="text-xs text-blue-600 space-y-2 font-medium">
                  <li className="flex gap-2"><span>•</span> Vui lòng đến trước 10 phút để chuẩn bị.</li>
                  <li className="flex gap-2"><span>•</span> Hủy lịch miễn phí trước 2 tiếng.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chi_tiet_dv;