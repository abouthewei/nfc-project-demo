import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/anton/latin-400.css";
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/barlow-condensed/latin-600.css";
import { LocaleProvider } from "./i18n";
import "./styles.css";
import "./lebron.css";
import "./lebron-review-overrides.css";
import "./video-fallbacks.js";
import { initRotary } from "./rotary";
import LeBronPage from "./LeBronPage";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider storageKey="player-page-locale">
      {" "}
      <LeBronPage />{" "}
    </LocaleProvider>
  </React.StrictMode>,
);
initRotary();
