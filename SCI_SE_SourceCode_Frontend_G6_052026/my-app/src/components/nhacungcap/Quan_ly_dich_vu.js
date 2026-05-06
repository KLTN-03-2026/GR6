import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, ClipboardList, Calendar, Users, BarChart3, 
  Plus, Pencil, Trash2, X, Upload, AlertTriangle, Briefcase, Settings,
} from 'lucide-react';
import { serviceApi } from '../../api/index';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Menu from './Menu';

const Quan_ly_dich_vu = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  
  // State quản lý xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // State quản lý form
  const [formData, setFormData] = useState({
    ten_dich_vu: '',
    id_danh_muc_dich_vu: '',
    don_gia: '',
    thoi_gian_du_kien: '',
    mo_ta_ngan: '',
    mo_ta_dai: '',              
    id_thuong_hieu: '',  
    kieu_phuc_vu: '1',          
    so_luong_lich_toi_da: '1', 
    trang_thai: 1,
    hinh_anh: [] 
  });
  const [previewImages, setPreviewImages] = useState([]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await serviceApi.getDichVu();
      if (res.data.status) setServices(res.data.data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await serviceApi.delete(deleteId);
      if (res.data.status) {
        setServices(services.filter(s => s.id !== deleteId));
        setIsDeleteModalOpen(false);
        setDeleteId(null);
        toast.success("Xóa dịch vụ thành công!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  // --- LOGIC THÊM/SỬA ---
  const handleOpenAdd = () => {
    setCurrentService(null);
    setFormData({
      ten_dich_vu: '', 
      id_danh_muc_dich_vu: services[0]?.id_danh_muc_dich_vu || '', 
      don_gia: '',
      thoi_gian_du_kien: '', 
      mo_ta_ngan: '', 
      mo_ta_dai: '',
      id_thuong_hieu: services[0]?.id_thuong_hieu || '', 
      kieu_phuc_vu: '1', 
      so_luong_lich_toi_da: '1',
      trang_thai: 1, 
      hinh_anh: []
    });
    setPreviewImages([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = async (service) => {
    setCurrentService(service);
    setFormData({
      id: service.id,
      ten_dich_vu: service.ten_dich_vu,
      id_danh_muc_dich_vu: service.id_danh_muc_dich_vu ,
      don_gia: service.don_gia,
      thoi_gian_du_kien: service.thoi_gian_du_kien,
      mo_ta_ngan: service.mo_ta_ngan,
      mo_ta_dai: service.mo_ta_dai || '',
      id_thuong_hieu: service.id_thuong_hieu || '1',
      kieu_phuc_vu: service.kieu_phuc_vu || '1',
      so_luong_lich_toi_da: service.so_luong_lich_toi_da ,
      trang_thai: service.trang_thai,
      hinh_anh: [] 
    });
    try {
       const res = await serviceApi.chiTietDichVu(service.id);
       if(res.data.status) setPreviewImages(res.data.data_hinh_anh.map(img => img.hinh_anh));
    } catch (err) { setPreviewImages([]); }
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, hinh_anh: [...formData.hinh_anh, ...files] });
    setPreviewImages([...previewImages, ...files.map(file => URL.createObjectURL(file))]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    
    Object.keys(formData).forEach(key => {
      if (key !== 'hinh_anh') {
        let value = formData[key];
        if (['don_gia', 'thoi_gian_du_kien', 'so_luong_lich_toi_da', 'id_thuong_hieu', 'id_danh_muc_dich_vu'].includes(key)) {
          value = value !== '' ? Math.floor(Number(value)) : 0;
        }
        data.append(key, value);
      }
    });
    
    formData.hinh_anh.forEach((file) => {
      if (file instanceof File) data.append('hinh_anh[]', file);
    });

    try {
      let res = currentService ? await serviceApi.update(data) : await serviceApi.create(data);
      if (res.data.status) {
          toast.success(currentService ? "Cập nhật dịch vụ thành công!" : "Thêm dịch vụ thành công!");
        setIsModalOpen(false);
        loadData();
      }
    } catch (err) { 
      toast.error(err.response?.data?.message || "Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <Menu />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Quản lý dịch vụ</h1>
            <p className="text-gray-500 text-sm">Cập nhật đầy đủ thông tin dịch vụ làm đẹp</p>
          </div>
          <button onClick={handleOpenAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-200 transition-all font-semibold">
            <Plus size={20} /> Thêm dịch vụ mới
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <StatCard icon={<div className="w-6 h-6 border-2 border-current rounded-full flex items-center justify-center text-[10px]">✓</div>} label="HOẠT ĐỘNG" value={services.length} color="blue" />
          <StatCard icon={<BarChart3 size={20} />} label="DANH MỤC" value="--" color="orange" />
          <StatCard icon={<div className="w-5 h-5 border-2 border-current rounded-full relative"></div>} label="ĐANG ẨN" value="--" color="gray" />
          <StatCard icon={<BarChart3 size={20} />} label="ĐANG CHỜ" value="--" color="red" />
        </div>

        {/* Table List */}
        <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center text-blue-600 font-bold">
            <div className="flex items-center gap-2"><ClipboardList size={20} /> Danh sách dịch vụ</div>
          </div>
          <table className="w-full">
            <thead className="bg-[#F8FAFC]">
              <tr>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tên dịch vụ</th>
                <th className="px-6 py-4 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider">Giá niêm yết</th>
                <th className="px-6 py-4 text-center text-[11px] font-bold text-gray-400 uppercase tracking-wider">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-400">Đang tải dữ liệu...</td></tr>
              ) : services.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500">
                        <ClipboardList size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 text-sm">{item.ten_dich_vu}</p>
                        <p className="text-[11px] text-gray-400">{item.mo_ta_ngan}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-blue-600">{new Intl.NumberFormat('vi-VN').format(item.don_gia)}đ</td>
                  <td className="px-6 py-5 flex justify-center gap-2">
                    <button onClick={() => handleOpenEdit(item)} className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-blue-600 transition-all shadow-sm"><Pencil size={16}/></button>
                    <button onClick={() => handleOpenDelete(item.id)} className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:text-red-600 transition-all shadow-sm"><Trash2 size={16}/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* MODAL THÊM/SỬA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{currentService ? 'Cập nhật dịch vụ' : 'Thêm dịch vụ mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24}/></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-6">
                
                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Tên dịch vụ</label>
                  <input type="text" required className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white transition-all" value={formData.ten_dich_vu} onChange={(e) => setFormData({...formData, ten_dich_vu: e.target.value})} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Giá niêm yết (VNĐ)</label>
                  <input type="number" required className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" value={formData.don_gia} onChange={(e) => setFormData({...formData, don_gia: e.target.value})} />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Thời gian (Phút)</label>
                  <input type="number" required className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" value={formData.thoi_gian_du_kien} onChange={(e) => setFormData({...formData, thoi_gian_du_kien: e.target.value})} />
                </div>

                {/* MÔ TẢ NGẮN (Đã phục hồi) */}
                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mô tả ngắn</label>
                  <textarea rows="2" className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none focus:bg-white transition-all" value={formData.mo_ta_ngan} onChange={(e) => setFormData({...formData, mo_ta_ngan: e.target.value})} />
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Mô tả chi tiết (Dài)</label>
                  <textarea required rows="3" className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none resize-none focus:bg-white transition-all" value={formData.mo_ta_dai} onChange={(e) => setFormData({...formData, mo_ta_dai: e.target.value})} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Số lịch tối đa</label>
                  <input type="number" required min="1" className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none" value={formData.so_luong_lich_toi_da} onChange={(e) => setFormData({...formData, so_luong_lich_toi_da: e.target.value})} />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Kiểu phục vụ</label>
                  <select className="w-full mt-1.5 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none cursor-pointer" value={formData.kieu_phuc_vu} onChange={(e) => setFormData({...formData, kieu_phuc_vu: e.target.value})}>
                    <option value="1">Tại cửa hàng</option>
                    <option value="2">Tại nhà khách</option>
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">Album ảnh</label>
                  <div className="flex flex-wrap gap-3">
                    {previewImages.map((src, idx) => (
                      <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden border relative group shadow-sm">
                        <img src={src} className="w-full h-full object-cover" alt="" />
                        <button type="button" onClick={() => {
                          const p = [...previewImages]; p.splice(idx,1); setPreviewImages(p);
                          const f = [...formData.hinh_anh]; f.splice(idx,1); setFormData({...formData, hinh_anh: f});
                        }} className="absolute inset-0 bg-red-500/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                          <Trash2 size={16}/>
                        </button>
                      </div>
                    ))}
                    <label className="w-20 h-20 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 text-gray-400 transition-all">
                      <Upload size={20} />
                      <input type="file" multiple className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 mt-10">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3.5 bg-gray-100 text-gray-600 rounded-2xl font-bold hover:bg-gray-200 transition-all">Hủy bỏ</button>
                <button type="submit" className="flex-[2] py-3.5 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95">
                  {currentService ? 'Lưu thay đổi' : 'Xác nhận thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL XÁC NHẬN XÓA */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-md relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-red-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-3 text-gray-800">Xác nhận xóa</h2>
              <p className="text-gray-500 mb-8">
                Bạn có chắc chắn muốn xóa dịch vụ này? <br/> Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)} 
                  className="flex-1 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Quay lại
                </button>
                <button 
                  onClick={confirmDelete}
                  className="flex-1 py-4 bg-red-500 text-white rounded-2xl font-bold shadow-lg hover:bg-red-600 hover:scale-[1.02] transition-all"
                >
                  Đồng ý xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SidebarItem = ({ icon, text, active }) => (
  <div
    className={`flex items-center gap-2 p-2 rounded-lg text-sm cursor-pointer ${
      active ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100"
    }`}
  >
    {icon}
    {text}
  </div>
);

const StatCard = ({ icon, label, value, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-500",
    orange: "bg-orange-50 text-orange-500",
    gray: "bg-gray-50 text-gray-500",
    red: "bg-red-50 text-red-500"
  };
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 flex items-center gap-4 shadow-sm">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
        <p className="text-xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  );
};

export default Quan_ly_dich_vu;