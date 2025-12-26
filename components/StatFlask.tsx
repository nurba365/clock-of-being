
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatFlaskProps {
  label: string;
  value: number; // 0-100
  icon: React.ReactNode;
  colorClass: string; // Tailwind bg color for the liquid (e.g. 'bg-blue-500')
  previewDiff?: number; // The potential change (e.g. +10 or -5)
  isProminent?: boolean; // For "Meaning" or other emphasized stats
}

export const StatFlask: React.FC<StatFlaskProps> = ({ 
  label, 
  value, 
  icon, 
  colorClass, 
  previewDiff = 0,
  isProminent = false
}) => {
  // Clamp base value
  const currentHeight = Math.min(100, Math.max(0, value));
  
  // Calculate preview height
  // If gain: we stack a "ghost" bar on top of current
  // If loss: we turn the top part of current into "danger" color
  
  const isGain = previewDiff > 0;
  const isLoss = previewDiff < 0;
  const absDiff = Math.abs(previewDiff) * 5; // Assuming multiplier 5 from App logic
  
  // Visual calculation
  // Total height of the container is fixed (e.g., 64px or 80px)
  
  return (
    <div className={`flex flex-col items-center gap-2 transition-all duration-300 ${isProminent ? 'scale-110' : 'scale-100'}`}>
      
      {/* Label & Icon */}
      <div className="flex flex-col items-center text-center">
        <div className={`p-1.5 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-gray-300 shadow-[0_0_10px_rgba(0,0,0,0.5)] ${isProminent ? 'text-mystic-gold border-mystic-gold/30' : ''}`}>
          {icon}
        </div>
        <span className="text-[10px] uppercase tracking-widest text-gray-400 mt-1 font-bold drop-shadow-md">{label}</span>
      </div>

      {/* The Flask Container */}
      <div className="relative w-8 h-24 bg-void-900/50 rounded-full border border-white/10 shadow-inner overflow-hidden ring-1 ring-white/5 backdrop-blur-sm">
        
        {/* Glass Reflection (Static) */}
        <div className="absolute top-2 left-1.5 w-1 h-8 bg-white/10 rounded-full z-20 pointer-events-none"></div>

        {/* Base Liquid */}
        <div 
          className={`absolute bottom-0 left-0 w-full transition-all duration-700 ease-out z-10 ${colorClass} opacity-80`}
          style={{ 
            height: `${currentHeight}%`,
            boxShadow: `0 0 15px ${colorClass === 'bg-mystic-gold' ? '#d4af37' : 'currentColor'}`
          }}
        >
            {/* Bubbles effect */}
            <div className="absolute w-full h-full opacity-30" 
                 style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.4) 1px, transparent 1px)', backgroundSize: '4px 4px' }}>
            </div>
            
            {/* Liquid Surface Line */}
            <div className="absolute top-0 w-full h-[2px] bg-white/50"></div>
        </div>

        {/* PREVIEW: GAIN (Ghost Green) */}
        {isGain && (
           <div 
             className="absolute left-0 w-full bg-green-400/50 animate-pulse z-10 border-b border-green-200/50"
             style={{ 
               bottom: `${currentHeight}%`, 
               height: `${Math.min(100 - currentHeight, absDiff)}%` 
             }}
           />
        )}

        {/* PREVIEW: LOSS (Flashing Red overlay on the existing liquid) */}
        {isLoss && (
           <div 
             className="absolute left-0 w-full bg-red-600/60 animate-pulse z-15"
             style={{ 
               bottom: `${Math.max(0, currentHeight - absDiff)}%`,
               height: `${Math.min(currentHeight, absDiff)}%` 
             }}
           />
        )}
      </div>

      {/* Floating Indicator Arrows */}
      <div className="h-4 flex items-center justify-center">
        {isGain && <ArrowUp size={14} className="text-green-400 animate-bounce" />}
        {isLoss && <ArrowDown size={14} className="text-red-500 animate-bounce" />}
        {!isGain && !isLoss && <span className="text-[10px] font-mono text-gray-500">{Math.round(value)}</span>}
      </div>

    </div>
  );
};
