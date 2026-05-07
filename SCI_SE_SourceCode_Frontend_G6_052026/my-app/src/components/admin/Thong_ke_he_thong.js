import React, { useState, useEffect } from 'react';
import { 
  XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area,
  PieChart, Pie, Cell 
} from 'recharts';
import { TrendingUp, MoreHorizontal, Wallet, Store, Users } from 'lucide-react';
import MenuAd from './MenuAd'; 
import api from "../../api/index";

const Thong_ke_he_thong = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const COLORS = ['#2563eb', '#334155', '#ea580c', '#3b82f6', '#8b5cf6', '#ec4899'];

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const res = await api.get('/admin/thong-ke-doanh-thu');
      if (res.data.status) {
        setData(res.data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu thống kê:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#f8fafc] items-center justify-center font-sans">
        <div className="text-slate-500 font-medium">Đang tải dữ liệu hệ thống...</div>
      </div>
    );
  }

  // Xử lý dữ liệu biểu đồ tròn để tránh bị trắng (ép kiểu Number)
  const pieData = data?.doanh_thu_theo_danh_muc?.map(item => ({
    name: item.ten_danh_muc,
    value: Number(item.doanh_thu)
  })) || [];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans">
      <MenuAd onLogout={handleLogout} />

      <main className="flex-grow p-8 overflow-y-auto">
        <div className="mb-8">
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Thống kê hệ thống</h1>
            <p className="text-sm text-slate-400">Chào mừng trở lại, đây là tình hình kinh doanh của ServiceHub.</p>
        </div>

        {/* Top 3 Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard 
            title="Tổng doanh thu toàn sàn" 
            value={Number(data?.tong_doanh_thu || 0).toLocaleString()} 
            unit="VNĐ"
            trend="Tổng tích lũy"
            trendValue=""
            icon={Wallet}
            iconBg="bg-blue-50"
          />
          <StatCard 
            title="Đối tác đang hoạt động" 
            value={data?.count_ncc || 0} 
            unit="nhà cung cấp"
            trend="Trên toàn hệ thống"
            trendValue=""
            icon={Store}
            iconBg="bg-blue-100"
          />
          <StatCard 
            title="Tổng số khách hàng" 
            value={data?.count_kh || 0} 
            unit="người dùng"
            trend="Tài khoản đã đăng ký"
            trendValue=""
            icon={Users}
            iconBg="bg-orange-100"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Tăng trưởng người dùng mới</h3>
                <p className="text-xs text-slate-400 mt-1">Dữ liệu mặc định 6 tháng gần nhất</p>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={[
                  { name: 'T1', value: 300 }, { name: 'T2', value: 450 }, { name: 'T3', value: 580 }, 
                  { name: 'T4', value: 520 }, { name: 'T5', value: 850 }, { name: 'T6', value: 700 }
                ]}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} dy={10} />
                  <YAxis hide />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart - Đã sửa lỗi hiển thị trắng */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
            <h3 className="text-lg font-bold text-slate-800 mb-2">Doanh thu theo ngành hàng</h3>
            <div className="h-[250px] relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={70}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    nameKey="name"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Thị phần</p>
                <p className="text-xl font-black text-slate-800">Dịch vụ</p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 mt-4 overflow-y-auto max-h-32">
              {data?.doanh_thu_theo_danh_muc?.map((item, index) => (
                <div key={index} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-[11px] text-slate-500 font-medium">{item.ten_danh_muc}</span>
                  </div>
                  <span className="text-[11px] font-bold">{formatCurrency(item.doanh_thu)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top 5 Table */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Top 5 đối tác doanh thu cao nhất</h3>
              <p className="text-xs text-slate-400 mt-1">Dựa trên thực tế thanh toán hoàn tất</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-50">
                  <th className="pb-4 font-bold">Thứ hạng</th>
                  <th className="pb-4 font-bold">Đối tác</th>
                  <th className="pb-4 font-bold text-center">Lĩnh vực</th>
                  <th className="pb-4 font-bold text-center">Đơn hàng</th>
                  <th className="pb-4 font-bold text-right">Doanh thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {data?.top_doi_tac?.map((item, index) => (
                  <tr key={index} className="group hover:bg-slate-50 transition-colors">
                    <td className="py-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-orange-100 text-orange-500' : 'bg-slate-100 text-slate-500'}`}>
                        {index + 1}
                      </div>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center font-bold text-blue-600">
                          {item.ten_nha_cung_cap?.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{item.ten_nha_cung_cap}</span>
                      </div>
                    </td>
                    <td className="py-4 text-center">
                      <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-500 uppercase">
                        {item.ten_dich_vu}
                      </span>
                    </td>
                    <td className="py-4 text-center font-semibold text-slate-600 text-sm">{item.tong_don}</td>
                    <td className="py-4 text-right font-bold text-slate-800 text-sm">
                      {formatCurrency(item.tong_doanh_thu)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

const StatCard = ({ title, value, unit, trend, trendValue, icon: Icon, iconBg }) => (
  <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-50 flex justify-between items-start relative overflow-hidden">
    <div>
      <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">
        {value} <span className="text-sm font-normal text-slate-500">{unit}</span>
      </h3>
      <div className="flex items-center gap-1 mt-2 text-xs font-semibold text-green-500">
        <TrendingUp size={14} />
        {trendValue} {trend}
      </div>
    </div>
    <div className={`p-3 rounded-2xl ${iconBg}`}>
      <Icon className="text-slate-700" size={24} />
    </div>
    <div className="absolute -top-6 -right-6 w-24 h-24 bg-slate-50 rounded-full opacity-50 z-0"></div>
  </div>
);

export default Thong_ke_he_thong;