const app = document.getElementById('app');
const CHAPTERS = [
  { id: 'kiln', spotId: 'kiln', stamp: '古窑' },
  { id: 'banyan', spotId: 'banyan', stamp: '榕荫' },
  { id: 'craft', spotId: 'craft', stamp: '陶艺' }
];
const MOODS = [
  { id: 'slow', label: '慢慢逛', glaze: '陶土赭' },
  { id: 'warm', label: '热闹', glaze: '窑砖红' },
  { id: 'quiet', label: '宁静', glaze: '榕荫青' },
  { id: 'surprise', label: '惊喜多', glaze: '窑变彩' }
];
const STAMP_KEY = 'nanfeng-kiln-stamps-v1';
const OWNER_PREFIX = 'nanfeng-kiln-owner-';
const MAX_VIDEO_BYTES = 8 * 1024 * 1024;
const MAX_VIDEO_SECONDS = 15;
const CHAPTER_ARTWORK = {
  kiln: './assets/visual-390x844/story-kiln.jpg',
  banyan: './assets/visual-390x844/story-lane.jpg',
  craft: './assets/visual-390x844/story-pottery.jpg'
};
const CHAPTER_DESKTOP_ARTWORK = {
  kiln: './assets/kiln-courtyard.jpg',
  banyan: './assets/banyan.jpg',
  craft: './assets/shiwan-ceramic.jpg'
};

const state = {
  screen: 'intro',
  chapters: CHAPTERS.map((chapter) => ({ ...chapter, title: '', media: null, caption: '', skipped: false, sampleDismissed: false, processing: false })),
  title: '',
  mood: 'slow',
  stamps: readStamps(),
  notice: '',
  story: null,
  reveal: false,
  demo: false,
  modal: null,
  posterUrl: '',
  shareUrl: '',
  shareReturnY: 0,
  busy: false,
  editingStoryId: '',
  expandedChapter: 'kiln'
};

function readStamps() {
  try { return JSON.parse(localStorage.getItem(STAMP_KEY) || '{}'); }
  catch { return {}; }
}

