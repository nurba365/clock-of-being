
import React, { useEffect, useState } from 'react';
import { MaslowLevel } from '../types';

interface MaslowPyramidProps {
  scores: Record<MaslowLevel, number>;
  dominant: MaslowLevel;
  isLight?: boolean;
}

export const MaslowPyramid: React.FC<MaslowPyramidProps> = ({ scores, dominant, isLight = false }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Super-saturated, vivid gradients with higher brightness for impact
  const levels: { id: MaslowLevel; label: string; color: string }[] = [
    { id: 'actualization', label: 'Быть довольным собой', color: 'from-[#FFEA00] via-[#FFC107] to-[#FF8F00]' },
    { id: 'esteem', label: 'Быть значимым и признанным', color: 'from-[#FF7043] via-[#F4511E] to-[#BF360C]' },
    { id: 'belonging', label: 'Близость и связь с людьми', color: 'from-[#EC4899] via-[#D946EF] to-[#86198F]' },
    { id: 'safety', label: 'Спокойствие и ощущение опоры', color: 'from-[#0EA5E9] via-[#2563EB] to-[#1E3A8A]' },
    { id: 'physiology', label: 'Комфорт и простые радости', color: 'from-[#10B981] via-[#059669] to-[#064E3B]' },
  ];

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] flex flex-col justify-end items-center gap-2 p-4">
      {/* Soft Ambient Glow behind the whole pyramid */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.15)_0%,_transparent_70%)] blur-[40px] pointer-events-none transition-opacity duration-1000 ${animate ? 'opacity-100' : 'opacity-0'}`} />

      {levels.map((level, idx) => {
        const isDominant = level.id === dominant;
        const width = 35 + (4 - idx) * 15; // 35% to 95%
        const score = scores[level.id];
        
        // Solid opacity for active layers to ensure vividness
        const opacity = score > 0 ? 1 : 0.1;

        return (
          <div
            key={level.id}
            className={`relative flex items-center justify-center transition-all duration-1000 ease-out overflow-hidden
              ${animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}
              ${isLight ? 'border-[#5c4033]/30 shadow-md' : 'border-white/10'}
            `}
            style={{
              width: `${width}%`,
              height: '16%',
              opacity: opacity,
              transitionDelay: `${(4 - idx) * 150}ms`,
              clipPath: 'polygon(8% 0%, 92% 0%, 100% 100%, 0% 100%)',
              backgroundColor: isLight 
                ? (isDominant ? 'rgba(212, 175, 55, 0.12)' : 'rgba(0, 0, 0, 0.05)')
                : (isDominant ? 'rgba(212, 175, 55, 0.25)' : 'rgba(255, 255, 255, 0.05)'),
              borderWidth: '1px'
            }}
          >
            {/* High-Contrast Vivid Fill */}
            <div 
              className={`absolute inset-0 bg-gradient-to-r ${level.color} transition-all duration-[2000ms] ease-out`}
              style={{ 
                width: animate ? `${Math.max(8, (score / 4) * 100)}%` : '0%', // Min 8% to show color even with low score
                opacity: isDominant ? 1 : 0.85
              }}
            />
            
            {/* Top Shine/Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-black/10 pointer-events-none" />

            {/* Changed font to font-serif, added italic and fixed color to dark mahogany/coffee */}
            <span className={`relative z-10 text-[11px] md:text-[13px] font-serif font-bold italic tracking-wider px-4 text-center transition-colors duration-500
              ${score > 0 ? 'text-[#1a0f0a]' : 'text-[#1a0f0a]/30'}
            `}
            >
              {level.label}
            </span>
            
            {isDominant && (
               <div className={`absolute inset-0 ring-2 ring-inset animate-pulse pointer-events-none ${isLight ? 'ring-white/60' : 'ring-yellow-400/40'}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
};
