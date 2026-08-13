import React from 'react';
import type { WorkoutDayPlan, WorkoutSession, UserProfile } from '../../lib/types';
import { WORKOUT_PLANS } from '../../lib/mockData';
import { WorkoutCard } from '../../components/workout/WorkoutCard';
import { StatCard } from '../../components/common/StatCard';
import { FlameIcon, TrophyIcon, ActivityIcon } from '../../components/icons/Icons';

interface HomeViewProps {
  user: UserProfile;
  activeSession: WorkoutSession | null;
  completedSessions: WorkoutSession[];
  onStartWorkout: (dayNumber: number) => void;
  onResumeWorkout: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  user,
  activeSession,
  completedSessions,
  onStartWorkout,
  onResumeWorkout,
}) => {
  // Today default is Day 1 or current active session day
  const todayDayNumber = activeSession ? activeSession.dayNumber : 1;
  const todayPlan = WORKOUT_PLANS.find((p) => p.dayNumber === todayDayNumber) || WORKOUT_PLANS[0];

  const thisWeekCompletedCount = completedSessions.length;

  return (
    <div className="p-4 flex flex-col gap-5 animate-fade-in">
      {/* Welcome Banner */}
      <div className="flex items-center justify-between mt-1">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-[#F8FAFC]">
            Hey, {user.name.split(' ')[0]} 👋
          </h2>
          <p className="text-xs font-semibold text-[#94A3B8] mt-0.5">
            Ready to crush today's workout?
          </p>
        </div>
      </div>

      {/* Today's Workout Card */}
      <WorkoutCard
        plan={todayPlan}
        onStartWorkout={onStartWorkout}
        isCurrentSessionActive={Boolean(activeSession)}
        onResumeWorkout={onResumeWorkout}
      />

      {/* 7-Day Schedule Overview */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
            Weekly Split Schedule
          </h4>
          <span className="text-xs font-semibold text-[#2688FF]">6 Days Split</span>
        </div>

        <div className="grid grid-cols-6 gap-1.5">
          {WORKOUT_PLANS.map((plan) => {
            const isToday = plan.dayNumber === todayDayNumber;
            const isCompleted = completedSessions.some((s) => s.dayNumber === plan.dayNumber);

            return (
              <button
                key={plan.dayNumber}
                onClick={() => onStartWorkout(plan.dayNumber)}
                className={`flex flex-col items-center py-2 px-1 rounded-xl border transition-all active:scale-95 ${
                  isToday
                    ? 'bg-[#2688FF]/20 border-[#2688FF] text-[#2688FF] ring-2 ring-[#2688FF]/30'
                    : isCompleted
                    ? 'bg-[#10B981]/15 border-[#10B981]/40 text-[#10B981]'
                    : 'bg-[#151F32] border-[#151F32] text-[#94A3B8] hover:text-[#F8FAFC]'
                }`}
              >
                <span className="text-[10px] font-bold uppercase">Day</span>
                <span className="text-sm font-black mt-0.5">{plan.dayNumber}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Dashboard Stat Cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard
          label="Body Weight"
          value={user.currentWeightKg}
          unit="kg"
          subtitle="Target: 76.0 kg"
          icon={<ActivityIcon size={18} />}
          accentColor="#2688FF"
        />
        <StatCard
          label="Weekly Streak"
          value="4"
          unit="weeks"
          subtitle="Keep it going! 🔥"
          icon={<FlameIcon size={18} />}
          accentColor="#F59E0B"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <StatCard
          label="Workouts Completed"
          value={`${thisWeekCompletedCount} / 6`}
          subtitle="Current training cycle progress"
          icon={<TrophyIcon size={18} />}
          accentColor="#10B981"
        />
      </div>
    </div>
  );
};
