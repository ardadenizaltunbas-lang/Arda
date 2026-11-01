import React, { useState } from 'react';
import {
  Trophy,
  Star,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  Youtube,
  Calendar,
  Flame,
  Filter,
  SlidersHorizontal,
  Crown
} from 'lucide-react';
import { TOP_10_GOALS, TopGoalItem } from '../data/topGoalsData';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

export const TopGoalsRanker: React.FC = () => {
  const [goals, setGoals] = useState<TopGoalItem[]>(TOP_10_GOALS);
  const [ratings, setRatings] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    TOP_10_GOALS.forEach(g => {
      initial[g.id] = g.defaultRating;
    });
    return initial;
  });
  const [copied, setCopied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Move goal up in rank
  const moveUp = (index: number) => {
    if (index === 0) return;
    sounds.playClick();
    const newGoals = [...goals];
    const temp = newGoals[index];
    newGoals[index] = newGoals[index - 1];
    newGoals[index - 1] = temp;
    setGoals(newGoals);
  };

  // Move goal down in rank
  const moveDown = (index: number) => {
    if (index === goals.length - 1) return;
    sounds.playClick();
    const newGoals = [...goals];
    const temp = newGoals[index];
    newGoals[index] = newGoals[index + 1];
    newGoals[index + 1] = temp;
    setGoals(newGoals);
  };

  // Move directly to #1
  const moveToTop = (index: number) => {
    sounds.playFanfare();
    confetti({ particleCount: 60, spread: 60 });
    const newGoals = [...goals];
    const [target] = newGoals.splice(index, 1);
    newGoals.unshift(target);
    setGoals(newGoals);
  };

  // Update rating score
  const handleRatingChange = (id: string, newRate: number) => {
    sounds.playClick();
    setRatings(prev => ({ ...prev, [id]: newRate }));
  };

  // Sort automatically by user's ratings
  const sortByRatings = () => {
    sounds.playFanfare();
    confetti({ particleCount: 90, spread: 80 });
    const sorted = [...goals].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));
    setGoals(sorted);
  };

  // Reset to default
  const handleReset = () => {
    sounds.playClick();
    setGoals(TOP_10_GOALS);
    const initial: Record<string, number> = {};
    TOP_10_GOALS.forEach(g => {
      initial[g.id] = g.defaultRating;
    });
    setRatings(initial);
  };

  // Share / Copy user's ranking
  const copyRankingText = () => {
    sounds.playFanfare();
    confetti({ particleCount: 100, spread: 70 });
    const textLines = goals.map((g, idx) => `${idx + 1}. ${g.title} (${g.matchDate}) - Puan: ${ratings[g.id]}/10`);
    const shareText = `👑 Benim Lionel Messi Top 10 Gol Sıralamam:\n\n${textLines.join('\n')}\n\nSenin 1 numaran hangisi? ⚽`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const openYoutube = (g: TopGoalItem) => {
    sounds.playClick();
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(g.youtubeQuery)}`, '_blank', 'noopener,noreferrer');
  };

  // Filter items
  const filteredGoals = goals.filter(g => {
    if (selectedCategory === 'all') return true;
    return g.category === selectedCategory;
  });

  return (
    <section id="top-goals" className="py-20 relative bg-slate-950/90 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>İnteraktif Oylama & Sıralama Modülü</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            En İyi 10 Gol <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Aday Listesi & Sıralayıcı</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Messi&apos;nin kariyerindeki en ikonik 10 golünü puanlayın, <strong>Yukarı/Aşağı</strong> butonlarıyla kendi kişisel Top 10 listenizi oluşturup arkadaşlarınızla paylaşın!
          </p>

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            <button
              onClick={sortByRatings}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110 flex items-center gap-1.5 shadow-md shadow-amber-500/20 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Verdiğim Puanlara Göre Sırala</span>
            </button>

            <button
              onClick={copyRankingText}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
              <span>{copied ? 'Sıralama Panoya Kopyalandı! ✓' : 'Sıralamamı Kopyala & Paylaş'}</span>
            </button>

            <button
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-slate-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Varsayılana Sıfırla</span>
            </button>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {[
              { id: 'all', label: 'Tüm 10 Aday' },
              { id: 'solo', label: '⚡ Solo Slalomlar' },
              { id: 'chip', label: '🪄 Büyülü Aşırtmalar' },
              { id: 'freekick', label: '🎯 Serbest Vuruşlar' },
              { id: 'header', label: '👑 Kafa Golü' }
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 10 INTERACTIVE GOAL BOXES */}
        <div className="space-y-4">
          {filteredGoals.map((goal) => {
            const currentPosition = goals.findIndex(g => g.id === goal.id) + 1;
            const currentRate = ratings[goal.id] || goal.defaultRating;
            const isFirst = currentPosition === 1;

            return (
              <div
                key={goal.id}
                className={`rounded-3xl border transition-all p-5 sm:p-6 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden group ${
                  isFirst
                    ? 'bg-gradient-to-r from-amber-500/15 via-slate-900/95 to-slate-900 border-amber-400/60 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700 shadow-md'
                }`}
              >
                {/* Left: Position Rank Stamp & Thumbnail */}
                <div className="flex items-center gap-4 w-full lg:w-auto shrink-0">
                  {/* Rank Stamp */}
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex flex-col items-center justify-center font-black shrink-0 shadow-lg ${
                    isFirst
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950'
                      : currentPosition <= 3
                      ? 'bg-slate-800 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-950 text-slate-400 border border-slate-800'
                  }`}>
                    {isFirst && <Crown className="w-4 h-4 fill-slate-950 text-slate-950 -mb-0.5" />}
                    <span className="text-xl sm:text-2xl">#{currentPosition}</span>
                  </div>

                  {/* Bespoke Cartoon Illustration Preview */}
                  <div className="w-24 sm:w-32 h-16 sm:h-20 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 relative group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={goal.image}
                      alt={goal.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  </div>

                  {/* Mobile header info */}
                  <div className="lg:hidden flex-1">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                      {goal.categoryLabel}
                    </span>
                    <h3 className="text-sm font-black text-white line-clamp-1">
                      {goal.title}
                    </h3>
                    <div className="text-[11px] text-slate-400">
                      {goal.matchDate}
                    </div>
                  </div>
                </div>

                {/* Center: Goal Info & Why Listed */}
                <div className="flex-1 space-y-1.5 w-full text-left">
                  <div className="hidden lg:flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-amber-400">
                      {goal.categoryLabel}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-sky-400" />
                      {goal.matchDate} • {goal.match}
                    </span>
                    <span className="text-xs text-slate-500">|</span>
                    <span className="text-xs text-slate-400">{goal.competition}</span>
                  </div>

                  <h3 className="hidden lg:block text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                    {goal.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                    <strong className="text-amber-400">Neden Listede? </strong>
                    {goal.whyListed}
                  </p>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {goal.description}
                  </p>
                </div>

                {/* Right: Rating Slider & Reordering Buttons */}
                <div className="flex flex-col sm:flex-row lg:flex-col items-center sm:items-end justify-between gap-3 w-full lg:w-auto shrink-0 pt-3 sm:pt-0 border-t border-slate-800/80 lg:border-t-0">
                  {/* Rating Selector */}
                  <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="font-mono font-black text-sm text-white">
                        {currentRate.toFixed(1)}
                      </span>
                      <span className="text-[10px] text-slate-500">/10</span>
                    </div>

                    {/* Interactive Rating Steppers */}
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => handleRatingChange(goal.id, Math.max(1, Number((currentRate - 0.1).toFixed(1))))}
                        className="w-5 h-5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                        title="0.1 Düşür"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleRatingChange(goal.id, Math.min(10, Number((currentRate + 0.1).toFixed(1))))}
                        className="w-5 h-5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold"
                        title="0.1 Artır"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Re-ordering Controls */}
                  <div className="flex items-center gap-1.5">
                    {/* Move to #1 directly */}
                    {!isFirst && (
                      <button
                        onClick={() => moveToTop(currentPosition - 1)}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-bold flex items-center gap-1"
                        title="En Tepeye Taşı (1. Sıra)"
                      >
                        <Crown className="w-3.5 h-3.5" />
                        <span>#1 Yap</span>
                      </button>
                    )}

                    {/* Up Arrow */}
                    <button
                      onClick={() => moveUp(currentPosition - 1)}
                      disabled={currentPosition === 1}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Yukarı Taşı"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>

                    {/* Down Arrow */}
                    <button
                      onClick={() => moveDown(currentPosition - 1)}
                      disabled={currentPosition === goals.length}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Aşağı Taşı"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>

                    {/* YouTube Watch Button */}
                    <button
                      onClick={() => openYoutube(goal)}
                      className="p-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 transition-colors"
                      title="Bu Golü YouTube'da İzle"
                    >
                      <Youtube className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
