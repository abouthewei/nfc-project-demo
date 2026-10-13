import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Arrow } from "./components/Media";
import { LanguageToggle, useLocale } from "./i18n";
import { registerVideoRestore } from "./rotary";
import {
  lebronCopy,
  lebronMoments,
  lebronSources,
  lebronStats,
  lebronTimeline,
} from "./data/lebron";
import "./lebron.css";

const base = import.meta.env.BASE_URL;
const image = (name: string) => `${base}images/lebron/${name}`;

const posters: Record<string, string> = {
  "-zd62MxKXp8": "video-block.jpg",
  E5JBSJa4flo: "video-scoring.jpg",
  RgB5Ub1GNUU: "video-51.jpg",
  pQpCbzmgnyU: "video-2020.jpg",
  HPa1I1pjXjc: "video-paris.jpg",
  BV1WUL96PERL: "video-block.jpg",
  BV1q34y1T7ex: "video-scoring.jpg",
  BV1wo7V6WE9G: "video-51.jpg",
  BV1HiT568EEQ: "heat-2012.jpg",
  BV1v44y1n7br: "heat-2012.jpg",
  BV1sD7o6jEEQ: "heat-2012.jpg",
  BV1WxME62EvF: "cavaliers-2008.jpg",
  BV11dKo6XEty: "video-2020.jpg",
  BV15Qjk6xEqS: "video-block.jpg",
  BV15W42197Ce: "video-paris.jpg",
};

function BilibiliMedia({ moment }: { moment: (typeof lebronMoments)[number] }) {
  const { locale } = useLocale();
  const copy = lebronCopy[locale];
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const poster = image(posters[moment.media] || "lakers.jpg");

  useEffect(() => {
    if (!playing) return;
    return registerVideoRestore(async () => {
      flushSync(() => setPlaying(false));
      return frameRef.current?.querySelector<HTMLElement>("button.lebron-poster") ?? null;
    });
  }, [playing]);

  return (
    <figure
      className="lebron-media lebron-video-media"
      id={`lebron-media-${moment.rank}`}
      data-rotary-highlight=""
      data-rotary-center=""
    >
      <div className="lebron-media-frame" ref={frameRef}>
        {playing && !failed ? (
          <iframe
            title={`${moment.title[locale]} — ${locale === "zh" ? "视频" : "video"}`}
            src={`https://player.bilibili.com/player.html?bvid=${moment.media}&autoplay=0&high_quality=1`}
            loading="lazy"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            data-rotary-fullscreen=""
            onError={() => setFailed(true)}
          />
        ) : (
          <button
            type="button"
            className="lebron-poster"
      data-rotary-play=""
            onClick={() => {
              setFailed(false);
              setPlaying(true);
            }}
            aria-label={`${copy.play}: ${moment.title[locale]}`}
          >
            <img
              src={poster}
              alt={`${moment.title[locale]} — ${moment.subtitle[locale]}`}
              loading="lazy"
            />
            <span className="lebron-play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                <path d="m8 4 13 8-13 8z" />
              </svg>
            </span>
            <span className="lebron-play-label">{copy.play}</span>
          </button>
        )}
      </div>
      <figcaption className="lebron-media-caption">
        <span>{locale === "zh" ? "哔哩哔哩 · 视频来源" : "Bilibili · Video source"}</span>
        <a href={moment.source} target="_blank" rel="noreferrer" data-rotary-skip="">
          {copy.openVideo} ↗
        </a>
      </figcaption>
      {playing && (
        <div className="lebron-video-help">
          <span>{failed ? copy.videoUnavailable : copy.playing}</span>
          <div>
            <a href={moment.source} target="_blank" rel="noreferrer">
              {copy.openVideo} ↗
            </a>
            <button
              type="button"
              data-rotary-destination={`#lebron-media-${moment.rank}`}
              onClick={() => {
                setPlaying(false);
                setFailed(false);
              }}
            >
              {copy.back}
            </button>
          </div>
        </div>
      )}
    </figure>
  );
}

function ImageMedia({ moment }: { moment: (typeof lebronMoments)[number] }) {
  const { locale } = useLocale();
  const copy = lebronCopy[locale];
  return (
    <figure className="lebron-media lebron-image-media"
      data-rotary-highlight=""
      data-rotary-center=""
    >
      <div className="lebron-media-frame">
        <img
          src={image(moment.media)}
          alt={`${moment.title[locale]} — ${moment.subtitle[locale]}`}
          loading="lazy"
        />
      </div>
      <figcaption className="lebron-media-caption">
        <span>{copy.imageCredit}</span>
        <a href={moment.source} target="_blank" rel="noreferrer" data-rotary-skip="">
          {copy.sourceLabel} ↗
        </a>
      </figcaption>
    </figure>
  );
}

function MomentMedia({ moment }: { moment: (typeof lebronMoments)[number] }) {
  return moment.mediaType === "bilibili" ? (
    <BilibiliMedia moment={moment} />
  ) : moment.mediaType === "youtube" ? (
    <BilibiliMedia moment={moment} />
  ) : (
    <ImageMedia moment={moment} />
  );
}

