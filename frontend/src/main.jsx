import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AuthProvider } from "./auth/AuthContext";
import RequireAuth from "./auth/RequireAuth";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "routes/Root";
import Auth from "routes/Auth";
import Jobs from "routes/Jobs";
import Profile from "routes/Profile";
import NotFound from "routes/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/auth",
    element: (
      <RequireAuth requireAuth={false}>
        <Auth />
      </RequireAuth>
    ),
  },
  {
    path: "/jobs",
    element: (
      <RequireAuth requireAuth={true}>
        <Jobs />
      </RequireAuth>
    ),
  },
  {
    path: "/profile",
    element: (
      <RequireAuth requireAuth={true}>
        <Profile />
      </RequireAuth>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
