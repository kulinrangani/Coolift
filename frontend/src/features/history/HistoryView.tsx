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
          actionText="LOG YOUR FIRST WORKOUT"
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
        {selectedSession && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs text-[#94A3B8] bg-[#151F32] p-3 rounded-xl">
              <span>Date: <strong className="text-white">{formatDate(selectedSession.startedAt)}</strong></span>
              <span>Duration: <strong className="text-white">{formatDuration(selectedSession.durationSeconds)}</strong></span>
            </div>

            <div className="flex flex-col gap-3">
              {selectedSession.exercises.map((ex) => (
                <div key={ex.exerciseId} className="bg-[#070B14] p-3 rounded-xl border border-[#151F32]">
                  <h5 className="text-sm font-bold text-white mb-2">{ex.exerciseName}</h5>
                  <div className="flex flex-wrap gap-1.5">
                    {ex.sets.map((s) => (
                      <span
                        key={s.setNumber}
                        className="text-xs bg-[#151F32] text-[#F8FAFC] px-2.5 py-1 rounded-lg font-medium border border-[#151F32]"
                      >
                        S{s.setNumber}: {s.weight}kg × {s.reps}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </BottomSheet>
    </div>
  );
};