function saveStamps() {
  localStorage.setItem(STAMP_KEY, JSON.stringify(state.stamps));
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function icon(name) {
  const paths = {
    back: '<path d="m14 5-7 7 7 7"/><path d="M7 12h11"/>',
    next: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
    close: '<path d="m6 6 12 12"/><path d="M18 6 6 18"/>',
    share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.7 10.7 6.6-4.4"/><path d="m8.7 13.3 6.6 4.4"/>',
    camera: '<path d="M14 5h-4l-2 2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z"/><circle cx="12" cy="13" r="3"/>',
    play: '<path d="m8 5 12 7-12 7z"/>',
    arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
    pin: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>'
  };
  return '<svg class="ui-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (paths[name] || '') + '</svg>';
}

function progress(active) {
  const labels = ['收集记忆', '选好火候', '开窑成页'];
  return '<div class="progress-row" aria-label="创作进度">' + labels.map((label, index) => {
    const num = index + 1;
    const cls = num === active ? 'is-active' : (num < active ? 'is-done' : '');
    return '<div class="progress-step ' + cls + '">' + escapeHtml(label) + '</div>';
  }).join('') + '</div>';
}

function collectedCount() {
  return Object.values(state.stamps).filter(Boolean).length;
}

function chapterMediaMarkup(chapter) {
  if (!chapter.media) return '';
  const url = escapeHtml(chapter.media.url);
  const alt = chapter.title.trim() || '旅行记片段';
  const preview = chapter.media.kind === 'video'
    ? '<video src="' + url + '" muted playsinline preload="metadata"></video><span class="video-flag">短片</span>'
    : '<img src="' + url + '" alt="' + escapeHtml(alt) + '预览">';
  return '<div class="media-preview">' + preview +
    '<button class="remove-media" type="button" data-action="remove-media" data-id="' + chapter.id + '" aria-label="移除素材">' + icon('close') + '</button></div>';
}

function editorArtwork(chapter) {
  if (chapter.media) return chapterMediaMarkup(chapter);
  if (chapter.sampleDismissed) {
    return '<div class="media-empty"><span class="media-empty-icon">' + icon('camera') + '</span><span>这一段还没有照片</span></div>';
  }
  return '<div class="media-preview sample-photo"><img src="' + CHAPTER_ARTWORK[chapter.id] + '" alt="南风古灶景区示例照片">' +
    '<button class="remove-media" type="button" data-action="remove-media" data-id="' + chapter.id + '" aria-label="移除景区示例照片">' + icon('close') + '</button></div>';
}

function chapterEditor(chapter, index) {
  const number = String(index + 1).padStart(2, '0');
  const expanded = state.expandedChapter === chapter.id;
  const displayTitle = chapter.title.trim() || '片段 ' + number;
  const sample = CHAPTER_ARTWORK[chapter.id];
  const input = '<input class="file-input" id="file-' + chapter.id + '" type="file" accept="image/*,video/mp4,video/quicktime,video/webm" data-id="' + chapter.id + '">';
  const toggle = '<button class="chapter-toggle" type="button" data-action="expand-chapter" data-id="' + chapter.id + '" aria-expanded="' + expanded + '">' +
    '<span class="chapter-number">' + number + '</span><span class="chapter-toggle-title">' + escapeHtml(displayTitle) + '</span>' +
    '<span class="chapter-toggle-state">' + (chapter.media ? '已添加' : (expanded ? '正在编辑' : '待添加')) + '</span></button>';

  if (!expanded) {
    return '<section class="chapter-card chapter-card--collapsed" data-chapter="' + chapter.id + '">' +
      '<div class="chapter-collapsed"><button class="chapter-collapsed-toggle" type="button" data-action="expand-chapter" data-id="' + chapter.id + '" aria-expanded="false" aria-label="展开' + escapeHtml(displayTitle) + '">' +
        '<span class="chapter-number">' + number + '</span><span class="chapter-collapsed-title">' + escapeHtml(displayTitle) + '</span>' +
      '</button><button class="chapter-add-label" type="button" data-action="choose" data-id="' + chapter.id + '">' + icon('plus') + (chapter.media ? '更换照片' : '添加照片') + '</button></div>' + input + '</section>';
  }

  const media = chapter.media
    ? '<div class="chapter-uploaded">' + chapterMediaMarkup(chapter) +
      (chapter.processing ? '<span class="chapter-processing-note" role="status">正在整理新素材…</span>' : '<button class="chapter-replace" type="button" data-action="choose" data-id="' + chapter.id + '">更换照片</button>') + '</div>'
    : chapter.processing
      ? '<div class="chapter-processing" role="status"><span class="spinner" aria-hidden="true"></span><span>正在整理素材…</span></div>'
      : '<button class="chapter-upload" type="button" data-action="choose" data-id="' + chapter.id + '" aria-label="为' + escapeHtml(displayTitle) + '添加照片或短片">' +
        '<picture class="chapter-upload-picture"><source media="(min-width: 768px)" srcset="' + CHAPTER_DESKTOP_ARTWORK[chapter.id] + '"><img src="' + sample + '" alt=""></picture><span class="chapter-upload-shade"><strong>添加照片或短片</strong><small>选择后会自动放进这一段</small></span><span class="chapter-upload-camera">' + icon('camera') + '</span></button>';
  const title = '<label class="chapter-title-label" for="chapter-title-' + chapter.id + '">这一段的小标题 <span>选填</span></label>' +
    '<input id="chapter-title-' + chapter.id + '" class="chapter-title-input" type="text" maxlength="24" data-chapter-title="' + chapter.id + '" value="' + escapeHtml(chapter.title) + '" placeholder="例如：窑火旁的午后">';
  const caption = '<label class="chapter-caption-label" for="caption-' + chapter.id + '">写一句当时的话 <span>选填 · 最多 40 字</span></label>' +
    '<textarea id="caption-' + chapter.id + '" class="caption-input" maxlength="40" rows="2" data-caption="' + chapter.id + '" placeholder="写下你看到的、听到的，或当时的心情。">' + escapeHtml(chapter.caption) + '</textarea>';
  return '<section class="chapter-card chapter-card--expanded" data-chapter="' + chapter.id + '">' + toggle +
    '<div class="chapter-body">' + media + input + title + caption + '</div></section>';
}

function introView() {
  return '<div class="app-shell screen screen--intro journey-home">' +
    '<div class="journey-home-scene" aria-hidden="true"><picture><source media="(min-width: 768px)" srcset="./assets/kiln-courtyard.jpg"><img src="./assets/visual-390x844/home-kiln-scene.png" alt=""></picture></div>' +
    '<header class="journey-home-brand"><span>南风古灶 · 佛山</span></header>' +
    '<section class="journey-home-copy"><p class="journey-eyebrow">A MEMORY FROM NANFENG</p><h1>把今天，<br><em>写成一页旅行记</em></h1>' +
      '<p class="journey-home-description">挑几张照片，写下当时的心情。<br>南风古灶会替你排成一封可以分享的明信片。</p>' +
      '<div class="journey-home-note"><span>照片 + 一句话</span><i>→</i><span>旅行记长页</span></div></section>' +
    '<div class="journey-home-story-demo" aria-label="照片和一句话会排成旅行记">' +
      '<div class="home-photo-stack"><picture class="home-photo home-photo--back"><source media="(min-width: 768px)" srcset="./assets/shiwan-ceramic.jpg"><img src="./assets/visual-390x844/story-pottery.jpg" alt="陶艺体验照片示例"></picture><picture class="home-photo home-photo--middle"><source media="(min-width: 768px)" srcset="./assets/banyan.jpg"><img src="./assets/visual-390x844/story-lane.jpg" alt="榕荫街巷照片示例"></picture><picture class="home-photo home-photo--front"><source media="(min-width: 768px)" srcset="./assets/kiln-courtyard.jpg"><img src="./assets/visual-390x844/story-kiln.jpg" alt="古窑照片示例"></picture></div>' +
      '<span class="home-demo-arrow" aria-hidden="true">' + icon('arrow') + '</span>' +
      '<article class="home-postcard"><img src="./assets/visual-390x844/home-kiln-scene.png" alt=""><p>在南风古灶，<br>看见时间的温度。</p><img class="home-postcard-etch" src="./assets/visual-390x844/story-chimney-etch.png" alt=""></article>' +
    '</div>' +
    '<div class="journey-home-bottom"><button class="primary-button" type="button" data-action="start">开始记录 ' + icon('arrow') + '</button></div>' +
    '<span class="journey-home-caption">一窑一世界 · 一步一风景</span></div>';
}

function editorView() {
  const mediaCount = state.chapters.filter((chapter) => chapter.media?.file).length;
  const processing = state.chapters.some((chapter) => chapter.processing);
  const moodOptions = ['slow', 'warm'].map((mood) => '<label class="mood-option"><input type="radio" name="mood" value="' + mood + '"' + (state.mood === mood ? ' checked' : '') + '><span>' + (mood === 'slow' ? '慢慢逛' : '热热闹闹') + '</span></label>').join('');
  return '<div class="app-shell screen screen--editor journey-editor">' +
    '<header class="journey-editor-head"><button class="journey-back" type="button" data-action="back" aria-label="返回">' + icon('back') + '</button><span>南风开窑记</span><span class="journey-step-tag">01 / 03</span></header>' +
    '<main class="journey-editor-main"><div class="journey-progress" aria-label="创作进度"><span class="journey-progress-step is-current">收集片段</span><span class="journey-progress-step">预览游记</span><span class="journey-progress-step">分享成品</span></div>' +
      '<div class="journey-editor-intro"><h1>把旅途片段放进来</h1><p>每段放一张照片或短片，再写一句当时的话。标题由你来定，也可以留白。</p></div>' +
      '<label class="journey-title-label" for="journey-title">这篇旅行记的名字 <span>选填</span></label>' +
      '<input id="journey-title" class="journey-title-input" data-title maxlength="24" value="' + escapeHtml(state.title) + '" placeholder="南风古灶的一日慢游">' +
      '<div class="chapter-list journey-chapters">' + state.chapters.map((chapter, index) => chapterEditor(chapter, index)).join('') + '</div>' +
      '<section class="journey-mood"><div><strong>今天的游览节奏</strong><span>它会成为旅行记的小注脚</span></div><div class="mood-list">' + moodOptions + '</div></section>' +
    '</main><footer class="journey-editor-footer"><span>' + (processing ? '正在整理素材…' : (mediaCount ? '已添加 ' + mediaCount + ' 段记忆' : '至少添加一段记忆')) + '</span><button class="primary-button" type="button" data-action="preview"' + (processing ? ' disabled' : '') + '>' + (processing ? '素材整理中…' : '预览我的旅行记') + (processing ? '' : icon('arrow')) + '</button></footer></div>';
}

function mediaMarkup(media, className, alt) {
  if (!media) return '<div class="preview-empty">这一幕暂时留白</div>';
  const source = escapeHtml(media.url || media.mediaUrl || '');
  if (media.kind === 'video') return '<video class="' + className + '" src="' + source + '" controls playsinline preload="metadata" aria-label="' + escapeHtml(alt) + '"></video>';
  const sampleSpot = Object.keys(CHAPTER_ARTWORK).find((spotId) => CHAPTER_ARTWORK[spotId] === (media.url || media.mediaUrl));
  if (sampleSpot) {
    return '<picture class="' + className + '-picture"><source media="(min-width: 768px)" srcset="' + CHAPTER_DESKTOP_ARTWORK[sampleSpot] + '"><img class="' + className + '" src="' + source + '" alt="' + escapeHtml(alt) + '"></picture>';
  }
  return '<img class="' + className + '" src="' + source + '" alt="' + escapeHtml(alt) + '">';
}

function previewView() {
  return '<div class="app-shell screen screen--preview journey-preview"><header class="journey-preview-head"><button class="journey-back" type="button" data-action="back-editor" aria-label="返回修改">' + icon('back') + '</button><div><strong>旅行记预览</strong><span>朋友打开后看到的页面</span></div></header>' +
    storyCanvasMarkup({ title: state.title.trim() || suggestedTitle(), chapters: state.chapters, preview: true }) +
    '<p class="upload-status" data-upload-status aria-live="polite"></p><footer class="journey-preview-footer"><button class="secondary-button" type="button" data-action="back-editor">继续编辑</button><button class="primary-button" type="button" data-action="create">生成并分享 ' + icon('arrow') + '</button></footer></div>';
}

function moodLabel(moodId) {
  const found = MOODS.find((mood) => mood.id === moodId);
  return found ? found.label : MOODS[0].label;
}

function suggestedTitle() {
  return '窑火未熄的一天';
}

function storyFrame(media, index, title, caption) {
  const visibleMedia = media
    ? mediaMarkup(media, 'story-frame-media', title)
    : '<div class="story-photo-empty"><strong>' + escapeHtml(title) + '</strong><span>此处留白</span></div>';
  return '<figure class="story-frame story-frame--' + (index + 1) + '"><div class="story-frame-paper">' + visibleMedia + '</div>' +
    '<figcaption class="sr-only">' + escapeHtml(title + (caption ? '：' + caption : '')) + '</figcaption></figure>';
}

function storyTitleMarkup(title) {
  return escapeHtml(title || '南风开窑记');
}

function chapterMediaValue(chapter) {
  if (chapter?.mediaUrl) return { kind: chapter.kind || 'image', url: chapter.mediaUrl };
  return chapter?.media || null;
}

function storyChapterList(source) {
  return Array.isArray(source) ? source : (source?.chapters || []);
}

function coverMediaValue(source) {
  const media = storyChapterList(source).filter((chapter) => !chapter.skipped).map(chapterMediaValue).filter(Boolean);
  return media.find((item) => item.kind !== 'video') || media[0] || { kind: 'image', url: CHAPTER_ARTWORK.kiln };
}

function storyCoverImage(source, alt) {
  const media = coverMediaValue(source);
  const url = escapeHtml(media.url || media.mediaUrl || CHAPTER_ARTWORK.kiln);
  if (media.kind === 'video') {
    return '<video class="travelogue-cover-photo" src="' + url + '" muted playsinline autoplay loop preload="metadata" aria-label="' + escapeHtml(alt) + '"></video>';
  }
  return mediaMarkup(media, 'travelogue-cover-photo', alt);
}

function storyChapters(story) {
  const chapters = storyChapterList(story);
  return CHAPTERS.map((chapterDef, index) => {
    const chapter = chapters.find((item) => item.id === chapterDef.id) || {};
    const media = chapterMediaValue(chapter);
    const title = String(chapter.title || '').trim();
    if (chapter.skipped) return '';
    if (!media && !chapter.caption && !title) return '';
    const image = mediaMarkup(media, 'travelogue-photo', title || '旅行记片段 ' + String(index + 1).padStart(2, '0'));
    return '<section class="travelogue-chapter travelogue-chapter--' + chapterDef.id + '">' +
      (title ? '<h2 class="travelogue-user-title">' + escapeHtml(title) + '</h2>' : '') +
      (media ? '<figure class="travelogue-figure">' + image + '</figure>' : '') +
      (chapter.caption ? '<p class="travelogue-caption">“' + escapeHtml(chapter.caption) + '”</p>' : '') +
      '</section>';
  }).filter(Boolean).join('');
}

function storyCanvasMarkup({ title, chapters, preview = false }) {
  const storyTitle = title || '南风开窑记';
  const storyData = Array.isArray(chapters) ? null : chapters;
  const date = storyData?.createdAt ? new Date(storyData.createdAt) : new Date();
  const dateLabel = date.toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
  const mood = moodLabel(storyData?.mood || state.mood);
  return '<article class="travelogue-page' + (preview ? ' is-preview' : '') + '">' +
    '<header class="travelogue-cover">' + storyCoverImage(chapters, storyTitle + '封面') + '<div class="travelogue-cover-shade"></div>' +
      '<div class="travelogue-cover-copy"><p>南风古灶 · 佛山</p><h1>' + storyTitleMarkup(storyTitle) + '</h1><p class="travelogue-cover-subtitle">在窑火与榕荫之间，收藏今天</p><div class="travelogue-cover-meta"><span>' + dateLabel + '</span><span>' + escapeHtml(mood) + '的一天</span></div></div></header>' +
    '<div class="travelogue-intro"><p>把走过的地方、遇见的人和手心的温度，慢慢写进这一页。</p><span class="intro-location">' + icon('pin') + '佛山 · 南风古灶</span><img class="travelogue-intro-etch" src="./assets/visual-390x844/story-chimney-etch.png" alt=""></div>' +
    '<div class="travelogue-chapters">' + storyChapters(chapters) + '</div>' +
    '<footer class="travelogue-ending"><span class="ending-seal">南风</span><p>这一程，已珍藏。</p><span>愿每一次回望，都有窑火的温度</span><i>— 南风古灶 —</i></footer>' +
  '</article>';
}

function storyView() {
  const story = state.story;
  if (!story) return errorView('找不到这份开窑记', '链接可能已经过期，或者作品已被创建者删除。');
  const owner = localStorage.getItem(OWNER_PREFIX + story.storyId);
  const expiryText = story.expiresAt ? '这份作品预计保留至 ' + new Date(story.expiresAt).toLocaleDateString('zh-CN') + '。' : '演示作品可以随时删除。';
  return '<div class="app-shell screen screen--story journey-story"><header class="journey-story-head"><button class="journey-back" type="button" data-action="home" aria-label="回到开始">' + icon('back') + '</button><div><strong>我的旅行记</strong><span>朋友打开后看到的页面</span></div></header>' + storyCanvasMarkup({ title: story.title, chapters: story }) +
    '<div class="story-extra-actions"><button class="story-share-button" type="button" data-action="share">分享这页旅行记 ' + icon('share') + '</button><button class="story-save-button" type="button" data-action="save-card">保存明信片</button>' +
      (owner ? '<button class="secondary-button owner-edit" type="button" data-action="edit">继续修改</button><button class="story-delete" type="button" data-action="delete">删除这份作品</button>' : '') +
      '<p class="story-expiry">' + escapeHtml(expiryText) + ' 链接仅供持有者访问。</p></div></div>';
}

function firingView() {
  return '<div class="app-shell screen screen--firing"><div class="firing-scene"><img class="firing-photo" src="./assets/kiln-interior.jpg" alt=""/><div class="firing-inner">' +
    '<p class="firing-kicker">NANFENG ANCIENT KILN</p><h2>窑火正旺</h2><p>把今天的记忆，慢慢烧成一件纪念</p><div class="firing-progress"><span></span></div>' +
    '</div></div></div>';
}

function loadingView(message) {
  return '<div class="app-shell screen loading-screen"><div><div class="spinner" aria-hidden="true"></div><p>' + escapeHtml(message || '正在打开这份记忆…') + '</p></div></div>';
}

function errorView(title, message) {
  return '<div class="app-shell screen error-screen"><div><h1>' + escapeHtml(title) + '</h1><p>' + escapeHtml(message) + '</p><button class="secondary-button" type="button" data-action="home">回到开始</button></div></div>';
}

function serviceRequiredView() {
  const previewUrl = 'http://127.0.0.1:8787/' + window.location.search + window.location.hash;
  return '<div class="app-shell screen error-screen service-required-screen"><div>' +
    '<h1>请通过预览地址打开</h1>' +
    '<p>当前页面从文件直接打开（file://），浏览器会阻止它连接作品保存服务。请使用本地预览地址继续创作。</p>' +
    '<a class="primary-button service-open-link" href="' + escapeHtml(previewUrl) + '">打开本地预览</a>' +
    '<p class="service-start-help">如果地址无法访问，请在项目目录运行 <code>python3 server.py --port 8787</code>，再回来打开预览。</p>' +
    '</div></div>';
}

function modalView() {
  if (!state.modal) return '';
  if (state.posterUrl) {
    return '<div class="modal-backdrop" data-action="dismiss-modal"><section class="modal-sheet poster-sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
      '<h2 id="modal-title">纪念卡已做好</h2><p>长按图片保存到相册；也可以使用下方下载按钮。</p>' +
      '<img class="poster-preview" src="' + escapeHtml(state.posterUrl) + '" alt="南风开窑记纪念卡：' + escapeHtml(state.story?.title || '南风开窑记') + '">' +
      '<div class="modal-buttons"><a class="secondary-button" href="' + escapeHtml(state.posterUrl) + '" download="南风开窑记.png">下载图片</a><button class="primary-button" type="button" data-action="cancel-modal">关闭</button></div></section></div>';
  }
  if (state.shareUrl) {
    const title = state.story?.title || '窑火未熄的一天';
    const thumb = coverMediaValue(state.story);
    const thumbUrl = escapeHtml(thumb.kind === 'video' ? CHAPTER_ARTWORK.kiln : (thumb.url || thumb.mediaUrl || CHAPTER_ARTWORK.kiln));
    return '<div class="modal-backdrop modal-backdrop--share" data-action="dismiss-modal"><section class="modal-sheet share-sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
      '<span class="share-sheet-handle" aria-hidden="true"></span><button class="share-sheet-close" type="button" data-action="cancel-modal" aria-label="关闭分享">' + icon('close') + '</button>' +
      '<h2 id="modal-title">分享这页旅行记</h2><p>把今天的记忆，分享给想念的人。</p>' +
      '<div class="share-preview-card"><img src="' + thumbUrl + '" alt=""><div><span>南风古灶 · 佛山</span><strong>' + escapeHtml(title) + '</strong><small>一页私人旅行记</small></div><img class="share-preview-etch" src="./assets/visual-390x844/story-chimney-etch.png" alt=""></div>' +
      '<label class="share-link-label" for="share-link">作品分享链接</label><textarea id="share-link" class="share-link-field" rows="1" readonly aria-label="作品分享链接">' + escapeHtml(state.shareUrl) + '</textarea>' +
      '<div class="modal-buttons"><button class="primary-button" type="button" data-action="copy-share">复制链接</button><button class="secondary-button" type="button" data-action="native-share">系统分享</button></div>' +
      '<p class="share-privacy-note">链接仅供持有者访问</p></section></div>';
  }
  return '<div class="modal-backdrop" data-action="dismiss-modal"><section class="modal-sheet" role="dialog" aria-modal="true" aria-labelledby="modal-title">' +
    '<h2 id="modal-title">' + escapeHtml(state.modal.title) + '</h2><p>' + escapeHtml(state.modal.message) + '</p>' +
    '<div class="modal-buttons"><button class="secondary-button" type="button" data-action="cancel-modal">再想想</button><button class="primary-button" type="button" data-action="confirm-modal">确认</button></div></section></div>';
}

function render() {
  let content = '';
  if (state.screen === 'intro') content = introView();
  else if (state.screen === 'editor') content = editorView();
  else if (state.screen === 'preview') content = previewView();
  else if (state.screen === 'firing') content = firingView();
  else if (state.screen === 'story') content = storyView();
  else if (state.screen === 'loading') content = loadingView(state.loadingMessage);
  else if (state.screen === 'error') content = errorView(state.errorTitle, state.errorMessage);
  else if (state.screen === 'service-required') content = serviceRequiredView();
  app.innerHTML = content + modalView();
  document.body.classList.toggle('has-overlay-modal', Boolean(state.modal));
}

function resetDraft() {
  state.chapters.forEach((chapter) => {
    if (chapter.media?.url?.startsWith('blob:')) URL.revokeObjectURL(chapter.media.url);
  });
  state.chapters = CHAPTERS.map((chapter) => ({ ...chapter, title: '', media: null, caption: '', skipped: false, sampleDismissed: false, processing: false }));
  state.title = '';
  state.mood = 'slow';
  state.notice = '';
  state.story = null;
  state.reveal = false;
  state.demo = false;
  state.editingStoryId = '';
  state.expandedChapter = 'kiln';
}

function toast(message) {
  document.querySelector('.toast')?.remove();
  const element = document.createElement('div');
  element.className = 'toast';
  element.setAttribute('role', 'status');
  element.textContent = message;
  document.body.appendChild(element);
  window.setTimeout(() => element.remove(), 2600);
}

function openSpotCode() {
  const params = new URLSearchParams(window.location.search);
  const spot = params.get('spot');
  if (!spot) return;
  const chapter = CHAPTERS.find((item) => item.spotId === spot);
  if (!chapter) return;
  state.stamps[spot] = true;
  saveStamps();
  state.notice = '收下「' + chapter.stamp + '」窑印了。把这一刻也放进故事里吧。';
}

function startExperience() {
  state.expandedChapter = 'kiln';
  state.screen = 'editor';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function mediaError(message) {
  state.notice = message;
  render();
}

async function imageFileForUpload(file) {
  if (file.type.startsWith('video/')) {
    if (file.size > MAX_VIDEO_BYTES) throw new Error('短片大小请控制在 8 MB 以内。');
    const previewUrl = URL.createObjectURL(file);
    const duration = await new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => { URL.revokeObjectURL(previewUrl); resolve(video.duration); };
      video.onerror = () => { URL.revokeObjectURL(previewUrl); reject(new Error('无法读取这段视频，请换一个格式再试。')); };
      video.src = previewUrl;
    });
    if (duration > MAX_VIDEO_SECONDS) throw new Error('每段短片请控制在 15 秒以内。');
    return file;
  }
  if (!file.type.startsWith('image/')) throw new Error('请选择照片或视频文件。');
  try {
    const bitmap = await createImageBitmap(file);
    const maxSide = 1800;
    const ratio = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * ratio);
    canvas.height = Math.round(bitmap.height * ratio);
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.fillStyle = '#f3ecdf';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', .84));
    if (!blob) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', { type: 'image/jpeg', lastModified: Date.now() });
  } catch (error) {
    if (file.size > 10 * 1024 * 1024) throw new Error('这张照片较大，请先在手机里压缩后再添加。');
    return file;
  }
}

