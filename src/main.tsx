import "./index.css";

import { domMax, LazyMotion } from "framer-motion";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./containers/App";
import Warframe from "./containers/Warframe";
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

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LazyMotion features={domMax}>
        <RouterProvider router={router} />
      </LazyMotion>
    </Provider>
  </React.StrictMode>
);
