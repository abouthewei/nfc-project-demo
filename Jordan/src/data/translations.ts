import type { Locale } from "../i18n";

export const curryCopy: Record<
  Locale,
  {
    skip: string;
    nav: string[];
    heroEyebrow: string;
    heroName: string;
    present: string;
    scroll: string;
    statLabels: string[];
    storyOverline: string;
    storyTitle: string[];
    story: string[];
    facts: string[];
    photoCaption: string;
    careerEyebrow: string;
    careerTitle: string[];
    careerRange: string;
    topEyebrow: string;
    topTitle: string[];
    editorial: string;
    legacyEyebrow: string;
    legacyTitle: string[];
    legacyText: string;
    footer: string;
    sources: string;
    sourceLinks: string[];
  }
> = {
  zh: {
    skip: "跳至正文",
    nav: ["故事", "生涯", "TOP 10", "传承"],
    heroEyebrow: "三分革命",
    heroName: "斯蒂芬 · 库里",
    present: "至今",
    scroll: "滚动",
    statLabels: ["NBA 总冠军", "常规赛 MVP", "总决赛 MVP", "单季三分 · 2015—16", "球衣号码"],
    storyOverline: "出手背后的故事",
    storyTitle: ["射程，是", "一种语言。"],
    story: [
      "1988 年出生于阿克伦，在夏洛特长大。库里没有沿着传统篮球天才的模板前进：大学阶段，他把戴维森带进全国舞台；进入 NBA 后，他用持续移动、无球跑动与近乎反复训练般的出手，重写了空间的意义。",
      "自 2009 年加入金州勇士起，他成为一支王朝的引擎。四座总冠军、两座常规赛 MVP 与 2022 年总决赛 MVP，记录着荣誉；更深的变化在于，每一次越过三分线的威胁，都迫使比赛重新计算距离。",
    ],
    facts: ["出生", "球队", "位置"],
    photoCaption: "弧线成为他的签名。",
    careerEyebrow: "生涯时间轴",
    careerTitle: ["出手", "穿越全场。"],
    careerRange: "2009—至今",
    topEyebrow: "生涯 TOP 10",
    topTitle: ["10 个瞬间", "改变了", "射程。"],
    editorial: "编辑精选 · 非官方排名",
    legacyEyebrow: "传承",
    legacyTitle: ["重新定义了", "篮球的", "几何。"],
    legacyText: "不是把三分变成一次选择，而是让整座球场都有了新的半径。",
    footer: "独立球员纪念专题 · 与 NBA、勇士队及库里品牌无隶属关系",
    sources: "资料来源与图片署名",
    sourceLinks: ["NBA 球员档案", "2022 总决赛 G4", "2016 雷霆绝杀回顾"],
  },
  en: {
    skip: "Skip to content",
    nav: ["STORY", "JOURNEY", "TOP 10", "LEGACY"],
    heroEyebrow: "THE THREE-POINT REVOLUTION",
    heroName: "STEPHEN · CURRY",
    present: "PRESENT",
    scroll: "SCROLL",
    statLabels: ["NBA CHAMPION", "NBA MVP", "FINALS MVP", "THREES · 2015—16", "UNIFORM NUMBER"],
    storyOverline: "THE STORY BEHIND THE SHOT",
    storyTitle: ["RANGE IS", "A LANGUAGE."],
    story: [
      "Born in Akron in 1988 and raised in Charlotte, Curry never followed the traditional template for a basketball prodigy. At Davidson he carried a small college onto the national stage; in the NBA, constant movement and obsessive repetition rewrote the meaning of space.",
      "Since joining Golden State in 2009, he has been the engine of a dynasty. Four championships, two MVP awards and the 2022 Finals MVP mark the honors; the deeper change is that every threat beyond the arc makes the game recalculate distance.",
    ],
    facts: ["BORN", "TEAM", "POSITION"],
    photoCaption: "THE ARC BECAME HIS SIGNATURE.",
    careerEyebrow: "CAREER TIMELINE",
    careerTitle: ["THE SHOT", "TRAVELED."],
    careerRange: "2009—PRESENT",
    topEyebrow: "CAREER TOP 10",
    topTitle: ["10 MOMENTS", "THAT CHANGED", "THE RANGE."],
    editorial: "EDITOR'S PICKS · UNOFFICIAL ORDER",
    legacyEyebrow: "THE LEGACY",
    legacyTitle: ["CHANGED THE", "GEOMETRY OF", "BASKETBALL."],
    legacyText: "He did not make the three a choice; he gave the whole court a new radius.",
    footer: "AN INDEPENDENT CAREER TRIBUTE · NOT AFFILIATED WITH THE NBA, WARRIORS OR CURRY BRAND",
    sources: "Sources & image credits",
    sourceLinks: ["NBA player profile", "2022 Finals Game 4", "2016 Thunder game recap"],
  },
};

