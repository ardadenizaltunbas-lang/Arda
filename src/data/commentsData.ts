// Fan Comments and Guestbook Dataset for Lionel Messi Portal
export interface FanComment {
  id: string;
  fullName: string;
  city: string;
  favoriteMoment: string;
  comment: string;
  rating: number; // 1-5
  createdAt: string;
  likes: number;
  avatarBg: string;
  isVerifiedFan?: boolean;
}

export const INITIAL_COMMENTS: FanComment[] = [
  {
    id: 'c1',
    fullName: 'Burak Yılmazdemir',
    city: 'İstanbul, Türkiye',
    favoriteMoment: '2022 FIFA Dünya Kupası Zaferi (Lusail)',
    comment: 'Hayatım boyunca izlediğim en büyük spor figürü. 2022 Dünya Kupası finalinde kupayı kaldırdığı an çocukluğumun en büyük hayali gerçekleşti. Futbolun tanımı sensin Messi!',
    rating: 5,
    createdAt: 'Dün, 19:42',
    likes: 48,
    avatarBg: 'from-sky-500 to-blue-600',
    isVerifiedFan: true
  },
  {
    id: 'c2',
    fullName: 'Canan Özdemir',
    city: 'İzmir, Türkiye',
    favoriteMoment: '2015 Bayern Münih (Boateng & Neuer Çalımı)',
    comment: 'O maçta Boateng\'i yere serip Neuer\'in üzerinden aşırttığı an televizyon karşısında donup kalmıştık. Sadece bir futbolcu değil, sahada sanat icra eden bir dahi.',
    rating: 5,
    createdAt: '2 gün önce',
    likes: 35,
    avatarBg: 'from-amber-500 to-yellow-600',
    isVerifiedFan: true
  },
  {
    id: 'c3',
    fullName: 'Emre Kılıç',
    city: 'Ankara, Türkiye',
    favoriteMoment: '2012 Bir Yılda 91 Gol Rekoru',
    comment: '91 gol rekorunun tarihte bir daha kırılabileceğine inanmıyorum. Her hafta hat-trick yapmayı sıradanlaştıran tek oyuncu. Saygıyla eğiliyorum GOAT!',
    rating: 5,
    createdAt: '3 gün önce',
    likes: 29,
    avatarBg: 'from-rose-500 to-pink-600',
    isVerifiedFan: true
  },
  {
    id: 'c4',
    fullName: 'Lucas Rossi',
    city: 'Rosario, Arjantin',
    favoriteMoment: 'Copa América 2021 Maracanã Zaferi',
    comment: 'Rosario sokaklarından çıkıp dünyaya futbolun ne olduğunu öğrettin Leo. Bizim için bir oyuncudan çok daha fazlasısın, milli bir gurursun!',
    rating: 5,
    createdAt: '4 gün önce',
    likes: 62,
    avatarBg: 'from-cyan-500 to-sky-600',
    isVerifiedFan: true
  },
  {
    id: 'c5',
    fullName: 'Mert Aksoy',
    city: 'Bursa, Türkiye',
    favoriteMoment: '2019 Liverpool 35 Metre Frikik Golü',
    comment: 'Alisson\'un çaresizce uçtuğu o frikik... Topun falso alışını hala her hafta açıp izliyorum. Dünyaya bir daha böyle bir sol ayak gelmeyecek.',
    rating: 5,
    createdAt: '1 hafta önce',
    likes: 19,
    avatarBg: 'from-indigo-500 to-purple-600',
    isVerifiedFan: false
  }
];

export const COMMENTS_STORAGE_KEY = 'messi_fan_comments_v1';

export function getStoredComments(): FanComment[] {
  try {
    const raw = localStorage.getItem(COMMENTS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Comments load error:', e);
  }
  return INITIAL_COMMENTS;
}

export function saveStoredComments(comments: FanComment[]): void {
  try {
    localStorage.setItem(COMMENTS_STORAGE_KEY, JSON.stringify(comments));
  } catch (e) {
    console.error('Comments save error:', e);
  }
}
