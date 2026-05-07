import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import api, { getHinhAnhDichVu, getThuongHieus } from '../api';
import { Star, Clock, CircleDollarSign, ShieldCheck, Info, ChevronRight } from 'lucide-react';

const Chi_tiet_dv = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dataBE, setDataBE] = useState(null);
  const [imagesBE, setImagesBE] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [thuonghieu, setThuonghieu] = useState([]);
  const [listDanhGia, setListDanhGia] = useState([]); // State mới cho đánh giá

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // Thêm API lấy đánh giá vào Promise.all
        const [resDetail, resImages, resThuongHieu, resDanhGia] = await Promise.all([
          api.get(`/dich-vu/chi-tiet-dich-vu/${id}`),
          getHinhAnhDichVu(),
          getThuongHieus(id),
          api.get(`/danh-gia/dich-vu/get-data/${id}`) // API mới của bạn
        ]);

        if (resDetail.data.status) {
          setDataBE(resDetail.data.data);
        }

        if (resImages.data.status) {
          const filtered = resImages.data.data.filter(img => img.id_dich_vu === parseInt(id));
          setImagesBE(filtered.map(i => i.hinh_anh));
        }

        if (resThuongHieu.data.status) {
          setThuonghieu(resThuongHieu.data.data);
        }

        // Cập nhật state đánh giá
        if (resDanhGia.data.status) {
          setListDanhGia(resDanhGia.data.data);
        }

      } catch (error) {
        console.error("Lỗi fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (isLoading) return <div className="text-center py-20">Đang tải...</div>;
  if (!dataBE) return <div className="text-center py-20">Dịch vụ không tồn tại.</div>;

  // Tính toán trung bình cộng rating (nếu cần)
  const averageRating = listDanhGia.length > 0 
    ? (listDanhGia.reduce((acc, curr) => acc + curr.muc_hai_long, 0) / listDanhGia.length).toFixed(1)
    : "5.0";

  const serviceDetail = {
    title: dataBE.ten_dich_vu,
    rating: averageRating,
    reviews: listDanhGia.length,
    price: new Intl.NumberFormat('vi-VN').format(dataBE.don_gia) + ' VND',
    duration: `${dataBE.thoi_gian_du_kien} phút`,
    description: dataBE.mo_ta_dai,
    ten: thuonghieu.ten_thuong_hieu,
    diachi: thuonghieu.dia_chi,
    logo: thuonghieu.logo,
    images: imagesBE.length > 0 ? imagesBE : [
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800",
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-20 font-sans">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-8">
            {/* ... Phần hình ảnh giữ nguyên ... */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3 h-[400px] rounded-3xl overflow-hidden shadow-sm">
                <img src={serviceDetail.images[0]} alt="main" className="w-full h-full object-cover" />
              </div>
              {serviceDetail.images.slice(1, 4).map((img, index) => (
                <div key={index} className="h-28 rounded-2xl overflow-hidden shadow-sm">
                  <img src={img} alt="sub" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-4xl font-black text-gray-900">{serviceDetail.title}</h1>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">
                  <Star size={18} fill="currentColor" />
                </div>
                <span className="font-bold text-gray-900">{serviceDetail.rating}</span>
                <span className="text-gray-400 text-sm">({serviceDetail.reviews} đánh giá thực tế)</span>
              </div>
            </div>

            {/* ... Phần mô tả dịch vụ giữ nguyên ... */}
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

            {/* PHẦN HIỂN THỊ ĐÁNH GIÁ TỪ API */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Đánh giá từ khách hàng ({listDanhGia.length})</h2>
              </div>
              
              <div className="space-y-6">
                {listDanhGia.length > 0 ? (
                  listDanhGia.map((comment, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-white rounded-2xl border border-gray-50 shadow-sm">
                      <img 
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.ten_khach_hang}`} 
                        className="w-12 h-12 rounded-full border border-gray-100" 
                        alt="user" 
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-bold text-gray-900">{comment.ten_khach_hang}</h4>
                        </div>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              fill={i < comment.muc_hai_long ? "currentColor" : "transparent"} 
                              color={i < comment.muc_hai_long ? "#facc15" : "#e2e8f0"}
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed italic">{comment.noi_dung}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 italic text-sm">Chưa có đánh giá nào cho dịch vụ này.</p>
                )}
              </div>
            </div>
          </div>

          {/* ... Phần Sidebar giữ nguyên ... */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              <div className="bg-white p-6 rounded-[32px] shadow-xl shadow-blue-100/50 border border-gray-100">
                <p className="text-sm font-bold text-gray-400 mb-1">Giá trọn gói</p>
                <h3 className="text-3xl font-black text-gray-900 mb-6">{serviceDetail.price}</h3>
                <Link to={`/dat-lich/${thuonghieu.id}/${id}`}>
                  <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-lg shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95">
                    ĐẶT NGAY
                  </button>
                </Link>
                {/* ... Thông tin thương hiệu ... */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <p className="text-[10px] uppercase font-black text-gray-400 tracking-widest mb-4">Thương Hiệu</p>
                  <div 
                    className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-2xl transition-all" 
                    onClick={() => navigate(`/chi-tiet-thuong-hieu/${thuonghieu.id}`)}
                  >
                    <img src={serviceDetail.logo} className="w-12 h-12 rounded-xl" alt="provider" />
                    <div>
                      <h4 className="font-bold text-gray-900">{serviceDetail.ten}</h4>
                      <p className="text-xs text-gray-500">{serviceDetail.diachi}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Chi_tiet_dv;