export const curryTimelineCopy: Record<Locale, Array<[string, string, string]>> = {
  zh: [
    ["2009", "起点", "第七顺位被勇士选中。"],
    ["2013", "纽约，54 分", "麦迪逊广场花园的 54 分让全联盟记住他的名字。"],
    ["2015", "第一枚戒指", "赢得首冠和常规赛 MVP。"],
    ["2016", "全票 MVP", "全票 MVP，单季 402 记三分。"],
    ["2017", "新的王朝", "连续第二座冠军，勇士的进攻改变了联盟。"],
    ["2018", "背靠背", "第三座冠军。"],
    ["2022", "总决赛回应", "第四冠与首座总决赛 MVP。"],
    ["2024", "巴黎金牌", "奥运决赛关键连中三分，赢得金牌。"],
  ],
  en: [
    ["2009", "THE BEGINNING", "Selected seventh by Golden State."],
    ["2013", "NEW YORK, 54", "A 54-point night at Madison Square Garden announced his name."],
    ["2015", "FIRST RING", "The first title and his first regular-season MVP."],
    ["2016", "THE UNANIMOUS", "A unanimous MVP and 402 threes in one season."],
    ["2017", "A NEW DYNASTY", "A second straight title as the Warriors changed offense."],
    ["2018", "BACK TO BACK", "Championship number three."],
    ["2022", "THE FINALS ANSWER", "A fourth title and his first Finals MVP."],
    ["2024", "GOLD IN PARIS", "A run of clutch threes delivered Olympic gold."],
  ],
};

export const curryMomentCopy: Record<
  Locale,
  Record<number, { title: string; sub: string; text: string; link: string }>
