import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/ServicesPage';
import Dangnhap from './components/Dang_nhap';
import Dangky from './components/Dang_ky';
import Nha_Cung_Cap from './components/Nha_Cung_Cap';
import Dangkyncc from './components/Dang_ky_ncc';
import Quen_MK from './components/Quen_MK';
import Dich_vu from './components/Dich_vu';
import Chi_tiet_thuong_hieu from './components/Chi_tiet_thuong_hieu';
import Chi_tiet_dv from './components/Chi_tiet_dv';
import Dang_nhap_Admin from './components/Dang_nhap_Admin';;


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
        <Route path='chi-tiet' element={<Chi_tiet_dv />} />
        <Route path='chi-tiet-thuong-hieu' element={<Chi_tiet_thuong_hieu />} />
        <Route path='admin/dang-nhap' element={<Dang_nhap_Admin />} />

      </Routes>
    </App>
  </Router>
);
reportWebVitals();
