import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Heart, ArrowRight, FastForward } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { MESSI_IMAGES } from '../assets/images';

interface IntroGatekeeperProps {
  onEnter: () => void;
}

const FUNNY_NO_PHRASES = [
  "Emin misin? 🤔",
  "Bir daha düşün bence! ⚽",
  "Ronaldo bile evet derdi! 😅",
  "Göz doktoruna mı gitsek? 👓",
  "Yanlış tuşa bastın sanırım! 👀",
  "Kaçışın yok, GOAT burada! 🐐",
  "Tuş iyice küçülüyor bak...",
  "Hala hayır mı?! İnanılmaz!",
  "8 Ballon d'Or'a ayıp oluyor ama 🏆",
  "Son şansın, artık Evet demek zorundasın! 🔥"
];

export const IntroGatekeeper: React.FC<IntroGatekeeperProps> = ({ onEnter }) => {
  const [noCount, setNoCount] = useState<number>(0);
  const [noBtnOffset, setNoBtnOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isEntering, setIsEntering] = useState<boolean>(false);

  const handleNoClick = () => {
    sounds.playBuzzer();
    setNoCount(prev => prev + 1);

    if (noCount >= 2) {
      const randomX = (Math.random() - 0.5) * 160;
      const randomY = (Math.random() - 0.5) * 80;
      setNoBtnOffset({ x: randomX, y: randomY });
    }
  };

  const handleYesClick = () => {
    sounds.playFanfare();
    setIsEntering(true);
    try {
      sessionStorage.setItem('messi_intro_passed', 'true');
    } catch {
      // ignore
    }

    confetti({
      particleCount: 150,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#ffffff', '#0284c7']
    });

    setTimeout(() => {
      onEnter();
    }, 1000);
  };

  const handleDirectPass = () => {
    sounds.playClick();
    try {
      sessionStorage.setItem('messi_intro_passed', 'true');
    } catch {
      // ignore
    }
    onEnter();
  };

  const yesScale = 1 + noCount * 0.28;
  const currentPhrase = noCount > 0 ? FUNNY_NO_PHRASES[Math.min(noCount - 1, FUNNY_NO_PHRASES.length - 1)] : null;
  const noScale = Math.max(0.45, 1 - noCount * 0.08);

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${isEntering ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      {/* 3D ANIMATED PIXAR STADIUM BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src={MESSI_IMAGES.pixarStadium}
          alt="Lionel Messi 3D Animasyon Stadyum Arka Planı"
          className="w-full h-full object-cover object-center filter brightness-75 contrast-105 scale-102 transition-transform duration-1000"
        />
        {/* Dark Vignette & Cyan Lighting Overlay to keep card perfectly readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/65 to-[#050811]/45" />
        <div className="absolute inset-0 bg-sky-950/30 backdrop-blur-[2px]" />
      </div>

      <div className="relative max-w-lg w-full text-center bg-slate-900/90 backdrop-blur-xl border border-sky-400/40 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-sky-950/80 z-10">
        {/* Direct Bypass Button on top right */}
        <button
          onClick={handleDirectPass}
          className="absolute top-4 right-4 inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/90 border border-slate-700/80 hover:bg-slate-700 transition-colors"
          title="Giriş ekranını atla"
        >
          <span>Siteye Geç</span>
          <FastForward className="w-3 h-3 text-sky-400" />
        </button>

        {/* Top badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-bold tracking-wider uppercase mb-5 animate-pulse">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Biyografi & Zafer Yolculuğu Giriş Testi</span>
        </div>

        {/* 3D Animated Messi Avatar */}
        <div className="w-24 h-24 mx-auto mb-5 rounded-full p-[3px] bg-gradient-to-tr from-sky-400 via-blue-500 to-amber-400 shadow-xl shadow-sky-500/30 relative overflow-hidden group">
          <img
            src={MESSI_IMAGES.pixarStadium}
            alt="Messi 3D Avatar"
            className="w-full h-full object-cover object-top rounded-full"
          />
          <div className="absolute bottom-0 inset-x-0 bg-black/60 text-[9px] font-bold text-amber-300 uppercase py-0.5">
            D10S #10
          </div>
        </div>

        {/* Main Question */}
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2.5">
          Lionel Messi&apos;yi seviyor musunuz? 🐐
        </h2>
        <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-sm mx-auto">
          Tarihin en büyük futbol efsanesinin interaktif dünyasına girmeden önce küçük bir soru!
        </p>

        {/* Funny warning if No was pressed */}
        {currentPhrase && (
          <div className="mb-6 p-2.5 bg-rose-500/20 border border-rose-500/50 rounded-xl text-rose-300 font-semibold text-sm animate-bounce">
            {currentPhrase}
          </div>
        )}

        {/* Button choices */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-1 pb-4 min-h-[120px]">
          {/* YES BUTTON */}
          <button
            onClick={handleYesClick}
            style={{
              transform: `scale(${yesScale})`,
              transition: 'transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)'
            }}
            className="group relative z-10 inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 shadow-xl shadow-amber-500/40 hover:brightness-110 active:scale-95 cursor-pointer origin-center"
          >
            <Trophy className="w-5 h-5 text-slate-950 fill-slate-950" />
            <span>EVET, ÇOK SEVİYORUM! 👑</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          {/* NO BUTTON */}
          <button
            onClick={handleNoClick}
            style={{
              transform: `scale(${noScale}) translate(${noBtnOffset.x}px, ${noBtnOffset.y}px)`,
              transition: 'all 0.2s ease-out'
            }}
            className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-300 bg-slate-800/90 border border-slate-700 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-700/60 active:scale-90 cursor-pointer origin-center"
          >
            <span>Hayır ❌</span>
          </button>
        </div>

        {/* Footer Hint */}
        <div className="mt-7 pt-4 border-t border-slate-800/90 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            46 Resmi Kupa & 8 Ballon d&apos;Or
          </span>
          <button
            onClick={handleDirectPass}
            className="text-sky-400 hover:text-sky-300 hover:underline cursor-pointer font-semibold"
          >
            Siteyi Doğrudan Gör →
          </button>
        </div>
      </div>
    </div>
  );
};
