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
    const token = localStorage.getItem('token') || localStorage.getItem('admin_access_token');
    const authRaw = localStorage.getItem('auth') || localStorage.getItem('admin_auth');

    if (token && authRaw) {
      setIsLoggedIn(true);
      try {
        const parsed = JSON.parse(authRaw);
        setUserData({
          ...parsed,
          name: parsed.username || parsed.name || "Người dùng",
          avatar: parsed.avatar || null
        });
      } catch (err) {
        setUserData({ name: "Nhà cung cấp" });
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
      await api.post('/nha-cung-cap/dang-xuat', {}, {
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
        <div className="relative w-full max-w-2xl">
          {isSearching ? (
            <Loader2 className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 animate-spin" size={18} />
          ) : (
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          )}
          <input 
            type="text" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Tìm kiếm dịch vụ, liệu trình..." 
            className="w-full pl-12 pr-4 py-2.5 bg-[#f1f5f9] border-none rounded-full text-sm placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 outline-none"
          />

          {keyword && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-[60]">
              {isSearching ? (
                <div className="px-4 py-3 text-sm text-slate-500">Đang tìm...</div>
              ) : searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div 
                    key={item.id} 
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer flex justify-between items-center border-b border-slate-50 last:border-none"
                    onClick={() => {
                      navigate(`/chi-tiet/${item.id}`);
                      setKeyword('');
                    }}
                  >
                    <span className="text-sm text-slate-700">{item.ten_dich_vu}</span>
                    <span className="text-xs font-semibold text-blue-600">
                      {new Intl.NumberFormat('vi-VN').format(item.don_gia)}đ
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-slate-500">Không tìm thấy kết quả</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell size={20} strokeWidth={1.5} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 mx-1"></div>

        {!isLoggedIn ? (
          <div className="flex gap-2">
            <button onClick={() => navigate('/dang-nhap')} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-blue-600">Đăng nhập</button>
            <button onClick={() => navigate('/dang-ky')} className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700">Đăng ký</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 pl-2 group relative">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-slate-700 leading-none">{userData?.name}</p>
              <p className="text-[11px] text-slate-400 mt-1 uppercase font-medium tracking-wider">Tài khoản</p>
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
                {/* CHUYỂN PHẦN ADMIN SANG ĐÂY */}
                {localStorage.getItem('admin_access_token') && (
                  <Link to="/admin/quan-ly-danh-muc" className="flex items-center gap-2 px-4 py-2 text-sm text-blue-600 font-bold hover:bg-blue-50">
                    <Settings size={16} /> Quản trị hệ thống
                  </Link>
                )}
                
                <Link to="/nha-cung-cap/ho-so-thuong-hieu" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                  <User size={16} /> Chi tiết thương hiệu
                </Link>
                
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