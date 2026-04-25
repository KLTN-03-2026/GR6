  import React, { useState, useEffect } from 'react';
  import { 
    LayoutDashboard, List, Users, UserCheck, Settings, 
    LogOut, Plus, Edit3, Trash2, Loader, AlertCircle, 
    ChevronRight, Image as ImageIcon,FileText
  } from 'lucide-react';
  import { Link, useNavigate, useLocation } from "react-router-dom";
  import api from '../../api/index'; 
import { toast } from 'react-toastify';

  const Quan_ly_danh_muc = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    
    // States cho dữ liệu
    const [categories, setCategories] = useState([]);
    const [selectedFatherId, setSelectedFatherId] = useState(0); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      id_father: 0,
      hinh_anh: null
    });
    const [editingId, setEditingId] = useState(null);
    const [formLoading, setFormLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const getAuthConfig = () => {
      const token = localStorage.getItem('admin_access_token');
      return { headers: { Authorization: `Bearer ${token}` } };
    };

    useEffect(() => {
      fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const response = await api.get("danh-muc/get-data");
        const data = response.data.data || response.data;
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Không thể kết nối đến máy chủ.");
      } finally {
        setLoading(false);
      }
    };

    const fatherCategories = categories.filter(cat => cat.id_father === 0);
    const displayCategories = selectedFatherId === 0 
      ? fatherCategories 
      : categories.filter(cat => cat.id_father === selectedFatherId);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          setError("Ảnh quá lớn (vượt quá 2MB)");
          return;
        }
        setFormData(prev => ({ ...prev, hinh_anh: file }));
        setPreviewImage(URL.createObjectURL(file));
        setError(null);
      }
    };

    const handleReset = () => {
      setFormData({ 
        name: '', 
        id_father: selectedFatherId,
        hinh_anh: null
      });
      setPreviewImage(null);
      setEditingId(null);
      setError(null);
    };

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!formData.name.trim()) {
        setError('Tên không được trống');
        return;
      }
      if (!(formData.hinh_anh instanceof File)) {
        setError("Bạn phải chọn lại ảnh khi cập nhật!");
        return;
      }

      try {
        setFormLoading(true);

        const data = new FormData();
        data.append('ten_dich_vu', formData.name);
        data.append('id_father', formData.id_father);

        // luôn gửi file giống create
        data.append('hinh_anh', formData.hinh_anh);

        if (editingId) {
          data.append('id', editingId);
          await api.post("danh-muc/update", data, getAuthConfig());
        } else {
          await api.post("danh-muc/create", data, getAuthConfig());
        }

        toast.success("Thành Công!");
        handleReset();
        fetchInitialData();

      } catch (err) {
        console.log(err.response?.data);
        setError(err.response?.data?.message || 'Lỗi hệ thống');
      } finally {
        setFormLoading(false);
      }
    };
    const handleEdit = (cat) => {
      setFormData({
        name: cat.ten_dich_vu || '',
        id_father: cat.id_father,
        hinh_anh: null 
      });

      setPreviewImage(cat.hinh_anh);
      setEditingId(cat.id);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
      if (!window.confirm("Bạn có chắc muốn xóa danh mục này?")) return;
      try {
        await api.delete(`danh-muc/destroy/${id}`, getAuthConfig());
        toast.success("Đã xóa thành công!");
        fetchInitialData();
      } catch (err) {
        toast.error("Lỗi: Không thể xóa.");
      }
    };
    const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (id, name) => {
    setFormData({ ...formData, id_father: id });
    setIsOpen(false);
  };
  const currentFather = fatherCategories.find(f => f.id === formData.id_father);

    return (
      <div className="min-h-screen bg-gray-50 flex font-sans text-slate-600">
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0 sticky top-0 h-screen">
          <nav className="flex-grow px-4 space-y-1 text-slate-600 font-medium mt-4">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><LayoutDashboard size={18} /> Bảng điều khiển</button>
            <Link to="/admin/quan-ly-danh-muc"><button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><List size={18} /> Danh mục</button></Link>
            <Link to="/admin/quan-ly-nguoi-dung"><button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><Users size={18} /> Người dùng</button></Link>
            <Link to="/admin/quan-ly-nguoi-dung"><button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><Users size={18} /> Nhà cung cấp</button></Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><Settings size={18} /> Cài đặt</button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-gray-50 rounded-xl transition-all"><FileText size={18} /> Báo cáo</button>
          </nav>
          <div className="p-4 border-t border-gray-100 space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-500 hover:bg-gray-50 rounded-xl transition-all"><LogOut size={18} /> Đăng xuất</button>
          </div>
        </aside>

        <main className="flex-grow p-10">
          <div className="max-w-7xl mx-auto">
            
            <div className="flex justify-between items-center mb-10">
              <div>
                <h1 className="text-3xl font-black text-slate-800 tracking-tight">Cấu hình danh mục</h1>
                <p className="text-gray-400 text-sm mt-1 font-medium italic">Chỉ cần tên, ID cha và hình ảnh.</p>
              </div>
              <button onClick={handleReset} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold shadow-lg hover:bg-blue-700 transition-all">
                <Plus size={20} /> Thêm danh mục
              </button>
            </div>

            {/* TAB CHỌN CHA */}
            <div className="flex gap-3 mb-8 overflow-x-auto pb-4 no-scrollbar">
              <button onClick={() => { setSelectedFatherId(0); handleReset(); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border whitespace-nowrap ${selectedFatherId === 0 ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'}`}>Tất cả</button>
              {fatherCategories.map(father => (
                <button key={father.id} onClick={() => { setSelectedFatherId(father.id); handleReset(); }} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all border whitespace-nowrap ${selectedFatherId === father.id ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-gray-500 border-gray-100 hover:border-blue-200'}`}>{father.ten_dich_vu}</button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* FORM NHẬP LIỆU GỌN NHẸ */}
              <div className="lg:col-span-4">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm space-y-5 sticky top-10">
                  <h3 className="text-lg font-bold text-slate-800">{editingId ? 'Sửa danh mục' : 'Thêm mới'}</h3>
                  
                  {error && <div className="p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl flex items-center gap-2"><AlertCircle size={14}/> {error}</div>}

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Danh Mục</label>
                    
                    <div className="relative">
                      {/* Nút bấm hiển thị */}
                      <div 
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-full bg-gray-50 border border-transparent rounded-2xl py-3 px-4 text-sm flex items-center justify-between cursor-pointer hover:bg-white hover:border-blue-100 transition-all focus:ring-2 focus:ring-blue-50"
                      >
                        <span className={formData.id_father === 0 ? "text-blue-600 font-bold" : "text-slate-600 font-medium"}>
                          {formData.id_father === 0 ? "Danh mục" : currentFather?.ten_dich_vu}
                        </span>
                        <ChevronRight size={16} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                      </div>

                      {/* Menu sổ xuống (Pop-over) */}
                      {isOpen && (
                        <>
                          {/* Lớp phủ để click ra ngoài thì đóng menu */}
                          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
                          
                          <div className="absolute z-20 w-full mt-2 bg-white border border-gray-100 rounded-[24px] shadow-xl shadow-blue-900/5 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="max-h-60 overflow-y-auto p-2 custom-scrollbar">
                              
                              {/* Option Gốc */}
                              <div 
                                onClick={() => handleSelect(0,)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${formData.id_father === 0 ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-slate-500'}`}
                              >
                                <div className={`w-2 h-2 rounded-full ${formData.id_father === 0 ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                Danh Mục Chính
                              </div>

                              {/* List Option Cha */}
                              {fatherCategories.map((f) => (
                                <div 
                                  key={f.id}
                                  onClick={() => handleSelect(f.id, f.ten_dich_vu)}
                                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all mt-1 ${formData.id_father === f.id ? 'bg-blue-50 text-blue-600 font-bold' : 'hover:bg-gray-50 text-slate-500'}`}
                                >
                                  <div className={`w-2 h-2 rounded-full ${formData.id_father === f.id ? 'bg-blue-600' : 'bg-transparent'}`}></div>
                                  <span className="opacity-50">↳</span> {f.ten_dich_vu}
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Tên danh mục</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="VD: Làm đẹp..." className="w-full bg-gray-50 border-none rounded-2xl py-3 px-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">Ảnh minh họa</label>
                    <div className="relative group h-40 w-full bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden hover:border-blue-300 transition-all flex flex-col items-center justify-center">
                      {previewImage ? (
                        <img src={previewImage} alt="preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center text-gray-400">
                          <ImageIcon size={28} />
                          <span className="text-[10px] font-bold mt-2 uppercase">Chọn ảnh</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                    </div>
                  </div>

                  <button type="submit" disabled={formLoading} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-300">
                    {formLoading ? <Loader size={18} className="animate-spin mx-auto" /> : (editingId ? 'CẬP NHẬT' : 'THÊM NGAY')}
                  </button>
                  {editingId && <button onClick={handleReset} type="button" className="w-full text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-2">Hủy bỏ</button>}
                </form>
              </div>

              {/* DANH SÁCH HIỂN THỊ */}
              <div className="lg:col-span-8">
                {loading ? (
                  <div className="flex justify-center py-20"><Loader className="animate-spin text-blue-600" size={40} /></div>
                ) : displayCategories.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-20">
                    {displayCategories.map((cat) => (
                      <div key={cat.id} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-blue-200 transition-all group">
                        <div className="flex justify-between items-start mb-6">
                          <div className="w-20 h-20 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100">
                            {cat.hinh_anh ? (
                              <img src={cat.hinh_anh} alt="thumb" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300 italic text-[10px]">No Image</div>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <button onClick={() => handleEdit(cat)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"><Edit3 size={18} /></button>
                            <button onClick={() => handleDelete(cat.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{cat.ten_dich_vu}</h3>
                        <div className="flex items-center gap-2 pt-4 border-t border-gray-50 mt-4">
                          <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">ID: #{cat.id}</span>
                          <ChevronRight size={10} className="text-gray-200" />
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Father: {cat.id_father}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white border-2 border-dashed border-gray-100 rounded-[32px] py-20 text-center">
                    <p className="text-gray-400 font-bold italic uppercase text-xs tracking-widest">Danh sách trống</p>
                  </div>
                )}
              </div>

            </div>
          </div>
        </main>
      </div>
    );
  };

  export default Quan_ly_danh_muc;