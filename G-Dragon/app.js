/* G-DRAGON — artist archive
 *
 * Layout of this file:
 *   01 CONTENT               every editable string and record
 *   02 HELPERS               small utilities shared by the sections below
 *   03 STATE                 values that change while the visitor browses
 *   04 HERO CAROUSEL         five-frame opening portrait
 *   05 TIMELINE              year rail and one feature panel per year
 *   06 COLLABORATIONS        expandable rows with an inline Bilibili player
 *   07 VISUAL ARCHIVE        gallery grid plus the zoomable detail dialog
 *   08 INLINE VIDEO          poster → player swap used by 05, 06 and 07
 *   09 LANGUAGE AND MENU     data-i18n application and the mobile menu
 *   10 PAGE INIT             event wiring and first render
 *
 * Everything in 01 is plain data: adding a year, a collaboration or a photo
 * means adding one entry there and nothing else.
 */
/* ==========================================================================
   01. CONTENT
   Every editable string and record for the page lives in this section;
   the sections below only render and wire it up.
   ========================================================================== */

// Page copy, one object per language. index.html pulls any key that an element
// names through data-i18n / data-i18n-aria / data-i18n-alt; the renderers below
// read the rest directly. Add a language by adding one more key here.
const copyByLanguage = {
  ko: {
    // Document and header
    title: "G-DRAGON — 아티스트 아카이브",
    skip: "본문으로 건너뛰기",
    homeLabel: "G-DRAGON 홈",
    mainNavLabel: "주요 탐색",
    menuLabel: "메뉴",
    menuOpenLabel: "메뉴 열기",
    menuCloseLabel: "메뉴 닫기",
    languageLabel: "언어 선택",
    navStory: "이야기",
    navWorks: "작품",
    navArchive: "영상",

    // Hero
    heroCarouselLabel: "권지용 아카이브 사진 슬라이드",
    heroPause: "자동 재생 일시정지",
    heroPlay: "자동 재생 시작",
    heroDots: "사진 선택",
    heroIntro: "음악과 이미지, 태도와 변신. 한 사람의 이름이 하나의 장면이 되어온 시간.",
    heroLink: "아카이브 둘러보기",

    // Intro
    storyMarker: "THE PERSONA",
    storyTitle: "이름을 넘어,<br />하나의 언어로.",
    storyLead: "권지용과 G-DRAGON. 두 이름 사이에서 음악은 스타일이 되고, 스타일은 다시 자기표현의 방식이 된다.",
    storyBody: "이 페이지는 한 아티스트의 시간을 음반과 무대, 그리고 변화의 순간으로 엮은 작은 편집 아카이브입니다. 시작부터 현재까지, 각 장면이 다음 장면의 가능성을 열어온 흐름을 따라갑니다.",

    // Timeline
    timelineNavLabel: "연도별 타임라인",
    timelineMarker: "A LIFE IN CHAPTERS",
    timelineTitle: "사운드를 바꾼 시간",
    timelineIntro: "한 해가 하나의 장면이 되고,<br />장면은 다음 시대의 문을 연다.",
    timelineEnd: "다음 장은 아직 쓰이고 있습니다.",
    timelineSourceLabel: "REFERENCE",
    timelineChapter: "CHAPTER",
    timelineAchievement: "CAREER MILESTONE",
    videoThumbnailAlt: "Bilibili 대표 영상 이미지",
    playVideoLabel: "Bilibili 영상 재생",
    videoFrameLabel: "Bilibili 영상",

    // Works
    selectedReleasesLabel: "협업 작품",
    worksMarker: "COLLABORATIONS & FEATURES",
    worksTitle: "함께 만든 장면",
    worksIntro: "유닛과 피처링을 따라가며, 다른 목소리와 만나는 순간을 듣습니다.",
    workVideoAlt: "Bilibili 영상 썸네일",
    listenLink: "Apple Music에서 보기",
    openBilibili: "Bilibili에서 열기",

    // Visual archive
    archiveMarker: "THE VISUAL ARCHIVE",
    archiveTitle: "무대의 잔상",
    archiveIntro: "기록된 순간, 계속 움직이는 이미지.",
    galleryNote: "사진 출처와 확인 가능한 사용 조건은 하단 크레딧에 표시했습니다.",
    galleryOpenLabel: "이미지 상세 보기",
    galleryCloseLabel: "상세 닫기",
    gallerySourceLabel: "사진 원본 및 라이선스",
    galleryDialogKicker: "VISUAL ARCHIVE",
    galleryPrevious: "이전 사진",
    galleryNext: "다음 사진",
    galleryZoomIn: "확대",
    galleryZoomOut: "축소",
    galleryZoomReset: "크기 초기화",
    galleryPlayVideo: "Bilibili에서 M.O.T.T.E 투어 예고편 보기",
    galleryShowPhotos: "사진 모음으로 돌아가기",

    // Closing
    closingLabel: "END OF THIS CHAPTER",
    closingTitle: "계속해서,<br /><em>다르게.</em>",
    closingText: "이 아카이브는 한 사람의 다음 장면을 기다립니다.",
    backToTop: "처음으로",
    backToTopLabel: "맨 위로",

    // Footer
    footerDisclaimer: "독립적으로 제작된 팬 아카이브이며, 아티스트·소속사와 제휴 또는 공식 관계가 없습니다.",
    creditsLabel: "사진 및 영상 출처",
    sourceLabel: "참고 자료",
    videoCredits: "대표 영상은 Bilibili에 게시된 영상으로 재생됩니다. 업로드 출처는 하단 기록에 표시하며, 영상의 권리는 각 권리자에게 있습니다.",
    credit2015: "(2015 영동고속도로 가요제 · 고해상도 크롭)",
    creditHero2020: "(사용자 제공 파일 · 683 × 1,024 px · Getty 대응 사진은 권리 관리 이미지)",
    creditHeroPearl: "(HelloGDkitty · KENH14 게시본 · 동일 사진 1,080 × 1,350 px · 원본 워터마크 유지)",
    creditHeroCar: "(사용자 제공 파일 · 956 × 1,138 px · 가장자리 화면 컨트롤은 구성 크롭으로 제외)",
    creditHeroBiiig: "(사용자 제공 파일 · 710 × 992 px · YG의 BiiiG iii 비주얼과 동일 이미지)",
    credit2014: "(2014 KCON · 색상/크롭 조정)",
    credit2025: "(2025 대한민국 대중문화예술상 · WebP 최적화)",
    credit2012Stage: "(2012 ALIVE WORLD TOUR · 상체 중심 크롭)",
    credit2012Portrait: "(2012 ALIVE WORLD TOUR · 인물 중심 크롭)",
    credit2017Red: "(2017 M.O.T.T.E 시드니 공연 · 색상/크롭 조정)",
    credit2017Screens: "(2017 M.O.T.T.E 시드니 공연 · 흑백/크롭 조정)",
    credit2017Lights: "(2017 M.O.T.T.E 시드니 공연 · 흑백/크롭 조정)",
    credit2017Crowd: "(2017 M.O.T.T.E 시드니 공연 · 흑백/크롭 조정)",
    footerBack: "처음으로 ↑",
  },
  zh: {
    // Document and header
    title: "G-DRAGON — 艺术家档案",
    skip: "跳转至正文",
    homeLabel: "G-DRAGON 首页",
    mainNavLabel: "主导航",
    menuLabel: "菜单",
    menuOpenLabel: "打开菜单",
    menuCloseLabel: "关闭菜单",
    languageLabel: "语言选择",
    navStory: "故事",
    navWorks: "作品",
    navArchive: "影像",

    // Hero
    heroCarouselLabel: "权志龙档案影像轮播",
    heroPause: "暂停自动播放",
    heroPlay: "开始自动播放",
    heroDots: "选择图片",
    heroIntro: "音乐与影像、态度与蜕变。一个名字逐渐成为一个时代切面的过程。",
    heroLink: "进入档案",

    // Intro
    storyMarker: "THE PERSONA",
    storyTitle: "超越名字，<br />成为一种语言。",
    storyLead: "权志龙与 G-DRAGON。在两个名字之间，音乐成为风格，风格又成为表达自我的方式。",
    storyBody: "这是一份小型编辑档案，以唱片、舞台和变化的瞬间串起一位艺术家的时间。从初次登场到今天，每个片段都为下一幕打开新的可能。",

    // Timeline
    timelineNavLabel: "年份时间线",
    timelineMarker: "A LIFE IN CHAPTERS",
    timelineTitle: "改变声音的岁月",
    timelineIntro: "一年成为一个片段，<br />片段又推开下一个时代。",
    timelineEnd: "下一章，仍在书写。",
    timelineSourceLabel: "资料来源",
    timelineChapter: "章节",
    timelineAchievement: "成就与荣誉",
    videoThumbnailAlt: "Bilibili 视频画面",
    playVideoLabel: "播放 Bilibili 视频",
    videoFrameLabel: "Bilibili 视频",

    // Works
    selectedReleasesLabel: "合作作品",
    worksMarker: "COLLABORATIONS & FEATURES",
    worksTitle: "合作与共创",
    worksIntro: "从双人企划到客席合作，看看他的声音如何进入不同作品。",
    workVideoAlt: "Bilibili 视频缩略图",
    listenLink: "在 Apple Music 收听",
    openBilibili: "在 Bilibili 打开",

    // Visual archive
    archiveMarker: "THE VISUAL ARCHIVE",
    archiveTitle: "舞台余像",
    archiveIntro: "被记录的瞬间，仍在流动的影像。",
    galleryNote: "可核验的图片来源与使用条件列于页面底部；未能确认的授权状态会在来源说明中注明。",
    galleryOpenLabel: "查看影像详情",
    galleryCloseLabel: "关闭详情",
    gallerySourceLabel: "原始照片与授权",
    galleryDialogKicker: "影像档案",
    galleryPrevious: "上一张照片",
    galleryNext: "下一张照片",
    galleryZoomIn: "放大照片",
    galleryZoomOut: "缩小照片",
    galleryZoomReset: "恢复原始大小",
    galleryPlayVideo: "播放 Bilibili 上的 M.O.T.T.E 巡演预告",
    galleryShowPhotos: "返回照片集",

    // Closing
    closingLabel: "END OF THIS CHAPTER",
    closingTitle: "继续向前，<br /><em>不断变化。</em>",
    closingText: "这份档案，等待着他的下一幕。",
    backToTop: "回到顶部",
    backToTopLabel: "回到顶部",

    // Footer
    footerDisclaimer: "本页面为独立制作的粉丝档案，与艺人及其经纪公司无官方关联。",
    creditsLabel: "图片与视频来源",
    sourceLabel: "参考资料",
    videoCredits: "页面嵌入 Bilibili 上的对应视频；部分为用户转载或字幕版本。具体上传来源见素材记录，视频权利归各自权利人所有。",
    credit2015: "（2015《无限挑战》永东高速公路歌谣祭 · 高清裁切）",
    creditHero2020: "（用户提供图片 · 683×1024 px · Getty 对应照片为版权管理素材）",
    creditHeroPearl: "（HelloGDkitty · KENH14 同图版本 · 1080×1350 px · 保留原图水印）",
    creditHeroCar: "（用户提供图片 · 956×1138 px · 轮播构图裁切掉查看器边角控件）",
    creditHeroBiiig: "（用户提供图片 · 710×992 px · 与 YG《BiiiG》iii 视觉照相同）",
    credit2014: "（2014 KCON · 调整色彩与裁切）",
    credit2025: "（2025 韩国大众文化艺术奖 · WebP 优化）",
    credit2012Stage: "（2012 ALIVE WORLD TOUR · 上半身构图）",
    credit2012Portrait: "（2012 ALIVE WORLD TOUR · 人像裁切）",
    credit2017Red: "（2017 M.O.T.T.E 悉尼场 · 调整色彩与裁切）",
    credit2017Screens: "（2017 M.O.T.T.E 悉尼场 · 黑白处理与裁切）",
    credit2017Lights: "（2017 M.O.T.T.E 悉尼场 · 黑白处理与裁切）",
    credit2017Crowd: "（2017 M.O.T.T.E 悉尼场 · 黑白处理与裁切）",
    footerBack: "回到顶部 ↑",
  },
  en: {
    // Document and header
    title: "G-DRAGON — Artist Archive",
    skip: "Skip to content",
    homeLabel: "G-DRAGON home",
    mainNavLabel: "Main navigation",
    menuLabel: "MENU",
    menuOpenLabel: "Open menu",
    menuCloseLabel: "Close menu",
    languageLabel: "Language selection",
    navStory: "Story",
    navWorks: "Works",
    navArchive: "Visuals",

    // Hero
    heroCarouselLabel: "Kwon Ji Yong photo carousel",
    heroPause: "Pause autoplay",
    heroPlay: "Start autoplay",
    heroDots: "Choose a photo",
    heroIntro: "Music and image, attitude and reinvention. The years in which one name became its own cultural scene.",
    heroLink: "Explore the archive",

    // Intro
    storyMarker: "THE PERSONA",
    storyTitle: "Beyond a name,<br />a language of his own.",
    storyLead: "Kwon Ji Yong and G-DRAGON. Between the two names, music becomes style, and style becomes a way of speaking for oneself.",
    storyBody: "This compact editorial archive traces an artist through records, stages, and moments of change. From the opening chapter to the present, each scene points toward the possibilities of the next.",

    // Timeline
    timelineNavLabel: "Timeline by year",
    timelineMarker: "A LIFE IN CHAPTERS",
    timelineTitle: "THE YEARS THAT SHAPED THE SOUND",
    timelineIntro: "A year becomes a scene;<br />a scene opens another era.",
    timelineEnd: "The next chapter is still being written.",
    timelineSourceLabel: "SOURCE",
    timelineChapter: "CHAPTER",
    timelineAchievement: "CAREER MILESTONE",
    videoThumbnailAlt: "Bilibili video still",
    playVideoLabel: "Play Bilibili video",
    videoFrameLabel: "Bilibili video",

    // Works
    selectedReleasesLabel: "Selected collaborations",
    worksMarker: "COLLABORATIONS & FEATURES",
    worksTitle: "ACROSS COLLABORATIONS",
    worksIntro: "From unit projects to guest verses, hear his voice meet other worlds.",
    workVideoAlt: "Bilibili video thumbnail",
    listenLink: "Listen on Apple Music",
    openBilibili: "Open on Bilibili",

    // Visual archive
    archiveMarker: "THE VISUAL ARCHIVE",
    archiveTitle: "Afterimages of the stage",
    archiveIntro: "Recorded moments; images still in motion.",
    galleryNote: "Image sources and available license details appear below; unverified permissions are noted in the source record.",
    galleryOpenLabel: "View image details",
    galleryCloseLabel: "Close details",
    gallerySourceLabel: "Original photo and license",
    galleryDialogKicker: "VISUAL ARCHIVE",
    galleryPrevious: "Previous photo",
    galleryNext: "Next photo",
    galleryZoomIn: "Zoom in",
    galleryZoomOut: "Zoom out",
    galleryZoomReset: "Reset zoom",
    galleryPlayVideo: "Play the M.O.T.T.E tour trailer on Bilibili",
    galleryShowPhotos: "Back to photo set",

    // Closing
    closingLabel: "END OF THIS CHAPTER",
    closingTitle: "Onward,<br /><em>otherwise.</em>",
    closingText: "This archive waits for the next scene.",
    backToTop: "Back to top",
    backToTopLabel: "Back to top",

    // Footer
    footerDisclaimer: "An independent fan archive, with no official affiliation with the artist or his agency.",
    creditsLabel: "PHOTO & VIDEO CREDITS",
    sourceLabel: "REFERENCES",
    videoCredits: "Videos play in-page from Bilibili uploads, some of which are reposts or subtitled editions. Upload sources are documented separately; rights remain with their owners.",
    credit2015: "(2015 Yeongdong Expressway Music Festival · high-resolution crop)",
    creditHero2020: "(user-provided image · 683 × 1,024 px · matching Getty image is rights-managed)",
    creditHeroPearl: "(HelloGDkitty · KENH14 copy of the same photo · 1,080 × 1,350 px · watermark retained)",
    creditHeroCar: "(user-provided image · 956 × 1,138 px · viewer-corner controls cropped by composition)",
    creditHeroBiiig: "(user-provided image · 710 × 992 px · same visual as YG’s BiiiG iii release)",
    credit2014: "(KCON 2014 · color/crop adjusted)",
    credit2025: "(2025 Korea Popular Culture and Arts Awards · WebP optimized)",
    credit2012Stage: "(ALIVE WORLD TOUR, 2012 · upper-body crop)",
    credit2012Portrait: "(ALIVE WORLD TOUR, 2012 · portrait crop)",
    credit2017Red: "(M.O.T.T.E Sydney show, 2017 · color/crop adjusted)",
    credit2017Screens: "(M.O.T.T.E Sydney show, 2017 · monochrome/crop adjusted)",
    credit2017Lights: "(M.O.T.T.E Sydney show, 2017 · monochrome/crop adjusted)",
    credit2017Crowd: "(M.O.T.T.E Sydney show, 2017 · monochrome/crop adjusted)",
    footerBack: "BACK TO TOP ↑",
  }
};

