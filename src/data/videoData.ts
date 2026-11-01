// Lionel Messi Videos & Documentaries Dataset (Turkish & English)
export interface MessiVideo {
  id: string;
  title: string;
  channel: string;
  category: 'documentary' | 'turkish' | 'highlights' | 'worldcup';
  duration: string;
  views: string;
  language: 'TR' | 'EN';
  description: string;
  youtubeQuery: string; // Search query or direct YouTube link
  youtubeEmbedId?: string; // YouTube video ID for inline playing if available
  badge: string;
  featured?: boolean;
}

export const MESSI_VIDEOS: MessiVideo[] = [
  {
    id: 'fifa-world-cup-2022',
    title: 'A Legend Crowned: Lionel Messi & Argentina (Katar 2022 Resmi Film)',
    channel: 'FIFA',
    category: 'worldcup',
    duration: '18:42',
    views: '35M+ İzlenme',
    language: 'EN',
    description: 'FIFA resmi kanalı tarafından hazırlanan, Messi\'nin Suudi Arabistan şokundan Lusail\'deki zafer pelerinine uzanan epik Dünya Kupası belgeseli.',
    youtubeQuery: 'FIFA Lionel Messi World Cup 2022 documentary',
    youtubeEmbedId: '7B_n6Y9WzB8', // Official FIFA / World Cup highlights
    badge: '🏆 Resmi FIFA Belgeseli',
    featured: true
  },
  {
    id: 'socrates-messi-hikayesi',
    title: 'Lionel Messi Nasıl Futbolun Tanrısı Oldu? (Biyografik İnceleme)',
    channel: 'Socrates Dergi',
    category: 'turkish',
    duration: '22:15',
    views: '1.8M+ İzlenme',
    language: 'TR',
    description: 'Rosario sokaklarındaki küçük çocuktan 8 Ballon d\'Or kazanan yaşayan efsaneye: Taktiksel gelişim, büyüme hormonu ve Arjantin\'deki baskı.',
    youtubeQuery: 'Socrates Dergi Lionel Messi Belgeseli',
    badge: '🇹🇷 Türkçe Özel Analiz',
    featured: true
  },
  {
    id: 'hikayesi-ne-messi',
    title: 'Peçeteden Dünya Kupasına: Lionel Messi\'nin İnanılmaz Hayat Hikayesi',
    channel: 'Hikayesi Ne?',
    category: 'turkish',
    duration: '28:50',
    views: '3.4M+ İzlenme',
    language: 'TR',
    description: 'Anneannesi Celia\'nın desteği, Barcelona\'ya geliş, 2014 ve 2016\'da kaybedilen finaller ve 2022\'de gelen tarihi kefaret.',
    youtubeQuery: 'Lionel Messi hayat hikayesi belgeseli turkce',
    badge: '🇹🇷 Duygusal Hikaye'
  },
  {
    id: 'messi-meets-america',
    title: 'Messi Meets America: Inter Miami Devrimi',
    channel: 'Apple TV+ / MLS',
    category: 'documentary',
    duration: '6 Bölüm (Dizi)',
    views: '12M+ İzlenme',
    language: 'EN',
    description: 'David Beckham ile bir araya gelerek son sıradaki takımı Amerika şampiyonu yapan tarihi serüvenin sahne arkası.',
    youtubeQuery: 'Messi Meets America official trailer Apple TV',
    badge: '🌟 Resmi Dizi Belgesel'
  },
  {
    id: 'all-91-goals-2012',
    title: 'Lionel Messi - 2012 Yılında Attığı 91 Golün Tamamı (Dünya Rekoru)',
    channel: 'FC Barcelona & UEFA TV',
    category: 'highlights',
    duration: '14:30',
    views: '48M+ İzlenme',
    language: 'EN',
    description: 'Futbol tarihinin kırılması en güç bireysel başarısı: 69 maçta atılan 91 golün yüksek kaliteli kamera açıları ve spiker sesleriyle derlemesi.',
    youtubeQuery: 'Lionel Messi all 91 goals in 2012 full compilation',
    badge: '🔥 91 Gol Rekoru'
  },
  {
    id: 'vole-goat-tartismasi',
    title: 'Tarihin En İyisi Tartışması Bitti mi? Messi ve Maradona Kıyaslaması',
    channel: 'VOLE',
    category: 'turkish',
    duration: '19:40',
    views: '950K+ İzlenme',
    language: 'TR',
    description: 'Türk futbol yorumcularının Messi\'nin 2022 Dünya Kupası zaferi sonrası yaptığı derinlemesine miras ve GOAT değerlendirmesi.',
    youtubeQuery: 'VOLE Messi dunya kupasi tartismasi bitti mi',
    badge: '🇹🇷 Stüdyo Değerlendirmesi'
  },
  {
    id: 'messi-the-movie-magical',
    title: 'Lionel Messi: The Movie - Pure Football Art & Impossible Passes',
    channel: 'MagicalMessi',
    category: 'highlights',
    duration: '25:12',
    views: '62M+ İzlenme',
    language: 'EN',
    description: 'YouTube\'un en çok izlenen futbol video serisi. Yalnızca goller değil; fizik kurallarına meydan okuyan asistler, vizyon pasları ve çalımlar.',
    youtubeQuery: 'MagicalMessi Lionel Messi the movie impossible skills and passes',
    badge: '✨ 60M+ İzlenme Rekoru'
  },
  {
    id: 'messi-rise-of-legend',
    title: 'Messi\'s World Cup: The Rise of a Legend (Resmi Arjantin Soyunma Odası)',
    channel: 'Apple TV+ & AFA',
    category: 'documentary',
    duration: '4 Bölüm',
    views: '8M+ İzlenme',
    language: 'EN',
    description: 'Katar 2022 boyunca Arjantin soyunma odasında yaşanan gerilim, Messi\'nin takım konuşmaları ve Hollanda maçı gerginlikleri.',
    youtubeQuery: 'Messis World Cup The Rise of a Legend official trailer',
    badge: '🎬 Özel Soyunma Odası'
  }
];
