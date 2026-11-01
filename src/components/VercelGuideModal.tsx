import React from 'react';
import { Rocket, X, Github, CheckCircle, ExternalLink, Code2, Globe } from 'lucide-react';

interface VercelGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelGuideModal: React.FC<VercelGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-white to-slate-400 p-[2px] flex items-center justify-center shadow-lg">
            <div className="w-full h-full bg-black rounded-[14px] flex items-center justify-center text-white">
              <svg className="w-6 h-6 fill-white" viewBox="0 0 116 100">
                <polygon points="58 0 116 100 0 100" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Vercel&apos;e Canlı Yayınlama Rehberi
            </h3>
            <p className="text-xs sm:text-sm text-sky-400 font-semibold">
              Ders projenizi dünyayla paylaşmak için 3 kolay adım
            </p>
          </div>
        </div>

        <div className="space-y-6 text-sm text-slate-300">
          {/* Step 1 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-400 font-black flex items-center justify-center shrink-0">
              1
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Github className="w-4 h-4 text-white" /> Projeyi GitHub&apos;a Yükleyin
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Bu projeyi GitHub hesabınızda yeni bir repo oluşturup oraya yükleyin. Terminalden aşağıdaki komutları kullanabilirsiniz:
              </p>
              <pre className="p-2.5 rounded-lg bg-black text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
                git init{'\n'}git add .{'\n'}git commit -m &quot;Lionel Messi Biyografi Sitesi&quot;{'\n'}git push -u origin main
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 font-black flex items-center justify-center shrink-0">
              2
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-amber-400" /> Vercel&apos;e Giriş Yapın ve Projeyi Ekleyin
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-white">vercel.com</strong> adresine gidin. GitHub ile tek tıkla oturum açtıktan sonra <strong>&quot;Add New...&quot; → &quot;Project&quot;</strong> butonuna tıklayın ve GitHub reponuzu seçin.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex gap-4">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center shrink-0">
              3
            </div>
            <div className="space-y-1.5">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Tek Tıkla Canlıya Alma (Otomatik Ayarlar)
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Vercel, projenin <span className="text-sky-300 font-semibold">Vite + React</span> olduğunu otomatik olarak algılar:
              </p>
              <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                <li><strong>Build Command:</strong> <code className="text-sky-300">npm run build</code></li>
                <li><strong>Output Directory:</strong> <code className="text-sky-300">dist</code></li>
                <li><strong>Install Command:</strong> <code className="text-sky-300">npm install</code></li>
              </ul>
              <p className="text-xs text-slate-400 pt-1">
                <strong>&quot;Deploy&quot;</strong> butonuna bastığınız anda 30 saniye içinde siteniz <code className="text-amber-400">https://projeniz.vercel.app</code> adresinde canlıya geçer!
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Ders Sunumunda doğrudan bu linki kullanabilirsiniz!
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
          >
            Anladım, Harika!
          </button>
        </div>
      </div>
    </div>
  );
};
