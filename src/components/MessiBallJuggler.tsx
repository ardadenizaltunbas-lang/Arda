import React, { useState, useEffect, useRef } from 'react';
import {
  Trophy,
  Minimize2,
  Maximize2,
  Zap,
  Volume2,
  VolumeX,
  Flame,
  X,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';
import { MESSI_IMAGES } from '../assets/images';

export const MessiBallJuggler: React.FC = () => {
  const [juggles, setJuggles] = useState<number>(10);
  const [highScore, setHighScore] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('messi_juggler_highscore');
      return saved ? parseInt(saved, 10) : 34;
    } catch {
      return 34;
    }
  });

  const [isMinimized, setIsMinimized] = useState<boolean>(true); // Minimized by default on small screens
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [ballHeight, setBallHeight] = useState<number>(35); // 0 (on foot) to 100 (peak)
  const [isKicking, setIsKicking] = useState<boolean>(false);
  const [comboToast, setComboToast] = useState<string | null>(null);
  const [isSoundOn, setIsSoundOn] = useState<boolean>(true);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState<boolean>(false);

  const ballPosRef = useRef<number>(35);
  const velocityRef = useRef<number>(2.5);
  const animFrameRef = useRef<number | null>(null);

  const recordScore = (score: number) => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem('messi_juggler_highscore', score.toString());
      } catch {
        // ignore
      }
    }
  };

  // Perform a clean kick
  const doKick = (trickName?: string) => {
    if (isSoundOn) sounds.playClick();
    setIsKicking(true);

    // Launch ball upward
    velocityRef.current = -5.2;

    setJuggles(prev => {
      const next = prev + 1;
      recordScore(next);

      if (next % 10 === 0) {
        if (isSoundOn) sounds.playFanfare();
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { x: 0.88, y: 0.75 },
          colors: ['#fbbf24', '#38bdf8', '#ffffff']
        });
      }

      return next;
    });

    const combos = [
      '⚡ Büyülü Sol Ayak!',
      '🌟 İpeksi Dokunuş!',
      '🪄 D10S Zarafeti!',
      '👑 Akrep Vuruşu!',
      '🔥 GOAT Ritmi!'
    ];
    setComboToast(trickName || combos[Math.floor(Math.random() * combos.length)]);

    setTimeout(() => {
      setIsKicking(false);
    }, 220);

    setTimeout(() => {
      setComboToast(null);
    }, 1500);
  };

  // Ball gravity loop
  useEffect(() => {
    if (isMinimized && !isMobileModalOpen) return;

    const gravity = 0.22;
    const footLevel = 5; // On top of Messi's raised boot

    const step = () => {
      velocityRef.current += gravity;
      ballPosRef.current -= velocityRef.current;

      // When ball hits Messi's foot
      if (ballPosRef.current <= footLevel) {
        ballPosRef.current = footLevel;

        if (isAutoPlay) {
          doKick();
        } else {
          // In manual mode, soft bounce or drop
          velocityRef.current = -velocityRef.current * 0.4;
          if (Math.abs(velocityRef.current) < 0.8) {
            setJuggles(0);
            setComboToast('Top Düştü! Tekrar Başla ⚽');
            setTimeout(() => setComboToast(null), 1500);
          }
        }
      }

      // Max ceiling
      if (ballPosRef.current > 90) {
        ballPosRef.current = 90;
        velocityRef.current = Math.abs(velocityRef.current) * 0.5;
      }

      setBallHeight(ballPosRef.current);
      animFrameRef.current = requestAnimationFrame(step);
    };

    animFrameRef.current = requestAnimationFrame(step);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isMinimized, isMobileModalOpen, isAutoPlay, isSoundOn]);

  const handleUserTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (ballHeight >= 5 && ballHeight <= 50) {
      doKick('🎯 MÜKEMMEL ZAMANLAMA!');
    } else {
      doKick();
    }
  };

  return (
    <>
      {/* FLOATING CORNER WIDGET (DESKTOP & MOBILE TRIGGER) */}
      <div className="fixed bottom-4 right-4 z-40 select-none">
        {isMinimized ? (
          /* Sleek Minimized Floating Pill */
          <button
            onClick={() => {
              sounds.playClick();
              if (window.innerWidth < 640) {
                setIsMobileModalOpen(true);
              } else {
                setIsMinimized(false);
              }
            }}
            className="group px-4 py-2.5 rounded-full bg-slate-950/95 border-2 border-cyan-400/60 shadow-2xl shadow-cyan-500/30 flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer backdrop-blur-md"
            title="Messi Top Sektirme Modülünü Aç"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-base shadow-md animate-bounce">
              ⚽
            </span>
            <div className="text-left">
              <div className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider flex items-center gap-1">
                <span>Messi Sektiriyor</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <div className="text-xs font-black text-white font-mono">
                {juggles} Sektirme • Rekor: {highScore}
              </div>
            </div>
          </button>
        ) : (
          /* EXPANDED DESKTOP CARD (Hidden on tiny screens to prevent blocking content) */
          <div className="hidden sm:block relative rounded-3xl bg-slate-950/95 backdrop-blur-2xl border-2 border-cyan-400/50 p-4 shadow-2xl shadow-cyan-950/90 w-80 overflow-hidden animate-fadeIn">
            {/* Ambient Cyan Floodlight Top Glow */}
            <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />

            {/* TOP CONTROLS BAR */}
            <div className="relative z-10 flex items-center justify-between text-xs font-bold text-slate-300 pb-2 mb-2 border-b border-slate-800">
              <div className="flex items-center gap-1.5 text-cyan-400">
                <Zap className="w-4 h-4 fill-cyan-400" />
                <span className="font-black text-xs uppercase tracking-wider">Messi Top Sektiriyor</span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsSoundOn(!isSoundOn)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title={isSoundOn ? 'Sesi Kapat' : 'Sesi Aç'}
                >
                  {isSoundOn ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => {
                    sounds.playClick();
                    setIsAutoPlay(!isAutoPlay);
                  }}
                  className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    isAutoPlay
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  }`}
                  title="Otomatik veya Manuel Oyun"
                >
                  {isAutoPlay ? 'Oto' : 'Manuel'}
                </button>

                <button
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  title="Küçült"
                >
                  <Minimize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* COMBO TOAST NOTIFICATION */}
            {comboToast && (
              <div className="absolute top-12 inset-x-6 z-30 py-1 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[11px] font-black text-center shadow-lg shadow-amber-500/30 animate-bounce">
                {comboToast}
              </div>
            )}

            {/* FULL-BODY DIRECT MESSI JUGGLING STAGE */}
            <div
              onClick={handleUserTap}
              className="relative h-64 rounded-2xl border border-slate-800 overflow-hidden cursor-pointer group flex flex-col justify-end items-center bg-gradient-to-t from-emerald-950/60 via-slate-900/60 to-slate-950/90"
              title="Messi ile top sektirmek için tıkla!"
            >
              {/* Stadium Floodlight Bokeh */}
              <div className="absolute top-2 w-28 h-28 bg-cyan-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Full Body Messi Artwork */}
              <div className="relative z-10 w-48 h-56 flex items-end justify-center">
                <img
                  src={MESSI_IMAGES.messiFullBodyJuggling}
                  alt="Lionel Messi Top Sektiriyor"
                  className={`w-full h-full object-contain filter drop-shadow-2xl transition-transform duration-150 ${
                    isKicking ? 'scale-105 -rotate-2 -translate-y-1' : 'scale-100 rotate-0'
                  }`}
                />

                {/* THE SOCCER BALL (Directly animated above his raised left foot!) */}
                <div
                  className={`absolute left-4 z-20 w-8 h-8 rounded-full bg-white shadow-xl shadow-cyan-400/40 flex items-center justify-center text-sm transition-transform duration-75 ${
                    isKicking ? 'scale-125' : 'scale-100'
                  }`}
                  style={{
                    bottom: `${Math.min(180, 75 + ballHeight * 1.1)}px`,
                    transform: `rotate(${ballHeight * 7}deg)`
                  }}
                >
                  ⚽
                </div>

                {/* Foot Impact Sparkle on kick */}
                {isKicking && (
                  <div className="absolute left-6 bottom-20 z-30 w-6 h-6 rounded-full bg-amber-400/80 blur-[2px] animate-ping" />
                )}
              </div>

              {/* Pitch Grass Base Shadow */}
              <div className="absolute bottom-1 inset-x-6 h-3 bg-black/60 rounded-full blur-[3px] pointer-events-none" />

              {/* Bottom Tap Prompt */}
              <div className="absolute bottom-1.5 text-[10px] font-bold text-cyan-300 group-hover:text-amber-300 transition-colors flex items-center gap-1 z-20">
                <span>👆 Dokunarak Sektir!</span>
                <span className="text-[9px] text-slate-400">({isAutoPlay ? 'Oto Açık' : 'Manuel'})</span>
              </div>
            </div>

            {/* SCOREBOARD HUD */}
            <div className="mt-2.5 flex items-center justify-between text-xs pt-2 border-t border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">
                  Sektirme
                </span>
                <span className="text-xl font-black text-white font-mono flex items-center gap-1">
                  <span>{juggles}</span>
                  {juggles >= 10 && <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-amber-400 font-bold flex items-center justify-end gap-1 uppercase tracking-wider">
                  <Trophy className="w-3 h-3" /> Rekor
                </span>
                <span className="text-lg font-black text-amber-400 font-mono">
                  {highScore}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MOBILE FULL INTERACTIVE JUGGLER MODAL (Guarantees 100% responsiveness on phones) */}
      {isMobileModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn sm:hidden">
          <div className="relative w-full max-w-sm rounded-3xl bg-slate-950 border-2 border-cyan-400/60 p-5 shadow-2xl text-center">
            {/* Close Button */}
            <button
              onClick={() => setIsMobileModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="inline-flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-4 h-4 fill-cyan-400" />
              <span>Messi Top Sektirme Oyunu</span>
            </div>
            <h3 className="text-base font-black text-white mb-1">
              Messi ile Topu Havada Tut! ⚽
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Ekrana dokunarak Messi&apos;nin ayağıyla topu sektirin!
            </p>

            {/* Mobile Stage */}
            <div
              onClick={handleUserTap}
              className="relative h-64 rounded-2xl border border-slate-800 overflow-hidden cursor-pointer bg-gradient-to-t from-emerald-950/70 via-slate-900/60 to-slate-950 flex items-end justify-center p-2"
            >
              <div className="relative z-10 w-44 h-56 flex items-end justify-center">
                <img
                  src={MESSI_IMAGES.messiFullBodyJuggling}
                  alt="Messi Juggling"
                  className={`w-full h-full object-contain transition-transform duration-150 ${
                    isKicking ? 'scale-105 -rotate-2' : 'scale-100'
                  }`}
                />

                <div
                  className="absolute left-4 z-20 w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center text-sm"
                  style={{
                    bottom: `${Math.min(180, 75 + ballHeight * 1.1)}px`,
                    transform: `rotate(${ballHeight * 7}deg)`
                  }}
                >
                  ⚽
                </div>
              </div>

              <div className="absolute top-2 inset-x-4 flex items-center justify-between z-20">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono font-bold text-white">
                  Sektirme: {juggles}
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/40 text-xs font-mono font-bold text-amber-300">
                  Rekor: {highScore}
                </span>
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={handleUserTap}
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-300 text-slate-950 font-black text-sm shadow-lg shadow-cyan-500/30 active:scale-95 transition-all"
              >
                ⚽ VUR & SEKTİR!
              </button>

              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="px-4 py-3 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-bold text-slate-300"
              >
                {isAutoPlay ? 'Oto: Açık' : 'Manuel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
