export type LocaleText = { zh: string; en: string };

export type LebronMoment = {
  rank: number;
  year: string;
  date: string;
  title: LocaleText;
  subtitle: LocaleText;
  description: LocaleText;
  stat: LocaleText;
  mediaType: "image" | "youtube" | "bilibili";
  media: string;
  source: string;
  variant: "dark" | "light";
};

export const lebronCopy = {
  zh: {
    nav: ["故事", "四段生涯", "十大时刻", "影响力"],
    wordmark: "勒布朗·詹姆斯个人档案",
    heroTitle: ["LEBRON", "JAMES"],
    heroTagline: "从阿克伦走向历史",
    heroLine: "四座城市，一条主线。",
    heroCta: "探索这段旅程",
    scroll: "向下滚动",
    skip: "跳到故事内容",
    statsLabel: "生涯荣誉",
    storyKicker: "THE STORY",
    storyTitle: ["从家乡", "走向世界"],
    storyCaption: "档案影像 · 2008 年克利夫兰",
    story: [
      "1984 年 12 月 30 日，勒布朗·詹姆斯出生于俄亥俄州阿克伦。篮球从街区球场开始，后来变成一条穿过四座城市的职业道路。",
      "2003 年，他以状元身份进入 NBA。克利夫兰、迈阿密、再次回到克利夫兰，再到洛杉矶，每一段经历都重写了人们对全能球员的想象。",
    ],
    facts: ["出生", "家乡", "选秀", "位置", "球队"],
    storyCta: "阅读完整故事",
    erasKicker: "FOUR ERAS",
    erasTitle: "四段生涯，一种进化",
    erasAside: "每一次迁移，都留下新的比赛方式。",
    topKicker: "CAREER TOP 10",
    topTitle: ["定义传奇的", "十个瞬间"],
    topAside: "编辑精选 · 按时间与影响力编排",
    sourceLabel: "查看来源",
    play: "点击播放",
    playing: "视频在当前页面播放",
    openVideo: "打开视频来源",
    videoUnavailable: "视频无法嵌入，请使用来源页面观看。",
    back: "返回封面",
    imageCredit: "图片来源见素材说明",
    motionLabel: "CAREER IN MOTION",
    motionTitle: "不同阶段，同一套意志",
    motionItems: ["力量", "视野", "控制", "持久"],
    legacyKicker: "LEGACY",
    legacyTitle: ["超越比赛", "工作仍在继续"],
    legacyBody: "真正的影响力，不只停留在终场哨响之后。它回到家乡，进入学校，也进入下一代的选择。",
    legacyCta: "了解场外影响",
    footerLine: "不同城市，同一条主线。",
    footerAria: "勒布朗·詹姆斯页面页脚",
  },
  en: {
    nav: ["THE STORY", "FOUR ERAS", "TOP 10", "LEGACY"],
    wordmark: "LeBron James archive",
    heroTitle: ["LEBRON", "JAMES"],
    heroTagline: "FROM AKRON TO HISTORY",
    heroLine: "FOUR CITIES. ONE THROUGHLINE.",
    heroCta: "EXPLORE THE JOURNEY",
    scroll: "SCROLL",
    skip: "Skip to story content",
    statsLabel: "Career honors",
    storyKicker: "THE STORY",
    storyTitle: ["FROM HOMETOWN", "TO HISTORY"],
    storyCaption: "Archive image · Cleveland, 2008",
    story: [
      "LeBron James was born in Akron, Ohio, on December 30, 1984. The game began on neighborhood courts and became a professional route through four cities.",
      "He entered the NBA as the first overall pick in 2003. Cleveland, Miami, Cleveland again, then Los Angeles: each chapter expanded the idea of what a complete basketball player could be.",
    ],
    facts: ["Born", "Hometown", "Draft", "Position", "Teams"],
    storyCta: "READ THE FULL STORY",
    erasKicker: "FOUR ERAS",
    erasTitle: "Four eras. One evolution.",
    erasAside: "Every move left behind a new way to play.",
    topKicker: "CAREER TOP 10",
    topTitle: ["TEN MOMENTS", "THAT DEFINED A KING"],
    topAside: "Editor's picks · ordered by time and impact",
    sourceLabel: "VIEW SOURCE",
    play: "PLAY IN PAGE",
    playing: "Playing in this page",
    openVideo: "OPEN VIDEO SOURCE",
    videoUnavailable: "This video could not be embedded. Use the source page to watch.",
    back: "BACK TO POSTER",
    imageCredit: "Image credits in the asset notes",
    motionLabel: "CAREER IN MOTION",
    motionTitle: "Different stages. Same will.",
    motionItems: ["POWER", "VISION", "CONTROL", "LONGEVITY"],
    legacyKicker: "LEGACY",
    legacyTitle: ["BEYOND", "THE GAME"],
    legacyBody:
      "Impact does not stop at the final whistle. It returns home, enters classrooms, and changes the choices available to the next generation.",
    legacyCta: "EXPLORE THE IMPACT",
    footerLine: "Different cities. Same throughline.",
    footerAria: "LeBron James page footer",
  },
} as const;

