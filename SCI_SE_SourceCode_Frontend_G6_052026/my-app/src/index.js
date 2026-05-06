import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/ServicesPage';
import Dangnhap from './components/Dang_nhap';
import Dangky from './components/Dang_ky';
import Nha_Cung_Cap from './components/nhacungcap/Nha_Cung_Cap';
import Dangkyncc from './components/nhacungcap/Dang_ky_ncc';
import Quen_MK from './components/Quen_MK';
import Dich_vu from './components/Dich_vu';
import Ho_so_thuong_hieu from './components/nhacungcap/Ho_so_thuong_hieu';
import Chi_tiet_dv from './components/Chi_tiet_dv';
import Dang_nhap_Admin from './components/admin/Dang_nhap_Admin';
import Quan_ly_nguoi_dung from './components/admin/Quan_ly_nguoi_dung';
import Quan_ly_danh_muc from './components/admin/Quan_ly_danh_muc';
import Dat_lich from './components/Khachhang/Dat_lich';
import Quan_ly_dich_vu from './components/nhacungcap/Quan_ly_dich_vu';
import Quan_ly_nhan_vien from './components/nhacungcap/Quan_ly_nhan_vien';
import Thanh_toan from './components/Khachhang/Thanh_toan';
import Lich_hen from './components/Khachhang/Lich_hen';
import Chi_tiet_lich_hen from './components/Khachhang/Chi_tiet_lich_hen';
import Quan_ly_ho_so from './components/Khachhang/Quan_ly_ho_so';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dich-vu' element={<Dich_vu />} />
        <Route path='dang-nhap' element={<Dangnhap />} />
        <Route path='dang-ky' element={<Dangky />} />
        <Route path='nha-cung-cap' element={<Nha_Cung_Cap />} />
        <Route path='dang-ky-ncc' element={<Dangkyncc />} />
        <Route path='quen-mat-khau' element={<Quen_MK />} />
        <Route path='chi-tiet/:id' element={<Chi_tiet_dv />} />
        <Route path='ho-so-thuong-hieu/:id' element={<Ho_so_thuong_hieu />} />
        <Route path='admin/dang-nhap' element={<Dang_nhap_Admin />} />
        <Route path='quan-ly-ho-so' element={<Quan_ly_ho_so />} />
        <Route path='admin/quan-ly-nguoi-dung' element={<Quan_ly_nguoi_dung />} />
        <Route path='admin/quan-ly-danh-muc' element={<Quan_ly_danh_muc />} />
        <Route path="dat-lich/:id_thuong_hieu/:id_dich_vu" element={<Dat_lich />} />
        <Route path="nha-cung-cap/quan-ly-dich-vu" element={<Quan_ly_dich_vu />} />
        <Route path="nha-cung-cap/quan-ly-nhan-vien" element={<Quan_ly_nhan_vien />} />
        <Route path="/thanh-toan/:id" element={<Thanh_toan />} />
        <Route path="/lich-hen" element={<Lich_hen />} />
        <Route path="chi-tiet-lich-hen/:id" element={<Chi_tiet_lich_hen />} />
        <Route path="quan-ly-ho-so" element={<Quan_ly_ho_so />} />
      </Routes>
    </App>
  </Router>
);
reportWebVitals();
