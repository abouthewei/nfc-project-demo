const languages = {
  ko: {
    title: "G-DRAGON — 아티스트 아카이브",
    skip: "본문으로 건너뛰기", navStory: "이야기", navTimeline: "타임라인", navWorks: "작품", navArchive: "아카이브",
    heroKicker: "ARTIST ARCHIVE · 2006—2025", heroOverline: "무대 위의 이름, 권지용", heroIntro: "음악과 이미지, 태도와 변신. 한 사람의 이름이 하나의 장면이 되어온 시간.", heroLink: "아카이브 둘러보기", heroPhotoCaption: "ALIVE WORLD TOUR · 2012",
    storyMarker: "THE PERSONA", storyTitle: "이름을 넘어,<br />하나의 언어로.", storyLead: "권지용과 G-DRAGON. 두 이름 사이에서 음악은 스타일이 되고, 스타일은 다시 자기표현의 방식이 된다.", storyBody: "이 페이지는 한 아티스트의 시간을 음반과 무대, 그리고 변화의 순간으로 엮은 작은 편집 아카이브입니다. 시작부터 현재까지, 각 장면이 다음 장면의 가능성을 열어온 흐름을 따라갑니다.",
    timelineMarker: "A LIFE IN CHAPTERS", timelineTitle: "시간의 궤적", timelineIntro: "한 해가 하나의 장면이 되고,<br />장면은 다음 시대의 문을 연다.", timelineEnd: "다음 장은 아직 쓰이고 있습니다.",
    worksMarker: "SELECTED DISCOGRAPHY", worksTitle: "작품의 인덱스", worksIntro: "발매작을 따라가며<br />사운드의 변화를 듣습니다.", workFeatureKicker: "SELECTED WORK", workImageLabel: "EDITORIAL PORTRAIT · 2015", listenLink: "Apple Music에서 보기",
    archiveMarker: "THE VISUAL ARCHIVE", archiveTitle: "무대의 잔상", archiveIntro: "기록된 순간, 계속 움직이는 이미지.", gallery2017Title: "M.O.T.T.E WORLD TOUR", gallery2017Caption: "SYDNEY · 2017 — 무대의 스케일과 빛", gallery2015Title: "A MOMENT, IN COLOR", gallery2015Caption: "YEONGDONG EXPRESSWAY MUSIC FESTIVAL · 2015", galleryNote: "사진은 원본 기록을 바탕으로 사용했으며, 출처와 라이선스 정보는 하단 크레딧에서 확인할 수 있습니다.",
    closingLabel: "END OF THIS CHAPTER", closingTitle: "계속해서,<br /><em>다르게.</em>", closingText: "이 아카이브는 한 사람의 다음 장면을 기다립니다.", backToTop: "처음으로",
    footerDisclaimer: "독립적으로 제작된 팬 아카이브이며, 아티스트·소속사와 제휴 또는 공식 관계가 없습니다.", creditsLabel: "PHOTO CREDITS", sourceLabel: "REFERENCE", credit2012: "(2012 Alive World Tour · 색상/크롭 조정)", credit2015: "(2015 · 크롭 조정)", credit2017: "(2017 M.O.T.T.E 시드니 공연 · 색상/크롭 조정)", footerBack: "처음으로 ↑",
    timeline: [
      ["2006", "BIGBANG", "GROUP DEBUT", "그룹 BIGBANG의 데뷔와 함께 첫 장이 열립니다. 개인의 목소리는 팀의 무대 안에서 더 넓은 관객을 만납니다."],
      ["2009", "Heartbreaker", "SOLO DEBUT ALBUM", "첫 솔로 정규 앨범. 선명한 시각 언어와 전자음악의 질감으로 독립적인 아티스트의 출발을 알립니다."],
      ["2012", "One of a Kind", "EP · 2012", "타이틀곡과 함께 EP를 발표하며, 랩과 퍼포먼스가 하나의 대담한 캐릭터로 응축됩니다."],
      ["2013", "Coup d’Etat", "STUDIO ALBUM · 2013", "협업과 장르의 경계를 오가며, 팝의 규칙을 자기 방식으로 비트는 앨범을 선보입니다."],
      ["2017", "Kwon Ji Yong", "EP · M.O.T.T.E WORLD TOUR", "이름과 정체성을 전면에 놓은 EP, 그리고 개인의 이야기를 대형 무대로 확장한 월드투어."],
      ["2024", "POWER", "SINGLE · 2024", "솔로 싱글로 돌아와, 현재의 감각과 자기 인식을 짧고 응축된 형식으로 드러냅니다."],
      ["2025", "Übermensch", "STUDIO ALBUM · 2025", "새 정규 앨범. 지나온 페르소나를 돌아보면서도 다음 변화의 가능성을 열어둡니다."]
    ],
    works: [
      ["2009", "Heartbreaker", "STUDIO ALBUM", "솔로 아티스트 G-DRAGON의 첫 정규 앨범. 강한 비트와 대담한 스타일링으로 새로운 장을 엽니다.", "https://music.apple.com/us/album/heartbreaker/1337476494"],
      ["2012", "One of a Kind", "EP", "랩과 멜로디, 패션과 퍼포먼스가 하나의 시그니처로 응축된 EP.", "https://music.apple.com/us/album/one-of-a-kind-ep/1335980959"],
      ["2013", "Coup d’Etat", "STUDIO ALBUM", "장르를 넘나드는 프로덕션과 폭넓은 협업으로 완성한 정규 앨범.", "https://music.apple.com/us/album/coup-detat-one-of-a-kind-heartbreaker/740327399"],
      ["2017", "Kwon Ji Yong", "EP", "예명과 본명 사이를 오가며 자기 이야기를 펼쳐 보인 다섯 트랙의 EP.", "https://music.apple.com/us/album/kwon-ji-yong-ep/1246076503"],
      ["2024", "POWER", "SINGLE", "2024년 발표한 솔로 싱글. 짧은 형식 안에 현재의 에너지를 담았습니다.", "https://music.apple.com/us/album/power-single/1776670341"],
      ["2025", "Übermensch", "STUDIO ALBUM", "2025년 발표한 정규 앨범. 다시 쓰이는 정체성과 다음 장을 향한 움직임.", "https://music.apple.com/us/album/%C3%BCbermensch/1794882375"]
    ]
  },
  zh: {
    title: "G-DRAGON — 艺术家档案",
    skip: "跳转至正文", navStory: "人物", navTimeline: "时间线", navWorks: "作品", navArchive: "影像档案",
    heroKicker: "ARTIST ARCHIVE · 2006—2025", heroOverline: "舞台上的名字，权志龙", heroIntro: "音乐与影像、态度与蜕变。一个名字逐渐成为一个时代切面的过程。", heroLink: "进入档案", heroPhotoCaption: "ALIVE WORLD TOUR · 2012",
    storyMarker: "THE PERSONA", storyTitle: "超越名字，<br />成为一种语言。", storyLead: "权志龙与 G-DRAGON。在两个名字之间，音乐成为风格，风格又成为表达自我的方式。", storyBody: "这是一份小型编辑档案，以唱片、舞台和变化的瞬间串起一位艺术家的时间。从初次登场到今天，每个片段都为下一幕打开新的可能。",
    timelineMarker: "A LIFE IN CHAPTERS", timelineTitle: "时间的轨迹", timelineIntro: "一年成为一个片段，<br />片段又推开下一个时代。", timelineEnd: "下一章，仍在书写。",
    worksMarker: "SELECTED DISCOGRAPHY", worksTitle: "作品索引", worksIntro: "沿着正式发行作品，<br />聆听声音的变化。", workFeatureKicker: "SELECTED WORK", workImageLabel: "EDITORIAL PORTRAIT · 2015", listenLink: "在 Apple Music 收听",
    archiveMarker: "THE VISUAL ARCHIVE", archiveTitle: "舞台余像", archiveIntro: "被记录的瞬间，仍在流动的影像。", gallery2017Title: "M.O.T.T.E WORLD TOUR", gallery2017Caption: "SYDNEY · 2017 — 舞台的尺度与光线", gallery2015Title: "A MOMENT, IN COLOR", gallery2015Caption: "YEONGDONG EXPRESSWAY MUSIC FESTIVAL · 2015", galleryNote: "图片依据原始影像记录使用，摄影来源及授权信息见页面底部。",
    closingLabel: "END OF THIS CHAPTER", closingTitle: "继续向前，<br /><em>不断变化。</em>", closingText: "这份档案，等待着他的下一幕。", backToTop: "回到顶部",
    footerDisclaimer: "本页面为独立制作的粉丝档案，与艺人及其经纪公司无官方关联。", creditsLabel: "PHOTO CREDITS", sourceLabel: "REFERENCE", credit2012: "（2012 Alive World Tour · 调整色彩与裁切）", credit2015: "（2015 · 调整裁切）", credit2017: "（2017 M.O.T.T.E 悉尼场 · 调整色彩与裁切）", footerBack: "回到顶部 ↑",
    timeline: [
      ["2006", "BIGBANG", "GROUP DEBUT", "BIGBANG 组合出道，故事的第一章由此展开。个人声音在团队舞台中触达更广泛的观众。"],
      ["2009", "Heartbreaker", "SOLO DEBUT ALBUM", "首张个人录音室专辑。鲜明的视觉语言与电子音乐质感，宣告独立艺术家的起点。"],
      ["2012", "One of a Kind", "EP · 2012", "发行同名 EP，Rap 与舞台表演凝练成大胆而鲜明的个人形象。"],
      ["2013", "Coup d’Etat", "STUDIO ALBUM · 2013", "穿梭于合作与曲风之间，以自己的方式重写流行音乐的规则。"],
      ["2017", "Kwon Ji Yong", "EP · M.O.T.T.E WORLD TOUR", "将名字与身份置于作品中心，并通过世界巡演把个人叙事带上大型舞台。"],
      ["2024", "POWER", "SINGLE · 2024", "以个人单曲回归，在精炼的形式中呈现当下的感受与自我认知。"],
      ["2025", "Übermensch", "STUDIO ALBUM · 2025", "全新录音室专辑。回望一路走来的角色，也为下一次变化留下空间。"]
    ],
    works: [
      ["2009", "Heartbreaker", "STUDIO ALBUM", "G-DRAGON 的首张个人录音室专辑。强劲节拍与大胆造型，开启新的篇章。", "https://music.apple.com/us/album/heartbreaker/1337476494"],
      ["2012", "One of a Kind", "EP", "Rap、旋律、时尚与舞台表现凝练成标志性语言的一张 EP。", "https://music.apple.com/us/album/one-of-a-kind-ep/1335980959"],
      ["2013", "Coup d’Etat", "STUDIO ALBUM", "以跨越曲风的制作与多元合作完成的录音室专辑。", "https://music.apple.com/us/album/coup-detat-one-of-a-kind-heartbreaker/740327399"],
      ["2017", "Kwon Ji Yong", "EP", "在艺名与本名之间展开自我叙事的五首曲目 EP。", "https://music.apple.com/us/album/kwon-ji-yong-ep/1246076503"],
      ["2024", "POWER", "SINGLE", "2024 年发行的个人单曲，在精炼的形式中凝聚当下的能量。", "https://music.apple.com/us/album/power-single/1776670341"],
      ["2025", "Übermensch", "STUDIO ALBUM", "2025 年发行的录音室专辑。重新书写身份，继续走向下一章。", "https://music.apple.com/us/album/%C3%BCbermensch/1794882375"]
    ]
  },
  en: {
    title: "G-DRAGON — Artist Archive",
    skip: "Skip to content", navStory: "Portrait", navTimeline: "Timeline", navWorks: "Works", navArchive: "Archive",
    heroKicker: "ARTIST ARCHIVE · 2006—2025", heroOverline: "A name on stage: Kwon Ji Yong", heroIntro: "Music and image, attitude and reinvention. The years in which one name became its own cultural scene.", heroLink: "Explore the archive", heroPhotoCaption: "ALIVE WORLD TOUR · 2012",
    storyMarker: "THE PERSONA", storyTitle: "Beyond a name,<br />a language of his own.", storyLead: "Kwon Ji Yong and G-DRAGON. Between the two names, music becomes style, and style becomes a way of speaking for oneself.", storyBody: "This compact editorial archive traces an artist through records, stages, and moments of change. From the opening chapter to the present, each scene points toward the possibilities of the next.",
    timelineMarker: "A LIFE IN CHAPTERS", timelineTitle: "A timeline in motion", timelineIntro: "A year becomes a scene;<br />a scene opens another era.", timelineEnd: "The next chapter is still being written.",
    worksMarker: "SELECTED DISCOGRAPHY", worksTitle: "A works index", worksIntro: "Follow the releases<br />and hear the sound shift.", workFeatureKicker: "SELECTED WORK", workImageLabel: "EDITORIAL PORTRAIT · 2015", listenLink: "Listen on Apple Music",
    archiveMarker: "THE VISUAL ARCHIVE", archiveTitle: "Afterimages of the stage", archiveIntro: "Recorded moments; images still in motion.", gallery2017Title: "M.O.T.T.E WORLD TOUR", gallery2017Caption: "SYDNEY · 2017 — Scale and light on stage", gallery2015Title: "A MOMENT, IN COLOR", gallery2015Caption: "YEONGDONG EXPRESSWAY MUSIC FESTIVAL · 2015", galleryNote: "Photographs are presented from their original records. Photographer credits and license details appear below.",
    closingLabel: "END OF THIS CHAPTER", closingTitle: "Onward,<br /><em>otherwise.</em>", closingText: "This archive waits for the next scene.", backToTop: "Back to top",
    footerDisclaimer: "An independent fan archive, with no official affiliation with the artist or his agency.", creditsLabel: "PHOTO CREDITS", sourceLabel: "REFERENCE", credit2012: "(Alive World Tour, 2012 · color/crop adjusted)", credit2015: "(2015 · crop adjusted)", credit2017: "(M.O.T.T.E Sydney show, 2017 · color/crop adjusted)", footerBack: "BACK TO TOP ↑",
    timeline: [
      ["2006", "BIGBANG", "GROUP DEBUT", "The first chapter opens with BIGBANG’s debut. A distinct voice reaches a wider audience from within the group’s stage."],
      ["2009", "Heartbreaker", "SOLO DEBUT ALBUM", "A first solo studio album. A vivid visual language and electronic textures mark the start of an independent artist’s path."],
      ["2012", "One of a Kind", "EP · 2012", "The EP arrives with its title track, condensing rap and performance into a bold, singular character."],
      ["2013", "Coup d’Etat", "STUDIO ALBUM · 2013", "Moving across collaborations and genres, the album bends the rules of pop on its own terms."],
      ["2017", "Kwon Ji Yong", "EP · M.O.T.T.E WORLD TOUR", "An EP centered on name and identity, followed by a world tour that expands a personal story onto a large stage."],
      ["2024", "POWER", "SINGLE · 2024", "A solo single return, capturing a present-tense energy and self-awareness in a compact form."],
      ["2025", "Übermensch", "STUDIO ALBUM · 2025", "A new studio album. Looking back at earlier personas while leaving room for what comes next."]
    ],
    works: [
      ["2009", "Heartbreaker", "STUDIO ALBUM", "G-DRAGON’s first solo studio album. A new chapter shaped by forceful beats and daring style.", "https://music.apple.com/us/album/heartbreaker/1337476494"],
      ["2012", "One of a Kind", "EP", "An EP where rap, melody, fashion, and performance converge into a signature.", "https://music.apple.com/us/album/one-of-a-kind-ep/1335980959"],
      ["2013", "Coup d’Etat", "STUDIO ALBUM", "A studio album built across genres and a wide-ranging set of collaborations.", "https://music.apple.com/us/album/coup-detat-one-of-a-kind-heartbreaker/740327399"],
      ["2017", "Kwon Ji Yong", "EP", "Five tracks that tell a personal story between stage name and given name.", "https://music.apple.com/us/album/kwon-ji-yong-ep/1246076503"],
      ["2024", "POWER", "SINGLE", "A solo single released in 2024, gathering present-day energy into a compact form.", "https://music.apple.com/us/album/power-single/1776670341"],
      ["2025", "Übermensch", "STUDIO ALBUM", "A 2025 studio album: identity rewritten, with motion toward the next chapter.", "https://music.apple.com/us/album/%C3%BCbermensch/1794882375"]
    ]
  }
};