// One entry per timeline year: the media pair plus the wording for each
// language. `heading`/`detail`/`storyLabel` are the milestone notes.
const timelineEntries = [
  {
    year: "2006",
    video: { id: "BV19p411d7S9", page: 23, label: "BIGBANG — WE BELONG TOGETHER" },
    source: { label: "BILIBILI · WE BELONG TOGETHER", href: "https://www.bilibili.com/video/BV19p411d7S9/?p=23" },
    ko: {
      title: "BIGBANG",
      tag: "GROUP DEBUT",
      description: "그룹 BIGBANG의 데뷔와 함께 첫 장이 열립니다. 개인의 목소리는 팀의 무대 안에서 더 넓은 관객을 만납니다.",
      storyLabel: "첫 장",
      heading: "BIGBANG의 데뷔",
      detail: "다섯 멤버가 한 팀으로 처음 소개되며 권지용의 음악 여정도 공개적인 무대 위에 놓였습니다. 팀의 랩과 작사·작곡에 참여하며 아티스트로서의 기반을 다졌습니다.",
    },
    zh: {
      title: "BIGBANG",
      tag: "GROUP DEBUT",
      description: "BIGBANG 组合出道，故事的第一章由此展开。个人声音在团队舞台中触达更广泛的观众。",
      storyLabel: "第一幕",
      heading: "BIGBANG 正式出道",
      detail: "五位成员以 BIGBANG 的名义首次登上公众舞台，权志龙的音乐旅程也由此被更多人看见。他参与团队的 Rap、作词与作曲，在组合表达中逐渐建立个人创作身份。",
    },
    en: {
      title: "BIGBANG",
      tag: "GROUP DEBUT",
      description: "The first chapter opens with BIGBANG’s debut. A distinct voice reaches a wider audience from within the group’s stage.",
      storyLabel: "Opening scene",
      heading: "BIGBANG debuts",
      detail: "The five members are introduced as BIGBANG, bringing Kwon Ji Yong’s music into public view. His early contributions to rap, writing, and composition help establish his creative identity within the group.",
    }
  },
  {
    year: "2009",
    video: { id: "BV1EW411b7ms", page: 1, label: "G-DRAGON — HEARTBREAKER" },
    source: { label: "MELON MUSIC AWARDS · 2009", href: "https://www.melon.com/mma/result.htm?mmaYear=2009" },
    ko: {
      title: "Heartbreaker",
      tag: "SOLO DEBUT ALBUM",
      description: "첫 솔로 정규 앨범. 선명한 시각 언어와 전자음악의 질감으로 독립적인 아티스트의 출발을 알립니다.",
      storyLabel: "솔로 챕터",
      heading: "MELON MUSIC AWARDS · 올해의 앨범",
      detail: "첫 솔로 정규 앨범 《Heartbreaker》가 2009 Melon Music Awards에서 올해의 앨범으로 선정됐습니다. 솔로 보컬과 프로덕션, 강한 시각 콘셉트를 결합해 독립적인 음악 세계를 각인시켰습니다.",
    },
    zh: {
      title: "Heartbreaker",
      tag: "SOLO DEBUT ALBUM",
      description: "首张个人录音室专辑。鲜明的视觉语言与电子音乐质感，宣告独立艺术家的起点。",
      storyLabel: "Solo 启程",
      heading: "Melon Music Awards · 年度专辑",
      detail: "首张个人正规专辑《Heartbreaker》获得 2009 Melon Music Awards 年度专辑奖。个人演唱、制作与鲜明视觉概念合为一体，确立了独立的音乐表达。",
    },
    en: {
      title: "Heartbreaker",
      tag: "SOLO DEBUT ALBUM",
      description: "A first solo studio album. A vivid visual language and electronic textures mark the start of an independent artist’s path.",
      storyLabel: "First solo chapter",
      heading: "Melon Music Awards · Album of the Year",
      detail: "His first solo studio album, Heartbreaker, is named Album of the Year at the 2009 Melon Music Awards. Solo vocals, production, and a vivid visual concept announce a distinct musical world.",
    }
  },
  {
    year: "2012",
    video: { id: "BV1Lx411S7vk", page: 1, label: "G-DRAGON — ONE OF A KIND" },
    source: { label: "2012 MAMA · WINNERS", href: "https://prtimes.jp/main/html/rd/p/000000098.000003711.html" },
    ko: {
      title: "One of a Kind",
      tag: "EP · 2012",
      description: "타이틀곡과 함께 EP를 발표하며, 랩과 퍼포먼스가 하나의 대담한 캐릭터로 응축됩니다.",
      storyLabel: "새로운 페르소나",
      heading: "MAMA · 남자 가수상",
      detail: "《One of a Kind》와 〈Crayon〉으로 솔로 음악의 폭을 넓혔고, 2012 MAMA에서 남자 가수상을 받았습니다. 이 시기의 실험적인 스타일은 이후 솔로 무대의 시그니처가 됐습니다.",
    },
    zh: {
      title: "One of a Kind",
      tag: "EP · 2012",
      description: "发行同名 EP，Rap 与舞台表演凝练成大胆而鲜明的个人形象。",
      storyLabel: "风格实验",
      heading: "MAMA · 最佳男歌手",
      detail: "《One of a Kind》与《Crayon》拓宽了他作为 Solo 音乐人的表达边界，并让他获得 2012 MAMA 最佳男歌手奖。这一时期的实验风格逐渐成为个人舞台标识。",
    },
    en: {
      title: "One of a Kind",
      tag: "EP · 2012",
      description: "The EP arrives with its title track, condensing rap and performance into a bold, singular character.",
      storyLabel: "A bolder persona",
      heading: "MAMA · Best Male Artist",
      detail: "One of a Kind and Crayon expand his range as a solo artist, and he receives Best Male Artist at the 2012 MAMA. The era’s experimental styling becomes a signature of his solo stage.",
    }
  },
  {
    year: "2013",
    video: { id: "BV1hs411M74C", page: 1, label: "G-DRAGON — COUP D’ETAT" },
    source: { label: "2013 MAMA · AWARDS", href: "https://yg-life.com/archives/25004?lang=en" },
    ko: {
      title: "Coup d’Etat",
      tag: "STUDIO ALBUM · 2013",
      description: "협업과 장르의 경계를 오가며, 팝의 규칙을 자기 방식으로 비트는 앨범을 선보입니다.",
      storyLabel: "글로벌 스테이지",
      heading: "MAMA · 올해의 가수상, 4관왕",
      detail: "2013 MAMA에서 올해의 가수상과 남자 가수상, 남자 솔로 댄스 퍼포먼스상, 뮤직비디오상을 수상했습니다. 같은 해 첫 솔로 월드투어 《ONE OF A KIND》로 일본 4개 돔 공연을 포함한 대형 투어를 이어갔습니다.",
    },
    zh: {
      title: "Coup d’Etat",
      tag: "STUDIO ALBUM · 2013",
      description: "穿梭于合作与曲风之间，以自己的方式重写流行音乐的规则。",
      storyLabel: "巡演与荣誉",
      heading: "MAMA · 年度艺人，四项获奖",
      detail: "他在 2013 MAMA 获得年度艺人、最佳男歌手、最佳男 Solo 舞蹈表演及最佳音乐录影带四项奖项。同年，首轮 Solo 世界巡演《ONE OF A KIND》展开，包含日本四座巨蛋场馆演出。",
    },
    en: {
      title: "Coup d’Etat",
      tag: "STUDIO ALBUM · 2013",
      description: "Moving across collaborations and genres, the album bends the rules of pop on its own terms.",
      storyLabel: "A global stage",
      heading: "MAMA · Artist of the Year, four awards",
      detail: "At the 2013 MAMA, he wins Artist of the Year, Best Male Artist, Best Dance Performance – Male Solo, and Best Music Video. That year, his first solo world tour, ONE OF A KIND, includes shows at four major domes in Japan.",
    }
  },
  {
    year: "2017",
    video: { id: "BV1nC4y1t7rs", page: 1, label: "G-DRAGON — UNTITLED, 2014" },
    source: { label: "YG LIFE · DOME TOUR REPORT", href: "https://yg-life.com/archives/95912?lang=en" },
    ko: {
      title: "Kwon Ji Yong",
      tag: "EP · M.O.T.T.E WORLD TOUR",
      description: "이름과 정체성을 전면에 놓은 EP, 그리고 개인의 이야기를 대형 무대로 확장한 월드투어.",
      storyLabel: "본명으로 쓴 이야기",
      heading: "M.O.T.T.E · 일본 돔 투어 26만 관객",
      detail: "《KWON JI YONG》과 《ACT III, M.O.T.T.E》는 무대의 화려함 뒤에 있는 권지용의 내면을 전면에 내세웠습니다. 일본 3개 도시의 돔에서 열린 다섯 공연에는 약 26만 명이 모였습니다.",
    },
    zh: {
      title: "Kwon Ji Yong",
      tag: "EP · M.O.T.T.E WORLD TOUR",
      description: "将名字与身份置于作品中心，并通过世界巡演把个人叙事带上大型舞台。",
      storyLabel: "本名叙事",
      heading: "M.O.T.T.E · 日本巨蛋巡演 26 万观众",
      detail: "《KWON JI YONG》与《ACT III, M.O.T.T.E》将聚光灯背后的权志龙带到作品中央。日本三座城市的五场巨蛋演出共吸引约 26 万名观众。",
    },
    en: {
      title: "Kwon Ji Yong",
      tag: "EP · M.O.T.T.E WORLD TOUR",
      description: "An EP centered on name and identity, followed by a world tour that expands a personal story onto a large stage.",
      storyLabel: "Kwon Ji Yong, unveiled",
      heading: "M.O.T.T.E · 260,000 at Japan dome shows",
      detail: "KWON JI YONG and ACT III, M.O.T.T.E bring the person behind the stage persona into focus. Five concerts across three Japanese dome cities draw approximately 260,000 people.",
    }
  },
  {
    year: "2024",
    video: { id: "BV1JJSnYsEQm", page: 1, label: "G-DRAGON — POWER" },
    source: { label: "CJ ENM · 2024 MAMA", href: "https://cjenm.com/en/news/2024-mama-awards-wrap-up-historic-run-with-iconic-performances-and-milestone-moments/" },
    ko: {
      title: "POWER",
      tag: "SINGLE · 2024",
      description: "솔로 싱글로 돌아와, 현재의 감각과 자기 인식을 짧고 응축된 형식으로 드러냅니다.",
      storyLabel: "다시 켜진 목소리",
      heading: "MAMA · MUSIC VISIONARY OF THE YEAR",
      detail: "〈POWER〉로 솔로 활동을 재개한 뒤, 2024 MAMA는 G-DRAGON에게 Music Visionary of the Year를 수여했습니다. 이 상은 한 해의 특정 곡보다 음악과 대중문화에 남긴 영향력을 기리는 부문입니다.",
    },
    zh: {
      title: "POWER",
      tag: "SINGLE · 2024",
      description: "以个人单曲回归，在精炼的形式中呈现当下的感受与自我认知。",
      storyLabel: "回归现场",
      heading: "MAMA · 年度音乐愿景人物",
      detail: "凭借《POWER》回归 Solo 活动后，G-DRAGON 获得 2024 MAMA Music Visionary of the Year。该荣誉关注他对音乐与流行文化的长期影响。",
    },
    en: {
      title: "POWER",
      tag: "SINGLE · 2024",
      description: "A solo single return, capturing a present-tense energy and self-awareness in a compact form.",
      storyLabel: "Return to the stage",
      heading: "MAMA · Music Visionary of the Year",
      detail: "After returning to solo activity with POWER, G-DRAGON receives the 2024 MAMA Music Visionary of the Year honor, recognizing a lasting influence on music and popular culture.",
    }
  },
  {
    year: "2025",
    video: { id: "BV1mV9bYNEqZ", page: 1, label: "G-DRAGON — TOO BAD" },
    source: { label: "CJ ENM · 2025 MAMA", href: "https://tvnsports-front.cjenm.com/en/news/2025-mama-awards-demonstrates-musics-power-to-heal-and-unite-in-moving-two-nights-performances/" },
    ko: {
      title: "Übermensch",
      tag: "STUDIO ALBUM · 2025",
      description: "새 정규 앨범. 지나온 페르소나를 돌아보면서도 다음 변화의 가능성을 열어둡니다.",
      storyLabel: "다음 장의 시작",
      heading: "MAMA · 올해의 가수상 외 2관왕",
      detail: "정규 앨범 《Übermensch》와 〈TOO BAD〉로 다음 장을 열었습니다. 2025 MAMA에서 올해의 가수상, 남자 가수상, 남자 솔로 댄스 퍼포먼스상을 받았습니다.",
    },
    zh: {
      title: "Übermensch",
      tag: "STUDIO ALBUM · 2025",
      description: "全新录音室专辑。回望一路走来的角色，也为下一次变化留下空间。",
      storyLabel: "下一幕",
      heading: "MAMA · 年度艺人等三项大奖",
      detail: "正规专辑《Übermensch》与歌曲《TOO BAD》开启新的篇章。2025 MAMA 上，他获得年度艺人、最佳男歌手及最佳男 Solo 舞蹈表演三项奖项。",
    },
    en: {
      title: "Übermensch",
      tag: "STUDIO ALBUM · 2025",
      description: "A new studio album. Looking back at earlier personas while leaving room for what comes next.",
      storyLabel: "The next chapter",
      heading: "MAMA · Artist of the Year and two more",
      detail: "The studio album Übermensch and TOO BAD open a new chapter. At the 2025 MAMA, he wins Artist of the Year, Best Male Artist, and Best Dance Performance – Male Solo.",
    }
  }
];

