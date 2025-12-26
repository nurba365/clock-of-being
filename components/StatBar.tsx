import React from 'react';

interface StatBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  colorClass: string;
}

export const StatBar: React.FC<StatBarProps> = ({ label, value, icon, colorClass }) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className="flex flex-col gap-1 w-full max-w-[100px] sm:max-w-none">
      <div className="flex items-center justify-between text-xs text-gray-400 uppercase tracking-widest">
        <span className="flex items-center gap-1">
          {icon}
          <span className="hidden sm:inline">{label}</span>
        </span>
        <span className="font-mono">{clampedValue}</span>
      </div>
      <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
        <div 
          className={`h-full ${colorClass} transition-all duration-700 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
    </div>
  );
};