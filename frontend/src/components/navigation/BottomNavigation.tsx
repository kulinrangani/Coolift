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
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070B14]/95 backdrop-blur-lg border-t border-[#151F32] px-2 py-2 flex items-center justify-around max-w-md mx-auto shadow-2xl">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isWorkoutTab = tab.id === 'workout';

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1.5 rounded-xl transition-all duration-200 active:scale-95 touch-manipulation ${
              isActive ? 'text-[#2688FF]' : 'text-[#94A3B8] hover:text-[#F8FAFC]'
            }`}
          >
            {/* Active Glow Pill */}
            {isActive && (
              <span className="absolute inset-0 bg-[#2688FF]/10 rounded-xl border border-[#2688FF]/30 -z-10" />
            )}

            {/* Workout Active Badge Indicator */}
            {isWorkoutTab && hasActiveWorkout && (
              <span className="absolute top-1 right-3 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-pulse ring-2 ring-[#070B14]" />
            )}

            <div className="shrink-0 mb-1">{tab.icon}</div>
            <span className={`text-[11px] font-semibold tracking-tight ${isActive ? 'text-[#2688FF]' : 'text-[#94A3B8]'}`}>
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
