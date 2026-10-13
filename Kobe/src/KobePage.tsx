import { useEffect, useState } from "react";
import { Arrow, Photo, MomentMedia } from "./components/Media";
import Stats from "./components/Stats";
import { moments, timeline, sources } from "./data/kobe";
import { LanguageToggle, useLocale } from "./i18n";
import { kobeCopy, kobeMomentCopy, kobeTimelineCopy } from "./data/translations";
import heroMask from "../public/images/kobe/hero-1280.webp?inline";

export default function KobePage() {
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("");
  const { locale } = useLocale();
  const copy = kobeCopy[locale];
  useEffect(() => {
    document.title = locale === "zh" ? "科比·布莱恩特 — 曼巴精神" : "Kobe Bryant — Mamba Mentality";
  }, [locale]);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        }),
      { rootMargin: "-15% 0px -65% 0px" },
    );
    document.querySelectorAll("main section[id]").forEach((s) => obs.observe(s));
    const reveal = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("revealed");
            reveal.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => reveal.observe(el));
    return () => {
      obs.disconnect();
      reveal.disconnect();
    };
  }, [locale]);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <>
      <a className="skip-link" data-rotary-skip="" href="#story">
        {copy.skip}
      </a>
      <header className="site-header">
        <a href="#home" className="wordmark" data-rotary-skip="" aria-label={copy.wordmark}>
          KB <span>/ 24</span>
        </a>
        <LanguageToggle />
        <button
          id="menu-toggle"
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="main-nav"
          aria-label={menu ? copy.close : copy.open}
          onClick={() => setMenu(!menu)}
        >
          {menu ? "CLOSE" : "MENU"}
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
        <nav
          id="main-nav"
          aria-label={locale === "zh" ? "页面章节" : "Page sections"}
          data-rotary-nav=""
          className={menu ? "open" : ""}
        >
          {copy.nav.map((label: string, index: number) => {
            const id = ["story", "career", "top10", "legacy"][index];
            return (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "location" : undefined}
                onClick={() => setMenu(false)}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </header>
      <main>
        <section id="home" className="hero" data-rotary-highlight="" data-rotary-center="">
          <div className="hero-number" aria-hidden="true">
            24
          </div>
          <Photo
            name="hero"
            rotarySkip
            alt={
              locale === "zh"
                ? "科比身穿湖人 24 号金色球衣运球；原摄于 2014 年，背景经处理"
                : "Kobe dribbling in the Lakers number 24 jersey; archival 2014 image"
            }
            className="hero-photo"
            style={{
              WebkitMaskImage: `url(${heroMask})`,
              maskImage: `url(${heroMask})`,
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "right bottom",
              maskPosition: "right bottom",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskMode: "luminance",
              maskMode: "luminance",
            }}
            eager
          />
          <div className="hero-content wrap">
            <p className="eyebrow hero-eyebrow">{copy.heroEyebrow}</p>
            <h1>
              <span>KOBE</span>
              <span>BRYANT</span>
            </h1>
            <p className="hero-chinese">{copy.heroChinese}</p>
            <div className="purple-rule" />
            <p className="hero-line">
              {copy.heroLine[0]}
              <br className="mobile-break" /> {copy.heroLine[1]}
            </p>
            <a className="outline-button" href="#story">
              {copy.explore} <Arrow />
            </a>
            <p className="hero-years">
              <span>#8</span> / <b>#24</b>
              <i />
              1996—2016
            </p>
          </div>
          <a className="scroll-hint" href="#career" aria-label={copy.scroll}>
            <span>{locale === "zh" ? "滚动" : "SCROLL"}</span>
            <Arrow />
          </a>
        </section>
        <Stats />
        <section id="story" className="story wrap section-space" data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
          <figure className="story-portrait reveal">
            <Photo
              name="young"
              rotarySkip
              alt={
                locale === "zh"
                  ? "2005 年，身披湖人 8 号球衣的科比准备罚球"
                  : "Kobe preparing for a free throw in the Lakers number 8 jersey in 2005"
              }
            />
            <div className="portrait-numbers" aria-hidden="true">
              08
              <span />
              24
            </div>
            <figcaption>{copy.storyCaption}</figcaption>
          </figure>
          <div className="story-copy reveal"
          >
            <p className="eyebrow">{copy.storyEyebrow}</p>
            <h2>
              {copy.storyTitle.map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <div className="body-copy">
              {copy.story.map((paragraph: string) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="bio-facts">
              <div>
                <dt>{copy.facts[0]}</dt>
                <dd>AUG 23, 1978</dd>
              </div>
              <div>
                <dt>{copy.facts[1]}</dt>
                <dd>PHILADELPHIA, PA</dd>
              </div>
              <div>
                <dt>{copy.facts[2]}</dt>
                <dd>
                  {locale === "zh" ? (
                    "洛杉矶 湖人"
                  ) : (
                    <>
                      LOS ANGELES <span>LAKERS</span>
                    </>
                  )}
                </dd>
              </div>
              <div>
                <dt>{copy.facts[3]}</dt>
                <dd>{locale === "zh" ? "得分后卫" : "SHOOTING GUARD"}</dd>
              </div>
            </dl>
          </div>
        </section>
        <section id="career" className="career section-space" data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
          <div className="wrap">
            <div className="section-heading reveal"
            >
              <div>
                <p className="eyebrow">{copy.careerEyebrow}</p>
                <h2>
                  {copy.careerTitle.map((line: string) => (
                    <span key={line}>
                      {line}
                      <br />
                    </span>
                  ))}
                </h2>
              </div>
              <p className="section-aside">
                {copy.careerAside[0]}
                <br />
                {copy.careerAside[1]}
                <span>{locale === "zh" ? "二十年，每一步都算数。" : ""}</span>
              </p>
            </div>
            <ol className="timeline">
              {timeline.map((t) => (
                <li className="reveal" key={t.year}
                >
                  <span className="timeline-year">{t.year}</span>
                  <span className="timeline-dot" />
                  <h3>{kobeTimelineCopy[locale][t.year].title}</h3>
                  <p>{kobeTimelineCopy[locale][t.year].text}</p>
                </li>
              ))}
            </ol>
            <div className="career-range" aria-hidden="true">
              1996 — 2016
            </div>
          </div>
        </section>
        <section id="top10" className="top10 wrap section-space">
          <div className="section-heading top-heading reveal"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <div>
              <p className="eyebrow">{copy.topEyebrow}</p>
              <h2>
                {copy.topTitle.map((line: string) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
            </div>
            <div className="section-aside">
              {copy.topAside[0]}
              <br />
              {copy.topAside[1]}
              <span>
                {locale === "zh" ? "十个瞬间，重温传奇。" : "TEN MOMENTS, REMEMBERED."}
                <br />
                {locale === "zh" ? "编辑精选 · 非官方排名" : "EDITOR'S PICKS · UNOFFICIAL ORDER"}
              </span>
            </div>
            <span className="top-ghost" aria-hidden="true">
              10
            </span>
          </div>
          <div className="moments">
            {moments.map((m) => (
              <article
                className={`moment moment-${m.variant} reveal`}
                key={m.rank}
                id={`moment-${m.rank}`}
                data-rotary-target={m.mediaType === "image" ? "" : undefined}
                data-rotary-highlight=""
                data-rotary-center=""
              >
                <div className="moment-head">
                  <span className="rank">{String(m.rank).padStart(2, "0")}</span>
                  <time>{m.date}</time>
                </div>
                <div className="moment-title">
                  <h3>
                    {kobeMomentCopy[locale][m.rank].title.split("\n").map((line, i) => (
                      <span key={i}>{line}</span>
                    ))}
                    </h3>
                    <p className="moment-subtitle">{kobeMomentCopy[locale][m.rank].subtitle}</p>
                  </div>
                  <MomentMedia moment={m} />
                  <div className="moment-description">
                    <p>{kobeMomentCopy[locale][m.rank].description}</p>
                    <a className="source-link" href={m.source} target="_blank" rel="noreferrer"
                      data-rotary-skip=""
                    >
                      {copy.archive}{" "}
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M4 16 16 4M4 4h12v12" />
                      </svg>
                    </a>
                  </div>
                  <div className="moment-stat">
                    <strong>{m.stat}</strong>
                    <span>{kobeMomentCopy[locale][m.rank].statLabel}</span>
                  </div>
                </article>
            ))}
          </div>
        </section>
        <section id="legacy" className="legacy" data-rotary-highlight="" data-rotary-center="">
          <Photo
            name="portrait"
            alt={
              locale === "zh"
                ? "科比在球场上持球，黑白资料照片"
                : "Black-and-white archival photo of Kobe on court"
            }
            className="legacy-photo"
          />
          <div className="legacy-content wrap reveal">
            <p className="eyebrow">{copy.legacyEyebrow}</p>
            <h2>
              {copy.legacyTitle.map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <div className="purple-rule" />
            <p className="legacy-statement">{copy.legacyStatement}</p>
            <p className="legacy-copy">
              {copy.legacyCopy.map((line: string) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
          </div>
        </section>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <a href="#home" data-rotary-skip="">KOBE BRYANT</a>
          <span>1978 — 2020</span>
          <a href="#home" className="back-top">
            {copy.backTop} <Arrow up />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            {copy.footerTag[0]}
            <br />
            <span>{copy.footerTag[1]}</span>
          </p>
          <div className="footer-numbers" aria-hidden="true">
            8 <span>24</span>
          </div>
        </div>
        <details className="credits" data-rotary-skip="">
          <summary>{copy.credits}</summary>
          <div>
            <p>
              {locale === "zh" ? "数据核验：2026-09-07。" : "Facts checked: 2026-09-07. "}
              <a href={sources.career} target="_blank" rel="noreferrer">
                {locale === "zh" ? "NBA 生涯数据" : "NBA career numbers"}
              </a>{" "}
              ·{" "}
              <a href={sources.alumni} target="_blank" rel="noreferrer">
                {locale === "zh" ? "湖人球员档案" : "Lakers player archive"}
              </a>
              {locale === "zh"
                ? "。各时刻附独立资料链接。曼巴精神文案为编辑概括，并非人物原话。"
                : ". Each moment has its own source. Mamba mentality copy is editorial, not a quote."}
            </p>
            <p>
              {locale === "zh"
                ? "摄影：Keith Allison、Sgt. Joseph A. Lee、Cpl. "
                : "Photography: Keith Allison, Sgt. Joseph A. Lee, Cpl. "}
              Megan Stiner, Lawrence Jackson, jnshimko and Eric Draper.{" "}
              {locale === "zh"
                ? "首屏基于 Keith Allison 的 2014 年照片做 AI 背景移除；其余照片按图注展示真实资料，不冒充对应比赛现场。"
                : "The hero uses background removal on Keith Allison's 2014 photo; every other image is captioned as archival and is not presented as game footage."}
              <a href={`${import.meta.env.BASE_URL}images/kobe/README.md`} target="_blank">
                {locale === "zh"
                  ? "完整图片来源、授权与修改说明"
                  : "Full image sources, licenses and edits"}{" "}
                ↗
              </a>
            </p>
            <p>
              {locale === "zh"
                ? "四段比赛集锦现在在当前页面加载哔哩哔哩播放器；如加载失败，可打开来源页。"
                : "Four game highlights now load Bilibili players in this page; if a player fails, open its source page."}
            </p>
          </div>
        </details>
      </footer>
    </>
  );
}
