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
import { ProductsContextProvider } from "./context/ProductsContextProvider";
import { PrivateRoute } from "./auth/PrivateRoute";
import { SalesContextProvider } from "./context/SalesContextProvider";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ element: <LoginForm />, index: true }, { path: "/signup", element: <SignupForm /> }],
  },
  {
    path: '/dashboard',
    element:(
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    )
  },
  {
    path: '/products',
    element:(
      <PrivateRoute>
        <Products />
      </PrivateRoute>
    )
  },
  {
    path: '/virtualStock',
    element:(
      <PrivateRoute>
        <VirtualStock />
      </PrivateRoute>
    )
  },
  {
    path: '/sales',
    element:(
      <PrivateRoute>
        <Sales />
      </PrivateRoute>
    )
  },
  {
    path: '/purchases',
    element:(
      <PrivateRoute>
        <Purchases />
      </PrivateRoute>
    )
  },
  {
    path: '/reports',
    element:(
      <PrivateRoute>
        <Reports />
      </PrivateRoute>
    )
  },
  {
    path: '/employees',
    element:(
      <PrivateRoute>
        <Employees />
      </PrivateRoute>
    )
  },
  {
    path: '/profile',
    element:(
      <PrivateRoute>
        <Profile />
      </PrivateRoute>
    )
  },
  {
    path: '/logout',
    element:(
      <PrivateRoute>
        <Logout />
      </PrivateRoute>
    )
  },
]);

// const queryClient = new QueryClient()



createRoot(document.getElementById("root")).render(
  <StrictMode>

    <AuthProvider>
        <ProductsContextProvider>
          <SalesContextProvider>
              <RouterProvider router={router} />
          </SalesContextProvider>
        </ProductsContextProvider>
    </AuthProvider>
    {/* <QueryClientProvider client={queryClient}> */}

    {/* </QueryClientProvider> */}

    <Toaster />
  </StrictMode>
);