const byId = (id) => document.getElementById(id);
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
const urlLanguage = new URLSearchParams(location.search).get("lang");
let language = ["ko", "zh", "en"].includes(urlLanguage) ? urlLanguage : (localStorage.getItem("gdragon-language") || "ko");
let selectedWork = "2009";

function renderTimeline(copy) {
  const rail = byId("year-rail");
  const list = byId("timeline-list");
  rail.innerHTML = copy.timeline.map(([year]) => `<a href="#year-${year}">${year}</a>`).join("");
  list.innerHTML = copy.timeline.map(([year, title, tag, description]) => `
    <article class="timeline-item" id="year-${year}">
      <div class="timeline-year">${escapeHTML(year)}</div>
      <div class="timeline-content"><h3 class="timeline-title">${escapeHTML(title)}</h3><span class="timeline-tag">${escapeHTML(tag)}</span></div>
      <p class="timeline-description">${escapeHTML(description)}</p>
    </article>`).join("");
}

function renderWorks(copy) {
  const list = byId("work-list");
  list.innerHTML = copy.works.map(([year, title, kind], index) => `
    <button class="work-row" type="button" role="listitem" data-work-index="${index}" aria-pressed="${year === selectedWork}">
      <span class="work-year">${escapeHTML(year)}</span>
      <span><span class="work-title">${escapeHTML(title)}</span><span class="work-kind">${escapeHTML(kind)}</span></span>
      <span class="work-arrow" aria-hidden="true">↗</span>
    </button>`).join("");
  list.querySelectorAll("[data-work-index]").forEach((button) => {
    button.addEventListener("click", () => {
      selectedWork = copy.works[Number(button.dataset.workIndex)][0];
      renderWorks(copy);
    });
  });
  const work = copy.works.find(([year]) => year === selectedWork) || copy.works[0];
  byId("feature-year").textContent = work[0];
  byId("feature-title").textContent = work[1];
  byId("feature-description").textContent = work[3];
  byId("feature-link").href = work[4];
}

function applyLanguage(nextLanguage, updateAddress = false) {
  language = nextLanguage;
  const copy = languages[language];
  document.documentElement.lang = language === "zh" ? "zh-Hans" : language;
  document.title = copy.title;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = copy[element.dataset.i18n];
    if (value !== undefined) element.innerHTML = value;
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.language === language));
  });
  renderTimeline(copy);
  renderWorks(copy);
  if (updateAddress) {
    localStorage.setItem("gdragon-language", language);
    const params = new URLSearchParams(location.search);
    params.set("lang", language);
    history.replaceState(null, "", `${location.pathname}?${params}${location.hash}`);
  }
}

document.querySelectorAll("[data-language]").forEach((button) => {
  button.addEventListener("click", () => applyLanguage(button.dataset.language, true));
});
window.addEventListener("popstate", () => {
  const requested = new URLSearchParams(location.search).get("lang");
  applyLanguage(["ko", "zh", "en"].includes(requested) ? requested : (localStorage.getItem("gdragon-language") || "ko"));
});
applyLanguage(language);
