import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, Bell, Settings, User, LogOut, Loader2 } from 'lucide-react';
import api from '../../api'; 
import Dang_xuat from './../Dang_xuat'; 

const HeaderNCC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 1. Kiểm tra cả 2 loại token (User thường hoặc Admin)
    const userToken = localStorage.getItem('token');
    const adminToken = localStorage.getItem('admin_access_token');
    const token = userToken || adminToken;

    // 2. Kiểm tra cả 2 loại dữ liệu auth
    const userAuthRaw = localStorage.getItem('auth');
    const adminAuthRaw = localStorage.getItem('admin_auth');
    const authRaw = userAuthRaw || adminAuthRaw;

    if (token && authRaw) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(authRaw);
        // Ưu tiên các trường dữ liệu phổ biến từ API trả về cho cả Admin và NCC
        setUserData({
          ...parsed,
          name: parsed.username || parsed.name || parsed.ten_quan_tri || "Quản trị viên",
          avatar: parsed.avatar || parsed.hinh_anh || null
        });
      } catch (err) {
        setUserData({ name: adminToken ? "Quản trị viên" : "Người dùng" });
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [location]);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!keyword.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        setIsSearching(true);
        const res = await api.post(`/tim-kiem-dich-vu/${keyword}`);
        if (res.data.status) setSearchResults(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsSearching(false);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [keyword]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token') || localStorage.getItem('admin_access_token');
      // Tùy chọn: Gọi đúng endpoint logout của admin nếu cần
      const logoutUrl = localStorage.getItem('admin_access_token') 
        ? '/admin/dang-xuat' 
        : '/nha-cung-cap/dang-xuat';
        
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
      <div className="w-64 flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <svg viewBox="0 0 24 24" className="text-white w-5 h-5 fill-current">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
        </div>
        <span className="text-xl font-bold text-[#1e293b]">ServiceHub</span>
      </div>

      <div className="h-full w-px bg-slate-100 mx-2"></div>

      <div className="flex-1 flex justify-center px-8 relative">
        
      </div>

      <div className="flex items-center gap-4 shrink-0">
        

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {/* CẢI TIẾN: isLoggedIn sẽ đúng cho cả Admin và User */}
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
                {localStorage.getItem('admin_access_token') ? 'Quản trị viên' : 'Tài khoản'}
              </p>
            </div>
            
            <div className="w-10 h-10 rounded-full overflow-hidden border border-slate-200 cursor-pointer ring-offset-2 group-hover:ring-2 ring-blue-500 transition-all">
              <img 
                src={userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                alt="avatar" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute right-0 top-full pt-2 w-52 hidden group-hover:block z-50">
              <div className="bg-white border border-slate-200 rounded-xl shadow-lg py-1 overflow-hidden">
                {localStorage.getItem('admin_access_token') && (
                  <Link to="/admin/quan-ly-danh-muc" className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50">
                    <Settings size={16} /> Quản trị hệ thống
                  </Link>
                )}
                
                {/* Chỉ hiện chi tiết thương hiệu nếu không phải admin (hoặc hiện cả hai tùy bạn) */}
                {!localStorage.getItem('admin_access_token') && (
                  <Link to="/nha-cung-cap/ho-so-thuong-hieu" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    <User size={16} /> Chi tiết thương hiệu
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