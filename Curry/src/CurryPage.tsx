import { useEffect, useState } from "react";
import { TributeMedia } from "./components/TributeMedia";
import { LanguageToggle, useLocale } from "./i18n";
import { curryMoments, currySources } from "./data/curry";
import { curryCopy, curryMomentCopy, curryTimelineCopy } from "./data/translations";

const curryImage = (file: string) => `${import.meta.env.BASE_URL}images/curry/${file}`;

export default function CurryPage() {
  const [menu, setMenu] = useState(false);
  const [wideLayout, setWideLayout] = useState(() => !window.matchMedia("(max-width: 850px)").matches);
  useEffect(() => {
    const layout = window.matchMedia("(max-width: 850px)");
    const update = () => setWideLayout(!layout.matches);
    layout.addEventListener("change", update);
    return () => layout.removeEventListener("change", update);
  }, []);
  const { locale } = useLocale();
  const copy = curryCopy[locale];
  const timeline = curryTimelineCopy[locale];
  useEffect(() => {
    document.title =
      locale === "zh" ? "斯蒂芬·库里 — 三分革命" : "Stephen Curry — The Three-Point Revolution";
  }, [locale]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".curry-site .reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [locale]);
  return (
    <div className="curry-site">
      <a className="curry-skip" data-rotary-skip="" href="#story">
        {copy.skip}
      </a>
      <header className="curry-header">
        <a href="#home" className="curry-mark" data-rotary-skip="">
          SC <span>/ 30</span>
        </a>
        <LanguageToggle />
        <button
          className="curry-menu"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-label={menu ? "Close navigation" : "Open navigation"}
        >
          {menu ? "CLOSE" : "MENU"}
        </button>
        <nav className={menu ? "open" : ""} data-rotary-nav="">
          {copy.nav.map((label, index) => (
            <a
              key={label}
              href={`#${["story", "career", "top10", "legacy"][index]}`}
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <section id="home" className="curry-hero" data-rotary-highlight="" data-rotary-center="">
          <img
            data-rotary-skip=""
            src={curryImage("hero-generated.webp")}
            alt={
              locale === "zh"
                ? "库里三分出手的编辑风格主视觉"
                : "Editorial portrait of Curry taking a three-point shot"
            }
          />
          <div className="curry-arc arc-a" aria-hidden="true" />
          <div className="curry-arc arc-b" aria-hidden="true" />
          <div className="curry-hero-copy">
            <p>{copy.heroEyebrow}</p>
            <h1>
              <span>STEPHEN</span>
              <span>CURRY</span>
            </h1>
            <strong>30</strong>
            <div>
              <b>{copy.heroName}</b>
              <em>2009 — {copy.present}</em>
            </div>
          </div>
          <a className="curry-scroll" href="#stats">
            {copy.scroll} <i>↓</i>
          </a>
        </section>
        <section id="stats" className="curry-stats"
          data-rotary-target=""
          data-rotary-highlight=""
          data-rotary-center=""
        >
          {["4×", "2×", "1×", "402", "30"].map((value, index) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{copy.statLabels[index]}</span>
            </div>
          ))}
        </section>
        <section id="story" className="curry-story">
          <div className="curry-story-copy reveal"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <p className="curry-overline">{copy.storyOverline}</p>
            <h2>
              {copy.storyTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            {copy.story.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <dl>
              <div>
                <dt>{copy.facts[0]}</dt>
                <dd>MAR 14, 1988</dd>
              </div>
              <div>
                <dt>{copy.facts[1]}</dt>
                <dd>GOLDEN STATE WARRIORS</dd>
              </div>
              <div>
                <dt>{copy.facts[2]}</dt>
                <dd>{locale === "zh" ? "后卫" : "GUARD"}</dd>
              </div>
            </dl>
          </div>
          <figure className="curry-story-photo reveal"
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <img
              src={curryImage("shooting.webp")}
              alt={
                locale === "zh"
                  ? "库里比赛中投篮的资料照片"
                  : "Archival photo of Curry shooting in a game"
              }
              loading="lazy"
            />
            <figcaption>{copy.photoCaption}</figcaption>
          </figure>
        </section>
        <section id="career" className="curry-career">
          <div className="curry-section-head">
            <p>{copy.careerEyebrow}</p>
            <h2>
              {copy.careerTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <span>{copy.careerRange}</span>
          </div>
          <ol>
            {timeline.map(([year, title, text]) => (
              <li className="reveal" key={year}
                data-rotary-target=""
                data-rotary-highlight=""
                data-rotary-center=""
              >
                <time>{year}</time>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
        <section id="top10" className="curry-top">
          <header data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
            <p>{copy.topEyebrow}</p>
            <h2>
              {copy.topTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <small>{copy.editorial}</small>
          </header>
          <div className="curry-moments">
            {curryMoments.map((moment) => {
              const text = curryMomentCopy[locale][moment.rank];
              const content = [
                <div key="text" className="curry-moment-text"
                  data-rotary-target=""
                  data-rotary-highlight=""
                  data-rotary-center=""
                >
                  <time>{moment.year}</time>
                  <h3>{text.title}</h3>
                  <h4>{text.sub}</h4>
                  <p>{text.text}</p>
                  <a href={moment.source} target="_blank" rel="noreferrer" data-rotary-skip="">
                    {text.link} ↗
                  </a>
                </div>,
                <figure key="media" id={`tribute-media-${moment.rank}`}
                  data-rotary-highlight=""
                  data-rotary-center=""
                >
                  <TributeMedia
                    type={moment.type}
                    media={
                      moment.type === "image"
                        ? `${import.meta.env.BASE_URL}${moment.media.replace(/^\.\//, "")}`
                        : moment.media
                    }
                    source={moment.source}
                    poster={moment.poster}
                    spriteSrc={curryImage("moments-grid.png")}
                    rank={moment.rank}
                    fallback={curryImage("hero-generated.webp")}
                    alt={`${text.title} ${locale === "zh" ? "的影像资料" : "archival footage"}`}
                  />
                  <figcaption>{moment.stat}</figcaption>
                </figure>,
              ];
              if (wideLayout && moment.rank % 3 === 1) content.reverse();
              return (
                <article
                  key={moment.rank}
                  className={`curry-moment curry-moment-${moment.rank % 3}`}
                >
                  <div className="curry-rank">{String(moment.rank).padStart(2, "0")}</div>
                  {content}
                </article>
              );
            })}
          </div>
        </section>
        <section id="legacy" className="curry-legacy"
          data-rotary-highlight=""
          data-rotary-center=""
        >
          <img
            src={curryImage("olympics-2024.webp")}
            alt={locale === "zh" ? "2024 巴黎奥运会上的库里" : "Curry at the 2024 Paris Olympics"}
            loading="lazy"
          />
          <div>
            <p>{copy.legacyEyebrow}</p>
            <h2>
              {copy.legacyTitle.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
            <span>{copy.legacyText}</span>
          </div>
        </section>
      </main>
      <footer className="curry-footer">
        <b>
          STEPHEN CURRY <span>30</span>
        </b>
        <p>{copy.footer}</p>
        <details data-rotary-skip="">
          <summary>{copy.sources}</summary>
          <p>
            {locale === "zh" ? "数据核验：2026-09-07。" : "Facts checked: 2026-09-07. "}
            <a href={currySources.bio} target="_blank" rel="noreferrer">
              {copy.sourceLinks[0]}
            </a>
            、
            <a href={currySources.finals43} target="_blank" rel="noreferrer">
              {copy.sourceLinks[1]}
            </a>
            、
            <a href={currySources.thunder} target="_blank" rel="noreferrer">
              {copy.sourceLinks[2]}
            </a>
            。
            {locale === "zh"
              ? "本地资料图来自 Wikimedia Commons，署名及许可见图片目录 README。"
              : "Archival images are from Wikimedia Commons; credits and licenses are in the image README."}
          </p>
        </details>
      </footer>
    </div>
  );
}
