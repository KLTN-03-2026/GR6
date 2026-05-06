import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Bell, Calendar } from 'lucide-react';
import Dang_xuat from './Dang_xuat';
import api from '../api';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoggedIn(false);
        setUserData(null);
        return;
      }
      try {
        const res = await api.get('/khach-hang/thong-tin-ca-nhan', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.status) {
          setIsLoggedIn(true);
          const db = res.data.data;
          setUserData({
            name: db.ten_khach_hang || "Khách hàng",
            avatar: db.avatar || null
          });
        }
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
        }
      }
    };
    fetchUserData();
  }, [location]);

  // Logic tìm kiếm (giữ nguyên)
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
      const token = localStorage.getItem('token');
      await api.post('/khach-hang/dang-xuat', {}, { headers: { Authorization: `Bearer ${token}` } });
    } finally {
      localStorage.clear(); 
      setIsLoggedIn(false);
      setIsLogoutModalOpen(false);
      navigate('/dang-nhap');
    }
  };

  return (
    // QUAN TRỌNG: Thêm bg-white và z-50 để không bị nội dung dưới đè lên
    <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6 sticky top-0 z-50 w-full shadow-sm">
      
      {/* 1. Logo & Brand */}
      <div className="flex items-center gap-2 shrink-0 cursor-pointer" onClick={() => navigate('/')}>
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-200">
           <span className="text-white text-xl">🔷</span>
        </div>
        <span className="text-xl font-extrabold text-slate-800 tracking-tight">ServiceHub</span>
      </div>

      <div className="h-8 w-px bg-slate-200 mx-6 hidden md:block"></div>

      {/* 2. Thanh Tìm Kiếm (Nằm giữa) */}
      <div className="flex-1 flex justify-center px-4 relative">
        <div className="relative w-full max-w-lg group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
          <input
            type="text"
            placeholder="Tìm kiếm dịch vụ chăm sóc..."
            className="w-full pl-12 pr-4 py-2.5 bg-slate-100 border-none rounded-full text-sm focus:bg-white focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          {/* Kết quả tìm kiếm */}
          {keyword && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden z-[60]">
              {isSearching ? (
                <div className="px-4 py-4 text-sm text-slate-500 flex items-center gap-2">
                   <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div> Đang tìm...
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map(item => (
                  <div 
                    key={item.id} 
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex justify-between items-center border-b border-slate-50 last:border-none transition-colors"
                    onClick={() => { navigate(`/chi-tiet/${item.id}`); setKeyword(''); }}
                  >
                    <span className="text-sm font-semibold text-slate-700">{item.ten_dich_vu}</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-md">
                      {new Intl.NumberFormat('vi-VN').format(item.don_gia)}đ
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-4 text-sm text-slate-400 text-center">Không tìm thấy kết quả</div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3. Navigation & Actions (Bên phải) */}
      <div className="flex items-center gap-4">
        <nav className="hidden xl:flex items-center gap-6 mr-2">
          <Link className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors" to="/dich-vu">Dịch vụ</Link>
          <Link className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors" to="/lich-hen">Lịch hẹn</Link>
        </nav>

        {!isLoggedIn ? (
          <div className="flex gap-2 items-center">
            <button onClick={() => navigate('/dang-nhap')} className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-blue-600">Đăng nhập</button>
            <button onClick={() => navigate('/dang-ky')} className="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-full hover:bg-blue-700 shadow-md">Đăng ký</button>
          </div>
        ) : (
          <div className="flex items-center gap-3 group relative">
             <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
              <Bell size={20} strokeWidth={1.5} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 mx-1"></div>

            {/* Thông tin user giống hệt NCC */}
            <div className="flex items-center gap-3 pl-1 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-700 leading-none">{userData?.name}</p>
                <p className="text-[10px] text-blue-500 mt-1.5 uppercase font-extrabold tracking-widest">Khách hàng</p>
              </div>
              
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200 group-hover:ring-2 group-hover:ring-blue-500 transition-all">
                <img 
                  src={userData?.avatar == 0 || userData?.avatar === null ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix' : userData?.avatar} 
                  alt="avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Dropdown Menu chuẩn */}
            <div className="absolute right-0 top-full pt-2 w-56 hidden group-hover:block z-50 animate-in fade-in slide-in-from-top-1">
              <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 overflow-hidden">
                <div className="px-4 py-2 border-b border-slate-50 mb-1 sm:hidden">
                    <p className="text-sm font-bold text-slate-700">{userData?.name}</p>
                </div>
                <Link to="/quan-ly-ho-so" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <User size={16} className="text-slate-400" /> Tài khoản cá nhân
                </Link>
                <Link to="/lich-hen" className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition-colors">
                  <Calendar size={16} className="text-slate-400" /> Lịch hẹn của tôi
                </Link>
                <hr className="my-1.5 border-slate-100" />
                <button 
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors"
                >
                  <LogOut size={16} /> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Dang_xuat isOpen={isLogoutModalOpen} onClose={() => setIsLogoutModalOpen(false)} onConfirm={handleLogout} />
    </header>
  );
};

export default Header;