// One entry per collaboration. `id` is the stable key used for the open row.
const workEntries = [
  {
    id: "good-boy",
    href: "https://music.apple.com/us/album/good-boy-single/1313615274",
    videoId: "BV1G54y1x7d8",
    ko: {
      title: "GOOD BOY",
      kind: "DUET SINGLE",
      description: "태양과 함께한 유닛 싱글. 둘의 랩과 퍼포먼스가 충돌하며 솔로 아티스트의 무대를 두 사람의 대결처럼 확장합니다.",
      videoLabel: "GD X TAEYANG — GOOD BOY · BILIBILI M/V",
    },
    zh: {
      title: "GOOD BOY",
      kind: "DUET SINGLE",
      description: "与太阳合作的双人单曲。两人的 Rap 与表演彼此碰撞，把个人舞台扩展成一场默契十足的对决。",
      videoLabel: "GD X TAEYANG — GOOD BOY · BILIBILI M/V",
    },
    en: {
      title: "GOOD BOY",
      kind: "DUET SINGLE",
      description: "A unit single with Taeyang. Their contrasting rap and performance turn the solo stage into a playful face-off between two distinct artists.",
      videoLabel: "GD X TAEYANG — GOOD BOY · BILIBILI M/V",
    }
  },
  {
    id: "zutter",
    href: "https://music.apple.com/us/search?term=BIGBANG%20GD%20TOP%20ZUTTER",
    videoId: "BV1Rs411Q718",
    ko: {
      title: "ZUTTER",
      kind: "UNIT TRACK",
      description: "T.O.P와 함께 만든 유닛 트랙. 거친 플로우와 과장된 캐릭터 플레이로 BIGBANG 안의 또 다른 결을 보여줍니다.",
      videoLabel: "GD&T.O.P — ZUTTER · BILIBILI M/V",
    },
    zh: {
      title: "ZUTTER",
      kind: "UNIT TRACK",
      description: "与 T.O.P 组成小分队完成的作品。粗粝的 Flow 与夸张的人物感，呈现 BIGBANG 内部另一种表达。",
      videoLabel: "GD&T.O.P — ZUTTER · BILIBILI M/V",
    },
    en: {
      title: "ZUTTER",
      kind: "UNIT TRACK",
      description: "A unit track with T.O.P. Its rough-edged flow and exaggerated character reveal another side of BIGBANG’s shared language.",
      videoLabel: "GD&T.O.P — ZUTTER · BILIBILI M/V",
    }
  },
  {
    id: "palette",
    href: "https://music.apple.com/us/search?term=IU%20Palette%20G-DRAGON",
    videoId: "BV1Nx411U7a3",
    ko: {
      title: "PALETTE",
      kind: "FEATURE · IU",
      description: "아이유의 시선에 G-DRAGON의 랩이 더해진 피처링 곡. 서로 다른 세대의 감각이 차분한 대화처럼 이어집니다.",
      videoLabel: "IU feat. G-DRAGON — PALETTE · BILIBILI M/V",
    },
    zh: {
      title: "PALETTE",
      kind: "FEATURE · IU",
      description: "IU 的视角与 G-DRAGON 的 Rap 相遇。两种不同世代的感受像一段从容的对话，落在这首合作曲里。",
      videoLabel: "IU feat. G-DRAGON — PALETTE · BILIBILI M/V",
    },
    en: {
      title: "PALETTE",
      kind: "FEATURE · IU",
      description: "G-DRAGON’s rap enters IU’s point of view. Their different generational perspectives meet in a relaxed, conversational collaboration.",
      videoLabel: "IU feat. G-DRAGON — PALETTE · BILIBILI M/V",
    }
  },
  {
    id: "complex",
    href: "https://music.apple.com/us/search?term=Zion.T%20Complex%20G-DRAGON",
    videoId: "BV1vs41187Zq",
    ko: {
      title: "COMPLEX",
      kind: "FEATURE · ZION.T",
      description: "자이언티의 곡에 참여해 익숙한 자신감과 유머를 비튼 랩을 들려줍니다. 뮤직비디오 대신 Bilibili 오디오 영상을 연결합니다.",
      videoLabel: "ZION.T feat. G-DRAGON — COMPLEX · BILIBILI AUDIO",
    },
    zh: {
      title: "COMPLEX",
      kind: "FEATURE · ZION.T",
      description: "参与 Zion.T 的作品，以熟悉的自信和幽默重新调侃自我。这里连接的是 Bilibili 上的音频视频，不是音乐录影带。",
      videoLabel: "ZION.T feat. G-DRAGON — COMPLEX · BILIBILI AUDIO",
    },
    en: {
      title: "COMPLEX",
      kind: "FEATURE · ZION.T",
      description: "A guest verse on Zion.T’s track, turning familiar confidence into self-aware humor. The linked Bilibili upload is audio, not a music video.",
      videoLabel: "ZION.T feat. G-DRAGON — COMPLEX · BILIBILI AUDIO",
    }
  },
  {
    id: "loser",
    href: "https://music.apple.com/us/search?term=BIGBANG%20LOSER",
    videoId: "BV1Ks411J7aM",
    ko: {
      title: "LOSER",
      kind: "BIGBANG · SINGLE",
      description: "BIGBANG의 감정적인 면을 전면에 둔 싱글. 절제된 화면과 자기 고백에 가까운 가사가 그룹 음악의 다른 온도를 보여줍니다.",
      videoLabel: "BIGBANG — LOSER · BILIBILI M/V",
    },
    zh: {
      title: "LOSER",
      kind: "BIGBANG · SINGLE",
      description: "BIGBANG 展露情绪的一面。克制的画面与近似自白的歌词，为组合作品带来不同的温度。",
      videoLabel: "BIGBANG — LOSER · BILIBILI M/V",
    },
    en: {
      title: "LOSER",
      kind: "BIGBANG · SINGLE",
      description: "A more vulnerable side of BIGBANG. Restrained imagery and near-confessional lyrics give the group’s catalogue a different emotional temperature.",
      videoLabel: "BIGBANG — LOSER · BILIBILI M/V",
    }
  },
  {
    id: "still-life",
    href: "https://music.apple.com/us/album/still-life-single/1616762362?l=en-US",
    videoId: "BV1Vu411e7Tv",
    ko: {
      title: "STILL LIFE",
      kind: "BIGBANG · SINGLE",
      description: "멤버들이 각자의 시간을 돌아보며 함께 부른 싱글. 계절과 기억을 오가는 영상으로 긴 공백 뒤의 재회를 기록합니다.",
      videoLabel: "BIGBANG — STILL LIFE · BILIBILI M/V",
    },
    zh: {
      title: "STILL LIFE",
      kind: "BIGBANG · SINGLE",
      description: "成员回望各自走过的时间，并再次并肩演唱。影像在季节与记忆之间切换，记录长久空白后的重逢。",
      videoLabel: "BIGBANG — STILL LIFE · BILIBILI M/V",
    },
    en: {
      title: "STILL LIFE",
      kind: "BIGBANG · SINGLE",
      description: "A song in which the members look back on separate lives and return to the frame together. Its changing seasons record a reunion after a long silence.",
      videoLabel: "BIGBANG — STILL LIFE · BILIBILI M/V",
    }
  }
];

