import React, { useState } from 'react';
import { Flame, Quote, Sparkles, RefreshCw, Trophy, Award, Filter, ChevronLeft, ChevronRight, MessageSquareQuote } from 'lucide-react';
import { MessiWebsiteData, FamousQuote } from '../data/messiData';
import { sounds } from '../utils/soundEffects';

interface RecordsSectionProps {
  data: MessiWebsiteData;
}

export const RecordsSection: React.FC<RecordsSectionProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coach' | 'rival' | 'legend' | 'teammate'>('all');
  const [activeQuoteIndex, setActiveQuoteIndex] = useState(0);

  const filteredQuotes = data.quotes.filter(q => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  const nextQuote = () => {
    sounds.playClick();
    setActiveQuoteIndex(prev => (prev + 1) % filteredQuotes.length);
  };

  const prevQuote = () => {
    sounds.playClick();
    setActiveQuoteIndex(prev => (prev - 1 + filteredQuotes.length) % filteredQuotes.length);
  };

  const currentQuote: FamousQuote = filteredQuotes[activeQuoteIndex] || filteredQuotes[0] || data.quotes[0];

  const categories = [
    { id: 'all', label: `Tüm Sözler (${data.quotes.length})` },
    { id: 'coach', label: 'Teknik Direktörler 📋' },
    { id: 'rival', label: 'Ezeli Rakipler & Kaleciler ⚔️' },
    { id: 'legend', label: 'Futbol Efsaneleri & Spikerler 🎙️' },
    { id: 'teammate', label: 'Takım Arkadaşları 🤝' },
  ];

  return (
    <section id="records" className="py-20 relative bg-[#070b14]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>İlginç Gerçekler & Rekorlar Modülü</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Kırılması İmkânsız <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-400">Rekorlar</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Futbol tarihinin sayfalarına altın harflerle kazınan eşsiz istatistikler ve futbol dünyasının dev isimlerinin Messi hakkındaki hayranlık dolu sözleri.
          </p>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.interestingRecords.map((record, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/40 transition-all hover:-translate-y-1 shadow-lg group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-[11px] font-bold text-sky-400 border border-slate-700">
                  {record.badge}
                </span>
                <Sparkles className="w-4 h-4 text-amber-400 opacity-60 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-3xl font-black text-white group-hover:text-amber-300 transition-colors font-mono">
                {record.value}
              </div>

              <h4 className="text-base font-bold text-slate-200 mt-2">
                {record.title}
              </h4>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                {record.description}
              </p>
            </div>
          ))}
        </div>

        {/* EXPANDED QUOTES SHOWCASE (Futbol Dünyasının Övgü Dolu Sözleri) */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <MessageSquareQuote className="w-5 h-5 text-amber-400" />
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Futbol Dünyasından Messi&apos;ye Övgüler
              </h3>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => {
                    sounds.playClick();
                    setSelectedCategory(cat.id as typeof selectedCategory);
                    setActiveQuoteIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                      : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Quote Highlight Card */}
          {currentQuote && (
            <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-amber-500/30 p-8 sm:p-12 shadow-2xl overflow-hidden">
              <div className="absolute -top-10 -right-10 w-60 h-60 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />

              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-4 max-w-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center font-black text-amber-300 text-sm">
                      {currentQuote.avatarText || '10'}
                    </div>
                    <div>
                      <div className="text-lg font-black text-amber-400">
                        {currentQuote.author}
                      </div>
                      <div className="text-xs text-slate-400">
                        {currentQuote.role}
                      </div>
                    </div>
                  </div>

                  <blockquote className="text-lg sm:text-2xl font-bold text-white italic leading-relaxed pt-2">
                    &ldquo;{currentQuote.quote}&rdquo;
                  </blockquote>

                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>Söz {activeQuoteIndex + 1} / {filteredQuotes.length}</span>
                    <span>•</span>
                    <span className="text-sky-400 font-semibold">Tarihe Geçen Açıklamalar</span>
                  </div>
                </div>

                {/* Slider Controls */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={prevQuote}
                    className="p-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                    title="Önceki Söz"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextQuote}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    <span>Sıradaki</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Quote Grid Carousel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
            {filteredQuotes.map((q, idx) => (
              <div
                key={q.id || idx}
                onClick={() => {
                  sounds.playClick();
                  setActiveQuoteIndex(idx);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  currentQuote.id === q.id
                    ? 'bg-amber-500/10 border-amber-500/50 text-white shadow-md shadow-amber-500/10'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold text-amber-400 mb-2">
                  <span>{q.author}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{q.avatarText}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-3 italic">
                  &ldquo;{q.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
