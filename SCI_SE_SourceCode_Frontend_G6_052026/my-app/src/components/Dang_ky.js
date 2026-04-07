import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { toast } from "react-toastify";

const Dang_ky = (props) => {
  const [ten_khach_hang, setName] = useState("");
  const [email, setEmail] = useState("");
  const [so_dien_thoai, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const payload = { ten_khach_hang, email, so_dien_thoai, address, password };
      const response = await api.post("khach-hang/dang-ky", payload);
      if (response.data?.status === true) {
        toast.success(response.data.message || "Đăng ký thành công ");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setPassword("");
        navigate("/dang-nhap");
      } else {
        toast.error(response.data?.message || "Đăng ký thất bại");
      }
    } catch (error) {
      console.error("Lỗi gọi API đăng ký:", error);
      if (error?.response?.status === 422 && error?.response?.data?.errors) {
        const fieldErrors = error.response.data.errors;
        const messages = Object.values(fieldErrors)
          .flat()
          .filter(Boolean)
          .join(" \n");
        setErrorMessage(messages || "Dữ liệu không hợp lệ.");
      } else {
        setErrorMessage(
          error?.response?.data?.message || "Lỗi máy chủ. Vui lòng thử lại sau."
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col justify-center items-center relative overflow-hidden">
      <button
        onClick={() => navigate("/")} 
        className="absolute top-6 left-6 flex items-center text-gray-600 hover:text-gray-900 transition font-medium z-20"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Quay lại
      </button>
      <div className="text-center mb-8 z-10">
        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3 shadow-sm">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Service Hub</h1>
        <p className="text-gray-500 text-sm mt-1">
          Bắt đầu hành trình của bạn ngay hôm nay
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md z-10">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">Đăng ký tài khoản</h2>
          <p className="text-sm text-gray-500 mt-1">
            Vui lòng điền thông tin để tiếp tục
          </p>
        </div>

        {errorMessage && (
          <div className="mb-3 rounded-md bg-red-100 text-red-700 px-3 py-2 text-sm">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-3 rounded-md bg-green-100 text-green-700 px-3 py-2 text-sm">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Họ và Tên</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input type="text" value={ten_khach_hang} onChange={(e) => setName(e.target.value)} placeholder="Nguyễn Văn A" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@servicehub.com" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Số điện thoại</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <input type="tel" value={so_dien_thoai} onChange={(e) => setPhone(e.target.value)} placeholder="0901 234 567" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Địa chỉ</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7a1 1 0 011-1h16a1 1 0 011 1v11a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v4m0 0h8m-8 0l4 4" />
                </svg>
              </span>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="123 Đường A, Quận B" className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Mật khẩu</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" required />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600">
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition duration-200 mt-4 flex justify-center items-center disabled:opacity-60">
            {isLoading ? "Đang xử lý..." : "Đăng ký ngay"}
          </button>
        </form>

        <div className="text-center mt-6 text-sm">
          <span className="text-gray-500">Đã có tài khoản? </span>
          <Link to="/dang-nhap" className="text-blue-500 font-semibold hover:underline">
            Đăng nhập
          </Link>
          <br />
          <span className="text-gray-500">Đăng kí trở thành Nhà Cung Cấp </span>
          <Link to="/dang-ky-ncc" className="text-blue-500 font-semibold hover:underline">
            Đăng kí ngay
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 w-full z-0 opacity-50 pointer-events-none">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
          <path fill="#dbeafe" fillOpacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Dang_ky;
