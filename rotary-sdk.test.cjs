const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class KeyboardEvent extends Event {
  constructor(type, options) {
    super(type, options);
    this.key = options.key;
    this.altKey = Boolean(options.altKey);
    this.repeat = Boolean(options.repeat);
  }
}

function page(deferFrames = false) {
  const document = new EventTarget();
  const window = new EventTarget();
  const events = [];
  let backCount = 0;
  const replacements = [];
  const frames = [];
  const location = { href: 'https://example.test/demo/index.html', origin: 'https://example.test', pathname: '/demo/index.html', search: '', hash: '' };
  const element = tagName => ({
    tagName,
    isConnected: true,
    clicks: 0,
    classList: { add() {}, remove() {} },
    matches: selector => tagName === 'A' && selector.includes('a[href]'),
    closest: () => null,
    hasAttribute: () => false,
    getBoundingClientRect: () => ({ width: 100, height: 30, top: 10, bottom: 40 }),
    focus() { document.activeElement = this; },
    click() { this.clicks++; },
    dispatchEvent(event) {
      events.push({ target: this, key: event.key, bubbles: event.bubbles, cancelable: event.cancelable });
      Object.defineProperty(event, 'target', { value: this });
      return document.dispatchEvent(event);
    }
  });
  const links = [element('A'), element('A'), element('A')];
  document.body = element('BODY');
  document.activeElement = document.body;
  document.head = { append() {} };
  document.createElement = () => ({});
  document.querySelectorAll = selector => selector.startsWith('a[href]') ? links : [];
  document.getElementById = () => null;
  window.innerHeight = 500;
  window.scrollY = 0;
  window.scrollTo = () => {};
  vm.runInNewContext(fs.readFileSync(`${__dirname}/rotary-sdk.js`, 'utf8'), {
    document, window, KeyboardEvent, location, URL,
    requestAnimationFrame: callback => deferFrames ? frames.push(callback) : callback(),
    getComputedStyle: () => ({ display: 'block', visibility: 'visible', opacity: '1' }),
    history: {
      back() { backCount++; },
      replaceState(state, title, url) {
        replacements.push(url);
        const destination = new URL(url, location.href);
        location.href = destination.href;
        location.hash = destination.hash;
      }
    }
  });
  return { document, window, links, events, element, location, replacements, frames, backCount: () => backCount };
}

const mapping = {
  onPlayBtnPressed: 'MediaPlayPause', onOKBtnPressed: 'Accept', onBackBtnPressed: 'b',
  onClockwiseRoll: 'ArrowRight', onCounterClockwiseRoll: 'ArrowLeft'
};
const callbacks = page();
for (const [name, key] of Object.entries(mapping)) {
  callbacks.document.activeElement = callbacks.links[1];
  callbacks.window[name]();
  assert.deepEqual(callbacks.events.at(-1), { target: callbacks.links[1], key, bubbles: true, cancelable: true });
}
const count = callbacks.events.length;
for (const name of ['onPlayBtnRelease', 'onOKBtnRelease', 'onBackBtnRelease']) callbacks.window[name]();
assert.equal(callbacks.events.length, count, 'release must not trigger a second action');

for (const input of ['keyboard', 'device']) {
  const p = page();
  p.window.RotarySDK.init();
  const send = name => input === 'device' ? p.window[name]()
    : p.document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: mapping[name], bubbles: true, cancelable: true }));
  send('onClockwiseRoll');
  assert.equal(p.document.activeElement, p.links[0]);
  send('onClockwiseRoll');
  assert.equal(p.document.activeElement, p.links[1]);
  send('onCounterClockwiseRoll');
  assert.equal(p.document.activeElement, p.links[0]);
  send('onPlayBtnPressed');
  assert.equal(p.links[0].clicks, 0, 'Play must not confirm a link');
  send('onOKBtnPressed');
  assert.equal(p.links[0].clicks, 1);
  send('onBackBtnPressed');
  assert.equal(p.backCount(), 0, 'Back must never leave the page through browser history');
}

for (const key of ['BrowserBack', 'GoBack', 'Back', 'ArrowLeft']) {
  const p = page();
  let handled = 0;
  p.window.RotarySDK.init({ beforeBack: () => handled++ });
  const event = new KeyboardEvent('keydown', { key, altKey: key === 'ArrowLeft', bubbles: true, cancelable: true });
  p.document.body.dispatchEvent(event);
  assert(event.defaultPrevented, `${key}: block native browser back`);
  assert.equal(handled, 1);
  const release = new KeyboardEvent('keyup', { key, altKey: key === 'ArrowLeft', bubbles: true, cancelable: true });
  p.document.body.dispatchEvent(release);
  assert(release.defaultPrevented);
  assert.equal(handled, 1, 'release must not cause another return');
  assert.equal(p.backCount(), 0);
}

const inPage = page();
const link = inPage.links[0];
link.href = `${inPage.location.href}#chapter`;
link.closest = selector => selector === 'a[href]' ? link : null;
inPage.window.RotarySDK.init().focus(link, false);
const click = new Event('click', { bubbles: true, cancelable: true });
click.button = 0;
link.dispatchEvent(click);
inPage.location.hash = '#chapter';
inPage.location.href += '#chapter';
assert.equal(inPage.window.onBackBtnPressed(), true, 'native host can consume the handled callback');
assert.equal(inPage.location.hash, '');
assert.equal(inPage.replacements.length, 1);
assert.equal(inPage.backCount(), 0);
inPage.window.onBackBtnPressed();
assert.equal(inPage.replacements.length, 1, 'extra Back at the root is a no-op');
assert.equal(inPage.window.onBackBtnRelease(), true);