export const lebronStats = [
  { value: "4×", en: "NBA CHAMPION", zh: "NBA 总冠军" },
  { value: "4×", en: "NBA MVP", zh: "常规赛 MVP" },
  { value: "4×", en: "FINALS MVP", zh: "总决赛 MVP" },
  { value: "1ST", en: "ALL-TIME SCORING", zh: "历史总得分第一" },
  { value: "23 / 6", en: "UNIFORM NUMBERS", zh: "标志号码" },
];

export const lebronTimeline = [
  {
    year: "2003",
    label: { en: "THE BEGINNING", zh: "初入联盟" },
    text: {
      en: "Cleveland makes the hometown prospect the first pick in the draft.",
      zh: "克利夫兰用状元签选中这位来自阿克伦的天才。",
    },
    image: "cavaliers-2008-alt.jpg",
  },
  {
    year: "2007",
    label: { en: "FIRST FINALS", zh: "首次总决赛" },
    text: {
      en: "A young Cleveland team reaches the Finals for the first time.",
      zh: "年轻的克利夫兰第一次站上总决赛舞台。",
    },
    image: "cavaliers-2008.jpg",
  },
  {
    year: "2010",
    label: { en: "A NEW STAGE", zh: "新的舞台" },
    text: {
      en: "Miami becomes the laboratory for a more complete game.",
      zh: "迈阿密成为更完整比赛方式的试验场。",
    },
    image: "heat-2012-alt.jpg",
  },
  {
    year: "2012",
    label: { en: "FIRST CROWN", zh: "首座冠军" },
    text: {
      en: "The first championship arrives in Miami, with a Finals MVP performance.",
      zh: "在迈阿密赢得第一座总冠军，并获得总决赛 MVP。",
    },
    image: "heat-2012.jpg",
  },
  {
    year: "2014",
    label: { en: "THE HOMECOMING", zh: "回到克利夫兰" },
    text: {
      en: "He returns to Ohio with a promise still unfinished.",
      zh: "带着尚未完成的承诺回到俄亥俄。",
    },
    image: "cavaliers-2014.jpg",
  },
  {
    year: "2016",
    label: { en: "THE PROMISE KEPT", zh: "兑现承诺" },
    text: {
      en: "Cleveland overturns a 1–3 deficit and wins its first NBA title.",
      zh: "克利夫兰从 1 比 3 落后完成逆转，赢得队史首冠。",
    },
    image: "parade-2016.jpg",
  },
  {
    year: "2018",
    label: { en: "A NEW STAGE", zh: "洛杉矶新章" },
    text: {
      en: "Los Angeles becomes the next chapter in a career without a fixed shape.",
      zh: "洛杉矶开启一段不被单一位置定义的新篇章。",
    },
    image: "lakers.jpg",
  },
  {
    year: "2020",
    label: { en: "FOURTH CROWN", zh: "第四座冠军" },
    text: {
      en: "A fourth championship arrives with the Lakers in the Orlando bubble.",
      zh: "在奥兰多赛区赢得湖人生涯的第一座总冠军。",
    },
    image: "video-2020.jpg",
  },
  {
    year: "2023",
    label: { en: "THE RECORD FALLS", zh: "纪录被改写" },
    text: {
      en: "He becomes the NBA's all-time leading scorer.",
      zh: "成为 NBA 历史总得分第一人。",
    },
    image: "lakers-2022.jpg",
  },
  {
    year: "2024",
    label: { en: "PARIS GOLD", zh: "巴黎金牌" },
    text: {
      en: "Team USA wins Olympic gold in Paris, adding another international chapter.",
      zh: "率领美国队在巴黎赢得奥运金牌，为生涯增加国际篇章。",
    },
    image: "video-paris.jpg",
  },
];