> = {
  zh: {
    1: {
      title: "波士顿 43 分",
      sub: "NBA 总决赛 · G4",
      text: "总决赛 1 比 2 落后的夜晚，库里交出 43 分、10 篮板和 7 记三分。勇士以 107 比 97 取胜，把系列赛扳成 2 比 2。",
      link: "比赛资料",
    },
    2: {
      title: "最后一块拼图",
      sub: "总冠军 · 总决赛 MVP",
      text: "第六场拿下 34 分后，库里得到第一座总决赛 MVP。第四冠是漫长体系在最高舞台上的回应。",
      link: "比赛资料",
    },
    3: {
      title: "连续两记三分",
      sub: "对阵俄克拉荷马城",
      text: "加时赛最后，库里在超远距离出手命中，勇士以 121 比 118 险胜雷霆。这记球成了射程被重新定义的标志。",
      link: "比赛资料",
    },
    4: {
      title: "纪录被改写",
      sub: "历史三分王",
      text: "在麦迪逊广场花园，库里投进生涯第 2,974 记三分，超越雷·阿伦。",
      link: "比赛资料",
    },
    5: {
      title: "全票 MVP",
      sub: "常规赛最有价值球员",
      text: "全票当选常规赛 MVP，至今仍是该奖项历史上唯一的一次全票。",
      link: "比赛资料",
    },
    6: {
      title: "四百零二记",
      sub: "单季三分命中数",
      text: "2015—16 赛季，他投进 402 记三分，第一次越过单季 400 的门槛。",
      link: "比赛资料",
    },
    7: {
      title: "第一枚戒指",
      sub: "勇士对骑士",
      text: "六场总决赛后，勇士结束长达 40 年的冠军等待。一个新的时代从这里起步。",
      link: "比赛资料",
    },
    8: {
      title: "纽约，54 分",
      sub: "麦迪逊广场花园",
      text: "面对尼克斯得到 54 分，年轻的库里把花园球馆变成了射程展示厅。",
      link: "比赛资料",
    },
    9: {
      title: "第三座冠军",
      sub: "连续两年夺冠",
      text: "勇士将速度、传导与外线威胁推向新的高度。",
      link: "比赛资料",
    },
    10: {
      title: "巴黎第四节",
      sub: "奥运男篮决赛",
      text: "决赛第四节，库里连续命中高难度三分，帮助美国队赢得巴黎奥运金牌。",
      link: "比赛资料",
    },
  },
  en: Object.fromEntries(
    [
      [
        1,
        [
          "FORTY-THREE IN BOSTON",
          "NBA FINALS · GAME 4",
          "Down 1–2 in the Finals, Curry scored 43 with 10 rebounds and seven threes to tie the series.",
        ],
      ],
      [
        2,
        [
          "THE LAST PIECE",
          "CHAMPIONSHIP · FINALS MVP",
          "Thirty-four points in Game 6 brought Curry his first Finals MVP and a fourth title.",
        ],
      ],
      [
        3,
        [
          "BANG. BANG.",
          "VS OKLAHOMA CITY",
          "A deep overtime winner in 2016 made range feel limitless.",
        ],
      ],
      [
        4,
        [
          "THE RECORD FALLS",
          "ALL-TIME THREE-POINT LEADER",
          "At Madison Square Garden, Curry passed Ray Allen with his 2,974th three.",
        ],
      ],
      [
        5,
        [
          "UNANIMOUS",
          "NBA MOST VALUABLE PLAYER",
          "He became the only unanimous regular-season MVP in league history.",
        ],
      ],
      [
        6,
        [
          "FOUR HUNDRED TWO",
          "THREES IN ONE SEASON",
          "The 2015–16 season crossed the 400-three threshold for the first time.",
        ],
      ],
      [
        7,
        [
          "THE FIRST RING",
          "WARRIORS VS CAVALIERS",
          "Golden State ended a 40-year title wait in six Finals games.",
        ],
      ],
      [
        8,
        [
          "NEW YORK, 54",
          "MADISON SQUARE GARDEN",
          "A 54-point night turned the Garden into a showcase for his range.",
        ],
      ],
      [
        9,
        [
          "THE THIRD TITLE",
          "BACK-TO-BACK CHAMPIONS",
          "Speed, passing and perimeter threat reached a new level.",
        ],
      ],
      [
        10,
        [
          "FOURTH QUARTER, PARIS",
          "OLYMPIC GOLD-MEDAL GAME",
          "A string of difficult fourth-quarter threes delivered Olympic gold.",
        ],
      ],
    ].map((item) => {
      const rank = item[0] as number;
      const values = item[1] as string[];
      return [rank, { title: values[0], sub: values[1], text: values[2], link: "ARCHIVAL NOTE" }];
    }),
  ) as Record<number, { title: string; sub: string; text: string; link: string }>,
};

export const jordanCopy: Record<
  Locale,
  {
    skip: string;
    nav: string[];
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    team: string;
    statHead: string[];
    statSmall: string[];
    storyOverline: string;
    storyTitle: string[];
    story: string[];
    facts: string[];
    careerHead: string;
    careerAside: string;
    topHead: string;
    editorial: string;
    legacyEyebrow: string;
    legacyTitle: string[];
    legacyText: string;
    footer: string;
    sources: string;
    link: string;
  }
