import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Settings, User, LogOut } from 'lucide-react';
import api from '../../api'; 
import Dang_xuat from './../Dang_xuat'; 

const HeaderNCC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [role, setRole] = useState(null); // 'admin' hoặc 'ncc'

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userAuthRaw = localStorage.getItem('auth');

    if (token && userAuthRaw) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(userAuthRaw);
        
        // GIẢ ĐỊNH: API của bạn trả về field 'role' hoặc 'role_id'
        // Bạn hãy thay đổi điều kiện này phù hợp với dữ liệu thực tế của bạn
        // Ví dụ: parsed.role === 1 là Admin, 2 là NCC
        const userRole = parsed.role === "admin" ? "admin" : "nha_cung_cap";
        setRole(userRole);

        setUserData({
          ...parsed,
          name: parsed.username || parsed.name || parsed.ten_quan_tri || "Người dùng",
          avatar: parsed.avatar || parsed.hinh_anh || null
        });
      } catch (err) {
        console.error("Lỗi parse auth:", err);
        setRole(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
      setRole(null);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      // Gọi đúng endpoint dựa trên role đã xác định
      const logoutUrl = role === 'admin' ? '/admin/dang-xuat' : '/nha-cung-cap/dang-xuat';
        
      await api.post(logoutUrl, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.clear(); 
      setIsLoggedIn(false);
      setIsLogoutModalOpen(false);
      setUserData(null);
      navigate('/dang-nhap');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-50">
      {/* Logo & Name */}
      <div className="w-64 flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="text-white w-5 h-5 fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="text-xl font-bold text-[#1e293b]">ServiceHub</span>
      </div>

      <div className="flex-1"></div>

      <div className="flex items-center gap-4 shrink-0">
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <button onClick={() => navigate('/dang-nhap')} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600">Đăng nhập</button>
            <button onClick={() => navigate('/dang-ky')} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Đăng ký</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 pl-2 group relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 leading-none">{userData?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1 uppercase font-medium tracking-wider">
                {role === 'admin' ? 'Quản trị viên' : 'Nhà cung cấp'}
              </p>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 cursor-pointer ring-offset-2 group-hover:ring-2 ring-blue-500 transition-all">
              <img 
                src={userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                alt="avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Dropdown Menu */}
            <div className="absolute right-0 top-full pt-2 w-52 hidden group-hover:block z-50">
              <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1 overflow-hidden">
                
                {/* MENU CHO ADMIN */}
                {role === 'admin' && (
                  <Link to="/admin/thong-ke-he-thong" className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50">
                    <Settings size={16} /> Quản trị hệ thống
                  </Link>
                )}
                
                {/* MENU CHO NHÀ CUNG CẤP */}
                {role === 'nha_cung_cap' && (
                  <Link to="/nha-cung-cap/ho-so-thuong-hieu" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User size={16} /> Hồ sơ thương hiệu
                  </Link>
                )}
                
                <hr className="my-1 border-slate-100" />
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dang_xuat 
        isOpen={isLogoutModalOpen} 
        onClose={() => setIsLogoutModalOpen(false)} 
        onConfirm={handleLogout} 
      />
    </header>
  );
};

export default HeaderNCC;