import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Camera, 
  Plus, 
  Building2, 
  Store, 
  Phone, 
  FileText, 
  Mail, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  CreditCard,
  Send,
  Landmark,
  Loader2,
  ListFilter
} from 'lucide-react';
import api from '../../api';
import { toast } from 'react-toastify';

const DangKyNhaCungCap = () => {
  const navigate = useNavigate();
  
  // States cho giao diện
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // States cho dữ liệu API
  const [banks, setBanks] = useState([]);
  const [categories, setCategories] = useState([]);
  
  // States cho file và preview
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  
  const [formData, setFormData] = useState({
    providerName: "",
    brandName: "",
    phone: "",
    taxCode: "",
    email: "",
    bankBin: "", 
    bankAccount: "",
    address: "",
    categoryId: "", 
    password: "",
    confirmPassword: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách ngân hàng
        const bankRes = await fetch("https://api.vietqr.io/v2/banks");
        const bankData = await bankRes.json();
        if (bankData.code === "00") setBanks(bankData.data);
        const cateRes = await api.get('/danh-muc/get-data');
        if (cateRes.data && cateRes.data.status) {
          const allData = cateRes.data.data;
          const filtered = allData.filter(item => item.id_father !== 0);
          setCategories(filtered);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu:", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ảnh phải nhỏ hơn 5MB!");
      return;
    }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      return;
    }

    setIsLoading(true);
    try {
      const data = new FormData();
      data.append("ten_nha_cung_cap", formData.providerName);
      data.append("ten_thuong_hieu", formData.brandName);
      data.append("so_dien_thoai", formData.phone);
      data.append("ma_so_thue", formData.taxCode);
      data.append("email", formData.email);
      data.append("ma_bin_ngan_hang", formData.bankBin); // Gửi mã BIN
      data.append("tai_khoan_ngan_hang", formData.bankAccount);
      data.append("dia_chi", formData.address);
      data.append("id_danh_muc_dich_vu", formData.categoryId); 
      data.append("password", formData.password);
      if (avatarFile) data.append("logo", avatarFile);

      const res = await api.post("nha-cung-cap/dang-ky", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      if (res.data?.status) {
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email.");
        navigate("/dang-nhap");
      } else {
        setErrorMessage(res.data?.message || "Đăng ký thất bại.");
      }
    } catch (err) {
      const msg = err.response?.data?.errors 
        ? Object.values(err.response.data.errors).flat().join(", ")
        : "Lỗi kết nối server!";
      setErrorMessage(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center py-10 px-4 font-sans relative overflow-x-hidden">
      
      <div className="w-full max-w-4xl mb-6 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors text-sm font-medium">
          <ArrowLeft size={18} /> Quay lại
        </button>
      </div>

      <div className="text-center mb-8 z-10">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-200">
          <svg viewBox="0 0 24 24" className="text-white w-7 h-7 fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-[#1E293B] mb-2 tracking-tight">Service Hub</h1>
        <p className="text-slate-500 text-sm max-w-xs mx-auto leading-relaxed">
          Trở thành đối tác cung cấp dịch vụ chuyên nghiệp ngay hôm nay.
        </p>
      </div>

      <div className="w-full max-w-3xl bg-white rounded-[40px] shadow-sm border border-slate-100 p-10 mb-10 z-10">
        <h2 className="text-2xl font-bold text-center text-[#1E293B] mb-10">Đăng ký Nhà Cung Cấp</h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center mb-12">
            <div className="relative group">
              <div className="w-28 h-28 rounded-full border-2 border-dashed border-slate-200 flex items-center justify-center bg-slate-50 overflow-hidden transition-all group-hover:border-blue-400">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <Camera size={32} className="text-slate-300" />
                )}
              </div>
              <label className="absolute bottom-1 right-1 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-md hover:bg-blue-700 transition-all border-4 border-white">
                <Plus size={18} />
                <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
              </label>
            </div>
            <p className="text-[11px] text-slate-400 mt-4 uppercase tracking-wider font-semibold">Logo / Ảnh đại diện (&lt;5MB)</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-left">
            {/* Tên nhà cung cấp */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tên nhà cung cấp</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="providerName" value={formData.providerName} onChange={handleChange} type="text" placeholder="Tên pháp nhân" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Tên thương hiệu */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Tên thương hiệu</label>
              <div className="relative">
                <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="brandName" value={formData.brandName} onChange={handleChange} type="text" placeholder="Tên hiển thị ứng dụng" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Danh mục dịch vụ */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Danh mục dịch vụ</label>
              <div className="relative">
                <ListFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select name="categoryId" value={formData.categoryId} onChange={handleChange} required className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none text-slate-600">
                  <option value="">Chọn lĩnh vực</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.ten_dich_vu}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Số điện thoại</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="Số điện thoại liên hệ" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="email" value={formData.email} onChange={handleChange} type="email" placeholder="email@congty.com" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Mã số thuế */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mã số thuế</label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="taxCode" value={formData.taxCode} onChange={handleChange} type="text" placeholder="Nhập mã số thuế" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Ngân hàng */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Ngân hàng</label>
              <div className="relative">
                <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select name="bankBin" value={formData.bankBin} onChange={handleChange} required className="w-full pl-12 pr-10 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none appearance-none text-slate-600">
                  <option value="">Chọn ngân hàng</option>
                  {banks.map(bank => (
                    <option key={bank.id} value={bank.bin}>{bank.shortName} - {bank.name}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            {/* Số tài khoản */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Số tài khoản</label>
              <div className="relative">
                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="bankAccount" value={formData.bankAccount} onChange={handleChange} type="text" placeholder="Số tài khoản ngân hàng" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>

            {/* Mật khẩu */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="password" value={formData.password} onChange={handleChange} type={showPassword ? "text" : "password"} placeholder="••••••••" required className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Nhập lại mật khẩu */}
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} type={showConfirmPassword ? "text" : "password"} placeholder="••••••••" required className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Địa chỉ văn phòng</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input name="address" value={formData.address} onChange={handleChange} type="text" placeholder="Địa chỉ trụ sở chính" required className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none" />
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-xs rounded-2xl text-center font-medium animate-pulse">
              {errorMessage}
            </div>
          )}

          <div className="pt-10">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 rounded-[20px] font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader2 className="animate-spin" size={20} /> : <>Gửi hồ sơ đăng ký <Send size={18} /></>}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Đã có tài khoản? <Link to="/dang-nhap" className="text-blue-600 hover:underline font-bold">Đăng nhập ngay</Link>
          </p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8 z-10">
        {['ĐIỀU KHOẢN DỊCH VỤ', 'CHÍNH SÁCH BẢO MẬT', 'TRUNG TÂM BẢO MẬT'].map((link) => (
          <button key={link} className="text-[10px] font-bold text-slate-400 hover:text-slate-600 tracking-widest transition-colors uppercase">
            {link}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-slate-400 font-medium tracking-wide z-10">© 2024 Service Hub. All rights reserved.</p>
    </div>
  );
};

export default DangKyNhaCungCap;