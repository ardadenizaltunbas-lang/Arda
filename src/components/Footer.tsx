import React from 'react';
import { Heart, Trophy, RotateCcw, Rocket, Sparkles } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FooterProps {
  onResetIntro: () => void;
  onOpenVercelGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onResetIntro, onOpenVercelGuide }) => {
  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800/80 pt-16 pb-12 relative overflow-hidden">
      {/* Argentine flag color stripe */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-white to-sky-400" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-400 to-amber-400 p-[2px]">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400">
                  10
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-wider">
                LIONEL MESSI <span className="text-amber-400">#10</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Yapay Zeka Araçları Dersi kapsamında hazırlanan, tarihin en büyük futbolcusu Lionel Andrés Messi&apos;nin başarılarını, hikayelerini ve kırılması güç rekorlarını sergileyen modüler biyografi web uygulaması.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Ders Projesi & Vercel Ready</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Site Bölümleri
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <button onClick={() => scrollTo('hero')} className="text-left hover:text-amber-300 transition-colors">Ana Sayfa</button>
              <button onClick={() => scrollTo('about')} className="text-left hover:text-amber-300 transition-colors">Biyografi & Hikaye</button>
              <button onClick={() => scrollTo('trophies')} className="text-left hover:text-amber-300 transition-colors">Neler Başardım? 🏆</button>
              <button onClick={() => scrollTo('jersey-creator')} className="text-left hover:text-amber-300 transition-colors">Hatıra Forma 👕</button>
              <button onClick={() => scrollTo('goal-distribution')} className="text-left hover:text-amber-300 transition-colors">Gol Dağılımı ⚽</button>
              <button onClick={() => scrollTo('top-goals')} className="text-left hover:text-amber-300 transition-colors">Top 10 Gol 👑</button>
              <button onClick={() => scrollTo('videos')} className="text-left hover:text-amber-300 transition-colors">Videolar & Filmler 🎬</button>
              <button onClick={() => scrollTo('comments')} className="text-left hover:text-amber-300 transition-colors">Taraftar Yorumları 💬</button>
              <button onClick={() => scrollTo('quiz')} className="text-left hover:text-amber-300 transition-colors">Fan Quiz Testi ⭐</button>
            </div>
          </div>

          {/* Fun Actions */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              İnteraktif Özellikler
            </h4>
            <div className="space-y-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  onResetIntro();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-sky-300 bg-sky-950/40 border border-sky-800/60 hover:bg-sky-900/40 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Giriş Ekranını Tekrar Başlat</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  onOpenVercelGuide();
                }}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                <Rocket className="w-3.5 h-3.5 text-sky-400" />
                <span>Vercel Deploy Kılavuzu</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-1.5">
            <span>Lionel Messi Biyografi Portalı • Yapay Zeka Araçları Dersi</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Özgür ve Bağımsız Öğrenci Projesi</span>
            <span>•</span>
            <span className="text-amber-400 font-bold">D10S • GOAT</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
