import React, { useState } from 'react';
import { BookOpen, Heart, FileText, Sparkles, Check, Edit2, ShieldAlert } from 'lucide-react';
import { MessiWebsiteData } from '../data/messiData';
import { MESSI_IMAGES } from '../assets/images';

interface AboutSectionProps {
  data: MessiWebsiteData;
  isEditMode: boolean;
  onUpdateBio: (bio: MessiWebsiteData['bioSummary']) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data, isEditMode, onUpdateBio }) => {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(data.bioSummary);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBio(form);
    setEditing(false);
  };

  return (
    <section id="about" className="py-20 bg-slate-950/60 relative border-y border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-4 h-4 text-sky-400" />
              <span>Biyografi & Hikaye Modülü</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Bir Efsanenin <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-300">Doğuşu</span>
            </h2>
          </div>

          {isEditMode && (
            <button
              onClick={() => setEditing(!editing)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-all self-start md:self-auto"
            >
              <Edit2 className="w-4 h-4" />
              <span>{editing ? 'İptal Et' : 'Biyografiyi Düzenle'}</span>
            </button>
          )}
        </div>

        {editing ? (
          <form onSubmit={handleSave} className="bg-slate-900 border border-slate-700 p-6 rounded-3xl space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Giriş Paragrafı</label>
              <textarea
                rows={3}
                value={form.paragraph1}
                onChange={e => setForm({ ...form, paragraph1: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Kader ve Milli Takım Zaferi</label>
              <textarea
                rows={3}
                value={form.paragraph2}
                onChange={e => setForm({ ...form, paragraph2: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Peçete Sözleşmesi & Çocukluk</label>
              <textarea
                rows={3}
                value={form.childhoodStory}
                onChange={e => setForm({ ...form, childhoodStory: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">İkonik Gol Sevinci Anlamı</label>
              <textarea
                rows={2}
                value={form.signatureCelebration}
                onChange={e => setForm({ ...form, signatureCelebration: e.target.value })}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-700 text-white text-sm"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-4 py-2 text-xs text-slate-400"
              >
                Vazgeç
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300"
              >
                Kaydet
              </button>
            </div>
          </form>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Story column */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-lg space-y-3">
                  <h3 className="text-xl font-bold text-sky-300 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    Rosario Sokaklarından Futbolun Tahtına
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {data.bioSummary.paragraph1}
                  </p>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    {data.bioSummary.paragraph2}
                  </p>
                </div>

                {/* Peçete Sözleşmesi (The Historic Napkin Contract) */}
                <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-slate-900/90 to-slate-900 border border-amber-500/30 shadow-lg">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                    <FileText className="w-4 h-4" />
                    <span>Tarihi Değiştiren Peçete Sözleşmesi (14 Aralık 2000)</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {data.bioSummary.childhoodStory}
                  </p>
                </div>
              </div>

              {/* Anneanne Celia İthaf Kartı */}
              <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 flex items-start gap-3.5">
                <div className="p-2.5 rounded-xl bg-rose-500/20 text-rose-400 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                    İkonik Gol Sevinci: Gökyüzünü İşaret Eden Parmaklar
                  </h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {data.bioSummary.signatureCelebration}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Visual Graphic */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-slate-800 h-full min-h-[380px] shadow-2xl group">
                <img
                  src={MESSI_IMAGES.dribble}
                  alt="Lionel Messi Büyülü Top Sürme"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/80">
                  <div className="text-xs font-black text-amber-400 uppercase tracking-wider mb-1">
                    Fizik Kurallarını Aşan Zarafet
                  </div>
                  <p className="text-xs text-slate-300">
                    &ldquo;Messi topla koşarken, topsuz koşan oyunculardan daha hızlıdır.&rdquo;
                  </p>
                  <div className="mt-2 text-[10px] text-slate-400 font-semibold">
                    — Sir Alex Ferguson
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
