
import React, { useEffect, useState } from 'react';
import { SkipForward } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // 0:00 - 0:05: Black
    // 0:05 - 2:00: Birth of Mechanism (Outline -> Gears)
    // 2:00 - 4:00: Quote 1 "Жизнь — это не те дни..."
    // 4:00 - 6:00: Quote 2 "...но те, что запомнились."
    // 6:00 - 7:50: Essence Flash "Они измеряют суть."
    // 7:50 - 8:50: Transition

    const schedule = [
      { time: 50, action: () => setScene(1) },   // Start Outline
      { time: 2000, action: () => setScene(2) }, // Quote 1
      { time: 4000, action: () => setScene(3) }, // Quote 2
      { time: 6000, action: () => setScene(4) }, // Essence Flash
      { time: 7500, action: () => setScene(5) }, // Transition start
      { time: 8500, action: onComplete }         // End
    ];

    const timers = schedule.map(item => setTimeout(item.action, item.time));
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050505] z-50 flex items-center justify-center overflow-hidden font-serif select-none">
      
      {/* Skip Button */}
      <button
        onClick={onComplete}
        className="absolute top-8 right-8 text-mystic-gold/50 hover:text-mystic-gold transition-colors z-[60] flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase border border-mystic-gold/20 px-3 py-1 rounded-full hover:bg-mystic-gold/10"
      >
        Пропустить <SkipForward size={12} />
      </button>

      {/* --- SCENE 5 TRANSITION (Implosion) --- */}
      <div 
        className={`relative flex items-center justify-center transition-all duration-1000 ease-in-out
          ${scene === 5 ? 'scale-0 opacity-0 rotate-180 blur-xl' : 'scale-100 opacity-100 blur-0'}
        `}
      >

        {/* --- SCENE 4 FLASH OVERLAY --- */}
        <div className={`absolute -inset-[200%] bg-mystic-gold mix-blend-overlay radial-gradient transition-opacity duration-300 ease-out z-40 pointer-events-none
           ${scene === 4 ? 'opacity-80' : 'opacity-0'}
        `} />

        {/* --- CLOCK MECHANISM CONTAINER --- */}
        <div className="relative w-[340px] h-[340px] md:w-[500px] md:h-[500px]">
          
          {/* Inner Heat / Halo (Orange Glow) */}
          <div 
            className={`absolute inset-0 bg-orange-500/10 rounded-full blur-[60px] transition-all duration-3000
              ${scene >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
            `} 
          />

          {/* Golden Outline Animation (Birth) */}
          <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none" viewBox="0 0 100 100">
             <circle 
                cx="50" cy="50" r="48" 
                fill="none" 
                stroke="#d4af37" 
                strokeWidth="0.5"
                className={`transition-all duration-[2000ms] ease-out
                  ${scene >= 1 ? 'stroke-dasharray-complete opacity-100' : 'stroke-dasharray-empty opacity-0'}
                `}
                style={{ strokeDasharray: 302, strokeDashoffset: scene >= 1 ? 0 : 302 }}
             />
          </svg>

          {/* --- GEARS (Visualizing Complexity) --- */}
          <div className={`absolute inset-0 transition-all duration-[2000ms] ${scene >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
             
             {/* Outer Bronze Ring */}
             <div className="absolute inset-0 rounded-full border border-[#8B4513]/30 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]"></div>

             {/* Gear 1: Big Slow (Clockwise) */}
             <div className={`absolute inset-[5%] animate-[spin_20s_linear_infinite] ${scene >= 4 ? 'duration-[1s]' : ''}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#5c4033]">
                  <path d="M50 2 L50 15 M50 85 L50 98 M2 50 L15 50 M85 50 L98 50" stroke="currentColor" strokeWidth="2" />
                  <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1" strokeDasharray="1 3" fill="none" opacity="0.6" />
                </svg>
             </div>

             {/* Gear 2: Middle Gold (Counter-Clockwise) */}
             <div className={`absolute inset-[18%] animate-[spin_15s_linear_infinite_reverse] ${scene >= 4 ? 'duration-[1s]' : ''}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full text-mystic-gold">
                   <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
                   <path d="M50 10 L50 90 M10 50 L90 50 M22 22 L78 78 M22 78 L78 22" stroke="currentColor" strokeWidth="4" opacity="0.1" />
                   <circle cx="50" cy="50" r="32" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" fill="none" opacity="0.8" />
                </svg>
             </div>

             {/* Gear 3: Inner Fast (Clockwise) */}
             <div className={`absolute inset-[32%] animate-[spin_8s_linear_infinite] ${scene >= 4 ? 'duration-[0.5s]' : ''}`}>
                <svg viewBox="0 0 100 100" className="w-full h-full text-[#cd7f32]">
                   <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="8" strokeDasharray="10 2" fill="none" opacity="0.2" />
                   <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" />
                   <circle cx="50" cy="50" r="5" fill="#d4af37" />
                </svg>
             </div>
          </div>

          {/* --- TEXT LAYERS --- */}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center z-30 text-center pointer-events-none p-8">
            
            {/* SCENE 2: Quote Part 1 (Heavy Gold Engraving) */}
            <div className={`transition-all duration-1000 transform
               ${scene === 2 || scene === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
               ${scene >= 4 ? 'scale-110 opacity-0 blur-md' : ''}
            `}>
              <h2 className="text-xl md:text-3xl font-serif font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#d4af37] to-[#8B4513] drop-shadow-lg"
                  style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                «Жизнь — это не те дни, что прошли...»
              </h2>
            </div>

            {/* SCENE 3: Quote Part 2 (Thin Signature) */}
            <div className={`mt-8 transition-all duration-1000 transform
               ${scene === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
               ${scene >= 4 ? 'scale-110 opacity-0 blur-md' : ''}
            `}>
              <p className="text-xl md:text-3xl text-[#ffe4b5] italic font-light tracking-wider drop-shadow-md">
                ...но те, что запомнились.
              </p>
            </div>

            {/* SCENE 4: KEY ESSENCE (Pulsating Flash) */}
            <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 transform
               ${scene === 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}>
               <div className="relative">
                 {/* Glow behind text */}
                 <div className="absolute inset-0 bg-mystic-gold/20 blur-[40px] rounded-full animate-pulse"></div>
                 
                 <h1 className="relative text-2xl md:text-4xl font-serif font-black text-[#fff8e1] tracking-[0.25em] uppercase text-center leading-snug drop-shadow-[0_0_15px_rgba(212,175,55,0.8)] border-y border-mystic-gold/30 py-4">
                   Они измеряют<br/>суть.
                 </h1>
               </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
