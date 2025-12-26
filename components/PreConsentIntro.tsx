
import React, { useEffect, useState } from 'react';

interface PreConsentIntroProps {
  onComplete: () => void;
}

export const PreConsentIntro: React.FC<PreConsentIntroProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-void flex flex-col items-center justify-center overflow-hidden cinematic-noise">
      {/* Background Atmosphere consistent with BirthMoment */}
      <div className="absolute inset-0 cinematic-vignette z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#000000_100%)] opacity-40 z-[-1]"></div>

      <div className={`relative z-10 w-full max-w-2xl px-8 flex flex-col items-center justify-center text-center transition-all duration-[1500ms] ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        
        {/* Decorative divider */}
        <div className="w-12 h-[1px] bg-mystic-gold/40 mb-10"></div>

        <div className="space-y-8">
          <p className="text-xl md:text-2xl font-serif text-white leading-relaxed drop-shadow-lg">
            «Это симулятор-игра твоего последнего дня на Земле.»
          </p>
          
          <p className="text-xl md:text-2xl font-serif text-white leading-relaxed drop-shadow-lg">
            «Здесь нет “правильных” и “неправильных” ответов.»
          </p>

          <p className="text-xl md:text-2xl font-serif text-white leading-relaxed drop-shadow-lg">
            «Каждый выбор — это отражение того, что для тебя действительно важно.»
          </p>
        </div>

        {/* Decorative divider */}
        <div className="w-12 h-[1px] bg-mystic-gold/40 mt-10"></div>

        <button 
          onClick={() => { setVisible(false); setTimeout(onComplete, 800); }}
          className="mt-16 group relative px-14 py-4 bg-transparent border border-mystic-gold/30 text-mystic-gold text-[11px] uppercase tracking-[0.5em] font-bold hover:bg-mystic-gold hover:text-black transition-all duration-500 rounded-sm shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.25)]"
        >
          <span className="relative z-10">ПРОДОЛЖИТЬ</span>
          <div className="absolute inset-0 w-full h-full bg-mystic-gold opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none"></div>
        </button>
      </div>
    </div>
  );
};
