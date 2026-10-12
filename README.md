# nfc-project-demo

Independent static projects. Each project is self-contained and can be deployed as its own static site or opened locally through its `index.html` file.

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
    previous: 'ArrowLeft',
    next: 'ArrowRight',
    confirm: ['Enter', 'Space'],
    back: 'b',
    fullscreen: 'f'
  },
  highlightStyle: {
    outline: '3px solid #e5b454',
    outlineOffset: '5px',
    boxShadow: '0 0 0 8px rgba(229,180,84,.18)'
  }
});
</script>
```

The SDK navigates links, enabled controls, focusable elements, and images with alt text. Add `data-rotary-target` to include another element, `data-rotary-skip` to exclude a subtree, and `data-rotary-highlight` to put the focus style on a containing card or media frame. Mark a custom fullscreen target with `data-rotary-fullscreen`. Same-page hash links establish back positions for the `back` key. `beforeMove({ direction, activeElement })` and `beforeBack()` are optional hooks for restoring page-specific content such as a video cover. The `fullscreen` key toggles the Fullscreen API; Escape continues to use the browser's native exit behavior. A cross-origin player owns keyboard events while its frame is focused, so it must handle its own fullscreen shortcut.

## Deployment

Upload any project directory to a static host, preserving its directory structure. For example, `alan-tam/index.html` should be served at `/alan-tam/index.html`. Alan Tam loads the SDK from the repository root at `../rotary-sdk.js`; when deploying only the `alan-tam/` directory, copy the SDK into that directory and update the script path.

The Alan Tam page loads Bilibili videos only after the visitor taps a poster. Its iframe uses an element-level `strict-origin-when-cross-origin` referrer policy and explicit permissions for autoplay, encrypted media, fullscreen, and picture-in-picture. If a custom domain or CDN is used, redeploy the updated files and purge the cached `index.html` after pushing changes.
