import { clans, dimensions, firePoints, hiddenPersonas, missions, personas, questions, routeModes, sourceNotes, stories } from './data.js?v=17';
import { calculateDimensions, getFirePoint, getMission, getRouteTasks, matchPersona, personaDistances } from './engine.js';
import { awardPointVisit, completeMission, finishTest, getJourney, saveJourneyPhoto, startNewJourney, track, updateJourney, answerQuestion } from './journey.js?v=16';
import { openTimeWeave } from './adapters.js?v=16';

const root = document.querySelector('#app');
const typeNames = {find:'寻找',observe:'观察',choice:'判断',photo:'拍照',story:'故事',companion:'同行',experience:'体验'};
const asset = (name) => new URL(`../../assets/${name}`, import.meta.url).href;
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
let questionTimer = 0;
let devAnswers = {};
let temporaryNotice = '';
let shareCardVisible = false;
let shareCardReturnScroll = 0;
let activeDimensionId = '';
let dimensionReturnScroll = 0;

function currentRoute() {
  const raw = window.location.hash.slice(1) || '/';
  const [path, query = ''] = raw.split('?');
  return { path: path || '/', params: new URLSearchParams(query) };
}

function go(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (window.location.hash === `#${normalized}`) render();
  else window.location.hash = normalized;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function dimensionScore(id) { return getJourney().dimensionScores?.[id]?.score ?? 50; }
function resultMatch() {
  const journey = getJourney();
  if (!journey.dimensionScores) return null;
  return matchPersona(journey.dimensionScores, journey.answers);
}
function currentPersona() {
  const journey = getJourney();
  return journey.hiddenPersonaId
    ? hiddenPersonas.find((item) => item.id === journey.hiddenPersonaId)
    : personas.find((item) => item.id === journey.personaId);
}
function currentClan() {
  const persona = currentPersona();
  return persona ? clans[persona.clanId] : null;
}
function personaArtPath(persona, clan = currentClan()) {
  return personas.some((item) => item.id === persona?.id)
    ? asset(`yaoge/paper/personas/${persona.id}.webp`)
    : asset(`yaoge/clans/${clan?.id || 'kiln'}.svg`);
}
const dimensionArtPath = (id) => `${asset(`yaoge/dimensions/painted/${id}.webp`)}?v=1`;
function seedPill() { return `<span class="seed-pill" aria-label="火种 ${getJourney().fireSeedCount}"><span aria-hidden="true">✦</span> 火种 ${getJourney().fireSeedCount}</span>`; }

function icon(name) {
  const shapes = {
    arrow:'<path d="M4 12h15M13 5l7 7-7 7"/>', back:'<path d="M20 12H5m7 7-7-7 7-7"/>', close:'<path d="m6 6 12 12M18 6 6 18"/>',
    pin:'<path d="M19 10c0 5.2-7 11-7 11S5 15.2 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
    camera:'<path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3"/>', share:'<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.3 10.8 7.2-4.5m-7.2 7.4 7.2 4.5"/>',
    reset:'<path d="M4 7v5h5M5.2 12a7 7 0 1 0 1.6-4.5L4 10"/>', kiln:'<path d="M4 20V10l8-6 8 6v10M8 20v-6a4 4 0 0 1 8 0v6"/>',
    check:'<path d="m5 12 4 4L19 6"/>', flame:'<path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-8-.2 3-2 4-3 4 0-4-2-7-5-9 1 5-3 8-3 13 0 4 3 7 8 7Z"/>'
  };
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${shapes[name] || ''}</svg>`;
}

function personaMark(mark = 'eye', className = '') {
  const art = {
    eye:'<path d="M2.8 12s3.1-5 9.2-5 9.2 5 9.2 5-3.1 5-9.2 5-9.2-5-9.2-5Z"/><circle cx="12" cy="12" r="2.5"/>',
    tool:'<path d="M7 4v5m4-5v5M5 9h8v2a4 4 0 0 1-4 4h0v5m9-16v7a3 3 0 0 1-3 3h-1"/>',
    hand:'<path d="M7 13V6a1.5 1.5 0 0 1 3 0v5-7a1.5 1.5 0 0 1 3 0v7-5a1.5 1.5 0 0 1 3 0v6-3a1.5 1.5 0 0 1 3 0v6c0 4-2 6-6 6h-1c-2 0-3-1-4-3l-2-3a1.5 1.5 0 0 1 2-2Z"/>',
    flame:'<path d="M12 22c4.2 0 7-2.8 7-6.8 0-2.8-1.8-4.8-4.3-7.8-.1 2.9-1.6 4.1-2.6 4.6.2-4-1.3-6.8-4.1-9-0.3 4.2-3 6.8-3 11.7C5 19 7.7 22 12 22Z"/>',
    wheel:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="5.3"/><circle cx="12" cy="12" r="1.6"/>',
    finger:'<path d="M8 18c1-2 2-3 4-3s3 1 4 3M10 10a2 2 0 1 0 4 0 2 2 0 0 0-4 0Zm-4 8c-.5-3 0-6 1-8m11 8c.5-3 0-6-1-8"/>',
    grid:'<rect x="4" y="4" width="7" height="7"/><rect x="13" y="4" width="7" height="7"/><rect x="4" y="13" width="7" height="7"/><rect x="13" y="13" width="7" height="7"/>',
    door:'<path d="M4 20V10l8-6 8 6v10M8 20v-6a4 4 0 0 1 8 0v6"/><circle cx="14.5" cy="14" r=".6"/>',
    jar:'<path d="M9 4h6m-5 0v3L7 9v8c0 2 2 3 5 3s5-1 5-3V9l-3-2V4M7 12h10"/>',
    face:'<path d="M6 9a6 6 0 1 1 12 0v5c0 3-2.7 6-6 6s-6-3-6-6V9Z"/><path d="M9 12h.1M15 12h.1M9.5 16c1.5 1 3.5 1 5 0"/>',
    ember:'<circle cx="12" cy="12" r="8"/><path d="M12 18c2.2-1.2 3.3-2.8 3.3-4.8 0-1.5-.8-2.7-2.2-4.4-.1 1.5-.8 2.3-1.5 2.6.1-2.2-.7-3.7-2.2-4.9-.2 2.3-1.7 3.8-1.7 6.6 0 2.2 1.6 4.2 4.3 4.9Z"/>',
    eyes:'<path d="M3 9s2-3 5-3 5 3 5 3-2 3-5 3-5-3-5-3Zm8 6s2-3 5-3 5 3 5 3-2 3-5 3-5-3-5-3Z"/><circle cx="8" cy="9" r="1"/><circle cx="16" cy="15" r="1"/>',
    dragon:'<path d="M4 7c3-4 8-3 10 0 1 2 4 1 6 0-1 3-3 4-6 4 1 2 3 3 5 3-2 2-5 2-7 0l-2 5-2-4-4 2 2-5-4-2 5-1Z"/>'
  };
  return `<svg class="persona-mark ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.45" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${art[mark] || art.eye}</svg>`;
}

function topBar(back = '/', right = '') {
  return `<header class="topbar"><button type="button" class="icon-button" data-go="${esc(back)}" aria-label="返回">${icon('back')}</button><a href="#/" class="wordmark" aria-label="古灶行当首页">南风古灶 <span>·</span> 古灶行当</a><span class="topbar-right">${right}</span></header>`;
}

function appFooter() {
  return `<footer class="app-footer"><a href="../">南风开窑记</a></footer>`;
}

function renderLanding() {
  const journey = getJourney();
  const answeredCount = Object.keys(journey.answers).length;
  const hasSavedResult = Boolean(journey.dimensionScores && (journey.personaId || journey.hiddenPersonaId));
  const canResume = answeredCount > 0 && answeredCount < questions.length;
  return `<section class="screen landing-screen" aria-label="古灶行当测试入口">
    <img class="landing-scene" src="${asset('yaoge/paper/kiln-potter-scene.webp')}" alt="南风古灶龙窑、陶器与拉坯师傅" fetchpriority="high">
    <header class="landing-top"><span class="landing-brand">南风古灶 <i>·</i> 古灶行当</span><a href="#/result" class="landing-my-result" ${hasSavedResult ? '' : 'hidden'}>我的行当</a></header>
    <div class="landing-copy"><h1><span>重生到古灶</span><strong>你会干哪行？</strong></h1><p class="landing-slogan">五百年窑火，照见你在古灶的哪一行。</p></div>
    <div class="landing-actions">
      <button type="button" class="primary-button landing-cta clay-cta" ${hasSavedResult ? 'data-go="/result"' : 'data-action="start-test"'}>${hasSavedResult ? '查看我的结果' : canResume ? '继续入窑' : '开始入窑'}${icon('arrow')}</button>
      <p class="landing-meta">约 2 分钟 <span>·</span> 找到你的古灶行当</p>
    </div>
    <div class="landing-bottom"><p>本测试为文化娱乐互动体验，并非心理学诊断。</p></div>
  </section>`;
}

function renderTest() {
  const journey = getJourney();
  const questionIndex = Math.min(Number(currentRoute().params.get('q') || 0), questions.length - 1);
  const question = questions[Math.max(0, questionIndex)];
  const selected = journey.answers[question.id];
  const progress = Object.keys(journey.answers).length;
  const percent = Math.round((questionIndex / questions.length) * 100);
  return `<section class="screen quiz-screen">
    <div class="quiz-art-stage"><img class="quiz-scene" src="${asset('yaoge/paper/kiln-potter-scene.webp')}" alt="拉坯师傅与南风古灶窑场"><div class="quiz-art-wash"></div>${topBar('/')}</div>
    <div class="quiz-paper-panel">
      <div class="quiz-progress"><div class="progress-caption"><span>古灶行当测试</span><span>${String(questionIndex + 1).padStart(2,'0')}<i>/</i>${String(questions.length).padStart(2,'0')}</span></div><div class="progress-track"><span style="width:${Math.max(5, percent)}%"></span></div><p>答案只影响你本次的结果，不显示对错。</p></div>
      <div class="question-area" data-question-index="${questionIndex}"><div class="question-number">Q${String(questionIndex + 1).padStart(2,'0')}</div><h1>${esc(question.title)}</h1>
        <div class="answer-list" role="radiogroup" aria-label="选择一个答案">${question.options.map((option, index) => `<button type="button" class="answer-option ${selected === option.id ? 'is-selected' : ''}" role="radio" aria-checked="${selected === option.id}" data-answer="${option.id}" data-question="${question.id}" data-option-index="${index}"><span class="answer-letter">${String.fromCharCode(65 + index)}</span><span>${esc(option.text)}</span><span class="answer-check">${icon('check')}</span></button>`).join('')}</div>
      </div>
      <div class="quiz-bottom"><button type="button" class="text-button quiz-nav-button quiz-prev" data-action="previous-question" ${questionIndex === 0 ? 'disabled' : ''}>${icon('back')} 上一题</button><span>已作答 ${progress}</span><button type="button" class="text-button quiz-nav-button quiz-next" data-action="skip-question" ${selected ? '' : 'disabled'}>下一题 ${icon('arrow')}</button></div>
    </div>
  </section>`;
}

function radarMarkup(scores) {
  const cx = 110, cy = 110, radius = 80;
  const points = dimensions.map((dimension, index) => {
    const angle = (-90 + index * 60) * Math.PI / 180;
    const value = (scores?.[dimension.id]?.score ?? 50) / 100;
    return [cx + Math.cos(angle) * radius * value, cy + Math.sin(angle) * radius * value];
  });
  const polygon = (scale) => dimensions.map((_, index) => {
    const angle = (-90 + index * 60) * Math.PI / 180;
    return `${cx + Math.cos(angle) * radius * scale},${cy + Math.sin(angle) * radius * scale}`;
  }).join(' ');
  return `<svg class="radar" viewBox="0 0 220 220" role="img" aria-label="六维做事倾向雷达图">
    <polygon class="radar-grid" points="${polygon(1)}"/><polygon class="radar-grid" points="${polygon(.66)}"/><polygon class="radar-grid" points="${polygon(.33)}"/>
    ${dimensions.map((_, index) => { const angle = (-90 + index * 60) * Math.PI / 180; return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${cx + Math.cos(angle)*radius}" y2="${cy + Math.sin(angle)*radius}"/>`; }).join('')}
    <polygon class="radar-shape" points="${points.map(([x,y])=>`${x},${y}`).join(' ')}"/>${points.map(([x,y])=>`<circle class="radar-dot" cx="${x}" cy="${y}" r="3"/>`).join('')}
    ${dimensions.map((dimension,index)=>{const angle=(-90+index*60)*Math.PI/180;return `<text class="radar-label" x="${cx+Math.cos(angle)*104}" y="${cy+Math.sin(angle)*104+4}">${dimension.name}</text>`;}).join('')}
  </svg>`;
}

function dimensionsList(scores) {
  return `<div class="dimension-list">${dimensions.map((dimension) => {
    const score = scores?.[dimension.id]?.score ?? 50;
    const label = score > 55 ? dimension.high : score < 45 ? dimension.low : '平衡';
    return `<div class="dimension-row"><div class="dimension-label"><span class="dimension-name"><img src="${dimensionArtPath(dimension.id)}" alt="" aria-hidden="true">${dimension.name}</span><strong>${label}</strong></div><div class="dimension-bar"><span style="width:${score}%"></span><i style="left:${score}%"></i></div><div class="dimension-ends"><span>${dimension.low}</span><span>${dimension.high}</span></div></div>`;
  }).join('')}</div>`;
}

function renderResult() {
  const journey = getJourney();
  const persona = currentPersona();
  if (!journey.dimensionScores || !persona) return `<section class="screen"><div class="empty-state">先完成古灶行当测试，再来看结果。<button class="primary-button" data-go="/test">开始测试</button></div></section>`;
  const clan = currentClan();
  const isHidden = Boolean(journey.hiddenPersonaId);
  const companion = !isHidden ? personas.find((item) => item.id === persona.companionId) : null;
  const source = isHidden ? persona.source : ({
    historical_term: '资料中的真实称谓',
    craft_based_persona: '以真实工艺为原型',
    product_persona: '产品创作的行当原型'
  }[persona.historicalType] || '南风古灶文化原型');
  const portrait = `<img class="result-art ${isHidden ? 'result-art-mark' : ''}" src="${personaArtPath(persona, clan)}" alt="${esc(persona.name)}的陶艺风格造型" fetchpriority="high">`;
  return `<section class="screen result-screen">
    <section class="result-poster" aria-label="你的古灶行当结果">
      <img class="result-scene" src="${asset('yaoge/paper/result-kiln-courtyard.webp')}" alt="南风古灶的龙窑、陶器与榕树庭院">
      <header class="result-poster-top"><button type="button" class="poster-back" data-go="/" aria-label="返回首页">${icon('back')}</button><span>南风古灶 <i>·</i> 古灶行当</span><span class="poster-brand">我的结果</span></header>
      <div class="result-badge"><img src="${asset(`yaoge/clans/${clan?.id || 'kiln'}.svg`)}" alt=""><span>${esc(clan?.name || '古灶行当')} · 职业原型</span></div>
      ${portrait}
      <div class="result-poster-copy"><span>你的古灶行当原型</span><h1>${esc(persona.name)}</h1><p>${esc(persona.slogan)}</p></div>
    </section>
    <div class="result-content">
      <section class="result-section result-likeness"><div class="section-heading"><span>01</span><h2>这很像你</h2></div><ul class="keyword-list">${(persona.keywords || []).map((word) => `<li>${esc(word)}</li>`).join('')}</ul>${(persona.descriptions || []).map((paragraph) => `<p class="body-copy">${esc(paragraph)}</p>`).join('')}</section>
      <section class="result-overview" aria-label="古灶行当结果摘要">
        ${isHidden ? `<aside class="hidden-note">隐藏行当原型 <span>${esc(persona.criteria || '')}</span></aside>` : ''}
        <section class="result-section result-six-panel"><div class="section-heading"><span>02</span><h2>你的做事倾向</h2></div><div class="result-six-grid" aria-label="六维做事倾向">${dimensions.map((dimension) => `<button type="button" class="result-six-item" data-action="show-dimension" data-dimension="${dimension.id}" aria-label="查看${esc(dimension.name)}属性说明，${dimensionScore(dimension.id)}分" aria-haspopup="dialog"><img src="${dimensionArtPath(dimension.id)}" alt="" aria-hidden="true"><span>${esc(dimension.name)}</span><strong class="dimension-score">${dimensionScore(dimension.id)}<small>分</small></strong></button>`).join('')}</div></section>
        <section class="result-section result-dimensions"><div class="section-heading"><span>03</span><h2>你的做事倾向图</h2></div><div class="radar-layout">${radarMarkup(journey.dimensionScores)}<p>这是一张选择倾向图。每一维都会随情境改变，没有好坏之分。</p></div></section>
        <div class="result-actions"><button type="button" class="primary-button clay-cta result-generate" data-action="generate-card">${shareCardVisible ? '查看我的古灶行当卡' : '生成我的古灶行当卡'}${icon('arrow')}</button><button type="button" class="secondary-button" data-action="restart-test">重新测一次</button></div>
        <p class="notice-line" data-share-notice aria-live="polite">${esc(temporaryNotice)}</p>
      </section>
      <section class="result-intro paper-panel"><p class="section-kicker">${esc(source)}</p><p>${esc(persona.culture || '')}</p><p class="result-disclaimer">这些行当是文化体验中的职业原型，不代表你的真实历史身份。</p></section>
      ${companion ? `<section class="companion-panel paper-panel"><span class="companion-label">你的窑友</span><div class="companion-row"><img class="companion-art" src="${personaArtPath(companion, clans[companion.clanId])}" alt="${esc(companion.name)}的陶艺风格造型" loading="lazy"><div><h3>${esc(companion.name)}</h3><p>${esc(persona.companionLine)}</p></div></div></section>` : ''}
      <p class="result-disclaimer result-disclaimer-bottom">本体验仅供文化娱乐，不是心理学诊断。</p>
      ${appFooter()}
    </div>
  </section>`;
}

function renderShareCardModal(persona) {
  return `<div class="share-card-modal" data-share-backdrop><section class="share-card-dialog" id="share-card-area" role="dialog" aria-modal="true" aria-labelledby="share-card-title" tabindex="-1"><header class="share-card-top"><span>南风古灶 · 行当卡</span><button type="button" class="share-card-close" data-action="close-share-card" aria-label="关闭行当卡">${icon('close')}</button></header><div class="share-card-heading"><p class="section-kicker">把今天这一窑带走</p><h2 id="share-card-title">我的古灶行当卡</h2><p>卡片只在当前页面生成，不会上传。</p></div><div class="share-canvas-wrap"><canvas id="share-canvas" width="1080" height="2500" aria-label="${esc(persona.name)}古灶行当卡，包含职业画像、这很像你、六维做事倾向分数和做事倾向图"></canvas></div><div class="share-card-actions"><button class="primary-button clay-cta" data-action="download-card">保存行当卡 ${icon('arrow')}</button><button class="secondary-button" data-action="share-card">${icon('share')} 分享给窑友</button></div><p class="notice-line" data-share-notice aria-live="polite">${esc(temporaryNotice)}</p></section></div>`;
}

function renderDimensionModal(dimension) {
  if (!dimension) return '';
  const score = dimensionScore(dimension.id);
  const tendency = score > 55 ? dimension.high : score < 45 ? dimension.low : '平衡';
  const interpretation = score > 55
    ? dimension.highMeans
    : score < 45
      ? dimension.lowMeans
      : `你在“${dimension.low}”与“${dimension.high}”之间留有弹性，可以按具体情境选择。`;
  return `<div class="share-card-modal" data-dimension-backdrop><section class="dimension-detail-dialog" role="dialog" aria-modal="true" aria-labelledby="dimension-detail-title" aria-describedby="dimension-detail-summary" tabindex="-1"><header class="share-card-top"><span>做事倾向 · ${esc(dimension.english)}</span><button type="button" class="share-card-close" data-action="close-dimension-detail" aria-label="关闭属性说明">${icon('close')}</button></header><div class="dimension-detail-content"><div class="dimension-detail-art" data-dimension="${dimension.id}"><img src="${dimensionArtPath(dimension.id)}" alt="" aria-hidden="true"></div><p class="section-kicker">六维做事倾向</p><h2 id="dimension-detail-title">${esc(dimension.name)}</h2><div class="dimension-detail-score"><strong>${score}</strong><span>分</span><i>${esc(tendency)}</i></div><p id="dimension-detail-summary" class="dimension-detail-summary">${esc(interpretation)}</p><div class="dimension-detail-range"><div><span>${esc(dimension.low)}</span><p>${esc(dimension.lowMeans)}</p></div><div><span>${esc(dimension.high)}</span><p>${esc(dimension.highMeans)}</p></div></div><p class="dimension-detail-note">分数呈现本次选择倾向，不是固定标签。</p></div></section></div>`;
}

function modeCard(mode, selected) {
  return `<button type="button" class="mode-option ${selected === mode.id ? 'is-selected' : ''}" data-mode="${mode.id}" aria-pressed="${selected === mode.id}"><span><strong>${mode.name}</strong><small>约 ${mode.minutes} 分钟 · ${mode.count} 个火点</small></span><span class="mode-chevron">${icon('arrow')}</span><em>${esc(mode.summary)}</em></button>`;
}

function missionCard(mission, index, journey) {
  const point = getFirePoint(mission.firePointId);
  const complete = journey.completedMissionIds.includes(mission.id);
  const visited = journey.visitedFirePointIds.includes(point.id);
  return `<a class="mission-row ${complete ? 'is-complete' : ''}" href="#/mission/${encodeURIComponent(mission.id)}"><span class="mission-order">${String(index+1).padStart(2,'0')}</span><span class="mission-row-copy"><small>${esc(point.title)} · ${esc(typeNames[mission.type] || mission.type)}</small><strong>${esc(mission.title)}</strong><span>${esc(mission.instruction)}</span></span><span class="mission-status">${complete ? icon('check') : visited ? '进行中' : icon('arrow')}</span></a>`;
}

function renderMissionHome() {
  const journey = getJourney();
  if (!journey.personaId && !journey.hiddenPersonaId) return `<section class="screen"><div class="empty-state">先完成古灶行当测试，才能开启专属游程。<button class="primary-button" data-go="/test">去做测试</button></div></section>`;
  const route = getRouteTasks(journey.personaId || journey.hiddenPersonaId, journey.routeMode || 'light');
  const mode = routeModes.find((item) => item.id === journey.routeMode) || routeModes[0];
  const persona = currentPersona();
  const progress = journey.completedMissionIds.filter((id) => route.some((item) => item.id === id)).length;
  const canOpen = journey.fireSeedCount >= 7 && progress >= 3;
  const nextTask = route.find((item) => !journey.completedMissionIds.includes(item.id));
  const nextTaskVisited = nextTask && journey.visitedFirePointIds.includes(nextTask.firePointId);
  const nextActionLabel = nextTaskVisited ? '继续当前任务' : progress > 0 ? '去下一站' : '去第一站';
  return `<section class="screen journey-screen">${topBar('/result',seedPill())}
    <div class="journey-heading"><p class="section-kicker">专属轻游 · ${esc(persona.name)}</p><h1>领取你的<br>南风窑令</h1><p>带着你的行当气质，去找真实的窑火与陶。</p></div>
    <section class="mode-section"><div class="section-heading"><span>路程</span><h2>选一种逛法</h2></div><div class="mode-list">${routeModes.map((modeItem)=>modeCard(modeItem,journey.routeMode||'light')).join('')}</div></section>
    <div class="route-summary"><div><strong>${progress} / ${route.length}</strong><span>项任务完成</span></div><div><strong>${journey.visitedFirePointIds.length} / 8</strong><span>个火点到访</span></div><div><strong>${journey.fireSeedCount}</strong><span>枚火种</span></div></div>
    <div class="journey-cta">${canOpen ? `<button class="primary-button" data-go="/kiln-opening">火种齐了，开灶 ${icon('arrow')}</button>` : nextTask ? `<button class="primary-button" data-go="/mission/${encodeURIComponent(nextTask.id)}">${nextActionLabel} ${icon('arrow')}</button><p>下一站：${esc(nextTask.title)}。到达火点 +1 火种，完成任务再 +1；还差 ${Math.max(0,7-journey.fireSeedCount)} 枚即可开灶。</p>` : `<button class="primary-button" data-go="/kiln-opening">查看开灶结果 ${icon('arrow')}</button>`}</div>
    <div class="mission-list-heading"><div><p class="section-kicker">${mode.minutes} 分钟左右</p><h2>你的游览任务</h2></div><button class="text-button" data-go="/map">看八个火点 ${icon('arrow')}</button></div>
    <div class="mission-list">${route.map((task,index)=>missionCard(task,index,journey)).join('')}</div>
    <section class="seed-logic"><span class="seed-icon">✦</span><div><h3>收集火种</h3><p>完成测试、确认到达火点、完成任务，各得 1 枚火种。集齐 7 枚，开灶。</p></div></section>
    <div class="journey-bottom-actions"><button class="secondary-button" data-go="/my-kiln">我的旅程</button><button class="secondary-button" data-action="reset-journey">重置旅程</button></div>${appFooter()}
  </section>`;
}

function renderMissionDetail(missionId) {
  const journey = getJourney();
  const mission = getMission(missionId);
  if (!mission) return `<section class="screen"><div class="empty-state">没有找到这项任务。<button class="primary-button" data-go="/mission">回任务列表</button></div></section>`;
  const point = getFirePoint(mission.firePointId);
  const arrived = journey.visitedFirePointIds.includes(point.id);
  const done = journey.completedMissionIds.includes(mission.id);
  const notes = journey.missionNotes?.[mission.id] || '';
  const photo = journey.photos.find((item) => item.firePointId === point.id);
  const story = stories.find((item) => item.id === mission.storyId);
  const storyUnlocked = journey.fireSeedCount >= 5 && journey.unlockedStoryIds.includes(mission.storyId);
  const choice = journey.missionChoices?.[mission.id] || '';
  return `<section class="screen mission-detail-screen">${topBar('/mission',seedPill())}
    <div class="mission-hero"><p class="section-kicker">${esc(point.title)} · ${esc(typeNames[mission.type] || mission.type)}</p><h1>${esc(mission.title)}</h1><p>${esc(mission.instruction)}</p><div class="location-line">${icon('pin')}<span>${esc(point.locationHint)}</span></div></div>
    <section class="arrival-panel ${arrived ? 'is-arrived' : ''}"><div class="arrival-symbol">${arrived ? icon('check') : icon('pin')}</div><div><strong>${arrived ? '火点已记录' : '确认你已到达'}</strong><p>${arrived ? '这一处火点已经为你留下。' : '请在现场找到这个火点，再领取到访火种。'}</p></div><button type="button" class="secondary-button" data-action="arrive" data-point="${point.id}" data-story="${mission.storyId || ''}" ${arrived ? 'disabled' : ''}>${arrived ? '已到达' : '我已到达'}</button></section>
    ${mission.type === 'choice' ? `<div class="mission-interaction"><h2>${esc(mission.prompt)}</h2><div class="mission-choices">${mission.choices.map((item)=>`<button class="choice-chip ${choice === item ? 'is-selected' : ''}" data-choice="${esc(item)}" data-mission="${mission.id}">${esc(item)}</button>`).join('')}</div>${choice ? `<p class="soft-reveal">${esc(mission.reveal)}</p>` : ''}</div>` : ''}
    ${mission.type === 'photo' ? `<div class="mission-interaction photo-interaction"><h2>${esc(mission.prompt)}</h2>${photo ? `<img class="journey-photo-preview" src="${photo.dataUrl}" alt="本次旅程照片"><button class="text-button" data-action="remove-photo" data-point="${point.id}">移除照片</button>` : ''}<label class="upload-photo-button">${icon('camera')}<span>${photo ? '换一张照片' : '拍照或从相册选择'}</span><input type="file" accept="image/*" capture="environment" data-photo-point="${point.id}" aria-label="拍摄或选择景区照片"></label><small>图片只在当前页面保留，重新打开后会清除。</small></div>` : ''}
    ${mission.type === 'companion' ? `<div class="mission-interaction"><h2>${esc(mission.prompt)}</h2><textarea class="mission-note" maxlength="120" data-note="${mission.id}" placeholder="${esc(mission.prompt)}">${esc(notes)}</textarea></div>` : ''}
    ${!['choice','photo','companion'].includes(mission.type) ? `<div class="mission-interaction"><h2>${esc(mission.prompt)}</h2><textarea class="mission-note" maxlength="120" data-note="${mission.id}" placeholder="留一句此刻的观察（可选）">${esc(notes)}</textarea></div>` : ''}
    ${story && storyUnlocked ? `<aside class="story-reveal"><div class="story-reveal-head"><span>窑火故事</span><span>已解锁</span></div><h2>${esc(story.title)}</h2><p>${esc(story.body)}</p><small>${esc(story.source)}</small></aside>` : ''}
    ${done ? `<div class="mission-reveal"><span>观察之后</span><p>${esc(mission.reveal)}</p></div>` : ''}
    <div class="mission-complete-area">${done ? `<div class="complete-stamp">${icon('check')} 这项任务已完成</div>` : `<button class="primary-button" data-action="complete-mission" data-mission="${mission.id}" data-story="${mission.storyId || ''}" ${!arrived || (mission.type === 'choice' && !choice) || (mission.type === 'photo' && !photo) ? 'disabled' : ''}>${esc(mission.completeLabel)} · 火种 +1 ${icon('arrow')}</button><p>${!arrived ? '到达火点后可完成任务。' : mission.type === 'photo' && !photo ? '添加一张照片后即可完成。' : mission.type === 'choice' && !choice ? '先选一个想法，没有标准答案。' : '没有正确或错误，带走你看到的东西。'}</p>`}</div>
    <div class="mission-detail-footer"><button class="secondary-button" data-go="/mission">回任务清单</button><button class="secondary-button" data-go="/map?point=${point.id}">查看火点</button></div>${appFooter()}
  </section>`;
}

function renderMap(pointId = '') {
  const journey = getJourney();
  const selected = pointId ? getFirePoint(pointId) : null;
  const pointList = firePoints.map((point,index)=>`<a href="#/map?point=${encodeURIComponent(point.id)}" class="firepoint-row ${journey.visitedFirePointIds.includes(point.id) ? 'is-visited' : ''}"><span class="firepoint-number">${String(index+1).padStart(2,'0')}</span><span class="firepoint-copy"><strong>${esc(point.title)}</strong><small>${esc(point.subtitle)}</small><span>${esc(point.description)}</span></span><span class="firepoint-state">${journey.visitedFirePointIds.includes(point.id) ? icon('check') : icon('arrow')}</span></a>`).join('');
  const selectedMissions = selected ? selected.missions.map((id)=>getMission(id)).filter(Boolean) : [];
  return `<section class="screen map-screen">${topBar('/mission',seedPill())}
    <div class="map-heading"><p class="section-kicker">沿着窑火走</p><h1>八个火点</h1><p>这是内容导览，不是实时导航。实际位置请看景区现场标识。</p></div>
    ${selected ? `<section class="point-detail"><button class="text-button" data-go="/map">${icon('back')} 所有火点</button><p class="section-kicker">${esc(selected.subtitle)}</p><h2>${esc(selected.title)}</h2><p>${esc(selected.description)}</p><div class="topic-list">${selected.culturalTopics.map((topic)=>`<span>${esc(topic)}</span>`).join('')}</div><p class="location-line">${icon('pin')}${esc(selected.locationHint)}</p><h3>相关任务</h3>${selectedMissions.map((mission)=>`<a class="point-mission-link" href="#/mission/${mission.id}"><span>${esc(mission.title)}</span>${icon('arrow')}</a>`).join('')}</section>` : `<div class="firepoint-list">${pointList}</div>`}
    <div class="map-actions"><button class="primary-button" data-go="/mission">回到我的窑令 ${icon('arrow')}</button></div>${appFooter()}
  </section>`;
}

function renderKilnOpening() {
  const journey = getJourney();
  const persona = currentPersona();
  const clan = currentClan();
  if (!persona || journey.fireSeedCount < 7 || journey.completedMissionIds.length < 3) return `<section class="screen opening-locked"><div class="opening-dark"><span class="kiln-glow"></span><p class="section-kicker">窑门还没有打开</p><h1>火种还差一点</h1><p>完成轻游的 3 项任务，并收集到 7 枚火种，再来开灶。</p><button class="primary-button" data-go="/mission">回去收集火种 ${icon('arrow')}</button></div></section>`;
  const completeTasks = journey.completedMissionIds.map((id)=>getMission(id)).filter(Boolean);
  return `<section class="screen opening-screen"><div class="opening-dark"><span class="kiln-glow"></span><div class="opening-copy"><p>你的这一窑，</p><h1>烧好了。</h1><span class="opening-rule"></span><p class="opening-subline">${esc(clan?.name || '古灶行当')} · ${esc(persona.name)}</p></div><div class="kiln-door" aria-hidden="true"><div></div><div></div></div></div>
    <div class="memory-card-section"><div class="memory-id">古灶行当 <span>NO. ${getJourney().sessionId.slice(-6).toUpperCase()}</span></div><div class="memory-heading">${personaMark(persona.mark || 'kiln')}<div><p>${esc(clan?.name || '古灶行当')}</p><h2>${esc(persona.name)}</h2></div></div><p class="memory-slogan">${esc(persona.slogan)}</p>
      <div class="memory-stats">${dimensions.slice(0,3).map((dimension)=>`<div><strong>${dimensionScore(dimension.id)}%</strong><span>${dimension.name}</span></div>`).join('')}</div>
      <div class="memory-summary"><span>今日获得</span><p>✦ 火种 × ${journey.fireSeedCount}</p><p>🏺 到访火点 × ${journey.visitedFirePointIds.length}</p><p>📖 解锁故事 × ${journey.unlockedStoryIds.length}</p><p>📍 完成任务 × ${completeTasks.length}</p><p>📷 南风记忆 × ${journey.photos.length}</p></div>
      <p class="memory-closing">这一窑已经属于你。</p><button class="primary-button" data-go="/share">生成我的古灶行当卡 ${icon('arrow')}</button><button class="secondary-button timeweave-button" data-action="timeweave">把这一窑带走 · 制作我的 TimeTag</button><p class="timeweave-note">${esc(temporaryNotice || 'TimeWeave 接口当前为演示预留。')}</p><div class="memory-actions"><button class="text-button" data-go="/my-kiln">查看我的旅程</button><button class="text-button" data-go="/mission">继续逛</button></div>${appFooter()}</div>
  </section>`;
}

async function loadCardImage(source) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = source;
  });
}

function drawImageCover(ctx, image, x, y, width, height) {
  const scale = Math.max(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function drawImageContain(ctx, image, x, y, width, height) {
  const scale = Math.min(width / image.width, height / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  ctx.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

async function drawShareCard(canvas) {
  const ctx = canvas?.getContext('2d');
  const journey = getJourney();
  const persona = currentPersona();
  const clan = currentClan();
  if (!ctx || !persona) return;
  if (document.fonts?.ready) await document.fonts.ready;
  const displayFamily = getComputedStyle(document.documentElement).getPropertyValue('--serif-display').trim() || '"Kaiti SC", "Songti SC", "Noto Serif CJK SC", serif';
  const cardFont = (weight, size) => `${weight} ${size}px ${displayFamily}`;
  const [scene, portrait, clanMark, ...dimensionMarks] = await Promise.all([
    loadCardImage(asset('yaoge/paper/result-kiln-courtyard.webp')),
    loadCardImage(personaArtPath(persona, clan)),
    loadCardImage(asset(`yaoge/clans/${clan?.id || 'kiln'}.svg`)),
    ...dimensions.map((dimension) => loadCardImage(dimensionArtPath(dimension.id)))
  ]);

  const w = canvas.width;
  const personalityTop = 995;
  const personalityX = 64;
  const personalityWidth = w - 128;
  const chipFont = cardFont(700, 29);
  const chipRows = layoutCanvasPills(ctx, persona.keywords || [], personalityWidth - 88, chipFont);
  const copyFont = cardFont(500, 34);
  const copyWidth = personalityWidth - 88;
  ctx.font = copyFont;
  const descriptionLines = (persona.descriptions || []).map((paragraph) => wrapCanvasLines(ctx, paragraph, copyWidth));
  const copyLineHeight = 50;
  const paragraphGap = 22;
  const copyTop = personalityTop + 137 + chipRows.length * 62 + 23;
  const copyHeight = descriptionLines.reduce((total, lines) => total + lines.length * copyLineHeight, 0) + Math.max(0, descriptionLines.length - 1) * paragraphGap;
  const personalityHeight = Math.max(420, copyTop - personalityTop + copyHeight + 42);
  const sixTop = personalityTop + personalityHeight + 28;
  const sixHeight = 440;
  const chartTop = sixTop + sixHeight + 22;
  const chartHeight = 430;
  const footerY = chartTop + chartHeight + 68;
  canvas.height = Math.max(2500, footerY + 70);
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#fff4dc';
  ctx.fillRect(0, 0, w, h);
  if (scene) drawImageCover(ctx, scene, 0, 0, w, h);
  ctx.fillStyle = 'rgba(255,247,226,.92)';
  ctx.strokeStyle = '#a84b2d';
  ctx.lineWidth = 9;
  roundRect(ctx, 48, 48, w - 96, 120, 26); ctx.fill(); ctx.stroke();
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#273e70';
  ctx.font = cardFont(700, 42);
  ctx.fillText('南风古灶  ·  古灶行当', w / 2, 108);
  if (clanMark) drawImageContain(ctx, clanMark, w / 2 - 50, 192, 100, 100);
  ctx.fillStyle = '#9a482d';
  ctx.font = cardFont(600, 30);
  ctx.fillText(`${clan?.name || '古灶行当'}  ·  职业原型`, w / 2, 310);
  if (portrait) drawImageContain(ctx, portrait, 150, 290, w - 300, 520);
  ctx.fillStyle = 'rgba(255,247,226,.94)';
  roundRect(ctx, 74, 790, w - 148, 178, 22); ctx.fill();
  ctx.fillStyle = '#183c71';
  ctx.font = cardFont(900, 96);
  ctx.fillText(persona.name, w / 2, 846);
  ctx.fillStyle = '#41251a';
  ctx.font = cardFont(500, 42);
  wrapCanvasText(ctx, persona.slogan, w / 2, 914, w - 300, 42, 2);

  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(255,247,226,.97)';
  ctx.strokeStyle = '#dfc69b';
  ctx.lineWidth = 5;
  roundRect(ctx, personalityX, personalityTop, personalityWidth, personalityHeight, 28); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#bd5433';
  ctx.font = cardFont(700, 25);
  ctx.fillText('01', personalityX + 38, personalityTop + 59);
  ctx.fillStyle = '#173f76';
  ctx.font = cardFont(800, 39);
  ctx.fillText('这很像你', personalityX + 90, personalityTop + 59);

  chipRows.forEach((row, rowIndex) => {
    const rowWidth = row.reduce((total, chip) => total + chip.width, 0) + Math.max(0, row.length - 1) * 14;
    let chipX = w / 2 - rowWidth / 2;
    const chipY = personalityTop + 103 + rowIndex * 62;
    row.forEach((chip) => {
      ctx.fillStyle = '#f8e3ae';
      ctx.strokeStyle = '#d2a55d';
      ctx.lineWidth = 3;
      roundRect(ctx, chipX, chipY, chip.width, 48, 24); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#684326';
      ctx.font = chipFont;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(chip.text, chipX + chip.width / 2, chipY + 24);
      chipX += chip.width + 14;
    });
  });

  ctx.fillStyle = '#42291b';
  ctx.font = copyFont;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  let paragraphY = copyTop;
  descriptionLines.forEach((lines, index) => {
    lines.forEach((line) => {
      ctx.fillText(line, personalityX + 44, paragraphY);
      paragraphY += copyLineHeight;
    });
    if (index < descriptionLines.length - 1) paragraphY += paragraphGap;
  });

  ctx.fillStyle = 'rgba(255,247,226,.95)';
  ctx.strokeStyle = '#dfc69b';
  ctx.lineWidth = 5;
  roundRect(ctx, 64, sixTop, w - 128, sixHeight, 28); ctx.fill(); ctx.stroke();
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#bd5433';
  ctx.font = cardFont(700, 25);
  ctx.fillText('02', 102, sixTop + 58);
  ctx.fillStyle = '#42291b';
  ctx.fillStyle = '#173f76';
  ctx.font = cardFont(800, 39);
  ctx.fillText('你的做事倾向', 154, sixTop + 58);
  const cellWidth = (w - 180) / 3;
  dimensions.forEach((dimension, index) => {
    const row = Math.floor(index / 3);
    const column = index % 3;
    const x = 90 + column * cellWidth;
    const y = sixTop + 91 + row * 164;
    const mark = dimensionMarks[index];
    if (mark) drawImageContain(ctx, mark, x + (cellWidth - 94) / 2, y, 94, 94);
    ctx.fillStyle = '#352219';
    ctx.font = cardFont(700, 29);
    ctx.textAlign = 'center';
    ctx.fillText(dimension.name, x + cellWidth / 2, y + 110);
    ctx.fillStyle = '#7a4929';
    ctx.font = cardFont(800, 31);
    ctx.fillText(`${dimensionScore(dimension.id)} 分`, x + cellWidth / 2, y + 143);
  });

  ctx.fillStyle = 'rgba(255,247,226,.95)';
  ctx.strokeStyle = '#dfc69b';
  ctx.lineWidth = 5;
  roundRect(ctx, 64, chartTop, w - 128, chartHeight, 28); ctx.fill(); ctx.stroke();
  ctx.textAlign = 'left';
  ctx.fillStyle = '#bd5433';
  ctx.font = cardFont(700, 25);
  ctx.fillText('03', 102, chartTop + 58);
  ctx.fillStyle = '#173f76';
  ctx.font = cardFont(800, 39);
  ctx.fillText('这一窑的性格', 154, chartTop + 58);
  const centerX = w / 2, centerY = chartTop + 255, radius = 118;
  const chartPoint = (index, scale) => {
    const angle = (-90 + index * 60) * Math.PI / 180;
    return [centerX + Math.cos(angle) * radius * scale, centerY + Math.sin(angle) * radius * scale];
  };
  ctx.strokeStyle = '#d8bd8d'; ctx.lineWidth = 3;
  [.33, .66, 1].forEach((scale) => {
    ctx.beginPath();
    dimensions.forEach((_, index) => { const [x, y] = chartPoint(index, scale); if (!index) ctx.moveTo(x, y); else ctx.lineTo(x, y); });
    ctx.closePath(); ctx.stroke();
  });
  dimensions.forEach((dimension, index) => {
    const [x, y] = chartPoint(index, 1);
    ctx.beginPath(); ctx.moveTo(centerX, centerY); ctx.lineTo(x, y); ctx.stroke();
  });
  ctx.beginPath();
  dimensions.forEach((dimension, index) => {
    const [x, y] = chartPoint(index, (journey.dimensionScores?.[dimension.id]?.score ?? 50) / 100);
    if (!index) ctx.moveTo(x, y); else ctx.lineTo(x, y);
  });
  ctx.closePath(); ctx.fillStyle = 'rgba(52,164,139,.34)'; ctx.fill(); ctx.strokeStyle = '#078879'; ctx.lineWidth = 8; ctx.stroke();
  dimensions.forEach((dimension, index) => {
    const [x, y] = chartPoint(index, (journey.dimensionScores?.[dimension.id]?.score ?? 50) / 100);
    ctx.beginPath(); ctx.arc(x, y, 10, 0, Math.PI * 2); ctx.fillStyle = '#078879'; ctx.fill();
    const [labelX, labelY] = chartPoint(index, 1.2);
    ctx.fillStyle = '#42291b'; ctx.font = cardFont(600, 23);
    ctx.textAlign = 'center';
    ctx.fillText(dimension.name, labelX, labelY);
  });
  ctx.textAlign = 'center';
  ctx.fillStyle = '#163f6e';
  ctx.font = cardFont(700, 29);
  ctx.fillText('五百年窑火 · 找到你在古灶的一行', w / 2, footerY);
}

function wrapCanvasLines(ctx, text, maxWidth) {
  const chars=Array.from(String(text));let line='',lines=[];
  for(const char of chars){const trial=line+char;if(ctx.measureText(trial).width>maxWidth&&line){lines.push(line);line=char;}else line=trial;}
  if(line)lines.push(line);
  return lines;
}
function wrapCanvasText(ctx,text,x,y,maxWidth,lineHeight,maxLines) {
  const lines=wrapCanvasLines(ctx,text,maxWidth).slice(0,maxLines);
  lines.forEach((item,index)=>ctx.fillText(item,x,y+index*lineHeight));
  return lines.length;
}
function layoutCanvasPills(ctx, words, maxWidth, font) {
  ctx.font = font;
  const rows = [];
  let row = [];
  let rowWidth = 0;
  for (const word of words) {
    const chip = { text: String(word), width: Math.ceil(ctx.measureText(String(word)).width + 48) };
    if (row.length && rowWidth + 14 + chip.width > maxWidth) {
      rows.push(row);
      row = [];
      rowWidth = 0;
    }
    row.push(chip);
    rowWidth += (row.length > 1 ? 14 : 0) + chip.width;
  }
  if (row.length) rows.push(row);
  return rows;
}
function roundRect(ctx,x,y,w,h,r){ctx.beginPath();ctx.moveTo(x+r,y);ctx.arcTo(x+w,y,x+w,y+h,r);ctx.arcTo(x+w,y+h,x,y+h,r);ctx.arcTo(x,y+h,x,y,r);ctx.arcTo(x,y,x+w,y,r);ctx.closePath();}

function renderShare() {
  const journey = getJourney();
  if (!currentPersona()) return `<section class="screen"><div class="empty-state">完成古灶行当测试后，就能生成分享卡。<button class="primary-button" data-go="/test">开始测试</button></div></section>`;
  return `<section class="screen share-screen">${topBar('/result')}
    <div class="share-heading"><p class="section-kicker">把今天这一窑带走</p><h1>生成古灶行当卡</h1><p>卡片只在当前设备生成，不会上传。</p></div>
    <div class="share-canvas-wrap"><canvas id="share-canvas" width="1080" height="1920" aria-label="南风古灶古灶行当分享卡"></canvas></div>
    <div class="share-actions"><button class="primary-button" data-action="download-card">下载古灶行当卡 ${icon('arrow')}</button><button class="secondary-button" data-action="share-card">${icon('share')} 分享给窑友</button><button class="text-button" data-action="timeweave">把这一窑带走 · TimeTag</button></div><p class="share-notice" aria-live="polite">${esc(temporaryNotice)}</p>${appFooter()}
  </section>`;
}

function renderMyKiln() {
  const journey = getJourney();
  const persona = currentPersona();
  const clan = currentClan();
  const route = getRouteTasks(journey.personaId || journey.hiddenPersonaId, journey.routeMode || 'light');
  return `<section class="screen my-kiln-screen">${topBar(persona ? '/result' : '/')}
    <div class="my-kiln-heading"><p class="section-kicker">古灶行当 · 本页旅程</p><h1>我的窑令</h1>${persona ? `<div class="my-persona">${personaMark(persona.mark || 'kiln')}<div><span>${esc(clan?.name || '隐藏行当')}</span><strong>${esc(persona.name)}</strong></div></div>` : '<p>完成古灶行当测试，生成你的第一道窑令。</p>'}</div>
    <div class="route-summary"><div><strong>${journey.fireSeedCount}</strong><span>枚火种</span></div><div><strong>${journey.completedMissionIds.length}</strong><span>项任务</span></div><div><strong>${journey.visitedFirePointIds.length}</strong><span>处火点</span></div></div>
    <section class="result-section"><div class="section-heading"><span>行程</span><h2>走过的火点</h2></div><div class="journey-points">${firePoints.map((point,index)=>`<a href="#/map?point=${point.id}" class="journey-point ${journey.visitedFirePointIds.includes(point.id) ? 'is-visited' : ''}"><span>${journey.visitedFirePointIds.includes(point.id) ? icon('check') : String(index+1).padStart(2,'0')}</span><strong>${esc(point.title)}</strong><small>${journey.visitedFirePointIds.includes(point.id) ? '已到访' : '未到访'}</small></a>`).join('')}</div></section>
    <section class="result-section"><div class="section-heading"><span>任务</span><h2>完成记录</h2></div>${route.map((task,index)=>missionCard(task,index,journey)).join('')}</section>
    <section class="result-section"><div class="section-heading"><span>记忆</span><h2>照片</h2></div>${journey.photos.length ? `<div class="journey-photos">${journey.photos.map((photo)=>`<figure><img src="${photo.dataUrl}" alt="南风古灶旅程照片"><figcaption>${esc(getFirePoint(photo.firePointId).title)}</figcaption></figure>`).join('')}</div>` : '<p class="muted-copy">完成拍照任务后，照片会显示在当前页面中。</p>'}</section>
    <div class="result-actions"><button class="primary-button" data-go="${persona ? route.length ? '/mission' : '/test' : '/test'}">${persona ? '继续游览' : '开始测试'} ${icon('arrow')}</button><button class="secondary-button" data-action="restart-test">重新测一次</button></div><button class="text-button reset-link" data-action="reset-journey">重新开始本页旅程</button>${appFooter()}
  </section>`;
}

function renderDevPersonas() {
  const journey = getJourney();
  const scores = journey.dimensionScores || Object.fromEntries(dimensions.map(({id})=>[id,{score:50,raw:0}]));
  const match = matchPersona(scores, journey.answers);
  return `<section class="screen dev-screen">${topBar('/')}
    <div class="dev-heading"><p class="section-kicker">开发调试</p><h1>12 种古灶行当原型</h1><p>以下称谓来源会与产品创作人格分开标注。</p></div>
    <div class="dev-links"><a href="#/dev/questions">测试算法 ${icon('arrow')}</a><a href="#/dev/missions">任务与火点 ${icon('arrow')}</a></div>
    ${personas.map((persona,index)=>`<article class="dev-persona"><div class="dev-persona-top">${personaMark(persona.mark)}<span>${esc(clans[persona.clanId].name)}</span><small>${String(index+1).padStart(2,'0')}</small></div><h2>${esc(persona.name)}</h2><p>${esc(persona.slogan)}</p><small>${esc(persona.kind)} · ${esc(persona.culture)}</small><div class="center-row">${dimensions.map((dimension)=>`<span>${dimension.id} ${persona.center[dimension.id]}</span>`).join('')}</div><div class="dev-persona-bottom"><span>中心距离 ${match.ranking.find((item)=>item.personaId===persona.id)?.distance.toFixed(1) ?? '—'}</span><span>路线：${esc(persona.home || '多点游览')}</span></div></article>`).join('')}
    <h2 class="dev-hidden-title">隐藏行当原型判定</h2>${hiddenPersonas.map((persona)=>`<article class="dev-hidden"><h3>${esc(persona.name)}</h3><p>${esc(persona.criteria)}</p><small>${esc(persona.culture)}</small></article>`).join('')}${appFooter()}
  </section>`;
}

function renderDevQuestions() {
  const answers = devAnswers;
  const scores = calculateDimensions(answers);
  const result = Object.keys(answers).length === questions.length ? matchPersona(scores, answers) : null;
  const ranked = personaDistances(scores);
  return `<section class="screen dev-screen">${topBar('/')}
    <div class="dev-heading"><p class="section-kicker">开发调试</p><h1>人格算法页</h1><p>改变每题答案，实时查看六维、距离排行与隐藏人格。调试答案不会覆盖游客旅程。</p></div>
    <div class="dev-score-card"><h2>六维分数</h2>${dimensions.map((dimension)=>`<div class="dev-score-row"><span>${dimension.name}</span><strong>${scores[dimension.id].score}</strong><small>原始 ${scores[dimension.id].raw}</small></div>`).join('')}</div>
    <div class="dev-result"><h2>${result ? `判定：${esc(result.persona.name)}` : '选择完 15 题后显示结果'}</h2><p>${result ? esc(result.tieReason) : `已选择 ${Object.keys(answers).length} / ${questions.length}`}</p>${result?.hiddenPersona ? `<p class="dev-match-note">隐藏条件命中 · ${esc(result.hiddenPersona.criteria)}</p>` : ''}</div>
    <div class="dev-rank"><h2>人格距离排行</h2>${ranked.slice(0,5).map((item,index)=>`<div class="rank-row"><span>${index+1}</span><strong>${esc(personas.find((persona)=>persona.id===item.personaId).name)}</strong><small>${item.distance.toFixed(1)}</small></div>`).join('')}<p>Top 1 / Top 2 差距 ${ranked[1] ? (ranked[1].distance-ranked[0].distance).toFixed(1) : '—'}；阈值 12。</p></div>
    <div class="dev-question-list">${questions.map((question,index)=>`<label class="dev-question"><span>Q${String(index+1).padStart(2,'0')} · ${question.pair.join(' × ')}</span><strong>${esc(question.title)}</strong><select data-dev-question="${question.id}"><option value="">未选择</option>${question.options.map((option)=>`<option value="${option.id}" ${answers[question.id]===option.id?'selected':''}>${option.id.toUpperCase()} · ${esc(option.text)}</option>`).join('')}</select></label>`).join('')}</div>
    <button class="secondary-button" data-action="clear-dev-answers">清空调试答案</button>${appFooter()}
  </section>`;
}

function renderDevMissions() {
  return `<section class="screen dev-screen">${topBar('/')}
    <div class="dev-heading"><p class="section-kicker">开发调试</p><h1>任务与火点</h1><p>${firePoints.length} 个火点 · ${missions.length} 项任务 · 覆盖七种任务类型</p></div>
    <div class="dev-source-notes"><h2>内容来源</h2>${sourceNotes.map((source)=>`<p>${esc(source.label)} · ${esc(source.filename)}</p>`).join('')}</div>
    ${firePoints.map((point,index)=>`<section class="dev-point"><div><small>${String(index+1).padStart(2,'0')} · ${esc(point.subtitle)}</small><h2>${esc(point.title)}</h2><p>${esc(point.description)}</p><small>${esc(point.locationHint)}</small></div><div class="dev-point-missions">${point.missions.map((id)=>{const mission=getMission(id);return `<article><strong>${esc(mission.title)}</strong><span>${esc(mission.type)}</span><p>${esc(mission.instruction)}</p><small>关联人格：${mission.personaAffinity.map((personaId)=>personas.find((item)=>item.id===personaId)?.name).filter(Boolean).join('、') || '全体'}</small></article>`}).join('')}</div></section>`).join('')}
    ${appFooter()}
  </section>`;
}

function render() {
  clearTimeout(questionTimer);
  const { path, params } = currentRoute();
  if (path !== '/result') { shareCardVisible = false; activeDimensionId = ''; }
  if (path.startsWith('/mission') || ['/map', '/kiln-opening', '/share', '/my-kiln'].includes(path)) { go(getJourney().dimensionScores ? '/result' : '/'); return; }
  const title = path === '/' ? '古灶行当 · 南风古灶' : `${path.split('/').pop() || '古灶行当'} · 古灶行当`;
  document.title = title;
  document.body.className = path === '/' ? 'body-landing' : 'body-app';
  const anyDialogOpen = path === '/result' && (shareCardVisible || Boolean(activeDimensionId));
  document.body.classList.toggle('share-card-open', anyDialogOpen);
  if (path === '/result' && shareCardVisible) document.body.style.setProperty('--share-scroll-top', `${-shareCardReturnScroll}px`);
  else if (path === '/result' && activeDimensionId) document.body.style.setProperty('--share-scroll-top', `${-dimensionReturnScroll}px`);
  else document.body.style.removeProperty('--share-scroll-top');
  if (path === '/') root.innerHTML = renderLanding();
  else if (path === '/test') root.innerHTML = renderTest();
  else if (path === '/result') { root.innerHTML = renderResult(); if (activeDimensionId) root.insertAdjacentHTML('beforeend', renderDimensionModal(dimensions.find((item) => item.id === activeDimensionId))); if (shareCardVisible) root.insertAdjacentHTML('beforeend', renderShareCardModal(currentPersona())); const canvas = document.querySelector('#share-canvas'); if (canvas) drawShareCard(canvas); }
  else if (path === '/dev/personas') root.innerHTML = renderDevPersonas();
  else if (path === '/dev/questions') root.innerHTML = renderDevQuestions();
  else if (path === '/dev/missions') root.innerHTML = renderDevMissions();
  else { root.innerHTML = `<section class="screen"><div class="empty-state">没有这个页面。<button class="primary-button" data-go="/">回到古灶行当</button></div></section>`; }
}

function advanceQuestion(index) {
  if (index < questions.length - 1) go(`/test?q=${index + 1}`);
  else if (Object.keys(getJourney().answers).length < questions.length) {
    const nextIndex = questions.findIndex((question)=>!getJourney().answers[question.id]);
    go(`/test?q=${Math.max(0,nextIndex)}`);
  } else {
    root.innerHTML = `<section class="screen calculation-screen"><img class="calculation-scene" src="${asset('yaoge/paper/calculation-kiln.webp')}" alt=""><div class="calculation-paper"><span class="calculation-kicker">南风古灶 · 古灶行当</span><h1>正在看你的火候……</h1><p class="calculation-sub">正在试你的泥性<br>正在为你开灶</p><div class="calculation-wheel"><span class="calculation-ring" aria-hidden="true"></span><div class="calculation-seal"><img src="${asset('yaoge/paper/calculation-bowl.png')}" alt="手绘青花陶碗"></div></div><div class="calculation-stages" aria-label="试泥、看火、成器"><div><img src="${dimensionArtPath('C')}" alt=""><span>试泥</span></div><i aria-hidden="true"></i><div><img src="${dimensionArtPath('F')}" alt=""><span>看火</span></div><i aria-hidden="true"></i><div><img src="${dimensionArtPath('D')}" alt=""><span>成器</span></div></div></div></section>`;
    window.setTimeout(()=>{ finishTest(); go('/result'); },1450);
  }
}

function showNotice(message) {
  temporaryNotice = message;
  const notice = root.querySelector('[data-share-notice]');
  if (notice) notice.textContent = message;
  window.setTimeout(() => { temporaryNotice = ''; const currentNotice = root.querySelector('[data-share-notice]'); if (currentNotice) currentNotice.textContent = ''; }, 3200);
}

function closeShareCard() {
  if (!shareCardVisible) return;
  shareCardVisible = false;
  temporaryNotice = '';
  render();
  window.scrollTo({ top: shareCardReturnScroll, behavior: 'instant' });
  requestAnimationFrame(() => document.querySelector('.result-generate')?.focus({ preventScroll: true }));
}

function closeDimensionDetail() {
  if (!activeDimensionId) return;
  const dimensionId = activeDimensionId;
  activeDimensionId = '';
  render();
  window.scrollTo({ top: dimensionReturnScroll, behavior: 'instant' });
  requestAnimationFrame(() => document.querySelector(`.result-six-item[data-dimension="${CSS.escape(dimensionId)}"]`)?.focus({ preventScroll: true }));
}

function handleAction(action, element) {
  const { path, params } = currentRoute();
  if (action === 'start-test') {
    track('test_start');
    shareCardVisible = false;
    if (Object.keys(getJourney().answers).length === questions.length) { startNewJourney(); go('/test'); }
    else { const first = questions.findIndex((question)=>!getJourney().answers[question.id]); go(`/test?q=${Math.max(0,first)}`); }
  }
  if (action === 'previous-question') go(`/test?q=${Math.max(0,Number(params.get('q')||0)-1)}`);
  if (action === 'skip-question') advanceQuestion(Number(params.get('q')||0));
  if (action === 'generate-card') {
    shareCardReturnScroll = window.scrollY;
    shareCardVisible = true;
    track('share_card_generate');
    render();
    requestAnimationFrame(() => document.querySelector('.share-card-dialog [data-action="close-share-card"]')?.focus({ preventScroll: true }));
  }
  if (action === 'close-share-card') closeShareCard();
  if (action === 'show-dimension') {
    if (shareCardVisible) return;
    activeDimensionId = element.dataset.dimension;
    dimensionReturnScroll = window.scrollY;
    render();
    requestAnimationFrame(() => document.querySelector('.dimension-detail-dialog [data-action="close-dimension-detail"]')?.focus({ preventScroll: true }));
  }
  if (action === 'close-dimension-detail') closeDimensionDetail();
  if (action === 'restart-test') {
    if (window.confirm('重新测一次会覆盖当前结果，确定重新开始吗？')) { shareCardVisible = false; startNewJourney(); go('/test'); }
  }
  if (action === 'reset-journey') {
    if (window.confirm('清空当前页面中的旅程？这不会影响“南风开窑记”中的作品。')) { startNewJourney(); go('/'); }
  }
  if (action === 'arrive') {
    const point = element.dataset.point;
    awardPointVisit(point,element.dataset.story);
    track('fire_point_arrive',{pointId:point});
    render();
  }
  if (action === 'complete-mission') {
    const mission = getMission(element.dataset.mission);
    if (!mission) return;
    completeMission(mission.id,element.dataset.story);
    const note = document.querySelector(`[data-note="${CSS.escape(mission.id)}"]`)?.value || getJourney().missionNotes?.[mission.id] || '';
    updateJourney({ missionNotes:{...(getJourney().missionNotes||{}),[mission.id]:note} });
    const allTasksDone = getJourney().completedMissionIds.length >= 3 && getJourney().fireSeedCount >= 7;
    temporaryNotice = allTasksDone ? '火种齐了，窑门已经打开。' : '任务完成，火种 +1。';
    render();
  }
  if (action === 'remove-photo') {
    updateJourney({ photos:getJourney().photos.filter((photo)=>photo.firePointId !== element.dataset.point) }); render();
  }
  if (action === 'download-card') downloadCard();
  if (action === 'share-card') shareCard();
  if (action === 'clear-dev-answers') { devAnswers={}; render(); }
}

async function downloadCard() {
  const canvas = document.querySelector('#share-canvas');
  if (!canvas) return;
  await drawShareCard(canvas);
  const link = document.createElement('a'); link.download = '南风古灶-我的古灶行当卡.png'; link.href = canvas.toDataURL('image/png'); link.click();
  track('share_card_download'); showNotice('古灶行当卡已下载。');
}

async function shareCard() {
  const canvas = document.querySelector('#share-canvas'); if (!canvas) return;
  await drawShareCard(canvas);
  track('share_click');
  try {
    if(navigator.share && canvas.toBlob){
      const blob=await new Promise((resolve)=>canvas.toBlob(resolve,'image/png'));
      const file=new File([blob],'nanfeng-guzhao-hangdang.png',{type:'image/png'});
      if(!navigator.canShare || navigator.canShare({files:[file]})){await navigator.share({title:'我的古灶行当',text:currentPersona()?.slogan||'重生到古灶，你会干哪行？',files:[file]});return;}
    }
    showNotice('当前浏览器不支持直接分享图片，请先保存古灶行当卡再发给窑友。');
  } catch(error) {
    if(error?.name !== 'AbortError') showNotice('浏览器暂不支持直接分享，请下载古灶行当卡后分享。');
  }
}

function compressPhoto(file) {
  return new Promise((resolve,reject)=>{
    const image=new Image();
    image.onload=()=>{
      const max=1200,ratio=Math.min(1,max/Math.max(image.width,image.height));
      const canvas=document.createElement('canvas');canvas.width=Math.round(image.width*ratio);canvas.height=Math.round(image.height*ratio);
      canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
      resolve(canvas.toDataURL('image/jpeg',.72));
    };
    image.onerror=reject;image.src=URL.createObjectURL(file);
  });
}

root.addEventListener('click',(event)=>{
  if (shareCardVisible && event.target.matches('.share-card-modal')) { closeShareCard(); return; }
  if (activeDimensionId && event.target.matches('.dimension-detail-modal')) { closeDimensionDetail(); return; }
  const target=event.target.closest('[data-action],[data-go],[data-mode],[data-answer],[data-choice]');
  if(!target)return;
  if(target.dataset.go){event.preventDefault();go(target.dataset.go);return;}
  if(target.dataset.mode){updateJourney({routeMode:target.dataset.mode});render();return;}
  if(target.dataset.answer){
    const current=Number(currentRoute().params.get('q')||0);
    answerQuestion(target.dataset.question,target.dataset.answer);
    root.querySelectorAll('.answer-option').forEach((option)=>{
      const isSelected=option===target;
      option.classList.toggle('is-selected',isSelected);
      option.setAttribute('aria-checked',String(isSelected));
    });
    const answeredCount=Object.keys(getJourney().answers).length;
    const progressLabel=root.querySelector('.quiz-bottom > span');
    const nextButton=root.querySelector('[data-action="skip-question"]');
    if(progressLabel)progressLabel.textContent=`已作答 ${answeredCount} / ${questions.length}`;
    if(nextButton)nextButton.disabled=false;
    clearTimeout(questionTimer);
    questionTimer=window.setTimeout(()=>advanceQuestion(current),180);
    return;
  }
  if(target.dataset.choice){
    const missionId=target.dataset.mission;
    updateJourney({missionChoices:{...(getJourney().missionChoices||{}),[missionId]:target.dataset.choice}});render();return;
  }
  if(target.dataset.action)handleAction(target.dataset.action,target);
});

root.addEventListener('change',async(event)=>{
  const target=event.target;
  if(target.matches('[data-dev-question]')){if(target.value)devAnswers[target.dataset.devQuestion]=target.value;else delete devAnswers[target.dataset.devQuestion];render();return;}
  if(target.matches('[data-photo-point]')){
    const file=target.files?.[0];if(!file)return;
    if(file.size>12*1024*1024){showNotice('图片请控制在 12MB 以内。');return;}
    try{const dataUrl=await compressPhoto(file);saveJourneyPhoto({id:`photo-${Date.now()}`,dataUrl,firePointId:target.dataset.photoPoint,createdAt:Date.now()});track('journey_photo_saved',{firePointId:target.dataset.photoPoint});render();}
    catch{showNotice('这张照片暂时无法读取，请换一张图片。');}
  }
});

root.addEventListener('input',(event)=>{
  const target=event.target;
  if(target.matches('[data-note]')){
    const missionId=target.dataset.note;
    updateJourney({missionNotes:{...(getJourney().missionNotes||{}),[missionId]:target.value}});
  }
});

window.addEventListener('hashchange',render);
document.addEventListener('keydown',(event)=>{
  if (!shareCardVisible && !activeDimensionId) return;
  if (event.key === 'Escape') { event.preventDefault(); if (activeDimensionId) closeDimensionDetail(); else closeShareCard(); return; }
  if (event.key !== 'Tab') return;
  const dialog = document.querySelector(activeDimensionId ? '.dimension-detail-dialog' : '.share-card-dialog');
  const focusable = [...dialog?.querySelectorAll('button:not(:disabled),a[href],[tabindex]:not([tabindex="-1"])') || []];
  if (!focusable.length) { event.preventDefault(); dialog?.focus(); return; }
  const first = focusable[0], last = focusable.at(-1);
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});
// Keep each page open independent: direct result links and restored browser tabs start at home.
if (window.location.hash !== '#/') window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#/`);
track('yaoge_enter');
render();
