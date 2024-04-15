import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import "@fontsource/dm-serif-display";
import "@fontsource/jost";
import { Provider } from "react-redux";
import { store } from "../store";
import { CssBaseline } from "@mui/material";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssBaseline />
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <App />
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
);
