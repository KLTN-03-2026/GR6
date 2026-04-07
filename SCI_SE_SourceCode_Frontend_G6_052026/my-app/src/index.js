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
import Dangkyncc from './components/Dang_ky_ncc';;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='dang-nhap' element={<Dangnhap />} />
        <Route path='dang-ky' element={<Dangky />} />
        <Route path='nha-cung-cap' element={<Nha_Cung_Cap />} />
        <Route path='dang-ky-ncc' element={<Dangkyncc />} />
      </Routes>
    </App>
  </Router>
);
reportWebVitals();
