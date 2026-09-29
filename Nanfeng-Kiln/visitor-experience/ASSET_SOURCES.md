# H5 image assets

## Earlier component crops from the accepted concept

The following PNGs are component crops from `design/accepted-concept.png`. The full-page landing crop is retired; these files are used only as standalone photos or scene details where referenced by the active code.

| File | Crop source and use |
| --- | --- |
| `assets/reference-crops/chapter-kiln-exact.png` | Source crop `(x=916, y=357, w=160, h=130)`; kiln photo in the three-chapter example. |
| `assets/reference-crops/chapter-banyan-exact.png` | Source crop `(x=916, y=559, w=180, h=139)`; banyan and lane photo in the example. |
| `assets/reference-crops/chapter-pottery-exact.png` | Source crop `(x=916, y=761, w=178, h=119)`; pottery photo in the example. |
| `assets/reference-crops/story-pillar-left.png` | Source crop `(x=810, y=280, w=77, h=740)`; left kiln-door pillar behind story cards. |
| `assets/reference-crops/story-pillar-right.png` | Source crop `(x=1150, y=280, w=76, h=740)`; right kiln-door pillar behind story cards. |
| `assets/reference-crops/story-floor.png` | Source crop `(x=887, y=934, w=260, h=135)`; kiln floor at the foot of story pages. |

These are effect-image crops, not original photo masters or rights-cleared documentary photographs. They provide visual fidelity to the supplied concept. Replace them with approved original assets before public launch if the artwork itself is not licensed for that use. Visitor stories continue to use each visitor's uploaded media.

## Existing project photography

`assets/banyan.jpg`, `assets/kiln-courtyard.jpg`, `assets/kiln-interior.jpg`, and `assets/shiwan-ceramic.jpg` are existing project assets. Keep their source and rights records with the project; use them only where their actual depicted subject matches the accompanying text.

## Independent components used by the code-built 390 × 844 screens

The active home, editor, preview, and story page hierarchy is HTML/CSS/SVG: headings, copy, panels, controls, collage placement, paper frames, location label, and buttons are not baked into page images. Full-screen effect PNGs are referenced only by the local QA comparison page. The app uses individual photo and decoration crops listed below, small mood icons, and the standalone `assets/paper-grain.webp` texture. User-uploaded photos or videos replace the sample media inside the HTML-built frames.

The final story uses perspective-corrected photo-only crops from `design/visual-390x844/03-story-390x844.png`. Their source corners are ordered clockwise: upper-left, lower-left, lower-right, upper-right. Paper frames, shadows, location label, and layout are drawn in code.

| File | Source crop | Output | Use |
| --- | --- | --- | --- |
| `assets/visual-390x844/story-kiln.jpg` | `(15,233), (31,598), (228,580), (255,220)` | 226 × 374 | Kiln photo component in the main collage and sample chapter. |
| `assets/visual-390x844/story-lane.jpg` | `(274,268), (250,426), (379,437), (389,281)` | 130 × 158 | Banyan-lane photo component in the upper-right collage frame. |
| `assets/visual-390x844/story-pottery.jpg` | `(264,466), (246,608), (368,603), (385,455)` | 130 × 153 | Pottery photo component in the lower-right collage frame. |
| `assets/visual-390x844/home-canopy.png` | `(0,0)–(390,126)` from `01-home-390x844.png` | 390 × 126 | Top canopy photo crop; HTML carries the brand and title. |
| `assets/visual-390x844/home-canopy-left.png` | `(0,0)–(100,184)` from `01-home-390x844.png` | 100 × 184 | Left canopy extension below the top crop. |
| `assets/visual-390x844/home-canopy-right.png` | `(350,0)–(390,318)` from `01-home-390x844.png` | 40 × 318 | Right-side tree and root edge framing the title sky. |
| `assets/visual-390x844/home-kiln-scene.png` | `(0,318)–(390,692)` from `01-home-390x844.png` | 390 × 374 | Isolated kiln courtyard photograph. |
| `assets/visual-390x844/home-ground-bottom.png` | `(0,760)–(390,844)` from `01-home-390x844.png` | 390 × 84 | Clean foreground/ground crop below the CTA; no button or copy included. |
| `assets/visual-390x844/editor-header-scene.png` | `(238,0)–(390,222)` from `02-editor-390x844.png` | 152 × 222 | Clean right-side kiln and foliage photo; editor heading and step remain HTML. |
| `assets/visual-390x844/editor-footer-art.png` | `(0,790)–(390,844)` from `02-editor-390x844.png` | 390 × 54 | Small kiln-line decoration beneath the editor footer control. |
| `assets/visual-390x844/story-canopy.png` | `(172,0)–(390,82)` from `03-story-390x844.png` | 218 × 82 | Top-right foliage photo crop above the editable story heading. |
| `assets/visual-390x844/story-left-decor.png` | `(0,658)–(80,844)` from `03-story-390x844.png` | 80 × 186 | Lower-left pottery and leaf decoration. |
| `assets/visual-390x844/story-right-decor.png` | `(325,754)–(390,844)` from `03-story-390x844.png` | 65 × 90 | Lower-right brush decoration outside the share control. |
| `assets/visual-390x844/mood-quiet-icon.png` | Quiet mood leaf icon crop from the editor design | 23 × 19 | Icon inside the semantic mood radio control. |
| `assets/visual-390x844/mood-warm-icon.png` | Warm mood people icon crop from the editor design | 22 × 19 | Icon inside the semantic mood radio control. |

The chimney etching on the story page is inline SVG; torn frame edges and the location paper tag are CSS. These effect-derived photo crops are not original photo masters or rights-cleared documentary assets. Replace concept-derived defaults with approved original images before public launch if the artwork itself is not licensed for that use.
