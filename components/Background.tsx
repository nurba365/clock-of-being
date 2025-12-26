
import React from 'react';

interface BackgroundProps {
  sceneIndex: number; // 0..8
}

export const Background: React.FC<BackgroundProps> = ({ sceneIndex }) => {
  // Strict deterministic mapping (0=Q1/8:00, 1=Q2/10:00, 2=Q3/12:00, 3=Q4/14:00, 4=Q5/16:00, 5=Q6/18:00, 6=Q7/20:00, 7=Q8/22:00, 8=Q9/24:00)
  const backgroundByQuestionIndex: Record<number, string> = {
    0: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=2000", // Q1: Awakening
    1: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=2000", // Q2: 10:00 - Entrance/Ready
    2: "https://images.unsplash.com/photo-1544787210-282aa744ca32?auto=format&fit=crop&q=80&w=2000", // Q3: 12:00 - Midday/Tea
    3: "https://images.unsplash.com/photo-1517733948473-efec90d1104e?auto=format&fit=crop&q=80&w=2000", // Q4: 14:00 - City/Freedom
    4: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=2000", // Q5: 16:00 - Writing/Desk
    5: "https://images.unsplash.com/photo-1536882247184-57481f433bc0?auto=format&fit=crop&q=80&w=2000", // Q6: 18:00 - Conversation/Two cups
    6: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=2000", // Q7: 20:00 - Evening/Blanket
    7: "https://images.unsplash.com/photo-1505691938895-1758d7eaa511?auto=format&fit=crop&q=80&w=2000", // Q8: 22:00 - Memory/Photos
    8: "https://images.unsplash.com/photo-1533135091724-62cc5402aa20?auto=format&fit=crop&q=80&w=2000", // Q9: 24:00 - Night/City
  };

  const currentImageUrl = backgroundByQuestionIndex[sceneIndex] || backgroundByQuestionIndex[0];

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black overflow-hidden">
      {/* Background Image Layer */}
      <div 
        key={currentImageUrl}
        className="absolute inset-0 bg-cover bg-center transition-all duration-[2000ms] ease-in-out"
        style={{ 
          backgroundImage: `url("${currentImageUrl}")`,
          filter: 'brightness(0.6) contrast(1.1)'
        }}
      />

      {/* --- LIVE OVERLAYS --- */}
      
      {/* Q2: Entrance Light sweep */}
      {sceneIndex === 1 && <div className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-light-sweep" />}

      {/* Q3: Midday Dust */}
      {sceneIndex === 2 && (
        <div className="absolute inset-0 z-10 opacity-30">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full blur-[1px] animate-dust-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Q5: Device/Phone flicker */}
      {sceneIndex === 4 && <div className="absolute inset-0 z-10 bg-blue-500/5 animate-pulse-gentle mix-blend-screen" />}

      {/* Q7: Cozy Lamp pulse */}
      {sceneIndex === 6 && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
           <div className="w-[800px] h-[800px] bg-orange-900/10 rounded-full blur-[120px] animate-pulse-slow" />
        </div>
      )}

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 cinematic-vignette z-20" />
      
      {/* Film Grain/Noise */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-30" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} 
      />

      <style>{`
        @keyframes light-sweep {
          0% { transform: translateX(-100%) skewX(20deg); }
          100% { transform: translateX(200%) skewX(20deg); }
        }
        @keyframes dust-float-slow {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { opacity: 0.5; }
          100% { transform: translate(-20px, -40px); opacity: 0; }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
        .animate-light-sweep { animation: light-sweep 10s linear infinite; }
        .animate-dust-float-slow { animation: dust-float-slow linear infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