async function handleFiles(input) {
  const chapter = state.chapters.find((item) => item.id === input.dataset.id);
  const file = input.files?.[0];
  if (!chapter || !file) return;
  state.expandedChapter = chapter.id;
  chapter.processing = true;
  render();
  try {
    chapter.skipped = false;
    const sourceBytes = await file.arrayBuffer();
    const sourceFile = new File([sourceBytes], file.name, { type: file.type, lastModified: file.lastModified });
    const prepared = await imageFileForUpload(sourceFile);
    const dataUrl = prepared === sourceFile
      ? dataUrlFromBytes(sourceBytes, sourceFile.type)
      : await fileToDataUrl(prepared);
    if (chapter.media?.url?.startsWith('blob:')) URL.revokeObjectURL(chapter.media.url);
    const url = URL.createObjectURL(prepared);
    chapter.media = { file: prepared, dataUrl, url, kind: prepared.type.startsWith('video/') ? 'video' : 'image' };
    chapter.processing = false;
    render();
  } catch (error) {
    chapter.processing = false;
    toast(error.message || '素材未能添加，请再试一次。');
    render();
  }
}

function dataUrlFromBytes(bytes, mime) {
  bytes = new Uint8Array(bytes);
  let binary = '';
  for (let offset = 0; offset < bytes.length; offset += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(offset, offset + 0x8000));
  }
  return 'data:' + (mime || 'application/octet-stream') + ';base64,' + btoa(binary);
}

