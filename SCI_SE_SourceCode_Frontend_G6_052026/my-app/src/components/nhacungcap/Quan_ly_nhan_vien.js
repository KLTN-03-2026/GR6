import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Calendar, Users, ClipboardList, 
  BarChart3, Settings, LogOut, Trash2, RefreshCcw, UserPlus, X, Upload, AlertTriangle,Briefcase
} from 'lucide-react';
import api from '../../api';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import Menu from './Menu';


const Quan_ly_nhan_vien = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  
  // State mới cho việc xóa
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  // Khởi tạo form
  const initialForm = {
    id: '', 
    id_thuong_hieu: '', 
    ten_nhan_vien: '',
    mo_ta_ngan: '',
    hinh_anh: null,
  };

  const [formData, setFormData] = useState(initialForm);

  const loadEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('thuong-hieu/nhan-vien/get-data');
      if (res.data.status) {
        setEmployees(res.data.data);
      }
    } catch (err) {
      console.error("Lỗi tải danh sách:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, hinh_anh: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };
  const handleOpenAdd = () => {
    setIsEditMode(false);
    setPreviewImage(null);
    
    const defaultBrandId = employees.length > 0 ? employees[0].id_thuong_hieu : '';

    setFormData({
      ...initialForm,
      id_thuong_hieu: defaultBrandId
    });
    setIsModalOpen(true);
  };

  const openEditModal = (emp) => {
    setIsEditMode(true);
    setFormData({
      id: emp.id,
      id_thuong_hieu: emp.id_thuong_hieu, 
      ten_nhan_vien: emp.ten_nhan_vien,
      mo_ta_ngan: emp.mo_ta_ngan || '',
      hinh_anh: null 
    });
    setPreviewImage(emp.hinh_anh);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('ten_nhan_vien', formData.ten_nhan_vien);
    data.append('mo_ta_ngan', formData.mo_ta_ngan);
    data.append('id_thuong_hieu', formData.id_thuong_hieu); 

    if (formData.hinh_anh) {
      data.append('hinh_anh', formData.hinh_anh);
    }
    
    if (isEditMode) {
      data.append('id', formData.id);
    }

    try {
      const url = isEditMode ? 'thuong-hieu/nhan-vien/update' : 'thuong-hieu/nhan-vien/them-moi';
      const res = await api.post(url, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data.status) {
        setIsModalOpen(false);
        loadEmployees();
        toast.success(isEditMode ? "Cập nhật nhân viên thành công!" : "Thêm nhân viên thành công!");
      }
    } catch (err) {
      console.error("Lỗi lưu nhân viên:", err);
      toast.error("Lỗi khi lưu nhân viên. Vui lòng thử lại.");
    }
  };

  // Cập nhật hàm handleDelete để mở Modal
  const handleDelete = (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };

  // Hàm thực hiện xóa thực tế
  const confirmDelete = async () => {
    try {
      const res = await api.post(`thuong-hieu/nhan-vien/delete/${deleteId}`);
      if (res.data.status) {
        setEmployees(employees.filter(emp => emp.id !== deleteId));
        toast.success("Xóa nhân viên thành công!");
      }
    } catch (err) {
      toast.error("Lỗi khi xóa nhân viên. Vui lòng thử lại.");
    } finally {
      setIsDeleteModalOpen(false);
      setDeleteId(null);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const res = await api.post(`thuong-hieu/nhan-vien/update-status/${id}`);
      if (res.data.status) {
        setEmployees(employees.map(emp => 
          emp.id === id ? { ...emp, trang_thai_lam_viec: !emp.trang_thai_lam_viec } : emp
        ));
        toast.success("Cập nhật trạng thái thành công!");
      }
    } catch (err) {
      toast.error("Lỗi khi cập nhật trạng thái. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8F9FD] font-sans text-[#1E293B]">
      {/* Sidebar */}
      <Menu />

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Quản lý nhân viên</h2>
              <p className="text-[#64748B] text-base">Quản lý đội ngũ kỹ thuật viên của bạn.</p>
            </div>
            <button 
              onClick={handleOpenAdd}
              className="bg-[#3D31C2] text-white px-8 py-3.5 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:scale-[1.02] transition-all"
            >
              <UserPlus size={20}/> Thêm nhân viên
            </button>
          </div>

          <div className="bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-50 text-[#94A3B8] text-[11px] font-bold uppercase tracking-wider">
                  <th className="px-8 py-6 text-left">Nhân viên</th>
                  <th className="px-8 py-6 text-center">Trạng thái</th>
                  <th className="px-8 py-6 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr><td colSpan="3" className="py-20 text-center text-slate-400">Đang tải danh sách...</td></tr>
                ) : employees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <img src={emp.hinh_anh} className="w-12 h-12 rounded-2xl bg-slate-100 object-cover" alt="" />
                        <div>
                          <p className="font-bold text-[15px]">{emp.ten_nhan_vien}</p>
                          <p className="text-[12px] text-slate-400 italic">{emp.mo_ta_ngan || "Không có mô tả"}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <button 
                        onClick={() => handleStatusChange(emp.id)}
                        className={`mx-auto flex items-center gap-2 px-4 py-2 rounded-2xl w-fit transition-all ${
                          emp.trang_thai_lam_viec ? 'bg-[#F0FDF4] text-[#10B981]' : 'bg-red-50 text-red-400'
                        }`}
                      >
                        <span className="text-[12px] font-bold">{emp.trang_thai_lam_viec ? "Đang làm việc" : "Đang nghỉ"}</span>
                      </button>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <div className="flex justify-center gap-2">
                        <button onClick={() => openEditModal(emp)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl">
                          <RefreshCcw size={18}/>
                        </button>
                        <button onClick={() => handleDelete(emp.id)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl">
                          <Trash2 size={18}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Modal Thêm/Sửa */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-lg relative shadow-2xl overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center">
              <h2 className="text-xl font-bold">{isEditMode ? 'Cập nhật nhân viên' : 'Thêm nhân viên mới'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full text-slate-400"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Họ và tên</label>
                <input 
                  name="ten_nhan_vien" 
                  value={formData.ten_nhan_vien} 
                  onChange={handleInputChange} 
                  required 
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Nhập tên nhân viên..." 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Mô tả ngắn</label>
                <input 
                  name="mo_ta_ngan" 
                  value={formData.mo_ta_ngan} 
                  onChange={handleInputChange} 
                  className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 outline-none focus:ring-2 focus:ring-indigo-500" 
                  placeholder="Ví dụ: Kỹ thuật viên chuyên nghiệp..." 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#94A3B8] uppercase mb-2">Ảnh đại diện</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden relative">
                    {previewImage ? <img src={previewImage} className="w-full h-full object-cover" alt="" /> : <Upload className="text-slate-300" />}
                    <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                  </div>
                  <p className="text-[11px] text-[#94A3B8]">Nhấp để tải ảnh (JPG, PNG)</p>
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl font-bold text-[#64748B] hover:bg-slate-50">Hủy</button>
                <button type="submit" className="flex-1 py-4 bg-[#3D31C2] text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all">
                  {isEditMode ? 'Lưu thay đổi' : 'Xác nhận thêm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsDeleteModalOpen(false)}></div>
          <div className="bg-white rounded-[32px] w-full max-w-md relative shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="text-red-500" size={40} />
              </div>
              <h2 className="text-2xl font-bold mb-3">Xác nhận xóa</h2>
              <p className="text-slate-500 mb-8">
                Bạn có chắc chắn muốn xóa nhân viên này? <br/> Hành động này không thể hoàn tác.
              </p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsDeleteModalOpen(false)} 
                  className="flex-1 py-4 rounded-2xl font-bold text-[#64748B] hover:bg-slate-50 transition-colors"
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

export default Quan_ly_nhan_vien;