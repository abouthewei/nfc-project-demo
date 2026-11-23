export const currySources = {
  bio: "https://www.nba.com/player/201939/stephen-curry/bio",
  finals43: "https://www.nba.com/news/inside-the-box-score-2022-nba-finals-game-4",
  thunder: "https://www.nba.com/news/stephen-curry-game-winner-thunder-10-year-anniversary",
  olympics: "https://www.usab.com/players/stephen-curry",
};

export const curryStats = [
  ["4×", "NBA CHAMPION"],
  ["2×", "NBA MVP"],
  ["1×", "FINALS MVP"],
  ["402", "THREES · 2015—16"],
  ["30", "UNIFORM NUMBER"],
];

export const curryTimeline = [
  ["2009", "THE BEGINNING", "第七顺位被勇士选中。"],
  ["2013", "NEW YORK, 54", "麦迪逊广场花园的 54 分让全联盟记住他的名字。"],
  ["2015", "FIRST RING", "赢得首冠和常规赛 MVP。"],
  ["2016", "THE UNANIMOUS", "全票 MVP，单季 402 记三分。"],
  ["2017", "A NEW DYNASTY", "连续第二座冠军，勇士的进攻改变了联盟。"],
  ["2018", "BACK TO BACK", "第三座冠军。"],
  ["2022", "THE FINALS ANSWER", "第四冠与首座总决赛 MVP。"],
  ["2024", "GOLD IN PARIS", "奥运决赛关键连中三分，赢得金牌。"],
];

export type CurryMoment = {
  rank: number;
  year: string;
  title: string;
  sub: string;
  text: string;
  stat: string;
  type: "external" | "image";
  media: string;
  poster?: string;
  source: string;
};

export const curryMoments: CurryMoment[] = [
  {
    rank: 1,
    year: "2022",
    title: "FORTY-THREE IN BOSTON",
    sub: "NBA FINALS · GAME 4",
    text: "在总决赛 1 比 2 落后的夜晚，库里交出 43 分、10 篮板和 7 记三分。勇士以 107 比 97 取胜，把系列赛扳成 2 比 2。",
    stat: "43 PTS",
    type: "external",
    media: "https://www.bilibili.com/video/BV1RXtq6zEZt/",
    poster: "https://i0.hdslb.com/bfs/archive/1ab8696e42ab054fa242a8eb1b778b42ff7dadcd.jpg",
    source: currySources.finals43,
  },
  {
    rank: 2,
    year: "2022",
    title: "THE LAST PIECE",
    sub: "CHAMPIONSHIP · FINALS MVP",
    text: "第六场拿下 34 分后，库里得到第一座总决赛 MVP。第四冠并不是句点，而是漫长体系在最高舞台上的回应。",
    stat: "4 RINGS",
    type: "image",
    media: "./images/curry/olympics-2024.webp",
    poster: "https://i0.hdslb.com/bfs/archive/d4808b0d305db5e42c53f40434caed63f787c90c.jpg",
    source: currySources.bio,
  },
  {
    rank: 3,
    year: "2016",
    title: "BANG. BANG.",
    sub: "VS OKLAHOMA CITY",
    text: "加时赛最后，库里在超远距离出手命中，勇士以 121 比 118 险胜雷霆。这记球成了射程被重新定义的标志。",
    stat: "46 PTS",
    type: "external",
    media: "https://www.bilibili.com/video/BV1N5411x7iv/",
    poster: "https://i0.hdslb.com/bfs/archive/2c715f052747028fb35b244c65eb9fe0ab9c112b.jpg",
    source: currySources.thunder,
  },
  {
    rank: 4,
    year: "2021",
    title: "THE RECORD FALLS",
    sub: "ALL-TIME THREE-POINT LEADER",
    text: "在麦迪逊广场花园，库里投进生涯第 2,974 记三分，超越雷·阿伦。纪录说明的不是一次爆发，而是长时间的重复与精度。",
    stat: "2,974",
    type: "image",
    media: "./images/curry/shooting.webp",
    poster: "https://i2.hdslb.com/bfs/archive/04e692abd8fc541b3f87f4c04f36b46bb0303d33.jpg",
    source: currySources.bio,
  },
  {
    rank: 5,
    year: "2016",
    title: "UNANIMOUS",
    sub: "NBA MOST VALUABLE PLAYER",
    text: "全票当选常规赛 MVP，至今仍是该奖项历史上唯一的一次全票。",
    stat: "131 / 131",
    type: "external",
    media: "https://www.bilibili.com/video/BV1Rs4y1Z7is/",
    poster: "https://i1.hdslb.com/bfs/archive/ed5570cbd96c2da024d531eb1d4b6845ad49c73a.jpg",
    source: currySources.bio,
  },
  {
    rank: 6,
    year: "2016",
    title: "FOUR HUNDRED TWO",
    sub: "THREES IN ONE SEASON",
    text: "2015—16 赛季，他投进 402 记三分，单季命中数第一次越过 400 的门槛。",
    stat: "402 3PT",
    type: "image",
    media: "./images/curry/hero-generated.webp",
    poster: "https://i1.hdslb.com/bfs/archive/ed5570cbd96c2da024d531eb1d4b6845ad49c73a.jpg",
    source: currySources.bio,
  },
  {
    rank: 7,
    year: "2015",
    title: "THE FIRST RING",
    sub: "WARRIORS VS CAVALIERS",
    text: "六场总决赛后，勇士结束长达 40 年的冠军等待。一个新的时代从这里起步。",
    stat: "40 YEARS",
    type: "external",
    media: "https://www.bilibili.com/video/BV1j14y1S7go/",
    poster: "https://i0.hdslb.com/bfs/archive/46d3cf4bccf3a02f58c775c4fa6e97ea3f0fbbcf.jpg",
    source: currySources.bio,
  },
  {
    rank: 8,
    year: "2013",
    title: "NEW YORK, 54",
    sub: "MADISON SQUARE GARDEN",
    text: "面对尼克斯得到 54 分，年轻的库里把花园球馆变成了射程展示厅。",
    stat: "54 PTS",
    type: "image",
    media: "./images/curry/shooting.webp",
    poster: "https://i0.hdslb.com/bfs/archive/edc244b3f643948bea35c380b906f09550bbdc59.jpg",
    source: currySources.bio,
  },
  {
    rank: 9,
    year: "2018",
    title: "THE THIRD TITLE",
    sub: "BACK-TO-BACK CHAMPIONS",
    text: "连续两年站上最高领奖台。勇士将速度、传导与外线威胁推向新的高度。",
    stat: "3 / 4",
    type: "external",
    media: "https://www.bilibili.com/video/BV1AXrCBwEEr/",
    poster: "https://i2.hdslb.com/bfs/archive/0f1c089e7523a345f72338a39e99e6a7bc77eeb0.jpg",
    source: currySources.bio,
  },
  {
    rank: 10,
    year: "2024",
    title: "FOURTH QUARTER, PARIS",
    sub: "OLYMPIC GOLD-MEDAL GAME",
    text: "决赛第四节，库里连续命中高难度三分，帮助美国队赢得巴黎奥运金牌。",
    stat: "4 3PT",
    type: "image",
    media: "./images/curry/olympics-2024.webp",
    poster: "https://i0.hdslb.com/bfs/archive/60c40424ed574c2ae19659094dac2f6d7dcb3121.jpg",
    source: currySources.olympics,
  },
];