async function fileToDataUrl(file) {
  return dataUrlFromBytes(await file.arrayBuffer(), file.type);
}

function setStatus(message, percent) {
  const status = document.querySelector('[data-upload-status]');
  if (!status) return;
  status.textContent = message;
  if (percent !== undefined) status.dataset.percent = String(percent);
}

async function createStory() {
  const withMedia = state.chapters.filter((chapter) => chapter.media?.file);
  if (!withMedia.length) {
    toast('至少添加一张照片或一段短片，再来开窑吧。');
    return;
  }
  const title = state.title.trim() || suggestedTitle();
  state.busy = true;
  const button = document.querySelector('[data-action="create"]');
  if (button) {
    button.disabled = true;
    button.textContent = '正在封窑…';
  }
  setStatus('正在整理素材…', 0);
  try {
    const chapters = [];
    for (const chapter of state.chapters) {
      const media = chapter.media?.file
        ? { kind: chapter.media.kind, name: chapter.media.file.name, data: chapter.media.dataUrl || await fileToDataUrl(chapter.media.file) }
        : null;
      chapters.push({
        id: chapter.id,
        spotId: chapter.spotId,
        title: chapter.title.trim(),
        caption: chapter.caption.trim(),
        skipped: Boolean(chapter.skipped),
        stampCollected: Boolean(state.stamps[chapter.spotId]),
        media
      });
    }
    const body = JSON.stringify({
      templateId: 'nanfeng-open-kiln-v1',
      locale: 'zh-CN',
      title,
      mood: state.mood,
      stamps: state.stamps,
      chapters
    });
    if (new Blob([body]).size > 32 * 1024 * 1024) throw new Error('素材总量较大，请减少视频或改用照片。');
    const editingId = state.editingStoryId;
    const manageToken = editingId ? localStorage.getItem(OWNER_PREFIX + editingId) : '';
    if (editingId && !manageToken) throw new Error('无法验证创建者身份，请从原作品链接返回后再修改。');
    const result = await postStory(body, editingId, manageToken);
    if (!editingId) localStorage.setItem(OWNER_PREFIX + result.story.storyId, result.manageToken);
    state.story = result.story;
    state.story.storyId = result.story.storyId;
    state.title = title;
    state.editingStoryId = '';
    state.busy = false;
    state.screen = 'firing';
    render();
    window.setTimeout(() => {
      window.history.pushState({}, '', '?story=' + encodeURIComponent(result.story.storyId));
      state.screen = 'story';
      state.reveal = false;
      render();
      window.scrollTo(0, 0);
    }, 1850);
  } catch (error) {
    state.busy = false;
    render();
    toast(error.message || '作品没有生成，请检查网络后重试。');
  }
}

