import { useEffect, useState } from "react";
import { TributeMedia } from "./components/TributeMedia";
import { LanguageToggle, useLocale } from "./i18n";
import { jordanMoments, jordanSources, jordanStats } from "./data/jordan";
import { jordanCopy, jordanMomentCopy, jordanTimelineCopy } from "./data/translations";

const jordanImage = (file: string) => `${import.meta.env.BASE_URL}images/jordan/${file}`;

export default function JordanPage() {
  const [menu, setMenu] = useState(false);
  const [wideLayout, setWideLayout] = useState(() => !window.matchMedia("(max-width: 850px)").matches);
  useEffect(() => {
    const layout = window.matchMedia("(max-width: 850px)");
    const update = () => setWideLayout(!layout.matches);
    layout.addEventListener("change", update);
    return () => layout.removeEventListener("change", update);
  }, []);
  const { locale } = useLocale();
  const copy = jordanCopy[locale];
  const timeline = jordanTimelineCopy[locale];
  useEffect(() => {
    document.title = locale === "zh" ? "迈克尔·乔丹 — 飞人" : "Michael Jordan — His Airness";
  }, [locale]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".jordan-site .reveal").forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [locale]);
  return (
    <div className="jordan-site">
      <a className="jordan-skip" data-rotary-skip="" href="#story">
        {copy.skip}
      </a>
      <header className="jordan-header">
        <a href="#home" className="jordan-mark" data-rotary-skip="">
          MJ <span>23</span>
        </a>
        <LanguageToggle />
        <button
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
          aria-label={menu ? "Close navigation" : "Open navigation"}
        >
          {menu ? "CLOSE" : "MENU"}
        </button>
        <nav className={menu ? "open" : ""} data-rotary-nav="">
          {copy.nav.map((label, index) => (
            <a
              href={`#${["story", "career", "top10", "legacy"][index]}`}
              key={label}
              onClick={() => setMenu(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      </header>
      <main>
        <section id="home" className="jordan-hero">
          <div className="jordan-photo" data-rotary-highlight="" data-rotary-center="">
            <img
              src={jordanImage("jordan-1997.webp")}
              alt={
                locale === "zh"
                  ? "迈克尔·乔丹的 1997 年比赛资料照片"
                  : "Archival photo of Michael Jordan in 1997"
              }
            />
          </div>
          <div className="jordan-hero-copy">
            <p>{copy.heroEyebrow}</p>
            <h1>
              MICHAEL
              <br />
              JORDAN
            </h1>
            <h2>{copy.heroSubtitle}</h2>
            <strong>23</strong>
            <span>{copy.team}</span>
          </div>
        </section>
        <section className="jordan-stats" id="stats"
          data-rotary-target=""
          data-rotary-highlight=""
          data-rotary-center=""
        >
          <header>
            <p>
              {copy.statHead.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <small>
              {copy.statSmall.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </small>
          </header>
          {jordanStats.map(([value, label]) => (
            <div key={label}>
              <strong>{value}</strong>
              <span>
                {locale === "zh"
                  ? ["NBA 总冠军", "常规赛 MVP", "总决赛 MVP", "得分王", "全明星"][
                      jordanStats.findIndex((item) => item[1] === label)
                    ]
                  : label}
              </span>
            </div>
          ))}
        </section>
        <section id="story" className="jordan-story">
          <div
            className="jordan-story-content"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <figure className="reveal">
              <img
                data-rotary-skip=""
                src={jordanImage("portrait-2014.webp")}
                alt={
                  locale === "zh" ? "迈克尔·乔丹肖像资料照片" : "Archival portrait of Michael Jordan"
                }
                loading="lazy"
              />
            </figure>
            <div className="reveal">
              <p>{copy.storyOverline}</p>
              <h2>
                {copy.storyTitle.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </h2>
              <div className="jordan-columns">
                {copy.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <dl>
                <div>
                  <dt>{copy.facts[0]}</dt>
                  <dd>FEB 17, 1963</dd>
                </div>
                <div>
                  <dt>{copy.facts[1]}</dt>
                  <dd>1984—2003</dd>
                </div>
                <div>
                  <dt>{copy.facts[2]}</dt>
                  <dd>{locale === "zh" ? "后卫" : "GUARD"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section
          id="career"
          className="jordan-career"
          data-rotary-target=""
          data-rotary-highlight=""
          data-rotary-center=""
        >
          <header>
            <p>{copy.careerHead}</p>
            <span>{copy.careerAside}</span>
          </header>
          <ol>
            {timeline.map(([year, title, text]) => (
              <li className="reveal" key={year}>
                <time>{year}</time>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </section>
        <section id="top10" className="jordan-top">
          <header data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
            <p>{locale === "zh" ? "生涯 TOP 10" : "CAREER TOP 10"}</p>
            <h2>{copy.topHead}</h2>
            <span>{copy.editorial}</span>
          </header>
          <div>
            {jordanMoments.map((moment) => {
              const text = jordanMomentCopy[locale][moment.rank];
              const content = [
                <div key="text" className="jordan-entry-copy"
                  data-rotary-target=""
                  data-rotary-highlight=""
                  data-rotary-center=""
                >
                  <time>{moment.year}</time>
                  <h3>{text.title}</h3>
                  <h4>{text.sub}</h4>
                  <p>{text.text}</p>
                  <a href={moment.source} target="_blank" rel="noreferrer" data-rotary-skip="">
                    {copy.link} ↗
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
                    spriteSrc={jordanImage("moments-grid.png")}
                    rank={moment.rank}
                    fallback={jordanImage("jordan-1997.webp")}
                    alt={`${text.title} ${locale === "zh" ? "的影像资料" : "archival footage"}`}
                  />
                  <figcaption>{moment.stat}</figcaption>
                </figure>,
              ];
              if (wideLayout && moment.rank % 2 === 1) content.reverse();
              return (
                <article
                  key={moment.rank}
                  className={`jordan-entry jordan-entry-${moment.rank % 2}`}
                >
                  <div className="jordan-entry-no">{String(moment.rank).padStart(2, "0")}</div>
                  {content}
                </article>
              );
            })}
          </div>
        </section>
        <section id="legacy" className="jordan-legacy"
          data-rotary-highlight=""
          data-rotary-center=""
        >
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
            <p>{copy.legacyText}</p>
          </div>
          <img
            src={jordanImage("jordan-1997.webp")}
            alt={locale === "zh" ? "乔丹比赛资料照片" : "Archival photo of Jordan in a game"}
            loading="lazy"
          />
        </section>
      </main>
      <footer className="jordan-footer">
        <b>
          MICHAEL
          <br />
          JORDAN <span>23</span>
        </b>
        <p>{copy.footer}</p>
        <details data-rotary-skip="">
          <summary>{copy.sources}</summary>
          <p>
            {locale === "zh" ? "数据核验：2026-09-07。" : "Facts checked: 2026-09-07. "}
            <a href={jordanSources.bio} target="_blank" rel="noreferrer">
              NBA Legends {locale === "zh" ? "档案" : "profile"}
            </a>
            、
            <a href={jordanSources.flu} target="_blank" rel="noreferrer">
              1997 {locale === "zh" ? "总决赛资料" : "Finals archive"}
            </a>
            、
            <a href={jordanSources.bulls} target="_blank" rel="noreferrer">
              {locale === "zh" ? "公牛队历史档案" : "Bulls history"}
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
