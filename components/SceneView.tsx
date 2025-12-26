
import React, { useEffect, useState } from 'react';
import { Scene, Choice } from '../types';

interface SceneViewProps {
  scene: Scene;
  onChoiceSelected: (choice: Choice) => void;
  isFadingOut: boolean;
}

export const SceneView: React.FC<SceneViewProps> = ({ scene, onChoiceSelected, isFadingOut }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, [scene]);

  return (
    <div className={`relative z-10 w-full max-w-2xl mx-auto px-4 py-8 flex flex-col justify-center min-h-[60vh] transition-all duration-700 transform ${isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
      
      {/* Glass Card Container */}
      <div className="bg-void-900/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-2xl ring-1 ring-white/5">
        
        {/* Time Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/30 rounded-full border border-white/10 text-mystic-gold text-xs font-bold uppercase tracking-[0.2em] shadow-inner">
             <span>{scene.hour}:00</span>
             <span className="w-1 h-1 rounded-full bg-mystic-gold animate-pulse"></span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-5xl text-center font-serif text-white font-medium tracking-tight leading-tight mb-8 drop-shadow-lg">
          {scene.title}
        </h2>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-gray-400 to-transparent mx-auto mb-8 opacity-50"></div>

        {/* Narrative Description */}
        <div className="mb-10 prose prose-invert prose-lg mx-auto text-center font-serif text-gray-100 leading-relaxed drop-shadow-md">
          <p>{scene.description}</p>
        </div>

        {/* Choices Grid */}
        <div className="space-y-3">
          {scene.choices.map((choice, idx) => (
            <button
              key={choice.id}
              onClick={() => onChoiceSelected(choice)}
              className="group w-full text-left p-4 md:p-5 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 hover:border-mystic-gold/50 transition-all duration-300 flex flex-col relative overflow-hidden active:scale-[0.99]"
              style={{ 
                animation: `fadeInUp 0.5s ease-out forwards`,
                animationDelay: `${idx * 150}ms`,
                opacity: 0 // handled by animation
              }}
            >
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-mystic-gold/0 via-mystic-gold/5 to-mystic-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
              
              <div className="relative z-10 flex items-baseline justify-between gap-4">
                <span className="text-lg font-medium text-gray-100 group-hover:text-white transition-colors">
                  {choice.text}
                </span>
                <span className="hidden md:inline-block opacity-0 group-hover:opacity-100 text-mystic-gold transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  →
                </span>
              </div>
              
              {choice.flavor && (
                <span className="relative z-10 block text-sm text-gray-400 font-serif italic mt-1 group-hover:text-gray-300 transition-colors">
                  "{choice.flavor}"
                </span>
              )}
            </button>
          ))}
        </div>

      </div>
      
      {/* Keyframes for animations defined inline for simplicity or usually in global css */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
