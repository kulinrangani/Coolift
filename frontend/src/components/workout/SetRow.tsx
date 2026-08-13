import React from 'react';
import type { SetEntry } from '../../lib/types';
import { CheckIcon, PlusIcon, MinusIcon } from '../icons/Icons';
import { validateSetRow } from '../../lib/validation';

interface SetRowProps {
  set: SetEntry;
  onUpdateWeight: (val: number | '') => void;
  onUpdateReps: (val: number | '') => void;
  onToggleComplete: () => void;
}

export const SetRow: React.FC<SetRowProps> = ({
  set,
  onUpdateWeight,
  onUpdateReps,
  onToggleComplete,
}) => {
  const validation = validateSetRow(set.weight, set.reps);

  const handleIncrementWeight = (amount: number) => {
    const current = typeof set.weight === 'number' ? set.weight : 0;
    const updated = Math.max(0, parseFloat((current + amount).toFixed(2)));
    onUpdateWeight(updated);
  };

  const handleIncrementReps = (amount: number) => {
    const current = typeof set.reps === 'number' ? set.reps : 0;
    const updated = Math.max(1, current + amount);
    onUpdateReps(updated);
  };

  return (
    <div className="flex flex-col gap-1 my-2">
      <div
        className={`flex items-center justify-between gap-2 p-2.5 rounded-xl border transition-all duration-200 ${
          set.isCompleted
            ? 'bg-[#10B981]/10 border-[#10B981]/40'
            : 'bg-[#151F32] border-[#151F32] hover:border-[#1E2C44]'
        }`}
      >
        {/* Set Number Pill */}
        <div className="flex flex-col items-center justify-center w-8 h-8 rounded-lg bg-[#0F1726] border border-[#151F32] shrink-0">
          <span className="text-xs font-bold text-[#F8FAFC]">S{set.setNumber}</span>
        </div>

        {/* Weight Control */}
        <div className="flex items-center gap-1 flex-1">
          <button
            type="button"
            onClick={() => handleIncrementWeight(-2.5)}
            className="w-7 h-7 rounded-lg bg-[#0F1726] text-[#94A3B8] hover:text-white flex items-center justify-center border border-[#151F32] active:scale-95 transition-transform"
          >
            <MinusIcon size={14} />
          </button>
          <div className="flex-1 min-w-[56px]">
            <input
              type="number"
              step="0.5"
              value={set.weight}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseFloat(e.target.value);
                onUpdateWeight(val);
              }}
              placeholder="0"
              className="w-full bg-[#0F1726] text-white font-extrabold text-base text-center py-1.5 px-1 rounded-lg border border-[#151F32] focus:border-[#2688FF] focus:outline-none transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => handleIncrementWeight(2.5)}
            className="w-7 h-7 rounded-lg bg-[#0F1726] text-[#94A3B8] hover:text-white flex items-center justify-center border border-[#151F32] active:scale-95 transition-transform"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        {/* Reps Control */}
        <div className="flex items-center gap-1 flex-1">
          <button
            type="button"
            onClick={() => handleIncrementReps(-1)}
            className="w-7 h-7 rounded-lg bg-[#0F1726] text-[#94A3B8] hover:text-white flex items-center justify-center border border-[#151F32] active:scale-95 transition-transform"
          >
            <MinusIcon size={14} />
          </button>
          <div className="flex-1 min-w-[56px]">
            <input
              type="number"
              step="1"
              value={set.reps}
              onChange={(e) => {
                const val = e.target.value === '' ? '' : parseInt(e.target.value, 10);
                onUpdateReps(val);
              }}
              placeholder="0"
              className="w-full bg-[#0F1726] text-white font-extrabold text-base text-center py-1.5 px-1 rounded-lg border border-[#151F32] focus:border-[#2688FF] focus:outline-none transition-colors"
            />
          </div>
          <button
            type="button"
            onClick={() => handleIncrementReps(1)}
            className="w-7 h-7 rounded-lg bg-[#0F1726] text-[#94A3B8] hover:text-white flex items-center justify-center border border-[#151F32] active:scale-95 transition-transform"
          >
            <PlusIcon size={14} />
          </button>
        </div>

        {/* Set Completion Checkbox */}
        <button
          type="button"
          onClick={onToggleComplete}
          className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 active:scale-90 ${
            set.isCompleted
              ? 'bg-[#10B981] text-white shadow-glow-success ring-2 ring-[#10B981]/50'
              : 'bg-[#0F1726] text-[#94A3B8] border border-[#151F32] hover:border-[#2688FF]'
          }`}
        >
          <CheckIcon size={20} />
        </button>
      </div>

      {/* Zod Validation Error Feedback */}
      {!validation.isValid && validation.error && (
        <p className="text-[11px] text-[#EF4444] font-medium px-2">{validation.error}</p>
      )}
    </div>
  );
};
