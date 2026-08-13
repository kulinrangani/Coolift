import React from 'react';
import type { ExerciseSession } from '../../lib/types';
import { SetRow } from './SetRow';
import { PlusIcon } from '../icons/Icons';

interface ExerciseCardProps {
  exercise: ExerciseSession;
  onUpdateSet: (setNumber: number, field: 'weight' | 'reps', value: number | '') => void;
  onToggleSetComplete: (setNumber: number) => void;
  onAddSet: () => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onUpdateSet,
  onToggleSetComplete,
  onAddSet,
}) => {
  // Format last session reference banner string
  const lastTimeSummary = exercise.sets
    .map((s) => `${s.previousWeight || s.weight} kg × ${s.previousReps || s.reps}`)
    .join(', ');

  return (
    <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4 mb-4 shadow-md transition-all duration-200">
      {/* Exercise Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-base font-extrabold text-[#F8FAFC] tracking-tight">
            {exercise.exerciseName}
          </h4>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#2688FF]/15 text-[#2688FF]">
              Target: {exercise.targetSets} × {exercise.targetRepMin}–{exercise.targetRepMax}
            </span>
            <span className="text-xs font-medium text-[#94A3B8] uppercase">
              {exercise.category}
            </span>
          </div>
        </div>
      </div>

      {/* Last Time Performance Reference Banner */}
      <div className="bg-[#151F32]/80 border border-[#151F32] rounded-xl px-3 py-2 my-3 flex items-center gap-2">
        <span className="text-xs font-bold text-[#06B6D4] shrink-0">Last time:</span>
        <span className="text-xs font-medium text-[#94A3B8] truncate">{lastTimeSummary}</span>
      </div>

      {/* Set Rows Table Header */}
      <div className="flex items-center justify-between text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1 mb-1">
        <span className="w-8">Set</span>
        <span className="flex-1 text-center">Weight</span>
        <span className="flex-1 text-center">Reps</span>
        <span className="w-10 text-center">Done</span>
      </div>

      {/* Set Rows */}
      <div className="flex flex-col gap-1">
        {exercise.sets.map((set) => (
          <SetRow
            key={set.setNumber}
            set={set}
            onUpdateWeight={(val) => onUpdateSet(set.setNumber, 'weight', val)}
            onUpdateReps={(val) => onUpdateSet(set.setNumber, 'reps', val)}
            onToggleComplete={() => onToggleSetComplete(set.setNumber)}
          />
        ))}
      </div>

      {/* Add Set Action Button */}
      <button
        type="button"
        onClick={onAddSet}
        className="w-full mt-3 py-2 px-3 bg-[#151F32] hover:bg-[#1E2C44] text-[#2688FF] font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors border border-[#151F32]"
      >
        <PlusIcon size={14} />
        <span>Add Set</span>
      </button>
    </div>
  );
};
