import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { createTheme, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "Heebo",
  },
});
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CacheProvider value={cacheRtl}>
          <App />
        </CacheProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
