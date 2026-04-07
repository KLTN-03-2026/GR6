import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Calendar, LayoutDashboard, Settings } from 'lucide-react';
import '../styles/Header.css';
import axios from 'axios';
import api from '../api';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const auth = localStorage.getItem('auth');
    
    if (token && auth) {
      setIsLoggedIn(true);
      try {
        setUserData(JSON.parse(auth));
      } catch (error) {
        console.error("Lỗi giải mã dữ liệu auth:", error);
        setUserData(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserData(null);
    }
  }, [location]);

  const handleLogout = async () => {
    try {
      await api.post('khach-hang/dang-xuat', {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
    } catch (error) {
      console.error("Lỗi khi đăng xuất server:", error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('auth');
      
      setIsLoggedIn(false);
      setUserData(null);
      navigate('/dang-nhap');
    }
  };

  const isProvider = userData?.role === "nha_cung_cap";

  return (
    <header className="header-container">
      {/* Khối bên trái: Logo */}
      <div className="header-brand">
        <Link className="brand-logo" title="Trang chủ" to="/">🔷</Link>
        <Link className="brand-name" to="/">ServiceHub</Link>
      </div>

      {/* Thanh tìm kiếm */}
      <div className="header-search">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          placeholder="Tìm kiếm dịch vụ, spa, làm đẹp..."
          className="search-input"
        />
      </div>

      {/* Điều hướng chính */}
      <nav className="header-nav">
        <Link className="nav-link" to="/services">Dịch vụ</Link>
        <Link className="nav-link" to="/booking">Lịch hẹn</Link>
        <Link className="nav-link" to="/offers">Ưu đãi</Link>
      </nav>

      {/* Khối hành động / User Menu */}
      <div className="header-actions">
        {!isLoggedIn ? (
          <>
            <Link className="btn-link" to="/dang-nhap">Đăng nhập</Link>
            <Link className="btn-primary" to="/dang-ky">Đăng ký</Link>
          </>
        ) : (
          <div className="user-menu-container">
            <div className="user-info">
              <span className="user-name">{userData?.name || 'Người dùng'}</span>
              <img 
                src={userData?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix'} 
                alt="Avatar" 
                className="user-avatar" 
              />
            </div>

            <div className="user-dropdown">
              {/* Mục chung cho tất cả user */}
              <Link to="/profile" className="dropdown-item">
                <User size={16} />
                Thông tin cá nhân
              </Link>

              {/* Mục riêng cho Nhà cung cấp */}
              {isProvider && (
                <Link to="/nha-cung-cap" className="dropdown-item provider-highlight">
                  <LayoutDashboard size={16} />
                  Quản lý nhà cung cấp
                </Link>
              )}

              <Link to="/my-bookings" className="dropdown-item">
                <Calendar size={16} />
                Lịch hẹn của tôi
              </Link>

              <div className="dropdown-divider"></div>
              
              <button onClick={handleLogout} className="dropdown-item logout-btn">
                <LogOut size={16} />
                Đăng xuất
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;