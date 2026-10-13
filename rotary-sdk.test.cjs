const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

class KeyboardEvent extends Event {
  constructor(type, options) {
    super(type, options);
    this.key = options.key;
  }
}

function page() {
  const document = new EventTarget();
  const window = new EventTarget();
  const events = [];
  let backCount = 0;
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
  window.innerHeight = 500;
  vm.runInNewContext(fs.readFileSync(`${__dirname}/rotary-sdk.js`, 'utf8'), {
    document, window, KeyboardEvent,
    getComputedStyle: () => ({ display: 'block', visibility: 'visible', opacity: '1' }),
    history: { back() { backCount++; } }
  });
  return { document, window, links, events, element, backCount: () => backCount };
}

const mapping = {
  onPlayBtnPressed: 'Enter', onOKBtnPressed: 'f', onBackBtnPressed: 'b',
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
  send('onOKBtnPressed');
  assert.equal(p.links[0].clicks, 1);
  send('onBackBtnPressed');
  assert.equal(p.backCount(), 1);
}

for (const input of ['keyboard', 'device']) {
  const p = page();
  let entered = 0;
  let exited = 0;
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
  p.window.RotarySDK.init();
  const send = () => input === 'device' ? p.window.onOKBtnPressed()
    : video.dispatchEvent(new KeyboardEvent('keydown', { key: 'f', bubbles: true, cancelable: true }));
  send();
  assert.equal(entered, 1);
  p.window.onOKBtnRelease();
  assert.equal(exited, 0, 'release must not exit fullscreen');
  send();
  assert.equal(exited, 1);
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
    const p = page();
    let playing = false;
    const poster = p.links[0];
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
  p.document.activeElement = video;
  p.window.RotarySDK.init();
  p.window.onPlayBtnPressed();
  assert(!video.paused);
  p.window.onPlayBtnPressed();
  assert(video.paused);
}
checkPlaybackToggle().then(() => {
  console.log('Device/keyboard mappings, fullscreen, playback/poster toggle and navigation passed.');
}, error => { console.error(error); process.exitCode = 1; });
