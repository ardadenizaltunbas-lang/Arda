import { MESSI_IMAGES } from '../assets/images';

export interface TopGoalItem {
  id: string;
  defaultRank: number;
  title: string;
  matchDate: string;
  match: string;
  competition: string;
  whyListed: string;
  description: string;
  category: 'solo' | 'freekick' | 'chip' | 'header';
  categoryLabel: string;
  image: string;
  youtubeQuery: string;
  defaultRating: number; // Initial rating out of 10
}

export const TOP_10_GOALS: TopGoalItem[] = [
  {
    id: 'getafe-solo',
    defaultRank: 1,
    title: 'Iconic Getafe Solo Golü',
    matchDate: '18.04.2007',
    match: 'Barcelona 5-2 Getafe',
    competition: 'Copa del Rey Yarı Finali',
    whyListed: 'Kendi yarı sahasından başlayıp yaklaşık 5 oyuncuyu ve kaleciyi geçerek attığı Maradona tarzı gol.',
    description: '19 yaşındaki Messi\'nin Maradona\'nın 1986 İngiltere golünü neredeyse adım adım kopyaladığı, futbol tarihinin en kusursuz solo slalom golü.',
    category: 'solo',
    categoryLabel: '⚡ Solo Slalom',
    image: MESSI_IMAGES.getafeGoal,
    youtubeQuery: 'Messi Getafe solo goal 2007',
    defaultRating: 10.0
  },
  {
    id: 'bilbao-solo',
    defaultRank: 2,
    title: 'Athletic Bilbao Kral Kupası Finali Solo Golü',
    matchDate: '30.05.2015',
    match: 'Barcelona 3-1 Athletic Club',
    competition: 'Copa del Rey Finali (Camp Nou)',
    whyListed: 'Sağ kanat taç çizgisinde 3 oyuncunun arasından sıyrılıp ceza sahasına girerek savunmayı dağıttığı muhteşem gol.',
    description: 'Dar alanda fizik kurallarını altüst eden ivmelenme, ters köşe falso ve Puskas Yılın Golü ödülüne aday gösterilen şaheser.',
    category: 'solo',
    categoryLabel: '⚡ Solo Slalom',
    image: MESSI_IMAGES.bilbaoGoal,
    youtubeQuery: 'Messi Athletic Bilbao Copa del Rey final 2015 goal',
    defaultRating: 9.9
  },
  {
    id: 'boateng-chip',
    defaultRank: 3,
    title: 'Bayern Münih – Boateng\'i Yatırdığı & Neuer Aşırtması',
    matchDate: '06.05.2015',
    match: 'Barcelona 3-0 Bayern Münih',
    competition: 'UEFA Şampiyonlar Ligi Yarı Finali',
    whyListed: 'Boateng\'i bilek hareketiyle yere serip dünyanın en iyi kalecisi Neuer\'in üzerinden sağ ayağıyla aşırttığı gol.',
    description: 'Şampiyonlar Ligi tarihinin en ikonik anlarından biri; soğukkanlılık, estetik ve dünyanın zirvesindeki iki oyuncuyu çaresiz bırakan zeka.',
    category: 'chip',
    categoryLabel: '🪄 Büyülü Aşırtma',
    image: MESSI_IMAGES.boatengChip,
    youtubeQuery: 'Messi Boateng Neuer chip Barcelona Bayern 2015',
    defaultRating: 9.8
  },
  {
    id: 'real-madrid-ucl',
    defaultRank: 4,
    title: 'Real Madrid Bernabéu Şampiyonlar Ligi Solo Golü',
    matchDate: '27.04.2011',
    match: 'Real Madrid 0-2 Barcelona',
    competition: 'UEFA Şampiyonlar Ligi Yarı Finali',
    whyListed: 'Orta sahada Busquets\'ten aldığı topla tek başına Real Madrid savunmasını yarıp Casillas\'ı mağlup ettiği gol.',
    description: 'Ezeli rakibin mabedinde, tarihin en gergin El Clásico serisinde tek başına 4 Madrid oyuncusunu arkasında bırakıp uzak köşeye bıraktığı zafer golü.',
    category: 'solo',
    categoryLabel: '⚡ Solo Slalom',
    image: MESSI_IMAGES.realMadridGoal,
    youtubeQuery: 'Messi Bernabeu solo goal Real Madrid 2011 Champions League',
    defaultRating: 9.8
  },
  {
    id: 'liverpool-freekick',
    defaultRank: 5,
    title: 'Liverpool 35 Metre Frikik Füzesi',
    matchDate: '01.05.2019',
    match: 'Barcelona 3-0 Liverpool',
    competition: 'UEFA Şampiyonlar Ligi Yarı Finali',
    whyListed: 'Yaklaşık 35 metreden Alisson Becker\'in uzanamayacağı 90 çatalına gönderdiği akıl almaz frikik.',
    description: 'Topun havada aldığı olağanüstü falso ve hızıyla UEFA tarafından sezonun golü seçilen, Messi\'nin Barcelona formasıyla 600. golü.',
    category: 'freekick',
    categoryLabel: '🎯 Serbest Vuruş',
    image: MESSI_IMAGES.liverpoolFreekick,
    youtubeQuery: 'Messi 35m free kick vs Liverpool 2019 Camp Nou',
    defaultRating: 9.7
  },
  {
    id: 'betis-chip',
    defaultRank: 6,
    title: 'Real Betis Rakip Taraftarları Ayakta Alkışlatan Aşırtma',
    matchDate: '17.03.2019',
    match: 'Real Betis 1-4 Barcelona',
    competition: 'La Liga (Benito Villamarín)',
    whyListed: 'Ceza sahası dışı çaprazından kalecinin üzerinden tek vuruşla üst direğe çarptırarak bıraktığı muhteşem aşırtma.',
    description: 'Golün ardından 50 bin rakip Real Betis taraftarının ayağa kalkıp \'Messi, Messi!\' diye tezahürat yaptığı unutulmaz an.',
    category: 'chip',
    categoryLabel: '🪄 Büyülü Aşırtma',
    image: MESSI_IMAGES.betisChip,
    youtubeQuery: 'Messi Real Betis chip goal 2019 standing ovation',
    defaultRating: 9.6
  },
  {
    id: 'arsenal-chip',
    defaultRank: 7,
    title: 'Arsenal Almunia Üzerinden Topuk Aşırtma Golü',
    matchDate: '08.03.2011',
    match: 'Barcelona 3-1 Arsenal',
    competition: 'UEFA Şampiyonlar Ligi Son 16',
    whyListed: 'İniesta\'nın pasında Almunia\'nın üzerinden tek dokunuşla topu havalandırıp yere inmeden voleyle tamamladığı gol.',
    description: 'Saliseler içinde zarafet, soğukkanlılık ve top kontrolünün doruk noktası.',
    category: 'chip',
    categoryLabel: '🪄 Büyülü Aşırtma',
    image: MESSI_IMAGES.arsenalChip,
    youtubeQuery: 'Messi Arsenal chip volley goal 2011 Champions League',
    defaultRating: 9.5
  },
  {
    id: 'zaragoza-solo',
    defaultRank: 8,
    title: 'Real Zaragoza Savaşçı Solo Golü',
    matchDate: '21.03.2010',
    match: 'Real Zaragoza 2-4 Barcelona',
    competition: 'La Liga',
    whyListed: 'Orta sahada ikili mücadeleyi kazanıp, ayakta kalarak savunmayı darmadağın edip bitirdiği gol.',
    description: 'Messi\'nin sadece teknik değil, aynı zamanda yıkılmaz bir dengeye ve fiziki dirence sahip olduğunu kanıtlayan hat-trick golü.',
    category: 'solo',
    categoryLabel: '⚡ Solo Slalom',
    image: MESSI_IMAGES.zaragozaGoal,
    youtubeQuery: 'Messi Zaragoza solo goal 2010',
    defaultRating: 9.4
  },
  {
    id: 'usa-freekick',
    defaultRank: 9,
    title: 'ABD\'ye Karşı İmkânsız Açılı Frikik',
    matchDate: '21.06.2016',
    match: 'Arjantin 4-0 ABD',
    competition: 'Copa América Centenario Yarı Finali',
    whyListed: 'Kalecinin beklediği ters köşenin tam 90 noktasına mermi gibi gönderdiği milimetrik frikik.',
    description: 'Batistuta\'yı geride bırakıp Arjantin Milli Takım tarihinin en golcü oyuncusu unvanını aldığı tarihi vuruş.',
    category: 'freekick',
    categoryLabel: '🎯 Serbest Vuruş',
    image: MESSI_IMAGES.usaFreekick,
    youtubeQuery: 'Messi free kick vs USA Copa America 2016',
    defaultRating: 9.3
  },
  {
    id: 'man-utd-header',
    defaultRank: 10,
    title: 'Manchester United Şampiyonlar Ligi Finali Kafa Golü',
    matchDate: '27.05.2009',
    match: 'Barcelona 2-0 Manchester United',
    competition: 'UEFA Şampiyonlar Ligi Finali (Roma)',
    whyListed: '1.70 boyundaki Messi\'nin Van der Sar ve Ferdinand üzerinden havada asılı kalarak attığı unutulmaz kafa golü.',
    description: 'Havada fırlayan kramponu, Pep Guardiola\'nın ilk Şampiyonlar Ligi zaferi ve Messi\'nin kendi kariyerinde en sevdiği gol olarak nitelediği vuruş.',
    category: 'header',
    categoryLabel: '👑 İkonik Kafa Golü',
    image: MESSI_IMAGES.manUtdHeader,
    youtubeQuery: 'Messi header goal vs Manchester United 2009 final Rome',
    defaultRating: 9.2
  }
];