> = {
  zh: {
    skip: "跳至正文",
    nav: ["塑造", "时间轴", "档案", "标准"],
    heroEyebrow: "卓越的定义",
    heroTitle: "迈克尔·乔丹",
    heroSubtitle: "飞人",
    team: "芝加哥公牛 · 后卫",
    statHead: ["一段生涯", "用数字写成"],
    statSmall: ["六座冠军。", "无数瞬间。"],
    storyOverline: "传奇如何被塑造",
    storyTitle: ["竞争", "成为了", "技艺。"],
    story: [
      "1963 年，迈克尔·乔丹出生于纽约布鲁克林，在北卡罗来纳州威明顿长大。北卡大学的绝杀让他走进全国视野，1984 年选秀后，芝加哥成为他把天赋变成统治力的地方。",
      "他把进攻的速度、滞空与脚步推向新的高度，也把竞争变成一套可被看见的标准。六座总冠军、五座 MVP、六座总决赛 MVP 之外，是一位运动员如何让篮球成为全球文化语言的过程。",
    ],
    facts: ["出生", "NBA", "位置"],
    careerHead: "伟大的时间轴",
    careerAside: "定义传奇生涯的关键时刻。",
    topHead: "传奇档案。",
    editorial: "编辑精选 · 非官方排名",
    legacyEyebrow: "传承",
    legacyTitle: ["成为了", "标准。"],
    legacyText: "冠军、竞争与全球影响力，让后来的每一位伟大球员都绕不开这把尺。",
    footer: "一段卓越生涯。一份永远延续的传承。",
    sources: "资料来源与图片署名",
    link: "档案注释",
  },
  en: {
    skip: "Skip to content",
    nav: ["THE MAKING", "TIMELINE", "ARCHIVE", "STANDARD"],
    heroEyebrow: "THE DEFINITION OF EXCELLENCE",
    heroTitle: "MICHAEL JORDAN",
    heroSubtitle: "HIS AIRNESS",
    team: "CHICAGO BULLS · GUARD",
    statHead: ["A CAREER", "BY THE NUMBERS"],
    statSmall: ["SIX CHAMPIONSHIPS.", "COUNTLESS MOMENTS."],
    storyOverline: "THE MAKING OF A LEGEND",
    storyTitle: ["COMPETITION", "BECAME THE", "CRAFT."],
    story: [
      "Born in Brooklyn in 1963 and raised in Wilmington, North Carolina, Jordan's college game-winner put him in the national spotlight. After the 1984 draft, Chicago became the place where talent became dominance.",
      "He pushed speed, hang time and footwork to new heights, turning competition into a visible standard. Beyond six titles, five MVPs and six Finals MVPs is the story of an athlete who made basketball a global language.",
    ],
    facts: ["BORN", "NBA", "POSITION"],
    careerHead: "A TIMELINE OF GREATNESS",
    careerAside: "DEFINING MOMENTS THAT SHAPED A LEGENDARY CAREER.",
    topHead: "THE ARCHIVE OF A LEGEND.",
    editorial: "EDITOR'S PICKS · UNOFFICIAL ORDER",
    legacyEyebrow: "THE LEGACY",
    legacyTitle: ["BECAME THE", "STANDARD."],
    legacyText:
      "Championships, competition and global influence made him the measure every great player had to face.",
    footer: "A CAREER OF EXCELLENCE. A LEGACY THAT LIVES FOREVER.",
    sources: "Sources & image credits",
    link: "ARCHIVAL NOTE",
  },
};

export const jordanTimelineCopy: Record<Locale, Array<[string, string, string]>> = {
  zh: [
    ["1984", "进入 NBA", "以第三顺位开启职业生涯。"],
    ["1986", "六十三分", "季后赛对凯尔特人得到 63 分。"],
    ["1991", "第一枚戒指", "首冠与首座总决赛 MVP。"],
    ["1993", "三连冠", "完成第一个三连冠。"],
    ["1995", "我回来了", "重返芝加哥。"],
    ["1996", "72—10", "历史级常规赛与第四冠。"],
    ["1997", "流感之战", "总决赛第五场带病砍下 38 分。"],
    ["1998", "最后一投", "第六冠的最后一击。"],
  ],
  en: [
    ["1984", "ENTERED THE NBA", "The third pick began his professional career."],
    ["1986", "SIXTY-THREE", "A playoff record against Boston in only his second season."],
    ["1991", "FIRST RING", "A first title and first Finals MVP."],
    ["1993", "THREE-PEAT", "The first three-peat was complete."],
    ["1995", "I'M BACK", "A return to Chicago."],
    ["1996", "72—10", "A historic regular season and a fourth title."],
    ["1997", "THE FLU GAME", "38 points through illness in Game 5."],
    ["1998", "THE LAST SHOT", "The final shot of a sixth championship."],
  ],
};

export const jordanMomentCopy: Record<
  Locale,
  Record<number, { title: string; sub: string; text: string }>
