import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "@/App";
import { SignupForm } from "./pages/SignupForm";
import { LoginForm } from "./pages/LoginForm";

import "./index.css";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { VirtualStock } from "./pages/VirtualStock";
import { Sales } from "./pages/Sales";
import { Purchases } from "./pages/Purchases";
import { Reports } from "./pages/Reports";
import { Employees } from "./pages/Employees";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/Logout";
import { Toaster } from "./components/ui/toaster";
import { AuthProvider } from "./auth/AuthProvider";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ element: <LoginForm />, index: true }, { path: "/signup", element: <SignupForm /> }],
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/products',
    element: <Products />
  },
  {
    path: '/virtualStock',
    element: <VirtualStock />
  },
  {
    path: '/sales',
    element: <Sales />
  },
  {
    path: '/purchases',
    element: <Purchases />
  },
  {
    path: '/reports',
    element: <Reports />
  },
  {
    path: '/employees',
    element: <Employees />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/logout',
    element: <Logout />
  },
]);

// const queryClient = new QueryClient()

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    {/* <QueryClientProvider client={queryClient}> */}

    {/* </QueryClientProvider> */}

    <Toaster />
  </StrictMode>
);
