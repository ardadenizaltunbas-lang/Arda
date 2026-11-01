import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  Star,
  Heart,
  Sparkles,
  User,
  MapPin,
  Flame,
  CheckCircle,
  Trash2,
  Filter
} from 'lucide-react';
import { FanComment, getStoredComments, saveStoredComments } from '../data/commentsData';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

interface FanCommentsSectionProps {
  isEditMode: boolean;
  currentUser?: { fullName?: string; city?: string } | null;
}

const MOMENTS_LIST = [
  '2022 FIFA Dünya Kupası Zaferi (Lusail)',
  '2012 Bir Yılda 91 Gol Dünya Rekoru',
  '2015 Bayern Münih (Boateng & Neuer Çalımı)',
  '2007 Getafe Solo Slalom Golü',
  '2011 Real Madrid Bernabéu Şampiyonlar Ligi Solo Golü',
  '2019 Liverpool 35 Metre Frikik Füzesi',
  '2021 Copa América Maracanã Zaferi',
  '2009 Manchester United Şampiyonlar Ligi Kafa Golü',
  '8. Ballon d\'Or Tarihi Rekor Ödülü'
];

const AVATAR_GRADIENTS = [
  'from-sky-500 to-blue-600',
  'from-amber-500 to-yellow-600',
  'from-rose-500 to-pink-600',
  'from-emerald-500 to-teal-600',
  'from-indigo-500 to-purple-600',
  'from-cyan-500 to-sky-600'
];

