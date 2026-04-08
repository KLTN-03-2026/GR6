import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Search, User, LogOut, Calendar, LayoutDashboard } from 'lucide-react';
import '../styles/Header.css';
import Dang_xuat from './Dang_xuat';
import api from '../api';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  
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
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
    } catch (error) {
      console.error("Lỗi server:", error);
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

      <div className="header-search">
        <Search className="search-icon" size={18} />
        <input type="text" placeholder="Tìm kiếm..." className="search-input" />
      </div>
        <nav className="header-nav">
        <Link className="nav-link" to="/services">Dịch vụ</Link>
        <Link className="nav-link" to="/booking">Lịch hẹn</Link>
        <Link className="nav-link" to="/offers">Ưu đãi</Link>
        </nav>
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
                className="user-avatar" alt="avatar" 
              />
            </div>

            <div className="user-dropdown">
              <Link to="/profile" className="dropdown-item"><User size={16}/> Cá nhân</Link>
              <Link to="/my-bookings" className="dropdown-item"><Calendar size={16}/> Lịch hẹn</Link>
              <div className="dropdown-divider"></div>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setIsLogoutModalOpen(true);
                }} 
                className="dropdown-item logout-btn"
              >
                <LogOut size={16} /> Đăng xuất
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