export const lebronMoments: LebronMoment[] = [
  {
    rank: 1,
    year: "2016",
    date: "JUN 19, 2016",
    title: { en: "THE PROMISE KEPT", zh: "兑现承诺" },
    subtitle: { en: "FINALS · GAME 7", zh: "总决赛 · 第七场" },
    description: {
      en: "Down 1–3, Cleveland wins three straight to claim its first NBA championship. The comeback closes a 52-year wait for a major professional sports title in the city.",
      zh: "1 比 3 落后时，克利夫兰连赢三场，拿下队史首座 NBA 总冠军，也结束这座城市长达 52 年的顶级职业体育冠军等待。",
    },
    stat: { en: "1–3 → 4–3", zh: "1 比 3 → 4 比 3" },
    mediaType: "bilibili",
    media: "BV1WUL96PERL",
    source: "https://www.bilibili.com/video/BV1WUL96PERL/",
    variant: "dark",
  },
  {
    rank: 2,
    year: "2023",
    date: "FEB 7, 2023",
    title: { en: "THE RECORD FALLS", zh: "纪录被改写" },
    subtitle: { en: "ALL-TIME SCORING", zh: "历史总得分纪录" },
    description: {
      en: "Against Oklahoma City, James passes Kareem Abdul-Jabbar to become the NBA's all-time leading scorer.",
      zh: "对阵俄克拉荷马城时，詹姆斯超越卡里姆·阿卜杜尔·贾巴尔，成为 NBA 历史总得分第一人。",
    },
    stat: { en: "38 PTS", zh: "38 分" },
    mediaType: "bilibili",
    media: "BV1q34y1T7ex",
    source: "https://www.bilibili.com/video/BV1q34y1T7ex/",
    variant: "light",
  },
  {
    rank: 3,
    year: "2018",
    date: "MAY 31, 2018",
    title: { en: "FIFTY-ONE IN THE FINALS", zh: "总决赛砍下 51 分" },
    subtitle: { en: "GAME 1 · CLEVELAND", zh: "第一场 · 克利夫兰" },
    description: {
      en: "James scores 51 points with 8 rebounds and 8 assists against the defending champions.",
      zh: "面对卫冕冠军，他拿下 51 分、8 个篮板和 8 次助攻。",
    },
    stat: { en: "51 / 8 / 8", zh: "51 / 8 / 8" },
    mediaType: "bilibili",
    media: "BV1wo7V6WE9G",
    source: "https://www.bilibili.com/video/BV1wo7V6WE9G/",
    variant: "dark",
  },
  {
    rank: 4,
    year: "2012",
    date: "JUN 21, 2012",
    title: { en: "THE FIRST CROWN", zh: "第一座王冠" },
    subtitle: { en: "NBA FINALS · MIAMI", zh: "NBA 总决赛 · 迈阿密" },
    description: {
      en: "Miami defeats Oklahoma City in five games. James wins his first championship and Finals MVP.",
      zh: "迈阿密五场击败俄克拉荷马城。詹姆斯赢得第一座总冠军与总决赛 MVP。",
    },
    stat: { en: "4–1", zh: "4 比 1" },
    mediaType: "bilibili",
    media: "BV1HiT568EEQ",
    source: "https://www.bilibili.com/video/BV1HiT568EEQ/",
    variant: "light",
  },
  {
    rank: 5,
    year: "2012",
    date: "JUN 7, 2012",
    title: { en: "GAME 6 IN BOSTON", zh: "波士顿的第六场" },
    subtitle: { en: "EASTERN FINALS", zh: "东部决赛" },
    description: {
      en: "Facing elimination, James delivers 45 points, 15 rebounds, and 5 assists to force a deciding game.",
      zh: "面临淘汰时，他交出 45 分、15 个篮板和 5 次助攻，把系列赛带回决胜场。",
    },
    stat: { en: "45 PTS", zh: "45 分" },
    mediaType: "bilibili",
    media: "BV1v44y1n7br",
    source: "https://www.bilibili.com/video/BV1v44y1n7br/",
    variant: "dark",
  },
  {
    rank: 6,
    year: "2013",
    date: "JUN 20, 2013",
    title: { en: "BACK TO BACK", zh: "连续卫冕" },
    subtitle: { en: "NBA FINALS · GAME 7", zh: "总决赛 · 第七场" },
    description: {
      en: "A second straight championship confirms Miami's two-way standard and James' command of the biggest stage.",
      zh: "连续第二座冠军，确认了迈阿密攻防两端的标准，也证明他对最高舞台的掌控。",
    },
    stat: { en: "2 RINGS", zh: "两座冠军" },
    mediaType: "bilibili",
    media: "BV1sD7o6jEEQ",
    source: "https://www.bilibili.com/video/BV1sD7o6jEEQ/",
    variant: "light",
  },
  {
    rank: 7,
    year: "2007",
    date: "MAY 31, 2007",
    title: { en: "THE FIRST FINALS", zh: "第一次总决赛" },
    subtitle: { en: "CLEVELAND · EASTERN FINALS", zh: "克利夫兰 · 东部决赛" },
    description: {
      en: "At 22, James carries Cleveland to its first NBA Finals appearance.",
      zh: "22 岁时，詹姆斯带领克利夫兰第一次进入 NBA 总决赛。",
    },
    stat: { en: "22 YEARS", zh: "22 岁" },
    mediaType: "bilibili",
    media: "BV1WxME62EvF",
    source: "https://www.bilibili.com/video/BV1WxME62EvF/",
    variant: "dark",
  },
  {
    rank: 8,
    year: "2020",
    date: "SEP 26, 2020",
    title: { en: "FOURTH CROWN", zh: "第四座王冠" },
    subtitle: { en: "LAKERS · WESTERN FINALS", zh: "湖人 · 西部决赛" },
    description: {
      en: "A triple-double sends Los Angeles to the Finals, where the Lakers finish the season with a fourth title.",
      zh: "一场三双帮助洛杉矶进入总决赛，湖人最终赢得队史第四座总冠军。",
    },
    stat: { en: "4TH RING", zh: "第四座冠军" },
    mediaType: "bilibili",
    media: "BV11dKo6XEty",
    source: "https://www.bilibili.com/video/BV11dKo6XEty/",
    variant: "light",
  },
  {
    rank: 9,
    year: "2016",
    date: "JUN 22, 2016",
    title: { en: "THE HOMECOMING", zh: "家乡冠军" },
    subtitle: { en: "CLEVELAND PARADE", zh: "克利夫兰冠军巡游" },
    description: {
      en: "The parade through downtown Cleveland turns a basketball result into a shared civic memory.",
      zh: "穿过克利夫兰市中心的冠军巡游，让一场篮球胜利成为整座城市共同的记忆。",
    },
    stat: { en: "52 YEARS", zh: "52 年等待" },
    mediaType: "bilibili",
    media: "BV15Qjk6xEqS",
    source: "https://www.bilibili.com/video/BV15Qjk6xEqS/",
    variant: "dark",
  },
  {
    rank: 10,
    year: "2024",
    date: "AUG 10, 2024",
    title: { en: "PARIS GOLD", zh: "巴黎金牌" },
    subtitle: { en: "OLYMPIC GOLD-MEDAL GAME", zh: "奥运金牌赛" },
    description: {
      en: "Team USA defeats France in Paris, adding another international chapter to James' career.",
      zh: "美国队在巴黎击败法国队，为詹姆斯的生涯增加又一段国际篇章。",
    },
    stat: { en: "GOLD", zh: "金牌" },
    mediaType: "bilibili",
    media: "BV15W42197Ce",
    source: "https://www.bilibili.com/video/BV15W42197Ce/",
    variant: "light",
  },
];

export const lebronSources = {
  bio: "https://www.nba.com/player/2544/lebron-james",
  scoring: "https://www.nba.com/news/lebron-james-all-time-leading-scorer",
  olympics: "https://www.usab.com/players/lebron-james",
};
