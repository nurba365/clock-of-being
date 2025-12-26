
import React, { useEffect, useState } from 'react';

interface BirthMomentProps {
  onComplete: () => void;
}

export const BirthMoment: React.FC<BirthMomentProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-void flex flex-col items-center justify-center overflow-hidden cinematic-noise">
      
      {/* Background Atmosphere - Shared ScreenFrame Style */}
      <div className="absolute inset-0 cinematic-vignette z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#2a2a4e_0%,_#000000_100%)] opacity-35 z-[-1]"></div>

      {/* Main Container */}
      <div className={`relative z-10 flex flex-col items-center justify-center transition-all duration-[2000ms] ease-out ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        
        {/* The Dial of Being - Styled to match Title Screen Clock aesthetic */}
        <div className="relative w-64 h-64 md:w-96 md:h-96 mb-12 flex items-center justify-center">
           {/* Pulsing Aura */}
           <div className="absolute inset-0 rounded-full bg-mystic-gold/8 blur-3xl animate-pulse-slow"></div>
           <div className="absolute inset-0 bg-mystic-gold/15 rounded-full blur-[90px] animate-glow"></div>
           
           {/* SVG Clock - Refined Gold Lines */}
           <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_35px_rgba(212,175,55,0.25)]">
              {/* Outer Decorative Rings */}
              <circle cx="100" cy="100" r="98" fill="none" stroke="#5c4033" strokeWidth="0.5" opacity="0.4" />
              <circle cx="100" cy="100" r="92" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="1 3" opacity="0.3" />
              
              {/* Scale marks */}
              {[...Array(60)].map((_, i) => (
                <line 
                  key={i}
                  x1="100" y1="12" x2="100" y2={i % 5 === 0 ? "22" : "16"}
                  stroke={i % 5 === 0 ? "#d4af37" : "#5c4033"}
                  strokeWidth={i % 5 === 0 ? "0.8" : "0.3"}
                  transform={`rotate(${i * 6} 100 100)`}
                  opacity={i % 5 === 0 ? "0.7" : "0.3"}
                />
              ))}

              {/* Inner Decorative Gears Animation */}
              <g className="animate-spin-slow origin-center opacity-10">
                 <circle cx="100" cy="100" r="65" fill="none" stroke="#d4af37" strokeWidth="0.5" strokeDasharray="15 5" />
                 <path d="M100 20 L100 180 M20 100 L180 100" stroke="#d4af37" strokeWidth="0.2" />
              </g>

              {/* The Central Hand - Smooth Continuous Rotation */}
              <g className="origin-center">
                 <line x1="100" y1="100" x2="100" y2="30" stroke="#d4af37" strokeWidth="1.2" strokeLinecap="round" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]">
                    <animateTransform 
                      attributeName="transform" 
                      type="rotate" 
                      from="0 100 100" 
                      to="360 100 100" 
                      dur="120s" 
                      repeatCount="indefinite" 
                      calcMode="linear"
                    />
                 </line>
                 <circle cx="100" cy="100" r="3.5" fill="#d4af37" />
                 <circle cx="100" cy="100" r="1.5" fill="black" />
              </g>
           </svg>
        </div>

        {/* Text Section - Styled to match Title Screen typography */}
        <div className="text-center space-y-6 max-w-xl px-8">
           <div className="space-y-2">
             <h1 className="text-3xl md:text-5xl font-serif font-bold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-mystic-gold via-gold-light to-mystic-gold uppercase drop-shadow-sm">
               Крайний день перед смертью
             </h1>
           </div>
           
           <p className="text-lg md:text-xl text-gray-200 italic font-light leading-relaxed max-w-md mx-auto opacity-95">
             Вы проживаете последний день вашей жизни, каждый ваш выбор — отражение ценностей.
           </p>
        </div>

        {/* Action Button - Identical to Title Screen button style */}
        <button 
          onClick={() => { setVisible(false); setTimeout(onComplete, 1200); }}
          className="mt-14 group relative px-12 py-4 bg-transparent border border-mystic-gold/30 text-mystic-gold text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-mystic-gold hover:text-black transition-all duration-500 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]"
        >
          <span className="relative z-10 flex items-center gap-3">
            НАЧАТЬ ДЕНЬ
          </span>
          <div className="absolute inset-0 w-full h-full bg-mystic-gold opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
        </button>

      </div>
    </div>
  );
};
