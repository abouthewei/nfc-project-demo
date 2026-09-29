(() => {
  const WIDTH = 1080;
  const GUTTER = 88;
  const CONTENT_WIDTH = WIDTH - GUTTER * 2;
  const MAX_PHOTO_HEIGHT = 1120;

  function loadImage(url) {
    if (!url) return Promise.resolve(null);
    return new Promise((resolve) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = url;
    });
  }

  function wrapLines(context, text, maxWidth) {
    const lines = [];
    const paragraphs = String(text || '').split('\n');
    for (const paragraph of paragraphs) {
      let line = '';
      for (const character of Array.from(paragraph)) {
        const next = line + character;
        if (line && context.measureText(next).width > maxWidth) {
          lines.push(line);
          line = character;
        } else {
          line = next;
        }
      }
      lines.push(line);
    }
    return lines.length ? lines : [''];
  }

  function drawLines(context, lines, x, y, lineHeight) {
    lines.forEach((line, index) => context.fillText(line, x, y + index * lineHeight));
    return y + lines.length * lineHeight;
  }

  function drawCover(context, image, height) {
    if (!image) return;
    const scale = Math.max(WIDTH / image.naturalWidth, height / image.naturalHeight);
    const sourceWidth = WIDTH / scale;
    const sourceHeight = height / scale;
    const sourceX = (image.naturalWidth - sourceWidth) / 2;
    const sourceY = (image.naturalHeight - sourceHeight) / 2;
    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, WIDTH, height);
  }

  function drawPhoto(context, image, x, y, width, maxHeight) {
    const scale = Math.min(width / image.naturalWidth, maxHeight / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const frameHeight = Math.max(430, drawHeight);
    const frameY = y + Math.max(0, (frameHeight - drawHeight) / 2);

    context.fillStyle = '#fffaf0';
    context.fillRect(x - 12, y - 12, width + 24, frameHeight + 30);
    context.strokeStyle = 'rgba(157,119,79,.38)';
    context.lineWidth = 2;
    context.strokeRect(x - 12, y - 12, width + 24, frameHeight + 30);
    context.drawImage(image, x + (width - drawWidth) / 2, frameY, drawWidth, drawHeight);
    return frameHeight + 34;
  }

  function toBlob(canvas, quality) {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error('长图导出失败，请再试一次。'));
      }, 'image/jpeg', quality);
    });
  }

  async function render(story) {
    if (!story || !Array.isArray(story.chapters)) throw new Error('没有找到可生成的旅行记内容。');
    if (document.fonts?.ready) await document.fonts.ready.catch(() => {});

    const visible = story.chapters.filter((chapter) => !chapter.skipped && (chapter.mediaUrl || chapter.posterUrl || chapter.caption || chapter.title));
    const prepared = await Promise.all(visible.map(async (chapter) => {
      const mediaUrl = chapter.kind === 'video' ? (chapter.posterUrl || '') : (chapter.mediaUrl || '');
      const image = await loadImage(mediaUrl);
      return { chapter, image };
    }));
    const coverImage = prepared.find((item) => item.image)?.image || null;

    const measureCanvas = document.createElement('canvas');
    const measure = measureCanvas.getContext('2d');
    if (!measure) throw new Error('当前浏览器无法生成长图。');

    let totalHeight = 980 + 220 + 250;
    for (const { chapter, image } of prepared) {
      measure.font = '500 43px "Songti SC", "Noto Serif SC", serif';
      const titleLines = chapter.title ? wrapLines(measure, chapter.title, CONTENT_WIDTH - 130) : [];
      measure.font = '34px "Songti SC", "Noto Serif SC", serif';
      const captionLines = chapter.caption ? wrapLines(measure, '“' + chapter.caption + '”', CONTENT_WIDTH - 30) : [];
      const photoHeight = image ? Math.min(MAX_PHOTO_HEIGHT, Math.max(430, CONTENT_WIDTH * image.naturalHeight / image.naturalWidth)) : 0;
      const mediaHeight = image ? photoHeight + 74 : (chapter.kind === 'video' ? 258 : 20);
      totalHeight += 86 + Math.max(60, titleLines.length * 58) + mediaHeight + (captionLines.length ? captionLines.length * 58 + 34 : 20) + 62;
    }
    if (totalHeight > 12000) throw new Error('照片数量或尺寸过大，暂时无法合成长图。请减少内容后再试。');

    const canvas = document.createElement('canvas');
    canvas.width = WIDTH;
    canvas.height = Math.ceil(totalHeight);
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) throw new Error('当前浏览器无法生成长图。');

    const paper = context.createLinearGradient(0, 0, 0, canvas.height);
    paper.addColorStop(0, '#f8f2e7');
    paper.addColorStop(1, '#eee3d2');
    context.fillStyle = paper;
    context.fillRect(0, 0, WIDTH, canvas.height);
    const texture = await loadImage('./assets/paper-grain.webp');
    if (texture) {
      const pattern = context.createPattern(texture, 'repeat');
      if (pattern) {
        context.save();
        context.globalAlpha = .11;
        context.fillStyle = pattern;
        context.fillRect(0, 0, WIDTH, canvas.height);
        context.restore();
      }
    }

    const coverHeight = 980;
    drawCover(context, coverImage, coverHeight);
    const fade = context.createLinearGradient(0, coverHeight * .56, 0, coverHeight + 5);
    fade.addColorStop(0, 'rgba(248,242,231,0)');
    fade.addColorStop(.64, 'rgba(248,242,231,.82)');
    fade.addColorStop(1, '#f8f2e7');
    context.fillStyle = fade;
    context.fillRect(0, coverHeight * .55, WIDTH, coverHeight * .46);

    context.fillStyle = '#fff8ed';
    context.font = '500 29px "Songti SC", "Noto Serif SC", serif';
    context.fillText('南风古灶  ·  佛山', GUTTER, 84);
    context.fillStyle = '#34251a';
    context.font = '600 68px "Songti SC", "Noto Serif SC", serif';
    const titleLines = wrapLines(context, story.title || '南风开窑记', WIDTH - GUTTER * 2);
    let cursorY = drawLines(context, titleLines.slice(0, 2), GUTTER, coverHeight - 280, 82);
    context.fillStyle = '#735941';
    context.font = '30px "Songti SC", "Noto Serif SC", serif';
    cursorY = drawLines(context, ['在窑火与榕荫之间，收藏今天'], GUTTER, cursorY + 18, 48);
    context.fillStyle = '#806a52';
    context.font = '23px -apple-system, BlinkMacSystemFont, sans-serif';
    const dateLabel = new Date(story.createdAt || Date.now()).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' });
    context.fillText(dateLabel + '　·　' + (story.moodLabel || story.mood || '慢慢逛'), GUTTER, coverHeight - 45);

    cursorY = coverHeight + 42;
    context.fillStyle = '#6f5842';
    context.font = '32px "Songti SC", "Noto Serif SC", serif';
    cursorY = drawLines(context, ['把走过的地方、遇见的人和手心的温度，', '慢慢写进这一页。'], GUTTER, cursorY, 50);
    context.fillStyle = '#a45a38';
    context.font = '23px -apple-system, BlinkMacSystemFont, sans-serif';
    context.fillText('佛山 · 南风古灶', GUTTER, cursorY + 14);
    cursorY += 112;

    for (let index = 0; index < prepared.length; index += 1) {
      const { chapter, image } = prepared[index];
      const number = String(index + 1).padStart(2, '0');
      cursorY += 42;
      context.fillStyle = '#a45132';
      context.font = 'italic 44px Georgia, "Songti SC", serif';
      context.fillText(number, GUTTER, cursorY + 42);
      context.strokeStyle = 'rgba(157,119,79,.55)';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(GUTTER + 76, cursorY + 4);
      context.lineTo(GUTTER + 76, cursorY + 56);
      context.stroke();
      context.fillStyle = '#382a1f';
      context.font = '500 43px "Songti SC", "Noto Serif SC", serif';
      if (chapter.title) {
        const chapterTitleLines = wrapLines(context, chapter.title, CONTENT_WIDTH - 105);
        cursorY = drawLines(context, chapterTitleLines, GUTTER + 104, cursorY + 43, 58) + 28;
      } else {
        cursorY += 24;
      }

      if (image) cursorY += drawPhoto(context, image, GUTTER + 10, cursorY, CONTENT_WIDTH - 20, MAX_PHOTO_HEIGHT);
      else if (chapter.kind === 'video') {
        context.fillStyle = '#e3d5c2';
        context.fillRect(GUTTER + 10, cursorY, CONTENT_WIDTH - 20, 200);
        context.fillStyle = '#8a6148';
        context.font = '30px "Songti SC", "Noto Serif SC", serif';
        context.fillText('短片回忆', GUTTER + 42, cursorY + 78);
        context.font = '23px -apple-system, BlinkMacSystemFont, sans-serif';
        context.fillText('原视频保存在这部手机中', GUTTER + 42, cursorY + 126);
        cursorY += 238;
      }

      if (chapter.caption) {
        context.fillStyle = '#594637';
        context.font = '34px "Songti SC", "Noto Serif SC", serif';
        const lines = wrapLines(context, '“' + chapter.caption + '”', CONTENT_WIDTH - 30);
        cursorY = drawLines(context, lines, GUTTER + 12, cursorY + 28, 58) + 18;
      }
      cursorY += 28;
      context.strokeStyle = 'rgba(159,126,94,.32)';
      context.beginPath();
      context.moveTo(GUTTER, cursorY);
      context.lineTo(WIDTH - GUTTER, cursorY);
      context.stroke();
      cursorY += 18;
    }

    cursorY += 65;
    context.fillStyle = '#985034';
    context.beginPath();
    context.arc(WIDTH / 2, cursorY + 28, 31, 0, Math.PI * 2);
    context.fill();
    context.fillStyle = '#fff6e8';
    context.font = '24px "Songti SC", "Noto Serif SC", serif';
    context.textAlign = 'center';
    context.fillText('南风', WIDTH / 2, cursorY + 36);
    context.fillStyle = '#573c29';
    context.font = '38px "Songti SC", "Noto Serif SC", serif';
    context.fillText('这一程，已珍藏。', WIDTH / 2, cursorY + 105);
    context.fillStyle = '#9a8064';
    context.font = '23px "Songti SC", "Noto Serif SC", serif';
    context.fillText('愿每一次回望，都有窑火的温度', WIDTH / 2, cursorY + 153);
    context.font = '18px -apple-system, BlinkMacSystemFont, sans-serif';
    context.fillText('— 南风古灶 —', WIDTH / 2, cursorY + 205);
    context.textAlign = 'start';

    const blob = await toBlob(canvas, .9);
    if (blob.size > 18 * 1024 * 1024) return toBlob(canvas, .76);
    return blob;
  }

  window.TravelogueImage = { render };
})();