// Hero carousel frames. `objectFit`/`objectPosition`/`zoom` are the per-photo
// framing tweaks applied as inline styles by renderHeroCarousel().
const heroSlides = [
  {
    src: "assets/gd-2015-infinite-challenge-closeup.webp",
    objectPosition: "50% 0%",
    ko: { alt: "2015년 영동고속도로 가요제에서 포착한 금발의 권지용 인물 사진", caption: "A MOMENT, IN COLOR · 2015" },
    zh: { alt: "2015 年永东高速公路歌谣祭现场的金发权志龙近景", caption: "A MOMENT, IN COLOR · 2015" },
    en: { alt: "A close portrait of Kwon Ji Yong at the 2015 Yeongdong Expressway Music Festival", caption: "A MOMENT, IN COLOR · 2015" }
  },
  {
    src: "assets/gd-2020-we11done-seated.webp",
    objectPosition: "50% 7%",
    ko: { alt: "2020년 파리 패션 위크 WE11DONE 쇼에서 파란색 정장을 입고 앉아 있는 권지용", caption: "WE11DONE · PARIS · 2020" },
    zh: { alt: "2020 年巴黎时装周 WE11DONE 秀场上，身穿浅蓝色西装的权志龙", caption: "WE11DONE · PARIS · 2020" },
    en: { alt: "Kwon Ji Yong seated in a pale blue suit at the 2020 WE11DONE show in Paris", caption: "WE11DONE · PARIS · 2020" }
  },
  {
    src: "assets/gd-2025-pearl-tour.webp",
    fit: "contain",
    objectPosition: "50% 50%",
    ko: { alt: "2025년 월드 투어 무대에서 진주 장식 의상을 입고 마이크를 든 권지용", caption: "ÜBERMENSCH WORLD TOUR · LIVE PORTRAIT" },
    zh: { alt: "2025 年世界巡演舞台上，身穿珍珠装饰外套并手持麦克风的权志龙", caption: "ÜBERMENSCH WORLD TOUR · LIVE PORTRAIT" },
    en: { alt: "Kwon Ji Yong holding a microphone in a pearl-embellished outfit during the 2025 world tour", caption: "ÜBERMENSCH WORLD TOUR · LIVE PORTRAIT" }
  },
  {
    src: "assets/gd-2025-car-offstage.webp",
    objectPosition: "50% 50%",
    zoom: 1.25,
    zoomOrigin: "50% 50%",
    ko: { alt: "차 안에서 휴대전화를 보는 은발의 권지용", caption: "A PAUSE BETWEEN SCENES · 2025" },
    zh: { alt: "在车内看手机的银发权志龙侧脸", caption: "A PAUSE BETWEEN SCENES · 2025" },
    en: { alt: "A silver-haired Kwon Ji Yong looking at his phone inside a car", caption: "A PAUSE BETWEEN SCENES · 2025" }
  },
  {
    src: "assets/gd-2026-biiig-visual.webp",
    objectPosition: "50% 15%",
    ko: { alt: "YG의 BiiiG iii 버전 비주얼 사진 속 주황색 머리와 한쪽 눈을 가린 권지용", caption: "BiiiG VISUAL · 2026" },
    zh: { alt: "YG《BiiiG》iii 版本视觉照中，以橙色发型和手遮一只眼睛的权志龙", caption: "BiiiG VISUAL · 2026" },
    en: { alt: "Kwon Ji Yong in YG’s BiiiG iii visual photo, with orange hair and one eye covered by his hand", caption: "BiiiG VISUAL · 2026" }
  }
];

