import { MESSI_IMAGES } from '../assets/images';

export interface Trophy {
  id: string;
  title: string;
  count: number | string;
  category: 'milli' | 'kulup' | 'bireysel' | 'rekor';
  year: string;
  icon: string;
  image: string;
  shortDesc: string;
  storyTitle: string;
  storyText: string;
  iconicMoment: string;
  quote?: string;
  statsHighlight?: string;
}

export interface ClubCareer {
  id: string;
  club: string;
  years: string;
  matches: number;
  goals: number;
  assists: number;
  trophiesCount: number;
  color: string;
  description: string;
  badges: string[];
}

export interface FamousQuote {
  id: string;
  author: string;
  role: string;
  category: 'coach' | 'rival' | 'legend' | 'teammate';
  quote: string;
  avatarText?: string;
}

export interface MessiWebsiteData {
  personalInfo: {
    fullName: string;
    birthDate: string;
    birthPlace: string;
    height: string;
    position: string;
    currentClub: string;
    shirtNumber: string;
    dominantFoot: string;
    nicknames: string[];
    totalOfficialTrophies: number;
    careerGoals: number;
    careerAssists: number;
    careerMatches: number;
  };
  bioSummary: {
    heroTagline: string;
    intro: string;
    paragraph1: string;
    paragraph2: string;
    signatureCelebration: string;
    childhoodStory: string;
  };
  clubCareers: ClubCareer[];
  nationalTeam: {
    debut: string;
    matches: string;
    goals: string;
    description: string;
    majorTitles: string[];
  };
  trophies: Trophy[];
  interestingRecords: {
    title: string;
    value: string;
    description: string;
    badge: string;
  }[];
  quotes: FamousQuote[];
}

