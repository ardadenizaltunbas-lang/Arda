import React, { useState } from 'react';
import { Play, Film, ExternalLink, Youtube, Clock, Eye, Sparkles, Filter, X, Plus } from 'lucide-react';
import { MESSI_VIDEOS, MessiVideo } from '../data/videoData';
import { sounds } from '../utils/soundEffects';

interface VideoSectionProps {
  isEditMode: boolean;
}

export const VideoSection: React.FC<VideoSectionProps> = ({ isEditMode }) => {
  const [videos, setVideos] = useState<MessiVideo[]>(MESSI_VIDEOS);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeModalVideo, setActiveModalVideo] = useState<MessiVideo | null>(null);

  // New Video Form state for Admin
  const [showAddForm, setShowAddForm] = useState(false);
  const [newVideo, setNewVideo] = useState<Partial<MessiVideo>>({
    title: '',
    channel: '',
    category: 'turkish',
    duration: '15:00',
    views: '1M+ İzlenme',
    language: 'TR',
    description: '',
    youtubeQuery: '',
    badge: '📺 Yeni Video'
  });

  const categories = [
    { id: 'all', label: `Tüm Videolar (${videos.length})` },
    { id: 'turkish', label: '🇹🇷 Türkçe Belgesel & Analiz' },
    { id: 'documentary', label: '🎬 Resmi Belgeseller & Filmler' },
    { id: 'worldcup', label: '🏆 Dünya Kupası Özel' },
    { id: 'highlights', label: '⚽ Efsane Goller & Büyülü Paslar' },
  ];

  const filteredVideos = videos.filter(v => {
    if (activeCategory === 'all') return true;
    return v.category === activeCategory;
  });

  const openYoutubeSearch = (v: MessiVideo) => {
    sounds.playClick();
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(v.youtubeQuery)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const openPlayerModal = (v: MessiVideo) => {
    sounds.playFanfare();
    setActiveModalVideo(v);
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVideo.title || !newVideo.channel) return;
    const created: MessiVideo = {
      id: `video-${Date.now()}`,
      title: newVideo.title || '',
      channel: newVideo.channel || 'YouTube',
      category: (newVideo.category as MessiVideo['category']) || 'turkish',
      duration: newVideo.duration || '10:00',
      views: newVideo.views || '1M+ İzlenme',
      language: (newVideo.language as 'TR' | 'EN') || 'TR',
      description: newVideo.description || '',
      youtubeQuery: newVideo.youtubeQuery || newVideo.title || '',
      badge: newVideo.badge || '📺 YouTube'
    };
    setVideos([created, ...videos]);
    setShowAddForm(false);
    setNewVideo({
      title: '',
      channel: '',
      category: 'turkish',
      duration: '15:00',
      views: '1M+ İzlenme',
      language: 'TR',
      description: '',
      youtubeQuery: '',
      badge: '📺 Yeni Video'
    });
  };

  return (
    <section id="videos" className="py-20 relative bg-[#070b14] border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Film className="w-4 h-4 text-rose-400" />
            <span>Medya, Belgeseller & YouTube Arşivi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Messi Hakkında <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-400">Videolar & Filmler</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Dünyanın ve Türkiye&apos;nin en çok izlenen Messi belgeselleri, derin taktik analizleri ve YouTube&apos;da milyonlara ulaşan efsanevi anlar bir arada!
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.playClick();
                  setActiveCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 scale-105'
                    : 'bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Admin Add Video Button */}
          {isEditMode && (
            <div className="mt-6">
              <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>{showAddForm ? 'İptal' : 'Yeni Video / Belgesel Ekle'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Admin Add Form */}
        {showAddForm && (
          <form onSubmit={handleAddVideo} className="mb-10 max-w-2xl mx-auto p-6 rounded-3xl bg-slate-900 border border-slate-700 space-y-4">
            <h3 className="text-lg font-bold text-white">Yeni Video / Belgesel Bağlantısı Ekle</h3>
            <div>
              <label className="block text-xs text-slate-300 font-bold mb-1">Video Başlığı</label>
              <input
                type="text"
                required
                value={newVideo.title}
                onChange={e => setNewVideo({ ...newVideo, title: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-1">Kanal / Yayıncı</label>
                <input
                  type="text"
                  required
                  value={newVideo.channel}
                  onChange={e => setNewVideo({ ...newVideo, channel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-300 font-bold mb-1">Dil</label>
                <select
                  value={newVideo.language}
                  onChange={e => setNewVideo({ ...newVideo, language: e.target.value as 'TR' | 'EN' })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
                >
                  <option value="TR">🇹🇷 Türkçe</option>
                  <option value="EN">🇬🇧 İngilizce</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-bold mb-1">YouTube Arama Terimi / Link</label>
              <input
                type="text"
                value={newVideo.youtubeQuery}
                onChange={e => setNewVideo({ ...newVideo, youtubeQuery: e.target.value })}
                placeholder="Örn: Socrates Dergi Lionel Messi Belgeseli"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-300 font-bold mb-1">Kısa Açıklama</label>
              <textarea
                rows={2}
                value={newVideo.description}
                onChange={e => setNewVideo({ ...newVideo, description: e.target.value })}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-xs text-slate-400"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500"
              >
                Listeye Ekle
              </button>
            </div>
          </form>
        )}

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVideos.map(video => (
            <div
              key={video.id}
              className="rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-rose-500/50 transition-all hover:-translate-y-1.5 shadow-xl flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Visual Thumbnail Card */}
                <div className="relative aspect-video bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 p-4 flex flex-col justify-between overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                  
                  {/* Subtle decorative stadium grid in background */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl pointer-events-none" />

                  {/* Top Badges */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-amber-300">
                      {video.badge}
                    </span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                      video.language === 'TR' ? 'bg-rose-600 text-white' : 'bg-sky-600 text-white'
                    }`}>
                      {video.language === 'TR' ? '🇹🇷 TR' : '🇬🇧 EN'}
                    </span>
                  </div>

                  {/* Play Center Icon */}
                  <div 
                    onClick={() => openPlayerModal(video)}
                    className="relative z-10 w-12 h-12 mx-auto rounded-full bg-rose-600/90 hover:bg-rose-500 border border-white/20 flex items-center justify-center text-white shadow-xl group-hover:scale-115 transition-transform cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  </div>

                  {/* Bottom Video Meta info */}
                  <div className="relative z-10 flex items-center justify-between text-[11px] text-slate-300 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {video.duration}
                    </span>
                    <span className="flex items-center gap-1 text-slate-400">
                      <Eye className="w-3 h-3" />
                      {video.views}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2">
                  <div className="text-xs font-bold text-rose-400">
                    {video.channel}
                  </div>
                  <h3 className="text-base font-black text-white group-hover:text-rose-300 transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-slate-800/80 flex items-center justify-between gap-2 mt-auto">
                <button
                  onClick={() => openPlayerModal(video)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-slate-200 bg-slate-800 hover:bg-slate-700 hover:text-white transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Film className="w-3.5 h-3.5 text-sky-400" />
                  <span>Önizle</span>
                </button>

                <button
                  onClick={() => openYoutubeSearch(video)}
                  className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-rose-600/20"
                >
                  <Youtube className="w-3.5 h-3.5 fill-white" />
                  <span>YouTube&apos;da Aç</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* POPUP VIDEO CINEMA MODAL */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="relative max-w-2xl w-full bg-slate-900 border border-rose-500/40 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-950 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-rose-600/20 text-rose-400">
                  <Youtube className="w-5 h-5 fill-rose-500" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                    {activeModalVideo.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Kanal: {activeModalVideo.channel} • {activeModalVideo.duration} • {activeModalVideo.views}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player / Presentation Box */}
            <div className="relative aspect-video bg-black flex flex-col items-center justify-center p-8 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-rose-600/20 border border-rose-500/40 flex items-center justify-center text-rose-500 animate-pulse">
                <Youtube className="w-10 h-10 fill-rose-500" />
              </div>
              <div className="max-w-md">
                <h4 className="text-lg font-black text-white">
                  &ldquo;{activeModalVideo.title}&rdquo;
                </h4>
                <p className="text-xs text-slate-400 mt-2">
                  Telif kuralları gereği en yüksek çözünürlükte ve spiker sesleriyle YouTube üzerinden doğrudan izleyebilirsiniz.
                </p>
              </div>

              <button
                onClick={() => openYoutubeSearch(activeModalVideo)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-black text-sm shadow-xl shadow-rose-600/30 hover:brightness-110 cursor-pointer"
              >
                <Youtube className="w-5 h-5 fill-white" />
                <span>Videoyu YouTube&apos;da Başlat ↗</span>
              </button>
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="text-amber-400 font-semibold">{activeModalVideo.badge}</span>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
