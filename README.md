# nfc-project-demo

Independent static projects. Each project can be opened locally through its `index.html`; the demos share the root-level keyboard navigation SDK.

## Projects

- `alan-tam/` — Alan Tam tribute page
- `Kobe/` — Kobe Bryant
- `Curry/` — Stephen Curry
- `Jordan/` — Michael Jordan
- `Babu-Art/` — Babu Art architectural heritage practice journal
- `Archive/` — Babu Art bilingual field archive photo album
- `UK-Sketches/` — Ye Gang's bilingual British travel sketchbook
- `G-Dragon/` — G-DRAGON Korean / Chinese / English artist archive
- `LeBron/` — LeBron James career archive
- `Nanfeng-Kiln/` — Responsive Chinese / English continuous-scroll heritage guide to Foshan’s Nanfeng and Gao dragon kilns, with a reference-led history spread, six-stage Shiwan craft chapter and Bilibili footage, a four-stop illustrated visitor route, living customs, pottery experiences, and practical visitor information
- `Nanfeng-Kiln-H5/` — Bilingual, responsive, ten-chapter visitor H5 with illustrated kiln storytelling and interactive exploration
- `visitor-experience/` — Standalone Nanfeng Ancient Kiln visitor H5 with a phone-local photo travelogue builder that saves source material in browser storage and generates a shareable long JPG on-device
- `MVtest/` — Four MV model generation and validation reports with original video assets

## Live demos

