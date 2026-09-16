(() => {
  const replacements = {
    BV1WUL96PERL: 'BV15g411X7iF',
    BV1q34y1T7ex: 'BV1av4y147be',
    BV1wo7V6WE9G: 'BV1ggfDYLEjF',
    BV1sD7o6jEEQ: 'BV1JXLQ6XEKS',
    BV1WxME62EvF: 'BV1yP411R79a',
    BV11dKo6XEty: 'BV1w54y1C7et',
    BV15Qjk6xEqS: 'BV13q4y1a7mF',
  };

  const posterSources = {
    BV1WUL96PERL: 'https://i0.hdslb.com/bfs/archive/b600ae03842677c230fba5991c67ccd365b3f6ff.jpg',
    BV1q34y1T7ex: 'https://i0.hdslb.com/bfs/archive/a587adf4b5e96e3eae02bbbaab810151b599dbbb.jpg',
    BV1wo7V6WE9G: 'https://i1.hdslb.com/bfs/archive/7366eabfd74d81f6719b274b44f4f34cbe50f051.jpg',
    BV1HiT568EEQ: './images/lebron/first-crown-action.jpg',
    BV1v44y1n7br: './images/lebron/boston-game-6-cover.jpg',
    BV1sD7o6jEEQ: './images/lebron/heat-finals-action-cover.jpg',
    BV1WxME62EvF: 'https://i0.hdslb.com/bfs/archive/0275b17dd4ba7b4c08526065d2df35bdd1cade7d.jpg',
    BV11dKo6XEty: 'https://i0.hdslb.com/bfs/archive/b6ce6c36e3afcf0e9675ae10aae82fd1fe03a84e.jpg',
    BV15Qjk6xEqS: 'https://i2.hdslb.com/bfs/archive/82acc85e69799bc406f19a825792bede29441444.jpg',
    BV15W42197Ce: './images/lebron/video-paris.jpg',
  };

  const localPosterFallbacks = {
    BV1WUL96PERL: './images/lebron/video-block.jpg',
    BV1q34y1T7ex: './images/lebron/video-scoring.jpg',
    BV1wo7V6WE9G: './images/lebron/video-51.jpg',
    BV1HiT568EEQ: './images/lebron/first-crown-action.jpg',
    BV1v44y1n7br: './images/lebron/boston-game-6-cover.jpg',
    BV1sD7o6jEEQ: './images/lebron/heat-finals-action-cover.jpg',
    BV1WxME62EvF: './images/lebron/cavaliers-2008.jpg',
    BV11dKo6XEty: './images/lebron/video-2020.jpg',
    BV15Qjk6xEqS: './images/lebron/video-block.jpg',
    BV15W42197Ce: './images/lebron/video-paris.jpg',
  };

  const copyByRank = {
    7: {
      zh: {
        subtitle: '克利夫兰 · 首次总决赛',
        description: '22 岁时，他带领克利夫兰首次进入总决赛；赛后邓肯留下了那句“未来是你的”。',
      },
      en: {
        subtitle: 'CLEVELAND · FIRST FINALS',
        description: 'At 22, James takes Cleveland to its first Finals; afterward, Duncan leaves him with the line: “The future is yours.”',
      },
    },
    8: {
      zh: {
        subtitle: '湖人 · 2020 总冠军颁奖',
        description: '湖人赢得赛季第四座总冠军，颁奖典礼记录了詹姆斯在奥兰多泡泡赛区加冕的时刻。',
      },
      en: {
        subtitle: 'LAKERS · 2020 TITLE CEREMONY',
        description: 'The Lakers win a fourth title, and the ceremony records James being crowned in the Orlando bubble.',
      },
    },
  };

  const bvidByRank = {
    1: 'BV1WUL96PERL',
    2: 'BV1q34y1T7ex',
    3: 'BV1wo7V6WE9G',
    4: 'BV1HiT568EEQ',
    5: 'BV1v44y1n7br',
    6: 'BV1sD7o6jEEQ',
    7: 'BV1WxME62EvF',
    8: 'BV11dKo6XEty',
    9: 'BV15Qjk6xEqS',
    10: 'BV15W42197Ce',
  };

  const eraContent = {
    zh: {
      heading: '四次转身，四种比赛方式',
      aside: '时间线把球队迁移与比赛方式的变化放在同一条线上。',
      stages: [
        ['克利夫兰初章', '2003—2007'],
        ['迈阿密高峰', '2010—2012'],
        ['回到克利夫兰', '2014—2016'],
        ['洛杉矶与国际舞台', '2018—2024'],
      ],
    },
    en: {
      heading: 'Four moves. Four ways to play.',
      aside: 'The timeline connects each team move to the game it shaped.',
      stages: [
        ['CLEVELAND · FIRST CHAPTER', '2003—2007'],
        ['MIAMI · THE PEAK', '2010—2012'],
        ['CLEVELAND · HOMECOMING', '2014—2016'],
        ['LOS ANGELES + USA', '2018—2024'],
      ],
    },
  };

  const motionContent = {
    zh: [
      {
        text: '从爆发型新秀到覆盖攻防两端的核心，力量变成了持续承担比赛重量的能力。',
        link: 'NBA 生涯档案',
        href: 'https://www.nba.com/player/2544/lebron-james/bio',
      },
      {
        text: '他把前锋的身高变成传球角度，让视野成为组织进攻的第二引擎。',
        link: 'NBA 球员档案',
        href: 'https://www.nba.com/player/2544/lebron-james/bio',
      },
      {
        text: '2016 年总决赛第七场的追身封盖，是判断、身体控制与关键执行力的合流。',
        link: 'NBA 关键回合报道',
        href: 'https://api-hub.nba.com/news/history-finals-moments-lebron-chasedown-block-2016',
      },
      {
        text: '从 2003 初入联盟到打破历史得分纪录，长期稳定本身就是另一种统治力。',
        link: 'NBA 得分纪录报道',
        href: 'https://www.nba.com/news/lebron-james-sets-all-time-scoring-record-nba',
      },
    ],
    en: [
      {
        text: 'From explosive rookie to two-way anchor, strength became the ability to carry a game for years.',
        link: 'NBA career profile',
        href: 'https://www.nba.com/player/2544/lebron-james/bio',
      },
      {
        text: 'He turned a forward’s height into passing angles, making vision a second engine for offense.',
        link: 'NBA player profile',
        href: 'https://www.nba.com/player/2544/lebron-james/bio',
      },
      {
        text: 'The 2016 Finals Game 7 chase-down block fused anticipation, body control, and late-game execution.',
        link: 'NBA key-play report',
        href: 'https://api-hub.nba.com/news/history-finals-moments-lebron-chasedown-block-2016',
      },
      {
        text: 'From entering the league in 2003 to breaking the all-time scoring record, consistency became dominance.',
        link: 'NBA scoring record report',
        href: 'https://www.nba.com/news/lebron-james-sets-all-time-scoring-record-nba',
      },
    ],
  };

  const sourceUrl = (bvid) => `https://www.bilibili.com/video/${bvid}/`;
  const playerUrl = (bvid) =>
    `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&autoplay=0&high_quality=1`;

  function patchPoster(figure, originalBvid) {
    const poster = posterSources[originalBvid];
    const image = figure.querySelector('.lebron-poster img');
    if (!poster || !image || image.dataset.posterPatched === poster) return;

    image.dataset.posterPatched = poster;
    image.dataset.posterOriginal = image.src;
    image.src = poster;
    image.addEventListener('error', () => {
      const fallback = localPosterFallbacks[originalBvid];
      if (fallback && image.src !== new URL(fallback, document.baseURI).href) {
        image.src = fallback;
      }
    }, { once: true });
  }

  function patchCopy(figure) {
    const article = figure.closest('article[id^="lebron-moment-"]');
    const rank = article?.id.match(/lebron-moment-(\d+)/)?.[1];
    const copy = copyByRank[rank];
    if (!copy) return;

    const locale = document.documentElement.lang?.startsWith('en') ? 'en' : 'zh';
    const localized = copy[locale];
    const subtitle = article.querySelector('.lebron-moment-sub');
    const description = article.querySelector('.lebron-moment-text');
    if (subtitle && subtitle.textContent !== localized.subtitle) subtitle.textContent = localized.subtitle;
    if (description && description.textContent !== localized.description) description.textContent = localized.description;
  }

  function patchEra() {
    const section = document.querySelector('#eras');
    const head = section?.querySelector('.lebron-section-head');
    const rail = section?.querySelector('.lebron-era-rail');
    if (!section || !head || !rail) return;

    const locale = document.documentElement.lang?.startsWith('en') ? 'en' : 'zh';
    const copy = eraContent[locale];
    const heading = head.querySelector('h2');
    const aside = head.querySelector(':scope > p');
    if (heading && heading.textContent !== copy.heading) heading.textContent = copy.heading;
    if (aside && aside.textContent !== copy.aside) aside.textContent = copy.aside;

    let legend = section.querySelector('.lebron-era-map');
    if (!legend) {
      legend = document.createElement('div');
      legend.className = 'lebron-era-map';
      rail.before(legend);
    }

    copy.stages.forEach(([label, years], index) => {
      let item = legend.children[index];
      if (!item) {
        item = document.createElement('div');
        item.className = 'lebron-era-map-item';
        item.append(document.createElement('strong'), document.createElement('span'));
        legend.append(item);
      }
      item.children[0].textContent = label;
      item.children[1].textContent = years;
    });

    const image = rail.querySelector('article:nth-of-type(3) img');
    if (image) {
      image.src = './images/lebron/heat-2010-practice.jpg';
      image.alt = locale === 'en' ? '2010 · Miami · LeBron James' : '2010 · 新的舞台 · 勒布朗·詹姆斯';
    }
  }

  function patchLegacy() {
    const section = document.querySelector('#legacy');
    const image = section?.querySelector('.lebron-legacy-image img');
    const caption = section?.querySelector('.lebron-legacy-image figcaption');
    if (!section || !image) return;

    image.src = './images/lebron/i-promise-opening-day.jpg';
    image.alt = document.documentElement.lang?.startsWith('en')
      ? 'LeBron James welcomes students at the opening of I Promise School in Akron'
      : '詹姆斯在阿克伦 I Promise School 开学日迎接学生';
    if (caption) {
      caption.textContent = document.documentElement.lang?.startsWith('en')
        ? 'AKRON · I PROMISE SCHOOL OPENING · 2018'
        : '阿克伦 · I PROMISE SCHOOL 开学日 · 2018';
    }
  }

  function patchMotion() {
    const rail = document.querySelector('.lebron-motion-rail');
    if (!rail) return;

    const locale = document.documentElement.lang?.startsWith('en') ? 'en' : 'zh';
    const copy = motionContent[locale];
    [...rail.querySelectorAll('.lebron-motion-item')].slice(0, copy.length).forEach((item, index) => {
      const content = copy[index];
      let panel = item.querySelector('.lebron-motion-copy');
      if (!panel) {
        panel = document.createElement('div');
        panel.className = 'lebron-motion-copy';
        panel.append(document.createElement('p'), document.createElement('a'));
        item.append(panel);
      }
      panel.children[0].textContent = content.text;
      panel.children[1].textContent = `${content.link} ↗`;
      panel.children[1].href = content.href;
      panel.children[1].target = '_blank';
      panel.children[1].rel = 'noreferrer';
    });
  }

  function patchFigure(figure, originalBvid) {
    patchPoster(figure, originalBvid);
    patchCopy(figure);

    const replacement = replacements[originalBvid];
    const source = sourceUrl(replacement || originalBvid);
    figure.querySelectorAll('a[href*="bilibili.com/video/"]').forEach((link) => {
      if (link.href !== source) link.href = source;
    });
  }

  function patchIframe(iframe) {
    if (!(iframe instanceof HTMLIFrameElement)) return;

    let current;
    try {
      current = new URL(iframe.src).searchParams.get('bvid');
    } catch {
      return;
    }

    const replacement = replacements[current];
    if (!replacement || iframe.dataset.videoFallbackApplied === replacement) return;

    iframe.dataset.videoFallbackApplied = replacement;
    iframe.dataset.originalBvid = current;
    iframe.src = playerUrl(replacement);

    const figure = iframe.closest('figure');
    figure?.querySelectorAll('a[href*="bilibili.com/video/"]').forEach((link) => {
      link.href = sourceUrl(replacement);
    });
    if (figure) patchFigure(figure, current);
  }

  function patchNode(node) {
    if (!(node instanceof Element)) return;
    const figures = [];
    if (node.matches('figure.lebron-video-media')) figures.push(node);
    figures.push(...node.querySelectorAll('figure.lebron-video-media'));
    figures.forEach((figure) => {
      const article = figure.closest('article[id^="lebron-moment-"]');
      const rank = article?.id.match(/lebron-moment-(\d+)/)?.[1];
      const currentSource = figure.querySelector('a[href*="bilibili.com/video/"]')?.href || '';
      const originalBvid = Object.keys(posterSources).find((bvid) => currentSource.includes(bvid)) || bvidByRank[rank];
      if (originalBvid) patchFigure(figure, originalBvid);
    });
    node.querySelectorAll('iframe').forEach(patchIframe);
    patchEra();
    patchLegacy();
    patchMotion();
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        patchNode(node);
      });
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
  patchNode(document.documentElement);
  window.setTimeout(() => patchNode(document.documentElement), 0);
  window.setTimeout(() => patchNode(document.documentElement), 300);

  document.addEventListener('click', () => {
    window.requestAnimationFrame(() => patchNode(document.documentElement));
  });
})();