> = {
  zh: Object.fromEntries(
    [
      [1, "最后一投", "总决赛 · G6", "终场前 5.2 秒，乔丹面对爵士投进反超中投，锁定第六冠。"],
      [2, "流感之战", "总决赛 · G5", "高烧与脱水中得到 38 分，公牛拿下关键胜利。"],
      [3, "THE SHOT", "对阵克利夫兰 · G5", "首轮决胜时刻，骑士主场的压哨球成为最早的经典之一。"],
      [4, "六十三分", "季后赛对阵波士顿", "二年级的乔丹在加时赛轰下 63 分，提前预告他将进入历史。"],
      [5, "换手上篮", "总决赛 · G2", "空中换手上篮，是身体控制与想象力的缩影。"],
      [6, "耸肩", "总决赛 · G1", "上半场六记三分后的耸肩，成为比赛失去常理时最从容的注脚。"],
      [7, "飞行学校", "扣篮大赛", "芝加哥的扣篮大赛，让 Air Jordan 从绰号变成篮球想象。"],
      [8, "双五十五", "麦迪逊广场花园", "复出后的第四场，45 号乔丹得到 55 分。"],
      [9, "父亲节", "总决赛 · G6", "经历父亲离世与棒球生涯后，乔丹率公牛重返冠军之巅。"],
      [10, "第一个三连冠", "公牛对太阳", "连续第三座冠军确立了第一个公牛王朝。"],
    ].map(([rank, title, sub, text]) => [rank, { title, sub, text }]),
  ) as Record<number, { title: string; sub: string; text: string }>,
  en: Object.fromEntries(
    [
      [
        1,
        "THE LAST SHOT",
        "NBA FINALS · GAME 6",
        "With 5.2 seconds left, Jordan hit the go-ahead jumper for a sixth title.",
      ],
      [
        2,
        "THE FLU GAME",
        "NBA FINALS · GAME 5",
        "Through fever and dehydration he scored 38, taking a pivotal road win.",
      ],
      [
        3,
        "THE SHOT",
        "VS CLEVELAND · GAME 5",
        "A buzzer-beater over Cleveland became one of the first defining classics.",
      ],
      [
        4,
        "SIXTY-THREE",
        "PLAYOFFS VS BOSTON",
        "A 63-point overtime masterpiece announced what was coming.",
      ],
      [
        5,
        "THE SWITCH-HAND",
        "NBA FINALS · GAME 2",
        "A midair switch-hand finish distilled control and imagination.",
      ],
      [
        6,
        "THE SHRUG",
        "NBA FINALS · GAME 1",
        "Six first-half threes and a shrug made the impossible look calm.",
      ],
      [
        7,
        "FLIGHT SCHOOL",
        "SLAM DUNK CONTEST",
        "Chicago made Air Jordan a whole basketball imagination.",
      ],
      [
        8,
        "DOUBLE NICKEL",
        "MADISON SQUARE GARDEN",
        "In his fourth game back, Jordan scored 55 in number 45.",
      ],
      [
        9,
        "FATHER'S DAY",
        "CHAMPIONSHIP · GAME 6",
        "After loss and baseball, Jordan brought Chicago back to the summit.",
      ],
      [
        10,
        "THE FIRST THREE-PEAT",
        "BULLS VS SUNS",
        "A third straight title established the first Bulls dynasty.",
      ],
    ].map(([rank, title, sub, text]) => [rank, { title, sub, text }]),
  ) as Record<number, { title: string; sub: string; text: string }>,
};

