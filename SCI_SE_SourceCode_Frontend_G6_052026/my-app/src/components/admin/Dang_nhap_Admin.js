import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../../api';
import { toast } from "react-toastify";

const Dang_nhap_Admin = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("admin/dang-nhap", { 
        
        username, 
        password 
      });
      console.log("Admin login successful:", response.data); 
      if (response.data && response.data.admin_access_token) { 
        localStorage.setItem("admin_token", response.data.admin_access_token);
        const adminAuth = {
          username: response.data.username || username,
          role: "admin",
          id: response.data.id
        };
        localStorage.setItem("admin_auth", JSON.stringify(adminAuth));

        toast.success("Xác thực quản trị viên thành công!");
        navigate("/admin/quan-ly-nguoi-dung"); 
      } else {
        toast.error(response.data?.message || "Tài khoản không có quyền truy cập");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Sai Username hoặc Mật khẩu";
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center p-4">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">ADMIN LOGIN</h1>
            <p className="text-slate-400 mt-2 text-sm uppercase tracking-widest">Hệ thống quản trị nội bộ</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Input Username */}
            <div>
              <label className="block text-slate-300 text-xs font-bold mb-2 uppercase">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                placeholder="Nhập tên đăng nhập..."
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-slate-300 text-xs font-bold mb-2 uppercase">Mật mã</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  {showPassword ? "Ẩn" : "Hiện"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
            >
              {isLoading ? "ĐANG KIỂM TRA..." : "ĐĂNG NHẬP NGAY"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <button 
              onClick={() => navigate("/")}
              className="text-slate-500 text-sm hover:text-slate-300 transition-colors"
            >
              &larr; Quay lại trang giao diện chính
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dang_nhap_Admin;