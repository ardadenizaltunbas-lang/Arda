import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid
} from 'recharts';
import { Activity, Clock, Flame, Info, CheckCircle2, Trophy, Sparkles, Filter } from 'lucide-react';
import { INTERVAL_DATA, MINUTE_DATA, STOPPAGE_TIME_STAT, MinuteGoalStat } from '../data/goalMinuteData';
import { sounds } from '../utils/soundEffects';

export const GoalDistributionSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chart' | 'matrix'>('matrix');
  const [selectedMinute, setSelectedMinute] = useState<MinuteGoalStat | null>(MINUTE_DATA[76]); // Default 77th minute (Boateng chip)
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'firstHalf' | 'secondHalf' | 'lethal'>('all');

  const filteredMinutes = MINUTE_DATA.filter(item => {
    if (filterPeriod === 'firstHalf') return item.minute <= 45;
    if (filterPeriod === 'secondHalf') return item.minute > 45;
    if (filterPeriod === 'lethal') return item.goals >= 15;
    return true;
  });

  const handleCellClick = (m: MinuteGoalStat) => {
    sounds.playClick();
    setSelectedMinute(m);
  };

  return (
    <section id="goal-distribution" className="py-20 relative bg-[#070b14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Opta & Tarihsel İstatistik Analizi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            90 Dakikalık <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">Gol Dağılımı</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Futbol tarihinde bir maçın <strong>1. dakikasından 90+. dakikasına kadar HER BİR dakikada</strong> gol atmayı başarmış nadir efsanelerden biri: Lionel Messi!
          </p>

          {/* View Switcher Tabs */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('matrix');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'matrix'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>1&apos;den 90+&apos;ya Dakika Isı Haritası (Matrix)</span>
            </button>

            <button
              onClick={() => {
                sounds.playClick();
                setActiveTab('chart');
              }}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
                activeTab === 'chart'
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 scale-105'
                  : 'bg-slate-900 text-slate-300 border border-slate-800 hover:text-white'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>15 Dakikalık Aralıklar Grafiği (Recharts)</span>
            </button>
          </div>
        </div>

        {/* Highlight Banner: 90 Minutes Completed */}
        <div className="mb-10 p-5 rounded-3xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <div>
              <div className="text-sm font-black text-white flex items-center gap-1.5">
                <span>Tamamlanan Matris: 90/90 Dakika Yeşil!</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">%100 Doluluk</span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Messi, 2023 yılında Avustralya&apos;ya 1. dakikada (79. saniye) attığı golle 90 dakikanın tamamını yeşile boyayarak kariyerindeki son eksik dakikayı tamamlamıştır.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-emerald-500 shadow-sm shadow-emerald-500/50" />
              <span className="text-slate-300 font-semibold">Gol Atıldı (Yeşil)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-md bg-rose-900/60 border border-rose-600/40" />
              <span className="text-slate-400">Atılmamış Dakika Yok (0 Kırmızı)</span>
            </div>
          </div>
        </div>

        {/* TAB 1: 90-MINUTE MATRIX GRID */}
        {activeTab === 'matrix' && (
          <div className="space-y-8">
            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-slate-400" />
                <span className="text-xs font-bold text-slate-400 uppercase">Filtrele:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'all', label: 'Tüm Dakikalar (1-90)' },
                  { id: 'firstHalf', label: 'İlk Yarı (1-45\')' },
                  { id: 'secondHalf', label: 'İkinci Yarı (46-90\')' },
                  { id: 'lethal', label: '🔥 En Ölümcül Dakikalar (≥15 Gol)' },
                ].map(f => (
                  <button
                    key={f.id}
                    onClick={() => {
                      sounds.playClick();
                      setFilterPeriod(f.id as typeof filterPeriod);
                    }}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      filterPeriod === f.id
                        ? 'bg-slate-200 text-slate-950 font-bold'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Matrix Board */}
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="grid grid-cols-5 sm:grid-cols-9 md:grid-cols-10 lg:grid-cols-15 gap-2 sm:gap-2.5">
                {filteredMinutes.map(m => {
                  const isSelected = selectedMinute?.minute === m.minute;
                  // Color intensity based on goal count
                  const isHigh = m.goals >= 15;
                  const isMid = m.goals >= 10 && m.goals < 15;

                  return (
                    <button
                      key={m.minute}
                      onClick={() => handleCellClick(m)}
                      title={`${m.minute}. Dakika: ${m.goals} Gol`}
                      className={`relative p-2 sm:p-2.5 rounded-xl text-center transition-all cursor-pointer group ${
                        isSelected
                          ? 'ring-2 ring-amber-400 bg-amber-400/20 scale-110 z-10'
                          : isHigh
                          ? 'bg-emerald-500/30 border border-emerald-400/50 hover:bg-emerald-400/40 hover:scale-105'
                          : isMid
                          ? 'bg-emerald-600/20 border border-emerald-500/30 hover:bg-emerald-500/30 hover:scale-105'
                          : 'bg-emerald-700/15 border border-emerald-600/20 hover:bg-emerald-600/25 hover:scale-105'
                      }`}
                    >
                      <div className="text-[10px] text-slate-400 group-hover:text-white font-mono">
                        {m.minute}&apos;
                      </div>
                      <div className="text-xs sm:text-sm font-black text-emerald-400 group-hover:text-emerald-300">
                        {m.goals}
                      </div>
                    </button>
                  );
                })}

                {/* Stoppage Time Cell */}
                <button
                  onClick={() => handleCellClick(STOPPAGE_TIME_STAT)}
                  title="90+ Duraklama Dakikaları: 41 Gol"
                  className={`p-2 sm:p-2.5 rounded-xl text-center transition-all cursor-pointer col-span-2 sm:col-span-1 bg-gradient-to-r from-amber-500/30 to-emerald-500/30 border border-amber-400/50 hover:scale-105 ${
                    selectedMinute?.minute === 90 && selectedMinute?.goals === 41
                      ? 'ring-2 ring-amber-400 scale-110 z-10'
                      : ''
                  }`}
                >
                  <div className="text-[10px] text-amber-300 font-mono">90+&apos;</div>
                  <div className="text-xs sm:text-sm font-black text-amber-300">41</div>
                </button>
              </div>
            </div>

            {/* Selected Minute Inspection Card */}
            {selectedMinute && (
              <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-500/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex flex-col items-center justify-center font-mono">
                    <span className="text-xs text-emerald-400 font-bold">DAKİKA</span>
                    <span className="text-2xl font-black text-white">{selectedMinute.minute}&apos;</span>
                  </div>
                  <div>
                    <div className="text-lg font-black text-white flex items-center gap-2">
                      <span>Toplam {selectedMinute.goals} Gol Atıldı</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
                        Aktif Kayıt
                      </span>
                    </div>
                    {selectedMinute.iconicMatch ? (
                      <p className="text-xs sm:text-sm text-amber-300 font-semibold mt-1">
                        🌟 <strong>İkonik Maç:</strong> {selectedMinute.iconicMatch}
                      </p>
                    ) : (
                      <p className="text-xs text-slate-400 mt-1">
                        La Liga, Şampiyonlar Ligi ve Arjantin Milli Takımı resmi maçlarında kaydedilmiştir.
                      </p>
                    )}
                  </div>
                </div>

                <div className="text-xs text-slate-400 max-w-xs text-right">
                  Diğer dakikaları incelemek için yukarıdaki matristen herhangi bir kutucuğa tıklayabilirsiniz.
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: RECHARTS 15-MINUTE BAR CHART */}
        {activeTab === 'chart' && (
          <div className="space-y-8">
            <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-black text-white">
                    15&apos;er Dakikalık Periyot Dağılımı
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Messi&apos;nin maçın hangi bölümlerinde daha çok gol attığının analizi
                  </p>
                </div>
                <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                  <Flame className="w-4 h-4" />
                  <span>En Çok: 76-90&apos; (176 Gol)</span>
                </div>
              </div>

              {/* Chart Container */}
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={INTERVAL_DATA} margin={{ top: 20, right: 20, left: -10, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis
                      dataKey="interval"
                      stroke="#94a3b8"
                      tick={{ fill: '#cbd5e1', fontSize: 12, fontWeight: 'bold' }}
                    />
                    <YAxis
                      stroke="#94a3b8"
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const item = payload[0].payload as typeof INTERVAL_DATA[0];
                          return (
                            <div className="bg-slate-950 border border-emerald-500/40 p-3 rounded-2xl shadow-xl text-xs space-y-1">
                              <div className="font-bold text-white text-sm">{item.interval} Periyodu</div>
                              <div className="text-slate-400">{item.period}</div>
                              <div className="text-emerald-400 font-black text-base">{item.goals} Gol (%{item.percentage})</div>
                              <div className="text-[11px] text-slate-500">Atılmamış dakika: {item.missedMinutesCount}</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar
                      dataKey="goals"
                      radius={[12, 12, 0, 0]}
                    >
                      {INTERVAL_DATA.map((entry, index) => {
                        // Subtle contrast: 76-90' and 90+' have highest intensity
                        const isHighest = entry.interval === "76-90'";
                        return (
                          <Cell
                            key={`cell-${index}`}
                            fill={isHighest ? '#10b981' : entry.fill}
                          />
                        );
                      })}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Interval Breakdown Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-8 pt-6 border-t border-slate-800">
                {INTERVAL_DATA.map((d, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                    <div className="text-xs font-bold text-slate-400">{d.interval}</div>
                    <div className="text-lg font-black text-white mt-0.5">{d.goals} Gol</div>
                    <div className="text-[10px] text-emerald-400 font-medium">%{d.percentage} Pay</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