export const kobeCopy: Record<Locale, any> = {
  zh: {
    skip: "跳至正文",
    wordmark: "科比首页",
    close: "关闭导航",
    open: "打开导航",
    nav: ["故事", "生涯", "TOP 10", "传承"],
    heroEyebrow: "黑曼巴",
    heroChinese: "科比 · 布莱恩特",
    heroLine: ["20 年，同一支球队。", "一份未完的传承。"],
    explore: "探索这份传承",
    scroll: "向下浏览生涯时间轴",
    storyEyebrow: "故事",
    storyTitle: ["不止于", "比赛。"],
    storyCaption: "球员。追求。一个人。",
    story: [
      "1978 年 8 月 23 日，科比·布莱恩特出生于费城，童年随家人在意大利生活。篮球把两个世界连在一起，也成为他最早认定的方向。1996 年，高中毕业的他参加 NBA 选秀，经交易加盟洛杉矶湖人。",
      "从 8 号到 24 号，二十年只穿过一支 NBA 球队的球衣。他与奥尼尔赢得三连冠，又与加索尔并肩拿下两座冠军；五次总冠军、2008 年常规赛 MVP、两次总决赛 MVP，记录着一段不断重塑自己的生涯。",
      "但科比的影响从未止于奖杯。脚步、后仰、关键时刻的出手，以及对训练细节的执着，让一代球迷学会如何理解竞争。曼巴精神，是在下一次走进球馆时，依然愿意从基本功开始。",
    ],
    facts: ["出生", "家乡", "球队", "位置"],
    careerEyebrow: "生涯时间轴",
    careerTitle: ["练出来的。", "不是被给予的。"],
    careerAside: ["二十年。", "每一章都靠自己赢得。"],
    topEyebrow: "定义传奇的瞬间",
    topTitle: ["生涯", "TOP 10"],
    topAside: ["十个瞬间，重温传奇。", "编辑精选 · 非官方排名"],
    legacyEyebrow: "传承",
    legacyTitle: ["曼巴", "精神。"],
    legacyStatement: "把每一天，练成下一次超越。",
    legacyCopy: [
      "专注于当下的每一次训练，打磨每一个细节。",
      "在反复中积累，在挑战中成长。",
      "属于科比的比赛已落幕，对卓越的追求仍在继续。",
    ],
    backTop: "回到顶部",
    footerTag: ["独立球迷纪念专题 · 与 NBA、湖人队及科比品牌无隶属关系"],
    credits: "内容来源与图片署名",
    archive: "比赛档案",
  },
  en: {
    skip: "Skip to content",
    wordmark: "Kobe home",
    close: "Close navigation",
    open: "Open navigation",
    nav: ["THE STORY", "CAREER", "TOP 10", "LEGACY"],
    heroEyebrow: "THE BLACK MAMBA",
    heroChinese: "KOBE · BRYANT",
    heroLine: ["20 YEARS. ONE TEAM.", "AN ENDLESS LEGACY."],
    explore: "EXPLORE THE LEGACY",
    scroll: "Browse the career timeline",
    storyEyebrow: "THE STORY",
    storyTitle: ["MORE THAN", "A GAME."],
    storyCaption: "THE PLAYER. THE PURSUIT. THE PERSON.",
    story: [
      "Born in Philadelphia on August 23, 1978, Kobe Bryant spent part of his childhood in Italy. Basketball connected those two worlds and became his first clear direction. After high school in 1996, a draft-night trade brought him to the Los Angeles Lakers.",
      "From number 8 to 24, he wore one NBA uniform for twenty years. Three titles with Shaquille O'Neal, two more with Pau Gasol, five championships, the 2008 MVP and two Finals MVPs mark a career that kept remaking itself.",
      "His influence never stopped at trophies. Footwork, the fadeaway, late-game shots and an obsession with detail taught a generation how to understand competition. Mamba mentality is the willingness to start with fundamentals the next time you enter the gym.",
    ],
    facts: ["BORN", "HOMETOWN", "TEAM", "POSITION"],
    careerEyebrow: "CAREER TIMELINE",
    careerTitle: ["BUILT.", "NOT GIVEN."],
    careerAside: ["Twenty years.", "Every chapter earned."],
    topEyebrow: "THE DEFINING MOMENTS",
    topTitle: ["CAREER", "TOP 10"],
    topAside: ["10 MOMENTS", "THAT DEFINED A LEGEND."],
    legacyEyebrow: "THE LEGACY",
    legacyTitle: ["MAMBA", "MENTALITY."],
    legacyStatement: "Turn every day into the next breakthrough.",
    legacyCopy: [
      "Focus on the next repetition and sharpen every detail.",
      "Build through repetition. Grow through challenge.",
      "The games ended; the pursuit of excellence continues.",
    ],
    backTop: "BACK TO TOP",
    footerTag: [
      "AN INDEPENDENT TRIBUTE. FOREVER A LAKER.",
      "Independent fan tribute · not affiliated with the NBA, Lakers or Kobe brand",
    ],
    credits: "Sources & image credits",
    archive: "GAME ARCHIVE",
  },
};

