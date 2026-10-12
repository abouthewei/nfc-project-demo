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

  const normalizeKey = key => key === 'Space' ? ' ' : key.length === 1 ? key.toLowerCase() : key;
  const keyMatches = (key, eventKey) => (Array.isArray(key) ? key : [key]).some(value =>
    typeof value === 'string' && normalizeKey(value) === normalizeKey(eventKey)
  );

  function init(options = {}) {
    const keys = { ...defaults, ...options.keys };
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
    let pendingReturn = null;

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
        const rect = target.getBoundingClientRect();
        if (rect.top < 0 || rect.bottom > window.innerHeight) {
          target.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
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

    function focusHashDestination(hash = location.hash) {
      if (!hash || hash === '#') return;
      const destination = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (!destination) return;
      const candidates = targets();
      const target = candidates.find(element => destination.contains(element)) ||
        candidates.find(element => destination.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING);
      if (target) focusTarget(target);
    }

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
        if (pendingReturn) {
          restoreLocation(pendingReturn);
          pendingReturn = null;
          return;
        }
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
      if (event.target !== rotaryFocus) {
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

      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat && keyMatches(keys.fullscreen, event.key)) {
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
        options.beforeBack?.();
        pendingReturn = historyStack.pop() || null;
        history.back();
        return;
      }

      if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.repeat && keyMatches(keys.confirm, event.key)) {
        const target = rotaryFocus?.isConnected ? rotaryFocus : document.activeElement;
        if (typeof target?.click === 'function') {
          event.preventDefault();
          const scope = target.closest('[data-rotary-highlight],figure') || target.parentElement;
          target.click();
          rotaryScope = scope;
        }
        return;
      }

      const direction = keyMatches(keys.next, event.key) ? 1 : keyMatches(keys.previous, event.key) ? -1 : 0;
      if (!direction || event.altKey || event.ctrlKey || event.metaKey) return;
      let candidates = targets();
      if (!candidates.length) return;
      event.preventDefault();

      const origin = options.beforeMove?.({ direction, activeElement: document.activeElement });
      if (origin) candidates = targets();
      const current = candidates.indexOf(origin || document.activeElement);
      const next = current < 0
        ? (direction > 0 ? 0 : candidates.length - 1)
        : (current + direction + candidates.length) % candidates.length;
      focusTarget(candidates[next]);
    });
  }

  window.RotarySDK = { init };
})();
