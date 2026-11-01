import React from 'react';
import { Trophy, Award, Flame, Sparkles, Footprints, Flag, Compass, LogIn } from 'lucide-react';
import { MessiWebsiteData } from '../data/messiData';
import { MESSI_IMAGES } from '../assets/images';
import { sounds } from '../utils/soundEffects';

interface HeroSectionProps {
  data: MessiWebsiteData;
  isEditMode: boolean;
  onOpenLogin?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data, onOpenLogin }) => {
  const { personalInfo, bioSummary } = data;

  const scrollToTrophies = () => {
    sounds.playFanfare();
    const el = document.getElementById('trophies');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    sounds.playClick();
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-6 pb-16 overflow-hidden min-h-[680px] flex flex-col justify-between">
      {/* 1. EXACT 3D PIXAR ANIMATED MESSI & STADIUM BACKGROUND (Matching image_27044950.png) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <img
          src={MESSI_IMAGES.heroPixarRight}
          alt="Lionel Messi 3D Animasyon Stadyum Görseli"
          className="w-full h-full object-cover object-right md:object-center filter brightness-90 contrast-105"
        />
        {/* Left Dark Gradient Vignette for Text Legibility while keeping Messi visible on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070b14] via-[#070b14]/75 to-transparent md:w-3/4" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b14] via-transparent to-[#070b14]/50" />
        {/* Atmospheric Cyan Light Glows */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px]" />
      </div>

      {/* 2. MAIN HERO CONTENT */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-4 sm:pt-8">
        <div className="max-w-2xl text-center lg:text-left space-y-6">
          {/* Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-xl backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
            <span className="text-xs font-bold text-amber-400 tracking-wider uppercase">
              {personalInfo.currentClub} • FORMA #{personalInfo.shirtNumber}
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-xs text-sky-400 font-semibold flex items-center gap-1">
              <Flag className="w-3.5 h-3.5 text-sky-400" /> Arjantin Kaptanı
            </span>
          </div>

          {/* Giant Title */}
          <div>
            <h1 className="text-5xl sm:text-7xl xl:text-8xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg">
              LİONEL <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300">
                MESSI
              </span>
            </h1>
            <p className="mt-3 text-lg sm:text-xl font-bold text-amber-400/95 tracking-wide flex items-center justify-center lg:justify-start gap-2 drop-shadow">
              <span>Tarihin En İyisi</span>
              <span className="text-amber-500/60">•</span>
              <span>Futbolun Zarafet ve Deha Sembolü</span>
            </p>
          </div>

          {/* Subtitle / Bio Intro */}
          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 drop-shadow-sm font-medium">
            {bioSummary.intro}
          </p>

          {/* Action Buttons: Matching exact design from user screenshot image_27044950.png */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
            {/* Button 1: Cyan Glowing Pill Button */}
            <button
              onClick={scrollToTrophies}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 shadow-xl shadow-cyan-500/40 active:scale-95 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>KEŞFETMEYE BAŞLA</span>
            </button>

            {/* Button 2: Gold Outlined Pill Button */}
            <button
              onClick={() => {
                if (onOpenLogin) onOpenLogin();
                else scrollToAbout();
              }}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-black text-sm text-amber-300 bg-slate-950/80 border border-amber-400/70 hover:bg-amber-400/15 hover:border-amber-300 active:scale-95 transition-all cursor-pointer shadow-lg shadow-black/50 backdrop-blur-md"
            >
              <LogIn className="w-4 h-4 text-amber-400" />
              <span>GİRİŞ YAP</span>
            </button>
          </div>
        </div>

        {/* 3. FOUR PERSONAL STAT STRIPS (Matching exact layout from user image_27044950.png) */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
          <div className="p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-center shadow-xl hover:border-cyan-500/40 transition-colors">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Doğum</div>
            <div className="text-sm sm:text-base font-black text-white mt-1 font-mono">
              {personalInfo.birthDate}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-center shadow-xl hover:border-cyan-500/40 transition-colors">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Doğum Yeri</div>
            <div className="text-sm sm:text-base font-black text-white mt-1">
              {personalInfo.birthPlace}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-center shadow-xl hover:border-cyan-500/40 transition-colors">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mevki</div>
            <div className="text-sm sm:text-base font-black text-amber-300 mt-1">
              {personalInfo.position}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/75 backdrop-blur-md border border-slate-800/80 text-center shadow-xl hover:border-cyan-500/40 transition-colors">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Ayak & Boy</div>
            <div className="text-sm sm:text-base font-black text-cyan-300 mt-1 font-mono">
              Sol • {personalInfo.height}
            </div>
          </div>
        </div>

        {/* 4. GLOBAL KEY STATS BAR */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:border-amber-500/40 transition-colors text-center group shadow-xl">
            <div className="inline-flex p-3 rounded-2xl bg-amber-500/10 text-amber-400 mb-2 group-hover:scale-110 transition-transform">
              <Trophy className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">46</div>
            <div className="text-xs font-bold text-amber-400 mt-1 uppercase tracking-wider">Resmi Kupa</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Futbol Tarihinin Rekoru</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:border-sky-500/40 transition-colors text-center group shadow-xl">
            <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 text-sky-400 mb-2 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">8</div>
            <div className="text-xs font-bold text-sky-400 mt-1 uppercase tracking-wider">Ballon d&apos;Or</div>
            <div className="text-[11px] text-slate-400 mt-0.5">3 Farklı On Yılda Tek İsim</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:border-rose-500/40 transition-colors text-center group shadow-xl">
            <div className="inline-flex p-3 rounded-2xl bg-rose-500/10 text-rose-400 mb-2 group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">850+</div>
            <div className="text-xs font-bold text-rose-400 mt-1 uppercase tracking-wider">Kariyer Golü</div>
            <div className="text-[11px] text-slate-400 mt-0.5">1 Takvim Yılında 91 Gol</div>
          </div>

          <div className="p-5 rounded-3xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 hover:border-emerald-500/40 transition-colors text-center group shadow-xl">
            <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-2 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">400+</div>
            <div className="text-xs font-bold text-emerald-400 mt-1 uppercase tracking-wider">Kariyer Asisti</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Futbol Tarihinin En İyisi</div>
          </div>
        </div>
      </div>
    </section>
  );
};