- [Alan Tam](https://abouthewei.github.io/nfc-project-demo/alan-tam/)
- [Kobe Bryant](https://abouthewei.github.io/nfc-project-demo/Kobe/)
- [Stephen Curry](https://abouthewei.github.io/nfc-project-demo/Curry/)
- [Michael Jordan](https://abouthewei.github.io/nfc-project-demo/Jordan/)
- [Babu Art](https://abouthewei.github.io/nfc-project-demo/Babu-Art/)
- [Babu Art field archive](https://abouthewei.github.io/nfc-project-demo/Archive/)
- [UK Sketchbook](https://abouthewei.github.io/nfc-project-demo/UK-Sketches/)
- [G-DRAGON](https://abouthewei.github.io/nfc-project-demo/G-Dragon/)
- [LeBron James](https://abouthewei.github.io/nfc-project-demo/LeBron/)
- [Nanfeng Kiln · Foshan](https://abouthewei.github.io/nfc-project-demo/Nanfeng-Kiln/)
- [Nanfeng Kiln H5 · Bilingual Visitor Guide](https://abouthewei.github.io/nfc-project-demo/Nanfeng-Kiln-H5/)
- [Nanfeng visitor experience](https://abouthewei.github.io/nfc-project-demo/visitor-experience/)
- [MV 模型生成与验证报告](https://abouthewei.github.io/nfc-project-demo/MVtest/)

## Rotary SDK

`rotary-sdk.js` is a dependency-free single-file keyboard navigation SDK. To use it in another static page, copy the file beside that page, load it, and configure the keys and focus style:

```html
<script src="rotary-sdk.js"></script>
<script>
  RotarySDK.init({
    keys: {
      previous: "ArrowLeft",
      next: "ArrowRight",
      confirm: ["Enter", "Space"],
      back: "b",
      fullscreen: "f",
    },
    highlightStyle: {
      outline: "3px solid #e5b454",
      outlineOffset: "5px",
      boxShadow: "0 0 0 8px rgba(229,180,84,.18)",
    },
  });
</script>
```

The SDK navigates links, enabled controls, ARIA buttons/tabs, focusable elements, controllable videos, and images with alt text. Add `data-rotary-target` to include another element, `data-rotary-skip` to exclude a subtree, and `data-rotary-highlight` to put the focus style on a containing card or media frame. Mark a navigation region with `data-rotary-nav` and custom in-page navigation with `data-rotary-destination="#section-id"` so focus follows the change. Mark a custom fullscreen target with `data-rotary-fullscreen`. Same-page hash links establish back positions for the `back` key. `beforeConfirm()` can restore a playing video and return its poster (or a promise for it); the SDK focuses that poster without clicking it again. `beforeMove({ direction, activeElement })` and `beforeBack()` are optional hooks for restoring page-specific content such as a video cover; `beforeMove` may return the origin element directly or a promise that resolves to it, so React-driven pages can wait for the re-render that restores the cover. `init()` returns a `focus(element)` helper that moves the rotary focus (and its highlight) programmatically, for pages that need to return it to a menu item or another trigger after a jump. The `fullscreen` key toggles the Fullscreen API; Escape continues to use the browser's native exit behavior. A cross-origin player owns keyboard events while its frame is focused, so it must handle its own fullscreen shortcut.

### Device callbacks

Loading the SDK exposes these global functions for the device to call in the page's top-level script context. Each press or rotary step dispatches the corresponding keyboard event from the focused element, so page-specific video and dialog handlers also apply. Keyboard mappings remain available.

| Device callback | Keyboard action |
| --- | --- |
| `onPlayBtnPressed()` | Play / restore video poster only; other controls are ignored |
| `onOKBtnPressed()` | Confirm; toggle fullscreen in the active video |
| `onBackBtnPressed()` | B |
| `onClockwiseRoll()` | ArrowRight |
| `onCounterClockwiseRoll()` | ArrowLeft |

`onPlayBtnRelease()`, `onOKBtnRelease()` and `onBackBtnRelease()` are callable no-ops: releasing a button does not trigger another action. There is no long-press action. All demos except `visitor-experience/` reference the device-compatible SDK at the repository root; projects do not contain SDK copies.

Run `node rotary-sdk.test.cjs` to check device mappings and keyboard behavior.

### The four Vite player pages

`Jordan/`, `Curry/`, `Kobe/` and `LeBron/` load the repository-root `rotary-sdk.js`. `rotary-vite-plugin.ts` serves that shared file during development and adjusts the reference for the nested `dist/` entry when building. The SDK is not bundled or copied into projects. The page markup carries the standard marks — `data-rotary-nav` on the header/footer navigation, `data-rotary-highlight` on media frames and content cards, `data-rotary-skip` on the brand mark, the skip link and the credits block. Each page also configures its own accent colour for the highlight and gives the SDK two page behaviours:

- a playing player restores its poster through `beforeMove`/`beforeBack` (`flushSync` re-renders the cover, and the promise resolves to the poster so the SDK carries on from there);
- the player iframe carries `data-rotary-fullscreen` for the `f` key, and the "back to poster" button carries `data-rotary-destination` so the rotary focus returns to the cover instead of an unmounted control.

Scroll-reveal blocks start at `opacity: .001` rather than `0`, and navigation links express their active state with `aria-current` instead of a changing `class`, so the SDK keeps counting them as visible focus stops and never loses the `rotary-focus` highlight when React re-renders. Text sections, statistics and timeline entries carry `data-rotary-target`; content and media frames carry `data-rotary-center` so each selection scrolls into the center of the viewport. Archival source links are skipped during rotary navigation and remain available to mouse and Tab users. Embedded players return to their posters before navigation continues.

## Deployment

Deploy the shared root `rotary-sdk.js` with the project directories and preserve their relative paths. Normal entries reference `../rotary-sdk.js`; nested Yaoge and `dist/` entries reference `../../rotary-sdk.js`. Projects no longer carry SDK copies, so deploying a project without providing the shared SDK at its referenced path disables keyboard and device navigation. `visitor-experience/` does not use this SDK.

Every demo must also work when its `index.html` is opened directly from disk. Load built bundles as classic deferred scripts (no `type="module"`, no `crossorigin`) so browsers do not apply CORS to them, let each page detect its own variant from the URL path instead of calling `history.replaceState` (which throws for `file://` documents), and avoid `mask-image`/`-webkit-mask-image` URLs that point at local files — browsers fetch mask images in CORS mode, so inline a data-URI mask instead when a mask is required.

The four Vite packages build with `npm run build` into `dist/`. `classicOfflineBuild()` in `rotary-vite-plugin.ts` gives those builds that offline shape: an IIFE bundle emitted as `<script defer>` without `crossorigin`, inlined web fonts (also CORS-mode on `file://`), an inlined data-URI hero mask for Kobe, and a reference to the shared `../../rotary-sdk.js`. Builds use the repository-root SDK and do not emit a local copy.

The Alan Tam page loads Bilibili videos only after the visitor taps a poster. Its iframe uses an element-level `strict-origin-when-cross-origin` referrer policy and explicit permissions for autoplay, encrypted media, fullscreen, and picture-in-picture. If a custom domain or CDN is used, redeploy the updated files and purge the cached `index.html` after pushing changes.

## Formatting

`.prettierrc.json` configures Prettier (print width 100) for the demo sources. Run it from the repository root before committing changes to the Vite packages:

```sh
npx prettier --write "rotary-vite-plugin.ts" "Jordan/src/**" "Curry/src/**" "Kobe/src/**" "LeBron/src/**" \
  "{Jordan,Curry,Kobe,LeBron}/{index.html,vite.config.ts,tsconfig.json,package.json,README.md}"
```
