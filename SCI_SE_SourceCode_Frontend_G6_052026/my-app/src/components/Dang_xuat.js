import React from 'react';
import { LogOut } from 'lucide-react';

const Dang_xuat = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      <div className="relative bg-white w-full max-w-[400px] rounded-[24px] p-8 shadow-2xl text-center transform transition-all animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-5 rounded-full">
            <LogOut size={32} className="text-red-500" strokeWidth={2} />
          </div>
        </div>

        <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3">
          Đăng xuất khỏi ServiceHub?
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed mb-8 px-2">
          Bạn có chắc chắn muốn đăng xuất không? Phiên làm việc của bạn sẽ kết thúcvà bạn cần đăng nhập lại để tiếp tục sử dụng dịch vụ.
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onClose}
            className="flex-1 max-w-[130px] py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 max-w-[180px] py-2.5 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 text-sm"
          >
            Xác nhận đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dang_xuat;