function postStory(body, storyId, manageToken) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(storyId ? 'PUT' : 'POST', storyId ? '/api/stories/' + encodeURIComponent(storyId) : '/api/stories');
    xhr.setRequestHeader('Content-Type', 'application/json');
    if (manageToken) xhr.setRequestHeader('X-Manage-Token', manageToken);
    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) setStatus('上传素材 ' + Math.round(event.loaded / event.total * 100) + '%', Math.round(event.loaded / event.total * 100));
    };
    xhr.onload = () => {
      let data;
      try { data = JSON.parse(xhr.responseText); } catch { reject(new Error('服务器返回格式异常。')); return; }
      if (xhr.status >= 200 && xhr.status < 300) resolve(data);
      else reject(new Error(data.error || '作品没有生成，请稍后重试。'));
    };
    xhr.onerror = () => reject(new Error(window.location.protocol === 'file:'
      ? '当前页面通过 file:// 打开，无法保存作品。请访问 http://127.0.0.1:8787/。'
      : '连接本地作品服务失败，请确认服务仍在运行。'));
    xhr.send(body);
  });
}

async function loadStory(storyId) {
  state.screen = 'loading';
  state.loadingMessage = '正在打开这份记忆…';
  render();
  try {
    const response = await fetch('/api/stories/' + encodeURIComponent(storyId));
    if (response.status === 410) {
      state.screen = 'error';
      state.errorTitle = '这份开窑记已到期';
      state.errorMessage = '演示链接保留 30 天。请回到入口，重新为今天的记忆开窑。';
      render();
      return;
    }
    if (!response.ok) throw new Error('没有找到这份作品。');
    state.story = await response.json();
    state.mood = state.story.mood || state.mood;
    state.title = state.story.title || '';
    state.screen = 'story';
    state.reveal = false;
    state.demo = false;
    render();
  } catch (error) {
    state.screen = 'error';
    state.errorTitle = '暂时打不开这份开窑记';
    state.errorMessage = error.message || '请稍后再试。';
    render();
  }
}

