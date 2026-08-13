import React from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  accentColor?: string; // e.g. '#2688FF', '#10B981', '#F59E0B'
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  subtitle,
  icon,
  accentColor = '#2688FF',
}) => {
  return (
    <div className="bg-[#0F1726] border border-[#151F32] rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden transition-all duration-200 hover:border-[#1E2C44]">
      {/* Top row: Label & Icon */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">{label}</span>
        {icon && (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${accentColor}1F`, color: accentColor }}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Value row */}
      <div className="flex items-baseline gap-1 mt-1">
        <span className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight">{value}</span>
        {unit && <span className="text-sm font-semibold text-[#94A3B8]">{unit}</span>}
      </div>

      {/* Subtitle */}
      {subtitle && <p className="text-xs text-[#94A3B8] mt-1 font-medium">{subtitle}</p>}

      {/* Accent glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ backgroundColor: accentColor }}
      />
    </div>
  );
};
