export const jordanSources = {
  bio: "https://www.nba.com/news/history-nba-legend-michael-jordan",
  flu: "https://www.nba.com/watch/list/collection/1997-nba-finals-jazz-vs-bulls",
  bulls: "https://www.nba.com/bulls/history/rise-shine",
};

export const jordanStats = [
  ["6×", "NBA CHAMPION"],
  ["5×", "NBA MVP"],
  ["6×", "FINALS MVP"],
  ["10×", "SCORING TITLES"],
  ["14×", "ALL-STAR"],
];
export const jordanTimeline = [
  ["1984", "ENTERED THE NBA", "以第三顺位开启职业生涯。"],
  ["1986", "SIXTY-THREE", "季后赛对凯尔特人得到 63 分。"],
  ["1991", "FIRST RING", "首冠与首座总决赛 MVP。"],
  ["1993", "THREE-PEAT", "完成第一个三连冠。"],
  ["1995", "I'M BACK", "重返芝加哥。"],
  ["1996", "72—10", "历史级常规赛与第四冠。"],
  ["1997", "THE FLU GAME", "总决赛第五场带病砍下 38 分。"],
  ["1998", "THE LAST SHOT", "第六冠的最后一击。"],
];
export type JordanMoment = {
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
export const jordanMoments: JordanMoment[] = [
  {
    rank: 1,
    year: "1998",
    title: "THE LAST SHOT",
    sub: "NBA FINALS · GAME 6",
    text: "终场前 5.2 秒，乔丹面对爵士投进反超中投。那次出手锁定第六冠，也成为公牛王朝最常被重播的画面。",
    stat: "6TH RING",
    type: "external",
    media: "https://www.bilibili.com/video/BV1UfJw6gEoe/",
    poster: "https://i0.hdslb.com/bfs/archive/fa7fee2104a99c2d8ba0375c2113d123e2ace919.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 2,
    year: "1997",
    title: "THE FLU GAME",
    sub: "NBA FINALS · GAME 5",
    text: "在高烧与脱水中，他得到 38 分，其中第四节 15 分。公牛客场拿下关键胜利，并在第六场赢得第五冠。",
    stat: "38 PTS",
    type: "image",
    media: "./images/jordan/jordan-1997.webp",
    poster: "https://i0.hdslb.com/bfs/archive/efc7bdf870dae550b307807405a885220641b94c.jpg",
    source: jordanSources.flu,
  },
  {
    rank: 3,
    year: "1989",
    title: "THE SHOT",
    sub: "VS CLEVELAND · GAME 5",
    text: "首轮决胜时刻，他在骑士主场跳起命中压哨。篮球落网前的滞空，与落网后的起跳，构成了最早的经典之一。",
    stat: "0.0",
    type: "external",
    media: "https://www.bilibili.com/video/BV1R5NK6REXR/",
    poster: "https://i1.hdslb.com/bfs/archive/34853c2a31e42a24821e03a8f5d828cec3be79f3.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 4,
    year: "1986",
    title: "SIXTY-THREE",
    sub: "PLAYOFFS VS BOSTON",
    text: "面对凯尔特人，二年级的乔丹在加时赛轰下 63 分。这是一场失利，却提前预告了他会如何进入历史。",
    stat: "63 PTS",
    type: "image",
    media: "./images/jordan/portrait-2014.webp",
    poster: "https://i0.hdslb.com/bfs/archive/455caa3015b6d06af3e8da8b63d6b092a6eabb43.jpg",
    source: jordanSources.bulls,
  },
  {
    rank: 5,
    year: "1991",
    title: "THE SWITCH-HAND",
    sub: "NBA FINALS · GAME 2",
    text: "空中换手上篮，是他对身体控制与想象力的一个缩影。公牛随后赢得队史首冠。",
    stat: "1ST TITLE",
    type: "external",
    media: "https://www.bilibili.com/video/BV1sx3E6tEZv/",
    poster: "https://i0.hdslb.com/bfs/archive/5e1af4a96b7bff25cca0529828b50a21b383b06b.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 6,
    year: "1992",
    title: "THE SHRUG",
    sub: "NBA FINALS · GAME 1",
    text: "上半场命中 6 记三分、得到 35 分后，乔丹耸肩。这个轻微动作，成了比赛失去常理时最从容的注脚。",
    stat: "35 PTS",
    type: "image",
    media: "./images/jordan/jordan-1997.webp",
    poster: "https://i2.hdslb.com/bfs/archive/3eddd517d711bbc8694b3d12757f811f3a4b38ea.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 7,
    year: "1988",
    title: "FLIGHT SCHOOL",
    sub: "SLAM DUNK CONTEST",
    text: "芝加哥的扣篮大赛，让“Air Jordan”从绰号变成一整套篮球想象。",
    stat: "50",
    type: "external",
    media: "https://www.bilibili.com/video/BV1uGbDzEEeF/",
    poster: "https://i0.hdslb.com/bfs/archive/03cf9b9dfc2ce0435e731449c18ed983840a14a8.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 8,
    year: "1995",
    title: "DOUBLE NICKEL",
    sub: "MADISON SQUARE GARDEN",
    text: "复出后的第四场，身穿 45 号的乔丹在麦迪逊广场花园得到 55 分。",
    stat: "55 PTS",
    type: "image",
    media: "./images/jordan/portrait-2014.webp",
    poster: "https://i2.hdslb.com/bfs/archive/bdc5d0f5884aa788125737cc3a7eb0e83dfe4fea.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 9,
    year: "1996",
    title: "FATHER'S DAY",
    sub: "CHAMPIONSHIP · GAME 6",
    text: "经历父亲离世与短暂的棒球生涯后，乔丹率领公牛重返冠军之巅。第一个父亲节冠军，情绪溢出赛场。",
    stat: "72—10",
    type: "external",
    media: "https://www.bilibili.com/video/BV1ehKn6PEEY/",
    poster: "https://i2.hdslb.com/bfs/archive/442772e0de0bec866d8023b6b728d574aa37b0d8.jpg",
    source: jordanSources.bio,
  },
  {
    rank: 10,
    year: "1993",
    title: "THE FIRST THREE-PEAT",
    sub: "BULLS VS SUNS",
    text: "连续第三座冠军完成后，第一个公牛王朝确立。三连冠不只是结果，也是统治力的刻度。",
    stat: "3PEAT",
    type: "image",
    media: "./images/jordan/jordan-1997.webp",
    poster: "https://i1.hdslb.com/bfs/archive/6e06f12b976ee40d6ebeb12b5a29b28622d0c03d.jpg",
    source: jordanSources.bio,
  },
];