function exampleStory() {
  const now = new Date().toISOString();
  state.demo = true;
  state.story = {
    storyId: 'demo',
    title: '南风开窑记',
    mood: 'slow',
    createdAt: now,
    expiresAt: '',
    stamps: { kiln: true, banyan: true, craft: false },
    chapters: [
      { id: 'kiln', spotId: 'kiln', kind: 'image', mediaUrl: CHAPTER_ARTWORK.kiln, caption: '第一次看见龙窑这么长。', stampCollected: true },
      { id: 'banyan', spotId: 'banyan', kind: 'image', mediaUrl: CHAPTER_ARTWORK.banyan, caption: '在榕荫里，时间好像慢了一点。', stampCollected: true },
      { id: 'craft', spotId: 'craft', kind: 'image', mediaUrl: CHAPTER_ARTWORK.craft, caption: '指尖把柔软的泥，慢慢转成器形。', stampCollected: false }
    ]
  };
  state.screen = 'story';
  state.reveal = false;
  render();
  window.scrollTo(0, 0);
}

async function editCurrentStory() {
  if (!state.story || state.demo) {
    state.screen = 'editor';
    render();
    return;
  }
  state.loadingMessage = '正在把素材放回编辑台…';
  state.editingStoryId = state.story.storyId;
  state.screen = 'loading';
  render();
  try {
    state.title = state.story.title || '';
    state.mood = state.story.mood === 'warm' ? 'warm' : 'slow';
    state.stamps = { ...(state.story.stamps || {}) };
    state.chapters = await Promise.all(CHAPTERS.map(async (chapter) => {
      const saved = (state.story.chapters || []).find((item) => item.id === chapter.id) || {};
      let media = null;
      if (saved.mediaUrl) {
        const response = await fetch(saved.mediaUrl);
        const blob = await response.blob();
        const file = new File([blob], 'nanfeng-memory.' + (saved.kind === 'video' ? 'mp4' : 'jpg'), { type: blob.type || (saved.kind === 'video' ? 'video/mp4' : 'image/jpeg') });
        media = { file, url: URL.createObjectURL(file), kind: saved.kind || 'image' };
      }
      return { ...chapter, title: saved.title || '', media, caption: saved.caption || '', skipped: Boolean(saved.skipped) };
    }));
    state.screen = 'editor';
    render();
  } catch {
    state.editingStoryId = '';
    state.screen = 'editor';
    render();
    toast('素材未能重新载入；请移除并重新选择。');
  }
}

