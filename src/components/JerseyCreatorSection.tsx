import React, { useState, useRef } from 'react';
import {
  Shirt,
  Sparkles,
  Download,
  Share2,
  Check,
  RotateCw,
  Award,
  Crown,
  Heart,
  Flame,
  Palette
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface KitTheme {
  id: string;
  name: string;
  team: string;
  subtitle: string;
  primaryBg: string;
  stripes?: string;
  accentColor: string;
  fontColor: string;
  goldAccent: string;
  collarColor: string;
  badgeText: string;
  stars: number;
}

const KITS: KitTheme[] = [
  {
    id: 'argentina-2022',
    name: 'Arjantin 2022',
    team: 'Milli Takım',
    subtitle: 'Katar Dünya Kupası Şampiyonluk Forması',
    primaryBg: '#ffffff',
    stripes: 'repeating-linear-gradient(90deg, #38bdf8 0px, #38bdf8 34px, #ffffff 34px, #ffffff 68px)',
    accentColor: '#38bdf8',
    fontColor: '#0f172a',
    goldAccent: '#fbbf24',
    collarColor: '#0f172a',
    badgeText: 'AFA 3-STAR CHAMPION',
    stars: 3
  },
  {
    id: 'barca-classic',
    name: 'Barcelona Efsane',
    team: 'FC Barcelona',
    subtitle: '2015 Berlin Üçleme (Triplete) Forması',
    primaryBg: '#1e1b4b',
    stripes: 'repeating-linear-gradient(90deg, #1e3a8a 0px, #1e3a8a 38px, #881337 38px, #881337 76px)',
    accentColor: '#f59e0b',
    fontColor: '#fbbf24',
    goldAccent: '#f59e0b',
    collarColor: '#fbbf24',
    badgeText: 'FCB MÉS QUE UN CLUB',
    stars: 5
  },
  {
    id: 'inter-miami',
    name: 'Inter Miami Pembe',
    team: 'Inter Miami CF',
    subtitle: '2023 Leagues Cup Zafer Forması',
    primaryBg: '#f472b6',
    stripes: undefined,
    accentColor: '#18181b',
    fontColor: '#18181b',
    goldAccent: '#f59e0b',
    collarColor: '#18181b',
    badgeText: 'THE HERONS • MIAMI #10',
    stars: 1
  },
  {
    id: 'argentina-black-gold',
    name: 'Siyah & Altın Özel Seri',
    team: 'Özel Hatıra Koleksiyonu',
    subtitle: 'Limited Edition D10S Memorial Jersey',
    primaryBg: '#090d16',
    stripes: 'repeating-linear-gradient(90deg, #090d16 0px, #090d16 38px, #172033 38px, #172033 76px)',
    accentColor: '#fbbf24',
    fontColor: '#fbbf24',
    goldAccent: '#fbbf24',
    collarColor: '#fbbf24',
    badgeText: 'D10S GOLDEN LEGACY',
    stars: 3
  }
];

export const JerseyCreatorSection: React.FC = () => {
  const [selectedKit, setSelectedKit] = useState<KitTheme>(KITS[0]);
  const [playerName, setPlayerName] = useState<string>('MESSI');
  const [playerNumber, setPlayerNumber] = useState<string>('10');
  const [hasCaptainBand, setHasCaptainBand] = useState<boolean>(true);
  const [hasSignature, setHasSignature] = useState<boolean>(true);
  const [viewSide, setViewSide] = useState<'back' | 'front'>('back');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const jerseyCardRef = useRef<HTMLDivElement>(null);

  const cleanName = (playerName.trim() || 'MESSI').toUpperCase().slice(0, 14);
  const cleanNumber = (playerNumber.trim() || '10').slice(0, 2);

  const handleDownloadJersey = () => {
    sounds.playFanfare();
    setIsDownloading(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#38bdf8', '#ffffff']
    });

    // Create high-resolution Canvas export (1200 x 1400)
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1400;
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      setIsDownloading(false);
      return;
    }

    // Background Studio Atmosphere
    const bgGrad = ctx.createRadialGradient(600, 600, 100, 600, 700, 800);
    bgGrad.addColorStop(0, '#0f172a');
    bgGrad.addColorStop(1, '#050811');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 1400);

    // Decorative Gold Border & Certificate Framing
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 6;
    ctx.strokeRect(40, 40, 1120, 1320);

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(55, 55, 1090, 1290);

    // Header Certificate Text
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 32px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIONEL MESSI RESMİ TARAFTAR HATIRA FORMASI', 600, 115);

    ctx.fillStyle = '#94a3b8';
    ctx.font = '20px sans-serif';
    ctx.fillText(`${selectedKit.team.toUpperCase()} • ${selectedKit.subtitle.toUpperCase()}`, 600, 155);

    // Jersey Silhouette & Body
    const jx = 250;
    const jy = 220;
    const jw = 700;
    const jh = 880;

    ctx.save();
    // Rounded jersey shape
    ctx.beginPath();
    ctx.roundRect(jx, jy, jw, jh, [40, 40, 30, 30]);
    ctx.clip();

    // Fill Jersey Base
    ctx.fillStyle = selectedKit.primaryBg;
    ctx.fillRect(jx, jy, jw, jh);

    // Stripes if applicable
    if (selectedKit.stripes) {
      const stripeWidth = 55;
      for (let x = jx; x < jx + jw; x += stripeWidth * 2) {
        ctx.fillStyle = selectedKit.accentColor;
        ctx.fillRect(x, jy, stripeWidth, jh);
      }
    }

    // Collar
    ctx.fillStyle = selectedKit.collarColor;
    ctx.beginPath();
    ctx.arc(600, jy, 110, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = selectedKit.primaryBg;
    ctx.beginPath();
    ctx.arc(600, jy, 85, 0, Math.PI);
    ctx.fill();

    ctx.restore();

    // Jersey Border Shadow
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(jx, jy, jw, jh, [40, 40, 30, 30]);
    ctx.stroke();

    // Captain's Armband if enabled
    if (hasCaptainBand) {
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(jx - 15, jy + 320, 60, 90);
      ctx.fillStyle = '#0f172a';
      ctx.font = 'bold 50px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('C', jx + 15, jy + 385);
    }

    if (viewSide === 'back') {
      // BACK VIEW: NAME & NUMBER & SIGNATURE
      // 1. Name
      ctx.fillStyle = selectedKit.fontColor;
      ctx.font = '900 76px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(cleanName, 600, jy + 250);

      // 2. Number
      ctx.fillStyle = selectedKit.fontColor;
      ctx.font = '900 240px sans-serif';
      ctx.fillText(cleanNumber, 600, jy + 490);

      // 3. Lionel Messi Signature
      if (hasSignature) {
        ctx.fillStyle = '#fbbf24';
        ctx.font = 'italic bold 64px "Brush Script MT", cursive, sans-serif';
        ctx.fillText('Leo Messi 10', 600, jy + 600);

        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(420, jy + 615);
        ctx.bezierCurveTo(550, jy + 625, 650, jy + 590, 780, jy + 620);
        ctx.stroke();

        ctx.fillStyle = '#e2e8f0';
        ctx.font = 'bold 18px monospace';
        ctx.fillText('★ OFFICIAL AUTHENTIC SIGNATURE STAMP ★', 600, jy + 660);
      }
    } else {
      // FRONT VIEW: CREST & STARS & CHEST NUMBER
      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('★ ★ ★', 600, jy + 240);

      ctx.fillStyle = selectedKit.fontColor;
      ctx.font = '900 120px sans-serif';
      ctx.fillText(cleanNumber, 600, jy + 480);

      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 28px sans-serif';
      ctx.fillText(selectedKit.badgeText, 600, jy + 600);
    }

    // Certificate Footer & Watermark
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 22px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIONEL ANDRÉS MESSI • D10S GOAT MEMORIAL ARCHIVE', 600, 1260);

    ctx.fillStyle = '#64748b';
    ctx.font = '16px monospace';
    ctx.fillText(`SERTİFİKA NO: LEO-${Date.now().toString().slice(-8)} • KİŞİYE ÖZEL KOLEKSİYON`, 600, 1300);

    // Convert to PNG download
    const link = document.createElement('a');
    link.download = `Lionel_Messi_Hatira_Formasi_${cleanName}_${cleanNumber}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setTimeout(() => {
      setIsDownloading(false);
    }, 800);
  };

  const handleShare = () => {
    sounds.playFanfare();
    const shareText = `👑 Kendi Lionel Messi Hatıra Formamı Tasarladım!\nİsim: ${cleanName}\nForma No: #${cleanNumber}\nModel: ${selectedKit.name} (Leo Messi İmzalı!)\nSen de kendi formanı tasarla ⚽`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section id="jersey-creator" className="py-20 relative bg-[#060913] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Shirt className="w-4 h-4 text-amber-400" />
            <span>Kişiye Özel Hatıra Forma Stüdyosu</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Hatıra Forma <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Tasarla & İmzalat</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Kendi isminizi ve favori numaranızı yazın, tarihi Messi formalarından birini seçin; <strong>Lionel Messi&apos;nin altın imzasıyla</strong> onaylı yüksek çözünürlüklü hatıra formanızı hemen indirin!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* LEFT: Customization Form & Options */}
          <div className="lg:col-span-6 space-y-6">
            {/* 1. Kit Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4 text-amber-400" />
                <span>1. Efsanevi Forma Modelini Seçin</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {KITS.map(kit => (
                  <button
                    key={kit.id}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedKit(kit);
                    }}
                    className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                      selectedKit.id === kit.id
                        ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/20 scale-102'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-white">{kit.name}</span>
                      {selectedKit.id === kit.id && (
                        <Check className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1">{kit.subtitle}</p>
                    <div
                      className="h-1.5 w-full rounded-full mt-2"
                      style={{ background: kit.stripes || kit.primaryBg, border: '1px solid rgba(255,255,255,0.2)' }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Name & Number Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Formaya Yazılacak İsim
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={playerName}
                  onChange={e => setPlayerName(e.target.value)}
                  placeholder="Örn: ARDA veya MESSI"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-black text-base uppercase tracking-wider focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Forma No
                </label>
                <input
                  type="text"
                  maxLength={2}
                  value={playerNumber}
                  onChange={e => setPlayerNumber(e.target.value.replace(/\D/g, ''))}
                  placeholder="10"
                  className="w-full px-4 py-3 rounded-2xl bg-slate-950 border border-slate-700 text-white font-mono font-black text-base text-center focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
                />
              </div>
            </div>

            {/* 3. Toggles: Captain Band & Authentic Signature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div
                onClick={() => {
                  sounds.playClick();
                  setHasCaptainBand(!hasCaptainBand);
                }}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  hasCaptainBand
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Kaptanlık Pazubandı (C)</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  hasCaptainBand ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                }`}>
                  {hasCaptainBand ? '✓' : ''}
                </div>
              </div>

              <div
                onClick={() => {
                  sounds.playClick();
                  setHasSignature(!hasSignature);
                }}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  hasSignature
                    ? 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold">Messi Altın İmzası</span>
                </div>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  hasSignature ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-500'
                }`}>
                  {hasSignature ? '✓' : ''}
                </div>
              </div>
            </div>

            {/* 4. Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={handleDownloadJersey}
                disabled={isDownloading}
                className="flex-1 py-3.5 px-6 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:brightness-110 shadow-xl shadow-amber-500/30 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>{isDownloading ? 'Forma Hazırlanıyor...' : 'Formamı Yüksek Çözünürlükte İndir (PNG)'}</span>
              </button>

              <button
                onClick={handleShare}
                className="py-3.5 px-5 rounded-2xl font-bold text-sm text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 flex items-center gap-2 cursor-pointer transition-colors"
                title="Tasarımı Paylaş"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
                <span>{copied ? 'Kopyalandı!' : 'Paylaş'}</span>
              </button>

              <button
                onClick={() => {
                  sounds.playClick();
                  setViewSide(viewSide === 'back' ? 'front' : 'back');
                }}
                className="p-3.5 rounded-2xl font-bold text-sm text-slate-300 bg-slate-950 border border-slate-800 hover:text-white flex items-center gap-1.5 cursor-pointer"
                title="Ön / Arka Görünümü Çevir"
              >
                <RotateCw className="w-4 h-4 text-amber-400" />
                <span className="text-xs">{viewSide === 'back' ? 'Önü Gör' : 'Arkayı Gör'}</span>
              </button>
            </div>
          </div>

          {/* RIGHT: LIVE 3D JERSEY PREVIEW CARD */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              ref={jerseyCardRef}
              className="relative w-full max-w-md p-6 sm:p-8 rounded-[36px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border-2 border-amber-400/40 shadow-2xl shadow-amber-500/10 flex flex-col items-center"
            >
              {/* Studio lighting top glow */}
              <div className="absolute top-0 inset-x-12 h-24 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

              {/* Certificate Top Header */}
              <div className="relative z-10 text-center mb-6">
                <span className="text-[10px] font-mono tracking-widest text-amber-400 font-bold uppercase">
                  ★ OFFICIAL FAN MEMORIAL EDITION ★
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  {selectedKit.name} Hatıra Forması
                </h3>
              </div>

              {/* THE JERSEY MOCKUP CONTAINER */}
              <div className="relative w-72 sm:w-80 h-96 sm:h-[420px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 transition-all duration-500 flex flex-col items-center justify-between p-6">
                {/* Fabric Background Pattern */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundColor: selectedKit.primaryBg,
                    backgroundImage: selectedKit.stripes
                  }}
                />

                {/* Lighting gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10 pointer-events-none" />

                {/* Collar */}
                <div
                  className="relative z-10 w-28 h-8 rounded-b-full border-b-4 shadow-md -mt-6"
                  style={{
                    backgroundColor: selectedKit.collarColor,
                    borderColor: selectedKit.goldAccent
                  }}
                />

                {/* Captain's Armband if enabled */}
                {hasCaptainBand && (
                  <div className="absolute top-28 left-2 z-20 px-2.5 py-4 bg-amber-400 text-slate-950 font-black text-sm rounded shadow-lg border border-slate-900 transform -rotate-6">
                    C
                  </div>
                )}

                {/* BACK VIEW: NAME & NUMBER & SIGNATURE */}
                {viewSide === 'back' ? (
                  <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center mt-2">
                    {/* Player Name */}
                    <div
                      className="font-black text-2xl sm:text-3xl tracking-widest drop-shadow-md"
                      style={{ color: selectedKit.fontColor }}
                    >
                      {cleanName}
                    </div>

                    {/* Player Number */}
                    <div
                      className="font-mono font-black text-7xl sm:text-8xl leading-none my-1 drop-shadow-xl"
                      style={{ color: selectedKit.fontColor }}
                    >
                      {cleanNumber}
                    </div>

                    {/* Authentic Lionel Messi Signature Stamp */}
                    {hasSignature && (
                      <div className="mt-2 text-center">
                        <div
                          className="font-serif italic font-black text-2xl sm:text-3xl text-amber-400 tracking-wider drop-shadow transform -rotate-3"
                          style={{ fontFamily: '"Brush Script MT", cursive, sans-serif' }}
                        >
                          Leo Messi 10
                        </div>
                        <div className="h-0.5 w-32 mx-auto bg-amber-400/80 rounded-full my-1 shadow" />
                        <span className="inline-block text-[9px] font-mono tracking-wider font-bold text-amber-300 bg-slate-950/80 px-2 py-0.5 rounded-full border border-amber-500/30">
                          ✓ ONAYLI İMZA DAMGASI
                        </span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* FRONT VIEW: CREST, 3 STARS & BADGES */
                  <div className="relative z-10 w-full flex-1 flex flex-col items-center justify-center text-center">
                    <div className="text-amber-400 text-lg tracking-widest mb-2 font-black">
                      {'★'.repeat(selectedKit.stars)}
                    </div>
                    <div
                      className="font-mono font-black text-5xl leading-none my-3"
                      style={{ color: selectedKit.fontColor }}
                    >
                      {cleanNumber}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-slate-950/80 text-[10px] font-bold text-sky-400 border border-slate-700">
                      {selectedKit.badgeText}
                    </div>
                  </div>
                )}

                {/* Authentic Hem Label Badge */}
                <div className="relative z-10 self-end -mb-2">
                  <div className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 text-[8px] font-black uppercase tracking-wider shadow">
                    GOAT CERTIFIED
                  </div>
                </div>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5 font-mono">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Kişiye Özel Hatıra Koleksiyon Kartı</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
