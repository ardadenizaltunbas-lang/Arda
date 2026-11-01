import React, { useState } from 'react';
import {
  Trophy,
  Award,
  Flame,
  Volume2,
  VolumeX,
  Menu,
  X,
  Sparkles,
  Rocket,
  Edit3,
  ShieldCheck,
  RotateCcw,
  LogOut,
  Shirt,
  MessageSquare,
  User,
  LogIn
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { FanUser } from './AuthModal';

interface NavbarProps {
  isEditMode: boolean;
  onOpenLogin: () => void;
  onLogout: () => void;
  onOpenVercelGuide: () => void;
  onResetIntro: () => void;
  activeSection: string;
  currentUser?: FanUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  isEditMode,
  onOpenLogin,
  onLogout,
  onOpenVercelGuide,
  onResetIntro,
  activeSection,
  currentUser
}) => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playClick();
    }
  };

  const navLinks = [
    { id: 'hero', label: 'Ana Sayfa' },
    { id: 'about', label: 'Biyografi' },
    { id: 'trophies', label: 'Neler Başardım 🏆' },
    { id: 'jersey-creator', label: 'Hatıra Forma 👕' },
    { id: 'goal-distribution', label: 'Gol Dağılımı ⚽' },
    { id: 'top-goals', label: 'Top 10 Gol 👑' },
    { id: 'records', label: 'Rekorlar & Sözler' },
    { id: 'videos', label: 'Videolar 🎬' },
    { id: 'comments', label: 'Yorumlar 💬' },
    { id: 'quiz', label: 'Messi Quiz ⭐' },
  ];

  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/90 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand */}
        <div 
          onClick={() => scrollTo('hero')} 
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-blue-600 to-amber-400 p-[2px] shadow-lg shadow-sky-500/20 group-hover:shadow-amber-500/30 transition-all">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-amber-400 text-sm">
              10
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-black text-base sm:text-lg tracking-wider text-white">
              <span>MESSI</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">GOAT</span>
            </div>
            <div className="text-[10px] text-sky-400 font-semibold tracking-widest uppercase">
              Resmi Biyografi Portalı
            </div>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden 2xl:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800">
          {navLinks.map(link => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? "Ses efektlerini kapat" : "Ses efektlerini aç"}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-amber-400 hover:border-slate-700 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Intro Screen Replay */}
          <button
            onClick={() => {
              sounds.playClick();
              onResetIntro();
            }}
            title="Giriş ekranı testini tekrar başlat"
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Vercel Guide */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenVercelGuide();
            }}
            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800/90 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all shadow-sm"
          >
            <Rocket className="w-3.5 h-3.5 text-sky-400" />
            <span>Vercel Deploy</span>
          </button>

          {/* Logged in Fan Profile Pill or Login Button */}
          {currentUser ? (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenLogin();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-cyan-300 bg-cyan-950/40 border border-cyan-500/40 hover:bg-cyan-900/50 transition-all cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span>{currentUser.fullName.split(' ')[0]} ⚽</span>
            </button>
          ) : (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenLogin();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Giriş Yap</span>
            </button>
          )}

          {/* Edit / CMS Mode */}
          {isEditMode ? (
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Yönetici Açık</span>
              </span>
              <button
                onClick={onLogout}
                title="Yönetici modundan çık"
                className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 hover:bg-rose-900/50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                sounds.playClick();
                onOpenLogin();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110 shadow-md shadow-amber-500/20 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-slate-950" />
              <span>CMS Giriş</span>
            </button>
          )}
        </div>

        {/* Mobile menu hamburger */}
        <div className="flex items-center gap-2 2xl:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="2xl:hidden border-b border-slate-800 bg-[#070b14]/98 px-4 pt-2 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-200 bg-slate-900/80 border border-slate-800"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenVercelGuide();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 border border-slate-700"
            >
              <Rocket className="w-3.5 h-3.5 text-sky-400" />
              <span>Vercel Deploy</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300"
            >
              <LogIn className="w-3.5 h-3.5 text-slate-950" />
              <span>{currentUser ? currentUser.fullName.split(' ')[0] : 'Giriş / CMS'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
