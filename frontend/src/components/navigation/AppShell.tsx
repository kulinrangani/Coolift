import React from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#070B14] text-[#F8FAFC] flex justify-center font-sans antialiased selection:bg-[#2688FF] selection:text-white">
      {/* Centered Mobile Shell Container for phone 360-430px */}
      <div className="w-full max-w-md min-h-screen flex flex-col bg-[#070B14] shadow-2xl relative pb-24 border-x border-[#151F32]/50">
        {children}
      </div>
    </div>
  );
};
