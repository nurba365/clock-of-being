
import React, { useEffect, useState } from 'react';

export const AwakeningBackground: React.FC = () => {
  const [stage, setStage] = useState<'closed' | 'opening' | 'rubbing' | 'clear'>('closed');

  useEffect(() => {
    // Cinematic sequence timing
    const timers = [
      setTimeout(() => setStage('opening'), 300),   // Start opening eyes
      setTimeout(() => setStage('rubbing'), 1500),  // Brief blur adjustment
      setTimeout(() => setStage('clear'), 3000),    // Fully settled focus
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const imageUrl = "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000";

  return (
    <div className="fixed inset-0 z-0 bg-white overflow-hidden select-none">
      <style>{`
        @keyframes curtainSway {
          0%   { transform: translateX(0px) rotate(0deg); }
          50%  { transform: translateX(-20px) rotate(0.5deg); }
          100% { transform: translateX(0px) rotate(0deg); }
        }

        @keyframes float-dust-morning {
          0% { transform: translate(0, 0); opacity: 0; }
          20% { opacity: 0.4; }
          80% { opacity: 0.4; }
          100% { transform: translate(-40px, -100px); opacity: 0; }
        }

        .animate-curtain-sway {
          animation: curtainSway 8s ease-in-out infinite;
          will-change: transform;
        }
      `}</style>

      {/* 1. PRIMARY BACKGROUND IMAGE */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-[2500ms] ease-out
          ${stage === 'closed' ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}
          ${stage === 'opening' ? 'blur-xl' : stage === 'rubbing' ? 'blur-md' : 'blur-0'}
          brightness-110
        `}
        style={{ 
          backgroundImage: `url('${imageUrl}')`,
        }}
      />

      {/* 2. SIMPLE MOVING CURTAINS (RIGHT SIDE) */}
      <div className={`absolute right-0 top-0 bottom-0 w-[30%] z-20 pointer-events-none transition-opacity duration-[3000ms] ${stage === 'closed' ? 'opacity-0' : 'opacity-100'}`}>
        <div 
          className="absolute right-0 top-0 h-full w-full bg-white/90 shadow-[-10px_0_30px_rgba(0,0,0,0.1)] animate-curtain-sway origin-top-right"
          style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 20% 100%)' }}
        >
          {/* Fabric texture and folds */}
          <div className="w-full h-full bg-[linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.03)_50%,transparent_100%)] opacity-50" />
          <div className="absolute inset-0 border-r-4 border-white/50" />
        </div>
      </div>

      {/* 3. EYE OPENING TRANSITION OVERLAY */}
      <div className="absolute inset-0 z-50 pointer-events-none">
        <div 
          className="h-1/2 w-full bg-black transition-transform duration-[1800ms] ease-in-out origin-top"
          style={{ transform: stage === 'closed' ? 'scaleY(1)' : 'scaleY(0)' }}
        />
        <div 
          className="h-1/2 w-full bg-black transition-transform duration-[1800ms] ease-in-out origin-bottom"
          style={{ transform: stage === 'closed' ? 'scaleY(1)' : 'scaleY(0)' }}
        />
      </div>

      {/* 4. ATMOSPHERIC PARTICLES */}
      <div className={`absolute inset-0 z-25 pointer-events-none transition-opacity duration-[4000ms] ${stage === 'clear' ? 'opacity-30' : 'opacity-0'}`}>
         {[...Array(12)].map((_, i) => (
           <div 
             key={i}
             className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px]"
             style={{
               left: `${Math.random() * 100}%`,
               top: `${Math.random() * 100}%`,
               animation: `float-dust-morning ${10 + Math.random() * 10}s linear infinite`,
               animationDelay: `${Math.random() * 5}s`
             }}
           />
         ))}
      </div>
    </div>
  );
};
