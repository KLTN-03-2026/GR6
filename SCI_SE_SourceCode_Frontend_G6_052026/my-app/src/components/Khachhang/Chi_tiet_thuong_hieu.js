import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Mail, Star } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../api'; 

const Chi_tiet_thuong_hieu = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dịch vụ');

  const [brandData, setBrandData] = useState(null);
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]); 
  const [workingHours, setWorkingHours] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [resBrand, resServices, resReviews, resWorkingHours] = await Promise.all([
          api.get(`/khach-hang/thuong-hieu/get-data/${id}`),
          api.get(`/dich-vu/get-data-by-ncc/${id}`),
          api.get(`/danh-gia/thuong-hieu/get-data/${id}`),
          api.get(`/thuong-hieu/lich-lam-viec/${id}`)
        ]);

        if (resBrand.data.status) {
          const db = resBrand.data.data;
          setBrandData({
            name: db.ten_thuong_hieu,
            address: db.dia_chi || "Đang cập nhật địa chỉ",
            rating: 4.8, 
            banner: db.anh_bia,
            logo: db.logo,
            description: db.mo_ta || "Chưa có mô tả chi tiết.",
            phone: db.so_dien_thoai || "Đang cập nhật",
            email: db.email 
          });
        }

        if (resServices.data.status) setServices(resServices.data.data);
        if (resReviews.data.status) setReviews(resReviews.data.data);
        if (resWorkingHours.data.status) setWorkingHours(resWorkingHours.data.data);

      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (isLoading) return <div className="flex justify-center items-center h-screen font-bold text-blue-600">Đang tải hồ sơ...</div>;
  if (!brandData) return <div className="text-center py-20 font-bold">Thương hiệu không tồn tại.</div>;

  return (
    <div className="bg-white min-h-screen font-sans">
      <section className="relative h-[400px]">
        <img src={brandData.banner} alt="banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/30"></div> 
        <div className="absolute bottom-0 left-0 right-0 py-8 bg-gradient-to-t from-black/70 to-transparent">
          <div className="container mx-auto px-6 flex items-end gap-6">
            <div className="w-32 h-32 bg-white rounded-2xl p-1 shadow-xl shrink-0 translate-y-12 hidden md:block border-4 border-white">
              <img src={brandData.logo} alt="logo" className="w-full h-full rounded-xl object-cover" />
            </div>
            <div className="flex-grow text-white pb-2">
              <h1 className="text-4xl font-bold mb-2">{brandData.name}</h1>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1"><MapPin size={16} /> {brandData.address}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="border-b border-gray-100 mt-12 md:mt-16">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {['Dịch vụ', 'Đánh giá'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {tab === 'Đánh giá' ? `Đánh giá (${reviews.length})` : tab}
                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-t-full"></div>}
              </button>
            ))}
          </div>
        </div>
      </div>
      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8">
            {activeTab === 'Dịch vụ' ? (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Danh sách dịch vụ</h2>
                {services.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map(sv => (
                      <div key={sv.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col">
                        <div className="h-44 overflow-hidden relative">
                          <img src={sv.hinh_anh || "https://via.placeholder.com/400"} alt={sv.ten_dich_vu} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-5 flex flex-col flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg text-gray-800 line-clamp-1">{sv.ten_dich_vu}</h3>
                            <span className="text-blue-600 font-bold whitespace-nowrap ml-2">
                              {new Intl.NumberFormat('vi-VN').format(sv.don_gia)}đ
                            </span>
                          </div>
                          <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2">{sv.mo_ta_ngan || "Không có mô tả cho dịch vụ này."}</p>
                          <div className="flex justify-between items-center mt-auto border-t pt-4">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                              <Clock size={14}/> {sv.thoi_gian_du_kien} phút
                            </span>
                            <button onClick={() => navigate(`/chi-tiet/${sv.id}`)} className="text-white text-xs font-bold px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm">
                              Chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed text-gray-400">Thương hiệu hiện chưa có dịch vụ nào.</div>
                )}
              </>
            ) : (
              <div>
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Phản hồi từ khách hàng</h2>
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((item, index) => (
                      <div key={index} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                            {item.ten_khach_hang?.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">{item.ten_khach_hang}</h4>
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < item.muc_hai_long ? "currentColor" : "transparent"} color={i < item.muc_hai_long ? "#facc15" : "#e2e8f0"}/>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">"{item.noi_dung}"</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-gray-50 p-10 rounded-3xl text-center text-gray-400 border-2 border-dashed">
                    <Star className="mx-auto mb-4" size={48} />
                    <p>Thương hiệu này chưa nhận được đánh giá nào.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm sticky top-6">
              <h3 className="text-xl font-bold mb-8 text-gray-900 border-b pb-4">Thông tin liên hệ</h3>
              
              <div className="space-y-8">
                {/* Giờ hoạt động */}
                <div className="flex gap-4">
                  <Clock className="text-blue-500 mt-1 shrink-0" size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-gray-900 text-lg">Giờ hoạt động</p>
                    <div className="mt-3 space-y-2">
                      {workingHours.length > 0 ? (
                        workingHours.map((item, index) => (
                          <div key={index} className="text-sm">
                            <span className="text-gray-400 font-medium">{item.thu_trong_tuan} </span>
                            <span className="text-gray-600 font-bold ml-1">
                              {item.gio_mo_cua?.substring(0, 5)} - {item.gio_dong_cua?.substring(0, 5)}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-400 italic text-sm">Chưa có lịch làm việc</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="text-blue-500 mt-1 shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Số điện thoại</p>
                    <p className="text-gray-500 mt-1 font-medium">{brandData.phone}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <Mail className="text-blue-500 mt-1 shrink-0" size={24} />
                  <div>
                    <p className="font-bold text-gray-900 text-lg">Email</p>
                    <p className="text-gray-500 mt-1 font-medium truncate max-w-[200px]">{brandData.email}</p>
                  </div>
                </div>
              </div>
              <div className="mt-12 pt-8 border-t border-gray-50">
                <p className="font-bold text-gray-400 italic text-sm mb-4">Mô tả:</p>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {brandData.description}
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Chi_tiet_thuong_hieu;