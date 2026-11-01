import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, Sparkles, Flame, Shield, Star, Zap } from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import confetti from 'canvas-confetti';

type DifficultyLevel = 'easy' | 'medium' | 'hard' | 'crazy';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface DifficultyConfig {
  id: DifficultyLevel;
  name: string;
  badge: string;
  rate: number;
  stars: string;
  color: string;
  description: string;
  questions: Question[];
}

const QUIZ_LEVELS: DifficultyConfig[] = [
  {
    id: 'easy',
    name: 'Tribün Çırağı',
    badge: '🟢 Kolay Seviye',
    rate: 1,
    stars: '★☆☆☆',
    color: 'from-emerald-500 to-teal-600',
    description: 'Futbolseverler ve yeni başlayanlar için temel Messi bilgileri.',
    questions: [
      {
        id: 1,
        question: "Lionel Messi hangi ülkede dünyaya gelmiştir?",
        options: ["Brezilya", "Arjantin", "İspanya", "Uruguay"],
        correctIndex: 1,
        explanation: "Messi, 24 Haziran 1987 tarihinde Arjantin'in Rosario kentinde doğmuştur."
      },
      {
        id: 2,
        question: "Lionel Messi'nin efsaneleştiği forma numarası kaçtır?",
        options: ["7", "9", "10", "11"],
        correctIndex: 2,
        explanation: "Hem Barcelona, hem Arjantin hem de Inter Miami'de ikonik 10 numaralı formayı giymektedir."
      },
      {
        id: 3,
        question: "Messi'nin kariyerinin 17 yılını geçirdiği ve efsaneleştiği kulüp hangisidir?",
        options: ["Real Madrid", "FC Barcelona", "Juventus", "Manchester United"],
        correctIndex: 1,
        explanation: "2004-2021 yılları arasında Barcelona'da 778 maçta 672 gol atıp 35 kupa kazanmıştır."
      },
      {
        id: 4,
        question: "Messi'nin baskın olarak kullandığı sihirli ayağı hangisidir?",
        options: ["Sol Ayak", "Sağ Ayak", "İki ayağını da eşit", "Hiçbiri"],
        correctIndex: 0,
        explanation: "Messi dünyanın en ölümcül ve zarif sol ayaklı futbolcusudur."
      },
      {
        id: 5,
        question: "Messi şu an hangi kulüpte forma giymektedir?",
        options: ["Inter Miami CF", "Al Hilal", "PSG", "Newell's Old Boys"],
        correctIndex: 0,
        explanation: "2023 yazında Amerika MLS ligi takımlarından Inter Miami'ye transfer olmuştur."
      }
    ]
  },
  {
    id: 'medium',
    name: 'Kıdemli Futbolsever',
    badge: '🟡 Orta Seviye',
    rate: 2,
    stars: '★★☆☆',
    color: 'from-amber-500 to-yellow-600',
    description: 'Messi\'nin kariyerini yakından takip eden futbol tutkunları için.',
    questions: [
      {
        id: 1,
        question: "Lionel Messi kariyeri boyunca kaç kez Ballon d'Or (Altın Top) kazanmıştır?",
        options: ["5 Kez", "7 Kez", "8 Kez", "9 Kez"],
        correctIndex: 2,
        explanation: "Messi 2009, 2010, 2011, 2012, 2015, 2019, 2021 ve 2023'te 8 kez kazanarak tarihi bir rekor kırmıştır."
      },
      {
        id: 2,
        question: "Messi'nin Barcelona ile imzaladığı ilk amatör sözleşme neyin üzerine yazılmıştır?",
        options: ["Kağıt peçete", "Krampon kutusu", "Futbol topu", "Antrenman forması"],
        correctIndex: 0,
        explanation: "Carles Rexach, onu izledikten sonra kaçırmamak için hemen bir kafe peçetesine aceleyle sözleşme imzalamıştır."
      },
      {
        id: 3,
        question: "Her golden sonra gökyüzüne açtığı işaret parmakları kime ithaftır?",
        options: ["Diego Maradona", "Merhum anneannesi Celia", "Babası Jorge", "İlk antrenörü"],
        correctIndex: 1,
        explanation: "Onu küçükken ilk antrenmanına götüren merhum anneannesi Celia Olivera'ya ithaf etmektedir."
      },
      {
        id: 4,
        question: "Messi kariyeri boyunca kaç kez UEFA Şampiyonlar Ligi kupasını kaldırmıştır?",
        options: ["2 Kez", "3 Kez", "4 Kez", "6 Kez"],
        correctIndex: 2,
        explanation: "Barcelona ile 2006, 2009, 2011 ve 2015 yıllarında olmak üzere 4 kez Şampiyonlar Ligi şampiyonu olmuştur."
      },
      {
        id: 5,
        question: "Avrupa liglerinin gol kralına verilen Altın Ayakkabı ödülünü kaç kez kazanmıştır?",
        options: ["4 Kez", "5 Kez", "6 Kez (Rekor)", "8 Kez"],
        correctIndex: 2,
        explanation: "Messi 6 kez Altın Ayakkabı kazanarak Avrupa tarihinin rekorunu elinde tutmaktadır."
      }
    ]
  },
  {
    id: 'hard',
    name: 'GOAT Uzmanı',
    badge: '🔴 Zor Seviye',
    rate: 3,
    stars: '★★★☆',
    color: 'from-rose-500 to-red-600',
    description: 'İstatistikleri, maç tarihlerini ve rekorları ezbere bilenler için.',
    questions: [
      {
        id: 1,
        question: "Messi, 2012 takvim yılında kaç gol atarak Gerd Müller'in 40 yıllık dünya rekorunu kırmıştır?",
        options: ["73 Gol", "85 Gol", "91 Gol", "98 Gol"],
        correctIndex: 2,
        explanation: "Messi 2012 yılında 69 resmi maçta 91 gol atarak Guinness Rekorlar Kitabı'na girmiştir."
      },
      {
        id: 2,
        question: "Messi, La Liga tarihinin gelmiş geçmiş en çok gol atan oyuncusu olarak kaç gol atmıştır?",
        options: ["311 Gol", "404 Gol", "474 Gol", "520 Gol"],
        correctIndex: 2,
        explanation: "520 La Liga maçında 474 gol atarak en yakın rakibinin 163 gol önünde lig tarihinin zirvesindedir."
      },
      {
        id: 3,
        question: "2022 FIFA Dünya Kupası finalinde Fransa'ya karşı uzatmalar dahil kaç gol atmıştır?",
        options: ["1 Gol", "2 Gol", "3 Gol (Hat-trick)", "Gol atamamıştır"],
        correctIndex: 1,
        explanation: "23. ve 108. dakikalarda 2 gol kaydetmiş, ayrıca seri penaltılarda ilk golü atmıştır."
      },
      {
        id: 4,
        question: "Şampiyonlar Ligi tarihinde tek bir maçta 5 gol birden attığı rakip hangi takımdır?",
        options: ["Arsenal", "Bayer Leverkusen", "Bayern Münih", "AC Milan"],
        correctIndex: 1,
        explanation: "7 Mart 2012'de Camp Nou'da Barcelona'nın Leverkusen'i 7-1 yendiği maçta 5 gol atmıştır."
      },
      {
        id: 5,
        question: "2008 Pekin Olimpiyatları'nda Arjantin ile hangi madalyayı kazanmıştır?",
        options: ["Altın Madalya", "Gümüş Madalya", "Bronz Madalya", "4. olmuştur"],
        correctIndex: 0,
        explanation: "Finalde Nijerya'yı Di Maria'nın golüyle 1-0 mağlup ederek Altın Madalya kazanmıştır."
      }
    ]
  },
  {
    id: 'crazy',
    name: 'Messi Delisi (Ultra Hard)',
    badge: '🔥 Efsanevi Zorluk',
    rate: 4,
    stars: '★★★★',
    color: 'from-purple-600 via-pink-600 to-amber-500',
    description: 'Yalnızca gerçek Messi fanatiklerinin çözebileceği akıl almaz detay soruları!',
    questions: [
      {
        id: 1,
        question: "17 Ağustos 2005'te Macaristan karşısında çıktığı İLK A Milli maçında oyuna girdikten kaç saniye sonra kırmızı kart görmüştür?",
        options: ["47 saniye", "2 dakika", "10 dakika", "Kırmızı kart görmemiştir"],
        correctIndex: 0,
        explanation: "Messi 63. dakikada oyuna girdikten sadece 47 saniye sonra formasını çeken Vanczak'a dirsek attığı gerekçesiyle tartışmalı şekilde atılmıştır."
      },
      {
        id: 2,
        question: "Inter Miami formasıyla çıktığı ilk maçta Cruz Azul'a frikikten galibiyet golünü tam kaçıncı dakikada atmıştır?",
        options: ["88. Dakika", "90. Dakika", "94. Dakika", "105. Dakika"],
        correctIndex: 2,
        explanation: "21 Temmuz 2023 gecesi ilk maçının 94. dakikasında ceza sahası dışından 90'a asarak maçı 2-1 kazandırmıştır."
      },
      {
        id: 3,
        question: "Messi'ye henüz 11 yaşındayken konulan büyüme hormonu eksikliği tedavisi için her gece ne yapması gerekiyordu?",
        options: [
          "Bacağına özel iğne enjekte etmek",
          "Özel ağırlık antrenmanı yapmak",
          "Sadece sıvı gıda tüketmek",
          "Alçıya alınmış ayakkabı giymek"
        ],
        correctIndex: 0,
        explanation: "3 yıl boyunca her gece bacağına bizzat kendi elleriyle büyüme hormonu iğnesi enjekte etmiştir."
      },
      {
        id: 4,
        question: "Messi'nin kariyerindeki en hızlı resmi golü (79. saniyede - 1. dakika) 2023'te hangi milli takıma karşı atılmıştır?",
        options: ["Brezilya", "Avustralya (Pekin)", "Fransa", "Hırvatistan"],
        correctIndex: 1,
        explanation: "15 Haziran 2023'te Pekin'de oynanan hazırlık maçında Avustralya'ya 79. saniyede kariyerinin en hızlı golünü atmıştır."
      },
      {
        id: 5,
        question: "El Clásico derbilerinde Real Madrid ağlarına kariyeri boyunca toplam kaç gol göndermiştir?",
        options: ["18 Gol", "21 Gol", "26 Gol", "32 Gol"],
        correctIndex: 2,
        explanation: "Messi, El Clásico tarihinin en golcü futbolcusu olarak Real Madrid'e tam 26 gol atmış ve 14 asist yapmıştır."
      }
    ]
  }
];