// Visual archive set. `figureClass`/`imageClass` are the grid classes from
// styles.css; everything else is the photo itself plus its caption copy.
const galleryPhotos = [
  {
    figureClass: "gallery-item gallery-featured",
    imageClass: "gallery-image gallery-image-2017",
    src: "assets/gd-2017-motte-sydney-red.webp",
    fullSrc: "assets/gd-2017-motte-sydney-red-full.webp",
    source: "https://commons.wikimedia.org/wiki/File:G-Dragon_-_M.O.T.T.E_World_Tour_in_Sydney_2017_-_3.jpg",
    ko: {
      title: "M.O.T.T.E WORLD TOUR",
      caption: "SYDNEY · 2017 — 무대의 스케일과 빛",
      alt: "2017년 시드니 M.O.T.T.E 월드투어 무대 전경",
      story: "시드니 공연의 넓은 무대와 레이저 빛은 ACT III, M.O.T.T.E의 거대한 스케일을 보여줍니다. 세 번째 솔로 투어는 화려한 페르소나와 그 안쪽의 권지용을 함께 무대에 올렸습니다.",
    },
    zh: {
      title: "M.O.T.T.E WORLD TOUR",
      caption: "SYDNEY · 2017 — 舞台的尺度与光线",
      alt: "2017 年悉尼 M.O.T.T.E 世界巡演舞台全景",
      story: "悉尼站的宽阔舞台与激光灯光呈现了 ACT III, M.O.T.T.E 的演出尺度。这是他的第三轮 Solo 世界巡演，作品同时展开耀眼的舞台人格与其背后的权志龙。",
    },
    en: {
      title: "M.O.T.T.E WORLD TOUR",
      caption: "SYDNEY · 2017 — Scale and light on stage",
      alt: "Stage view from the 2017 M.O.T.T.E World Tour in Sydney",
      story: "The broad stage and laser beams in Sydney reveal the scale of ACT III, M.O.T.T.E. His third solo tour put the spectacle of the persona beside the quieter story of Kwon Ji Yong.",
    }
  },
  {
    figureClass: "gallery-item gallery-screen",
    imageClass: "gallery-image",
    src: "assets/gd-2017-motte-sydney-screens.jpg",
    fullSrc: "assets/gd-2017-motte-sydney-screens-full.webp",
    source: "https://commons.wikimedia.org/wiki/File:G-Dragon_-_M.O.T.T.E_World_Tour_in_Sydney_2017_-_10.jpg",
    ko: {
      title: "A SCENE IN MOTION",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "M.O.T.T.E 시드니 공연에서 화면 연출과 함께 퍼포먼스하는 G-Dragon",
      story: "공연장 스크린은 음악을 보조하는 배경을 넘어 각 곡의 감정과 장면을 확장합니다. 관객의 시선과 퍼포먼스가 같은 화면 안에서 움직입니다.",
    },
    zh: {
      title: "A SCENE IN MOTION",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "G-Dragon 在 M.O.T.T.E 悉尼场的屏幕影像前表演",
      story: "舞台屏幕不只是音乐背后的布景，也延伸出每首歌的情绪与视觉场景。观众的视线和表演者在同一画面中交汇。",
    },
    en: {
      title: "A SCENE IN MOTION",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "G-Dragon performing with the visual screens at the M.O.T.T.E Sydney show",
      story: "The stage screens extend each song into a visual scene instead of sitting behind the performance. The audience’s gaze and the artist’s movement share one frame.",
    }
  },
  {
    figureClass: "gallery-item gallery-lights",
    imageClass: "gallery-image",
    src: "assets/gd-2017-motte-sydney-lights.jpg",
    fullSrc: "assets/gd-2017-motte-sydney-lights-full.webp",
    source: "https://commons.wikimedia.org/wiki/File:G-Dragon_-_M.O.T.T.E_World_Tour_in_Sydney_2017_-_17.jpg",
    ko: {
      title: "LIGHTS ON STAGE",
      caption: "SYDNEY · 2017",
      alt: "M.O.T.T.E 시드니 공연의 무대 조명과 퍼포머",
      story: "조명이 켜지는 순간, 무대는 하나의 독립된 풍경으로 바뀝니다. 흑백으로 남긴 빛의 흔적을 따라 공연의 공간감을 살펴봅니다.",
    },
    zh: {
      title: "LIGHTS ON STAGE",
      caption: "SYDNEY · 2017",
      alt: "M.O.T.T.E 悉尼场的舞台灯光与表演者",
      story: "灯光亮起时，舞台变成一片独立的风景。黑白影像留下光束的轨迹，也记录下演出的空间感。",
    },
    en: {
      title: "LIGHTS ON STAGE",
      caption: "SYDNEY · 2017",
      alt: "Stage lights and performers at the M.O.T.T.E Sydney show",
      story: "As the lights rise, the stage becomes a landscape of its own. This monochrome frame follows the beams and the sense of space around the performance.",
    }
  },
  {
    figureClass: "gallery-item gallery-crowd",
    imageClass: "gallery-image",
    src: "assets/gd-2017-motte-sydney-crowd.jpg",
    fullSrc: "assets/gd-2017-motte-sydney-crowd-full.webp",
    source: "https://commons.wikimedia.org/wiki/File:G-Dragon_-_M.O.T.T.E_World_Tour_in_Sydney_2017_-_22.jpg",
    ko: {
      title: "THE ROOM, THE SOUND",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "M.O.T.T.E 시드니 공연과 관객 전경",
      story: "객석과 무대를 한 프레임에 담아 공연의 규모를 기록합니다. 약 26만 명이 함께한 일본 돔 투어의 현장감이 이미지 바깥까지 이어집니다.",
    },
    zh: {
      title: "THE ROOM, THE SOUND",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "M.O.T.T.E 悉尼演出现场与观众全景",
      story: "画面同时收进观众席与舞台，记录演出的规模。日本巨蛋巡演五场共约 26 万名观众，现场能量延伸到镜头之外。",
    },
    en: {
      title: "THE ROOM, THE SOUND",
      caption: "M.O.T.T.E WORLD TOUR · 2017",
      alt: "The M.O.T.T.E Sydney performance and audience",
      story: "The frame holds both audience and stage to show the scale of the room. The five Japan dome shows drew about 260,000 people, and the energy continues beyond the image.",
    }
  }
];

