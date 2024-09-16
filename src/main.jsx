import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "@/App";
import { SignupForm } from "./pages/SignupForm";
import { LoginForm } from "./pages/LoginForm";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ element: <LoginForm />, index: true }, { path: "/signup", element: <SignupForm /> }],
  },
  // { path: "/signup", element: <Signup /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
