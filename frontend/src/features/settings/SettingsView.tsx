import React, { useState } from 'react';
import type { UserProfile } from '../../lib/types';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SettingsIcon, RefreshIcon, CheckIcon } from '../../components/icons/Icons';

interface SettingsViewProps {
  user: UserProfile;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);

  const handleForceSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="p-4 flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#F8FAFC]">Settings</h2>
        <span className="text-xs font-bold text-[#2688FF] bg-[#2688FF]/15 px-3 py-1 rounded-full">
          COOLIFT v1.0
        </span>
      </div>

      {/* User Profile Card */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4 flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#2688FF] to-[#06B6D4] flex items-center justify-center text-white font-black text-xl shadow-lg ring-2 ring-[#2688FF]/30">
          {user.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-base font-extrabold text-[#F8FAFC]">{user.name}</h3>
          <p className="text-xs text-[#94A3B8] font-medium">{user.email}</p>
          <div className="flex items-center gap-2 mt-1 text-[11px] text-[#2688FF] font-semibold">
            <span>{user.heightCm} cm</span> • <span>{user.currentWeightKg} kg</span> • <span>{user.goal}</span>
          </div>
        </div>
      </div>

      {/* Theme Info (Midnight Theme Only) */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <SettingsIcon size={18} color="#2688FF" />
            <h4 className="text-sm font-extrabold text-[#F8FAFC]">Active Theme</h4>
          </div>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-md">
            Midnight Dark Theme
          </span>
        </div>
        <p className="text-xs text-[#94A3B8]">
          Optimized for maximum contrast, high readability, and battery efficiency during gym workouts.
        </p>
      </div>

      {/* Cloud Sync Controls */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <h4 className="text-sm font-extrabold text-[#F8FAFC] mb-1">Local Storage & Cloud Sync</h4>
        <p className="text-xs text-[#94A3B8] mb-4">
          All workouts are stored locally on your phone first. Tap below to force manual cloud backup.
        </p>

        <PrimaryButton
          variant="outline"
          icon={isSyncing ? <RefreshIcon size={18} className="animate-spin" /> : syncSuccess ? <CheckIcon size={18} color="#10B981" /> : <RefreshIcon size={18} />}
          onClick={handleForceSync}
          disabled={isSyncing}
        >
          {isSyncing ? 'SYNCING LOCAL DATA...' : syncSuccess ? 'ALL WORKOUTS BACKED UP!' : 'FORCE SYNC NOW'}
        </PrimaryButton>
      </div>
    </div>
  );
};
