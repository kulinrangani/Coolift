import React, { useEffect } from 'react';
import { XIcon } from '../icons/Icons';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center" style={{ zIndex: 100 }}>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Card */}
      <div className="relative w-full max-w-md bg-[#0F1726] border-t border-[#2688FF]/40 rounded-t-3xl p-5 shadow-2xl z-10 animate-slide-up max-h-[85vh] flex flex-col">
        {/* Drag Handle */}
        <div className="w-12 h-1.5 bg-[#151F32] rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        {title && (
          <div className="flex items-center justify-between mb-3 border-b border-[#151F32] pb-3 shrink-0">
            <h3 className="text-lg font-black text-[#F8FAFC] tracking-tight">{title}</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#151F32] hover:bg-[#1E2C44] flex items-center justify-center text-[#94A3B8] hover:text-white transition-colors"
            >
              <XIcon size={18} />
            </button>
          </div>
        )}

        {/* Scrollable Children Container */}
        <div className="flex-1 overflow-y-auto pr-1 pb-24">
          {children}
        </div>
      </div>
    </div>
  );
};