export const kobeTimelineCopy: Record<Locale, Record<string, { title: string; text: string }>> = {
  zh: Object.fromEntries(
    [
      ["1996", "起点", "高中毕业后进入 NBA，选秀交易让他来到洛杉矶。"],
      ["2000", "第一枚戒指", "与奥尼尔赢得首冠，开启 2000—2002 年三连冠。"],
      ["2006", "八十一分", "对阵猛龙得到 81 分，写下个人单场得分巅峰。"],
      ["2008", "最有价值", "荣膺常规赛 MVP，同年随美国队夺得奥运金牌。"],
      ["2009", "自己的篇章", "第四座总冠军，第一次捧起总决赛 MVP 奖杯。"],
      ["2010", "背靠背", "抢七击败凯尔特人，完成两连冠与第五冠。"],
      ["2016", "最后一场秀", "告别战轰下 60 分，结束 20 年湖人生涯。"],
      ["2020", "永远铭刻", "入选 2020 届名人堂；入堂仪式于 2021 年举行。"],
    ].map(([year, title, text]) => [year, { title, text }]),
  ) as Record<string, { title: string; text: string }>,
  en: Object.fromEntries(
    [
      [
        "1996",
        "THE BEGINNING",
        "A draft-night trade brought the high-school graduate to Los Angeles.",
      ],
      ["2000", "THE FIRST RING", "A first title with O'Neal began the 2000–02 three-peat."],
      ["2006", "EIGHTY-ONE", "Eighty-one against Toronto became his single-game peak."],
      ["2008", "MOST VALUABLE", "The regular-season MVP and an Olympic gold in the same year."],
      ["2009", "HIS OWN CHAPTER", "A fourth title and his first Finals MVP."],
      ["2010", "BACK-TO-BACK", "A Game 7 over Boston completed a fifth championship."],
      ["2016", "ONE LAST SHOW", "Sixty points in his farewell game closed twenty Laker seasons."],
      ["2020", "FOREVER ENSHRINED", "The Hall of Fame Class of 2020 was inducted in 2021."],
    ].map(([year, title, text]) => [year, { title, text }]),
  ) as Record<string, { title: string; text: string }>,
};

export const kobeMomentCopy: Record<
  Locale,
  Record<
    number,
    { title: string; subtitle: string; description: string; caption: string; statLabel: string }
  >