for (const input of ['keyboard', 'device']) {
  const p = page();
  let entered = 0;
  let exited = 0;
  let restored = 0;
  const video = p.element('VIDEO');
  video.matches = selector => selector.startsWith('video');
  video.requestFullscreen = () => {
    entered++;
    p.document.fullscreenElement = video;
  };
  p.document.exitFullscreen = () => {
    exited++;
    p.document.fullscreenElement = null;
  };
  p.document.activeElement = video;
  p.window.RotarySDK.init({ beforeConfirm: () => { restored++; return p.links[0]; } });
  const send = () => input === 'device' ? p.window.onOKBtnPressed()
    : video.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true, cancelable: true }));
  send();
  assert.equal(entered, 1);
  p.window.onOKBtnRelease();
  assert.equal(exited, 0, 'release must not exit fullscreen');
  send();
  assert.equal(exited, 1);
  assert.equal(restored, 0, 'OK fullscreen must not restore the cover');
  assert.equal(video.clicks, 0, 'OK must not activate the play button');
}

const intercepted = page();
intercepted.document.addEventListener('keydown', event => event.preventDefault());
intercepted.window.RotarySDK.init();
intercepted.window.onClockwiseRoll();
assert.equal(intercepted.document.activeElement, intercepted.document.body, 'page handlers can intercept device input');

const player = page();
player.document.activeElement = player.element('IFRAME');
player.window.RotarySDK.init({ beforeMove: () => player.links[0] });
player.window.onClockwiseRoll();
assert.equal(player.document.activeElement, player.links[1], 'device navigation restores the video origin');
async function checkPlaybackToggle() {
  for (const input of ['keyboard', 'device']) {
    for (const mode of ['supported', 'unsupported', 'rejected', 'throws', 'already-fullscreen']) {
      const p = page(true);
      const poster = p.links[0];
      const scope = p.element('FIGURE');
      const player = p.element('IFRAME');
      let mounted = false;
      let entered = 0;
      poster.matches = selector => selector.includes('[data-rotary-play]');
      poster.closest = () => scope;
      poster.click = () => { mounted = true; };
      scope.querySelector = () => mounted ? player : null;
      if (mode !== 'unsupported') player.requestFullscreen = () => {
        entered++;
        if (mode === 'throws') throw new Error('Fullscreen denied');
        if (mode === 'rejected') return Promise.reject(new Error('Fullscreen denied'));
        p.document.fullscreenElement = player;
        return Promise.resolve();
      };
      if (mode === 'already-fullscreen') p.document.fullscreenElement = scope;
      p.document.activeElement = poster;
      p.window.RotarySDK.init();
      if (input === 'device') p.window.onPlayBtnPressed();
      else poster.dispatchEvent(new KeyboardEvent('keydown', { key: 'MediaPlayPause', bubbles: true, cancelable: true }));
      assert(mounted, 'start playback before requesting fullscreen');
      assert.equal(entered, 0, 'wait for the player to render');
      p.frames.splice(0).forEach(callback => callback());
      assert.equal(entered, ['unsupported', 'already-fullscreen'].includes(mode) ? 0 : 1, `${input}: ${mode}`);
      await Promise.resolve();
    }
  }
  for (const className of ['.tribute-video', '.video-poster', '.lebron-poster', '.timeline-video-trigger', '.work-video-trigger', '#playVideo', '#gallery-dialog-video-toggle', '.video-frame[role="button"]']) {
    const p = page();
    const poster = p.links[0];
    poster.matches = selector => selector.includes(className);
    p.document.activeElement = poster;
    p.window.RotarySDK.init();
    p.window.onPlayBtnPressed();
    assert.equal(poster.clicks, 1, `legacy poster ${className} must play without the new marker`);
  }
  for (const input of ['keyboard', 'device']) {
    const p = page();
    let playing = false;
    const poster = p.links[0];
    poster.matches = selector => selector.includes('[data-rotary-play]') || selector.includes('a[href]');
    poster.click = () => {
      poster.clicks++;
      playing = true;
      poster.isConnected = false;
      p.document.activeElement = p.element('IFRAME');
    };
    p.window.RotarySDK.init({ beforeConfirm: () => {
      if (!playing) return null;
      playing = false;
      poster.isConnected = true;
      return Promise.resolve(poster);
    } });
    p.document.activeElement = poster;
    const send = () => input === 'device' ? p.window.onPlayBtnPressed()
      : p.document.activeElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    send();
    assert(playing);
    send();
    await new Promise(setImmediate);
    assert(!playing);
    assert.equal(p.document.activeElement, poster);
    assert.equal(poster.clicks, 1, 'restoring the poster must not immediately play again');
    send();
    assert(playing);
    assert.equal(poster.clicks, 2);
  }
  const p = page();
  const video = p.element('VIDEO');
  video.matches = selector => selector === 'video';
  video.paused = true;
  video.play = () => { video.paused = false; };
  video.load = () => { video.paused = true; };
  let entered = 0;
  video.requestFullscreen = () => { entered++; };
  p.document.activeElement = video;
  p.window.RotarySDK.init();
  p.window.onPlayBtnPressed();
  assert(!video.paused);
  assert.equal(entered, 1, 'native video enters fullscreen when playback starts');
  p.window.onPlayBtnPressed();
  assert(video.paused);
  assert.equal(entered, 1, 'restoring the poster must not request fullscreen');
}
checkPlaybackToggle().then(() => {
  console.log('Device/keyboard mappings, fullscreen, playback/poster toggle and navigation passed.');
}, error => { console.error(error); process.exitCode = 1; });
