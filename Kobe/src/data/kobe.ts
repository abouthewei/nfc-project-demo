// Facts checked 2026-09-07. Editorial order, not an official ranking.
// Sources are per item; photographs are explicitly captioned archival images, not fabricated game photography.
export const sources = {
  career: "https://pr.nba.com/kobe-bryant-career-numbers/",
  profile: "https://www.nba.com/player/977/kobe-bryant",
  alumni: "https://www.nba.com/lakers/history/alumni/kobe-bryant",
  bio: "https://jr.nba.com/player-profile-kobe-bryant/",
  hall: "https://www.nba.com/watch/list/collection/kobe-bryant-career-highlights",
};
export const stats = [
  { value: 5, suffix: "×", label: "NBA CHAMPION", zh: "NBA 总冠军" },
  { value: 18, suffix: "×", label: "ALL-STAR", zh: "全明星入选" },
  { value: 33643, suffix: "", label: "CAREER POINTS", zh: "常规赛总得分" },
  { value: 2, suffix: "×", label: "FINALS MVP", zh: "总决赛最有价值球员" },
  { value: 20, suffix: "", label: "NBA SEASONS", zh: "全部献给洛杉矶" },
];
export const timeline = [
  {
    year: "1996",
    title: "THE BEGINNING",
    text: "高中毕业后进入 NBA，选秀交易让他来到洛杉矶。",
  },
  {
    year: "2000",
    title: "THE FIRST RING",
    text: "与奥尼尔赢得首冠，开启 2000—2002 年三连冠。",
  },
  {
    year: "2006",
    title: "EIGHTY-ONE",
    text: "对阵猛龙得到 81 分，写下个人单场得分巅峰。",
  },
  {
    year: "2008",
    title: "MOST VALUABLE",
    text: "荣膺常规赛 MVP，同年随美国队夺得奥运金牌。",
  },
  {
    year: "2009",
    title: "HIS OWN CHAPTER",
    text: "第四座总冠军，第一次捧起总决赛 MVP 奖杯。",
  },
  {
    year: "2010",
    title: "BACK-TO-BACK",
    text: "抢七击败凯尔特人，完成两连冠与第五冠。",
  },
  {
    year: "2016",
    title: "ONE LAST SHOW",
    text: "告别战轰下 60 分，结束 20 年湖人生涯。",
  },
  {
    year: "2020",
    title: "FOREVER ENSHRINED",
    text: "入选 2020 届名人堂；入堂仪式于 2021 年举行。",
  },
];
export type Moment = {
  rank: number;
  year: string;
  date: string;
  title: string;
  subtitle: string;
  description: string;
  mediaType: "youtube" | "image" | "external";
  media: string;
  poster?: string;
  caption: string;
  stat: string;
  statLabel: string;
  source: string;
  variant: "feature" | "reverse" | "wide" | "split";
};
export const moments: Moment[] = [
  {
    rank: 1,
    year: "2006",
    date: "JAN 22, 2006",
    title: "A NIGHT\nBEYOND BELIEF.",
    subtitle: "81 POINTS · VS TORONTO RAPTORS",
    description:
      "斯台普斯中心的一夜，科比把得分带到了想象之外。下半场独取 55 分，全场 81 分，带领湖人以 122 比 104 逆转猛龙。这是他职业生涯的单场最高分，也是属于一代球迷的共同记忆。",
    mediaType: "external",
    media: "https://www.bilibili.com/video/BV1R6uF67E4s/",
    poster: "https://i1.hdslb.com/bfs/archive/5855fce83b8e4371dffe522d35e699907ef6670a.jpg",
    caption: "哔哩哔哩 · 81 分集锦",
    stat: "81",
    statLabel: "POINTS",
    source: sources.career,
    variant: "feature",
  },
  {
    rank: 2,
    year: "2016",
    date: "APR 13, 2016",
    title: "THE LAST\nDANCE.",
    subtitle: "60 POINTS · VS UTAH JAZZ",
    description:
      "二十年的故事，用最后四节来告别。科比在职业生涯最后一战得到 60 分，带领湖人以 101 比 96 战胜爵士。从最初的少年，到最后一次挥手，他把所有能量留在了球场。",
    mediaType: "external",
    media: "https://www.bilibili.com/video/BV1sUNW6xEVS/",
    poster: "https://i1.hdslb.com/bfs/archive/b05ab347251bbc1c1aa56d2112c2e0250ae8d7a9.jpg",
    caption: "哔哩哔哩 · 生涯告别战集锦",
    stat: "60",
    statLabel: "POINTS IN HIS FINAL GAME",
    source: sources.career,
    variant: "reverse",
  },
  {
    rank: 3,
    year: "2010",
    date: "JUN 17, 2010",
    title: "WHATEVER\nIT TAKES.",
    subtitle: "2010 NBA FINALS · GAME 7",
    description:
      "投篮失准的夜晚，他用另一种方式争取胜利。23 分、15 个篮板，湖人在防守拉锯中以 83 比 79 击败凯尔特人。第五冠的意义，在于找到赢球的办法。",
    mediaType: "image",
    media: "playoffs",
    caption: "资料照片：2010 年季后赛，对阵雷霆（非总决赛抢七）",
    stat: "5",
    statLabel: "NBA CHAMPIONSHIPS",
    source: "https://www.espn.com/nba/player/gamelog?id=110&type=nba&year=2010",
    variant: "wide",
  },
  {
    rank: 4,
    year: "2009",
    date: "JUN 14, 2009",
    title: "A CHAPTER\nOF HIS OWN.",
    subtitle: "NBA CHAMPION · FIRST FINALS MVP",
    description:
      "湖人以 4 比 1 击败魔术重返巅峰。科比在这轮总决赛场均得到 32.4 分、5.6 个篮板和 7.4 次助攻，首次当选总决赛 MVP。属于他的领袖篇章，就此落笔。",
    mediaType: "image",
    media: "champions",
    caption: "资料照片：2009 年冠军湖人队于 2010 年访问白宫",
    stat: "32.4",
    statLabel: "POINTS PER GAME · 2009 FINALS",
    source: "https://www.basketball-reference.com/playoffs/NBA_2009.html",
    variant: "reverse",
  },
  {
    rank: 5,
    year: "2006",
    date: "APR 30, 2006",
    title: "BUILT FOR\nTHIS MOMENT.",
    subtitle: "VS PHOENIX SUNS · PLAYOFFS GAME 4",
    description:
      "先在常规时间最后时刻上篮追平，再在加时赛完成压哨跳投。两次关键出手，把悬念变成了全场的欢呼。湖人以 99 比 98 拿下这一场季后赛。",
    mediaType: "external",
    media: "https://www.bilibili.com/video/BV1t5Nr6kEih/",
    poster: "https://i1.hdslb.com/bfs/archive/4d3e89b6ef8074a3577296c5ce1c503c9dc9f695.jpg",
    caption: "哔哩哔哩 · NBA 官方双绝杀全记录",
    stat: "0.0",
    statLabel: "SECONDS LEFT",
    source: "https://www.nba.com/watch/video/tdih-kobe-bryant-game-winner-vs-phx-in-2006",
    variant: "split",
  },
  {
    rank: 6,
    year: "2005",
    date: "DEC 20, 2005",
    title: "THREE QUARTERS.\nSIXTY-TWO.",
    subtitle: "VS DALLAS MAVERICKS",
    description:
      "只用三节，他就得到 62 分，而独行侠全队此时只有 61 分。第四节，科比没有再登场。一个月后那场 81 分之夜的序曲，已经在这里响起。",
    mediaType: "external",
    media: "https://www.bilibili.com/video/BV1LgfoYzEej/",
    poster: "https://i1.hdslb.com/bfs/archive/09d6f0a55894eadf24892de4fd2dc89d12a1100a.jpg",
    caption: "哔哩哔哩 · 三节 62 分回顾",
    stat: "62",
    statLabel: "POINTS · 3 QUARTERS",
    source: "https://www.bilibili.com/video/BV1LgfoYzEej/",
    variant: "reverse",
  },
  {
    rank: 7,
    year: "2008",
    date: "2007—08 SEASON",
    title: "MOST\nVALUABLE.",
    subtitle: "NBA REGULAR-SEASON MVP",
    description:
      "当个人进攻与球队领导力交汇，一个赛季成为新的里程碑。科比以场均 28.3 分、6.3 个篮板、5.4 次助攻的表现，赢得职业生涯唯一一次常规赛 MVP。",
    mediaType: "image",
    media: "mvp",
    caption: "资料照片：2008 年北京奥运会期间的科比",
    stat: "MVP",
    statLabel: "2007—08 NBA SEASON",
    source: sources.alumni,
    variant: "split",
  },
  {
    rank: 8,
    year: "2000",
    date: "JUN 04, 2000",
    title: "THE LOB.\nTHE BEGINNING.",
    subtitle: "WESTERN CONFERENCE FINALS · GAME 7",
    description:
      "科比突破后把球抛向空中，奥尼尔高高跃起完成扣篮。这次空中接力成为湖人逆转开拓者的标志镜头，也为随后到来的三连冠留下了最鲜明的开场。",
    mediaType: "image",
    media: "young",
    caption: "资料照片：身披 8 号球衣的早期科比（非该场比赛）",
    stat: "2000",
    statLabel: "A DYNASTY BEGINS",
    source:
      "https://www.espn.com/nba/story/_/id/29927167/fistfights-battle-lines-showboat-lakers-kobe-shaq-dynasty",
    variant: "reverse",
  },
  {
    rank: 9,
    year: "2003",
    date: "JAN 07, 2003",
    title: "BEYOND\nTHE ARC.",
    subtitle: "12 THREE-POINTERS · VS SEATTLE",
    description:
      "对阵西雅图超音速，科比单场命中 12 记三分，创造当时的 NBA 纪录。外线连续开火，让所有人看到：他的进攻威胁，从来不只在中距离。",
    mediaType: "image",
    media: "dunk",
    caption: "资料照片：8 号时期的科比（非 2003 年对阵西雅图）",
    stat: "12",
    statLabel: "THREE-POINTERS MADE",
    source: sources.profile,
    variant: "split",
  },
  {
    rank: 10,
    year: "2013",
    date: "APR 12, 2013",
    title: "THE WILL\nREMAINS.",
    subtitle: "TWO FREE THROWS · VS GOLDEN STATE",
    description:
      "跟腱受伤后，科比走上罚球线，命中两次罚球才离场。那一幕成为他职业生涯中令人难忘的一页：比分之外，是一名球员对比赛近乎全部的投入。",
    mediaType: "image",
    media: "warriors",
    caption: "资料照片：科比对阵马辛·戈塔特（非跟腱受伤比赛）",
    stat: "2",
    statLabel: "FREE THROWS. ONE UNFORGETTABLE MOMENT.",
    source: "https://www.nba.com/lakers/news/130412bryanttearsachilles",
    variant: "wide",
  },
];
