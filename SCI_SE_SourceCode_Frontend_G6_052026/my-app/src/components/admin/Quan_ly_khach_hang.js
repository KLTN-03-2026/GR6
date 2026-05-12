import React, { useState, useEffect } from 'react';
import { 
  Users, UserCheck, UserPlus, UserX, 
  FileText, Settings, LayoutDashboard, List, 
  HelpCircle, LogOut, Download, Check, X, ChevronLeft, ChevronRight, 
  Menu
} from 'lucide-react';
import { Link } from "react-router-dom";
import api, { 
  getCustomers, getCustomerStats, blockCustomer
} from "../../api/index";
import MenuAd from './MenuAd';

const Quan_ly_khach_hang = () => {
  const [dataList, setDataList] = useState([]);
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resData, resStats] = await Promise.all([getCustomers(), getCustomerStats()]);
      if (resData.data.status) setDataList(resData.data.data);
      if (resStats.data.status) setStatsData(resStats.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleBlock = async (id) => {
    const originalList = [...dataList];
    const updatedList = dataList.map(u => u.id === id ? { ...u, is_blocked: u.is_blocked === 1 ? 0 : 1 } : u);
    setDataList(updatedList);

    try {
      const res = await blockCustomer(id);
      if (!res.data.status) {
        setDataList(originalList);
      } else {
        const resStats = await getCustomerStats();
        if (resStats.data.status) setStatsData(resStats.data.data);
      }
    } catch (error) {
      setDataList(originalList);
    }
  };

  const stats = [
    { 
      label: "TỔNG KHÁCH HÀNG", 
      value: statsData?.tong_so_khach_hang || 0
    },
    { 
      label: "ĐANG HOẠT ĐỘNG", 
      value: statsData?.khach_hang_da_active || 0
    },
    { 
      label: "MỚI TRONG THÁNG", 
      value: statsData?.khach_hang_moi_trong_thang || 0
    },
    { 
      label: "TÀI KHOẢN BỊ KHÓA", 
      value: statsData?.khach_hang_block || 0
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <MenuAd />

      <main className="flex-grow p-8 overflow-y-auto">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-2">Quản lý khách hàng</h1>
            <p className="text-gray-500 text-sm">Xem và điều chỉnh quyền truy cập của các thành viên trong hệ thống.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          {stats.map((s, i) => (
            <div key={i} className={`${s.color} p-6 rounded-3xl ${s.border ? 'border border-gray-100' : 'shadow-lg shadow-blue-100'} flex flex-col justify-between h-36`}>
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{s.label}</span>
                {s.icon && <div className="p-2 bg-blue-50/50 rounded-lg">{s.icon}</div>}
              </div>
              <div className="flex items-baseline gap-3">
                
                <span
                  className={`text-3xl font-black 
                  ${i === 0 ? 'text-blue-600' : ''}
                  ${i === 3 ? 'text-red-500' : ''}
                  ${i !== 0 && i !== 3 ? 'text-gray-900' : ''}
  `             }
                //đoạn ni
                >
                  {s.value}
                </span>
                {s.trend && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-500">{s.trend}</span>}

              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <div className="flex gap-4 font-bold text-xs text-gray-600 uppercase">Danh sách khách hàng</div>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                <th className="px-8 py-5 font-black">ID</th>
                <th className="px-8 py-5 font-black">HỌ VÀ TÊN</th>
                <th className="px-8 py-5 font-black">EMAIL</th>
                <th className="px-8 py-5 font-black text-left ">VAI TRÒ</th>
                <th className="px-8 py-5 font-black">TRẠNG THÁI</th>
                <th className="px-8 py-5 text-right font-black">HÀNH ĐỘNG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {!loading && dataList.map((u, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-xs font-bold text-gray-400">#{u.id}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
                        {u.ten_khach_hang?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-bold text-gray-900">{u.ten_khach_hang}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-gray-500">{u.email}</td>
                  <td className="px-8 py-5">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-tight">Khách Hàng</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${u.is_blocked === 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <span className={`text-xs font-bold ${u.is_blocked === 0 ? 'text-green-500' : 'text-red-500'}`}>
                        {u.is_blocked === 0 ? 'Hoạt động' : 'Tạm khóa'}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => handleToggleBlock(u.id)} className={`p-2 rounded-lg transition-all ${u.is_blocked === 1 ? 'text-green-500 bg-green-50 hover:bg-green-100' : 'text-red-500 bg-red-50 hover:bg-red-100'}`}>
                        {u.is_blocked === 1 ? <Check size={16} /> : <X size={16} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {loading && <div className="p-20 text-center text-gray-400">Đang tải dữ liệu...</div>}
        </div>
      </main>
    </div>
  );
};

export default Quan_ly_khach_hang;