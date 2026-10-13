import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { registerVideoRestore } from "../rotary";
import { useLocale } from "../i18n";

export function MomentSprite({
  src,
  rank,
  alt,
  fill = false,
}: {
  src: string;
  rank: number;
  alt: string;
  fill?: boolean;
}) {
  const imageSrc = src.replace("moments-grid.png", `moment-${rank}.png`);
  return (
    <img
      className="tribute-sprite"
      src={imageSrc}
      alt={alt}
      loading="lazy"
      style={{
        width: "100%",
        display: "block",
        objectFit: "cover",
        ...(fill ? { height: "100%" } : { aspectRatio: "16 / 10" }),
      }}
    />
  );
}

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

export function TributeMedia({
  type,
  media,
  fallback,
  alt,
  source,
  poster,
  spriteSrc,
  rank,
}: {
  type: "external" | "image";
  media: string;
  fallback: string;
  alt: string;
  source?: string;
  poster?: string;
  spriteSrc?: string;
  rank: number;
}) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const { locale } = useLocale();
  const artwork = spriteSrc ? (
    <MomentSprite src={spriteSrc} rank={rank} alt={alt} fill={type === "external"} />
  ) : null;

  useEffect(() => {
    if (!playing) return;
    return registerVideoRestore(async () => {
      flushSync(() => setPlaying(false));
      return frameRef.current?.querySelector<HTMLElement>("button.tribute-video") ?? null;
    });
  }, [playing]);

  if (type === "image") {
    return (
      artwork || (
        <img
          src={poster || media}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.src = fallback)}
        />
      )
    );
  }
  const embedUrl = bilibiliEmbedUrl(media);
  const playLabel = locale === "zh" ? "点击播放" : "PLAY IN PAGE";
  const sourceLabel = locale === "zh" ? "打开哔哩哔哩" : "OPEN BILIBILI";
  const backLabel = locale === "zh" ? "返回封面" : "BACK";
  const posterButton = (
    <button
      className="tribute-video"
      onClick={() => setPlaying(true)}
      aria-label={`${playLabel}: ${alt}`}
    >
      {artwork || (
        <img
          src={poster || fallback}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => (e.currentTarget.src = fallback)}
        />
      )}
      <span className="tribute-play" aria-hidden="true">
        ▶
      </span>
      <span>{playLabel}</span>
    </button>
  );
  return (
    <div className="tribute-video-frame" ref={frameRef}>
      {!playing && posterButton}
      {playing && failed && (
        <div className="video-help tribute-video-fallback">
          <span>
            {locale === "zh"
              ? "视频无法嵌入，请打开哔哩哔哩页面观看。"
              : "This video could not be embedded. Open Bilibili to watch."}
          </span>
          <a href={media} target="_blank" rel="noreferrer">
            {sourceLabel} ↗
          </a>
          <button
            type="button"
            data-rotary-destination={`#tribute-media-${rank}`}
            onClick={() => {
              setFailed(false);
              setPlaying(false);
            }}
          >
            {backLabel}
          </button>
        </div>
      )}
      {playing && !failed && (
        <div>
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={alt}
              loading="lazy"
              onError={() => setFailed(true)}
              referrerPolicy="strict-origin-when-cross-origin"
              allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              data-rotary-fullscreen=""
            />
          ) : null}
          <div className="video-help">
            <span>
              {locale === "zh"
                ? "视频在当前页面播放；如加载失败，可打开哔哩哔哩页面。"
                : "Playing in this page. If the player does not load, open Bilibili."}
            </span>
            <a href={media} target="_blank" rel="noreferrer">
              {sourceLabel} ↗
            </a>
            <button
              type="button"
              data-rotary-destination={`#tribute-media-${rank}`}
              onClick={() => setPlaying(false)}
            >
              {backLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