// Bilibili ids needed to embed a video: the cover image and the aid/cid pair
// the external player expects. Nothing else in the page repeats these.
const videoCatalog = {
  "BV19p411d7S9": { page: 23, aid: 23674863, cid: 39546901, poster: "https://i1.hdslb.com/bfs/archive/a5c98981fdc2dfcf6e542ea61d393e0067a25b28.jpg" },
  "BV1EW411b7ms": { page: 1, aid: 17740807, cid: 28963917, poster: "https://i2.hdslb.com/bfs/archive/1708977b22d7990715f9667f02b2a94dd47f4df6.png" },
  "BV1Lx411S7vk": { page: 1, aid: 10221778, cid: 16886763, poster: "https://i1.hdslb.com/bfs/archive/f0b5e7bb1b10e4f7ec44b3fca82c5470277ce32e.jpg" },
  "BV1hs411M74C": { page: 1, aid: 28899549, cid: 50108264, poster: "https://i1.hdslb.com/bfs/archive/f53cc974a60e06522b3231d7c2c002e3671e65f7.jpg" },
  "BV1nC4y1t7rs": { page: 1, aid: 796784363, cid: 225824327, poster: "https://i0.hdslb.com/bfs/archive/2475004169491ff722786dc8a2e4f5698ca316c1.png" },
  "BV1JJSnYsEQm": { page: 1, aid: 113401263096645, cid: 26561085679, poster: "https://i2.hdslb.com/bfs/archive/56cc7edc34e35d6e0f0ded5c25c99d5d71424c51.jpg" },
  "BV1mV9bYNEqZ": { page: 1, aid: 114091997796651, cid: 28652601475, poster: "https://i1.hdslb.com/bfs/archive/c56d2be64ffc3342cf90a9988f8630aa44e8fc74.jpg" },
  "BV1G54y1x7d8": { page: 1, aid: 843333354, cid: 271691026, poster: "https://i1.hdslb.com/bfs/archive/093db5ae7c9838ab9c82ac46489f89fa6138d83a.jpg" },
  "BV1Rs411Q718": { page: 1, aid: 4111362, cid: 6637068, poster: "https://i0.hdslb.com/bfs/archive/c2c74b47a3654e1657fe05988ef8db5a25dfeb97.png" },
  "BV1Nx411U7a3": { page: 1, aid: 9992566, cid: 16518031, poster: "https://i2.hdslb.com/bfs/archive/34b4be7b51ee78b1a7f3c93b25471090a12d09ff.jpg" },
  "BV1vs41187Zq": { page: 1, aid: 8337535, cid: 13721156, poster: "https://i0.hdslb.com/bfs/archive/610e0fce4ef61f4aab8f3dceaa898f5977f6d236.jpg" },
  "BV1Ks411J7aM": { page: 1, aid: 26768773, cid: 46072925, poster: "https://i2.hdslb.com/bfs/archive/f89b3bf3edb835586f6564260cc0a4806d0b49a3.jpg" },
  "BV1Vu411e7Tv": { page: 1, aid: 510416543, cid: 567652841, poster: "https://i1.hdslb.com/bfs/archive/f98d45e9106cf9f46c2fec735757f397ea3e6220.jpg" },
  "BV1YW411E7P7": { page: 1, aid: 19508578, cid: 31813081, poster: "https://i0.hdslb.com/bfs/archive/bc3badd4b0aae58909a3e8d9e1a9e57bc3831382.jpg" },
};
/* ==========================================================================
   02. HELPERS
   ========================================================================== */

const byId = (id) => document.getElementById(id);
const pad2 = (value) => String(value).padStart(2, "0");
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));

// Copy for the language on screen, and for one record (timeline entry,
// collaboration, photo) inside that copy.
const currentCopy = () => copyByLanguage[language];
const textFor = (record) => record[language];

const LANGUAGES = ["ko", "zh", "en"];
const LANGUAGE_STORAGE_KEY = "gdragon-language";

function readUrlLanguage() {
  const requested = new URLSearchParams(location.search).get("lang");
  return LANGUAGES.includes(requested) ? requested : null;
}

function readSavedLanguage() {
  try {
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return LANGUAGES.includes(saved) ? saved : null;
  } catch {
    return null;
  }
}

function saveLanguage(value) {
  try { localStorage.setItem(LANGUAGE_STORAGE_KEY, value); } catch { /* The choice still applies to this visit. */ }
}

// ?lang= wins, then the saved choice, then Korean.
const resolveInitialLanguage = () => readUrlLanguage() || readSavedLanguage() || "ko";

// Bilibili helpers. A videoCatalog entry holds the cover image plus the aid/cid
// pair the external player needs; `page` picks the part of a multi-part upload.
const videoThumbnail = (videoId) => videoCatalog[videoId].poster;
const videoPageUrl = (videoId, page = videoCatalog[videoId].page) => `https://www.bilibili.com/video/${videoId}/?p=${page}`;

function videoEmbedUrl(videoId, page = videoCatalog[videoId].page) {
  const video = videoCatalog[videoId];
  return `https://player.bilibili.com/player.html?isOutside=true&aid=${video.aid}&bvid=${encodeURIComponent(videoId)}&cid=${video.cid}&page=${page}&high_quality=1&danmaku=0&autoplay=1`;
}

/* ==========================================================================
   03. STATE
   ========================================================================== */

let language = resolveInitialLanguage();
let selectedWorkId = "good-boy";
let selectedTimelineYear = timelineEntries[0].year;
let activeHeroSlide = 0;
let heroAutoplayEnabled = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let heroAutoplayTimer = null;

let activeGalleryIndex = 0;
let galleryScale = 1;
let galleryOffset = { x: 0, y: 0 };
let galleryPointers = new Map();
let galleryPinchStart = null;
let galleryDragStart = null;

/* ==========================================================================
   04. HERO CAROUSEL
   ========================================================================== */

function renderHeroCarousel(copy) {
  const slide = heroSlides[activeHeroSlide];
  const slideText = textFor(slide);
  const figure = document.querySelector(".hero-portrait");
  const image = byId("hero-image");
  figure.setAttribute("aria-label", copy.heroCarouselLabel);
  image.classList.add("is-changing");
  image.src = slide.src;
  image.style.objectFit = slide.fit || "cover";
  image.style.objectPosition = slide.objectPosition || "50% 16%";
  image.style.setProperty("--hero-image-scale", slide.zoom || 1);
  image.style.setProperty("--hero-image-origin", slide.zoomOrigin || "center");
  image.alt = slideText.alt;
  byId("hero-caption").textContent = slideText.caption;
  byId("hero-slide-count").textContent = `${pad2(activeHeroSlide + 1)} / ${pad2(heroSlides.length)}`;
  window.setTimeout(() => image.classList.remove("is-changing"), 450);

  const dots = byId("hero-dots");
  dots.setAttribute("aria-label", copy.heroDots);
  dots.innerHTML = heroSlides
    .map((item, index) => `<button type="button" data-hero-slide="${index}" aria-label="${escapeHTML(`${index + 1}: ${textFor(item).caption}`)}" aria-pressed="${index === activeHeroSlide}"></button>`)
    .join("");
  dots.querySelectorAll("[data-hero-slide]").forEach((button) => {
    button.addEventListener("click", () => setHeroSlide(Number(button.dataset.heroSlide), copy));
  });

  const toggle = byId("hero-autoplay");
  toggle.setAttribute("aria-pressed", String(heroAutoplayEnabled));
  toggle.setAttribute("aria-label", heroAutoplayEnabled ? copy.heroPause : copy.heroPlay);
  toggle.querySelector("span").textContent = heroAutoplayEnabled ? "Ⅱ" : "▶";
}

function setHeroSlide(index, copy) {
  activeHeroSlide = (index + heroSlides.length) % heroSlides.length;
  renderHeroCarousel(copy);
}

function updateHeroAutoplay(copy) {
  window.clearInterval(heroAutoplayTimer);
  heroAutoplayTimer = null;
  if (!heroAutoplayEnabled || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  heroAutoplayTimer = window.setInterval(() => setHeroSlide(activeHeroSlide + 1, copy), 6500);
}

/* ==========================================================================
   05. TIMELINE
   ========================================================================== */

function renderTimeline(copy) {
  const rail = byId("year-rail");
  rail.innerHTML = timelineEntries
    .map((entry) => `<button type="button" data-timeline-year="${escapeHTML(entry.year)}" aria-pressed="${entry.year === selectedTimelineYear}">${escapeHTML(entry.year)}</button>`)
    .join("");
  rail.querySelectorAll("[data-timeline-year]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedTimelineYear = button.dataset.timelineYear;
      rail.querySelectorAll("[data-timeline-year]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      renderTimelinePanel(copy);
    });
  });
  renderTimelinePanel(copy);
}

