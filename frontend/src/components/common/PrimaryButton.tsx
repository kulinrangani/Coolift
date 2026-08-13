import React from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger' | 'ghost' | 'outline';
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  children: React.ReactNode;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  variant = 'primary',
  fullWidth = true,
  size = 'md',
  icon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-sans font-bold tracking-tight rounded-xl transition-all duration-200 active:scale-[0.98] select-none touch-manipulation min-h-[44px] shadow-sm';
  
  const sizeStyles = {
    sm: 'px-3 py-2 text-sm gap-1.5',
    md: 'px-4 py-3 text-base gap-2',
    lg: 'px-6 py-4 text-lg gap-2.5 min-h-[52px]',
  };

  const variantStyles = {
    primary: 'bg-[#2688FF] text-white hover:bg-[#1A77ED] active:bg-[#0F66DC] shadow-glow-primary',
    secondary: 'bg-[#06B6D4] text-white hover:bg-[#08A4C0] active:bg-[#0891B2]',
    accent: 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] active:bg-[#6D28D9]',
    danger: 'bg-[#EF4444] text-white hover:bg-[#DC2626] active:bg-[#B91C1C]',
    ghost: 'bg-[#151F32] text-[#F8FAFC] hover:bg-[#1E2C44] active:bg-[#253754]',
    outline: 'border border-[#151F32] text-[#F8FAFC] hover:bg-[#0F1726] active:bg-[#151F32]',
  };

  const widthStyle = fullWidth ? 'w-full' : 'w-auto';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed active:scale-100' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${disabledStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
