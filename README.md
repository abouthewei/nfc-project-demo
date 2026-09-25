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

## Deployment

Upload any project directory to a static host, preserving its directory structure. For example, `alan-tam/index.html` should be served at `/alan-tam/index.html`.

The Alan Tam page loads Bilibili videos only after the visitor taps a poster. Its iframe uses an element-level `strict-origin-when-cross-origin` referrer policy and explicit permissions for autoplay, encrypted media, fullscreen, and picture-in-picture. If a custom domain or CDN is used, redeploy the updated files and purge the cached `index.html` after pushing changes.
