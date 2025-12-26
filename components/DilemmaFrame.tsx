
import React, { useEffect, useState } from 'react';
import { Scene, Choice } from '../types';

interface DilemmaFrameProps {
  scene: Scene;
  onChoiceSelected: (choice: Choice) => void;
  isFadingOut: boolean;
}

export const DilemmaFrame: React.FC<DilemmaFrameProps> = ({ 
  scene, 
  onChoiceSelected, 
  isFadingOut 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [scene]);

  return (
    <div className={`relative w-full max-w-2xl mx-auto transition-all duration-700 transform ${isFadingOut ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'}`}>
      
      {/* --- ORNATE FRAME CONTAINER --- */}
      <div className="relative bg-[#0d0d0d]/90 backdrop-blur-md shadow-[0_15px_70px_rgba(0,0,0,0.8)] rounded-sm overflow-hidden group">
        
        <div className="absolute inset-0 border-[3px] border-[#5c4033] z-20 pointer-events-none"></div>
        <div className="absolute inset-[3px] border-[1px] border-[#d4af37]/40 z-20 pointer-events-none"></div>
        
        <div className="relative p-6 md:p-10 z-0 bg-transparent">
          <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]"></div>
          
          <div className="relative z-10 text-center">
             <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#d4af37]/50"></div>
                <h2 className="text-xs uppercase tracking-[0.3em] text-[#d4af37] font-serif font-bold">{scene.title}</h2>
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#d4af37]/50"></div>
             </div>
             
             <div className="mb-10 font-serif text-lg md:text-xl text-[#f2f2f2] leading-relaxed px-2">
               <p>{scene.description}</p>
             </div>

             <div className="grid gap-3">
               {scene.choices.map((choice, idx) => (
                 <button
                   key={choice.id}
                   onClick={() => onChoiceSelected(choice)}
                   className="group relative w-full text-left p-4 md:p-5 transition-all duration-300 overflow-hidden"
                   style={{ 
                    animation: `slideUp 0.5s ease-out forwards`,
                    animationDelay: `${idx * 150}ms`,
                    opacity: 0 
                   }}
                 >
                   <div className="absolute inset-0 bg-[#24242b]/60 border border-[#3a3a40] group-hover:border-[#d4af37]/60 transition-colors"></div>
                   <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-[#d4af37] via-transparent to-transparent transition-opacity duration-500"></div>

                   <div className="relative z-10 flex flex-col gap-1 pl-2 border-l-2 border-transparent group-hover:border-[#d4af37] transition-all">
                      <div className="flex justify-between items-baseline">
                        <span className="text-gray-200 group-hover:text-[#ffe4b5] font-serif text-base md:text-lg transition-colors">
                          {choice.text}
                        </span>
                        <span className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 text-[#d4af37] text-sm">►</span>
                      </div>
                      {choice.flavor && (
                        <span className="text-[11px] text-gray-400 group-hover:text-[#8B4513] italic font-serif transition-colors mt-0.5">
                          {choice.flavor}
                        </span>
                      )}
                   </div>
                 </button>
               ))}
             </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
