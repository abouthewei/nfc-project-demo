type RotaryFocus = HTMLElement;

type RotaryOptions = {
  highlightStyle?: Record<string, string>;
  beforeMove?: (context: {
    direction: number;
    activeElement: Element | null;
  }) => RotaryFocus | null | Promise<RotaryFocus | null>;
  beforeBack?: () => void;
  beforeConfirm?: () => RotaryFocus | null | Promise<RotaryFocus | null>;
};

type RotarySdk = {
  init: (options?: RotaryOptions) => { focus: (target: Element, scroll?: boolean) => void };
};

declare global {
  interface Window {
    RotarySDK?: RotarySdk;
  }
}

type RotaryRestore = () => Promise<RotaryFocus | null>;

let restorePlayingVideo: RotaryRestore | null = null;

/**
 * A playing video registers how to bring its poster back. The SDK runs it when
 * the rotary focus leaves the player, waits for the React re-render, and then
 * continues from the element this returns.
 */
export function registerVideoRestore(restore: RotaryRestore) {
  restorePlayingVideo = restore;
  return () => {
    if (restorePlayingVideo === restore) restorePlayingVideo = null;
  };
}

function startRotary(sdk: RotarySdk) {
  /** Keys stay at the SDK defaults: arrows, Enter/Space, B and F. */
  sdk.init({
    // highlight colour mirrors the page accent in styles.css (--gold, --purple)
    highlightStyle: {
      outline: "3px solid #d6af60",
      outlineOffset: "6px",
      boxShadow: "0 0 0 8px rgba(148, 96, 196, .28)",
    },
    beforeMove: () => (restorePlayingVideo ? restorePlayingVideo() : null),
    beforeConfirm: () => restorePlayingVideo?.() ?? null,
    beforeBack: () => {
      void restorePlayingVideo?.();
    },
  });
}

export function initRotary() {
  if (!window.RotarySDK) throw new Error("Shared rotary-sdk.js failed to load");
  startRotary(window.RotarySDK);
}
