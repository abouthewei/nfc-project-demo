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

## Live demos

- [Alan Tam](https://abouthewei.github.io/nfc-project-demo/alan-tam/)
- [Kobe Bryant](https://nfc-project-demo.iwownow.com/kobe-bryant/index.html)
- [G-DRAGON](https://abouthewei.github.io/nfc-project-demo/G-Dragon/)

## Deployment

Upload any project directory to a static host, preserving its directory structure. For example, `alan-tam/index.html` should be served at `/alan-tam/index.html`.

The Alan Tam page loads Bilibili videos only after the visitor taps a poster. Its iframe uses an element-level `strict-origin-when-cross-origin` referrer policy and explicit permissions for autoplay, encrypted media, fullscreen, and picture-in-picture. If a custom domain or CDN is used, redeploy the updated files and purge the cached `index.html` after pushing changes.
