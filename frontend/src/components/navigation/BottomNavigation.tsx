import React from 'react';
import type { NavTab } from '../../lib/types';
import { HomeIcon, DumbbellIcon, HistoryIcon, ProgressIcon, SettingsIcon } from '../icons/Icons';

interface BottomNavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  hasActiveWorkout?: boolean;
}

export const BottomNavigation: React.FC<BottomNavigationProps> = ({
  activeTab,
  onTabChange,
  hasActiveWorkout = false,
}) => {
  const tabs: { id: NavTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <HomeIcon size={20} /> },
    { id: 'workout', label: 'Workout', icon: <DumbbellIcon size={20} /> },
    { id: 'history', label: 'History', icon: <HistoryIcon size={20} /> },
    { id: 'progress', label: 'Progress', icon: <ProgressIcon size={20} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={20} /> },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 max-w-md mx-auto px-3 py-2 bg-[#0F1726]/95 backdrop-blur-xl border-t border-[#151F32] shadow-[0_-8px_30px_rgba(0,0,0,0.6)] flex items-center justify-around font-sans">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isWorkoutTab = tab.id === 'workout';

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center min-h-[46px] min-w-[58px] px-2.5 py-1.5 rounded-xl transition-all duration-200 active:scale-95 group appearance-none bg-transparent border-0 outline-none cursor-pointer touch-manipulation ${
              isActive ? 'text-[#2688FF]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {/* Top Glowing Indicator Line */}
            {isActive && (
              <span className="absolute -top-2 w-7 h-1 bg-[#2688FF] rounded-full shadow-[0_0_10px_#2688FF] animate-fade-in" />
            )}

            {/* Active Glass Glow Pill Background */}
            {isActive && (
              <span className="absolute inset-0 bg-gradient-to-b from-[#2688FF]/20 to-[#2688FF]/5 rounded-xl border border-[#2688FF]/40 shadow-[0_0_15px_rgba(38,136,255,0.2)] -z-10 animate-fade-in" />
            )}

            {/* Active Workout Ping Badge */}
            {isWorkoutTab && hasActiveWorkout && (
              <span className="absolute top-1.5 right-2.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10B981] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10B981] ring-2 ring-[#0F1726]" />
              </span>
            )}

            <div className={`shrink-0 mb-1 transition-transform duration-200 ${isActive ? 'scale-110 text-[#2688FF]' : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'}`}>
              {tab.icon}
            </div>

            <span
              className={`text-[11px] font-bold tracking-tight transition-colors ${
                isActive ? 'text-[#2688FF]' : 'text-[#94A3B8] group-hover:text-[#F8FAFC]'
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
