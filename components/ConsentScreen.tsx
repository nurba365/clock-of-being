
import React, { useState } from "react";
import { ShieldCheck, FileText, UserPlus, Info } from "lucide-react";

interface ConsentScreenProps {
  onComplete: (agreed: boolean) => void;
}

export const ConsentScreen: React.FC<ConsentScreenProps> = ({ onComplete }) => {
  const [choice, setChoice] = useState<"yes" | "no" | null>(null);

  const clauses = [
    {
      icon: <FileText className="w-5 h-5 text-mystic-gold" />,
      title: "Цель исследования",
      text: "Анализ игровых решений для понимания ценностей."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-mystic-gold" />,
      title: "Анонимность",
      text: "Мы не храним ваши персональные данные."
    },
    {
      icon: <UserPlus className="w-5 h-5 text-mystic-gold" />,
      title: "Добровольность",
      text: "Вы можете отказаться от передачи данных."
    }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-void/90 backdrop-blur-md cinematic-noise">
      {/* Container resized to max-w-[310px] for a more compact and refined look */}
      <div className="w-full max-w-[310px] bg-[#080808] border border-white/10 rounded-sm overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.9)] relative animate-fade-in">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-mystic-gold to-transparent" />

        {/* HEADER */}
        <div className="p-5 pt-8 text-center border-b border-white/5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-mystic-gold/30 bg-mystic-gold/5 mb-3 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            <Info className="text-mystic-gold w-6 h-6" />
          </div>
          <h2 className="text-xl font-serif font-bold text-white uppercase tracking-[0.15em]">
            Согласие
          </h2>
          <p className="text-[9px] text-gray-500 uppercase tracking-[0.3em] mt-1.5 font-black opacity-60">Протокол 0-1</p>
        </div>

        {/* CONTENT */}
        <div className="p-5 space-y-5">
          {clauses.map((clause, idx) => (
            <div 
              key={idx} 
              className="relative group flex gap-3 transition-all duration-500 items-start"
            >
              <div className="flex-shrink-0 mt-0.5">
                {clause.icon}
              </div>
              <div className="space-y-0.5">
                <h3 className="text-[11px] uppercase tracking-widest text-mystic-gold font-black">
                  {clause.title}
                </h3>
                <p className="text-[13px] text-gray-200 leading-snug font-serif">
                  {clause.text}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-2 pt-3 text-center border-t border-white/5">
            <p className="text-xs font-serif italic text-gray-400">
              Разрешить анонимный анализ?
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="px-5 pb-8 space-y-3">
          <div className="flex gap-2">
            <button
              className={`flex-1 py-3 px-2 border transition-all duration-500 font-serif text-xs font-bold uppercase tracking-widest ${
                choice === "yes" 
                  ? "border-mystic-gold bg-mystic-gold/20 text-white shadow-[0_0_10px_rgba(212,175,55,0.15)]" 
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30"
              }`}
              onClick={() => setChoice("yes")}
            >
              Да
            </button>

            <button
              className={`flex-1 py-3 px-2 border transition-all duration-500 font-serif text-xs font-bold uppercase tracking-widest ${
                choice === "no" 
                  ? "border-mystic-gold bg-mystic-gold/20 text-white shadow-[0_0_10px_rgba(212,175,55,0.15)]" 
                  : "border-white/10 bg-white/5 text-gray-400 hover:border-white/30"
              }`}
              onClick={() => setChoice("no")}
            >
              Нет
            </button>
          </div>

          <button
            className={`w-full py-4 font-bold uppercase tracking-[0.4em] text-[10px] transition-all duration-700 relative overflow-hidden active:scale-[0.97] ${
              choice 
                ? "bg-mystic-gold text-black shadow-[0_10px_30px_rgba(212,175,55,0.3)] hover:brightness-110" 
                : "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
            }`}
            disabled={!choice}
            onClick={() => choice && onComplete(choice === "yes")}
          >
            Подтвердить
            {choice && (
              <div className="absolute inset-0 bg-white/40 animate-pulse pointer-events-none" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
