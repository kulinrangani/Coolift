import React from 'react';
import type { WorkoutDayPlan } from '../../lib/types';
import { PrimaryButton } from '../common/PrimaryButton';
import { PlayIcon, ClockIcon, DumbbellIcon } from '../icons/Icons';

interface WorkoutCardProps {
  plan: WorkoutDayPlan;
  onStartWorkout: (dayNumber: number) => void;
  isCurrentSessionActive?: boolean;
  onResumeWorkout?: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  plan,
  onStartWorkout,
  isCurrentSessionActive = false,
  onResumeWorkout,
}) => {
  return (
    <div className="bg-[#0F1726] border border-[#151F32] rounded-3xl p-5 shadow-xl relative overflow-hidden my-4 transition-all duration-200 hover:border-[#2688FF]/40">
      {/* Background Accent Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#2688FF]/10 rounded-full blur-2xl -z-0 pointer-events-none" />

      {/* Header Tag */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2688FF] bg-[#2688FF]/15 px-3 py-1 rounded-full">
          Today's Workout
        </span>
        <div className="flex items-center gap-1.5 text-xs text-[#94A3B8] font-medium">
          <ClockIcon size={14} color="#94A3B8" />
          <span>~{plan.estimatedMinutes} min</span>
        </div>
      </div>

      {/* Workout Title & Subtitle */}
      <div className="relative z-10 mb-4">
        <h3 className="text-xl font-black text-[#F8FAFC] tracking-tight">{plan.title}</h3>
        <p className="text-xs text-[#94A3B8] mt-1 font-medium">{plan.subtitle}</p>
      </div>

      {/* Exercise Count Pill */}
      <div className="flex items-center gap-2 mb-5 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-[#F8FAFC] bg-[#151F32] px-3 py-1.5 rounded-xl border border-[#151F32]">
          <DumbbellIcon size={14} color="#06B6D4" />
          <span>{plan.exercises.length} Exercises</span>
        </div>
      </div>

      {/* Action Button */}
      <div className="relative z-10">
        {isCurrentSessionActive && onResumeWorkout ? (
          <PrimaryButton variant="secondary" icon={<PlayIcon size={18} />} onClick={onResumeWorkout}>
            RESUME WORKOUT IN PROGRESS
          </PrimaryButton>
        ) : (
          <PrimaryButton icon={<PlayIcon size={18} />} onClick={() => onStartWorkout(plan.dayNumber)}>
            START WORKOUT
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};