function renderTimelinePanel(copy) {
  const activeIndex = Math.max(0, timelineEntries.findIndex((entry) => entry.year === selectedTimelineYear));
  const entry = timelineEntries[activeIndex] || timelineEntries[0];
  const { title, tag, description, storyLabel, heading, detail } = textFor(entry);
  const { year, video, source } = entry;
  byId("timeline-list").innerHTML = `
    <article class="timeline-item timeline-feature" aria-live="polite" aria-label="${escapeHTML(`${copy.timelineTitle} · ${year}`)}">
      <div class="timeline-story-top"><span>${escapeHTML(`${copy.timelineChapter} ${pad2(activeIndex + 1)} / ${pad2(timelineEntries.length)}`)}</span><span>${escapeHTML(tag)}</span></div>
      <figure class="timeline-visual">
        <button class="timeline-video-trigger" data-rotary-play type="button" data-video-id="${escapeHTML(video.id)}" data-video-page="${video.page || 1}" data-video-year="${escapeHTML(year)}" data-video-title="${escapeHTML(title)}" aria-label="${escapeHTML(`${copy.playVideoLabel}: ${title} (${year})`)}">
          <img src="${videoThumbnail(video.id)}" alt="${escapeHTML(`${title} · ${year} ${copy.videoThumbnailAlt}`)}" loading="lazy" referrerpolicy="no-referrer" />
          <span class="timeline-play" aria-hidden="true">▶</span>
        </button>
        <figcaption><a href="${videoPageUrl(video.id, video.page || 1)}" target="_blank" rel="noreferrer">${escapeHTML(video.label)} · ${escapeHTML(copy.videoFrameLabel)} ↗</a></figcaption>
      </figure>
      <div class="timeline-info">
        <div class="timeline-year">${escapeHTML(year)}</div>
        <div class="timeline-heading">
          <h3 class="timeline-title">${escapeHTML(title)}</h3>
          <span class="timeline-tag">${escapeHTML(tag)}</span>
        </div>
        <div class="timeline-story-copy"><span class="timeline-story-label">${escapeHTML(storyLabel)}</span><p class="timeline-description">${escapeHTML(description)}</p><p class="timeline-context">${escapeHTML(detail)}</p></div>
        <aside class="timeline-achievement"><span class="timeline-achievement-label">${escapeHTML(copy.timelineAchievement)}</span><strong>${escapeHTML(heading)}</strong></aside>
        <a class="timeline-source" href="${escapeHTML(source.href)}" target="_blank" rel="noreferrer"><span>${escapeHTML(copy.timelineSourceLabel)}</span><strong>${escapeHTML(source.label)}</strong><span aria-hidden="true">↗</span></a>
      </div>
    </article>`;
  const trigger = byId("timeline-list").querySelector(".timeline-video-trigger");
  trigger.addEventListener("click", () => playInlineVideo(trigger, trigger.closest(".timeline-visual")));
}

/* ==========================================================================
   06. COLLABORATIONS
   ========================================================================== */

function renderWorks(copy) {
  const list = byId("work-list");
  list.innerHTML = workEntries
    .map((work, index) => {
      const { title, kind, description, videoLabel } = textFor(work);
      const selected = work.id === selectedWorkId;
      const sequence = pad2(index + 1);
      const thumbnail = videoThumbnail(work.videoId);
      const media = `<figure class="work-visual"><div class="work-player" data-video-id="${escapeHTML(work.videoId)}" data-video-page="${videoCatalog[work.videoId].page}" data-video-sequence="${sequence}" data-video-title="${escapeHTML(title)}" data-video-thumbnail="${escapeHTML(thumbnail)}" data-video-alt="${escapeHTML(`${title} · ${copy.workVideoAlt}`)}" data-play-label="${escapeHTML(copy.playVideoLabel)}"></div><figcaption><a href="${videoPageUrl(work.videoId)}" target="_blank" rel="noreferrer">${escapeHTML(videoLabel)} · ${escapeHTML(copy.openBilibili)} ↗</a></figcaption></figure>`;
      return `
      <article class="work-item${selected ? " is-selected" : ""}">
        <div class="work-row-wrap">
          <button class="work-row" type="button" data-work-index="${index}" aria-expanded="${selected}">
            <span class="work-sequence">${sequence}</span>
            <span class="work-title">${escapeHTML(title)}</span>
            <span class="work-kind">${escapeHTML(kind)}</span>
            <span class="work-arrow" aria-hidden="true">+</span>
          </button>
          <a class="work-release-link" href="${escapeHTML(work.href)}" target="_blank" rel="noreferrer" aria-label="${escapeHTML(`${copy.listenLink}: ${title}`)}"><span>${escapeHTML(copy.listenLink)}</span><span aria-hidden="true">↗</span></a>
        </div>
        <div class="work-details"${selected ? "" : " hidden"}>
          <p>${escapeHTML(description)}</p>
          ${media}
        </div>
      </article>`;
    })
    .join("");
  list.querySelectorAll(".work-player").forEach(showVideoPoster);
  list.querySelectorAll("[data-work-index]").forEach((button) => {
    button.addEventListener("click", () => selectWork(Number(button.dataset.workIndex)));
  });
}

// Opens one row and closes the others, restoring their posters.
function selectWork(index) {
  selectedWorkId = workEntries[index].id;
  byId("work-list").querySelectorAll(".work-item").forEach((item) => {
    const row = item.querySelector("[data-work-index]");
    const active = workEntries[Number(row.dataset.workIndex)].id === selectedWorkId;
    if (!active) resetInlineVideo(item);
    item.classList.toggle("is-selected", active);
    row.setAttribute("aria-expanded", String(active));
    item.querySelector(".work-details").hidden = !active;
  });
}

/* ==========================================================================
   07. VISUAL ARCHIVE
   ========================================================================== */

function renderGallery(copy) {
  const grid = byId("gallery-grid");
  grid.innerHTML = galleryPhotos
    .map((photo, index) => {
      const text = textFor(photo);
      const openLabel = `${copy.galleryOpenLabel}: ${text.title}`;
      return `
      <figure class="${photo.figureClass}">
        <div class="${photo.imageClass}"><button class="gallery-open-image" type="button" data-gallery-open="${index}" aria-label="${escapeHTML(openLabel)}"><img src="${photo.src}" alt="${escapeHTML(text.alt)}" loading="lazy" /></button></div>
        <figcaption><span class="gallery-count">${pad2(index + 1)}</span><span class="gallery-caption"><button class="gallery-title-button" type="button" data-gallery-open="${index}" aria-label="${escapeHTML(openLabel)}">${escapeHTML(text.title)}</button><small>${escapeHTML(text.caption)}</small></span><button class="gallery-arrow" type="button" data-gallery-open="${index}" aria-label="${escapeHTML(openLabel)}" aria-controls="gallery-dialog">↗</button></figcaption>
      </figure>`;
    })
    .join("");
  grid.querySelectorAll("[data-gallery-open]").forEach((button) => {
    button.addEventListener("click", () => openGalleryDetail(Number(button.dataset.galleryOpen)));
  });
}

function openGalleryDetail(index) {
  activeGalleryIndex = index;
  const copy = currentCopy();
  const dialog = byId("gallery-dialog");
  dialog.classList.remove("is-video");
  byId("gallery-dialog-video-frame").hidden = true;
  byId("gallery-dialog-video-frame").querySelector("iframe").removeAttribute("src");
  byId("gallery-dialog-video-link").hidden = true;
  byId("gallery-dialog-image").hidden = false;
  updateGalleryDetail(index, copy);
  dialog.showModal();
}

function updateGalleryDetail(index, copy = currentCopy()) {
  resetGalleryZoom();
  activeGalleryIndex = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[activeGalleryIndex];
  const text = textFor(photo);
  byId("gallery-dialog-image").src = photo.fullSrc || photo.src;
  byId("gallery-dialog-image").alt = text.alt;
  byId("gallery-dialog-caption").textContent = text.caption;
  byId("gallery-dialog-kicker").textContent = `${copy.galleryDialogKicker} · ${pad2(activeGalleryIndex + 1)} / ${pad2(galleryPhotos.length)}`;
  byId("gallery-dialog-title").textContent = text.title;
  byId("gallery-dialog-description").textContent = text.story;
  byId("gallery-dialog-source").href = photo.source;
  byId("gallery-dialog-prev").setAttribute("aria-label", copy.galleryPrevious);
  byId("gallery-dialog-next").setAttribute("aria-label", copy.galleryNext);
  byId("gallery-zoom-in").setAttribute("aria-label", copy.galleryZoomIn);
  byId("gallery-zoom-out").setAttribute("aria-label", copy.galleryZoomOut);
  byId("gallery-zoom-reset").setAttribute("aria-label", copy.galleryZoomReset);
  byId("gallery-dialog-video-toggle").textContent = copy.galleryPlayVideo;
  byId("gallery-dialog-video-toggle").setAttribute("aria-pressed", "false");
}

function applyGalleryZoom() {
  const image = byId("gallery-dialog-image");
  image.style.transform = `translate3d(${galleryOffset.x}px, ${galleryOffset.y}px, 0) scale(${galleryScale})`;
  image.style.cursor = galleryScale > 1 ? "grab" : "zoom-in";
  byId("gallery-zoom-level").textContent = `${Math.round(galleryScale * 100)}%`;
}

function setGalleryZoom(nextScale, anchorX, anchorY) {
  const rect = byId("gallery-dialog-figure").getBoundingClientRect();
  const next = Math.max(1, Math.min(4, nextScale));
  if (anchorX != null && anchorY != null && next !== galleryScale) {
    const relativeX = anchorX - rect.left - rect.width / 2;
    const relativeY = anchorY - rect.top - rect.height / 2;
    const ratio = next / galleryScale;
    galleryOffset.x += (relativeX - galleryOffset.x) * (1 - ratio);
    galleryOffset.y += (relativeY - galleryOffset.y) * (1 - ratio);
  }
  galleryScale = next;
  if (galleryScale === 1) galleryOffset = { x: 0, y: 0 };
  applyGalleryZoom();
}

function resetGalleryZoom() {
  galleryScale = 1;
  galleryOffset = { x: 0, y: 0 };
  galleryPointers.clear();
  galleryPinchStart = null;
  galleryDragStart = null;
  applyGalleryZoom();
}

// Swaps the viewer between the photo set and the M.O.T.T.E tour trailer.
const TOUR_TRAILER_VIDEO_ID = "BV1YW411E7P7";