async function shareStory() {
  if (state.demo) {
    toast('示例作品不能分享，开始创作后就能生成自己的链接。');
    return;
  }
  state.shareUrl = window.location.href;
  state.shareReturnY = window.scrollY;
  window.scrollTo(0, 0);
  state.modal = { title: '分享这页旅行记', message: '复制链接发给朋友。' };
  render();
}

async function nativeShareStory() {
  if (!navigator.share) {
    toast('当前浏览器不支持系统分享，请复制链接发送给朋友。');
    return;
  }
  if (navigator.share) {
    try {
      await navigator.share({ title: (state.story?.title || '南风开窑记') + ' · 南风古灶', text: '我把今天在南风古灶的记忆，做成了一页旅行记。', url: state.shareUrl || window.location.href });
      return;
    } catch (error) {
      if (error?.name === 'AbortError') return;
    }
  }
  toast('系统分享暂不可用，你可以复制上方链接。');
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const chars = Array.from(text || '');
  let line = '';
  let lines = 0;
  for (const char of chars) {
    const next = line + char;
    if (ctx.measureText(next).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = char;
      lines += 1;
      if (maxLines && lines >= maxLines) break;
    } else line = next;
  }
  if (line && (!maxLines || lines < maxLines)) ctx.fillText(line, x, y);
}

async function saveCard() {
  toast('正在制作纪念卡…');
  const canvas = document.createElement('canvas');
  canvas.width = 1080;
  canvas.height = 1600;
  const ctx = canvas.getContext('2d');
  const paper = ctx.createLinearGradient(0, 0, 0, 1600);
  paper.addColorStop(0, '#f5eddf');
  paper.addColorStop(1, '#e5d8c6');
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, 1080, 1600);
  ctx.strokeStyle = '#a56544';
  ctx.lineWidth = 2;
  ctx.strokeRect(44, 44, 992, 1512);
  ctx.fillStyle = '#87452e';
  ctx.font = '26px sans-serif';
  ctx.fillText('南风古灶 · 私人记忆', 82, 110);
  ctx.fillStyle = '#282019';
  ctx.font = 'bold 58px serif';
  wrapText(ctx, state.story?.title || '南风开窑记', 82, 200, 900, 74, 2);
  ctx.fillStyle = '#78695a';
  ctx.font = '26px sans-serif';
  ctx.fillText(moodLabel(state.story?.mood) + '　·　' + new Date(state.story?.createdAt || Date.now()).toLocaleDateString('zh-CN'), 82, 290);
  const chapters = state.story?.chapters || [];
  const mediaChapters = chapters.filter((chapter) => chapter.mediaUrl);
  const imageSources = mediaChapters.filter((chapter) => chapter.kind !== 'video').slice(0, 3);
  let y = 340;
  if (imageSources.length) {
    const gap = 15;
    const width = Math.floor((916 - gap * (imageSources.length - 1)) / imageSources.length);
    const height = imageSources.length === 1 ? 660 : 470;
    for (let i = 0; i < imageSources.length; i++) {
      const img = new Image();
      const imageReady = new Promise((resolve) => { img.onload = resolve; img.onerror = resolve; });
      img.src = imageSources[i].mediaUrl;
      if (!img.complete) {
        await Promise.race([imageReady, new Promise((resolve) => window.setTimeout(resolve, 3000))]);
      }
      const x = 82 + i * (width + gap);
      if (img.complete && img.naturalWidth) {
        const scale = Math.max(width / img.naturalWidth, height / img.naturalHeight);
        const sw = width / scale, sh = height / scale;
        const sx = (img.naturalWidth - sw) / 2, sy = (img.naturalHeight - sh) / 2;
        ctx.drawImage(img, sx, sy, sw, sh, x, y, width, height);
      } else {
        ctx.fillStyle = '#d7c5ad';
        ctx.fillRect(x, y, width, height);
      }
    }
    y += height + 44;
  } else {
    ctx.fillStyle = '#9a5638';
    ctx.font = '32px serif';
    ctx.fillText('这一程的记忆，已经封进窑里。', 82, 465);
    y = 540;
  }
  ctx.fillStyle = '#6b5b4c';
  ctx.font = '30px serif';
  const caption = mediaChapters.map((chapter) => chapter.caption).filter(Boolean).join('　/　');
  wrapText(ctx, caption || '把今天的记忆，烧成一段独一无二的故事。', 82, y, 900, 48, 3);
  ctx.fillStyle = '#8d4b31';
  ctx.font = '26px sans-serif';
  ctx.fillText('南风开窑记', 82, 1480);
  ctx.fillStyle = '#8a7a68';
  ctx.font = '19px sans-serif';
  ctx.fillText('扫描作品链接，打开这段记忆', 82, 1520);
  const blob = await new Promise((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) {
    toast('纪念卡未能生成，请尝试截图保存。');
    return;
  }
  if (state.posterUrl.startsWith('blob:')) URL.revokeObjectURL(state.posterUrl);
  state.posterUrl = URL.createObjectURL(blob);
  state.modal = { title: '纪念卡已做好', message: '长按图片保存到相册。' };
  render();
  toast('纪念卡已做好。');
}

function requestDelete() {
  state.modal = { title: '删除这份开窑记？', message: '页面和已上传素材会一并删除，删除后无法恢复。' };
  render();
}

