import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-col">
          <h4>ServiceHub</h4>
          <p>Nhà cung cấp dịch vụ uy tín cho cá nhân và doanh nghiệp Việt Nam.</p>
        </div>
        <div className="footer-col">
          <h4>Công ty</h4>
          <ul>
            <li>Về chúng tôi</li>
            <li>Đối tác</li>
            <li>Tuyển dụng</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Trung tâm trợ giúp</li>
            <li>Chính sách bảo mật</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Tải ứng dụng</h4>
          <div className="app-buttons">
            <button>App Store</button>
            <button>Google Play</button>
          </div>
        </div>
      </div>
      <div className="footer-note">© {new Date().getFullYear()} ServiceHub. Bản quyền thuộc về ServiceHub.</div>
    </footer>
  );
};

export default Footer;