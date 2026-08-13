import React, { useState } from 'react';
import type { ExerciseSession } from '../../lib/types';
import { SetRow } from './SetRow';
import { PlusIcon, ChevronDownIcon, ChevronUpIcon, CheckIcon } from '../icons/Icons';

interface ExerciseCardProps {
  exercise: ExerciseSession;
  onUpdateSet: (setNumber: number, field: 'weight' | 'reps', value: number | '') => void;
  onToggleSetComplete: (setNumber: number) => void;
  onAddSet: () => void;
  defaultExpanded?: boolean;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  onUpdateSet,
  onToggleSetComplete,
  onAddSet,
  defaultExpanded = true,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Format last session reference banner string
  const lastTimeSummary = exercise.sets
    .map((s) => `${s.previousWeight || s.weight} kg × ${s.previousReps || s.reps}`)
    .join(', ');

  const completedSetsCount = exercise.sets.filter((s) => s.isCompleted).length;
  const totalSetsCount = exercise.sets.length;
  const isAllCompleted = totalSetsCount > 0 && completedSetsCount === totalSetsCount;

  return (
    <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4 mb-4 shadow-md transition-all duration-200 hover:border-[#2688FF]/30">
      {/* Exercise Header (Accordion Toggle) */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-left cursor-pointer select-none group focus:outline-none"
      >
        <div className="flex-1 pr-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-base font-extrabold text-[#F8FAFC] tracking-tight group-hover:text-[#2688FF] transition-colors">
              {exercise.exerciseName}
            </h4>
            {isAllCompleted ? (
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#10B981]/20 text-[#10B981] flex items-center gap-1">
                <CheckIcon size={12} /> Done
              </span>
            ) : (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#151F32] text-[#94A3B8]">
                {completedSetsCount}/{totalSetsCount} sets
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#2688FF]/15 text-[#2688FF]">
              Target: {exercise.targetSets} × {exercise.targetRepMin}–{exercise.targetRepMax}
            </span>
            <span className="text-xs font-medium text-[#94A3B8] uppercase">
              {exercise.category}
            </span>
          </div>
        </div>

        {/* Accordion Chevron Toggle Icon */}
        <div className="w-8 h-8 rounded-xl bg-[#151F32] group-hover:bg-[#2688FF]/20 flex items-center justify-center text-[#94A3B8] group-hover:text-[#2688FF] transition-all shrink-0">
          {isExpanded ? <ChevronUpIcon size={18} /> : <ChevronDownIcon size={18} />}
        </div>
      </button>

      {/* Accordion Content Body */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-[#151F32]/80 animate-fade-in">
          {/* Last Time Performance Reference Banner */}
          <div className="bg-[#151F32]/80 border border-[#151F32] rounded-xl px-3 py-2 mb-3 flex items-center gap-2">
            <span className="text-xs font-bold text-[#06B6D4] shrink-0">Last time:</span>
            <span className="text-xs font-medium text-[#94A3B8] truncate">{lastTimeSummary}</span>
          </div>

          {/* Set Rows Table Header */}
          <div className="flex items-center justify-between text-[11px] font-bold text-[#94A3B8] uppercase tracking-wider px-2 py-1 mb-1">
            <span className="w-8">Set</span>
            <span className="flex-1 text-center">Weight (kg)</span>
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
      )}
    </div>
  );
};
