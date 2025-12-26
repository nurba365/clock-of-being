
import React, { useEffect, useRef } from 'react';

interface AmbientAudioProps {
  isMuted: boolean;
  tone: string;
  keyword?: string;
}

// Ссылки на открытые архивы классической музыки
const TRACK_LIBRARY: Record<string, string> = {
  soft: 'https://archive.org/download/78_moonlight-sonata-first-movement_oscar-levant-beethoven_gbia0117070b/01%20-%20Moonlight%20Sonata%20%28First%20Movement%29%20-%20Oscar%20Levant.mp3',
  intense: 'https://archive.org/download/MozartRequiem_201705/08%20Lacrimosa.mp3',
  mysterious: 'https://archive.org/download/78_symphony-no-40-in-g-minor-first-movement_the-chicago-symphony-orchestra-frederick-stoc_gbia0430043b/01%20-%20Symphony%20No.%2040%20in%20G%20Minor%20-%20First%20Movement.mp3',
  warm: 'https://archive.org/download/beethoven_fur_elise/beethoven_fur_elise.mp3'
};

export const AmbientAudio: React.FC<AmbientAudioProps> = ({ isMuted, tone, keyword = '' }) => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const musicElementRef = useRef<HTMLAudioElement | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const sequencerTimerRef = useRef<number | null>(null);
  const nodesRef = useRef<AudioNode[]>([]);

  // Инициализация Web Audio API для процедурных эффектов (слой 2)
  useEffect(() => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    const masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
    masterGain.gain.value = 0;
    
    audioContextRef.current = ctx;
    masterGainRef.current = masterGain;

    // Создаем HTMLAudioElement для классической музыки (слой 1)
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    musicElementRef.current = audio;

    return () => {
      ctx.close();
      audio.pause();
      if (sequencerTimerRef.current) window.clearInterval(sequencerTimerRef.current);
    };
  }, []);

  // Управление музыкой и громкостью
  useEffect(() => {
    if (!audioContextRef.current || !masterGainRef.current || !musicElementRef.current) return;
    
    const ctx = audioContextRef.current;
    const gain = masterGainRef.current;
    const music = musicElementRef.current;

    if (isMuted) {
      gain.gain.setTargetAtTime(0, ctx.currentTime, 1);
      fadeMusic(music, 0);
    } else {
      if (ctx.state === 'suspended') ctx.resume();
      gain.gain.setTargetAtTime(0.3, ctx.currentTime, 2);
      
      // Смена трека в зависимости от тона
      const newSrc = TRACK_LIBRARY[tone] || TRACK_LIBRARY.soft;
      if (music.src !== newSrc) {
        music.src = newSrc;
        music.play().catch(() => console.log("Audio play blocked by browser"));
      }
      fadeMusic(music, 0.4);
      startSequencer();
    }
  }, [isMuted, tone]);

  const fadeMusic = (audio: HTMLAudioElement, targetVolume: number) => {
    let currentVolume = audio.volume;
    const step = 0.02;
    const interval = setInterval(() => {
      if (Math.abs(audio.volume - targetVolume) < step) {
        audio.volume = targetVolume;
        clearInterval(interval);
      } else {
        audio.volume += (targetVolume > audio.volume ? step : -step);
      }
    }, 100);
  };

  // Процедурный слой (мягкие колокольчики поверх музыки)
  const startSequencer = () => {
    if (sequencerTimerRef.current) window.clearInterval(sequencerTimerRef.current);
    const scales: Record<string, number[]> = {
      soft: [523.25, 587.33, 659.25], 
      intense: [220.00, 233.08], 
      mysterious: [392.00, 440.00],
      warm: [261.63, 329.63]
    };
    const currentScale = scales[tone] || scales.soft;

    sequencerTimerRef.current = window.setInterval(() => {
      if (isMuted) return;
      playSoftNote(currentScale[Math.floor(Math.random() * currentScale.length)]);
    }, 4000 + Math.random() * 4000);
  };

  const playSoftNote = (freq: number) => {
    const ctx = audioContextRef.current!;
    const gain = masterGainRef.current!;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    g.gain.setValueAtTime(0, now);
    g.gain.linearRampToValueAtTime(0.02, now + 1);
    g.gain.exponentialRampToValueAtTime(0.001, now + 5);

    osc.connect(g);
    g.connect(gain);
    osc.start(now);
    osc.stop(now + 6);
  };

  return null;
};
