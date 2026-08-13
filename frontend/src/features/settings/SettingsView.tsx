import React, { useState } from 'react';
import type { UserProfile } from '../../lib/types';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SettingsIcon, RefreshIcon, CheckIcon } from '../../components/icons/Icons';

interface SettingsViewProps {
  user: UserProfile;
  onClearHistory: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ user, onClearHistory }) => {
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncSuccess, setSyncSuccess] = useState<boolean>(false);
  const [confirmReset, setConfirmReset] = useState<boolean>(false);
  const [resetSuccess, setResetSuccess] = useState<boolean>(false);

  const handleForceSync = () => {
    setIsSyncing(true);
    setSyncSuccess(false);
    setTimeout(() => {
      setIsSyncing(false);
      setSyncSuccess(true);
      setTimeout(() => setSyncSuccess(false), 3000);
    }, 1200);
  };

  const handleResetHistory = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      // Auto-dismiss confirm prompt after 5 seconds if not acted on
      setTimeout(() => setConfirmReset(false), 5000);
      return;
    }
    onClearHistory();
    setConfirmReset(false);
    setResetSuccess(true);
    setTimeout(() => setResetSuccess(false), 3000);
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

      {/* PWA & Offline Support Card */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-extrabold text-[#F8FAFC]">PWA & Offline Mode</h4>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/15 px-2.5 py-1 rounded-md flex items-center gap-1">
            <CheckIcon size={12} /> Ready Offline
          </span>
        </div>
        <p className="text-xs text-[#94A3B8]">
          COOLIFT is configured as a Progressive Web App (PWA). Add it to your home screen to launch in full-screen app mode and log workouts 100% offline.
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
          {isSyncing ? 'Syncing Local Data...' : syncSuccess ? 'All Workouts Backed Up!' : 'Force Sync Now'}
        </PrimaryButton>
      </div>

      {/* Danger Zone — Reset History */}
      <div className="bg-[#0F1726] border border-[#EF4444]/30 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          {/* Danger Icon */}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h4 className="text-sm font-extrabold text-[#EF4444]">Danger Zone</h4>
        </div>
        <p className="text-xs text-[#94A3B8] mb-4">
          Permanently delete all workout history from this device. This action cannot be undone.
        </p>

        {/* Confirm step — two-tap safety mechanism */}
        {confirmReset ? (
          <div className="flex flex-col gap-2">
            <div className="text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl px-3 py-2 text-center">
              ⚠️ This will permanently delete ALL workout history. Are you sure?
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setConfirmReset(false)}
                className="flex-1 text-xs font-bold text-[#94A3B8] bg-[#151F32] border border-[#151F32] rounded-xl px-3 py-2.5 hover:bg-[#1E2C44] transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleResetHistory}
                className="flex-1 text-xs font-bold text-white bg-[#EF4444] border border-[#EF4444] rounded-xl px-3 py-2.5 hover:bg-[#DC2626] transition-all active:scale-95 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              >
                Yes, Delete All
              </button>
            </div>
          </div>
        ) : resetSuccess ? (
          <div className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 rounded-xl px-3 py-2.5 text-center flex items-center justify-center gap-2">
            <CheckIcon size={14} /> History cleared successfully
          </div>
        ) : (
          <button
            type="button"
            onClick={handleResetHistory}
            className="w-full text-xs font-bold text-[#EF4444] bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl px-3 py-2.5 hover:bg-[#EF4444]/20 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Reset All Workout History
          </button>
        )}
      </div>
    </div>
  );
};
