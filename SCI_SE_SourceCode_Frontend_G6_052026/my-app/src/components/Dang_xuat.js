import React from 'react';
import { createPortal } from 'react-dom';
import { LogOut } from 'lucide-react';

const Dang_xuat = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-full max-w-[420px] rounded-[28px] p-8 shadow-2xl text-center z-[100000] animate-in fade-in zoom-in duration-300">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-50 p-5 rounded-full">
            <LogOut size={34} className="text-red-500" strokeWidth={2} />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-slate-900 mb-3">
          Đăng xuất khỏi ServiceHub?
        </h3>

        {/* Description */}
        <p className="text-slate-500 text-sm leading-relaxed mb-8 px-2">
          Bạn có chắc chắn muốn đăng xuất không?
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center">
          
          {/* Cancel */}
          <button
            onClick={onClose}
            className="flex-1 max-w-[130px] py-2.5 px-4 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-sm"
          >
            Hủy
          </button>

          {/* Confirm */}
          <button
            onClick={onConfirm}
            className="flex-1 max-w-[180px] py-2.5 px-4 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md active:scale-95 text-sm"
          >
            Xác nhận đăng xuất
          </button>

        </div>
      </div>
    </div>,
    document.body
  );
};

export default Dang_xuat;