export const FanCommentsSection: React.FC<FanCommentsSectionProps> = ({ isEditMode, currentUser }) => {
  const [comments, setComments] = useState<FanComment[]>(() => getStoredComments());
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'latest'>('all');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  // Form State
  const [fullName, setFullName] = useState<string>(currentUser?.fullName || '');
  const [city, setCity] = useState<string>(currentUser?.city || 'İstanbul, Türkiye');
  const [favoriteMoment, setFavoriteMoment] = useState<string>(MOMENTS_LIST[0]);
  const [commentText, setCommentText] = useState<string>('');
  const [rating, setRating] = useState<number>(5);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Update name if logged in fan changes
  useEffect(() => {
    if (currentUser?.fullName && !fullName) {
      setFullName(currentUser.fullName);
    }
  }, [currentUser, fullName]);

  // Persist comments when updated
  const updateCommentsState = (newComments: FanComment[]) => {
    setComments(newComments);
    saveStoredComments(newComments);
  };

  const handleToggleLike = (id: string) => {
    sounds.playClick();
    const isAlreadyLiked = likedMap[id];
    setLikedMap(prev => ({ ...prev, [id]: !isAlreadyLiked }));

    const updated = comments.map(c => {
      if (c.id === id) {
        return {
          ...c,
          likes: isAlreadyLiked ? Math.max(0, c.likes - 1) : c.likes + 1
        };
      }
      return c;
    });
    updateCommentsState(updated);
  };

  const handleDeleteComment = (id: string) => {
    sounds.playClick();
    const updated = comments.filter(c => c.id !== id);
    updateCommentsState(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !commentText.trim()) return;

    setIsSubmitting(true);
    sounds.playFanfare();

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#38bdf8', '#fbbf24', '#ffffff']
    });

    const newComment: FanComment = {
      id: `comment-${Date.now()}`,
      fullName: fullName.trim(),
      city: city.trim() || 'Türkiye',
      favoriteMoment,
      comment: commentText.trim(),
      rating,
      createdAt: 'Az önce',
      likes: 1,
      avatarBg: AVATAR_GRADIENTS[Math.floor(Math.random() * AVATAR_GRADIENTS.length)],
      isVerifiedFan: true
    };

    const nextList = [newComment, ...comments];
    updateCommentsState(nextList);

    setCommentText('');
    setSuccessMsg('Yorumunuz başarıyla yayınlandı! Teşekkür ederiz ⚽');
    setIsSubmitting(false);

    setTimeout(() => {
      setSuccessMsg(null);
    }, 4000);
  };

  // Filtered comments
  const sortedComments = [...comments].sort((a, b) => {
    if (activeFilter === 'popular') return b.likes - a.likes;
    return 0; // Default or latest is array order
  });

  const getInitials = (name: string) => {
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <section id="comments" className="py-20 relative bg-slate-950/95 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Taraftar Duvarı & Ziyaretçi Defteri</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Messi Hakkında <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-amber-300">Yorumunu Yaz</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Lionel Messi senin için ne ifade ediyor? İsmini ve favori anını yazarak dünya çapındaki Messi hayranları duvarında yerini al!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT: Comment Submission Form */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="text-lg font-black text-white mb-1 flex items-center gap-2">
                <span>Bir Yorum Bırak</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Formu doldurarak saniyeler içinde yorumunu yayınlayabilirsin.
              </p>

              {successMsg && (
                <div className="mb-6 p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 animate-bounce">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>İsim & Soyisim *</span>
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={40}
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Örn: Arda Yılmaz"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
                  />
                </div>

                {/* City / Country */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-400" />
                    <span>Şehir / Ülke</span>
                  </label>
                  <input
                    type="text"
                    maxLength={40}
                    value={city}
                    onChange={e => setCity(e.target.value)}
                    placeholder="Örn: İstanbul, Türkiye"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
                  />
                </div>

                {/* Favorite Moment */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>Unutamadığın Favori Messi Anı</span>
                  </label>
                  <select
                    value={favoriteMoment}
                    onChange={e => setFavoriteMoment(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner"
                  >
                    {MOMENTS_LIST.map((m, idx) => (
                      <option key={idx} value={m} className="bg-slate-900 text-white">
                        {m}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Star Rating */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Değerlendirme (GOAT Skoru)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => {
                          sounds.playClick();
                          setRating(star);
                        }}
                        className="p-1 text-amber-400 hover:scale-125 transition-transform cursor-pointer"
                      >
                        <Star className={`w-5 h-5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}`} />
                      </button>
                    ))}
                    <span className="text-xs text-amber-300 font-bold ml-2">
                      {rating === 5 ? '🐐 Mutlak GOAT (5/5)' : `${rating}/5 Yıldız`}
                    </span>
                  </div>
                </div>

                {/* Comment Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1.5">
                    Messi Hakkındaki Düşüncelerin *
                  </label>
                  <textarea
                    required
                    rows={4}
                    maxLength={400}
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Messi'nin kariyeri, unutulmaz anları veya futbol dünyasındaki yeri hakkında neler düşünüyorsun?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors shadow-inner resize-none"
                  />
                  <div className="text-right text-[10px] text-slate-500 mt-1">
                    {commentText.length}/400 karakter
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-2xl font-black text-sm text-slate-950 bg-gradient-to-r from-cyan-400 via-sky-400 to-amber-300 hover:brightness-110 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Gönderiliyor...' : 'Yorumumu Duvara Ekle'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT: Live Comments Feed & Filters */}
          <div className="lg:col-span-7 space-y-4">
            {/* Filter Tabs & Total Count */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Toplam {comments.length} Taraftar Yorumu</span>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveFilter('all');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === 'all'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => {
                    sounds.playClick();
                    setActiveFilter('popular');
                  }}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    activeFilter === 'popular'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  En Çok Beğenilenler
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4 max-h-[640px] overflow-y-auto pr-2 custom-scrollbar">
              {sortedComments.map(c => {
                const isLiked = Boolean(likedMap[c.id]);

                return (
                  <div
                    key={c.id}
                    className="p-5 sm:p-6 rounded-3xl bg-slate-900/80 border border-slate-800/90 hover:border-slate-700 transition-all shadow-md group relative overflow-hidden"
                  >
                    {/* Header: User avatar, name, city, date */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-11 h-11 rounded-2xl bg-gradient-to-tr ${c.avatarBg} flex items-center justify-center font-black text-white text-sm shadow-md shrink-0`}>
                          {getInitials(c.fullName)}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-black text-white">
                              {c.fullName}
                            </h4>
                            {c.isVerifiedFan && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                                ✓ Taraftar
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="w-3 h-3 text-slate-500" />
                            <span>{c.city}</span>
                            <span>•</span>
                            <span>{c.createdAt}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5 text-amber-400 shrink-0">
                        {Array.from({ length: c.rating }).map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>

                    {/* Favorite Moment Tag */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-semibold text-amber-300">
                        <Flame className="w-3 h-3 text-amber-400" />
                        <span>{c.favoriteMoment}</span>
                      </span>
                    </div>

                    {/* Comment Body */}
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      &ldquo;{c.comment}&rdquo;
                    </p>

                    {/* Footer: Like Button & Admin Delete */}
                    <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleToggleLike(c.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isLiked
                            ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40 scale-105'
                            : 'bg-slate-950 text-slate-400 hover:text-rose-400 border border-slate-800'
                        }`}
                      >
                        <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                        <span>{c.likes} Beğeni</span>
                      </button>

                      {isEditMode && (
                        <button
                          onClick={() => handleDeleteComment(c.id)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                          title="Yorumu Sil (Yönetici)"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
