import React, { useState } from 'react';
import { Trophy as TrophyIcon, Sparkles, RotateCw, BookOpen, Quote, CheckCircle, Plus, Trash2, Edit2, X, Share2, Award, Crown, ShieldAlert, Zap, Flame, Medal } from 'lucide-react';
import { Trophy, MessiWebsiteData } from '../data/messiData';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface TrophiesSectionProps {
  data: MessiWebsiteData;
  isEditMode: boolean;
  onUpdateTrophy: (trophy: Trophy) => void;
  onDeleteTrophy: (id: string) => void;
  onAddTrophy: (trophy: Trophy) => void;
}

export const TrophiesSection: React.FC<TrophiesSectionProps> = ({
  data,
  isEditMode,
  onUpdateTrophy,
  onDeleteTrophy,
  onAddTrophy
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [activeStoryModal, setActiveStoryModal] = useState<Trophy | null>(null);
  
  // Edit / Add modal state
  const [editingTrophy, setEditingTrophy] = useState<Trophy | null>(null);
  const [isNewTrophy, setIsNewTrophy] = useState<boolean>(false);

  const categories = [
    { id: 'all', label: 'Tüm Başarılar (46+)' },
    { id: 'milli', label: '🇦🇷 Milli Takım Zaferleri' },
    { id: 'kulup', label: '🏆 Kulüp Şampiyonlukları' },
    { id: 'bireysel', label: '🎖️ Bireysel Ödüller' },
    { id: 'rekor', label: '🔥 Efsanevi Rekorlar' },
  ];

  const filteredTrophies = data.trophies.filter(item => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const toggleFlip = (id: string) => {
    sounds.playChime();
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const openStoryModal = (trophy: Trophy) => {
    sounds.playFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setActiveStoryModal(trophy);
  };

  const handleStartAdd = () => {
    const newTrophy: Trophy = {
      id: `trophy-${Date.now()}`,
      title: 'Yeni Kupa / Şampiyonluk',
      count: '1 Kez',
      category: 'kulup',
      year: '2024',
      icon: 'Trophy',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop',
      shortDesc: 'Bu başarının kısa özeti burada yer alır.',
      storyTitle: 'Zaferin Perde Arkası',
      storyText: 'Bu kupanın kazanılmasında yaşanan duygusal anlar ve hikaye buraya yazılır.',
      iconicMoment: 'Final anındaki unutulmaz hareket veya gol.',
      quote: 'Asla pes etmedik.',
      statsHighlight: 'Turnuvanın En İyisi'
    };
    setEditingTrophy(newTrophy);
    setIsNewTrophy(true);
  };

  const handleSaveTrophy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTrophy) return;

    if (isNewTrophy) {
      onAddTrophy(editingTrophy);
    } else {
      onUpdateTrophy(editingTrophy);
    }
    setEditingTrophy(null);
  };

  return (
    <section id="trophies" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-4">
            <TrophyIcon className="w-4 h-4 text-amber-400" />
            <span>Koleksiyon & Müze Modülü</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Neler <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Başardım?</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Kartların üzerine tıklayarak arkasındaki destansı hikayeyi, tarihi dönüm noktalarını ve zafer anlarını keşfedin!
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Admin Add Trophy Button */}
          {isEditMode && (
            <div className="mt-6">
              <button
                onClick={handleStartAdd}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Yeni Kupa / Başarı Kartı Ekle</span>
              </button>
            </div>
          )}
        </div>

        {/* Trophies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrophies.map(trophy => {
            const isFlipped = !!flippedCards[trophy.id];

            return (
              <div
                key={trophy.id}
                className="perspective-1000 min-h-[440px] relative group"
              >
                {/* 3D Inner Container */}
                <div
                  className={`w-full h-full duration-700 transform-style-3d relative transition-transform ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* FRONT FACE */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl bg-slate-900/90 border border-slate-800/90 hover:border-amber-400/50 shadow-xl overflow-hidden flex flex-col justify-between transition-all group-hover:shadow-amber-500/10">
                    <div>
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                        <img
                          src={trophy.image}
                          alt={trophy.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
                        
                        {/* Top Year Badge */}
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-amber-300 text-xs font-bold">
                          {trophy.year}
                        </div>

                        {/* Count Badge */}
                        <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-md">
                          {trophy.count}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                          {trophy.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                          {trophy.shortDesc}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between mt-auto">
                      <button
                        onClick={() => toggleFlip(trophy.id)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Kazanımın Hikayesi ↺</span>
                      </button>

                      <button
                        onClick={() => openStoryModal(trophy)}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                        title="Detaylı Görünüm"
                      >
                        <BookOpen className="w-4 h-4" />
                      </button>

                      {/* Edit controls if admin */}
                      {isEditMode && (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingTrophy(trophy);
                              setIsNewTrophy(false);
                            }}
                            className="p-1.5 rounded-lg bg-sky-900/50 text-sky-300 hover:bg-sky-800"
                            title="Düzenle"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (confirm('Bu kupayı silmek istediğinize emin misiniz?')) {
                                onDeleteTrophy(trophy.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-900/50 text-rose-300 hover:bg-rose-800"
                            title="Sil"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* BACK FACE (Story Mode) */}
                  <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/80 border border-amber-500/40 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
                    <div>
                      {/* Back Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                        <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Zaferin Hikayesi
                        </span>
                        <button
                          onClick={() => toggleFlip(trophy.id)}
                          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                          title="Ön Yüze Dön"
                        >
                          <RotateCw className="w-4 h-4" />
                        </button>
                      </div>

                      <h4 className="mt-3 text-lg font-black text-white leading-tight">
                        {trophy.storyTitle}
                      </h4>

                      <p className="mt-2.5 text-xs text-slate-300 leading-relaxed">
                        {trophy.storyText}
                      </p>

                      {/* Iconic Moment callout */}
                      {trophy.iconicMoment && (
                        <div className="mt-3.5 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200">
                          <strong className="text-amber-400">Unutulmaz An:</strong> {trophy.iconicMoment}
                        </div>
                      )}

                      {/* Quote if exists */}
                      {trophy.quote && (
                        <div className="mt-2.5 flex items-start gap-1.5 text-[11px] italic text-slate-400">
                          <Quote className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>&ldquo;{trophy.quote}&rdquo;</span>
                        </div>
                      )}
                    </div>

                    {/* Bottom Back Button */}
                    <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                      <span className="text-[10px] text-sky-400 font-bold">
                        {trophy.statsHighlight || trophy.count}
                      </span>
                      <button
                        onClick={() => openStoryModal(trophy)}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 transition-colors flex items-center gap-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Tam Metin Oku</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FULL STORY MODAL */}
      {activeStoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-amber-500/40 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            {/* Modal Header Image */}
            <div className="relative h-48 sm:h-64 bg-slate-950 shrink-0">
              <img
                src={activeStoryModal.image}
                alt={activeStoryModal.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setActiveStoryModal(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/70 hover:bg-slate-800 text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black inline-block mb-2">
                  {activeStoryModal.year} • {activeStoryModal.count}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeStoryModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
              <h4 className="text-xl font-bold text-amber-300">
                {activeStoryModal.storyTitle}
              </h4>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeStoryModal.storyText}
              </p>

              {activeStoryModal.iconicMoment && (
                <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/30">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-1">
                    İkonik Zafer Anı
                  </div>
                  <div className="text-sm text-slate-200">
                    {activeStoryModal.iconicMoment}
                  </div>
                </div>
              )}

              {activeStoryModal.quote && (
                <blockquote className="p-4 rounded-2xl bg-slate-800/80 border-l-4 border-amber-400 italic text-slate-300 text-sm">
                  &ldquo;{activeStoryModal.quote}&rdquo;
                  <div className="mt-2 text-xs font-bold text-amber-400 not-italic">
                    — Lionel Andrés Messi
                  </div>
                </blockquote>
              )}

              {activeStoryModal.statsHighlight && (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                  <CheckCircle className="w-4 h-4" />
                  <span>{activeStoryModal.statsHighlight}</span>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between shrink-0">
              <button
                onClick={() => {
                  sounds.playFanfare();
                  confetti({ particleCount: 70, spread: 60 });
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-yellow-300 hover:brightness-110"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zaferi Kutla 🎉</span>
              </button>

              <button
                onClick={() => setActiveStoryModal(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / CREATE TROPHY MODAL */}
      {editingTrophy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative max-w-xl w-full bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <h3 className="text-xl font-bold text-white">
                {isNewTrophy ? 'Yeni Kupa / Başarı Ekle' : 'Kupa Bilgilerini Düzenle'}
              </h3>
              <button
                onClick={() => setEditingTrophy(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveTrophy} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kupa / Başarı Başlığı</label>
                <input
                  type="text"
                  required
                  value={editingTrophy.title}
                  onChange={e => setEditingTrophy({ ...editingTrophy, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:border-amber-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kazanım Sayısı / Rozet</label>
                  <input
                    type="text"
                    value={editingTrophy.count}
                    onChange={e => setEditingTrophy({ ...editingTrophy, count: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Yıllar</label>
                  <input
                    type="text"
                    value={editingTrophy.year}
                    onChange={e => setEditingTrophy({ ...editingTrophy, year: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Kategori</label>
                  <select
                    value={editingTrophy.category}
                    onChange={e => setEditingTrophy({ ...editingTrophy, category: e.target.value as Trophy['category'] })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  >
                    <option value="milli">Milli Takım</option>
                    <option value="kulup">Kulüp Kupaları</option>
                    <option value="bireysel">Bireysel Ödüller</option>
                    <option value="rekor">Efsanevi Rekorlar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Görsel URL</label>
                  <input
                    type="text"
                    value={editingTrophy.image}
                    onChange={e => setEditingTrophy({ ...editingTrophy, image: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kısa Açıklama (Ön Yüz)</label>
                <textarea
                  rows={2}
                  value={editingTrophy.shortDesc}
                  onChange={e => setEditingTrophy({ ...editingTrophy, shortDesc: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Hikaye Başlığı</label>
                <input
                  type="text"
                  value={editingTrophy.storyTitle}
                  onChange={e => setEditingTrophy({ ...editingTrophy, storyTitle: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Kazanımın Hikayesi (Arka Yüz)</label>
                <textarea
                  rows={4}
                  value={editingTrophy.storyText}
                  onChange={e => setEditingTrophy({ ...editingTrophy, storyText: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Unutulmaz An (Opsiyonel)</label>
                <input
                  type="text"
                  value={editingTrophy.iconicMoment}
                  onChange={e => setEditingTrophy({ ...editingTrophy, iconicMoment: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTrophy(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
                >
                  Kaydet & Uygula
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
