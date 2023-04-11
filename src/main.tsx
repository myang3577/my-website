import "./index.css";

import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { domMax, LazyMotion } from "framer-motion";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./containers/App";
import Warframe from "./containers/warframe/Warframe";
import { store } from "./store";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/my-website",
    element: <App />,
  },
  {
    path: "/my-website/warframe",
    element: <Warframe />,
  },
]);

const themeOptions: ThemeOptions = {
  palette: { mode: "light" },
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "IBM Plex Sans",
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
};

const theme = createTheme(themeOptions);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LazyMotion features={domMax}>
          <RouterProvider router={router} />
        </LazyMotion>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
