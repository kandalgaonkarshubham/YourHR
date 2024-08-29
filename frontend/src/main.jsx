import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "routes/Root";
import Auth from "routes/Auth";
import Jobs from "routes/Jobs";
import NotFound from "routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
