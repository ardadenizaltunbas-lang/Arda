import React, { useState } from 'react';
import {
  X,
  Lock,
  User,
  ShieldCheck,
  Sparkles,
  Heart,
  Trophy,
  Check,
  LogOut,
  LogIn
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export interface FanUser {
  fullName: string;
  username: string;
  favoriteClub: string;
}

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedInAdmin: boolean;
  onAdminLogin: () => void;
  onAdminLogout: () => void;
  currentUser: FanUser | null;
  onFanLogin: (user: FanUser) => void;
  onFanLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  isLoggedInAdmin,
  onAdminLogin,
  onAdminLogout,
  currentUser,
  onFanLogin,
  onFanLogout
}) => {
  const [activeTab, setActiveTab] = useState<'fan' | 'admin'>('fan');

  // Fan form state
  const [fanFullName, setFanFullName] = useState(currentUser?.fullName || '');
  const [fanUsername, setFanUsername] = useState(currentUser?.username || '');
  const [favoriteClub, setFavoriteClub] = useState(currentUser?.favoriteClub || 'Arjantin Milli Takımı');

  // Admin form state
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState(false);

  if (!isOpen) return null;

  const handleFanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fanFullName.trim()) return;

    sounds.playFanfare();
    confetti({
      particleCount: 60,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#fbbf24', '#ffffff']
    });

    const user: FanUser = {
      fullName: fanFullName.trim(),
      username: fanUsername.trim() ? (fanUsername.startsWith('@') ? fanUsername : `@${fanUsername}`) : `@${fanFullName.toLowerCase().replace(/\s+/g, '')}`,
      favoriteClub
    };

    onFanLogin(user);
    onClose();
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'messi10') {
      sounds.playFanfare();
      setAdminError(false);
      onAdminLogin();
      setPassword('');
      onClose();
    } else {
      sounds.playBuzzer();
      setAdminError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-sky-950/60 overflow-hidden">
        {/* Decorative Top Glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-800 pb-3">
          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('fan');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'fan'
                ? 'bg-gradient-to-r from-sky-500 to-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Taraftar Girişi</span>
          </button>

          <button
            onClick={() => {
              sounds.playClick();
              setActiveTab('admin');
            }}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'admin'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/20'
                : 'text-slate-400 hover:text-white bg-slate-950/60'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Yönetici (CMS)</span>
          </button>
        </div>

        {/* TAB 1: TARAFTAR GİRİŞİ */}
        {activeTab === 'fan' && (
          <div>
            {currentUser ? (
              /* Already logged in Fan Card */
              <div className="text-center space-y-4 py-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-cyan-400 to-sky-600 flex items-center justify-center text-2xl font-black text-slate-950 shadow-lg">
                  {currentUser.fullName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">{currentUser.fullName}</h3>
                  <p className="text-xs text-cyan-400 font-mono">{currentUser.username}</p>
                  <p className="text-xs text-slate-400 mt-1">Favori: {currentUser.favoriteClub}</p>
                </div>
                <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-amber-300 flex items-center justify-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-400" />
                  <span>Onaylı Messi Taraftarı Pasaportu Aktif</span>
                </div>
                <div className="pt-2 flex gap-2">
                  <button
                    onClick={() => {
                      sounds.playClick();
                      onFanLogout();
                    }}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    <span>Çıkış Yap</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black transition-colors cursor-pointer"
                  >
                    Siteye Dön
                  </button>
                </div>
              </div>
            ) : (
              /* Fan Sign-In Form */
              <form onSubmit={handleFanSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-black text-white">Taraftar Pasaportu Oluştur</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    İsmini yazarak yorumlarda ve forma tasarımında kendi kimliğinle yer al!
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    İsim & Soyisim *
                  </label>
                  <input
                    type="text"
                    required
                    value={fanFullName}
                    onChange={e => setFanFullName(e.target.value)}
                    placeholder="Örn: Arda Altunbaş"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Kullanıcı Adı (İsteğe bağlı)
                  </label>
                  <input
                    type="text"
                    value={fanUsername}
                    onChange={e => setFanUsername(e.target.value)}
                    placeholder="@arda10"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    En Sevdiğin Messi Dönemi / Takımı
                  </label>
                  <select
                    value={favoriteClub}
                    onChange={e => setFavoriteClub(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Arjantin Milli Takımı">🇦🇷 Arjantin Milli Takımı (Dünya Şampiyonu)</option>
                    <option value="FC Barcelona">🔵🔴 FC Barcelona (Efsane Dönem)</option>
                    <option value="Inter Miami CF">🩷 Inter Miami CF (MLS & Leagues Cup)</option>
                    <option value="Paris Saint-Germain">🇫🇷 Paris Saint-Germain</option>
                    <option value="Newell's Old Boys">🔴⚫ Newell&apos;s Old Boys (Çocukluk Kulübü)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-300 hover:brightness-110 shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 mt-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Giriş Yap & Profilimi Başlat</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* TAB 2: YÖNETİCİ / CMS GİRİŞİ */}
        {activeTab === 'admin' && (
          <div>
            {isLoggedInAdmin ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center shadow-lg">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white">Yönetici Modu Açık</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Biyografi, başarılar, kupalar ve videoları sitede doğrudan düzenleyebilirsiniz.
                  </p>
                </div>
                <button
                  onClick={() => {
                    sounds.playClick();
                    onAdminLogout();
                  }}
                  className="w-full py-3 rounded-2xl font-bold text-xs text-rose-300 bg-rose-950/40 border border-rose-800 hover:bg-rose-900/60 transition-colors cursor-pointer"
                >
                  Yönetici Çıkışı Yap
                </button>
              </div>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-lg font-black text-white">CMS Yönetici Paneli</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Site içeriklerini ve başarıları düzenlemek için şifrenizi girin.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Yönetici Şifresi</span>
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Şifrenizi yazın..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                {adminError && (
                  <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-bold animate-bounce text-center">
                    Hatalı şifre! Lütfen tekrar deneyin.
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110 shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Yönetici Olarak Giriş Yap</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
