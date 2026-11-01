import React, { useState } from 'react';
import { ClubCareer, MessiWebsiteData } from '../data/messiData';
import { Shield, Flag, Award, Flame, CheckCircle, Trophy } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface CareerSectionProps {
  data: MessiWebsiteData;
  isEditMode: boolean;
  onUpdateClub: (club: ClubCareer) => void;
}

export const CareerSection: React.FC<CareerSectionProps> = ({ data, isEditMode, onUpdateClub }) => {
  const [selectedClubId, setSelectedClubId] = useState<string>('barcelona');
  const [editingClub, setEditingClub] = useState<ClubCareer | null>(null);

  const activeClub = data.clubCareers.find(c => c.id === selectedClubId) || data.clubCareers[0];

  const handleSaveClub = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingClub) {
      onUpdateClub(editingClub);
      setEditingClub(null);
    }
  };

  return (
    <section id="career" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Shield className="w-4 h-4 text-sky-400" />
            <span>Kariyer & Kulüp Zaman Çizelgesi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Kulüpler ve <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-amber-300">Milli Takım</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Kariyeri boyunca formasını terlettiği dev kulüpler ve Arjantin Milli Takımı ile kırılan rekorlar.
          </p>
        </div>

        {/* Club Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {data.clubCareers.map(c => {
            const isSelected = c.id === selectedClubId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedClubId(c.id);
                }}
                className={`px-6 py-3 rounded-2xl text-sm font-black transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/30 scale-105'
                    : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                <span>{c.club}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-black/40 text-amber-300 font-mono">
                  {c.years}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Club Spotlight Card */}
        {activeClub && (
          <div className="rounded-3xl bg-slate-900/90 border border-slate-800 p-8 sm:p-10 shadow-2xl relative overflow-hidden mb-16">
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${activeClub.color} opacity-20 rounded-full blur-[100px] pointer-events-none`} />

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-sky-300">
                  <span>{activeClub.years}</span>
                  <span>•</span>
                  <span>{activeClub.trophiesCount} Kupa</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white">
                  {activeClub.club}
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {activeClub.description}
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeClub.badges.map((badge, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs font-bold text-amber-300"
                    >
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      {badge}
                    </span>
                  ))}
                </div>

                {isEditMode && (
                  <div className="pt-4">
                    <button
                      onClick={() => setEditingClub(activeClub)}
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-500"
                    >
                      Bu Kulüp Verisini Düzenle
                    </button>
                  </div>
                )}
              </div>

              {/* Stats Grid for this club */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-slate-400 font-semibold uppercase">Resmi Maç</div>
                  <div className="text-3xl font-black text-white mt-1 font-mono">{activeClub.matches}</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-amber-400 font-semibold uppercase">Gol</div>
                  <div className="text-3xl font-black text-amber-300 mt-1 font-mono">{activeClub.goals}</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-sky-400 font-semibold uppercase">Asist</div>
                  <div className="text-3xl font-black text-sky-300 mt-1 font-mono">{activeClub.assists}</div>
                </div>
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-xs text-emerald-400 font-semibold uppercase">Şampiyonluk</div>
                  <div className="text-3xl font-black text-emerald-300 mt-1 font-mono">{activeClub.trophiesCount} Kupa</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* National Team Master Card */}
        <div className="rounded-3xl bg-gradient-to-r from-sky-950/50 via-slate-900/90 to-blue-950/50 border border-sky-500/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-xs font-black uppercase tracking-wider">
                <Flag className="w-4 h-4 text-sky-400" />
                <span>Arjantin Milli Takımı (La Albiceleste)</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-black text-white">
                Mavi & Beyaz ile Gelen Ebedi Zafer
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {data.nationalTeam.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {data.nationalTeam.majorTitles.map((title, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-semibold text-sky-200 flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* National Team Stats pill */}
            <div className="p-6 rounded-3xl bg-slate-950/90 border border-sky-400/40 text-center min-w-[260px] shadow-xl">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-sky-500/20 flex items-center justify-center text-3xl font-black text-sky-400 border border-sky-400/40">
                10
              </div>
              <div className="text-2xl font-black text-white font-mono">{data.nationalTeam.goals}</div>
              <div className="text-xs font-bold text-sky-400 uppercase mt-0.5">Milli Takım Golü</div>
              <div className="text-xs text-slate-400 mt-2">Toplam {data.nationalTeam.matches}</div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold">
                Çıkış: {data.nationalTeam.debut}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Club Modal */}
      {editingClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="max-w-lg w-full bg-slate-900 border border-slate-700 rounded-3xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Kulüp Bilgilerini Düzenle</h3>
            <form onSubmit={handleSaveClub} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kulüp Adı</label>
                <input
                  type="text"
                  value={editingClub.club}
                  onChange={e => setEditingClub({ ...editingClub, club: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Maç Sayısı</label>
                  <input
                    type="number"
                    value={editingClub.matches}
                    onChange={e => setEditingClub({ ...editingClub, matches: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Gol Sayısı</label>
                  <input
                    type="number"
                    value={editingClub.goals}
                    onChange={e => setEditingClub({ ...editingClub, goals: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Asist Sayısı</label>
                  <input
                    type="number"
                    value={editingClub.assists}
                    onChange={e => setEditingClub({ ...editingClub, assists: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kazanılan Kupa</label>
                  <input
                    type="number"
                    value={editingClub.trophiesCount}
                    onChange={e => setEditingClub({ ...editingClub, trophiesCount: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Açıklama</label>
                <textarea
                  rows={3}
                  value={editingClub.description}
                  onChange={e => setEditingClub({ ...editingClub, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingClub(null)}
                  className="px-4 py-2 text-xs text-slate-400"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
                >
                  Güncelle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