> = {
  zh: Object.fromEntries(
    [
      [
        1,
        "超越想象的一夜",
        "81 分 · 对阵多伦多猛龙",
        "斯台普斯中心的一夜，科比把得分带到了想象之外。下半场独取 55 分，全场 81 分，带领湖人以 122 比 104 逆转猛龙。",
        "哔哩哔哩 · 81 分集锦",
        "得分",
      ],
      [
        2,
        "最后一舞",
        "60 分 · 对阵犹他爵士",
        "二十年的故事，用最后四节来告别。科比在职业生涯最后一战得到 60 分，带领湖人以 101 比 96 战胜爵士。",
        "哔哩哔哩 · 生涯告别战集锦",
        "最后一战得分",
      ],
      [
        3,
        "无论付出什么",
        "2010 总决赛 · 抢七",
        "投篮失准的夜晚，他用另一种方式争取胜利。23 分、15 个篮板，湖人在防守拉锯中击败凯尔特人。",
        "资料照片：2010 年季后赛",
        "NBA 总冠军",
      ],
      [
        4,
        "自己的篇章",
        "总冠军 · 首座总决赛 MVP",
        "湖人以 4 比 1 击败魔术重返巅峰。科比场均 32.4 分，首次当选总决赛 MVP。",
        "资料照片：2009 年冠军湖人队",
        "2009 总决赛场均得分",
      ],
      [
        5,
        "为这一刻而生",
        "对阵太阳 · 季后赛 G4",
        "常规时间最后上篮追平，加时赛压哨跳投，两次关键出手把悬念变成欢呼。",
        "哔哩哔哩 · NBA 官方双绝杀全记录",
        "剩余秒数",
      ],
      [
        6,
        "三节，六十二分",
        "对阵达拉斯独行侠",
        "只用三节，他就得到 62 分，而独行侠全队只有 61 分。",
        "哔哩哔哩 · 三节 62 分回顾",
        "三节得分",
      ],
      [
        7,
        "最有价值",
        "NBA 常规赛 MVP",
        "科比以场均 28.3 分、6.3 个篮板、5.4 次助攻赢得职业生涯唯一一次常规赛 MVP。",
        "资料照片：2008 年北京奥运会期间",
        "2007—08 NBA 赛季",
      ],
      [
        8,
        "空接的开始",
        "西部决赛 · 抢七",
        "科比突破后把球抛向空中，奥尼尔完成扣篮，为三连冠留下鲜明开场。",
        "资料照片：8 号时期的早期科比",
        "王朝开始",
      ],
      [
        9,
        "三分线之外",
        "12 记三分 · 对阵西雅图",
        "对阵西雅图超音速，科比命中 12 记三分，追平当时的 NBA 单场纪录，也让所有人看到：他的进攻威胁从来不只在中距离。",
        "资料照片：8 号时期的科比",
        "命中三分",
      ],
      [
        10,
        "意志仍在",
        "两次罚球 · 对阵金州勇士",
        "跟腱受伤后，科比命中两次罚球才离场。比分之外，是对比赛全部的投入。",
        "资料照片：科比对阵马辛·戈塔特",
        "罚球。一个难忘的瞬间",
      ],
    ].map(([rank, title, subtitle, description, caption, statLabel]) => [
      rank,
      { title, subtitle, description, caption, statLabel },
    ]),
  ) as Record<
    number,
    { title: string; subtitle: string; description: string; caption: string; statLabel: string }
  >,
  en: Object.fromEntries(
    [
      [
        1,
        "A NIGHT BEYOND BELIEF.",
        "81 POINTS · VS TORONTO RAPTORS",
        "At Staples Center, Kobe took scoring beyond imagination: 55 points after halftime and 81 in a 122–104 comeback.",
        "Bilibili · 81-point highlights",
        "POINTS",
      ],
      [
        2,
        "THE LAST DANCE.",
        "60 POINTS · VS UTAH JAZZ",
        "Twenty years ended in four final quarters. Kobe scored 60 and led the Lakers past Utah, 101–96.",
        "Bilibili · farewell game highlights",
        "POINTS IN HIS FINAL GAME",
      ],
      [
        3,
        "WHATEVER IT TAKES.",
        "2010 NBA FINALS · GAME 7",
        "On a night when the jumper would not fall, he found another way: 23 points and 15 rebounds in a defensive battle.",
        "Archival photo: 2010 playoffs",
        "NBA CHAMPIONSHIPS",
      ],
      [
        4,
        "A CHAPTER OF HIS OWN.",
        "NBA CHAMPION · FIRST FINALS MVP",
        "The Lakers beat Orlando 4–1. Kobe averaged 32.4 points and won his first Finals MVP.",
        "Archival photo: 2009 champion Lakers",
        "POINTS PER GAME · 2009 FINALS",
      ],
      [
        5,
        "BUILT FOR THIS MOMENT.",
        "VS PHOENIX · PLAYOFFS GAME 4",
        "A tying layup at the buzzer, then an overtime jumper: two shots turned suspense into celebration.",
        "Bilibili · NBA official double-clutch recap",
        "SECONDS LEFT",
      ],
      [
        6,
        "THREE QUARTERS. SIXTY-TWO.",
        "VS DALLAS MAVERICKS",
        "In three quarters he scored 62 while Dallas had 61. The fourth quarter never needed him.",
        "Bilibili · 62 in three quarters",
        "POINTS · 3 QUARTERS",
      ],
      [
        7,
        "MOST VALUABLE.",
        "NBA REGULAR-SEASON MVP",
        "A season of 28.3 points, 6.3 rebounds and 5.4 assists brought his only regular-season MVP.",
        "Archival photo: 2008 Olympics",
        "2007—08 NBA SEASON",
      ],
      [
        8,
        "THE LOB. THE BEGINNING.",
        "WESTERN CONFERENCE FINALS · GAME 7",
        "Kobe lifted the ball for O'Neal, an alley-oop that became the opening image of a three-peat.",
        "Archival photo: early number 8 Kobe",
        "A DYNASTY BEGINS",
      ],
      [
        9,
        "BEYOND THE ARC.",
        "12 THREE-POINTERS · VS SEATTLE",
        "Twelve threes against Seattle matched the NBA single-game record at the time and showed that his threat reached beyond midrange.",
        "Archival photo: number 8 Kobe",
        "THREE-POINTERS MADE",
      ],
      [
        10,
        "THE WILL REMAINS.",
        "TWO FREE THROWS · VS GOLDEN STATE",
        "After tearing his Achilles, Kobe made two free throws before leaving. The score was only part of the story.",
        "Archival photo: Kobe vs. Marcin Gortat",
        "FREE THROWS. ONE UNFORGETTABLE MOMENT.",
      ],
    ].map(([rank, title, subtitle, description, caption, statLabel]) => [
      rank,
      { title, subtitle, description, caption, statLabel },
    ]),
  ) as Record<
    number,
    { title: string; subtitle: string; description: string; caption: string; statLabel: string }
  >,
};
