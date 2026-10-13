import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/anton/latin-400.css";
import "@fontsource/barlow-condensed/latin-500.css";
import "@fontsource/barlow-condensed/latin-600.css";
import { LocaleProvider } from "./i18n";
import "./styles.css";
import "./curry.css";
import { initRotary } from "./rotary";
import CurryPage from "./CurryPage";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LocaleProvider storageKey="player-page-locale">
      {" "}
      <CurryPage />{" "}
    </LocaleProvider>
  </React.StrictMode>,
);
initRotary();
