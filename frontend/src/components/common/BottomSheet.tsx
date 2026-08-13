import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-end justify-center">
      {/* Fullscreen Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Sheet Content Card - Full width on mobile (w-full max-w-md) */}
      <div className="relative w-full max-w-md bg-[#0F1726] border-t border-[#2688FF]/40 rounded-t-3xl shadow-2xl z-10 animate-slide-up max-h-[75vh] flex flex-col overflow-hidden">
        {/* Fixed Non-Scrolling Sheet Header with Drag Handle, Title & Close Button */}
        <div className="bg-[#0F1726] px-6 pt-4 pb-3 border-b border-[#151F32] shrink-0 z-20">
          <div className="w-12 h-1.5 bg-[#151F32] rounded-full mx-auto mb-3" />
          {title && (
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-lg font-black text-[#F8FAFC] tracking-tight pl-0.5">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-[#151F32] hover:bg-[#1E2C44] active:scale-95 flex items-center justify-center text-[#94A3B8] hover:text-white transition-all shrink-0"
              >
                <XIcon size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Children Body */}
        <div
          className="flex-1 overflow-y-auto px-6 py-5 pb-24 scroll-container"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
            overscrollBehaviorY: 'contain',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};
