import React, { useState } from 'react';
import type { WorkoutSession } from '../../lib/types';
import { ExerciseCard } from '../../components/workout/ExerciseCard';
import { RestTimer } from '../../components/workout/RestTimer';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { EmptyState } from '../../components/common/EmptyState';
import { ClockIcon, CheckIcon, XIcon } from '../../components/icons/Icons';

interface WorkoutViewProps {
  activeSession: WorkoutSession | null;
  elapsedSeconds: number;
  onUpdateSet: (exerciseId: string, setNumber: number, field: 'weight' | 'reps', value: number | '') => void;
  onToggleSetComplete: (exerciseId: string, setNumber: number) => { exerciseCategory?: 'compound' | 'isolation'; newlyCompleted?: boolean };
  onAddSet: (exerciseId: string) => void;
  onFinishWorkout: () => void;
  onCancelWorkout: () => void;
  onStartNewWorkout: (dayNumber: number) => void;
}

export const WorkoutView: React.FC<WorkoutViewProps> = ({
  activeSession,
  elapsedSeconds,
  onUpdateSet,
  onToggleSetComplete,
  onAddSet,
  onFinishWorkout,
  onCancelWorkout,
  onStartNewWorkout,
}) => {
  const [activeRestSeconds, setActiveRestSeconds] = useState<number | null>(null);

  if (!activeSession) {
    return (
      <div className="p-4 animate-fade-in">
        <EmptyState
          title="No Active Workout"
          description="Start today's session to begin logging sets, weights, and reps."
          actionText="Start Today's Workout"
          onAction={() => onStartNewWorkout(1)}
        />
      </div>
    );
  }

  const formatElapsed = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleSet = (exerciseId: string, setNumber: number) => {
    const { exerciseCategory, newlyCompleted } = onToggleSetComplete(exerciseId, setNumber);

    if (newlyCompleted && exerciseCategory) {
      // Compound = 120s rest, Isolation = 60s rest
      const defaultDuration = exerciseCategory === 'compound' ? 120 : 60;
      setActiveRestSeconds(defaultDuration);
    }
  };

  // Calculate workout completion statistics
  let totalSets = 0;
  let completedSets = 0;
  activeSession.exercises.forEach((ex) => {
    ex.sets.forEach((s) => {
      totalSets += 1;
      if (s.isCompleted) completedSets += 1;
    });
  });

  const [allExpanded, setAllExpanded] = useState<boolean>(true);
  const [toggleKey, setToggleKey] = useState<number>(0);

  const handleToggleAll = () => {
    const nextState = !allExpanded;
    setAllExpanded(nextState);
    setToggleKey((prev) => prev + 1);
  };

  return (
    <div className="p-4 flex flex-col gap-4 animate-fade-in pb-28">
      {/* Active Workout Timer Bar */}
      <div className="bg-[#0F1726] border border-[#2688FF]/30 rounded-2xl p-4 flex items-center justify-between sticky top-16 z-20 shadow-xl backdrop-blur-md">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#2688FF]">
            Workout in Progress
          </span>
          <h3 className="text-lg font-black text-white">{activeSession.workoutTitle}</h3>
        </div>

        <div className="flex items-center gap-1.5 bg-[#151F32] px-3 py-1.5 rounded-xl border border-[#151F32]">
          <ClockIcon size={16} color="#06B6D4" />
          <span className="text-sm font-extrabold font-sans tabular-nums text-white">
            {formatElapsed(elapsedSeconds)}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-[#0F1726] border border-[#151F32] rounded-xl p-3 flex items-center justify-between">
        <span className="text-xs font-bold text-[#94A3B8]">
          Sets Completed: <strong className="text-white">{completedSets}</strong> / {totalSets}
        </span>
        <div className="w-24 bg-[#151F32] h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#10B981] h-full transition-all duration-300"
            style={{ width: `${totalSets > 0 ? (completedSets / totalSets) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Exercise List Header & Accordion Control */}
      <div className="flex items-center justify-between mt-1 px-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">
          Exercises ({activeSession.exercises.length})
        </h4>
        <button
          type="button"
          onClick={handleToggleAll}
          className="text-xs font-bold text-[#2688FF] hover:text-[#3b93ff] bg-[#2688FF]/10 px-2.5 py-1 rounded-lg transition-colors border border-[#2688FF]/20 active:scale-95"
        >
          {allExpanded ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      {/* List of Exercise Cards */}
      {activeSession.exercises.map((exercise) => (
        <ExerciseCard
          key={`${exercise.exerciseId}-${toggleKey}`}
          exercise={exercise}
          defaultExpanded={allExpanded}
          onUpdateSet={(setNum, field, val) => onUpdateSet(exercise.exerciseId, setNum, field, val)}
          onToggleSetComplete={(setNum) => handleToggleSet(exercise.exerciseId, setNum)}
          onAddSet={() => onAddSet(exercise.exerciseId)}
        />
      ))}

      {/* Bottom Action Controls */}
      <div className="flex flex-col gap-2 mt-4">
        <PrimaryButton icon={<CheckIcon size={20} />} onClick={onFinishWorkout}>
          Finish & Save Workout
        </PrimaryButton>
        <PrimaryButton variant="ghost" icon={<XIcon size={18} />} onClick={onCancelWorkout}>
          Cancel Workout
        </PrimaryButton>
      </div>

      {/* Active Rest Timer Overlay */}
      {activeRestSeconds !== null && (
        <RestTimer
          initialSeconds={activeRestSeconds}
          onFinish={() => setActiveRestSeconds(null)}
          onSkip={() => setActiveRestSeconds(null)}
        />
      )}
    </div>
  );
};
