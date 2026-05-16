import React, { useState, useEffect, useRef } from 'react';
import api from '../../api'; 
import { 
  Upload, 
  Lock, 
  User, 
  Phone, 
  Mail, 
  Loader2 
} from 'lucide-react';
import { toast } from 'react-toastify';

const Quan_ly_ho_so = () => {
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const fileInputRef = useRef(null);

  const [profile, setProfile] = useState({
    ten_khach_hang: '',
    email: '',
    so_dien_thoai: '',
    avatar: '', 
    password: '', // Trường mật khẩu mới
  });

  // 1. Lấy thông tin cá nhân khi load trang
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/khach-hang/thong-tin-ca-nhan');
      if (response.data.status) {
        setProfile({
          ...profile,
          ten_khach_hang: response.data.data.ten_khach_hang || '',
          email: response.data.data.email || '',
          so_dien_thoai: response.data.data.so_dien_thoai || '',
          avatar: response.data.data.avatar || '',
          password: '', // Không lấy mật khẩu cũ từ BE về
        });
      }
    } catch (error) {
      console.error("Lỗi fetch profile:", error);
      toast.error("Không thể tải thông tin hồ sơ");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  // 2. Xử lý chọn ảnh (Preview)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; 
      if (file.size > maxSize) {
        toast.error("Ảnh quá lớn! Vui lòng chọn ảnh dưới 5MB");
        return;
      }
      const objectUrl = URL.createObjectURL(file);
      setProfile(prev => ({ ...prev, avatar: objectUrl }));
    }
  };

  // 3. Gửi dữ liệu cập nhật
  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const formData = new FormData();
      formData.append('ten_khach_hang', profile.ten_khach_hang);
      formData.append('so_dien_thoai', profile.so_dien_thoai);
      formData.append('email', profile.email);
      if (profile.password) {
        formData.append('password', profile.password);
      }
      const file = fileInputRef.current.files[0];
      if (file) {
        formData.append('avatar', file);
      }

      const response = await api.post('/khach-hang/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status) {
        const authData = localStorage.getItem('auth');
        if (authData) {
          let auth = JSON.parse(authData);
          auth.name = profile.ten_khach_hang;
          if (response.data.new_avatar) {
            auth.avatar = response.data.new_avatar;
          }
          localStorage.setItem('auth', JSON.stringify(auth));
        }

        toast.success(response.data.message || "Cập nhật thành công!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
        } catch (error) {
        console.error("Lỗi cập nhật:", error);

        const errorData = error.response?.data;
        if (errorData?.errors) {
          Object.values(errorData.errors).forEach((messages) => {
            if (Array.isArray(messages)) {
              messages.forEach((msg) => toast.error(msg));
            } else {
              toast.error(messages);
            }
          });
        }
        else if (errorData?.message) {
          toast.error(errorData.message);
        }
        else {
          toast.error("Cập nhật thất bại. Vui lòng thử lại.");
        }
      } finally {
            setIsUpdating(false);
          }
        };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-500" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 font-sans text-[#1e293b]">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-[#0f172a]">Hồ sơ cá nhân</h1>
          <p className="text-sm text-[#64748b] mt-1">Thay đổi thông tin cơ bản và mật khẩu bảo mật.</p>
        </header>

        <div className="bg-white rounded-xl shadow-sm border border-[#e2e8f0] overflow-hidden">
          <div className="p-8">
            {/* Phần Ảnh đại diện */}
            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-[#f1f5f9]">
              <div className="w-24 h-24 bg-[#ffedd5] rounded-full flex items-center justify-center overflow-hidden border border-[#e2e8f0]">
                <img 
                  src={profile.avatar === "0" ? "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" : profile.avatar} 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-[#0f172a]">Ảnh đại diện</h3>
                <div className="flex gap-3">
                  <input 
                    type="file" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                  />
                  <button 
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="flex items-center gap-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-bold px-4 py-2 rounded-lg transition-all"
                  >
                    <Upload size={14} /> CHỌN ẢNH MỚI
                  </button>
                 <button 
                  type="button"
                  onClick={() => setProfile({ ...profile, avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' })}
                  disabled={!profile.avatar || profile.avatar === "0"}
                  className="
                    bg-[#f1f5f9] 
                    text-[#64748b] 
                    text-xs 
                    font-bold 
                    px-4 
                    py-2 
                    rounded-lg 
                    hover:bg-gray-200
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    disabled:hover:bg-[#f1f5f9]
                  "
                >
                  GỠ BỎ
                </button>
                </div>
                <p className="text-[10px] text-[#94a3b8] uppercase tracking-widest">JPG, PNG. Tối đa 5MB</p>
              </div>
            </div>

            {/* Các trường nhập liệu */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#64748b] uppercase flex items-center gap-2">
                  <User size={12} /> Họ và tên
                </label>
                <input 
                  name="ten_khach_hang"
                  value={profile.ten_khach_hang}
                  onChange={handleChange}
                  placeholder="Nhập họ tên"
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#64748b] uppercase flex items-center gap-2">
                  <Phone size={12} /> Số điện thoại
                </label>
                <input 
                  name="so_dien_thoai"
                  value={profile.so_dien_thoai}
                  onChange={handleChange}
                  placeholder="Nhập số điện thoại"
                  className="w-full px-4 py-2.5 border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#64748b] uppercase flex items-center gap-2">
                  <Mail size={12} /> Địa chỉ Email
                </label>
                <input 
                  name="email"
                  disabled
                  value={profile.email} 
                  onChange={handleChange}
                  placeholder="email@vidu.com"
                  className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-[#64748b] uppercase flex items-center gap-2 text-blue-600">
                  <Lock size={12} /> Mật khẩu mới
                </label>
                <div className="relative">
                  <input 
                    type="password"
                    name="password"
                    value={profile.password}
                    onChange={handleChange}
                    placeholder="Để trống nếu không đổi"
                    className="w-full px-4 py-2.5 border border-blue-100 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none bg-blue-50/30"
                  />
                </div>
                <p className="text-[10px] text-[#94a3b8]">Chỉ nhập khi bạn muốn thay đổi mật khẩu hiện tại.</p>
              </div>
            </div>
          </div>

          {/* Nút thao tác */}
          <div className="bg-[#f8fafc] border-t border-[#e2e8f0] p-6 flex justify-end gap-3">
            <button 
              type="button"
              onClick={fetchProfile} 
              className="px-6 py-2 text-sm font-bold text-[#64748b] hover:bg-gray-100 rounded-lg transition-colors"
            >
              HỦY BỎ
            </button>
            <button 
              type="button"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="flex items-center gap-2 px-8 py-2 bg-[#3b82f6] text-white text-sm font-bold rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
            >
              {isUpdating ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  ĐANG LƯU...
                </>
              ) : (
                "LƯU THAY ĐỔI"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quan_ly_ho_so;