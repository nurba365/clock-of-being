
import React from 'react';
import { GameStats } from '../types';

interface ClockHUDProps {
  hour: number;
  stats: GameStats;
}

export const ClockHUD: React.FC<ClockHUDProps> = ({ hour }) => {
  // Base rotation from game logic, but we'll add an overlaying continuous rotation effect
  const baseRotation = (hour / 24) * 360;

  return (
    <div className="relative w-full mx-auto h-auto min-h-[120px] md:min-h-[180px] flex items-center justify-center pointer-events-none select-none py-4">
      {/* CENTRAL DIAL ONLY */}
      <div className="relative flex-shrink-0 scale-90 sm:scale-100 md:scale-110">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#0d0d10] shadow-[0_0_70px_rgba(0,0,0,0.9),_inset_0_0_30px_rgba(212,175,55,0.05)] flex items-center justify-center overflow-hidden">
          {/* Elegant Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[1.5px] border-[#4a3a2a] ring-1 ring-[#d4af37]/25 shadow-[0_0_15px_rgba(212,175,55,0.1)]"></div>
          
          {/* Subtle Tick Marks */}
          <div className="absolute inset-0">
             <svg viewBox="0 0 100 100" className="w-full h-full opacity-40">
                {[...Array(12)].map((_, i) => (
                  <line 
                    key={i}
                    x1="50" y1="5" x2="50" y2="10"
                    stroke="#d4af37"
                    strokeWidth="0.6"
                    transform={`rotate(${i * 30} 50 50)`}
                  />
                ))}
             </svg>
          </div>

          {/* Pulsing Core Glow */}
          <div className="absolute inset-[25%] bg-[#d4af37]/8 rounded-full blur-2xl animate-pulse"></div>

          {/* Atmospheric Inner Detail */}
          <div className="absolute inset-0 opacity-15">
             <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_180s_linear_infinite]">
                <circle cx="50" cy="50" r="44" stroke="#d4af37" strokeWidth="0.2" strokeDasharray="1 4" fill="none"/>
             </svg>
          </div>

          {/* The Pointer Hand - Continuous Infinite Smooth Movement */}
          <div 
            className="absolute w-0.5 h-[42%] bg-gradient-to-t from-transparent via-[#d4af37] to-white/90 origin-bottom bottom-1/2 z-20"
            style={{ 
              animation: 'continuous-rotate 240s linear infinite',
              filter: 'drop-shadow(0 0 4px rgba(212,175,55,0.5))'
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#d4af37] rotate-45 border border-white/40 shadow-[0_0_5px_rgba(212,175,55,0.5)]"></div>
          </div>
          
          {/* Center Cap */}
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#050505] border border-[#d4af37]/70 z-30 shadow-md"></div>
        </div>
      </div>

      <style>{`
        @keyframes continuous-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
