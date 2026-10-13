import { createContext, useContext, useEffect, useState } from "react";

export type Locale = "zh" | "en";

type LocaleContextValue = {
  locale: Locale;
  toggle: () => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function systemLocale(): Locale {
  return typeof navigator !== "undefined" && /^zh/i.test(navigator.language) ? "zh" : "en";
}

function readLocale(storageKey: string): Locale {
  if (typeof window === "undefined") return systemLocale();
  const saved = window.localStorage.getItem(storageKey);
  return saved === "zh" || saved === "en" ? saved : systemLocale();
}

export function LocaleProvider({
  storageKey,
  children,
}: {
  storageKey: string;
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(() => readLocale(storageKey));

  useEffect(() => {
    window.localStorage.setItem(storageKey, locale);
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
  }, [locale, storageKey]);

  return (
    <LocaleContext.Provider
      value={{ locale, toggle: () => setLocale((current) => (current === "zh" ? "en" : "zh")) }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const value = useContext(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside LocaleProvider");
  return value;
}

export function LanguageToggle({ className = "" }: { className?: string }) {
  const { locale, toggle } = useLocale();
  return (
    <button
      type="button"
      className={`language-toggle ${className}`.trim()}
      onClick={toggle}
      aria-label={locale === "zh" ? "切换为英文" : "Switch to Chinese"}
    >
      {locale === "zh" ? "EN" : "ZH"}
    </button>
  );
}
