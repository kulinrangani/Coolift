import React, { useState } from 'react';
import type { WorkoutSession } from '../../lib/types';
import { BottomSheet } from '../../components/common/BottomSheet';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon, DumbbellIcon, CheckIcon, ChevronRightIcon } from '../../components/icons/Icons';

interface HistoryViewProps {
  completedSessions: WorkoutSession[];
  onStartNewWorkout: (dayNumber: number) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  completedSessions,
  onStartNewWorkout,
}) => {
  const [selectedSession, setSelectedSession] = useState<WorkoutSession | null>(null);

  if (completedSessions.length === 0) {
    return (
      <div className="p-4 animate-fade-in">
        <EmptyState
          title="No Completed Workouts Yet"
          description="Your logged sessions will appear here with full exercise and set breakdowns."
          actionText="Log Your First Workout"
          onAction={() => onStartNewWorkout(1)}
        />
      </div>
    );
  }

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    return `${mins} min`;
  };

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="p-4 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black text-[#F8FAFC]">Workout History</h2>
        <span className="text-xs font-bold text-[#2688FF] bg-[#2688FF]/15 px-3 py-1 rounded-full">
          {completedSessions.length} Sessions Logged
        </span>
      </div>

      {/* List of Completed Sessions */}
      <div className="flex flex-col gap-3">
        {completedSessions.map((session) => {
          let totalWeight = 0;
          let totalSetsCount = 0;
          session.exercises.forEach((ex) => {
            ex.sets.forEach((s) => {
              totalSetsCount += 1;
              totalWeight += (typeof s.weight === 'number' ? s.weight : 0) * (typeof s.reps === 'number' ? s.reps : 0);
            });
          });

          return (
            <button
              key={session.id}
              onClick={() => setSelectedSession(session)}
              className="bg-[#0F1726] border border-[#151F32] hover:border-[#2688FF]/40 rounded-2xl p-4 text-left flex items-center justify-between transition-all duration-200 active:scale-[0.99] group shadow-md"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                    <CheckIcon size={14} /> Completed
                  </span>
                  <span className="text-xs text-[#94A3B8]">• {formatDate(session.startedAt)}</span>
                </div>
                <h4 className="text-base font-extrabold text-[#F8FAFC] group-hover:text-[#2688FF] transition-colors">
                  {session.workoutTitle}
                </h4>

                <div className="flex items-center gap-3 mt-2 text-xs text-[#94A3B8] font-medium">
                  <span className="flex items-center gap-1">
                    <ClockIcon size={12} color="#94A3B8" /> {formatDuration(session.durationSeconds)}
                  </span>
                  <span className="flex items-center gap-1">
                    <DumbbellIcon size={12} color="#06B6D4" /> {totalSetsCount} Sets ({totalWeight.toLocaleString()} kg total)
                  </span>
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-[#151F32] flex items-center justify-center text-[#94A3B8] group-hover:text-white transition-colors shrink-0">
                <ChevronRightIcon size={18} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Session Details Modal / Bottom Sheet */}
      <BottomSheet
        isOpen={Boolean(selectedSession)}
        onClose={() => setSelectedSession(null)}
        title={selectedSession?.workoutTitle || 'Workout Session Detail'}
      >
        {selectedSession && (() => {
          let sessionTotalWeight = 0;
          let sessionTotalSets = 0;
          selectedSession.exercises.forEach((ex) => {
            ex.sets.forEach((s) => {
              sessionTotalSets += 1;
              sessionTotalWeight += (typeof s.weight === 'number' ? s.weight : 0) * (typeof s.reps === 'number' ? s.reps : 0);
            });
          });

          return (
            <div className="flex flex-col gap-4 pb-6">
              {/* Session Overview Stats Cards */}
              <div className="grid grid-cols-3 gap-2 bg-[#151F32]/80 border border-[#151F32] p-2.5 rounded-2xl">
                <div className="flex flex-col items-center justify-center p-2 bg-[#0F1726] rounded-xl border border-[#151F32]/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Date</span>
                  <span className="text-xs font-black text-white mt-0.5">{formatDate(selectedSession.startedAt)}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-[#0F1726] rounded-xl border border-[#151F32]/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Duration</span>
                  <span className="text-xs font-black text-[#06B6D4] mt-0.5">{formatDuration(selectedSession.durationSeconds)}</span>
                </div>
                <div className="flex flex-col items-center justify-center p-2 bg-[#0F1726] rounded-xl border border-[#151F32]/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Volume</span>
                  <span className="text-xs font-black text-[#10B981] mt-0.5">{sessionTotalWeight.toLocaleString()} kg</span>
                </div>
              </div>

              {/* Exercise Breakdown Cards */}
              <div className="flex flex-col gap-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] px-1">
                  Exercises ({selectedSession.exercises.length}) • {sessionTotalSets} Sets
                </h4>

                {selectedSession.exercises.map((ex) => (
                  <div key={ex.exerciseId} className="bg-[#151F32]/60 border border-[#151F32] p-3.5 rounded-2xl flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <h5 className="text-sm font-extrabold text-[#F8FAFC]">{ex.exerciseName}</h5>
                      <span className="text-[10px] font-bold text-[#2688FF] bg-[#2688FF]/15 px-2.5 py-0.5 rounded-full uppercase">
                        {ex.sets.length} sets
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      {ex.sets.map((s) => (
                        <div
                          key={s.setNumber}
                          className="flex items-center justify-between bg-[#0F1726] border border-[#151F32] px-3 py-2 rounded-xl text-xs"
                        >
                          <span className="font-extrabold text-[#94A3B8]">Set {s.setNumber}</span>
                          <span className="font-extrabold text-[#F8FAFC]">
                            {s.weight} <span className="text-[#94A3B8] text-[10px] font-semibold">kg</span> × {s.reps}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </BottomSheet>
    </div>
  );
};
