import React from 'react';
import { DumbbellIcon } from '../icons/Icons';
import { PrimaryButton } from './PrimaryButton';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionText?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  icon = <DumbbellIcon size={48} color="#2688FF" />,
  actionText,
  onAction,
}) => {
  return (
    <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-8 text-center flex flex-col items-center justify-center my-4">
      <div className="w-16 h-16 rounded-2xl bg-[#151F32] flex items-center justify-center mb-4 shadow-inner">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-[#F8FAFC] mb-1">{title}</h3>
      <p className="text-sm text-[#94A3B8] max-w-xs mb-6">{description}</p>
      {actionText && onAction && (
        <div className="w-full max-w-xs">
          <PrimaryButton onClick={onAction}>{actionText}</PrimaryButton>
        </div>
      )}
    </div>
  );
};
