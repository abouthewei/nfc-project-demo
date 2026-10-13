import { useEffect, useRef } from "react";
import { stats } from "../data/kobe";
import { useLocale } from "../i18n";
export default function Stats() {
  const { locale } = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / 800, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          ref.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
            el.textContent = Math.round(Number(el.dataset.count) * eased).toLocaleString("en-US");
          });
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <section
      className="stats-strip"
      data-rotary-target=""
      data-rotary-highlight=""
      data-rotary-center=""
      aria-label={locale === "zh" ? "职业生涯数据" : "Career statistics"}
    >
      <div className="stats wrap" ref={ref}>
        {stats.map((s) => (
          <div
            className="stat"
            key={s.label}
            aria-label={`${s.value}${s.suffix} ${locale === "zh" ? s.zh : s.label}`}
          >
            <div className="stat-number" aria-hidden="true">
              <span data-count={s.value}>{s.value.toLocaleString("en-US")}</span>
              <small>{s.suffix}</small>
            </div>
            <span className="stat-label">{locale === "zh" ? s.zh : s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
