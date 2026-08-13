import React, { useState } from 'react';
import type { UserProfile } from '../../lib/types';
import { StatCard } from '../../components/common/StatCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { validateBodyWeight } from '../../lib/validation';
import { TrophyIcon, ActivityIcon, PlusIcon, FlameIcon } from '../../components/icons/Icons';

interface ProgressViewProps {
  user: UserProfile;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ user }) => {
  const [weightInput, setWeightInput] = useState<string>(user.currentWeightKg.toString());
  const [weightHistory, setWeightHistory] = useState<{ date: string; weight: number }[]>([
    { date: '2026-08-01', weight: 75.8 },
    { date: '2026-08-05', weight: 75.2 },
    { date: '2026-08-09', weight: 74.8 },
    { date: '2026-08-13', weight: user.currentWeightKg },
  ]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(weightInput);
    const validation = validateBodyWeight(isNaN(val) ? '' : val, new Date().toISOString());

    if (!validation.isValid) {
      setErrorMsg(validation.error || 'Invalid weight value');
      return;
    }

    setErrorMsg(null);
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      weight: val,
    };
    setWeightHistory([newEntry, ...weightHistory]);
  };

  return (
    <div className="p-4 flex flex-col gap-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#F8FAFC]">Progress & PRs</h2>
        <span className="text-xs font-bold text-[#06B6D4] bg-[#06B6D4]/15 px-3 py-1 rounded-full">
          Body Metrics
        </span>
      </div>

      {/* Quick Overview Stat Grid */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Current Weight"
          value={weightHistory[0]?.weight || user.currentWeightKg}
          unit="kg"
          subtitle="Updated Today"
          icon={<ActivityIcon size={18} />}
          accentColor="#2688FF"
        />
        <StatCard
          label="Total Weight Change"
          value="-1.3"
          unit="kg"
          subtitle="Past 30 days"
          icon={<FlameIcon size={18} />}
          accentColor="#10B981"
        />
      </div>

      {/* Body Weight Logger Section */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4 shadow-md">
        <h3 className="text-sm font-extrabold text-[#F8FAFC] mb-3">Log Body Weight Today</h3>
        <form onSubmit={handleLogWeight} className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                step="0.1"
                value={weightInput}
                onChange={(e) => setWeightInput(e.target.value)}
                placeholder="Enter weight in kg"
                className="w-full bg-[#151F32] text-white font-bold text-base py-2.5 px-3 rounded-xl border border-[#151F32] focus:border-[#2688FF] focus:outline-none"
              />
              <span className="absolute right-3 top-3 text-xs font-semibold text-[#94A3B8]">
                kg
              </span>
            </div>
            <div className="w-32">
              <PrimaryButton type="submit" size="sm" icon={<PlusIcon size={16} />}>
                Log Entry
              </PrimaryButton>
            </div>
          </div>
          {errorMsg && <p className="text-xs text-[#EF4444] font-semibold">{errorMsg}</p>}
        </form>
      </div>

      {/* Body Weight History List */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">
          Weight History Log
        </h4>
        <div className="flex flex-col gap-2">
          {weightHistory.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2.5 bg-[#151F32]/60 rounded-xl text-sm"
            >
              <span className="text-[#94A3B8] font-medium">{item.date}</span>
              <span className="font-extrabold text-white">{item.weight} kg</span>
            </div>
          ))}
        </div>
      </div>

      {/* 1RM Strength Records Highlights */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <TrophyIcon size={18} color="#F59E0B" />
          <h4 className="text-sm font-extrabold text-[#F8FAFC]">Personal Record (PR) Highlights</h4>
        </div>

        <div className="flex flex-col gap-2">
          <div className="p-3 bg-[#151F32] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Barbell Bench Press</p>
              <p className="text-[11px] text-[#94A3B8]">Est. 1RM: 80 kg</p>
            </div>
            <span className="text-xs font-black text-[#F59E0B] bg-[#F59E0B]/15 px-2.5 py-1 rounded-lg">
              60 kg × 10
            </span>
          </div>

          <div className="p-3 bg-[#151F32] rounded-xl flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-white">Leg Press</p>
              <p className="text-[11px] text-[#94A3B8]">Est. 1RM: 168 kg</p>
            </div>
            <span className="text-xs font-black text-[#F59E0B] bg-[#F59E0B]/15 px-2.5 py-1 rounded-lg">
              120 kg × 12
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
