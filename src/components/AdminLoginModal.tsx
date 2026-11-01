import React, { useState } from 'react';
import { Lock, KeyRound, X, Check, ShieldCheck, AlertCircle, Download, RotateCcw } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { MessiWebsiteData, resetStoredMessiData } from '../data/messiData';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
  currentData: MessiWebsiteData;
  onResetData: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isLoggedIn,
  onLogout,
  currentData,
  onResetData
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple admin password check
    if (password === 'messi10' || password === 'admin' || password === 'goat') {
      sounds.playFanfare();
      setError(false);
      onLoginSuccess();
      onClose();
    } else {
      sounds.playBuzzer();
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    sounds.playFanfare();
    setError(false);
    onLoginSuccess();
    onClose();
  };

  const exportJSON = () => {
    sounds.playClick();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(currentData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "messi_website_data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative max-w-md w-full bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {!isLoggedIn ? (
          <div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4 mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center mb-6">
              <h3 className="text-2xl font-black text-white">Yönetici Girişi (CMS)</h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Web sitesinin içeriklerini, başarılarını ve istatistiklerini canlı olarak düzenlemek için giriş yapın.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Yönetici Şifresi
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                  <input
                    type="password"
                    placeholder="Şifreyi giriniz..."
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 outline-none"
                  />
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-1.5 text-xs text-rose-400">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>Hatalı şifre! (İpucu: messi10)</span>
                </div>
              )}

              {/* Friendly Hint */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                <span className="font-bold text-amber-400">Ders projesi şifresi: </span>
                <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded">messi10</code>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl font-bold text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-md"
                >
                  Giriş Yap
                </button>

                <button
                  type="button"
                  onClick={handleQuickDemoLogin}
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-sky-300 bg-sky-950/40 border border-sky-800/60 hover:bg-sky-900/40 transition-all"
                >
                  ⚡ Tek Tıkla Hızlı Giriş (Demo)
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* When Already Logged In: CMS Control Panel */
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Yönetici Modu Aktif</h3>
                <p className="text-xs text-emerald-400 font-semibold">Tüm modüller düzenlemeye açık</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Sayfadaki kupa kartlarında, biyografide ve kulüp istatistiklerinde yer alan <span className="text-amber-400 font-bold">Düzenle / Ekle</span> butonlarını kullanarak web sitesini özelleştirebilirsiniz. Yapılan değişiklikler tarayıcınızda otomatik kaydedilir.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <button
                onClick={exportJSON}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-sky-400" />
                <span>Düzenlenmiş Veriyi İndir (JSON Export)</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Tüm değişiklikleri sıfırlayıp orijinal verilere dönmek istiyor musunuz?')) {
                    onResetData();
                    onClose();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-rose-300 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-800/50 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Varsayılan Verilere Sıfırla</span>
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-400 hover:text-white bg-slate-950"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
