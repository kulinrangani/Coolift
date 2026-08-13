import React, { useState, useEffect } from 'react';
import { PlusIcon, SkipIcon } from '../icons/Icons';

interface RestTimerProps {
  initialSeconds?: number;
  onFinish?: () => void;
  onSkip?: () => void;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialSeconds = 90,
  onFinish,
  onSkip,
}) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    setSecondsLeft(initialSeconds);
  }, [initialSeconds]);

  useEffect(() => {
    if (secondsLeft <= 0) {
      if (onFinish) onFinish();
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft, onFinish]);

  const handleAdd30Sec = () => {
    setSecondsLeft((prev) => prev + 30);
  };

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed bottom-20 left-4 right-4 max-w-md mx-auto z-40 bg-[#0F1726]/95 backdrop-blur-xl border border-[#2688FF]/40 rounded-2xl p-4 shadow-glow-primary animate-slide-up flex flex-col items-center justify-center">
      {/* Timer Display */}
      <div className="text-center mb-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-[#2688FF]">
          REST TIMER
        </span>
        <div className="text-4xl font-black tracking-tight text-white my-0.5 font-mono">
          {formatTime(secondsLeft)}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 w-full max-w-xs">
        <button
          type="button"
          onClick={handleAdd30Sec}
          className="flex-1 py-2.5 px-3 bg-[#151F32] hover:bg-[#1E2C44] text-[#2688FF] font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 border border-[#2688FF]/30"
        >
          <PlusIcon size={14} />
          <span>+30 sec</span>
        </button>

        <button
          type="button"
          onClick={onSkip}
          className="flex-1 py-2.5 px-3 bg-[#151F32] hover:bg-[#1E2C44] text-[#94A3B8] hover:text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-1 transition-all active:scale-95 border border-[#151F32]"
        >
          <SkipIcon size={14} />
          <span>Skip</span>
        </button>
      </div>
    </div>
  );
};