export const QuizSection: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  const activeLevel = QUIZ_LEVELS.find(l => l.id === selectedDifficulty) || QUIZ_LEVELS[1];
  const currentQ = activeLevel.questions[currentIdx];

  const handleLevelChange = (level: DifficultyLevel) => {
    sounds.playClick();
    setSelectedDifficulty(level);
    setCurrentIdx(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  const handleSelect = (optionIdx: number) => {
    if (selectedAnswers[currentIdx] !== undefined) return;

    const isCorrect = optionIdx === currentQ.correctIndex;
    if (isCorrect) {
      sounds.playChime();
    } else {
      sounds.playBuzzer();
    }

    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optionIdx }));
  };

  const nextQuestion = () => {
    sounds.playClick();
    if (currentIdx < activeLevel.questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
      sounds.playFanfare();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
    }
  };

  const resetQuiz = () => {
    sounds.playClick();
    setSelectedAnswers({});
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const correctCount = Object.entries(selectedAnswers).filter(
    ([idx, opt]) => activeLevel.questions[Number(idx)].correctIndex === opt
  ).length;

  return (
    <section id="quiz" className="py-20 relative bg-slate-950/80 border-t border-slate-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Kademeli Zorluk & Rate Sistemi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Ne Kadar <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">Messi Hayranısın?</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Kolaydan en zor &apos;Messi Delisi&apos; seviyesine kadar bilgi seviyeni seç ve teste başla!
          </p>
        </div>

        {/* DIFFICULTY SELECTOR CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {QUIZ_LEVELS.map(lvl => {
            const isSelected = lvl.id === selectedDifficulty;
            return (
              <button
                key={lvl.id}
                onClick={() => handleLevelChange(lvl.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-900 border-amber-400 shadow-lg shadow-amber-500/20 scale-102 ring-1 ring-amber-400'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className="text-amber-400 font-bold">{lvl.stars}</span>
                  <span className="text-[10px] text-slate-400 font-semibold">{lvl.rate}/4 Rate</span>
                </div>
                <div className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {lvl.name}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                  {lvl.badge}
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Level Info Banner */}
        <div className="mb-6 px-5 py-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-amber-400">Aktif Seviye:</span>
            <span className="text-white font-black">{activeLevel.name}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{activeLevel.description}</span>
          </div>
          <span className="font-mono text-sky-400 font-bold">{activeLevel.questions.length} Soru</span>
        </div>

        {/* Quiz Question Card */}
        <div className="rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-10 shadow-2xl relative">
          {!isFinished ? (
            <div>
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 mb-4">
                <span>Soru {currentIdx + 1} / {activeLevel.questions.length}</span>
                <span className="text-amber-400">Skor: {correctCount} Doğru</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-8">
                <div
                  className="bg-gradient-to-r from-sky-400 to-amber-400 h-full transition-all duration-300"
                  style={{ width: `${((currentIdx + 1) / activeLevel.questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <h3 className="text-xl sm:text-2xl font-black text-white mb-6">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, oIdx) => {
                  const isAnswered = selectedAnswers[currentIdx] !== undefined;
                  const isSelected = selectedAnswers[currentIdx] === oIdx;
                  const isCorrect = oIdx === currentQ.correctIndex;

                  let btnStyle = 'bg-slate-950/80 border-slate-800 hover:border-slate-700 text-slate-200';
                  if (isAnswered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/50 border-emerald-500/80 text-emerald-300 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-950/50 border-rose-500/80 text-rose-300 font-bold';
                    } else {
                      btnStyle = 'bg-slate-950/40 border-slate-900 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      disabled={isAnswered}
                      onClick={() => handleSelect(oIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {isAnswered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />}
                      {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Note */}
              {selectedAnswers[currentIdx] !== undefined && (
                <div className="p-4 rounded-2xl bg-sky-950/30 border border-sky-500/30 text-xs sm:text-sm text-sky-200 mb-6 animate-fadeIn">
                  <span className="font-bold text-sky-400">Detay: </span>
                  {currentQ.explanation}
                </div>
              )}

              {/* Next Button */}
              {selectedAnswers[currentIdx] !== undefined && (
                <div className="flex justify-end">
                  <button
                    onClick={nextQuestion}
                    className="px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
                  >
                    {currentIdx < activeLevel.questions.length - 1 ? 'Sonraki Soru →' : 'Sonuçları Gör 🏆'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 p-1 flex items-center justify-center shadow-xl shadow-amber-500/30">
                <div className="w-full h-full bg-slate-950 rounded-[20px] flex items-center justify-center text-amber-400">
                  <Award className="w-10 h-10" />
                </div>
              </div>

              <div>
                <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/40">
                  Seviye: {activeLevel.name} ({activeLevel.badge})
                </span>
                <h3 className="text-3xl font-black text-white mt-3">
                  Tebrikler! Test Tamamlandı
                </h3>
                <p className="text-2xl font-black text-amber-400 mt-2 font-mono">
                  {correctCount} / {activeLevel.questions.length} Doğru
                </p>
                <p className="text-slate-300 text-sm mt-2 max-w-md mx-auto">
                  {correctCount === activeLevel.questions.length
                    ? `👑 Kusursuz! '${activeLevel.name}' seviyesini sıfır hatayla geçtiniz. Sıradaki zorluk seviyesine geçebilirsiniz!`
                    : correctCount >= 3
                    ? '⚽ Tebrikler! Harika bir futbol hafızası ve Messi bilgisi sergilediniz.'
                    : '🌱 İyi deneme! Biyografi ve rekorlar bölümlerini inceleyerek tekrar deneyebilirsiniz.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Bu Seviyeyi Tekrar Çöz</span>
                </button>

                {selectedDifficulty !== 'crazy' && (
                  <button
                    onClick={() => {
                      const order: DifficultyLevel[] = ['easy', 'medium', 'hard', 'crazy'];
                      const currentIdx = order.indexOf(selectedDifficulty);
                      handleLevelChange(order[currentIdx + 1]);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-sm hover:brightness-110 cursor-pointer"
                  >
                    <Flame className="w-4 h-4" />
                    <span>Daha Zor Seviyeye Geç 🔥</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
