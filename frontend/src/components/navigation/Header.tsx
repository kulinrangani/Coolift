import React from 'react';
import type { UserProfile } from '../../lib/types';

interface HeaderProps {
  user: UserProfile;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="bg-[#070B14]/90 backdrop-blur-md sticky top-0 z-30 border-b border-[#151F32] px-4 py-3 flex items-center justify-between">
      {/* Brand Logo & Name */}
      <div className="flex items-center gap-2.5">
        <img
          src="/COOLIFT_Design_Assets/01_logo_primary.svg"
          alt="COOLIFT — Lift. Track. Evolve."
          className="h-8 object-contain"
          onError={(e) => {
            (e.target as HTMLElement).style.display = 'none';
            const fallback = (e.target as HTMLElement).nextElementSibling;
            if (fallback) fallback.classList.remove('hidden');
          }}
        />
        <div className="hidden flex-col">
          <span className="text-lg font-black tracking-tight text-[#F8FAFC]">
            COO<span className="text-[#2688FF]">LIFT</span>
          </span>
          <span className="text-[9px] font-bold text-[#94A3B8] tracking-widest uppercase">
            Lift. Track. Evolve.
          </span>
        </div>
      </div>

      {/* User Greeting & Avatar */}
      <div className="flex items-center gap-2.5">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-bold text-[#F8FAFC]">{user.name}</p>
          <p className="text-[10px] text-[#94A3B8] font-medium">{user.goal}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#2688FF] to-[#06B6D4] flex items-center justify-center text-white font-black text-xs shadow-md ring-2 ring-[#151F32]">
          {user.name.charAt(0)}
        </div>
      </div>
    </header>
  );
};