export default function LeBronPage() {
  const { locale } = useLocale();
  const copy = lebronCopy[locale];
  const [menu, setMenu] = useState(false);
  const [active, setActive] = useState("story");

  useEffect(() => {
    document.title =
      locale === "zh" ? "勒布朗·詹姆斯 — 从阿克伦走向历史" : "LeBron James — From Akron to History";
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale]);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-18% 0px -68% 0px" },
    );
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        }),
      { threshold: 0.08 },
    );
    document
      .querySelectorAll(".lebron-page section[id]")
      .forEach((section) => sectionObserver.observe(section));
    document
      .querySelectorAll(".lebron-page .lebron-reveal")
      .forEach((element) => revealObserver.observe(element));
    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, [locale]);

  useEffect(() => {
    if (!menu) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenu(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menu]);

  return (
    <div className="lebron-page">
      <a className="lebron-skip" data-rotary-skip="" href="#story">
        {copy.skip}
      </a>
      <header className="lebron-header">
        <a href="#home" className="lebron-wordmark" data-rotary-skip="" aria-label={copy.wordmark}>
          LBJ <span>/ 23</span>
        </a>
        <nav
          className={menu ? "is-open" : ""}
          aria-label={locale === "zh" ? "页面章节" : "Page sections"}
          data-rotary-nav=""
        >
          {copy.nav.map((label, index) => {
            const id = ["story", "eras", "top10", "legacy"][index];
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
        <LanguageToggle className="lebron-language" />
        <button
          className="lebron-menu"
          type="button"
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((value) => !value)}
        >
          <span /> <span />
        </button>
      </header>

      <main>
        <section id="home" className="lebron-hero">
          <div className="lebron-map-lines" aria-hidden="true" />
          <div className="lebron-hero-route" aria-hidden="true">
            <span>AKRON</span>
            <i />
            <span>CLEVELAND</span>
            <i />
            <span>MIAMI</span>
            <i />
            <span>LOS ANGELES</span>
          </div>
          <div className="lebron-hero-number" aria-hidden="true">
            23
          </div>
          <div className="lebron-hero-photo-wrap" data-rotary-highlight="" data-rotary-center="">
            <img
              className="lebron-hero-photo"
              data-rotary-skip=""
              src={image("cavaliers-2018.jpg")}
              alt={
                locale === "zh"
                  ? "勒布朗·詹姆斯身穿克利夫兰球衣的比赛影像"
                  : "LeBron James in a Cleveland Cavaliers uniform during a game"
              }
            />
          </div>
          <div className="lebron-hero-copy">
            <p className="lebron-hero-kicker">{copy.heroTagline}</p>
            <h1>
              <span>{copy.heroTitle[0]}</span>
              <span>{copy.heroTitle[1]}</span>
            </h1>
            <p className="lebron-hero-line">{copy.heroLine}</p>
            <a href="#story" className="lebron-button">
              {copy.heroCta}
              <Arrow />
            </a>
          </div>
          <a href="#story" className="lebron-scroll">
            <span>{copy.scroll}</span>
            <Arrow />
          </a>
        </section>

        <section className="lebron-stats" aria-label={copy.statsLabel}
          data-rotary-target=""
          data-rotary-highlight=""
          data-rotary-center=""
        >
          <div className="lebron-stat-intro">
            {locale === "zh" ? "一份职业生涯档案" : "A career in numbers"}
          </div>
          {lebronStats.map((stat) => (
            <div className="lebron-stat" key={stat.en}>
              <strong>{stat.value}</strong>
              <span>{stat[locale]}</span>
            </div>
          ))}
        </section>

        <section id="story" className="lebron-story lebron-section" data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
          <div className="lebron-story-copy lebron-reveal"
          >
            <p className="lebron-kicker">{copy.storyKicker}</p>
            <h2>
              {copy.storyTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <div className="lebron-body">
              {copy.story.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="lebron-facts">
              <div>
                <dt>{copy.facts[0]}</dt>
                <dd>DEC 30, 1984</dd>
              </div>
              <div>
                <dt>{copy.facts[1]}</dt>
                <dd>AKRON, OHIO</dd>
              </div>
              <div>
                <dt>{copy.facts[2]}</dt>
                <dd>2003 · #1 PICK</dd>
              </div>
              <div>
                <dt>{copy.facts[3]}</dt>
                <dd>{locale === "zh" ? "前锋" : "FORWARD"}</dd>
              </div>
              <div>
                <dt>{copy.facts[4]}</dt>
                <dd>CLE · MIA · LAL</dd>
              </div>
            </dl>
            <a data-rotary-skip="" href="#eras" className="lebron-text-link">
              {copy.storyCta}
              <Arrow />
            </a>
          </div>
          <figure className="lebron-story-image lebron-reveal"
          >
            <img data-rotary-skip="" src={image("cavaliers-2008.jpg")} alt={copy.storyCaption} loading="lazy" />
            <figcaption>{copy.storyCaption}</figcaption>
            <span className="lebron-story-year" aria-hidden="true">
              1984
            </span>
          </figure>
        </section>

        <section id="eras" className="lebron-eras lebron-section">
          <div className="lebron-era-intro" data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
            <div className="lebron-section-head lebron-reveal">
              <div>
                <p className="lebron-kicker">{copy.erasKicker}</p>
                <h2>{copy.erasTitle}</h2>
              </div>
              <p>{copy.erasAside}</p>
            </div>
          </div>
          {[lebronTimeline.slice(0, 5), lebronTimeline.slice(5)].map((eras, index) => (
            <div className="lebron-era-rail" key={index} data-rotary-target="" data-rotary-highlight="" data-rotary-center="">
              {eras.map((era) => (
                <article className="lebron-era lebron-reveal"
                  key={era.year}
                >
                  <div className="lebron-era-top">
                    <strong>{era.year}</strong>
                    <span>{era.label[locale]}</span>
                  </div>
                  <div className="lebron-era-line" aria-hidden="true">
                    <i />
                  </div>
                  <p>{era.text[locale]}</p>
                  <img
                    data-rotary-skip=""
                    src={image(era.image)}
                    alt={`${era.year} · ${era.label[locale]}`}
                    loading="lazy"
                  />
                </article>
              ))}
          </div>
          ))}
        </section>

        <section id="top10" className="lebron-top10 lebron-section">
          <div className="lebron-section-head lebron-top-head lebron-reveal"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <div>
              <p className="lebron-kicker">{copy.topKicker}</p>
              <h2>
                {copy.topTitle.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </h2>
            </div>
            <p>{copy.topAside}</p>
          </div>
          <div className="lebron-moments">
            {lebronMoments.map((moment) => (
              <article
                className={`lebron-moment lebron-moment-${moment.variant} lebron-reveal`}
                id={`lebron-moment-${moment.rank}`}
                key={moment.rank}
              >
                <div className="lebron-moment-rank">{String(moment.rank).padStart(2, "0")}</div>
                <div className="lebron-moment-copy"
                  data-rotary-target=""
                  data-rotary-highlight=""
                  data-rotary-center=""
                >
                  <time>{moment.date}</time>
                  <h3>{moment.title[locale]}</h3>
                  <p className="lebron-moment-sub">{moment.subtitle[locale]}</p>
                  <p className="lebron-moment-text">{moment.description[locale]}</p>
                  <strong className="lebron-moment-stat">{moment.stat[locale]}</strong>
                </div>
                <MomentMedia moment={moment} />
              </article>
            ))}
          </div>
        </section>

        <section className="lebron-motion lebron-section">
          <div className="lebron-section-head lebron-reveal"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <div>
              <p className="lebron-kicker">{copy.motionLabel}</p>
              <h2>{copy.motionTitle}</h2>
            </div>
          </div>
          <div className="lebron-motion-rail">
            {copy.motionItems.map((item, index) => (
              <div className="lebron-motion-item lebron-reveal" key={item}
                data-rotary-target=""
                data-rotary-highlight=""
                data-rotary-center=""
              >
                <strong>0{index + 1}</strong>
                <span>{item}</span>
                <i />
              </div>
            ))}
          </div>
        </section>

        <section id="legacy" className="lebron-legacy lebron-section">
          <div className="lebron-legacy-copy lebron-reveal"
            data-rotary-target=""
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <p className="lebron-kicker">{copy.legacyKicker}</p>
            <h2>
              {copy.legacyTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p>{copy.legacyBody}</p>
            <a
              href={lebronSources.olympics}
              target="_blank"
              rel="noreferrer"
              className="lebron-button"
              data-rotary-skip=""
            >
              {copy.legacyCta}
              <Arrow />
            </a>
          </div>
          <figure className="lebron-legacy-image lebron-reveal"
            data-rotary-highlight=""
            data-rotary-center=""
          >
            <img
              src={image("parade-2016.jpg")}
              alt={
                locale === "zh"
                  ? "2016 年克利夫兰冠军巡游中的勒布朗·詹姆斯"
                  : "LeBron James at the 2016 Cleveland championship parade"
              }
              loading="lazy"
            />
            <figcaption>{locale === "zh" ? "克利夫兰 · 2016" : "Cleveland · 2016"}</figcaption>
          </figure>
          <div className="lebron-legacy-side lebron-reveal">
            <span>AKRON</span>
            <i />
            <span>HOME</span>
            <p>
              {locale === "zh" ? "影响力从球场延伸到社区。" : "Impact travels beyond the court."}
            </p>
          </div>
        </section>
      </main>

      <footer className="lebron-footer" aria-label={copy.footerAria}>
        <a href="#home" className="lebron-footer-mark" data-rotary-skip="">
          LBJ <span>/ 23</span>
        </a>
        <p>{copy.footerLine}</p>
        <nav data-rotary-nav="">
          {copy.nav.map((label, index) => (
            <a key={label} href={`#${["story", "eras", "top10", "legacy"][index]}`}>
              {label}
            </a>
          ))}
        </nav>
        <LanguageToggle className="lebron-footer-language" />
      </footer>
    </div>
  );
}
