import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Calendar } from 'lucide-react';
import '../styles/Header.css';
import Dang_xuat from './Dang_xuat';
import api from '../api';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  //  SEARCH STATE
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const auth = localStorage.getItem('auth');

    if (token && auth) {
      setIsLoggedIn(true);
      try {
        setUserData(JSON.parse(auth));
      } catch {
        setUserData(null);
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

        if (res.data.status) {
          setSearchResults(res.data.data);
        }
      } catch (err) {
        console.error("Lỗi search:", err);
      } finally {
        setIsSearching(false);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [keyword]);
  const handleLogout = async () => {
    try {
      await api.post('khach-hang/dang-xuat', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      setIsLoggedIn(false);
      setIsLogoutModalOpen(false);
      navigate('/dang-nhap');
    }
  };

  return (
    <header className="header-container">
      <div className="header-brand">
        <Link className="brand-logo" to="/">🔷</Link>
        <Link className="brand-name" to="/">ServiceHub</Link>
      </div>

      {/*  SEARCH */}
      <div className="header-search">
        <Search className="search-icon" size={18} />

        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ..."
          className="search-input"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />

        {/* DROPDOWN */}
        {keyword && (
          <div className="search-dropdown">

            {isSearching ? (
              <div className="search-loading">Đang tìm...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map(item => (
                <div
                  key={item.id}
                  className="search-item"
                  onClick={() => {
                    navigate(`/chi-tiet/${item.id}`);
                    setKeyword('');
                  }}
                >
                  <img src={item.hinh_anh} alt="" />
                  <div>
                    <span className="search-name">{item.ten_dich_vu}</span>
                    <span className="search-price">
                      {new Intl.NumberFormat('vi-VN').format(item.don_gia)}đ
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="search-empty">Không tìm thấy</div>
            )}

          </div>
        )}
      </div>

      {/* NAV */}
      <nav className="header-nav">
        <Link className="nav-link" to="/dich-vu">Dịch vụ</Link>
        <Link className="nav-link" to="/booking">Lịch hẹn</Link>
        <Link className="nav-link" to="/offers">Ưu đãi</Link>
      </nav>

      {/* USER */}
      <div className="header-actions">
        {!isLoggedIn ? (
          <div className="flex gap-2">
            <Link className="btn-link" to="/dang-nhap">Đăng nhập</Link>
            <Link className="btn-primary" to="/dang-ky">Đăng ký</Link>
          </div>
        ) : (
          <div className="user-menu-container">
            <div className="user-info">
              <span className="user-name">{userData?.name}</span>
              <img
                src={userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'}
                className="user-avatar"
                alt=""
              />
            </div>

            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item"><User size={16}/> Cá nhân</Link>
              <Link to="/my-bookings" className="dropdown-item"><Calendar size={16}/> Lịch hẹn</Link>

              <button
                onClick={() => setIsLogoutModalOpen(true)}
                className="dropdown-item logout-btn"
              >
                <LogOut size={16}/> Đăng xuất
              </button>
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

export default Header;