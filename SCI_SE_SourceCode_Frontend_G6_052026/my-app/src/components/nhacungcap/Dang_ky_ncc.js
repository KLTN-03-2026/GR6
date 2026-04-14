import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Box,
  Camera,
  Building2,
  Phone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Send,
  Plus,
  Loader2,
} from "lucide-react";
import api from "../../api";
import { toast } from "react-toastify";

const Dang_ky_ncc = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    providerName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Dọn dẹp bộ nhớ khi URL preview thay đổi hoặc component unmount
  useEffect(() => {
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
  }, [avatarPreview]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Chỉ được upload ảnh!");
      return;
    }

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
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Mật khẩu xác nhận không khớp!");
      setIsLoading(false);
      return;
    }

    try {
      const form = new FormData();
      form.append("ten_nha_cung_cap", formData.providerName);
      form.append("email", formData.email);
      form.append("so_dien_thoai", formData.phone);
      form.append("password", formData.password);

      if (avatarFile) {
        form.append("avatar", avatarFile);
      }

      const res = await api.post("nha-cung-cap/dang-ky", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data?.status === true) {
        toast.success("Đăng ký thành công ");
        navigate("/dang-nhap");
      } else {
        toast.error(res.data?.message || "Đăng ký thất bại");
      }
    } catch (err) {
      if (err?.response?.status === 422) {
        const errors = err.response.data.errors;
        const msg = Object.values(errors).flat().join("\n");
        setErrorMessage(msg);
      } else {
        setErrorMessage("Lỗi kết nối server, vui lòng thử lại sau");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Nút Quay lại */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors z-20"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium text-sm">Quay lại</span>
      </button>

      {/* Hiệu ứng sóng trang trí */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 z-0 pointer-events-none opacity-50">
        <svg
          viewBox="0 0 1440 320"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            fill="#dbeafe"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="flex flex-col items-center z-10 w-full max-w-md my-10">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-4 shadow-lg shadow-blue-200">
            <Box className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Service Hub</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xs">
            Bắt đầu hành trình cung cấp dịch vụ chuyên nghiệp của bạn.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-3xl shadow-2xl w-full border border-gray-100"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-8 text-center">
            Đăng ký Nhà Cung Cấp
          </h2>

          {/* Vùng chọn ảnh đại diện */}
          <div className="flex flex-col items-center mb-8 relative">
            <label htmlFor="avatar-upload" className="relative cursor-pointer group">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all overflow-hidden shadow-inner">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera className="w-8 h-8 text-gray-400 group-hover:text-blue-400" />
                )}
              </div>
              <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-1.5 text-white shadow-lg ring-2 ring-white transition-transform group-active:scale-90">
                <Plus className="w-4 h-4" />
              </div>
              <input
                id="avatar-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleAvatarChange}
              />
            </label>
            <p className="text-xs text-gray-400 mt-3 font-medium">
              Tải lên Logo hoặc Ảnh đại diện
            </p>
          </div>

          <div className="space-y-5">
            {/* Tên nhà cung cấp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên nhà cung cấp
              </label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  name="providerName"
                  value={formData.providerName}
                  onChange={handleChange}
                  placeholder="Tên doanh nghiệp / cá nhân"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Số điện thoại */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="0xxx xxx xxx"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email doanh nghiệp
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Nhập lại mật khẩu */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu"
                  required
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Hiển thị thông báo lỗi từ Server */}
          {errorMessage && (
            <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-lg whitespace-pre-line text-center">
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-3 mt-8 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98] transition-all shadow-lg shadow-blue-200"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Gửi hồ sơ đăng ký</span>
                <Send className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="text-center mt-6 text-sm text-gray-600">
            <span>Đã có tài khoản? </span>
            <button
              type="button"
              onClick={() => navigate("/dang-nhap")}
              className="text-blue-600 font-semibold hover:underline bg-transparent"
            >
              Đăng nhập ngay
            </button>
          </div>
        </form>

        <div className="w-full text-center text-xs text-gray-400 mt-10 flex flex-col gap-2">
          <div className="flex items-center justify-center gap-5">
            <a href="#" className="hover:text-gray-600 transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-gray-600 transition-colors">Hỗ trợ</a>
          </div>
          <p>© 2024 Service Hub. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Dang_ky_ncc;