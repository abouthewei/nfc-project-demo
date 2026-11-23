(() => {
  const defaults = {
    previous: 'ArrowLeft',
    next: 'ArrowRight',
    confirm: ['Enter', 'Space'],
    back: 'b',
    fullscreen: 'f'
  };
  const targetSelector = 'a[href],button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),video[controls],[role="button"],[role="link"],[role="tab"],[role="menuitem"],[tabindex]:not([tabindex="-1"]),[data-rotary-target],img[alt]:not([alt=""])';
  const fullscreenSelector = 'video,[data-rotary-fullscreen],iframe[allowfullscreen],iframe[allow*="fullscreen"]';
  const playSelector = '[data-rotary-play],.tribute-video,.video-poster,.lebron-poster,.timeline-video-trigger,.work-video-trigger,#playVideo,#gallery-dialog-video-toggle,.video-frame[role="button"]';

  const normalizeKey = key => key === 'Space' ? ' ' : key.length === 1 ? key.toLowerCase() : key;
  const keyMatches = (key, eventKey) => (Array.isArray(key) ? key : [key]).some(value =>
    typeof value === 'string' && normalizeKey(value) === normalizeKey(eventKey)
  );

  function enterFullscreen(target) {
    if (document.fullscreenElement || !target?.requestFullscreen) return;
    try { target.requestFullscreen()?.catch(() => {}); }
    catch { /* Playback remains available if the host refuses fullscreen. */ }
  }

  function init(options = {}) {
    const keys = { ...defaults, ...options.keys };
    const wrap = options.wrap !== false;
    const highlightStyle = {
      outline: '3px solid #e5b454',
      outlineOffset: '5px',
      boxShadow: '0 0 0 8px rgba(229,180,84,.18)',
      ...options.highlightStyle
    };
    const css = Object.entries(highlightStyle).map(([property, value]) => {
      const cssProperty = property.startsWith('--') ? property : property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
      return `${cssProperty}:${value} !important`;
    }).join(';');
    const style = document.createElement('style');
    style.textContent = `.rotary-focus{${css}}`;
    document.head.append(style);
    let rotaryFocus = null;
    let rotaryHighlight = null;
    let rotaryScope = null;
    const historyStack = [];

    document.querySelectorAll('img[alt]:not([alt=""])').forEach(image => {
      if ((!image.closest('a[href],button') || image.hasAttribute('data-rotary-target')) && !image.hasAttribute('tabindex')) image.tabIndex = -1;
    });

    function targets() {
      return [...document.querySelectorAll(targetSelector)].filter(element => {
        if (element.closest('[hidden],[inert],[aria-hidden="true"],[aria-disabled="true"],[data-rotary-skip]')) return false;
        if (element.matches('img') && element.closest('a[href],button') && !element.hasAttribute('data-rotary-target')) return false;
        for (let parent = element; parent; parent = parent.parentElement) {
          const computed = getComputedStyle(parent);
          if (computed.display === 'none' || computed.visibility === 'hidden' || Number(computed.opacity) === 0) return false;
        }
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      });
    }

    function focusTarget(target, scroll = true) {
      if (!target?.isConnected) return;
      rotaryHighlight?.classList.remove('rotary-focus');
      rotaryFocus = target;
      rotaryHighlight = target.closest('[data-rotary-highlight]') || target;
      rotaryScope = target.closest('[data-rotary-highlight],figure') || target.parentElement;
      target.closest('[data-rotary-nav]')?.removeAttribute('data-rotary-hidden');
      if (!target.matches('a[href],button,input,select,textarea,[tabindex]')) target.tabIndex = -1;
      rotaryHighlight.classList.add('rotary-focus');
      target.focus({ preventScroll: true });
      if (scroll) {
        const rect = rotaryHighlight.getBoundingClientRect();
        if (rotaryHighlight.hasAttribute('data-rotary-center') || rect.top < 0 || rect.bottom > window.innerHeight) {
          rotaryHighlight.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
        }
      }
    }

    function restoreLocation(location) {
      if (!location) return;
      window.scrollTo({ top: location.scrollY, behavior: 'smooth' });
      const visibleTargets = targets();
      const target = location.focus?.isConnected && visibleTargets.includes(location.focus)
        ? location.focus
        : visibleTargets.find(element => {
          const rect = element.getBoundingClientRect();
          return !element.closest('[data-rotary-nav]') && rect.bottom > 0 && rect.top < window.innerHeight;
        });
      if (target) focusTarget(target, false);
    }

    function focusHashDestination(hash = location.hash, scroll = true) {
      if (!hash || hash === '#') return;
      const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!destination) return;
      const candidates = targets();
      const target = candidates.find(element => destination.contains(element)) ||
        candidates.find(element => destination.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (target) focusTarget(target, scroll);
    }

    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const rotaryDestination = event.target.closest?.('[data-rotary-destination]');
      if (!rotaryDestination) return;
      requestAnimationFrame(() => focusHashDestination(rotaryDestination.dataset.rotaryDestination, false));
    }, true);

    document.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      const link = event.target.closest?.('a[href]');
      if (!link) return;
      const destination = new URL(link.href, location.href);
      if (destination.origin !== location.origin || destination.pathname !== location.pathname || destination.search !== location.search || !destination.hash) return;
      if (destination.hash !== location.hash) {
        const focus = rotaryFocus || (document.activeElement === document.body ? null : document.activeElement);
        historyStack.push({ fromHash: location.hash, scrollY: window.scrollY, focus });
      }
      requestAnimationFrame(() => focusHashDestination(destination.hash));
    });

    window.addEventListener('hashchange', () => {
      requestAnimationFrame(() => {
        const previous = historyStack[historyStack.length - 1];
        if (previous?.fromHash === location.hash) {
          historyStack.pop();
          restoreLocation(previous);
          return;
        }
        focusHashDestination();
      });
    });

    document.addEventListener('focusin', event => {
      // Fragment navigation can briefly move native focus to body; keep the rotary position.
      if (event.target !== document.body && event.target !== rotaryFocus) {
        rotaryHighlight?.classList.remove('rotary-focus');
        rotaryFocus = null;
        rotaryHighlight = null;
        rotaryScope = null;
      }
    });

    document.addEventListener('keydown', event => {
      if (event.defaultPrevented) return;
      const active = event.target;
      if (active.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(active.tagName)) return;
      const deviceOK = event.key === 'Accept';
      const currentTarget = rotaryFocus?.isConnected ? rotaryFocus : document.activeElement;
      const videoFullscreen = deviceOK && (
        currentTarget?.matches?.(fullscreenSelector) || rotaryScope?.querySelector(fullscreenSelector)
      );

      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat && (videoFullscreen || keyMatches(keys.fullscreen, event.key))) {
        const active = document.activeElement;
        const target = active.matches?.(fullscreenSelector)
          ? active
          : [rotaryScope?.querySelector(fullscreenSelector), ...document.querySelectorAll(fullscreenSelector)].find(element => {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            const computed = getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && computed.display !== 'none' && computed.visibility !== 'hidden';
          });
        if (document.fullscreenElement || target?.requestFullscreen) {
          event.preventDefault();
          const request = document.fullscreenElement ? document.exitFullscreen() : target.requestFullscreen();
          request?.catch(() => {});
        }
        return;
      }

      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat && keyMatches(keys.back, event.key)) {
        event.preventDefault();
        event.stopImmediatePropagation();
        options.beforeBack?.();
        const previous = historyStack.pop();
        if (previous) {
          const url = previous.fromHash || location.href.split('#')[0];
          try { history.replaceState(history.state, '', url); }
          catch { location.hash = previous.fromHash; }
          restoreLocation(previous);
        }
        return;
      }

      const videoOnly = event.key === 'MediaPlayPause';
      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat && (videoOnly || deviceOK || keyMatches(keys.confirm, event.key))) {
        const poster = options.beforeConfirm?.();
        if (poster) {
          event.preventDefault();
          Promise.resolve(poster).then(target => {
            if (target) focusTarget(target, false);
          });
          return;
        }
        const target = rotaryFocus?.isConnected ? rotaryFocus : document.activeElement;
        const video = target?.matches?.('video') ? target
          : target?.matches?.(playSelector) ? target.querySelector?.('video')
          : target === document.body ? rotaryScope?.querySelector('video') : null;
        if (video) {
          event.preventDefault();
          if (video.paused) {
            video.play()?.catch(() => {});
            enterFullscreen(video);
          }
          else video.load();
          return;
        }
        if (typeof target?.click === 'function' && (!videoOnly || target.matches?.(playSelector))) {
          event.preventDefault();
          const scope = target.closest('[data-rotary-highlight],figure') || target.parentElement;
          const isPlay = target.matches(playSelector);
          target.click();
          rotaryScope = scope;
          if (isPlay) {
            // React replaces the poster with the player after the click handler returns.
            requestAnimationFrame(() => enterFullscreen(scope?.querySelector?.(fullscreenSelector)));
          }
        }
        return;
      }

      const direction = keyMatches(keys.next, event.key) ? 1 : keyMatches(keys.previous, event.key) ? -1 : 0;
      if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
      let candidates = targets();
      if (!candidates.length) return;
      event.preventDefault();
      const moveTarget = candidates.includes(rotaryFocus) ? rotaryFocus : document.activeElement;
      const currentIndex = candidates.indexOf(moveTarget);
      if (!wrap && (
        (direction < 0 && currentIndex === 0) ||
        (direction > 0 && currentIndex === candidates.length - 1)
      )) return;

      const origin = options.beforeMove?.({ direction, activeElement: document.activeElement });
      const isAsyncOrigin = Boolean(origin?.then);
      const move = resolved => {
        if (resolved || isAsyncOrigin) candidates = targets();
        const current = candidates.indexOf(resolved || (candidates.includes(rotaryFocus) ? rotaryFocus : document.activeElement));
        const next = current < 0
          ? (direction > 0 ? 0 : candidates.length - 1)
          : wrap ? (current + direction + candidates.length) % candidates.length : current + direction;
        if (next < 0 || next >= candidates.length) return;
        focusTarget(candidates[next]);
      };
      if (isAsyncOrigin) origin.then(move, () => move(null));
      else move(origin);
    });

    return {
      focus: (target, scroll = true) => focusTarget(target, scroll)
    };
  }

  function sendDeviceKey(key) {
    // Use the page's keyboard handlers too, including video and dialog navigation.
    const target = document.activeElement || document.body;
    target.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
  }

  function isBrowserBack(event) {
    return ['BrowserBack', 'GoBack', 'Back'].includes(event.key) ||
      (event.key === 'ArrowLeft' && event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey);
  }

  for (const type of ['keydown', 'keyup']) {
    document.addEventListener(type, event => {
      if (!isBrowserBack(event)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (type === 'keydown' && !event.repeat) sendDeviceKey('b');
    }, true);
  }

  Object.assign(window, {
    onPlayBtnPressed: () => sendDeviceKey('MediaPlayPause'),
    onPlayBtnRelease: () => {},
    onBackBtnPressed: () => { sendDeviceKey('b'); return true; },
    onBackBtnRelease: () => true,
    onOKBtnPressed: () => sendDeviceKey('Accept'),
    onOKBtnRelease: () => {},
    onClockwiseRoll: () => sendDeviceKey('ArrowRight'),
    onCounterClockwiseRoll: () => sendDeviceKey('ArrowLeft')
  });

  window.RotarySDK = { init };
})();
