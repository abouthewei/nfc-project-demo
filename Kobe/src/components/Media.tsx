import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Moment } from "../data/kobe";
import { useLocale } from "../i18n";
import { registerVideoRestore } from "../rotary";
import { kobeMomentCopy } from "../data/translations";
import { MomentSprite } from "./TributeMedia";

const assetBase = import.meta.env.BASE_URL;

function bilibiliEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const bvid =
      parsed.searchParams.get("bvid") || parsed.pathname.match(/\/video\/(BV[0-9A-Za-z]+)/)?.[1];
    return bvid
      ? `https://player.bilibili.com/player.html?bvid=${encodeURIComponent(bvid)}&page=1&autoplay=1&high_quality=1&danmaku=0`
      : null;
  } catch {
    return null;
  }
}

export function Arrow({ up = false }: { up?: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      style={up ? { transform: "rotate(180deg)" } : undefined}
    >
      <path d="M12 3v17M5 13l7 7 7-7" />
    </svg>
  );
}
export function Photo({
  name,
  alt,
  className = "",
  eager = false,
  rotarySkip = false,
  style,
}: {
  name: string;
  alt: string;
  className?: string;
  eager?: boolean;
  rotarySkip?: boolean;
  style?: React.CSSProperties & Record<string, string | number>;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className={className}
      data-rotary-skip={rotarySkip ? "" : undefined}
      src={
        failed
          ? `${assetBase}images/kobe/portrait-640.webp`
          : `${assetBase}images/kobe/${name}-1280.webp`
      }
      srcSet={
        failed
          ? undefined
          : `${assetBase}images/kobe/${name}-640.webp 640w, ${assetBase}images/kobe/${name}-1280.webp 1280w`
      }
      sizes="(max-width: 767px) 100vw, 60vw"
      width="1280"
      height="1220"
      alt={failed ? `${alt}；原图不可用，显示科比资料肖像` : alt}
      loading={eager ? "eager" : "lazy"}
      {...(eager ? { fetchpriority: "high" } : {})}
      decoding="async"
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
export function MomentMedia({ moment }: { moment: Moment }) {
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const caption = locale === "zh" ? moment.caption : kobeMomentCopy.en[moment.rank].caption;

  useEffect(() => {
    if (!loaded) return;
    return registerVideoRestore(async () => {
      flushSync(() => setLoaded(false));
      return frameRef.current?.querySelector<HTMLElement>("button.video-poster") ?? null;
    });
  }, [loaded]);

  if (moment.mediaType === "image")
    return (
      <figure className="moment-media" data-rotary-skip="">
        <MomentSprite
          src={`${assetBase}images/kobe/moments-grid.png`}
          rank={moment.rank}
          alt={caption}
        />
        <figcaption>{caption}</figcaption>
      </figure>
    );
  if (moment.mediaType === "external") {
    const playLabel = locale === "zh" ? "点击播放" : "PLAY IN PAGE";
    const sourceLabel = locale === "zh" ? "打开哔哩哔哩" : "OPEN BILIBILI";
    const embedUrl = bilibiliEmbedUrl(moment.media);
    return (
      <figure
        className="moment-media video-media"
        id={`moment-media-${moment.rank}`}
       
      >
        <div className="video-frame" ref={frameRef}>
          {loaded && embedUrl ? (
            <iframe
              title={`${moment.title.replace("\n", " ")} — ${locale === "zh" ? "哔哩哔哩视频" : "Bilibili video"}`}
              src={embedUrl}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              data-rotary-fullscreen=""
            />
          ) : (
            <button
              type="button"
              className="video-poster external-video-poster"
              onClick={() => setLoaded(true)}
              aria-label={`${playLabel}: ${moment.title.replace("\n", " ")}`}
            >
              <MomentSprite
                src={`${assetBase}images/kobe/moments-grid.png`}
                rank={moment.rank}
                alt={caption}
                fill
              />
              <span className="play-icon">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="m8 4 13 8-13 8z" />
                </svg>
              </span>
              <span className="play-label">{playLabel}</span>
            </button>
          )}
        </div>
        <figcaption>
          <span>{caption}</span>
          <a href={moment.media} target="_blank" rel="noreferrer" data-rotary-skip="">
            {sourceLabel} ↗
          </a>
        </figcaption>
        {loaded && (
          <div className="video-help">
            <span>
              {locale === "zh"
                ? "视频在当前页面播放；如加载失败，可打开哔哩哔哩页面。"
                : "Playing in this page. If the player does not load, open Bilibili."}
            </span>
            <div className="video-help-actions">
              <a href={moment.media} target="_blank" rel="noreferrer" data-rotary-skip="">
                {sourceLabel} ↗
              </a>
              <button
                data-rotary-destination={`#moment-media-${moment.rank}`}
                onClick={() => setLoaded(false)}
              >
                {locale === "zh" ? "返回封面" : "BACK TO POSTER"}
              </button>
            </div>
          </div>
        )}
      </figure>
    );
  }
  return (
    <figure
      className="moment-media video-media"
      id={`moment-media-${moment.rank}`}
     
    >
      <div className="video-frame" ref={frameRef}>
        {loaded ? (
          <iframe
            title={`${moment.title.replace("\n", " ")} — ${locale === "zh" ? "NBA 官方视频" : "NBA official video"}`}
            src={`https://www.youtube-nocookie.com/embed/${moment.media}?autoplay=0&rel=0`}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-rotary-fullscreen=""
          />
        ) : (
          <button
            className="video-poster"
            onClick={() => setLoaded(true)}
            aria-label={`${locale === "zh" ? "加载视频" : "Load video"}: ${moment.title.replace("\n", " ")}`}
          >
            <MomentSprite
              src={`${assetBase}images/kobe/moments-grid.png`}
              rank={moment.rank}
              alt={caption}
              fill
            />
            <span className="play-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="m8 4 13 8-13 8z" />
              </svg>
            </span>
            <span className="play-label">{locale === "zh" ? "观看片段" : "WATCH THE MOMENT"}</span>
          </button>
        )}
      </div>
      <figcaption>
        <span>{caption}</span>
        <a
          href={`https://www.youtube.com/watch?v=${moment.media}`}
          data-rotary-skip=""
          target="_blank"
          rel="noreferrer"
        >
          {locale === "zh" ? "在 YouTube 观看" : "WATCH ON YOUTUBE"} ↗
        </a>
      </figcaption>
      {loaded && (
        <div className="video-help">
          <span>
            {locale === "zh"
              ? "未能播放？可在 YouTube 打开，或返回封面。"
              : "Playback unavailable? Open YouTube or return to the poster."}
          </span>
          <button
            data-rotary-destination={`#moment-media-${moment.rank}`}
            onClick={() => setLoaded(false)}
          >
            {locale === "zh" ? "返回封面" : "BACK TO POSTER"}
          </button>
        </div>
      )}
    </figure>
  );
}