async function deleteStory() {
  const storyId = state.story?.storyId;
  const token = storyId && localStorage.getItem(OWNER_PREFIX + storyId);
  if (!storyId || !token || state.demo) {
    toast('只有创建这份作品的浏览器可以删除它。');
    state.modal = null;
    render();
    return;
  }
  try {
    const response = await fetch('/api/stories/' + encodeURIComponent(storyId), { method: 'DELETE', headers: { 'X-Manage-Token': token } });
    if (!response.ok) throw new Error('删除失败，请稍后再试。');
    localStorage.removeItem(OWNER_PREFIX + storyId);
    window.history.pushState({}, '', window.location.pathname);
    resetDraft();
    state.screen = 'intro';
    state.modal = null;
    render();
    toast('这份作品和素材已删除。');
  } catch (error) {
    state.modal = null;
    render();
    toast(error.message || '删除失败，请稍后再试。');
  }
}

async function onAction(button) {
  const action = button.dataset.action;
  if (action === 'start') startExperience();
  else if (action === 'demo') exampleStory();
  else if (action === 'home') {
    window.history.pushState({}, '', window.location.pathname);
    resetDraft();
    state.screen = 'intro';
    render();
  } else if (action === 'back') {
    state.screen = 'intro';
    render();
  } else if (action === 'back-editor') {
    state.screen = 'editor';
    render();
  } else if (action === 'choose') {
    document.getElementById('file-' + button.dataset.id)?.click();
  } else if (action === 'expand-chapter') {
    state.expandedChapter = state.expandedChapter === button.dataset.id ? '' : button.dataset.id;
    render();
  } else if (action === 'remove-media') {
    const chapter = state.chapters.find((item) => item.id === button.dataset.id);
    if (chapter?.media?.url?.startsWith('blob:')) URL.revokeObjectURL(chapter.media.url);
    if (chapter) {
      chapter.media = null;
      chapter.sampleDismissed = true;
    }
    render();
  } else if (action === 'skip') {
    const chapter = state.chapters.find((item) => item.id === button.dataset.id);
    if (!chapter) return;
    if (!chapter.skipped && chapter.media?.url?.startsWith('blob:')) URL.revokeObjectURL(chapter.media.url);
    if (!chapter.skipped) chapter.media = null;
    chapter.skipped = !chapter.skipped;
    render();
  } else if (action === 'preview') {
    if (state.chapters.some((chapter) => chapter.processing)) {
      toast('素材正在整理，稍等一下就好。');
      return;
    }
    const hasMedia = state.chapters.some((chapter) => chapter.media?.file);
    if (!hasMedia) {
      toast('先留下一张照片或一段短片吧。');
      return;
    }
    state.screen = 'preview';
    render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (action === 'create') {
    if (state.busy) return;
    await createStory();
  } else if (action === 'reveal') {
    state.reveal = true;
    render();
    window.scrollTo(0, 0);
  } else if (action === 'share') {
    await shareStory();
  } else if (action === 'native-share') {
    await nativeShareStory();
  } else if (action === 'copy-share') {
    let copied = false;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      copied = await Promise.race([
        navigator.clipboard.writeText(state.shareUrl).then(() => true),
        new Promise((resolve) => window.setTimeout(() => resolve(false), 1200))
      ]);
    } catch { copied = false; }
    if (copied) button.textContent = '已复制';
    else {
      const field = document.querySelector('.share-link-field');
      field?.focus();
      field?.select();
      button.textContent = '请长按上方链接复制';
    }
  } else if (action === 'save-card') {
    await saveCard();
  } else if (action === 'edit') {
    await editCurrentStory();
  } else if (action === 'delete') {
    requestDelete();
  } else if (action === 'cancel-modal' || action === 'dismiss-modal') {
    const restoreSharePosition = Boolean(state.shareUrl);
    const shareReturnY = state.shareReturnY;
    state.modal = null;
    if (state.posterUrl.startsWith('blob:')) URL.revokeObjectURL(state.posterUrl);
    state.posterUrl = '';
    state.shareUrl = '';
    render();
    if (restoreSharePosition) window.requestAnimationFrame(() => window.scrollTo(0, shareReturnY));
  } else if (action === 'confirm-modal') {
    await deleteStory();
  }
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;
  if (button.dataset.action === 'dismiss-modal' && event.target.closest('.modal-sheet')) return;
  onAction(button);
});

app.addEventListener('input', (event) => {
  const title = event.target.closest('[data-title]');
  if (title) state.title = title.value;
  const caption = event.target.closest('[data-caption]');
  if (caption) {
    const chapter = state.chapters.find((item) => item.id === caption.dataset.caption);
    if (chapter) chapter.caption = caption.value;
  }
  const chapterTitle = event.target.closest('[data-chapter-title]');
  if (chapterTitle) {
    const chapter = state.chapters.find((item) => item.id === chapterTitle.dataset.chapterTitle);
    if (chapter) {
      chapter.title = chapterTitle.value;
      const number = String(state.chapters.indexOf(chapter) + 1).padStart(2, '0');
      const heading = chapterTitle.closest('.chapter-card')?.querySelector('.chapter-toggle-title');
      if (heading) heading.textContent = chapter.title.trim() || '片段 ' + number;
    }
  }
});

app.addEventListener('change', (event) => {
  if (event.target.matches('input[name=\"mood\"]')) {
    state.mood = event.target.value;
    const title = document.querySelector('[data-title]');
    if (title && !state.title) {
      const previewTitle = document.querySelector('.preview-cover-copy h2');
      if (previewTitle) previewTitle.textContent = suggestedTitle();
    }
  }
  if (event.target.matches('.file-input')) handleFiles(event.target);
});

window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  if (params.has('story')) loadStory(params.get('story'));
  else {
    state.screen = 'intro';
    render();
  }
});

async function boot() {
  if (window.location.protocol === 'file:') {
    state.screen = 'service-required';
    render();
    return;
  }
  openSpotCode();
  const params = new URLSearchParams(window.location.search);
  if (params.has('story')) {
    await loadStory(params.get('story'));
    return;
  }
  if (params.get('demo') === '1') {
    exampleStory();
    return;
  }
  if (params.get('screen') === 'editor') {
    state.screen = 'editor';
    render();
    return;
  }
  render();
}

boot();
