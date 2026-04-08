import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, RotateCcw, Send, Loader2 } from 'lucide-react';
import api from '../api';

const Quen_mat_khau = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await api.post('/khach-hang/quen-mat-khau', { email });
      setMessage({ 
        type: 'success', 
        text: 'Liên kết đặt lại mật khẩu đã được gửi vào email của bạn!' 
      });
    } catch (error) {
      if (error.response?.status === 429) {
        setMessage({ 
          type: 'error', 
          text: 'Vui lòng thử lại sau 60 phút.' 
        });
      } else {
        setMessage({ 
          type: 'error', 
          text: error.response?.data?.message || 'Email không tồn tại hoặc có lỗi xảy ra.' 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <Link 
        to="/dang-nhap" 
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-medium"
      >
        <ArrowLeft size={18} /> Quay lại
      </Link>

      <div className="w-full max-w-[440px] bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-slate-200/50 text-center transform transition-all">
        
        {/* Icon Header */}
        <div className="flex justify-center mb-6">
          <div className="bg-blue-50 p-5 rounded-[22px]">
            <RotateCcw size={32} className="text-blue-500" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
          Quên mật khẩu?
        </h1>
        <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 px-2">
          Đừng lo lắng! Nhập email của bạn và chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
        </p>
        {message.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-medium ${
            message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div className="space-y-2">
            <label className="text-[13px] font-bold text-slate-700 ml-1 uppercase tracking-wider">
              Địa chỉ Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Gửi liên kết đặt lại <Send size={18} /></>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100">
          <Link 
            to="/dang-nhap" 
            className="text-slate-500 hover:text-blue-600 font-bold transition-colors text-sm"
          >
            Quay lại Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Quen_mat_khau;