export const INITIAL_MESSI_DATA: MessiWebsiteData = {
  personalInfo: {
    fullName: "Lionel Andrés Messi Cuccittini",
    birthDate: "24 Haziran 1987",
    birthPlace: "Rosario, Santa Fe, Arjantin",
    height: "1.70 m",
    position: "Sağ Kanat / 10 Numara / Forvet",
    currentClub: "Inter Miami CF",
    shirtNumber: "10",
    dominantFoot: "Sol (Sihirli Sol Ayak)",
    nicknames: ["La Pulga (Pire)", "GOAT", "D10S", "El Mesías"],
    totalOfficialTrophies: 46,
    careerGoals: 850,
    careerAssists: 400,
    careerMatches: 1095
  },
  bioSummary: {
    heroTagline: "Tarihin En İyisi • Futbolun Zarafet ve Deha Sembolü",
    intro: "Lionel Andrés Messi, modern futbolun kurallarını yeniden yazan, zarafeti, olağanüstü dar alan çevikliği ve eşsiz oyun aklıyla tüm dünyayı büyüleyen Arjantinli bir futbol efsanesidir.",
    paragraph1: "Kariyerinin 17 yılını geçirdiği FC Barcelona'da sayısız kupa kazanmış, La Liga tarihinin gelmiş geçmiş en çok gol atan ve asist yapan oyuncusu olmuştur. 2021'de PSG'ye, 2023'te ise Amerika'da futbol devrimi yaratarak Inter Miami'ye transfer olmuştur.",
    paragraph2: "Yıllar boyunca milli takımda yaşadığı acı finallerin ardından asla pes etmemiş; 2021 ve 2024 Copa América zaferlerinin ardından 2022 FIFA Dünya Kupası'nı kazanarak koleksiyonundaki o kutsal eksik parçayı tamamlamış ve tarihin tartışmasız en büyüğü (GOAT) olduğunu kanıtlamıştır.",
    signatureCelebration: "Her golden sonra iki işaret parmağıyla gökyüzünü göstermesi, ona futbola başlama inancını aşılayan ve çocuk yaşta kaybettiği merhum anneannesi Celia Olivera de Cuccittini'ye ithafıdır.",
    childhoodStory: "11 yaşında büyüme hormonu eksikliği teşhisi konulduğunda River Plate yüksek tedavi masraflarını karşılayamadı. Ancak Barcelona gözlemcisi Carles Rexach, onu izledikten sonra hemen bir kağıt peçeteye ilk sözleşmeyi imzalattı ve tedavi masraflarını üstlendi. Bu peçete, futbol tarihinin akışını sonsuza dek değiştirdi."
  },
  clubCareers: [
    {
      id: "barcelona",
      club: "FC Barcelona",
      years: "2004 – 2021",
      matches: 778,
      goals: 672,
      assists: 303,
      trophiesCount: 35,
      color: "from-blue-900 via-indigo-900 to-rose-950",
      description: "17 büyülü sezon boyunca bir kulüp ve bir oyuncunun tarihte gördüğü en kusursuz ortaklık. 4 Şampiyonlar Ligi, 10 La Liga zaferi ve 6 Ballon d'Or.",
      badges: ["10x La Liga", "4x Şampiyonlar Ligi", "7x Copa del Rey", "3x Kulüpler Dünya Kupası"]
    },
    {
      id: "psg",
      club: "Paris Saint-Germain (PSG)",
      years: "2021 – 2023",
      matches: 75,
      goals: 32,
      assists: 35,
      trophiesCount: 3,
      color: "from-blue-950 via-slate-900 to-red-950",
      description: "Fransa başkentinde Kylian Mbappé ve Neymar ile bir araya gelerek 2 Ligue 1 şampiyonluğu ve Trophée des Champions kazandı.",
      badges: ["2x Ligue 1 Şampiyonluğu", "1x Fransa Süper Kupası", "Ligue 1 Asist Kralı (16 Asist)"]
    },
    {
      id: "intermiami",
      club: "Inter Miami CF",
      years: "2023 – Günümüz",
      matches: 40,
      goals: 34,
      assists: 20,
      trophiesCount: 2,
      color: "from-pink-950 via-slate-900 to-rose-900",
      description: "MLS'te futbol çılgınlığı başlattı. Katıldığı ilk ayda kulübü tarihindeki ilk kupası olan Leagues Cup'a taşıdı, ardından 2024 Supporters' Shield rekorunu kırdı.",
      badges: ["2023 Leagues Cup Şampiyonu", "2024 Supporters' Shield", "MLS Tarihsel Puan Rekoru"]
    }
  ],
  nationalTeam: {
    debut: "17 Ağustos 2005 (Macaristan Karşısında)",
    matches: "189 Maç",
    goals: "112 Gol (Güney Amerika Rekoru)",
    description: "Arjantin Milli Takımı kaptanı olarak genç yaşta Olimpiyat altınıyla başlayan yolculuk; hayal kırıklıkları, fedakarlıklar ve sonunda gelen Dünya Kupası zaferiyle destansı bir zafere dönüştü.",
    majorTitles: [
      "2022 FIFA Dünya Kupası Şampiyonu (Katar)",
      "2024 Copa América Şampiyonu (ABD)",
      "2021 Copa América Şampiyonu (Brezilya)",
      "2022 Finalissima Şampiyonu (Wembley)",
      "2008 Pekin Olimpiyatları Altın Madalya",
      "2005 FIFA U-20 Dünya Kupası Şampiyonu"
    ]
  },
  trophies: [
    {
      id: "world-cup-2022",
      title: "2022 FIFA Dünya Kupası",
      count: "1 Kez",
      category: "milli",
      year: "2022",
      icon: "Trophy",
      image: MESSI_IMAGES.hero,
      shortDesc: "Futbol tarihinin en ikonik finalinde Fransa'ya karşı gelen görkemli zafer.",
      storyTitle: "Lusail Çölünde Tamamlanan Kader: Dünyanın Zirvesi",
      storyText: "18 Aralık 2022 günü Katar'daki Lusail Stadyumu, futbol tarihinin en heyecan verici Dünya Kupası finaline sahne oldu. Messi maçta 2 gol attı, penaltı atışlarında da topu soğukkanlılıkla ağlara gönderdi. Turnuvanın En İyi Oyuncusu seçilerek altın kupayı havaya kaldırdı.",
      iconicMoment: "Final maçının uzatma anlarındaki 108. dakikada attığı gol ve pelerinle kupayı kaldırdığı an.",
      quote: "Bunu hayatım boyunca istedim. Tanrı'nın bunu bana vereceğini biliyordum.",
      statsHighlight: "7 Gol, 3 Asist, Dünya Kupası Altın Top Ödülü"
    },
    {
      id: "ballon-dor-8",
      title: "8x Ballon d'Or (Altın Top)",
      count: "8 Kez (Tarihi Rekor)",
      category: "bireysel",
      year: "2009, 2010, 2011, 2012, 2015, 2019, 2021, 2023",
      icon: "Award",
      image: MESSI_IMAGES.ballonDor,
      shortDesc: "Üç farklı on yılda dünyanın en iyi futbolcusu seçilen tarihteki tek isim.",
      storyTitle: "Kırılamaz Bir Hanedanlık: 8 Altın Top",
      storyText: "Lionel Messi, ilk ödülünü 2009'da 22 yaşındayken kazandı. 2010, 2011 ve 2012'de art arda kazanarak üst üste 4 kez kazanan tek futbolcu oldu. 2023'te Paris'te 8. ödülü kaldırarak ulaşılamaz bir zirve kurdu.",
      iconicMoment: "2012'de 91 gol sonrası gelen 4. ödül ve 2023'te Dünya Kupası zaferiyle taçlanan 8. ödül.",
      quote: "Her Ballon d'Or özeldir ama sonuncusu Dünya Kupası'nın bir armağanıydı.",
      statsHighlight: "8 Kez Kazandı, 5 Kez İkinci, 1 Kez Üçüncü (14 Kez Podyum)"
    },
    {
      id: "champions-league-4",
      title: "4x UEFA Şampiyonlar Ligi",
      count: "4 Kupa",
      category: "kulup",
      year: "2006, 2009, 2011, 2015",
      icon: "Crown",
      image: MESSI_IMAGES.uclTrophy,
      shortDesc: "Avrupa futbolunun en büyük sahnesinde 4 zafer ve jeneriklik finaller.",
      storyTitle: "Avrupa'nın Efendisi: Roma ve Wembley Büyüleri",
      storyText: "2009 Roma finalinde Edwin van der Sar'ı avladığı havada asılı kalan kafa golü, 2011 Wembley'de Sir Alex Ferguson'un ellerini titreten füzesi ve 2015 Berlin'de efsane MSN üçlüsüyle kazanılan 4. dev kupa.",
      iconicMoment: "2009 Roma finalinde havaya fırlayan kramponunu eline alıp öptüğü sevinç.",
      quote: "O gece Manchester United'ı sahadan silen bir futbol oynadık.",
      statsHighlight: "129 Şampiyonlar Ligi Golü, 8 Hat-trick"
    },
    {
      id: "copa-america",
      title: "2x Copa América Şampiyonluğu",
      count: "2 Kez",
      category: "milli",
      year: "2021 (Brezilya) & 2024 (ABD)",
      icon: "ShieldAlert",
      image: MESSI_IMAGES.copaAmerica,
      shortDesc: "Maracanã'da Brezilya'yı mağlup ederek Arjantin'in 28 yıllık hasretine son verdi.",
      storyTitle: "Maracanazo ve Gözyaşları: Lanetin Bozulduğu Gece",
      storyText: "10 Temmuz 2021'de Rio de Janeiro'daki efsanevi Maracanã Stadyumu'nda Brezilya'yı 1-0 mağlup ettiler. Bitiş düdüğü çaldığında Messi dizlerinin üstüne çöküp ağladı; tüm takım ona koştu.",
      iconicMoment: "Son düdükle birlikte takım arkadaşlarının Messi'yi havaya fırlatması.",
      quote: "Bu kupayı halkımız için o kadar çok istedik ki... Sonunda başardık.",
      statsHighlight: "2021 Turnuva Gol Kralı (4 Gol), Asist Kralı (5 Asist)"
    },
    {
      id: "golden-boot-6",
      title: "6x Avrupa Altın Ayakkabı",
      count: "6 Kez (Rekor)",
      category: "bireysel",
      year: "2010, 2012, 2013, 2017, 2018, 2019",
      icon: "Zap",
      image: MESSI_IMAGES.goldenBoots,
      shortDesc: "Avrupa liglerinin en skorer futbolcusuna verilen ödülü tarihte en çok kazanan isim.",
      storyTitle: "Tarihin En Korkutucu Bitiricisi: 6 Altın Krampon",
      storyText: "Messi sadece oyun kurucu değil, futbol tarihinin en öldürücü golcüsü oldu. 2011-12 sezonunda La Liga'da 50 gol atarak kırılması imkansız bir Altın Ayakkabı rekoru kırdı.",
      iconicMoment: "2011-12 sezonunda 37 maçta 50 gol ve toplamda 73 resmi gol.",
      quote: "Gol atmak güzeldir ama kazanılan maçların yanında hiçbir şeydir.",
      statsHighlight: "50 Gol (2011-12, Rekor), 46 Gol (2012-13)"
    },
    {
      id: "record-91-goals",
      title: "Bir Takvim Yılında 91 Gol (2012)",
      count: "91 Gol",
      category: "rekor",
      year: "2012",
      icon: "Flame",
      image: MESSI_IMAGES.record91,
      shortDesc: "Gerd Müller'in 40 yıldır kırılamayan 85 gollük dünya rekorunu tarihe gömdü.",
      storyTitle: "İnsanüstü Bir Yıl: 69 Maçta 91 Gol",
      storyText: "2012 yılında Lionel Messi 69 maçta tam 91 gol attı ve 22 asist yaptı (maç başına 1.32 gol!). Bu rekor Guinness Rekorlar Kitabı'na resmi olarak girdi ve futbolun en ulaşılamaz bireysel rekoru kabul edilir.",
      iconicMoment: "Real Betis deplasmanında attığı 86. golle 1972'den kalma dünya rekorunu geçtiği an.",
      quote: "Rekorlar kırılmak içindir ama Messi'nin 91 golü ancak bir video oyununda kırılabilir.",
      statsHighlight: "Barcelona: 79 Gol | Arjantin: 12 Gol | 22 Asist"
    },
    {
      id: "inter-miami-trophies",
      title: "MLS Devrimi & Leagues Cup",
      count: "2 Kupa",
      category: "kulup",
      year: "2023 - 2024",
      icon: "Sparkles",
      image: MESSI_IMAGES.interMiami,
      shortDesc: "Son sıradaki kulübe katılarak 1 ay içinde kulüp tarihinin ilk şampiyonluğunu kazandırdı.",
      storyTitle: "Pembe Forma Altında Amerikan Rüyası",
      storyText: "Temmuz 2023'te Inter Miami'ye katılan Messi, çıktığı ilk maçın 94. dakikasında Cruz Azul'a frikikten tarihi bir gol attı. Takımı namağlup şampiyon yaparak Leagues Cup'ı kazandırdı. 2024'te ise Supporters' Shield ile toplam kupa sayısını 46'ya çıkardı.",
      iconicMoment: "Inter Miami formasıyla çıktığı ilk maçın 94. dakikasında attığı frikik golü.",
      quote: "Buraya sadece dinlenmeye değil, şampiyonluklar kazanmaya geldim.",
      statsHighlight: "Kariyer Toplamı 46 Kupa ile Futbol Tarihinin 1 Numarası"
    },
    {
      id: "la-liga-titles",
      title: "10x La Liga Şampiyonluğu & 474 Gol",
      count: "10 Kupa",
      category: "kulup",
      year: "2005 – 2019",
      icon: "Medal",
      image: MESSI_IMAGES.laLigaShirt,
      shortDesc: "İspanya futbolunun açık ara en çok gol atan ve en çok şampiyonluk yaşayan lideri.",
      storyTitle: "Camp Nou Krallığı: 10 Lig Zaferi",
      storyText: "Barcelona'da 17 yılda 10 lig şampiyonluğu yaşadı. 520 La Liga maçında 474 gol ve 192 asist yaparak tüm rekorları parçaladı. El Clásico'larda attığı 26 golle ezeli rekabetin de en golcü ismi oldu.",
      iconicMoment: "2017 Bernabéu'da 92. dakikada attığı galibiyet golü sonrası 10 numaralı formasını tribünlere kaldırması.",
      quote: "Camp Nou benim yuvamdı, orada taraftarla birlikte büyüdüm.",
      statsHighlight: "8 Kez Pichichi (Gol Kralı) & 6 Kez Ligin En İyi Oyuncusu"
    }
  ],
  interestingRecords: [
    {
      title: "Tarihin En Çok Kupa Kazananı",
      value: "46 Kupa",
      description: "Milli takım ve kulüp düzeyinde resmi 46 kupa ile Dani Alves'i (43) geride bırakarak futbol tarihinin en çok kupa kazanan oyuncusudur.",
      badge: "Dünya Rekoru"
    },
    {
      title: "Bir Takvim Yılında En Çok Gol",
      value: "91 Gol (2012)",
      description: "69 maçta 91 gol atarak Gerd Müller'in 85 gollük 40 yıllık dünya rekorunu geride bırakmıştır.",
      badge: "Guinness Rekorlar"
    },
    {
      title: "La Liga Tüm Zamanlar Gol Kralı",
      value: "474 Gol",
      description: "En yakın rakibi Cristiano Ronaldo'nun (311) 163 gol önünde, La Liga tarihinin açık ara en golcü ismidir.",
      badge: "İspanya Rekoru"
    },
    {
      title: "El Clásico Tarihinin En Golcüsü",
      value: "26 Gol",
      description: "Real Madrid - Barcelona ezeli rekabetinde tarihin en çok gol atan ve en çok asist yapan (14) oyuncusudur.",
      badge: "El Clásico Efsanesi"
    },
    {
      title: "Tarihin En Çok Asist Yapan Oyuncusu",
      value: "380+ Asist",
      description: "Sadece gol atmakla kalmayıp kariyerinde 380'den fazla asistle modern futbolun en cömert oyun kurucusudur.",
      badge: "Oyun Aklı"
    },
    {
      title: "Ömür Boyu Sponsorluk Anlaşması",
      value: "Adidas & Markalar",
      description: "2006'dan beri Adidas ile iş birliği yapan Messi, 2017'de Michael Jordan gibi isimlerin yer aldığı ömür boyu sözleşme kulübüne katıldı.",
      badge: "Global İkon"
    }
  ],
  quotes: [
    {
      id: "pep",
      author: "Pep Guardiola",
      role: "Eski Barcelona & Manchester City Teknik Direktörü",
      category: "coach",
      quote: "Onun hakkında bir şey yazmaya çalışmayın, onu tarif etmeye kalkışmayın; sadece onu izleyin.",
      avatarText: "PG"
    },
    {
      id: "ronaldo",
      author: "Cristiano Ronaldo",
      role: "Ezeli Rakibi & 5x Ballon d'Or Kazananı",
      category: "rival",
      quote: "Messi ile 15 yıl boyunca aynı sahneyi paylaştık. Futbol tarihinde böyle bir rekabet görülmedi. O muhteşem bir oyuncu, beni her zaman daha iyi olmaya itti.",
      avatarText: "CR"
    },
    {
      id: "maradona",
      author: "Diego Armando Maradona",
      role: "Arjantin Futbol İlahı",
      category: "legend",
      quote: "Beni Arjantin futbolunda mirasçı olarak temsil edecek oyuncuyu gördüm; onun adı Lionel Messi. Top ayağına öyle yapışıyor ki sanki onun bir parçası.",
      avatarText: "DM"
    },
    {
      id: "klopp",
      author: "Jürgen Klopp",
      role: "Eski Liverpool Menajeri",
      category: "coach",
      quote: "Babam bana her zaman gelmiş geçmiş en iyinin Pelé olduğunu söylerdi. Ama ben Messi'yi canlı izledim; o kesinlikle tarihin gördüğü en büyük futbolcudur.",
      avatarText: "JK"
    },
    {
      id: "ibrahimovic",
      author: "Zlatan Ibrahimović",
      role: "Eski Takım Arkadaşı & İsveç Efsanesi",
      category: "rival",
      quote: "Messi tamamen doğal bir yetenek. Çalışarak Ronaldo olabilirsiniz ama asla çalışarak Messi olamazsınız. O bir PlayStation oyunu karakteri gibi oynuyor.",
      avatarText: "ZI"
    },
    {
      id: "mourinho",
      author: "José Mourinho",
      role: "Efsane Teknik Direktör",
      category: "coach",
      quote: "Messi'ye karşı hazırlanırken oyuncularıma tek bir şey söyledim: 'Ona boşluk bırakmayın'. Ama o boşluk yoksa bile o boşluğu sıfırdan yaratabilen tek varlık.",
      avatarText: "JM"
    },
    {
      id: "ronaldinho",
      author: "Ronaldinho",
      role: "Brezilya Efsanesi & Messi'nin Akıl Hocası",
      category: "teammate",
      quote: "2005'te Barcelona'da dünyanın en iyisi ödülünü aldığımda mikrofona çıkıp şunu söyledim: 'Ben dünyanın en iyisiyim ama kulübümün en iyisi bile değilim; çünkü Messi geliyor.'",
      avatarText: "R10"
    },
    {
      id: "henry",
      author: "Thierry Henry",
      role: "Fransa & Arsenal/Barcelona Efsanesi",
      category: "teammate",
      quote: "Antrenmanda faul verilmediğinde kızıp topu kendi kalecimizden alır, sahada 11 kişinin tamamını tek başına çalımlayıp gol atardı. O zaman insan olmadığını anlardınız.",
      avatarText: "TH"
    },
    {
      id: "buffon",
      author: "Gianluigi Buffon",
      role: "Efsane İtalyan Kaleci",
      category: "rival",
      quote: "Messi'nin gerçekten bu dünyadan bir insan olup olmadığını anlamak için Camp Nou'daki maçta maç oynanırken gidip omzuna dokunmam gerekmişti.",
      avatarText: "GB"
    },
    {
      id: "rooney",
      author: "Wayne Rooney",
      role: "İngiltere & Manchester United Efsanesi",
      category: "rival",
      quote: "Bazıları Ronaldo diyor, bazıları Messi. Benim için tartışma yok. Messi sadece tarihin en iyi golcüsü değil, aynı zamanda tarihin en iyi pasörü ve oyun kurucusu.",
      avatarText: "WR"
    },
    {
      id: "wenger",
      author: "Arsène Wenger",
      role: "Efsane Arsenal Menajeri",
      category: "coach",
      quote: "O bir PlayStation futbolcusu. İmkânsız hareketleri sanki parkta yürüyüşe çıkmış gibi inanılmaz bir doğallık ve sükunetle yapıyor.",
      avatarText: "AW"
    },
    {
      id: "lineker",
      author: "Gary Lineker",
      role: "İngiltere Efsanesi & BBC Spikeri",
      category: "legend",
      quote: "Hayatımda gördüğüm hiçbir sporcu Messi'nin verdiği saf çocuksu mutluluğu bana hissettirmedi. O futbolun ta kendisidir.",
      avatarText: "GL"
    },
    {
      id: "rayhudson",
      author: "Ray Hudson",
      role: "Ünlü Futbol Spikeri",
      category: "legend",
      quote: "Magisterial Messi! Telefon kulübesinde bile 3 kişiyi çalımlayıp oradan sağ çıkabilir! Fizik kurallarını çöpe atıp kendi evrenini yaratıyor!",
      avatarText: "RH"
    },
    {
      id: "dimaria",
      author: "Ángel Di María",
      role: "Arjantin Milli Takımı Yol Arkadaşı",
      category: "teammate",
      quote: "He's not human. He can't be. He's an alien. (O insan değil. Olamaz. O başka bir gezegenden.)",
      avatarText: "ADM"
    },
    {
      id: "ronaldinho_no10",
      author: "Ronaldinho",
      role: "Brezilya & Barcelona Efsanesi",
      category: "legend",
      quote: "When he retires, football should retire the No. 10 shirt. (O futbolu bıraktığında, futbol da 10 numaralı formayı emekli etmeli.)",
      avatarText: "R10"
    },
    {
      id: "messi_self",
      author: "Lionel Messi",
      role: "Kendi Sözü",
      category: "teammate",
      quote: "Bir gecede başarılı olmam tam 17 yıl 114 günümü aldı. Pes etmemek ve sevdiğin oyuna sadık kalmak her şeyin anahtarıdır.",
      avatarText: "LM"
    }
  ]
};

export const STORAGE_KEY = 'messi_website_data_v4_pixar';

export function getStoredMessiData(): MessiWebsiteData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.personalInfo && parsed.trophies) {
        // Guarantee latest curated quotes are always synced
        return {
          ...parsed,
          quotes: INITIAL_MESSI_DATA.quotes
        };
      }
    }
  } catch (e) {
    console.error("Local storage load error:", e);
  }
  return INITIAL_MESSI_DATA;
}

export function saveStoredMessiData(data: MessiWebsiteData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage save error:", e);
  }
}

export function resetStoredMessiData(): MessiWebsiteData {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error("Local storage reset error:", e);
  }
  return INITIAL_MESSI_DATA;
}