function setGalleryVideoMode(showVideo) {
  const copy = currentCopy();
  const dialog = byId("gallery-dialog");
  const frame = byId("gallery-dialog-video-frame");
  const iframe = frame.querySelector("iframe");
  const image = byId("gallery-dialog-image");
  const videoLink = byId("gallery-dialog-video-link");
  const toggle = byId("gallery-dialog-video-toggle");
  if (showVideo) {
    frame.hidden = false;
    image.hidden = true;
    dialog.classList.add("is-video");
    videoLink.hidden = false;
    videoLink.querySelector("span").textContent = copy.openBilibili;
    iframe.title = `${copy.galleryPlayVideo} · M.O.T.T.E 2017`;
    iframe.src = videoEmbedUrl(TOUR_TRAILER_VIDEO_ID);
    toggle.textContent = copy.galleryShowPhotos;
    toggle.setAttribute("aria-pressed", "true");
  } else {
    iframe.removeAttribute("src");
    frame.hidden = true;
    image.hidden = false;
    dialog.classList.remove("is-video");
    videoLink.hidden = true;
    toggle.textContent = copy.galleryPlayVideo;
    toggle.setAttribute("aria-pressed", "false");
    resetGalleryZoom();
  }
}

function bindGalleryViewer() {
  const dialog = byId("gallery-dialog");
  const image = byId("gallery-dialog-image");

  byId("gallery-dialog-prev").addEventListener("click", () => updateGalleryDetail(activeGalleryIndex - 1));
  byId("gallery-dialog-next").addEventListener("click", () => updateGalleryDetail(activeGalleryIndex + 1));
  byId("gallery-zoom-in").addEventListener("click", () => setGalleryZoom(galleryScale * 1.25));
  byId("gallery-zoom-out").addEventListener("click", () => setGalleryZoom(galleryScale / 1.25));
  byId("gallery-zoom-reset").addEventListener("click", resetGalleryZoom);
  byId("gallery-dialog-video-toggle").addEventListener("click", () => setGalleryVideoMode(byId("gallery-dialog-video-frame").hidden));
  byId("gallery-dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => setGalleryVideoMode(false));
  dialog.addEventListener("keydown", (event) => {
    if (!dialog.open || !byId("gallery-dialog-video-frame").hidden) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); updateGalleryDetail(activeGalleryIndex - 1); }
    if (event.key === "ArrowRight") { event.preventDefault(); updateGalleryDetail(activeGalleryIndex + 1); }
    if (event.key === "+" || event.key === "=") { event.preventDefault(); setGalleryZoom(galleryScale * 1.25); }
    if (event.key === "-") { event.preventDefault(); setGalleryZoom(galleryScale / 1.25); }
    if (event.key === "0") { event.preventDefault(); resetGalleryZoom(); }
  });

  image.addEventListener("wheel", (event) => {
    event.preventDefault();
    setGalleryZoom(galleryScale * Math.exp(-event.deltaY * 0.0012), event.clientX, event.clientY);
  }, { passive: false });
  image.addEventListener("dblclick", (event) => {
    setGalleryZoom(galleryScale > 1 ? 1 : 2, event.clientX, event.clientY);
  });
  image.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    image.setPointerCapture(event.pointerId);
    galleryPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (galleryPointers.size === 2) {
      const points = [...galleryPointers.values()];
      galleryPinchStart = { distance: Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y), scale: galleryScale };
      galleryDragStart = null;
    } else if (galleryScale > 1) {
      galleryDragStart = { id: event.pointerId, x: event.clientX, y: event.clientY, offset: { ...galleryOffset } };
    }
  });
  image.addEventListener("pointermove", (event) => {
    if (!galleryPointers.has(event.pointerId)) return;
    galleryPointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (galleryPointers.size >= 2 && galleryPinchStart) {
      const points = [...galleryPointers.values()];
      const distance = Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
      const midpoint = { x: (points[0].x + points[1].x) / 2, y: (points[0].y + points[1].y) / 2 };
      setGalleryZoom(galleryPinchStart.scale * distance / galleryPinchStart.distance, midpoint.x, midpoint.y);
    } else if (galleryDragStart?.id === event.pointerId && galleryScale > 1) {
      galleryOffset = { x: galleryDragStart.offset.x + event.clientX - galleryDragStart.x, y: galleryDragStart.offset.y + event.clientY - galleryDragStart.y };
      applyGalleryZoom();
    }
  });
  const endPointer = (event) => {
    galleryPointers.delete(event.pointerId);
    if (galleryPointers.size < 2) galleryPinchStart = null;
    if (!galleryPointers.has(galleryDragStart?.id)) galleryDragStart = null;
  };
  image.addEventListener("pointerup", endPointer);
  image.addEventListener("pointercancel", endPointer);
}

/* ==========================================================================
   08. INLINE VIDEO PLACEHOLDERS
   A click on a poster swaps it for the Bilibili player; restoreRotaryVideoCovers
   is the hook the keyboard-navigation script in index.html calls to put the
   poster back.
   ========================================================================== */

function showVideoPoster(player) {
  const button = document.createElement("button");
  button.className = "work-video-trigger";
  button.setAttribute("data-rotary-play", "");
  button.type = "button";
  const context = player.dataset.videoSequence ? ` (${player.dataset.videoSequence})` : player.dataset.videoYear ? ` (${player.dataset.videoYear})` : "";
  button.setAttribute("aria-label", `${player.dataset.playLabel}: ${player.dataset.videoTitle}${context}`);
  const image = document.createElement("img");
  image.src = player.dataset.videoThumbnail;
  image.alt = player.dataset.videoAlt;
  image.loading = "lazy";
  image.referrerPolicy = "no-referrer";
  const play = document.createElement("span");
  play.className = "work-play";
  play.setAttribute("aria-hidden", "true");
  play.textContent = "▶";
  button.append(image, play);
  button.addEventListener("click", () => playInlineVideo(player));
  player.replaceChildren(button);
}

function playInlineVideo(player, target = player) {
  const frame = document.createElement("iframe");
  frame.className = "inline-video-frame";
  frame.src = videoEmbedUrl(player.dataset.videoId, Number(player.dataset.videoPage) || videoCatalog[player.dataset.videoId].page);
  frame.title = `${player.dataset.videoTitle} · Bilibili`;
  frame.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
  frame.referrerPolicy = "strict-origin-when-cross-origin";
  frame.allowFullscreen = true;
  target.replaceChildren(frame);
}

function resetInlineVideo(item) {
  const player = item.querySelector(".work-player");
  if (player?.querySelector("iframe")) showVideoPoster(player);
}

window.restoreRotaryPlayingVideo = () => {
  if (byId("gallery-dialog").open && !byId("gallery-dialog-video-frame").hidden) {
    setGalleryVideoMode(false);
    return byId("gallery-dialog-video-toggle");
  }
  const frame = document.querySelector(".timeline-visual iframe,.work-player iframe");
  if (!frame) return null;
  const timeline = frame.closest(".timeline-visual");
  const player = frame.closest(".work-player");
  window.restoreRotaryVideoCovers();
  return timeline ? byId("timeline-list").querySelector(".timeline-video-trigger") : player.querySelector(".work-video-trigger");
};

window.restoreRotaryVideoCovers = () => {
  if (byId("timeline-list")?.querySelector(".timeline-visual iframe")) renderTimeline(currentCopy());
  document.querySelectorAll(".work-item").forEach(resetInlineVideo);
};

/* ==========================================================================
   09. LANGUAGE AND MENU
   ========================================================================== */

function updateMenuToggleLabel(copy) {
  const toggle = byId("menu-toggle");
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-label", copy[open ? "menuCloseLabel" : "menuOpenLabel"]);
}

// Applies one language everywhere: static copy in index.html, then the
// rendered sections. `updateAddress` is set when the visitor picks a language.
function applyLanguage(nextLanguage, updateAddress = false) {
  language = nextLanguage;
  const copy = currentCopy();
  document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
  document.title = copy.title;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = copy[element.dataset.i18nAria];
    if (value !== undefined) element.setAttribute("aria-label", value);
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((element) => {
    const value = copy[element.dataset.i18nAlt];
    if (value !== undefined) element.alt = value;
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  renderHeroCarousel(copy);
  renderTimeline(copy);
  renderWorks(copy);
  renderGallery(copy);
  byId("gallery-dialog-close").setAttribute("aria-label", copy.galleryCloseLabel);
  updateMenuToggleLabel(copy);
  updateHeroAutoplay(copy);
  if (updateAddress) {
    saveLanguage(language);
    try {
      const params = new URLSearchParams(location.search);
      params.set("lang", language);
      history.replaceState(null, "", `${location.pathname}?${params}${location.hash}`);
    } catch { /* Some local file previews do not allow URL changes. */ }
  }
}

function bindMenu() {
  const menuToggle = byId("menu-toggle");
  const mainNav = byId("main-nav");
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") !== "true";
    menuToggle.setAttribute("aria-expanded", String(expanded));
    updateMenuToggleLabel(currentCopy());
    mainNav.classList.toggle("is-open", expanded);
  });
  mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      updateMenuToggleLabel(currentCopy());
      mainNav.classList.remove("is-open");
    });
  });
}

/* ==========================================================================
   10. PAGE INIT
   ========================================================================== */

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
});

byId("hero-autoplay").addEventListener("click", () => {
  heroAutoplayEnabled = !heroAutoplayEnabled;
  const copy = currentCopy();
  renderHeroCarousel(copy);
  updateHeroAutoplay(copy);
});

document.addEventListener("visibilitychange", () => updateHeroAutoplay(currentCopy()));

bindGalleryViewer();
bindMenu();

window.addEventListener("popstate", () => applyLanguage(resolveInitialLanguage()));

applyLanguage(language);
