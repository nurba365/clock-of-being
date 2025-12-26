
import React, { useState, useEffect, useMemo } from 'react';
import { INITIAL_STATS, SCENES } from './constants';
import { GameStats, GamePhase, Choice, PlayerProfile, Gender, MaslowLevel, ChoiceRecord } from './types';
import { DilemmaFrame } from './components/DilemmaFrame';
import { ClockHUD } from './components/ClockHUD';
import { Background } from './components/Background';
import { AwakeningBackground } from './components/AwakeningBackground';
import { IntroSequence } from './components/IntroSequence';
import { BirthMoment } from './components/BirthMoment';
import { PreConsentIntro } from './components/PreConsentIntro';
import { ConsentScreen } from './components/ConsentScreen';
import { AmbientAudio } from './components/AmbientAudio';
import { MaslowPyramid } from './components/MaslowPyramid';
import { RefreshCw, ArrowRight, Volume2, VolumeX, User, Sparkles, Table, Music } from 'lucide-react';

const GOOGLE_APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxPAZ0y6A_flb2Ac7JlsqFvG084reAR0dIH7pJadgdDVht_5mN5U_dgt4QweruZgvov/exec"; 

export default function App() {
  const [stats, setStats] = useState<GameStats>(INITIAL_STATS);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('CINEMATIC_INTRO');
  const [gameOverStep, setGameOverStep] = useState(0); 
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [actJustCompleted, setActJustCompleted] = useState<number>(0);
  const [isMuted, setIsMuted] = useState(true);
  const [dataSubmitted, setDataSubmitted] = useState(false);
  const [history, setHistory] = useState<ChoiceRecord[]>([]);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);

  const [playerProfile, setPlayerProfile] = useState<PlayerProfile>({
    name: '', age: 30, gender: 'male'
  });

  const currentScene = SCENES[sceneIndex];
  const currentHour = currentScene ? currentScene.hour : 6;
  const currentTone = currentScene ? currentScene.tone : 'neutral';
  const currentKeyword = currentScene ? currentScene.backgroundKeyword : '';

  const musicCredits: Record<string, string> = {
    soft: "L. Beethoven — Moonlight Sonata",
    intense: "W.A. Mozart — Lacrimosa (Requiem)",
    mysterious: "W.A. Mozart — Symphony No. 40",
    warm: "L. Beethoven — Für Elise"
  };

  const maslowData = useMemo(() => {
    const scores: Record<MaslowLevel, number> = { physiology: 0, safety: 0, belonging: 0, esteem: 0, actualization: 0 };
    history.forEach(rec => { scores[rec.category]++; });
    
    const levelNames: Record<MaslowLevel, string> = { 
      physiology: 'Комфорт и простые радости', 
      safety: 'Спокойствие и ощущение опоры', 
      belonging: 'Близость и связь с людьми', 
      esteem: 'Быть значимым и признанным', 
      actualization: 'Быть довольным собой' 
    };

    const sortedLevels = (Object.entries(scores) as [MaslowLevel, number][])
      .sort((a, b) => b[1] - a[1])
      .map(([level]) => levelNames[level]);

    const dominant = (Object.entries(scores) as [MaslowLevel, number][]).sort((a, b) => b[1] - a[1])[0][0];
    
    const genderText = playerProfile.gender === 'male' ? 'Муж' : playerProfile.gender === 'female' ? 'Жен' : 'Иное';
    const excelString = `${playerProfile.name || 'Игрок'} | ${playerProfile.age} лет | ${genderText} | Пирамида: ${sortedLevels.join(' > ')}`;
    
    return { scores, dominant, excelString };
  }, [history, playerProfile]);

  const profileInfo = useMemo(() => {
    const profiles: Record<MaslowLevel, { title: string; desc: string; accents: string[]; epitaph: string }> = {
      physiology: { title: "Ценность телесного", desc: "Жизнь в моменте чувств.", accents: ["Приоритет комфорта"], epitaph: "Ты умел(а) чувствовать жизнь." },
      safety: { title: "Ценность устойчивости", desc: "Мир на фундаменте контроля.", accents: ["Приоритет порядка"], epitaph: "Ты создавал(а) порядок из хаоса." },
      belonging: { title: "Ценность близости", desc: "Смысл в других людях.", accents: ["Приоритет связи"], epitaph: "Твое сердце билось в унисон с другими." },
      esteem: { title: "Ценность признания", desc: "Важно оставить след.", accents: ["Приоритет значимости"], epitaph: "Ты не боялся(ась) светить." },
      actualization: { title: "Ценность целостности", desc: "Поиск внутренней тишины.", accents: ["Приоритет ясности"], epitaph: "Ты нашел(ла) мир внутри себя." }
    };
    return profiles[maslowData.dominant];
  }, [maslowData.dominant]);

  const sendToExcel = (answer: string) => {
    if (consentGiven !== true || !GOOGLE_APPS_SCRIPT_URL) { 
      console.log("Consent not given or Script URL missing. Skipping data submission.");
      setDataSubmitted(true); 
      return; 
    }

    const payload = { 
      name: playerProfile.name, 
      age: playerProfile.age, 
      gender: playerProfile.gender, 
      excelString: maslowData.excelString, 
      reflection: answer, 
      timestamp: new Date().toLocaleString('ru-RU') 
    };

    fetch(GOOGLE_APPS_SCRIPT_URL, { 
      method: 'POST', 
      mode: 'no-cors', 
      headers: { 'Content-Type': 'text/plain' }, 
      body: JSON.stringify(payload) 
    })
    .then(() => {
      console.log("Data sent to Excel successfully");
      setDataSubmitted(true);
    })
    .catch((err) => {
      console.error("Excel submission error:", err);
      setDataSubmitted(true);
    });
  };

  const handleChoice = (choice: Choice) => {
    setIsTransitioning(true);
    setHistory(prev => [...prev, { hour: currentHour, sceneTitle: currentScene.title, choiceText: choice.text, category: choice.category }]);
    setTimeout(() => {
      setStats(prev => ({ matter: Math.max(0, Math.min(100, prev.matter + (choice.effect.matter || 0) * 10)), relations: Math.max(0, Math.min(100, prev.relations + (choice.effect.relations || 0) * 10)), meaning: Math.max(0, Math.min(100, prev.meaning + (choice.effect.meaning || 0) * 10)), happiness: Math.max(0, Math.min(100, prev.happiness + (choice.effect.happiness || 0) * 10)), energy: Math.max(0, Math.min(100, prev.energy + (choice.effect.energy || 0) * 10)) }));
      setTimeout(() => {
        const nextIndex = sceneIndex + 1;
        if (nextIndex === 3 || nextIndex === 6) { 
          setActJustCompleted(nextIndex / 3); 
          setPhase('ACT_SUMMARY'); 
          setSceneIndex(nextIndex); 
          setIsTransitioning(false); 
        }
        else if (nextIndex >= 9) { 
          setIsMuted(true); 
          setPhase('GAME_OVER_SEQUENCE'); 
          setGameOverStep(0); 
          setIsTransitioning(false); 
        }
        else { 
          setSceneIndex(nextIndex); 
          setIsTransitioning(false); 
        } 
      }, 500);
    }, 100);
  };

  const handleRestart = () => {
    setStats(INITIAL_STATS); setSceneIndex(0); setActJustCompleted(0); setDataSubmitted(false); setHistory([]); setReflectionAnswer(null); setGameOverStep(0); setConsentGiven(null);
    setPhase('CINEMATIC_INTRO');
  };

  return (
    <div id="app-container" className="w-full h-full bg-[#050505] overflow-hidden">
      {phase === 'CINEMATIC_INTRO' && <IntroSequence onComplete={() => setPhase('BIRTH_MOMENT')} />}
      {phase === 'BIRTH_MOMENT' && <BirthMoment onComplete={() => setPhase('PRE_CONSENT_INTRO')} />}
      {phase === 'PRE_CONSENT_INTRO' && <PreConsentIntro onComplete={() => setPhase('CONSENT')} />}
      {phase === 'CONSENT' && <ConsentScreen onComplete={(agreed) => { setConsentGiven(agreed); setPhase('PROFILE'); }} />}
      {phase === 'PROFILE' && (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#050505] text-white font-sans overflow-hidden">
          <div className="relative z-10 w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#5c4033] p-8 rounded shadow-2xl animate-fade-in">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-[#d4af37] mx-auto mb-4" />
              <h2 className="text-2xl font-serif text-white mb-2 uppercase tracking-widest">Личность</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Имя</label>
                <input type="text" value={playerProfile.name} onChange={(e) => setPlayerProfile({...playerProfile, name: e.target.value})} placeholder="Впиши имя..." className="w-full bg-[#151515] border border-[#333] rounded text-white px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-all text-lg font-serif" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Возраст</label>
                <input type="number" value={playerProfile.age} onChange={(e) => setPlayerProfile({...playerProfile, age: parseInt(e.target.value) || 0})} className="w-full bg-[#151515] border border-[#333] rounded text-white px-4 py-3 focus:outline-none focus:border-[#d4af37] transition-all font-mono" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">Пол</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['male', 'female', 'other'] as Gender[]).map((g) => (
                    <button key={g} onClick={() => setPlayerProfile({...playerProfile, gender: g})} className={`py-3 px-4 text-[10px] uppercase tracking-wider border rounded transition-all duration-300 ${playerProfile.gender === g ? 'bg-[#d4af37] text-black border-[#d4af37] font-bold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'bg-[#151515] text-gray-500 border-[#333] hover:border-gray-500'}`}>
                      {g === 'male' ? 'Муж' : g === 'female' ? 'Жен' : 'Иное'}
                    </button>
                  ))}
                </div>
              </div>
              <button onClick={() => {setPhase('PLAYING'); setIsMuted(false);}} disabled={!playerProfile.name} className={`w-full mt-6 py-4 rounded uppercase tracking-[0.2em] text-xs font-bold transition-all duration-300 ${playerProfile.name ? 'bg-[#d4af37] text-black hover:bg-[#ffe4b5] shadow-[0_0_20px_rgba(212,175,55,0.2)]' : 'bg-[#222] text-gray-600 cursor-not-allowed border border-[#333]'}`}>
                Войти в поток
              </button>
            </div>
          </div>
        </div>
      )}
      {phase === 'ACT_SUMMARY' && (
        <div className="relative min-h-screen flex items-center justify-center p-6 bg-[#050505] text-white font-sans">
          <Background sceneIndex={sceneIndex - 1} />
          <div className="relative z-10 max-w-3xl text-center space-y-8 animate-fade-in-up bg-[#0a0a0a]/80 backdrop-blur-md p-12 rounded border-y-4 border-[#5c4033] shadow-2xl">
            <h2 className="text-3xl md:text-5xl font-serif text-white">Фаза {actJustCompleted === 1 ? 'Утра' : 'Дня'} Завершена</h2>
            <button onClick={() => setPhase('PLAYING')} className="group inline-flex items-center gap-3 px-10 py-4 border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all">Продолжить <ArrowRight size={14} /></button>
          </div>
        </div>
      )}
      {phase === 'GAME_OVER_SEQUENCE' && (
        <div className="relative min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
          {gameOverStep === 0 && (<div className="text-center animate-fade-in space-y-8"><h2 className="text-4xl md:text-6xl font-serif italic text-[#d4af37]">«Время вышло.»</h2><button onClick={() => setGameOverStep(1)} className="mt-8 p-4 rounded-full border border-[#d4af37]/30 hover:bg-[#d4af37]/10 transition-all"><ArrowRight className="text-[#d4af37]" /></button></div>)}
          
          {/* STEP 1: PYRAMID (DARKER AMBIENCE) */}
          {gameOverStep === 1 && (
            <div className="fixed inset-0 bg-gradient-to-b from-[#e8e4d8] via-[#dcd8cc] to-[#ccc8bc] z-50 flex flex-col items-center justify-center p-6 animate-fade-in cinematic-noise overflow-hidden">
               {/* Divine Light Ray */}
               <div className="absolute top-[-25%] left-[-15%] w-[70%] h-[150%] bg-gradient-to-r from-mystic-gold/15 via-transparent to-transparent rotate-[40deg] pointer-events-none blur-[120px]" />
               <div className="w-full max-w-2xl text-center space-y-10 relative z-10">
                 <div className="space-y-1">
                    <h3 className="text-sm md:text-base uppercase tracking-[0.4em] md:tracking-[0.8em] text-[#4a362b] font-black opacity-90 drop-shadow-sm">ТВОИ ЖИЗНЕННЫЕ ЦЕННОСТИ</h3>
                    <p className="text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-[#4a362b]/60 font-medium">по пирамиде Маслоу</p>
                    <div className="h-[1px] w-24 bg-[#4a362b]/30 mx-auto mt-4" />
                 </div>
                 <div className="bg-white/40 backdrop-blur-xl p-4 md:p-10 rounded shadow-[0_30px_80px_rgba(74,54,43,0.15)] border border-[#5c4033]/10 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(212,175,55,0.05)_0%,_transparent_75%)]" />
                    <MaslowPyramid scores={maslowData.scores} dominant={maslowData.dominant} isLight={true} />
                 </div>
                 <div className="pt-4">
                    <button 
                      onClick={() => setGameOverStep(2)} 
                      className="group inline-flex items-center gap-4 text-[11px] uppercase tracking-[0.5em] text-[#4a362b] font-black border-b-2 border-[#4a362b]/20 pb-2 hover:border-[#4a362b] transition-all duration-500 hover:gap-8"
                    >
                      Личность и суть <ArrowRight size={18} className="text-mystic-gold drop-shadow-sm" />
                    </button>
                 </div>
               </div>
            </div>
          )}

          {gameOverStep === 2 && (<div className="w-full max-w-2xl bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#5c4033] p-8 md:p-12 rounded shadow-2xl animate-fade-in-up text-center space-y-6"><h1 className="text-3xl md:text-4xl font-serif text-white">{profileInfo.title}</h1><p className="text-lg text-gray-300 font-serif leading-relaxed italic">{profileInfo.desc}</p><button onClick={() => setGameOverStep(3)} className="group inline-flex items-center gap-3 px-10 py-4 bg-[#d4af37] text-black uppercase tracking-widest text-xs font-bold hover:bg-white transition-all rounded">На что ушло время <ArrowRight size={14} /></button></div>)}
          {gameOverStep === 3 && (<div className="w-full max-w-xl space-y-8 animate-fade-in text-center"><div className="space-y-4">{profileInfo.accents.map((accent, i) => (<div key={i} className="p-6 bg-[#0a0a0a] border border-white/5 rounded italic text-lg md:text-xl text-gray-200 font-serif shadow-lg">«{accent}»</div>))}</div><button onClick={() => setGameOverStep(4)} className="text-[#d4af37] font-serif italic border-b border-[#d4af37]/30 pt-4">...и в этом была суть.</button></div>)}
          {gameOverStep === 4 && (<div className="text-center animate-fade-in max-w-2xl px-6"><Sparkles className="mx-auto text-[#d4af37] w-12 h-12 opacity-50" /><h1 className="text-3xl md:text-5xl font-serif text-[#ffe4b5] leading-snug drop-shadow-2xl">«{profileInfo.epitaph}»</h1><button onClick={() => setGameOverStep(5)} className="mt-12 p-4 text-[#d4af37]/40 hover:text-[#d4af37] transition-all"><ArrowRight /></button></div>)}
          {gameOverStep === 5 && (<div className="w-full max-w-md bg-[#0a0a0a]/90 backdrop-blur-xl border border-[#5c4033] p-8 md:p-10 rounded animate-fade-in text-center space-y-8"><h2 className="text-xl md:text-2xl font-serif text-white">Если бы у тебя был еще один час — прожил(а) бы ты его так же?</h2><div className="grid gap-3">{['Да', 'Иначе', 'Я не знаю'].map((ans) => (<button key={ans} onClick={() => { setReflectionAnswer(ans); sendToExcel(ans); setGameOverStep(6); }} className="w-full py-4 border border-white/10 rounded font-serif text-gray-400 hover:border-[#d4af37] hover:text-[#d4af37] transition-all">{ans}</button>))}</div></div>)}
          {gameOverStep === 6 && (<div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center p-8 animate-fade-in overflow-y-auto"><div className="text-center space-y-8 max-w-lg w-full py-12"><h2 className="text-xl md:text-2xl font-serif italic text-gray-400 animate-pulse leading-relaxed">{dataSubmitted ? "«Твой путь сохранен в летописи бытия.»" : "«Синхронизация данных с вечностью...»"}</h2><div className="flex flex-col gap-4 pt-12"><button onClick={handleRestart} className="group inline-flex items-center justify-center gap-3 px-12 py-5 border border-[#d4af37] text-[#d4af37] uppercase tracking-widest text-xs font-bold hover:bg-[#d4af37] hover:text-black transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)]"><RefreshCw size={14} /> Прожить день заново</button></div><div className="pt-8 text-[10px] text-gray-600 uppercase tracking-widest flex items-center justify-center gap-2 opacity-50"><Table size={10} /> {dataSubmitted ? "Запись завершена" : "Ожидание сервера"}</div></div></div>)}
        </div>
      )}
      {phase === 'PLAYING' && (
        <div className="relative h-screen bg-[#050505] text-white flex flex-col font-sans overflow-hidden">
          {sceneIndex === 0 ? <AwakeningBackground /> : <Background sceneIndex={sceneIndex} />}
          <AmbientAudio isMuted={isMuted} tone={currentTone} keyword={currentKeyword} />
          <div className="absolute top-4 left-4 z-50 flex flex-col gap-1 pointer-events-none">
            {!isMuted && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded border border-white/5 animate-fade-in">
                <Music size={10} className="text-[#d4af37] animate-pulse" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/80 font-bold">
                  {musicCredits[currentTone] || musicCredits.soft}
                </span>
              </div>
            )}
          </div>
          <div className="absolute top-4 right-4 z-50 flex items-center gap-4">
             {!isMuted && (
               <div className="flex items-end gap-[2px] h-3 mb-1">
                 <div className="w-1 bg-mystic-gold animate-[sound-bar_0.8s_infinite] h-full"></div>
                 <div className="w-1 bg-mystic-gold animate-[sound-bar_1.2s_infinite] h-[60%]"></div>
                 <div className="w-1 bg-mystic-gold animate-[sound-bar_1.0s_infinite] h-[80%]"></div>
               </div>
             )}
             <button onClick={() => setIsMuted(!isMuted)} className="p-2 text-gray-500 hover:text-[#d4af37] transition-colors mix-blend-difference">
               {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
             </button>
          </div>
          <div className="relative z-20 flex-shrink-0"><ClockHUD hour={currentHour} stats={stats} /></div>
          <div className="relative z-30 flex-grow flex items-center justify-center pb-12 px-4"><div className="w-full max-w-3xl">{currentScene && <DilemmaFrame scene={currentScene} onChoiceSelected={handleChoice} isFadingOut={isTransitioning} />}</div></div>
          <style>{`
            @keyframes sound-bar {
              0%, 100% { height: 20%; }
              50% { height: 100%; }
            }
          `}</style>
        </div>
      )}
    </div>
  );
}
